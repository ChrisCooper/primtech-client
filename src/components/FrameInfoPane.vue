<template>
  <div id="frame_info" class="frame">
    <h2>Frame Info</h2>
    <div>
        <span class="label-name">Frame Number: </span><span>{{ frameInfo.getFrameNumber() }}</span>
      <div>
        <span class="label-name">Percentage: </span><span>{{ frameBudgetUsedPercent }}</span>
      </div>
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
import { Component, Vue, Provide } from 'vue-property-decorator';
import { GameServiceClient } from '../proto/game_grpc_web_pb';
import { Void } from '../proto/general_pb';
import { FrameInfo } from '../proto/game_pb';

@Component
export default class FrameInfoPane extends Vue {
  @Provide() private frameInfo: FrameInfo;

  constructor() {
    super();
    this.frameInfo = new FrameInfo();
    this.frameInfo.setFrameNumber(0);
    this.frameInfo.setActualFrameTimeNanos(0);
    this.frameInfo.setTargetFrameTimeNanos(0);
  }

  mounted(): void {
    const gameClient = new GameServiceClient('http://localhost:8080');
    const frameStream = gameClient.streamFrames(new Void(), undefined);
    frameStream.on('data', this.onNewFrame);
  }

  onNewFrame(frameInfo: FrameInfo): void {
    this.frameInfo = frameInfo;
  }

  pause(): void {
    console.log("Pausing");
  }

  get frameBudgetUsedPercent(): string {
    const percentage = this.frameInfo.getActualFrameTimeNanos() * 1.0 / this.frameInfo.getTargetFrameTimeNanos() * 100
    return percentage.toFixed(2) + "%"
  }
}
</script>

