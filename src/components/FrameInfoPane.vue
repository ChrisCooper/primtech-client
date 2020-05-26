<template>
  <div id="frame_info">
    <h2>Frame Info</h2>
    <span>Frame Number: {{ frameInfo.frameNumber }}</span>
    <div>
      <button v-on:click="pause">Pause</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { FrameInfo } from '../proto/game_pb';

@Component
export default class FrameInfoPane extends Vue {
  @Prop() private frameInfo: FrameInfo;

  constructor() {
    super();
    this.frameInfo = new FrameInfo();
    this.frameInfo.setFrameNumber(0);
  }

  pause(): void {
    console.log("Pausing");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  
}
</style>
