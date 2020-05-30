import {CitizenManager} from "@/citizen/citizens";
import {scoped, Lifecycle} from "tsyringe";

@scoped(Lifecycle.ContainerScoped)
export class PrimTech {
  constructor(public citizens: CitizenManager) {
    console.log("Init PrimTech")
  }

  gameHour = 0
  
  runOneUpdateCycle() {
    this.citizens.update()
  }
}
