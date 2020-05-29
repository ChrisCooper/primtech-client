<template>
  <div class="page-header">
    <h1>{{ msg }}</h1>
  </div>
</template>

<!-- Styles -->
<style scoped lang="scss">
h1 {
  text-align: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PageHeader extends Vue {
  @Prop() private msg!: string;
}
</script>

