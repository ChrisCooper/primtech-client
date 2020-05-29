import {scoped, Lifecycle} from "tsyringe";

@scoped(Lifecycle.ContainerScoped)
export class GameConfig {
    public numStartingCitizens = 5
}