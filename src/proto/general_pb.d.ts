import * as jspb from "google-protobuf"

export class Void extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Void.AsObject;
  static toObject(includeInstance: boolean, msg: Void): Void.AsObject;
  static serializeBinaryToWriter(message: Void, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Void;
  static deserializeBinaryFromReader(message: Void, reader: jspb.BinaryReader): Void;
}

export namespace Void {
  export type AsObject = {
  }
}

