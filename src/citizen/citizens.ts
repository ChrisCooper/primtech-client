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

    private gameConfig: GameConfig
    
    constructor(readonly id: number, private readonly birthdate: number) {
        this.nutrition = Utils.skewNormalRangeInclusive(300, 2000)
        this.currentActivity = Skill.RESTING
        this.money = 0
        console.log(`Init Citizen ${id}`)

        this.gameConfig = container.resolve(GameConfig)
    }

    update(currentHour: number) {
        this.nutrition -= this.currentActivity.hourly_energy_expenditure

        const currentAgeDays = (currentHour - this.birthdate) / this.gameConfig.hoursPerDay
        this.currentAgeYears = currentAgeDays / this.gameConfig.daysPerYear
    }
}


@scoped(Lifecycle.ContainerScoped)
export class CitizenManager {
    public citizens = new Array<Citizen>()
    private nextId = 1

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
    }

    randomAgeHours(): number {
        const maxAgeHours = 70 * this.config.hoursPerDay * this.config.daysPerYear

        let ageHours = -1
        while (ageHours < 0 || ageHours > maxAgeHours) ageHours = Utils.skewNormalRangeInclusive(-maxAgeHours*2, maxAgeHours*2)
        return ageHours
    }
}

