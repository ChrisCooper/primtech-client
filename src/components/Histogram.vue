<template>
  <section>
    <svg className="container" :width="totalWidth" :height="totalHeight">
      <g ref="mainGroup" :transform="`translate(${this.margins.left}, ${this.margins.top})`">
        <g ref="xAxis" class="xAxis" :transform="`translate(0, ${this.chartHeight})`"></g>
        <g ref="yAxis" class="yAxis"></g>
        <g ref="barsGroup" class="barsGroup"></g>
        <g ref="selectionBarsGroup" class="selectionBarsGroup"></g>
      </g>
      <text class="chart-title" text-anchor="middle" y="15" x="245">{{ currentValueGetter.title}} </text>
      <text class="axis-label" text-anchor="end" transform="rotate(-90)" y="15" x="-7">{{ currentValueGetter.yTitle}} </text>
      <text class="axis-label" text-anchor="end" x="445" y="250">{{ currentValueGetter.xTitle }}</text>
    </svg>
    <DataChooser
      :valueGetters="histogramConfig.valueGetters"
      :initialIndex="startIndex"
      @onValueGetterChange="onValueGetterChange"
    >
    </DataChooser>
  </section>
</template>

<!-- Styles -->
<style lang="scss">
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/elements/button.sass";
@import "bulma/sass/utilities/derived-variables.sass";

.axis-label {
  fill: #888;
}

.barsGroup {
  rect {
    //fill: $turquoise;
    fill: $primary;
  }
}

.selectionBarsGroup {
  rect {
    fill: $info;
  }
}

</style>

<script lang="ts"> 
import * as d3 from 'd3';
import { Component, Vue, Ref, Prop } from 'vue-property-decorator'
import {ValueGetter, HistogramConfig} from "@/charts"
import {container, scoped, Lifecycle} from "tsyringe" 
import {SelectionManager} from "@/selection"
import DataChooser from './DataChooser.vue';

type Range = [number, number]
type TDataElem = any

class BarType {
  constructor(
    public group: HTMLElement,
    public bins: d3.Bin<any, number>[],
    public classString: string,
    public isSelection: boolean,
  ) {}
}

@Component({
  components: {
    DataChooser,
  },
})
export default class Histogram extends Vue {
  @Prop() histogramConfig!: HistogramConfig<TDataElem>

  @Prop({default: 500}) dataUpdateDelay!: number
  @Prop({default: 5000}) axesUpdateDelay!: number
  @Prop({default: 15}) numBins!: number
  @Prop({default: 0}) startIndex!: number
  
  private selectionM: SelectionManager  

  private currentValueGetter!: ValueGetter<TDataElem>
  private dataArray!: Array<TDataElem>
 
  chartHeight = 200
  chartWidth = 400
  margins = {top: 20, right: 30, bottom: 40, left: 40}

  private totalHeight = this.chartHeight + this.margins.top + this.margins.bottom
  private totalWidth = this.chartWidth + this.margins.left + this.margins.right

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

  constructor() {
    super()
     this.selectionM = container.resolve(SelectionManager)
     this.currentValueGetter = this.histogramConfig.valueGetters[this.startIndex]
     this.dataArray = this.histogramConfig.dataSource
  }

  mounted(): void { 
    //console.log("Histogram mounted")

    this.$nextTick(() => {
      // Code that will run only after the
      // entire view has been rendered 
      const mainGroup = d3.select(this.mainGroup)

      this.xAxisGroup = d3.select(this.xAxis).node() as any
      this.yAxisGroup = d3.select(this.yAxis).node() as any
    
      this.refreshAxesConstantly()
      this.refreshDataConstantly()
    })
  }

  onValueGetterChange(valueGetter: ValueGetter<TDataElem>) {
    this.currentValueGetter = valueGetter
    this.reBinAndRescaleAxes()
    //this.refreshAllOnce()
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

    const data = useSelection ? this.selectionM.selection : this.dataArray

    return histogram(data)
  }

  recalculateXAxis() {
    const maxVal = d3.max(this.dataArray, this.currentValueGetter.getter) as number

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

    const barTypes: Array<BarType> = [
      new BarType(this.barsGroup, this.bins(), "", false),
      new BarType(this.selectionBarsGroup, this.bins(true), "selection", false),
    ]

    barTypes.forEach(barType => {
      let selectString = "rect"
      if (barType.classString != "") {
        selectString = `${selectString}.${barType.classString}` 
      }

      // Select the bar rectangles, or nothing if they haven't been created
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

            return update
          },
        )
      });
  }

  barTransformation(d: d3.Bin<TDataElem, number>) {
    return `translate(${this.xScaleInternal(d.x0!)}, ${this.yScaleInternal(d.length)})`
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
