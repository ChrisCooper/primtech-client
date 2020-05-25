// process.version = 'v10.19.0';

import Vue from 'vue';
import * as grpcWeb from 'grpc-web';

import App from './App.vue';
import store from './store';

import {Citizen, Void} from './proto/citizen_pb';
import {CitizenServiceClient} from './proto/citizen_grpc_web_pb';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');


console.log("Starting client application");
const citizenClient = new CitizenServiceClient('http://localhost:8980');
console.log("Created citizen client");

const clientCitizen = new Citizen();
clientCitizen.setId(55);
clientCitizen.setName("ClientyCitizen");
console.log("Created client-side citizen");

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





/*

// Create a default SSL ChannelCredentials object.
auto channel_creds = grpc::SslCredentials(grpc::SslCredentialsOptions());
// Create a channel using the credentials created in the previous step.
auto channel = grpc::CreateChannel(server_name, channel_creds);
// Create a stub on the channel.
std::unique_ptr<Greeter::Stub> stub(Greeter::NewStub(channel));
// Make actual RPC calls on the stub.
grpc::Status s = stub->sayHello(&context, *request, response);


*/


