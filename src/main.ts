import Vue from 'vue';
import * as grpcWeb from 'grpc-web';

import App from './App.vue';

import {Citizen} from './proto/citizen_pb';
import {CitizenServiceClient} from './proto/citizen_grpc_web_pb';
import { GameServiceClient } from './proto/game_grpc_web_pb';
import { FrameInfo } from './proto/game_pb';
import { Void } from './proto/general_pb';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');


console.log("Starting client application");
const citizenClient = new CitizenServiceClient('http://localhost:8080');

const request = new Void();

const call = citizenClient.getCitizen(request, undefined,  (err: grpcWeb.Error, response: Citizen) => {
  if (err){
    console.log("Received error sending Citizen request", err);
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


const gameClient = new GameServiceClient('http://localhost:8080');

const frameStream = gameClient.streamFrames(request, undefined);

frameStream.on('data', (frameInfo: FrameInfo) => {
  console.log("New FrameInfo", frameInfo);
});
frameStream.on('status', function(status) {
  console.log("FrameStream status: ", status);
});
