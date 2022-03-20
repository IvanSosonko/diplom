import React from "react"
import { observer } from "mobx-react-lite"
import HeroesStore from '../store/HeroesStore'
import { HeroesMatchups } from '../controllers/HeroesController'
import { configMain } from "../configs/configMain"

const Heroes = observer(() => {
    const [filter, setFilter] = React.useState("")
    let heroes = Object.keys(HeroesStore.heroes ? HeroesStore.heroes : {})

    return (
        <section style={{ width: "300px", height: "100%", background: "#212121" }}>
            <article style={{ display: "flex", height: "60px", width: "200px", margin: "auto", alignItems: "center" }}>
                <input value={filter} onChange={(event) => { setFilter(event.target.value) }} />
                <button onClick={() => { setFilter("") }}>
                    x
                </button>
            </article>
            <section style={{ height: "calc(100% - 60px)", width: "100%", overflow: "auto" }}>
                {heroes.map((element, index) => {
                    return (
                        <section
                            style={{
                                height: "75px",
                                width: '145px',
                                margin: "15px auto",
                                display: HeroesStore?.heroes[element].localized_name.indexOf(filter) === -1 ? "none" : "inherit",
                                background: `url(${configMain.serverUrl}${HeroesStore.heroes[element]?.img})`,
                                backgroundSize: "145px 75px",
                                cursor: "pointer",
                                opacity: HeroesStore.enemyTeam.indexOf(element) === -1 ? 1 : 0.3
                            }}
                            onClick={async (event) => {
                                if (!HeroesStore.matchups[element]) {
                                    HeroesStore.SetIsLoading(true)
                                    let matchup = await HeroesMatchups(HeroesStore.heroes[element].id)
                                    HeroesStore.AddMatchUp(HeroesStore.heroes[element].id, matchup)
                                    HeroesStore.SetIsLoading(false)
                                }
                                if (HeroesStore.enemyTeam.indexOf(element) === -1) {
                                    if (HeroesStore.enemyTeam.length === 5) {
                                        let newEnemyTeam = [...HeroesStore.enemyTeam, element]
                                        newEnemyTeam.shift()
                                        HeroesStore.SetEnemyTeam(newEnemyTeam)
                                    } else {
                                        HeroesStore.SetEnemyTeam([...HeroesStore.enemyTeam, element])
                                    }

                                }

                            }}
                        >
                            <span style={{ color: "#ffffff" }}>{HeroesStore.heroes[element].localized_name}</span>
                        </section>
                    )
                })}
            </section>
        </section>
    )
})

export default Heroes