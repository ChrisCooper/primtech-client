import {CitizenManager} from "@/citizen/citizens";
import {scoped, Lifecycle} from "tsyringe";
import {TimeManager} from "@/time"
import { ForagingManager } from './environment/foraging';

@scoped(Lifecycle.ContainerScoped)
export class PrimTech {
  constructor(
    readonly citizenM: CitizenManager,
    readonly timeManager: TimeManager,
    readonly foragingM: ForagingManager,
  ) {
    console.log("Init PrimTech")
  }

  runOneUpdateCycle() {
    this.citizenM.update()
    this.foragingM.update()
    this.timeManager.currentGameHour += 1
  }
}
