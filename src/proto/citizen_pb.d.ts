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

export class Citizen extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Citizen.AsObject;
  static toObject(includeInstance: boolean, msg: Citizen): Citizen.AsObject;
  static serializeBinaryToWriter(message: Citizen, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Citizen;
  static deserializeBinaryFromReader(message: Citizen, reader: jspb.BinaryReader): Citizen;
}

export namespace Citizen {
  export type AsObject = {
    id: number,
    name: string,
  }
}

