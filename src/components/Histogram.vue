<template>
  <section>
    <svg className="container" v-bind:width="totalWidth" v-bind:height="totalHeight">
      <g ref="mainGroup" v-bind:transform="marginTransform"></g>
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

.data-button {
  margin: 5px;
  @extend .button, .is-outlined, .is-rounded, .is-small;
}
</style>

<script lang="ts"> 
import * as d3 from 'd3';
import { Component, Vue, Ref, Prop } from 'vue-property-decorator'
import {ValueGetter, HistogramConfig} from "@/charts"

type Range = [number, number] 
type TDataElem = any

@Component
export default class Histogram extends Vue {
  @Prop() histogramConfig!: HistogramConfig<TDataElem>

  @Prop({default: 500}) dataUpdateDelay!: number
  @Prop({default: 5000}) axesUpdateDelay!: number
  @Prop({default: 15}) numBins!: number

  private currentValueGetter!: ValueGetter<TDataElem>

  private data!: Array<TDataElem>
 
  chartHeight = 200
  chartWidth = 400
  margins = {top: 20, right: 30, bottom: 40, left: 40}

  private totalHeight = this.chartHeight + this.margins.top + this.margins.bottom
  private totalWidth = this.chartWidth + this.margins.left + this.margins.right

  private marginTransform = `translate(${this.margins.left}, ${this.margins.top})`

  private xScaleInternal = d3.scaleLinear()
  private yScaleInternal = d3.scaleLinear()

  private xAxisInternal = d3.axisBottom(this.xScaleInternal)
  private yAxisInternal = d3.axisLeft(this.yScaleInternal)

  private xAxisGroup: SVGGElement | null = null
  private yAxisGroup: SVGGElement | null = null

  @Ref('mainGroup') readonly mainGroup!: HTMLElement

  created() {
    this.data = this.histogramConfig.dataSource
    this.currentValueGetter = this.histogramConfig.valueGetters[0]
  }

  mounted(): void { 
    //console.log("Histogram mounted")
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

  setValueGetter(index: number) {
    this.currentValueGetter = this.histogramConfig.valueGetters[index]
    this.refreshAllOnce()
  }

  genHistogram() {
    //console.log("histogram")
    return d3.histogram<TDataElem, number>()
      .value(this.currentValueGetter.getter)
      .domain(this.xScaleInternal.domain() as [number, number])
      .thresholds(this.xScaleInternal.ticks(this.numBins))
  }

  bins(): d3.Bin<TDataElem, number>[] {
    //console.log("Bins")
    const histogram = this.genHistogram()
    return histogram(this.data)
  }

  recalculateXAxis() {
    const maxVal = d3.max(this.data, this.currentValueGetter.getter) as number

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
      .domain([0, maxVal * (1.2)])
      .nice()

    d3.select(this.yAxisGroup!).transition().duration(500).call(this.yAxisInternal)
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

  barTransformation(d: d3.Bin<TDataElem, number>) {
    return "translate(" + this.xScaleInternal(d.x0!) + "," + this.yScaleInternal(d.length) + ")"
  }

  barWidth(d: d3.Bin<TDataElem, number>) {
    return this.xScaleInternal(d.x1!) - this.xScaleInternal(d.x0!) - 1 
  }

  barHeight(d: d3.Bin<TDataElem, number>) {
    return this.chartHeight - this.yScaleInternal(d.length)
  }
}
</script>
