import * as grpcWeb from 'grpc-web';

import * as general_pb from './general_pb';

export class TechServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  getTech(
    request: general_pb.Void,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: general_pb.Void) => void
  ): grpcWeb.ClientReadableStream<general_pb.Void>;

}

export class TechServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  getTech(
    request: general_pb.Void,
    metadata?: grpcWeb.Metadata
  ): Promise<general_pb.Void>;

}

