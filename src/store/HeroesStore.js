import { observable, makeObservable, action } from "mobx";

class HeroesStore {

    heroes = []

    SetHeroes(props) {
        this.heroes = props
    }

    enemyTeam = []

    SetEnemyTeam = (props) => {
        this.enemyTeam = props
    }

    matchups = {}

    AddMatchUp = (key, value) => {
        this.matchups[key] = value
    }

    isLoading = false

    SetIsLoading = (props) => {
        this.isLoading = props
    }

    constructor() {
        makeObservable(this, {
            heroes: observable,
            SetHeroes: action,
            enemyTeam: observable,
            SetEnemyTeam: action,
            matchups: observable,
            AddMatchUp: action,
            isLoading:observable,
            SetIsLoading:action
        })
    }
}

const Store = new HeroesStore
export default Store