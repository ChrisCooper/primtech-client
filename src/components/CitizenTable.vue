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
      </tbody>
    </table>
  </section>
</template>

<!-- Styles -->
<style scoped lang="scss">

</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class CitizenTable extends Vue {
}
</script>
