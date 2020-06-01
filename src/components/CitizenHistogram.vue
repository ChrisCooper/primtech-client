<template>
  <section>
    <svg className="container" v-bind:width="totalWidth" v-bind:height="totalHeight">
      <g ref="mainGroup" v-bind:transform="marginTransform">
      </g>
    </svg>
    <button class="change-scale" v-on:click="refresh">
      Change scale
    </button>
  </section>
</template>

<!-- Styles -->
<style scoped lang="scss">

</style>

<script lang="ts">
import {container} from "tsyringe" 
import * as d3 from 'd3';

import { Component, Vue, Ref } from 'vue-property-decorator'
import { CitizenManager, Citizen } from '@/citizen/citizens'


type Range = [number, number]
type SmallCitizen = {
  id: string;
  age: number;
};

@Component
export default class CitizenHistogram extends Vue {
  citizenManager = container.resolve(CitizenManager)
  data = this.citizenManager.citizens

  chartHeight = 200
  chartWidth = 400
  margins = {top: 10, right: 30, bottom: 30, left: 40}

  numBins = 10

  private totalHeight = this.chartHeight + this.margins.top + this.margins.bottom
  private totalWidth = this.chartWidth + this.margins.left + this.margins.right

  marginTransform = `translate(${this.margins.left}, ${this.margins.top})`

  xScaleInternal = d3.scaleLinear()
  yScaleInternal = d3.scaleLinear()

  dataUpdateDelay = 100

  @Ref('mainGroup') readonly mainGroup!: HTMLElement

  valueForCitizen(c: Citizen) {
    return c.nutrition
  }

  genHistogram() {
    //console.log("histogram")
    return d3.histogram<Citizen, number>()
      .value(this.valueForCitizen)
      .domain(this.xScaleInternal.domain() as [number, number])
      .thresholds(this.xScaleInternal.ticks(this.numBins))
  }

  bins(): d3.Bin<Citizen, number>[] {
    //console.log("Bins")
    const histogram = this.genHistogram()
    return histogram(this.data)
  }

  get xAxis() {
    const maxVal = d3.max(this.data, this.valueForCitizen) as number

    const xScale = this.xScaleInternal
      .domain([0, maxVal * (1.1)])
      .range([0, this.chartWidth])
      .nice()
    return d3.axisBottom(xScale)
  }

  get yAxis() {
    const maxVal = d3.max(this.bins(), (d) => d.length) as number

    const y = this.yScaleInternal
      .range([this.chartHeight, 0])
      .domain([0, maxVal * (1.1)])   // d3.hist has to be called before the Y axis obviously
      .nice()
    
    return d3.axisLeft(y)
  }

  private xAxisGroup: SVGGElement | null = null
  private yAxisGroup: SVGGElement | null = null

  mounted(): void { 
    //console.log("CitizenHistogram mounted")

    this.$nextTick(() => {
      // Code that will run only after the
      // entire view has been rendered 
      const mainGroup = d3.select(this.mainGroup)

      this.xAxisGroup = mainGroup.append("g")
      .attr("transform", "translate(0," + this.chartHeight + ")")
      .node()

      this.yAxisGroup = mainGroup.append("g").node()
    
      this.refreshConstantly()
    })
  }

  async refreshConstantly() {
    this.refresh()
    setTimeout(() => this.refreshConstantly(), this.dataUpdateDelay);
  }

  reBinAndRescaleAxes() {
    //console.log("reBinAndRescaleAxes")

    this.xAxis(d3.select(this.xAxisGroup!))
    this.yAxis(d3.select(this.yAxisGroup!))
  }

  refresh() {
    //console.log("refresh")

    this.reBinAndRescaleAxes()

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
            .attr("height", this.barHeight)
            .style("fill", "#69b3a2")
        },
        (update) => {
          //console.log(this.bins)

          return update
            .attr("x", 1)
            .attr("transform", this.barTransformation)
            .attr("width", this.barWidth)
            .attr("height", this.barHeight)
            .style("fill", "#69b3a2")
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
