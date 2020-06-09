<template>
  <section>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th><abbr title="Years Old">Age</abbr></th>
          <th><abbr title="Nutrition">Nutr</abbr></th>
          <th>Money</th>
          <th><abbr title="Current Activity">Actv</abbr></th>
          <th><abbr title="Parents">Prnts</abbr></th>
          <th><abbr title="Children">Chlds</abbr></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="citizen in selectedCitizensOrAll" :key="citizen.id" v-bind:class="{ 'is-selected': !selectionM.isSelected(citizen) }">
          <td>{{ citizen.id }}</td>
          <td>{{ citizen.currentAgeYears.toFixed(0) }}</td>
          <td>{{ citizen.nutrition.toFixed(0) }}</td>
          <td>{{ citizen.money }}</td>
          <td>{{ citizen.currentActivity.name }}</td>
          <td>{{ citizen.showParents() }}</td>
          <td>{{ citizen.showChildren() }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<!-- Styles -->
<style scoped lang="scss">
@import "bulma/sass/utilities/_all.sass";
@import "bulma/sass/elements/table.sass";

</style>

<script lang="ts">
import {container} from "tsyringe" 
import { Component, Vue } from 'vue-property-decorator'
import { CitizenManager } from '@/citizen/citizens'
import { SelectionManager } from '../selection'

@Component
export default class CitizenTable extends Vue {
  private citizenManager = container.resolve(CitizenManager)
  private selectionM = container.resolve(SelectionManager)  

  get selectedCitizensOrAll() {
    return this.citizenManager.citizens.filter(c => this.selectionM.isSelected(c))
  }
}
</script>
 