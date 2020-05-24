import * as grpcWeb from 'grpc-web';

import {
  Citizen,
  Void} from './citizen_pb';

export class CitizenServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  getCitizen(
    request: Void,
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
    request: Void,
    metadata?: grpcWeb.Metadata
  ): Promise<Citizen>;

}

