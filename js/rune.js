class rune {
    constructor(baseChance, chance, effect, amount, rarity) {
        this.baseChance = baseChance
        this.chance = baseChance
        this.effect = 0
        this.amount = 0
        this.rarity = rarity
    }
}



let speed_rune = new rune(100, null,null, null, "common")        
let power_rune = new rune(100, null, null, null, "common")  
let cost_rune = new rune(70, null, null, null, "common")    
let shard_rune = new rune(100, null, null, null, "common")   

let mega_speed_rune = new rune(50, null, null, null, "uncommon")
let mega_power_rune = new rune(50, null, null, null, "uncommon")

let mana_rune = new rune(25, null, null, null, "rare")

let runes = [
    speed_rune, 
    power_rune,
    cost_rune,
    shard_rune,
    mega_speed_rune,
    mega_power_rune,
    mana_rune
]

let runeSpeed = 1
let runePower = 1

let runesMaxed = 0

let totalChance = 0
for(i = 0; i < runes.length; i ++) {
    totalChance += runes[i].chance
}

const getRune = () => {
    game.runesUnlocked = true
    timesRuneChanceUp = 0
    game.currency.shard = 5
    game.currency.mana = 0

    for(i = 0; i < gems.length; i++) {
        document.querySelectorAll(".progress")[i].style.width = `0`
        gems[i].amount = 0
        gems[i].bought = 0
        gems[i].speed = 0
        gems[i].time = 0
        gems[i].mana = 0
    }   
    for(i = 0; i < runes.length; i ++) {
        runes[i].chance = runes[i].baseChance
    }

    //Get the rune 
    let randomNumber = Math.round(Math.random() * totalChance)       
    createRune(randomNumber)     

    document.querySelector(".prestige-container").style.display = "none"
    document.querySelectorAll(".gem")[3].style.display = "grid"
	document.querySelectorAll(".shard")[1].style.display = "inline"
	for(i = 0; i < gem_manafy.length; i++) {
		gem_manafy[i].style.display = "inline"
	}
    totalChance = 0
    for(i = 0; i < runes.length; i ++) {
        totalChance += runes[i].chance
    }
}

const createRune = (number) => {
    if(runesMaxed > runes.length) return
    let x = 0
    for(i = 0; i < runes.length; i++) {
        if(i == 0) {
            if(between(number, 0, runes[i].chance)) {
                if(runes[i].rarity == "common" && runes[i].amount >= 10) {
                    let randomNumber = Math.round(Math.random() * totalChance) 
                    runesMaxed++
                    createRune(randomNumber)
                }
                runes[i].amount++
            } 
            x += runes[i].chance
            } 
        if(i != 0) {
            if(between(number, x, (runes[i].chance + x))) {
                if(runes[i].rarity == "common" && runes[i].amount >= 10) {
                    let randomNumber = Math.round(Math.random() * totalChance) 
                    runesMaxed++
                    createRune(randomNumber)
                }
                if(runes[i].rarity == "uncommon" && runes[i].amount >= 7) {
                    let randomNumber = Math.round(Math.random() * totalChance) 
                    runesMaxed++
                    createRune(randomNumber)
                }
                if(runes[i].rarity == "rare" && runes[i].amount >= 5) {
                    let randomNumber = Math.round(Math.random() * totalChance) 
                    runesMaxed++
                    createRune(randomNumber)
                }
                if(runes[i].rarity == "epic" && runes[i].amount >= 3) {
                    let randomNumber = Math.round(Math.random() * totalChance) 
                    runesMaxed++
                    createRune(randomNumber)
                }
                if(runes[i].rarity == "legendary" && runes[i].amount >= 1) {
                    let randomNumber = Math.round(Math.random() * totalChance) 
                    runesMaxed++
                    createRune(randomNumber)
                }
                runes[i].amount++
            }
            x += runes[i].chance
            }
            if(runes[i].amount >= 1) runeDOM[i].style.display = "grid"
    }
    speed_rune.effect = speed_rune.amount * 0.05
    power_rune.effect = power_rune.amount * 0.05
    cost_rune.effect = cost_rune.amount * 0.015
    shard_rune.effect = shard_rune.amount * 0.05

    mega_speed_rune.effect = mega_speed_rune.amount * 0.15
    mega_power_rune.effect = mega_power_rune.amount * 0.15
    mana_rune.effect = mana_rune.amount * 0.05

    runeSpeed = 1 + speed_rune.effect + mega_speed_rune.effect
    runePower = 1 + power_rune.effect + mega_power_rune.effect

    basic_gem.cost = 5 * (1 - cost_rune.effect)
    normal_gem.cost = 50 * (1 - cost_rune.effect)
    advanced_gem.cost = 250 * (1 - cost_rune.effect)  
    mana_gem.cost = 1000 * (1 - cost_rune.effect)
    document.querySelectorAll(".chance-increase-cost")[0].textContent = 1 + timesRuneChanceUp * 2
}

let timesRuneChanceUp = 0
const upRuneChance = () => {
    if(game.currency.mana < 1 + timesRuneChanceUp * 2) return
    game.currency.mana -= 1 + timesRuneChanceUp * 2
    timesRuneChanceUp++
    document.querySelectorAll(".chance-increase-cost")[0].textContent = 1 + timesRuneChanceUp * 2
    for(i = 0; i < runes.length; i++) {
        if(runes[i].rarity != "common") runes[i].chance *= 1.1 + mana_rune.effect
    }
    totalChance = 0
    for(i = 0; i < runes.length; i ++) {
        totalChance += runes[i].chance
    }
}

const between = (x, min, max) => {
    if(x >= min && x < max) return true
    else return false
}