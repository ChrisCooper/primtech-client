// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var citizen_pb = require('./citizen_pb.js');

function serialize_primtech_Citizen(arg) {
  if (!(arg instanceof citizen_pb.Citizen)) {
    throw new Error('Expected argument of type primtech.Citizen');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_primtech_Citizen(buffer_arg) {
  return citizen_pb.Citizen.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_primtech_Void(arg) {
  if (!(arg instanceof citizen_pb.Void)) {
    throw new Error('Expected argument of type primtech.Void');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_primtech_Void(buffer_arg) {
  return citizen_pb.Void.deserializeBinary(new Uint8Array(buffer_arg));
}


var CitizenServiceService = exports.CitizenServiceService = {
  getCitizen: {
    path: '/primtech.CitizenService/GetCitizen',
    requestStream: false,
    responseStream: false,
    requestType: citizen_pb.Void,
    responseType: citizen_pb.Citizen,
    requestSerialize: serialize_primtech_Void,
    requestDeserialize: deserialize_primtech_Void,
    responseSerialize: serialize_primtech_Citizen,
    responseDeserialize: deserialize_primtech_Citizen,
  },
};

exports.CitizenServiceClient = grpc.makeGenericClientConstructor(CitizenServiceService);
