import {GameConfig} from "@/config"
import {TimeManager} from "@/time"
import {Utils} from "@/utils"
import {container, scoped, Lifecycle} from "tsyringe" 


@scoped(Lifecycle.ContainerScoped)
export class AgeManager {
    constructor(private config: GameConfig, private timeManager: TimeManager) {}

    randomParentAgeHours(): number {
        let ageHours = -1
        while (ageHours < 0 || ageHours > this.config.lifeExpectancyHours) {
            ageHours = Utils.normalFalloff(this.config.eligibleParentAgeHours, this.config.lifeExpectancyHours * 1.5)
        }
        return ageHours
    }

    randomChildAgeForParentAgeHours(parentAgeHours: number): number {
        let age = -1

        while (age < 0) {
            const ageDifference = Utils.normalFalloff(this.config.eligibleParentAgeHours, this.config.eligibleParentAgeHours * 2)
            age = parentAgeHours - ageDifference
        }
        return age
    }

    randomAgeHours(): number {
        const maxAgeHours = this.yToH(this.config.lifeExpectancyYears * 0.7)

        return Utils.normalFalloff(0, maxAgeHours)
    }

    yToH(y: number): number {
        return y * this.config.hoursPerYear
    }

    hToY(y: number): number {
        return y / this.config.hoursPerYear
    }
}

