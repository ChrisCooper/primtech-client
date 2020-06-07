import {scoped, Lifecycle, container} from "tsyringe"

import {Skill, SkillLevel} from "@/skills"
import {Aptitude, AptitudeLevel} from "@/aptitudes"
import {Supply} from "@/supplies"
import {GameConfig} from "@/config"
import {TimeManager} from "@/time"
import {Utils} from "@/utils"
import {AgeManager} from "@/citizen/age"

export class Citizen {
    public nutrition: number
    public money = 0
    public currentAgeYears = 0
    public currentAgeHours = 0

    public  currentActivity: Skill

    public parents = new Array<Citizen>()
    public children = new Array<Citizen>()

    private aptitudes = new Map<Aptitude, AptitudeLevel>()
    private skills = new Map<Skill, SkillLevel>()
    private supplies = new Map<Supply, number>()

    private config: GameConfig
    
    constructor(readonly id: number, private readonly birthdateHours: number) {
        this.config = container.resolve(GameConfig)

        this.nutrition = Utils.skewNormalRangeInclusive(this.config.startingNutritionHours * 0.7, this.config.startingNutritionHours * 1.3)
        this.currentActivity = Skill.RESTING
        this.money = 0
        //console.log(`Init Citizen ${id}`)
    }

    get nutritionDays(): number{
        return this.nutrition / this.config.hoursPerDay
    }

    update(currentHour: number) {
        if (Utils.zeroOneUniformRandom() > 0.5) {
            this.currentActivity = Skill.RESTING
        } else {
            this.currentActivity = Skill.FORAGING
        }
        
        this.nutrition -= this.currentActivity.hourly_energy_expenditure

        this.currentActivity.runForCitizen(this)

        const currentAgeDays = (currentHour - this.birthdateHours) / this.config.hoursPerDay
        this.currentAgeYears = currentAgeDays / this.config.daysPerYear
        this.currentAgeHours = this.currentAgeYears * this.config.hoursPerYear
    }
}


@scoped(Lifecycle.ContainerScoped)
export class CitizenManager {
    public citizens = new Array<Citizen>()
    private nextId = 1

    public recentActions: Array<Skill> = []

    constructor(private config: GameConfig, private timeManager: TimeManager, private ageM: AgeManager) {
        console.log("Init CitizenManager")

        for (let i = 0; i < config.numStartingCitizens; i++) {
            this.spawnFamily()
        }
    }

    spawnFamily() {
        const parentAgeHours = this.ageM.randomParentAgeHours()
        const p1 = this.spawnRandomCitizen(parentAgeHours)
        const p2 = this.spawnRandomCitizen(this.ageM.randomParentAgeHours())

        const theoreticalMaxChildren = Math.floor((parentAgeHours - this.config.eligibleParentAgeHours) / this.config.minTimeBetweenChildrenHours)
        const maxChildren = Math.min(this.config.maxStartingChildrenPerFamily, theoreticalMaxChildren)

        const numChildren = Math.floor(Utils.normalFalloff(0, maxChildren, true))

        console.log(`Age ${(parentAgeHours / this.config.hoursPerYear).toFixed(1)}, Num children ${numChildren}`)

        for (let i = 0; i < numChildren; i++) {
            this.spawnRandomCitizen(this.ageM.randomChildAgeForParentAgeHours(parentAgeHours))
        }
    }

    spawnRandomCitizen(ageHours: number) {
        const birthdateHours = this.timeManager.currentGameHour - ageHours
        const c = new Citizen(this.nextId, birthdateHours)

        // Aptitude.values().forEach { ap -> c.aptitudes[ap] = ap.randomAptitude(ap) }
        //     Skill.values().forEach { sk -> c.skills[sk] =
        //         SkillLevel(0.0)
        //     }

        this.citizens.push(c)
        this.nextId++

        return c
    }

    update() {
        this.citizens.forEach(c => { c.update(this.timeManager.currentGameHour)})

        const starvedCitizens = this.citizens.filter(c => c.nutrition < 0)

        starvedCitizens.forEach(c => {
            const index = this.citizens.indexOf(c)
            if (index > -1) {
                // Replace 1 element following `index`
                this.citizens.splice(index, 1)
            }
        })

        if (starvedCitizens.length > 0) {
            console.log(`${starvedCitizens.length} citizens starved: ${starvedCitizens}`)
        }

        this.updateRecentActions()
    }

    updateRecentActions() {
        this.citizens.forEach(c => {
            if (this.recentActions.length > 0) {
                this.recentActions.pop()
            }

            this.recentActions.unshift(c.currentActivity)
        })
    }

}

