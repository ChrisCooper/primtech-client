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
import { CitizenManager } from '@/citizen/citizens'


type Range = [number, number]
type SmallCitizen = {
  id: string;
  age: number;
};

@Component
export default class CitizenHistogram extends Vue {
  private citizenManager = container.resolve(CitizenManager)

  chartHeight = 200
  chartWidth = 400
  margins = {top: 10, right: 30, bottom: 30, left: 40}

  private totalHeight = this.chartHeight + this.margins.top + this.margins.bottom
  private totalWidth = this.chartWidth + this.margins.left + this.margins.right

  readonly svgId = "citizenHistogram"

  data = [
    {id: "bob", age: 20},
    {id: "tim", age: 22}
  ]

  marginTransform = `translate(${this.margins.left}, ${this.margins.top})`

  xScaleInternal = d3.scaleLinear()
  yScaleInternal = d3.scaleLinear()

  @Ref('mainGroup') readonly mainGroup!: HTMLElement

  get histogram() {
    return d3.histogram<SmallCitizen, number>()
      .value((d) => {return d.age})
      .domain(this.xScaleInternal.domain() as [number, number])
      .thresholds(this.xScaleInternal.ticks(70))
  }

  get bins() {
    return this.histogram(this.data)
  }

  get xAxis() {
    const xScale = this.xScaleInternal
      .domain([0, 1000])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, this.chartWidth])
    return d3.axisBottom(xScale)
  }

  get yAxis() {
    const maxVal = d3.max(this.bins, function(d) { return d.length }) as number

    const y = this.yScaleInternal
      .range([this.chartHeight, 0])
      .domain([0, maxVal])   // d3.hist has to be called before the Y axis obviously
    
    const mainGroup = d3.select(this.mainGroup)

    return d3.axisLeft(y)
  }

  private xAxisGroup: SVGGElement | null = null
  private yAxisGroup: SVGGElement | null = null

  mounted(): void { 
    console.log("CitizenHistogram mounted")

    this.$nextTick(() => {
      // Code that will run only after the
      // entire view has been rendered 
      const mainGroup = d3.select(this.mainGroup)

      this.xAxisGroup = mainGroup.append("g")
      .attr("transform", "translate(0," + this.chartHeight + ")")
      .node()

      this.yAxisGroup = mainGroup.append("g").node()
    
      this.refresh()
    })
  }

  refresh() {
    console.log("refresh")

    this.xAxis(d3.select(this.xAxisGroup!))
    this.yAxis(d3.select(this.yAxisGroup!))

    console.log("Changing scale", this.chartWidth)
    this.chartWidth = this.chartWidth - 2
  }
}

// <Links links={graph.links} />
// <Nodes nodes={graph.nodes} simulation={this.simulation} />
// <Labels nodes={graph.nodes} />

</script>
