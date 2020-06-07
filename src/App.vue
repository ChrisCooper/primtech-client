<template>
  <div id="app" class="tile is-ancestor">
    <div class="tile is-parent">
      <PageHeader msg="Primitive Technology"/>
      <Histogram v-bind:histogramConfig="citizenHistogramConfig"/>
      <Histogram v-bind:histogramConfig="citizenHistogramConfig"/>
      <FrameInfoPane/>
      <CitizenTable/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import PageHeader from '@/components/PageHeader.vue';
import CitizenTable from '@/components/CitizenTable.vue';
import Histogram from '@/components/Histogram.vue';
import FrameInfoPane from '@/components/FrameInfoPane.vue';
import {citizenHistogramConfig} from "@/charts"

@Component({
  components: {
    PageHeader,
    Histogram,
    CitizenTable,
    FrameInfoPane,
  },
})
export default class App extends Vue {
  citizenHistogramConfig = citizenHistogramConfig
}
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
