import {scoped, Lifecycle} from "tsyringe";
import { GameConfig } from '@/config';
import { Citizen } from '@/citizen/citizens';

@scoped(Lifecycle.ContainerScoped)
export class ForagingManager {
    private foragableStocks: number

    constructor(
        private config: GameConfig
    ) {
        this.foragableStocks = this.config.maxForageStocks
    }

    forageANdReturnNutritionAmount(c: Citizen): number {
        const efficiency = this.stockLevelFraction

        const amountForaged = this.config.maxAmountPerForage * efficiency

        this.foragableStocks -= amountForaged
        return amountForaged
    }

    update() {
        const refreshLevel = this.config.forageStockRefreshRatePerHour

        // Fixed amount grows per hour
        // Amount that expires per hour is dependant on the current stocks
        const change = refreshLevel - (this.stockLevelFraction * refreshLevel)

        this.foragableStocks += change

        this.foragableStocks = Math.max(0, Math.min(this.config.maxForageStocks, this.foragableStocks))

        console.log(`${change} = ${refreshLevel} - (${this.stockLevelFraction} * ${refreshLevel})`)
        console.log(`Foraging stocks: ${this.foragableStocks.toFixed(0)}`)
    }

    get stockLevelFraction(): number {
        return this.foragableStocks / this.config.maxForageStocks
    }
}
