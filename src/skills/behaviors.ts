import {scoped, Lifecycle} from "tsyringe";
import {Citizen} from "@/citizen/citizens"
import { ForagingManager } from '@/environment/foraging'

export abstract class SkillBehavior {
    abstract runForCitizen(c: Citizen): void
}

@scoped(Lifecycle.ContainerScoped)
export class Forage extends SkillBehavior {
    constructor(readonly foragingM: ForagingManager) {super()}

    runForCitizen(c: Citizen): void {
        const nutrition = this.foragingM.forageANdReturnNutritionAmount(c)
        c.nutrition += nutrition
    }
}