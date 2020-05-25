<template>
  <div id="app">
    <PageHeader msg="Primitive Technology"/>
    <CitizenTable/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import PageHeader from './components/PageHeader.vue';
import CitizenTable from './components/CitizenTable.vue';

@Component({
  components: {
    PageHeader,
    CitizenTable,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
