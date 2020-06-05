<template>
  <div id="frame_info" class="frame">
    <div>
      <span class="label-name">{{ yearsPassed }} years, {{ daysPassed }} days, {{ hoursPassed }} hours</span>
    </div>
    <div>
      <span>Frame runtime percentage: </span><span>{{ gameLoop.slidingWindowUpdateTimePercentage.toFixed(1) }}%</span>
    </div>
    
    <div>
      <button class="pause-button" v-on:click="pause">
        <span class="icon">
          <i class="fas fa-pause"></i>
        </span>
        <span>Pause</span>
      </button>
    </div>
  </div>
</template>

<!-- Styles -->
<style scoped lang="scss">
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/grid/tiles.sass";
@import "bulma/sass/elements/button.sass";
@import "bulma/sass/elements/notification.sass";

.frame {
  @extend .tile, .is-child, .is-primary, .notification, .is-4;
}

h2 {
  display: block;
}

.pause-button {
  margin-top: 10px;
  @extend .button, .is-warning, .is-light, .is-outlined, .is-rounded, .is-small;
}

.label-name {
  font-weight: bold;
}

</style>

<!-- Code -->
<script lang="ts">
import {container} from "tsyringe" 
import { Component, Vue } from 'vue-property-decorator'
import {GameLoop} from "@/loop"
import {TimeManager} from "@/time"
import {GameConfig} from "@/config"

@Component
export default class FrameInfoPane extends Vue {
  
  private gameLoop: GameLoop = container.resolve(GameLoop)
  private timeManager: TimeManager = container.resolve(TimeManager)
  private config: GameConfig = container.resolve(GameConfig)

  mounted() { 
    console.log("FrameInfoPane mounted")
  }

  pause() {
    console.log("Pausing");
  }

  get yearsPassed(): number {
    const hoursPassed = this.timeManager.currentGameHour
    return Math.floor((hoursPassed / this.config.hoursPerDay) / this.config.daysPerYear)
  }

  get daysPassed(): number {
    const extraHours = this.timeManager.currentGameHour
    return Math.floor(extraHours / this.config.hoursPerDay - (this.yearsPassed * this.config.daysPerYear))
  }

  get hoursPassed(): number {
    return this.timeManager.currentGameHour % this.config.hoursPerDay
  }
}

</script>
