import * as jspb from "google-protobuf"

import * as general_pb from './general_pb';

export class AptitudeLevel extends jspb.Message {
  getAptitudeId(): number;
  setAptitudeId(value: number): void;

  getLevel(): number;
  setLevel(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AptitudeLevel.AsObject;
  static toObject(includeInstance: boolean, msg: AptitudeLevel): AptitudeLevel.AsObject;
  static serializeBinaryToWriter(message: AptitudeLevel, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AptitudeLevel;
  static deserializeBinaryFromReader(message: AptitudeLevel, reader: jspb.BinaryReader): AptitudeLevel;
}

export namespace AptitudeLevel {
  export type AsObject = {
    aptitudeId: number,
    level: number,
  }
}

export class SkillLevel extends jspb.Message {
  getSkillId(): number;
  setSkillId(value: number): void;

  getLevel(): number;
  setLevel(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SkillLevel.AsObject;
  static toObject(includeInstance: boolean, msg: SkillLevel): SkillLevel.AsObject;
  static serializeBinaryToWriter(message: SkillLevel, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SkillLevel;
  static deserializeBinaryFromReader(message: SkillLevel, reader: jspb.BinaryReader): SkillLevel;
}

export namespace SkillLevel {
  export type AsObject = {
    skillId: number,
    level: number,
  }
}

export class Citizen extends jspb.Message {
  getId(): number;
  setId(value: number): void;

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
  }
}

