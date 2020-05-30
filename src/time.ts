import {scoped, Lifecycle} from "tsyringe";

@scoped(Lifecycle.ContainerScoped)
export class TimeManager {
    public currentGameHour = 0
}