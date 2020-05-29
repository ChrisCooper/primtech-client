import Vue from 'vue';
import "reflect-metadata";

import App from './App.vue';

Vue.config.productionTip = false;


import {container} from "tsyringe";
import {PrimTech} from "./PrimTech";

const myPrimTech = container.resolve(PrimTech);
// myPrimTech.citizens => An instance of CitizenManager

console.log(myPrimTech);

App
// new Vue({
//   render: (h) => h(App),
// }).$mount('#app');
