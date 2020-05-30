import Vue from 'vue'
import "reflect-metadata"

import App from './App.vue'

Vue.config.productionTip = false

import {container} from "tsyringe"
import {GameLoop} from "./loop"

const gameLoop = container.resolve(GameLoop)

console.log(gameLoop)

gameLoop.runNextGameUpdateRepeatedlyUntilPaused()

App
// new Vue({
//   render: (h) => h(App),
// }).$mount('#app');
