import * as jspb from "google-protobuf"

import * as general_pb from './general_pb';

export class FrameInfo extends jspb.Message {
  getFrameNumber(): number;
  setFrameNumber(value: number): void;

  getActualFrameTimeNanos(): number;
  setActualFrameTimeNanos(value: number): void;

  getTargetFrameTimeNanos(): number;
  setTargetFrameTimeNanos(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FrameInfo.AsObject;
  static toObject(includeInstance: boolean, msg: FrameInfo): FrameInfo.AsObject;
  static serializeBinaryToWriter(message: FrameInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FrameInfo;
  static deserializeBinaryFromReader(message: FrameInfo, reader: jspb.BinaryReader): FrameInfo;
}

export namespace FrameInfo {
  export type AsObject = {
    frameNumber: number,
    actualFrameTimeNanos: number,
    targetFrameTimeNanos: number,
  }
}

