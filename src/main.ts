import Vue from 'vue'
import "reflect-metadata"

import App from './App.vue'

import {container} from "tsyringe" 
import {GameLoop} from "./loop"

Vue.config.productionTip = false


const gameLoop = container.resolve(GameLoop)

console.log(gameLoop)

gameLoop.runNextGameUpdateRepeatedlyUntilPaused()

new Vue({
  render: (h) => h(App),
}).$mount('#app');
