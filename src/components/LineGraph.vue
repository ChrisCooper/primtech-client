<template>
  <section>
    <svg className="container" v-bind:width="totalWidth" v-bind:height="totalHeight">
      <g ref="mainGroup" v-bind:transform="marginTransform">
        <g ref="pathGroup" class="pathGroup"></g>
        <g ref="selectionPathGroup" class="selectionPathGroup"></g>
      </g>
      <text class="chart-title" text-anchor="middle" y="15" x="245">{{ this.currentValueGetter.title}} </text>
      <text class="axis-label" text-anchor="end" transform="rotate(-90)" y="15" x="-7">{{ this.currentValueGetter.yTitle}} </text>
      <text class="axis-label" text-anchor="end" x="445" y="250">{{ this.currentValueGetter.xTitle }}</text>
    </svg>
    <div>
      <span v-for="(vg, i) in histogramConfig.valueGetters" :key="vg.name">
        <button class="data-button" v-on:click="setValueGetter(i)">
          {{ vg.title }}
        </button>
      </span>
    </div>
  </section>
</template>

<!-- Styles -->
<style scoped lang="scss">
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/elements/button.sass";

.axis-label {
  fill: #888;
}
</style>

<script lang="ts"> 
import * as d3 from 'd3';
import { Component, Vue, Ref, Prop } from 'vue-property-decorator'
import {ValueGetter, HistogramConfig} from "@/charts"
import {container, scoped, Lifecycle} from "tsyringe" 
import {SelectionManager} from "@/selection"

type Range = [number, number]
type TDataElem = any

@Component
export default class LineGraph extends Vue {
}
</script>
