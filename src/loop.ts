import {injectable} from "tsyringe"
import {GameConfig} from "./config"
import {TimeManager} from "./time"
import {PrimTech} from "./PrimTech";

@injectable()
export class GameLoop {
    constructor(
        private config: GameConfig,
        private primTech: PrimTech,
        private timeManager: TimeManager,
    ) {
        console.log("Init GameLoop")
    }

    isPaused = false

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
        const timeUntilNextFrameStartMs = Math.max(0, this.config.tickTargetRuntimeUs / 1000 - frameTotalTimeMs)

        console.log(`Frame took ${frameTotalTimeMs.toFixed(0)}ms, or ${percentage.toFixed(1)}%. Waiting ${timeUntilNextFrameStartMs.toFixed(0)}ms`)
        setTimeout(() => {this.runNextGameUpdateRepeatedlyUntilPaused()}, timeUntilNextFrameStartMs);
    }
}
