import {CitizenManager} from "./citizens";
import {injectable} from "tsyringe";

@injectable()
export class PrimTech {
  constructor(public citizens: CitizenManager) {}
}

