let game = {
    version: "v0.2.0",
    lastUpdate: Date.now(),
    currentTab: "gem-container",

    currency: {
        shard: 5,
        mana: 0,
    },
    //check if unlocked
    runesUnlocked: false,
    runeCost: 1e3,
    runePrestiges: 0,

    crystalsUnlocked: false,
}
const tabs = document.querySelectorAll(".tab")
const gem_container = document.querySelector("#gem-container")

let gems = []

class gem {
    constructor(cost, costScaling, amount, bought, effect, tier, speed, time, timeNeeded, mana, rc, gc, bc, wc, blc) {
        this.cost = cost
        this.costScaling = costScaling
        this.amount = 0
        this.bought = 0
        this.effect = 0
        this.tier = 0
        this.speed = speed               //progress per second
        this.time = 0           
        this.timeNeeded = timeNeeded    //in seconds
        this.mana = 0
        this.rc = 0
        this.gc = 0
        this.bc = 0
        this.wc = 0
        this.blc = 0
    }
}

let basic_gem = new gem(5, 1.25, null, null, null, null, 1, null, 5, null, null, null, null, null, null)
let normal_gem = new gem(50, 1.35, null, null, null, null, 1, null, 7.5, null, null, null, null, null, null)
let advanced_gem = new gem(250, 1.65, null, null, null, null, 1, null, 30, null, null, null, null, null, null)
let mana_gem = new gem(1000, 10, null, null, null, null, 1, null, 90, null, null, null, null, null, null)
let complex_gem = new gem(2.5e3, 1.65, null, null, null, null, 1, null, 60, null, null, null, null, null, null)
let enchanted_gem = new gem(3, 1.5, null, null, null, null, 1, null, 100, null, null, null, null, null, null)

const gameLoop = () => {
    let diff = (Date.now() - game.lastUpdate) / 1000

    for(i = 0; i < gems.length; i++) {
        if(gems[i].timeNeeded == null) return
        if(gems[i].time < gems[i].timeNeeded && gems[i].amount != 0) {
            gems[i].time += gems[i].speed * diff
            document.querySelectorAll(".progress")[i].style.width = `${gems[i].time / gems[i].timeNeeded * 25}vmin`
            if (gems[i].time >= gems[i].timeNeeded){
                document.querySelectorAll(".progress")[i].style.width = `0vmin`
                gems[i].time = 0
                if(i == 0) game.currency.shard += basic_gem.effect
                if(i == 1) game.currency.shard += normal_gem.effect
                if(i == 2) basic_gem.amount += advanced_gem.effect
                if(i == 3) game.currency.mana += mana_gem.effect
                if(i == 4) normal_gem.amount += complex_gem.effect
                if(i == 5) {
                    let x = 0
                    while(x < enchanted_gem.effect) {
                        let randomNumber = Math.round(Math.random() * 3)
                        if(randomNumber == 0) basic_gem.mana++
                        if(randomNumber == 1) normal_gem.mana++
                        if(randomNumber == 2) advanced_gem.mana++
                        if(randomNumber == 3) complex_gem.mana++
                        x++
                    }
                }
                if(game.currency.shard >= 1e4) {
                    game.crystalsUnlocked = true
                    document.querySelectorAll(".navBtn")[3].style.display = "inline"
                }
                
                setGemEffect()
                if(game.currency.shard >= game.runeCost) {
                    if(autoRune) return getRune()
                    document.querySelector(".prestige-container").style.display = "flex"
                }
                
            }
        } 
    }

    game.currency.shard += ((basic_gem.effect + normal_gem.effect) * production_rune.effect) * diff

    game.lastUpdate = Date.now()
}

const craftGem = (id, currencyToUse) => {
    if(game.currency[currencyToUse] < gems[id].cost) return
    game.currency[currencyToUse] -= gems[id].cost
    gems[id].amount++
    gems[id].bought++
    gems[id].cost *= gems[id].costScaling
    
    setGemEffect()
    if(id == 3) {
        document.querySelectorAll(".shard")[1].style.display = "inline"
        for(i = 0; i < gem_manafy.length; i++) {
            gem_manafy[i].style.display = "inline"
        }
    }
}

const setGemEffect = () => {
    basic_gem.effect = (1 + base_rune.effect + mega_base_rune.effect) * basic_gem.amount * runePower * runeShard * (1 + basic_gem.mana * (0.1 + mana_rune.effect)) * ((basic_gem.rc + 1) * ( basic_gem.blc + 1))
    normal_gem.effect = (5 + base_rune.effect + mega_base_rune.effect) * normal_gem.amount * runePower * runeShard * (1 + normal_gem.mana * (0.1 + mana_rune.effect)) * ((normal_gem.rc + 1) * ( normal_gem.blc + 1))
    advanced_gem.effect = advanced_gem.amount * runePower * (1 + advanced_gem.mana * (0.1 + mana_rune.effect)) * (1 + gem_rune.effect) * ((advanced_gem.rc + 1) * ( advanced_gem.blc + 1))
    mana_gem.effect = mana_gem.amount * runePower * (1 + mana_gem.mana * (0.1 + mana_rune.effect)) * (1 + mana_rune.effect) * ((mana_gem.rc + 1) * ( mana_gem.blc + 1))
    complex_gem.effect = complex_gem.amount * runePower * (1 + complex_gem.mana * (0.1 + mana_rune.effect)) * (1 + gem_rune.effect) * ((complex_gem.rc + 1) * ( complex_gem.blc + 1))
    enchanted_gem.effect = Math.floor(enchanted_gem.amount * runePower * (1 + enchanted_gem.mana * (0.1 + mana_rune.effect)) * (1 + gem_rune.effect)) * ((enchanted_gem.rc + 1) * ( enchanted_gem.blc + 1))
    for(i = 0; i < gems.length; i++) {
        gems[i].speed = (1 + (gems[i].bought - gems[i].bought % 10) / 100 + gems[i].mana * (0.1 + mana_rune.effect)) * runeSpeed * ((gems[i].bc + 1) * ( gems[i].blc + 1))
    }
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