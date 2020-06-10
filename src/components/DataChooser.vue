<template>
  <div>
    <span v-for="(vg, i) in valueGetters" :key="vg.name">
      <button :class="{ 'is-primary': i == selectedIndex }" class="data-button" v-on:click="setValueGetter(i)">
        {{ vg.title }}
      </button>
    </span>
  </div>
</template>

<!-- Styles -->
<style scoped lang="scss">
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/elements/button.sass";

button {
  margin: 5px;
  @extend .button,  .is-rounded, .is-small;

  &.current {
      @extend .is-primary;
  }
}

</style>

<!-- Code -->
<script lang="ts">
import {container} from "tsyringe"
import { Component, Vue, Ref, Prop } from 'vue-property-decorator'
import {GameLoop} from "@/loop"
import {TimeManager} from "@/time"
import {GameConfig} from "@/config"
import {ValueGetter} from "@/charts"

type TDataElem = any

@Component
export default class DataChooser extends Vue {
  @Prop() valueGetters!: Array<ValueGetter<TDataElem>>
  @Prop({default: 0}) initialIndex!: number

    private selectedIndex = this.initialIndex
    private currentValueGetter: ValueGetter<TDataElem>

  constructor() {
    super()
    this.currentValueGetter = this.valueGetters[this.selectedIndex]
  }

  setValueGetter(index: number) {
      this.selectedIndex = index
      this.currentValueGetter = this.valueGetters[index]
      this.$emit("onValueGetterChange", this.currentValueGetter);
  }
}

</script>
