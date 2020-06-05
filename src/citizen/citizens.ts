import {scoped, Lifecycle} from "tsyringe"

import {Skill, SkillLevel} from "@/skills"
import {Aptitude, AptitudeLevel} from "@/aptitudes"
import {Supply} from "@/supplies"
import {GameConfig} from "@/config"
import {TimeManager} from "@/time"
import {Utils} from "@/utils"
import {container} from "tsyringe" 

export class Citizen {
    public nutrition: number
    public money = 0
    public currentAgeYears = 0

    public  currentActivity: Skill

    private aptitudes = new Map<Aptitude, AptitudeLevel>()
    private skills = new Map<Skill, SkillLevel>()
    private supplies = new Map<Supply, number>()

    private config: GameConfig
    
    constructor(readonly id: number, private readonly birthdate: number) {
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

        const currentAgeDays = (currentHour - this.birthdate) / this.config.hoursPerDay
        this.currentAgeYears = currentAgeDays / this.config.daysPerYear
    }
}


@scoped(Lifecycle.ContainerScoped)
export class CitizenManager {
    public citizens = new Array<Citizen>()
    private nextId = 1

    public recentActions: Array<Skill> = []

    constructor(private config: GameConfig, private timeManager: TimeManager) {
        console.log("Init CitizenManager")

        for (let i = 0; i < config.numStartingCitizens; i++) {
            this.spawnRandomCitizen()
        }
    }

    spawnRandomCitizen() {
        const birthdate = this.timeManager.currentGameHour - this.randomAgeHours()
        const c = new Citizen(this.nextId, birthdate)

        // Aptitude.values().forEach { ap -> c.aptitudes[ap] = ap.randomAptitude(ap) }
        //     Skill.values().forEach { sk -> c.skills[sk] =
        //         SkillLevel(0.0)
        //     }

        this.citizens.push(c)
        this.nextId++
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

    randomAgeHours(): number {
        const maxAgeHours = this.config.lifeExpectancyYears * this.config.hoursPerDay * this.config.daysPerYear * 0.7

        let ageHours = -1
        while (ageHours < 0 || ageHours > maxAgeHours) ageHours = Utils.skewNormalRangeInclusive(-maxAgeHours*2, maxAgeHours*2)
        return ageHours
    }
}

