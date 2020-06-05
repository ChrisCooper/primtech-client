import {scoped, Lifecycle} from "tsyringe";

@scoped(Lifecycle.ContainerScoped)
export class GameConfig {
    public numStartingCitizens = 75

    public hoursPerDay = 16
    public daysPerYear = 120
    
    // 1 game-day hour per tick, 1 game-day per second, microseconds
    public tickTargetRuntimeUs = 1_000_000 / this.hoursPerDay


    public lifeExpectancyYears = 60

    public startingNutritionDays = 10
    public startingNutritionHours = this.startingNutritionDays * this.hoursPerDay
}