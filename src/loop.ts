import {singleton} from "tsyringe"
import {GameConfig} from "./config"
import {TimeManager} from "./time"
import {PrimTech} from "./PrimTech"
import {Utils} from "./utils"

@singleton()
export class GameLoop {
    constructor(
        private config: GameConfig,
        private primTech: PrimTech,
        private timeManager: TimeManager,
    ) {
        console.log("Init GameLoop")
    }

    public isPaused = false
    public slidingWindowUpdateTimePercentage = 0

    private previousUpdatePercentages = Array.from({length: 48}, () => 0)

    runNextGameUpdateRepeatedlyUntilPaused() {
        if (this.isPaused) {
            console.log("Exiting game loop since game was paused")
            return
        }

        const frameStartTimeMs = performance.now() // window.performance.now()

        this.primTech.runOneUpdateCycle()

        const frameEndTimeMs = performance.now()
        const frameTotalTimeMs = frameEndTimeMs - frameStartTimeMs

        const percentage = frameTotalTimeMs / (this.config.tickTargetRuntimeUs / 1000) * 100
        this.updateFramePercentage(percentage)

        const timeUntilNextFrameStartMs = Math.max(0, this.config.tickTargetRuntimeUs / 1000 - frameTotalTimeMs)
        
        //console.log(`Frame took ${frameTotalTimeMs.toFixed(0)}ms, or ${percentage.toFixed(1)}% (avg ${this.slidingWindowUpdateTimePercentage.toFixed(1)}%). Waiting ${timeUntilNextFrameStartMs.toFixed(0)}ms`)
        setTimeout(() => {this.runNextGameUpdateRepeatedlyUntilPaused()}, timeUntilNextFrameStartMs);
    }

    updateFramePercentage(percentage: number) {
        this.previousUpdatePercentages.pop()
        this.previousUpdatePercentages.unshift(percentage)
        this.slidingWindowUpdateTimePercentage = Utils.average(this.previousUpdatePercentages)
    }
}
