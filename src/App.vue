<template>
  <div id="app" class="tile is-ancestor">
    <div class="tile is-parent">
      <PageHeader msg="Primitive Technology"/>
      <CitizenHistogram/>
      <FrameInfoPane/>
      <CitizenTable/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import PageHeader from '@/components/PageHeader.vue';
import CitizenTable from '@/components/CitizenTable.vue';
import CitizenHistogram from '@/components/CitizenHistogram.vue';
import FrameInfoPane from '@/components/FrameInfoPane.vue';

@Component({
  components: {
    PageHeader,
    CitizenHistogram,
    CitizenTable,
    FrameInfoPane,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
