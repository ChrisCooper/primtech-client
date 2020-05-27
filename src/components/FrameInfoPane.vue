<template>
  <div id="frame_info">
    <h2>Frame Info</h2>
    <span>Frame Number: {{ frameInfo.getFrameNumber() }}</span>
    <span>Actual time: {{ frameInfo.getActualFrameTimeNanos() }}</span>
    <span>Target time: {{ frameInfo.getTargetFrameTimeNanos() }}</span>
    <span>Percentage: {{ frameBudgetUsedPercent }}</span>
    
    <div>
      <button v-on:click="pause">Pause</button>
    </div>
  </div>
</template>

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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  
}
</style>
