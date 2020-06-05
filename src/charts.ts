import {container} from "tsyringe" 
import { Citizen, CitizenManager } from '@/citizen/citizens'

export interface ValueGetter<TDataType> {
    title: string;
    getter: (d: TDataType) => number;
    xTitle: string;
    yTitle: string;
}

export class HistogramConfig<TDataType> {
    constructor(
        readonly dataSource: Array<TDataType>,
        readonly valueGetters: Array<ValueGetter<TDataType>>
    ) {}
}

const nutritionGetter: ValueGetter<Citizen> = {title: "🥕 Nutrition", getter: (c: Citizen): number => c.nutritionDays, xTitle: "days remaining", yTitle: "# of citizens"}
const ageGetter: ValueGetter<Citizen> = {title: "👴 Age", getter: (c: Citizen): number => c.currentAgeYears, xTitle: "years old", yTitle: "# of citizens"}
const moneyGetter: ValueGetter<Citizen> = {title: "💲 Money", getter: (c: Citizen): number => c.money, xTitle: "dollars", yTitle: "# of citizens"}

export const citizenHistogramConfig = new HistogramConfig<Citizen>(container.resolve(CitizenManager).citizens, [nutritionGetter, ageGetter, moneyGetter])

