import {Citizen} from "@/citizen/citizens"

export abstract class SkillBehavior {
    abstract runForCitizen(c: Citizen): void
}

export class Forage extends SkillBehavior {
    runForCitizen(c: Citizen): void {
        console.log(`Citizen ${c.id} is foraging`)
        c.nutrition += 1.5
    }
}