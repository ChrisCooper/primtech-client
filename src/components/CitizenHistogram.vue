<template>
  <section>
    <svg className="container" v-bind:width="totalWidth" v-bind:height="totalHeight">
      <g ref="mainGroup" v-bind:transform="marginTransform">
      </g>
    </svg>
    <div>
      <span v-for="(vg, i) in valueGettersForCitizen" :key="vg.name">
        <button class="data-button" v-on:click="setValueGetter(i)">
          {{ vg.name }}
        </button>
      </span>
    </div>
  </section>
</template>

<!-- Styles -->
<style scoped lang="scss">
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/elements/button.sass";

.data-button {
  margin: 5px;
  @extend .button, .is-outlined, .is-rounded, .is-small;
}
</style>

<script lang="ts"> 
import {container} from "tsyringe" 
import * as d3 from 'd3';

import { Component, Vue, Ref, Prop } from 'vue-property-decorator'
import { CitizenManager, Citizen } from '@/citizen/citizens'
import {GameConfig} from "@/config"


type Range = [number, number] 

type ValueGetter = {
  name: string;
  getter: (c: Citizen) => number;
}

@Component
export default class CitizenHistogram extends Vue {

  @Prop({default: 500}) dataUpdateDelay!: number
  @Prop({default: 5000}) axesUpdateDelay!: number
  @Prop({default: 15}) numBins!: number

  @Prop() valueGettersForCitizen: Array<ValueGetter> =  [
    {name: "Nutrition", getter: (c: Citizen): number => c.nutrition / this.config.hoursPerDay},
    {name: "Age", getter: (c: Citizen): number => c.currentAgeYears},
    {name: "Money", getter: (c: Citizen): number => c.money},
  ]

  private valueGetter: (c: Citizen) => number = (c) => c.nutrition

  private citizenManager = container.resolve(CitizenManager)
  private config = container.resolve(GameConfig)

  data = this.citizenManager.citizens
 
  chartHeight = 200
  chartWidth = 400
  margins = {top: 10, right: 30, bottom: 30, left: 40}

  private totalHeight = this.chartHeight + this.margins.top + this.margins.bottom
  private totalWidth = this.chartWidth + this.margins.left + this.margins.right

  private marginTransform = `translate(${this.margins.left}, ${this.margins.top})`

  private xScaleInternal = d3.scaleLinear()
  private yScaleInternal = d3.scaleLinear()

  private xAxisInternal = d3.axisBottom(this.xScaleInternal)
  private yAxisInternal = d3.axisLeft(this.yScaleInternal)

  @Ref('mainGroup') readonly mainGroup!: HTMLElement

  setValueGetter(index: number) {
    const vg = this.valueGettersForCitizen[index]
    this.valueGetter = vg.getter

    this.refreshAllOnce()
  }

  genHistogram() {
    //console.log("histogram")
    return d3.histogram<Citizen, number>()
      .value(this.valueGetter)
      .domain(this.xScaleInternal.domain() as [number, number])
      .thresholds(this.xScaleInternal.ticks(this.numBins))
  }

  bins(): d3.Bin<Citizen, number>[] {
    //console.log("Bins")
    const histogram = this.genHistogram()
    return histogram(this.data)
  }

  recalculateXAxis() {
    const maxVal = d3.max(this.data, this.valueGetter) as number

    this.xScaleInternal
      .domain([0, maxVal * (1.1)])
      .range([0, this.chartWidth])
      .nice()

    d3.select(this.xAxisGroup!).transition().duration(500).call(this.xAxisInternal)
  }

  recalculateYAxis() {
    const maxVal = d3.max(this.bins(), (d) => d.length) as number

    this.yScaleInternal
      .range([this.chartHeight, 0])
      .domain([0, maxVal * (1.2)])   // d3.hist has to be called before the Y axis obviously
      .nice()

    d3.select(this.yAxisGroup!).transition().duration(500).call(this.yAxisInternal)
  }

  private xAxisGroup: SVGGElement | null = null
  private yAxisGroup: SVGGElement | null = null

  mounted(): void { 
    //console.log("CitizenHistogram mounted")
    this.setValueGetter(0)

    this.$nextTick(() => {
      // Code that will run only after the
      // entire view has been rendered 
      const mainGroup = d3.select(this.mainGroup)

      this.xAxisGroup = mainGroup.append("g")
      .attr("transform", "translate(0," + this.chartHeight + ")")
      .node()

      this.yAxisGroup = mainGroup.append("g").node()
    
      this.refreshAxesConstantly()
      this.refreshDataConstantly()
    })
  }

  refreshAllOnce() {
    this.reBinAndRescaleAxes()
    this.refreshData()
  }  

  async refreshAxesConstantly() {
    this.reBinAndRescaleAxes()
    setTimeout(() => this.refreshAxesConstantly(), this.axesUpdateDelay)
  }

  async refreshDataConstantly() {
    this.refreshData()
    setTimeout(() => this.refreshDataConstantly(), this.dataUpdateDelay)
  }

  reBinAndRescaleAxes() {
    //console.log("reBinAndRescaleAxes")

    this.recalculateXAxis()
    this.recalculateYAxis()
  }

  refreshData() {
    //console.log("refreshData")

    // Select the bar rectangles, or nothing if they haven't been created
    const barElements = d3.select(this.mainGroup!).selectAll("rect")
      .data(this.bins())

    barElements
      .join(
        (enter) => {
          return enter.append("rect")
            .attr("x", 1)
            .attr("transform", this.barTransformation)
            .attr("width", this.barWidth)
            .style("fill", "#69b3a2")
            .attr("height", this.barHeight)
        },
        (update) => {
          update
            .transition()
            .duration(this.dataUpdateDelay * 0.9)
            .attr("x", 1)
            .attr("transform", this.barTransformation)
            .attr("width", this.barWidth)
            .attr("height", this.barHeight)
            .style("fill", "#69b3a2")

          return update
        },
      )
  }

  barTransformation(d: d3.Bin<Citizen, number>) {
    return "translate(" + this.xScaleInternal(d.x0!) + "," + this.yScaleInternal(d.length) + ")"
  }

  barWidth(d: d3.Bin<Citizen, number>) {
    return this.xScaleInternal(d.x1!) - this.xScaleInternal(d.x0!) - 1 
  }

  barHeight(d: d3.Bin<Citizen, number>) {
    return this.chartHeight - this.yScaleInternal(d.length)
  }
}
</script>
