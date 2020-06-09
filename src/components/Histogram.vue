<template>
  <section>
    <svg className="container" v-bind:width="totalWidth" v-bind:height="totalHeight">
      <g ref="mainGroup" v-bind:transform="marginTransform">
        <g ref="xAxis" class="xAxis" :transform="`translate(0, ${this.chartHeight})`"></g>
        <g ref="yAxis" class="yAxis"></g>
        <g ref="barsGroup" class="barsGroup"></g>
        <g ref="selectionBarsGroup" class="selectionBarsGroup"></g>
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

.data-button {
  margin: 5px;
  @extend .button, .is-outlined, .is-rounded, .is-small;
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

class BarType {
  constructor(
    public group: HTMLElement,
    public bins: d3.Bin<any, number>[],
    public colorString: string,
    public classString: string,
    public isSelection: boolean,
  ) {}
}

@Component
export default class Histogram extends Vue {
  @Prop() histogramConfig!: HistogramConfig<TDataElem>

  @Prop({default: 500}) dataUpdateDelay!: number
  @Prop({default: 5000}) axesUpdateDelay!: number
  @Prop({default: 15}) numBins!: number
  @Prop({default: 0}) startIndex!: number
  

  private selectionM = container.resolve(SelectionManager)
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
  @Ref('xAxis') readonly xAxis!: HTMLElement
  @Ref('yAxis') readonly yAxis!: HTMLElement
  @Ref('barsGroup') readonly barsGroup!: HTMLElement
  @Ref('selectionBarsGroup') readonly selectionBarsGroup!: HTMLElement

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

      this.xAxisGroup = d3.select(this.xAxis).node() as any
      this.yAxisGroup = d3.select(this.yAxis).node() as any
    
      this.setValueGetter(this.startIndex)

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

  bins(useSelection = false): d3.Bin<TDataElem, number>[] {
    //console.log("Bins")
    const histogram = this.genHistogram()

    const data = useSelection ? this.selectionM.selection : this.data

    return histogram(data)
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
    this.refreshData(true)
    setTimeout(() => this.refreshDataConstantly(), this.dataUpdateDelay)
  }

  reBinAndRescaleAxes() {
    //console.log("reBinAndRescaleAxes")

    this.recalculateXAxis()
    this.recalculateYAxis()
  }

  refreshData(useTransition = false) {
    //console.log("refreshData")

    // Select the bar rectangles, or nothing if they haven't been created
    const barElements = d3.select(this.mainGroup!).selectAll("rect")
      .data(this.bins())

    const barTypes: Array<BarType> = [
      new BarType(this.barsGroup, this.bins(), "#69b3a2", "", false),
      new BarType(this.selectionBarsGroup, this.bins(true), "#1b6eff", "selection", false),
    ]

    barTypes.forEach(barType => {
      let selectString = "rect"
      if (barType.classString != "") {
        selectString = `${selectString}.${barType.classString}` 
      }

      const barElements = d3.select(barType.group).selectAll(selectString)
        .data(barType.bins)

      barElements
        .join(
          (enter) => {
            let e = enter.append("rect")
              .attr("class", barType.classString)
              .attr("x", 1)
              .attr("transform", this.barTransformation)
              .attr("width", this.barWidth)
              .style("fill", barType.colorString)
              .attr("height", this.barHeight)
            
            if (!barType.isSelection) {
              e = e.on("click", datum => {
                if (d3.event.shiftKey) {
                  this.selectionM.addToSelection(datum)
                } else if (d3.event.ctrlKey) {
                  this.selectionM.removeFromSelection(datum)
                } else {
                  this.selectionM.select(datum)
                }
              })
            }

            return e
          },
          (update) => {
            let u = update

            if (useTransition) {
              u = u
              .transition()
              .duration(this.dataUpdateDelay * 0.9) as any
            }
            u
              .attr("x", 1)
              .attr("transform", this.barTransformation)
              .attr("width", this.barWidth)
              .attr("height", this.barHeight)
              .style("fill", barType.colorString)

            return update
          },
        )
      });
  }

  barTransformation(d: d3.Bin<TDataElem, number>) {
    return "translate(" + this.xScaleInternal(d.x0!) + "," + this.yScaleInternal(d.length) + ")"
  }

  barWidth(d: d3.Bin<TDataElem, number>) {
    const width = this.xScaleInternal(d.x1!) - this.xScaleInternal(d.x0!) - 1
    return Math.max(0, width)
  }

  barHeight(d: d3.Bin<TDataElem, number>) {
    return this.chartHeight - this.yScaleInternal(d.length)
  }
}
</script>
