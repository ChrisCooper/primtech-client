<template>
  <section>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th><abbr title="Nutrition">Nutr</abbr></th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th>ID</th>
          <th><abbr title="Nutrition">Nutr</abbr></th>
        </tr>
      </tfoot>
      <tbody>
        <tr>
          <td>1</td>
          <td>1503</td>
        </tr>
        <tr v-for="citizen in citizens" :key="citizen.id">
          <td>REAL CITIZEN</td>
          <td>EXISTS HERE</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<!-- Styles -->
<style scoped lang="scss">

</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Citizen } from '../citizens';

@Component
export default class CitizenTable extends Vue {
  private citizens: Array<Citizen> = []
}
</script>
