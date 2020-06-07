import {GameConfig} from "@/config"
import {TimeManager} from "@/time"
import {Utils} from "@/utils"
import {container, scoped, Lifecycle} from "tsyringe" 
import { Citizen } from './citizen/citizens'


type SelectionListener = (s: Citizen[]) => void

@scoped(Lifecycle.ContainerScoped)
export class SelectionManager {
    constructor(private config: GameConfig, private timeManager: TimeManager) {}

    public selection = new Array<Citizen>()

    public listeners = new Array<SelectionListener>()

    onSelectionUpdated(func: SelectionListener) {
        this.listeners.push(func)
    }

    select(citizens: Array<Citizen>) {
        this.selection = citizens
        this.listeners.forEach(func => func(this.selection))
    }

    addToSelection(citizens: Array<Citizen>) {
        citizens.forEach(c => {
            if (this.selection.indexOf(c) == -1) {
                this.selection.push(c)
            }
        })
        this.listeners.forEach(func => func(this.selection))
    }

    removeFromSelection(citizens: Array<Citizen>) {
        citizens.forEach(c => {
            const index = this.selection.indexOf(c)
            if (index != -1) {
                this.selection.splice(index, 1)
            }
        })
        this.listeners.forEach(func => func(this.selection))
    }
}

