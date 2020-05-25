// process.version = 'v10.19.0';

import Vue from 'vue';
import * as grpcWeb from 'grpc-web';

import App from './App.vue';

import {Citizen, Void} from './proto/citizen_pb';
import {CitizenServiceClient} from './proto/citizen_grpc_web_pb';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');


console.log("Starting client application");
const citizenClient = new CitizenServiceClient('http://localhost:8080');

const request = new Void();

const call = citizenClient.getCitizen(request, undefined,  (err: grpcWeb.Error, response: Citizen) => {
  if (err){
    console.log("Received error sending request", err);
    return;
  }

  console.log("Received citizen");
  console.log(response);
  console.log(response.getId());
  console.log(response.getName());
});

call.on('status', (status: grpcWeb.Status) => {
  console.log("Received new gRPC status");
  console.log(status);
  console.log(status.code);
  console.log(status.details);
  console.log(status.metadata);
});
