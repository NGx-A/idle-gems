let game = {
    version: "v0.1.0",
    lastUpdate: Date.now(),
    currentTab: "gem-container",

    currency: {
        shard: 5,
        mana: 0,
    },
    //check if unlocked
    runesUnlocked: false,
}
const tabs = document.querySelectorAll(".tab")

let gems = []

class gem {
    constructor(cost, costScaling, amount, effect, tier, speed, time, timeNeeded, mana) {
        this.cost = cost
        this.costScaling = costScaling
        this.amount = 0
        this.effect = 0
        this.tier = 0
        this.speed = speed               //progress per second
        this.time = 0           
        this.timeNeeded = timeNeeded    //in seconds
        this.mana = 0
    }
}

let basic_gem = new gem(5, 1.25, null, null, null, 1, null, 5, null)
let normal_gem = new gem(100, 1.35, null, null, null, 1, null, 7.5, null)
let advanced_gem = new gem(250, 1.65, null, null, null, 1, null, 60, null)
let mana_gem = new gem(1000, 2, null, null, null, 1, null, 180, null)

const gameLoop = () => {
    let diff = (Date.now() - game.lastUpdate) / 1000

    for(i = 0; i < gems.length; i++) {
        if(gems[i].timeNeeded == null) return
        if(gems[i].time < gems[i].timeNeeded && gems[i].amount != 0) {
            gems[i].time += gems[i].speed * diff
            document.querySelectorAll(".progress")[i].style.width = `${gems[i].time / gems[i].timeNeeded * 25}vmin`
            if (gems[i].time >= gems[i].timeNeeded){
                gems[i].time = 0
                if(i == 0) game.currency.shard += basic_gem.effect
                if(i == 1) game.currency.shard += normal_gem.effect
                if(i == 2) basic_gem.amount += advanced_gem.effect
                if(i == 3) game.currency.mana += mana_gem.amount
                gems[i].speed = (1 + (gems[i].amount - gems[i].amount % 10) / 100 + gems[i].mana * 0.1) * (1 + speed_rune.effect + mega_speed_rune.effect)
                setGemEffect()
                if(game.currency.shard >= 1e3) document.querySelector(".runePrestige").style.display = "flex"
            }
        } 
    }
   
    game.lastUpdate = Date.now()
}

const craftGem = (id) => {
    if(game.currency.shard < gems[id].cost) return
    game.currency.shard -= gems[id].cost
    gems[id].amount++
    gems[id].cost = gems[id].cost * gems[id].costScaling * (1 - cost_rune.effect)
    gems[id].speed = (1 + (gems[id].amount - gems[id].amount % 10) / 100 + gems[id].mana * 0.1) * (1 + speed_rune.effect + mega_speed_rune.effect)
    setGemEffect()
    if(id == 3) {
        document.querySelectorAll(".shard")[1].style.display = "inline"
        for(i = 0; i < gem_manafy.length; i++) {
            gem_manafy[i].style.display = "inline"
        }
    }
}

const manafyGem = (id) => {
    if(game.currency.mana < 1) return
    gems[id].mana++
    game.currency.mana--
    gems[id].speed = (1 + (gems[id].amount - gems[id].amount % 10) / 100 + gems[id].mana * 0.1) * (1 + speed_rune.effect + mega_speed_rune.effect)
    setGemEffect()
}

const setGemEffect = () => {
    basic_gem.effect = basic_gem.amount * (1 + power_rune.effect + mega_power_rune.effect) * (1 + basic_gem.mana * 0.1)
    normal_gem.effect = 5 * normal_gem.amount * (1 + power_rune.effect + mega_power_rune.effect) * (1 + normal_gem.mana * 0.1)
    advanced_gem.effect = advanced_gem.amount * (1 + power_rune.effect + mega_power_rune.effect) * (1 + advanced_gem.mana * 0.1)
    mana_gem.effect = mana_gem.amount * (1 + power_rune.effect + mega_power_rune.effect) * (1 + mana_gem.mana * 0.1)
}

const openTab = (tab) => {
    for(i = 0; i < tabs.length; i++) {
        document.querySelectorAll(".tab")[i].style.display = "none"
    }
    document.querySelector(`#${tab}`).style.display = "grid"
    game.currentTab = tab
}

document.querySelector(".version").textContent = game.version

setInterval(gameLoop, 50)