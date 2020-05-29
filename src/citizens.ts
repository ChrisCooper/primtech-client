
import {scoped, Lifecycle} from "tsyringe"

import {Skill, SkillLevel} from "./skills"
import {Aptitude, AptitudeLevel} from "./aptitudes"
import {Supply} from "./supplies"
import {GameConfig} from "./config"
import {TimeManager} from "./time"

export class Citizen {
    private nutrition = 48
    private money = 0

    private currentActivity: Skill

    private aptitudes = new Map<Aptitude, AptitudeLevel>()
    private skills = new Map<Skill, SkillLevel>()
    private supplies = new Map<Supply, number>()
    
    constructor(readonly id: number, private readonly birthdate: number) {
        this.nutrition = 100
        this.currentActivity = Skill.RESTING
        this.money = 0
        console.log(`Init Citizen ${id}`);
    }

    update() {
        this.nutrition -= this.currentActivity.hourly_energy_expenditure
    }

    ageAsOf(gameHour: number): number {
        return gameHour - this.birthdate
    }
}

@scoped(Lifecycle.ContainerScoped)
export class CitizenManager {
    private citizens = new Array<Citizen>()
    private nextId = 1

    constructor(private config: GameConfig, private timeManager: TimeManager) {
        console.log("Init CitizenManager");

        for (let i = 0; i < config.numStartingCitizens; i++) {
            this.spawnRandomCitizen()
        }
    }

    spawnRandomCitizen() {
        this.citizens.push(new Citizen(this.nextId, this.timeManager.currentTime))
        this.nextId++
    }
}





