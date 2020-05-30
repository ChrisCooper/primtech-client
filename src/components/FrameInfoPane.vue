<template>
  <div id="frame_info" class="frame">
    <h2>Frame Info</h2>
    <div>
      <span class="label-name">Percentage: </span><span>{{ gameLoop.slidingWindowUpdateTimePercentage.toFixed(1) }}%</span>
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
  margin-top: 20px;
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

@Component
export default class FrameInfoPane extends Vue {
  
  private gameLoop: GameLoop = container.resolve(GameLoop)

  mounted(): void { 
    console.log("FrameInfoPane mounted")
  }

  pause(): void {
    console.log("Pausing");
  }
}

</script>
