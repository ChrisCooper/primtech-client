import * as grpcWeb from 'grpc-web';

import * as general_pb from './general_pb';

import {Citizen} from './citizen_pb';

export class CitizenServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  getCitizen(
    request: general_pb.Void,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: Citizen) => void
  ): grpcWeb.ClientReadableStream<Citizen>;

}

export class CitizenServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  getCitizen(
    request: general_pb.Void,
    metadata?: grpcWeb.Metadata
  ): Promise<Citizen>;

}

