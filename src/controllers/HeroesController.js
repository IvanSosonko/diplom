import HeroesStore from '../store/HeroesStore'
import { configMain } from '../configs/configMain'

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const HeroesMatchups = async (id) => {
    let res = await fetch(`${configMain.serverUrl}/api/heroes/${id}/matchups`,
        {
            method: "GET"
        }
    )
        .then((ans) => ans.json())
        .then((ans) => { return ans })
    let ansArr = {}
    for (let matchup of res) {
        if (matchup.games_played < 10) {
            ansArr[matchup.hero_id] = 100 / (matchup.games_played + 10 - matchup.games_played) * (matchup.wins + 10 - matchup.games_played) /2
        } else {
            ansArr[matchup.hero_id] = 100 / matchup.games_played * matchup.wins
        }

    }

    // await sleep(1000)
    return ansArr
}

const InitHeroesData = async () => {
    let res = await fetch(`${configMain.serverUrl}/api/heroStats`,
        {
            method: "GET"
        }
    )
        .then((ans) => ans.json())
        .then((ans) => {
            return ans
        })
    let ansArr
    if (res) {
        ansArr = {}
        for (let [index, hero] of res.entries()) {
            // let matchups = await HeroesMatchups(hero.id)
            ansArr[hero.id] = {
                id: hero.id,
                localized_name: hero.localized_name,
                roles: hero.roles,
                img: hero.img,
                // matchups:matchups
            }
        }
    }
    HeroesStore.SetHeroes(ansArr)
}

setInterval(() => { if (HeroesStore.heroes.length === 0) { InitHeroesData() } }, 1000)

export {
    InitHeroesData,
    HeroesMatchups
}
