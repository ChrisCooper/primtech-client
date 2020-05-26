import * as grpcWeb from 'grpc-web';

import * as general_pb from './general_pb';

import {FrameInfo} from './game_pb';

export class GameServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  streamFrames(
    request: general_pb.Void,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<FrameInfo>;

}

export class GameServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  streamFrames(
    request: general_pb.Void,
    metadata?: grpcWeb.Metadata
  ): grpcWeb.ClientReadableStream<FrameInfo>;

}

