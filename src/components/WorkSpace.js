import HeroesStore from '../store/HeroesStore'
import React from "react"
import { observer } from "mobx-react-lite"
import { HeroesMatchups } from '../controllers/HeroesController'
import { configMain } from "../configs/configMain"

const imageSizes = { width: 145, height: 75 }

const WorkSpace = observer(() => {
    const [counterSupportHeroes, setCounterSupportHeroes] = React.useState()
    const [counterCarryHeroes, setCounterCarryHeroes] = React.useState()

    const initCounterHeroes = () => {
        let heroesIdArr = Object.keys(HeroesStore.heroes)
        let carryCounters = []
        let supportCounters = []
        for (let i = 0; i < HeroesStore.enemyTeam.length; i++) {
            for (let heroId of heroesIdArr) {
                if (HeroesStore.enemyTeam.indexOf(heroId) === -1) {
                    if (HeroesStore.heroes[heroId].roles.includes("Carry")) {
                        if (carryCounters[heroId]) {
                            carryCounters[heroId].potential = (carryCounters[heroId].potential * (i + 1) + (100 - HeroesStore.matchups[HeroesStore.enemyTeam[i]]?.[heroId] - 50)) / (i + 1)
                        } else {
                            carryCounters[heroId] = { id: heroId, potential: 100 - HeroesStore.matchups[HeroesStore.enemyTeam[i]]?.[heroId] - 50 }
                        }
                    } else {
                        if (supportCounters[heroId]) {
                            supportCounters[heroId].potential = (supportCounters[heroId].potential * (i + 1) + (100 - HeroesStore.matchups[HeroesStore.enemyTeam[i]]?.[heroId] - 50)) / (i + 1)
                        } else {
                            supportCounters[heroId] = { id: heroId, potential: 100 - HeroesStore.matchups[HeroesStore.enemyTeam[i]]?.[heroId] - 50 }
                        }
                    }

                }
            }
        }
        carryCounters.sort((a, b) => a?.potential > b?.potential ? -1 : 1)
        supportCounters.sort((a, b) => a?.potential > b?.potential ? -1 : 1)

        carryCounters.sort((a, b) => a?.potential > b?.potential ? -1 : 1)
        supportCounters.sort((a, b) => a?.potential > b?.potential ? -1 : 1)

        setCounterCarryHeroes(carryCounters)
        setCounterSupportHeroes(supportCounters)
    }
    React.useEffect(initCounterHeroes, [HeroesStore.enemyTeam, HeroesStore.matchups])

    return (
        <article style={{ width: "calc(100% - 300px)", height: "100%", background: "#060606" }}>
            <article style={{ display: "flex", height: "150px", width: "1000px", margin: "auto", alignItems: "center" ,justifyContent:"flex-start" }}>
                {HeroesStore.enemyTeam.map((element, index) => {

                    if (element.potential !== NaN) {
                        return (
                            <section
                                style={{
                                    height: "75px",
                                    width: '145px',
                                    margin: "15px 10px",
                                    background: `url(${configMain.serverUrl}${HeroesStore.heroes[element]?.img})`,
                                    backgroundSize: `${imageSizes.width + Math.random()}px ${imageSizes.height + Math.random()}px`,
                                    cursor: "pointer",
                                }}
                                onClick={async (event) => {
                                    if (HeroesStore.enemyTeam.includes(element)) {
                                        let newEnemyTeam = [...HeroesStore.enemyTeam]
                                        newEnemyTeam.splice(newEnemyTeam.indexOf(element), 1)
                                        HeroesStore.SetEnemyTeam(newEnemyTeam)
                                    }
                                }}
                            >
                                <span style={{ color: "#ffffff" }}>{HeroesStore.heroes[element].localized_name}</span>
                            </section>
                        )
                    } else {
                        return <></>
                    }

                })}
            </article>
            <hr/>
            <section style={{ height: "calc(100% - 200px)", width: "100%", overflow: "auto", display: "flex", width: "1000px", padding: "10px", margin: "auto"}}>
                <section style={{ height: "100%", width: "50%" }}>
                    <section style={{color:"#ffffff",fontSize:"20px",marginLeft:"130px",marginBottom:"20px"}}>Carry:</section>
                    {counterCarryHeroes?.map((element, index) => {
                        if (element.potential || element.potential === 0) {
                            return (
                                <section
                                    style={{
                                        display: "flex",
                                        height: "75px",
                                        width: "300px",
                                        background: element.potential > 0 ?
                                            `rgba(0,255,13,${element.potential / 100})`
                                            :
                                            `rgba(247,0,0,${element.potential / 100 * -1})`,
                                        marginBottom: "10px"
                                    }}>
                                    <img src={`${configMain.serverUrl}${HeroesStore.heroes[element.id]?.img}`} height="75" />
                                    <section>
                                        <section style={{ color: "#ffffff" }}>
                                            {HeroesStore.heroes[element.id]?.localized_name}
                                        </section>
                                        <section style={{ color: "#ffffff" }}>
                                            {element.potential > 0 ? "+" + Math.round(element.potential) : Math.round(element.potential)}
                                        </section>
                                    </section>
                                </section>
                            )
                        } else {
                            return <></>
                        }
                    })}
                </section>
                <section style={{ height: "100%", width: "50%" }}>
                <section style={{color:"#ffffff",fontSize:"20px",marginLeft:"130px",marginBottom:"20px"}}>Support:</section>
                    {counterSupportHeroes?.map((element, index) => {
                        if (element.potential !== NaN) {
                            return (
                                <section
                                    style={{
                                        display: "flex",
                                        height: "75px",
                                        width: "300px",
                                        background: element.potential > 0 ?
                                            `rgba(0,255,13,${element.potential / 100})`
                                            :
                                            `rgba(247,0,0,${element.potential / 100 * -1})`,
                                        marginBottom: "10px"
                                    }}>
                                    <img src={`${configMain.serverUrl}${HeroesStore.heroes[element.id]?.img}`} height="75" />
                                    <section>
                                        <section style={{ color: "#ffffff" }}>
                                            {HeroesStore.heroes[element.id]?.localized_name}
                                        </section>
                                        <section style={{ color: "#ffffff" }}>
                                            {element.potential > 0 ? "+" + Math.round(element.potential) : Math.round(element.potential)}
                                        </section>
                                    </section>
                                </section>
                            )
                        } else {
                            return <></>
                        }
                    })}
                </section>
            </section>
        </article>
    )
})

export default WorkSpace