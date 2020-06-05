import {CitizenManager} from "@/citizen/citizens";
import {scoped, Lifecycle} from "tsyringe";
import {TimeManager} from "@/time"

@scoped(Lifecycle.ContainerScoped)
export class PrimTech {
  constructor(public citizens: CitizenManager, readonly timeManager: TimeManager) {
    console.log("Init PrimTech")
  }

  runOneUpdateCycle() {
    this.citizens.update()
    this.timeManager.currentGameHour += 1
  }
}
