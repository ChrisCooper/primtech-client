import {scoped, Lifecycle} from "tsyringe";

@scoped(Lifecycle.ContainerScoped)
export class GameConfig {
    public numStartingCitizens = 100
    public maxStartingChildrenPerFamily = 5

    public hoursPerDay = 16
    public daysPerYear = 120
    public hoursPerYear = this.daysPerYear * this.hoursPerDay
    
    // 1 game-day hour per tick, 1 game-day per second, microseconds
    public tickTargetRuntimeUs = 1_000_000 / this.hoursPerDay

    public lifeExpectancyYears = 60
    public lifeExpectancyHours = this.lifeExpectancyYears * this.hoursPerYear
    public eligibleParentAgeYears = 18
    public eligibleParentAgeHours = this.eligibleParentAgeYears * this.hoursPerYear
    public eligibleWorkAgeYears = 10
    public eligibleWorkAgeHours = this.eligibleWorkAgeYears * this.hoursPerYear
    public minTimeBetweenChildrenHours = this.hoursPerYear

    public startingNutritionDays = 10
    public startingNutritionHours = this.startingNutritionDays * this.hoursPerDay
}