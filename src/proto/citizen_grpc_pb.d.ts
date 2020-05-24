// package: primtech
// file: citizen.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as citizen_pb from "./citizen_pb";

interface ICitizenServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getCitizen: ICitizenServiceService_IGetCitizen;
}

interface ICitizenServiceService_IGetCitizen extends grpc.MethodDefinition<citizen_pb.Void, citizen_pb.Citizen> {
    path: string; // "/primtech.CitizenService/GetCitizen"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<citizen_pb.Void>;
    requestDeserialize: grpc.deserialize<citizen_pb.Void>;
    responseSerialize: grpc.serialize<citizen_pb.Citizen>;
    responseDeserialize: grpc.deserialize<citizen_pb.Citizen>;
}

export const CitizenServiceService: ICitizenServiceService;

export interface ICitizenServiceServer {
    getCitizen: grpc.handleUnaryCall<citizen_pb.Void, citizen_pb.Citizen>;
}

export interface ICitizenServiceClient {
    getCitizen(request: citizen_pb.Void, callback: (error: grpc.ServiceError | null, response: citizen_pb.Citizen) => void): grpc.ClientUnaryCall;
    getCitizen(request: citizen_pb.Void, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: citizen_pb.Citizen) => void): grpc.ClientUnaryCall;
    getCitizen(request: citizen_pb.Void, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: citizen_pb.Citizen) => void): grpc.ClientUnaryCall;
}

export class CitizenServiceClient extends grpc.Client implements ICitizenServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getCitizen(request: citizen_pb.Void, callback: (error: grpc.ServiceError | null, response: citizen_pb.Citizen) => void): grpc.ClientUnaryCall;
    public getCitizen(request: citizen_pb.Void, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: citizen_pb.Citizen) => void): grpc.ClientUnaryCall;
    public getCitizen(request: citizen_pb.Void, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: citizen_pb.Citizen) => void): grpc.ClientUnaryCall;
}
