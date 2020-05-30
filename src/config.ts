import {scoped, Lifecycle} from "tsyringe";

@scoped(Lifecycle.ContainerScoped)
export class GameConfig {
    public numStartingCitizens = 75

    public hoursPerDay = 24
    public daysPerYear = 36
    
    // 1 game-day hour per tick, 1 game-day per second, microseconds
    public tickTargetRuntimeUs = 1_000_000 / this.hoursPerDay
}