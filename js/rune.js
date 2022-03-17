let runes = []

let commonRunes = []
let uncommonRunes = []
let rareRunes = []
let epicRunes = []
let legendaryRunes = []

let commonChance = 0
let uncommonChance = 0
let rareChance = 0
let epicChance = 0
let legendaryChance = 0

const rune_container = document.querySelector("#rune-container")

class rune {
    constructor(name, desc, baseChance, chance, effect, amount, rarity) {
        this.name = name
        this.desc = desc
        this.baseChance = baseChance
        this.chance = baseChance
        this.effect = 0
        this.amount = 0
        this.rarity = rarity

        let node1 = document.createTextNode("Test")
        let runeDOM = document.createElement("div")
        runeDOM.classList.add("rune")

        let rune_nameDOM = document.createElement("span")
        rune_nameDOM.classList.add("rune-name")
        
        rune_nameDOM.appendChild(node1)

        let rune_amountDOM = document.createElement("span")
        rune_amountDOM.classList.add("rune-amount")
        let node2 = document.createTextNode("Test")
        rune_amountDOM.appendChild(node2)

        let rune_powerDOM = document.createElement("span")
        rune_powerDOM.classList.add("rune-power")

        let rune_effectDOM = document.createElement("span")
        rune_effectDOM.classList.add("rune-effect")
        let node3 = document.createTextNode("Test")
        rune_effectDOM.appendChild(node3)

        let rune_descDOM = document.createElement("span")
        rune_descDOM.classList.add("rune-desc")
        let node4 = document.createTextNode(" Test")
        rune_descDOM.appendChild(node4)

        let rune_rarityDOM = document.createElement("span")
        rune_rarityDOM.classList.add("rune-rarity")
        let node5 = document.createTextNode("Test")
        rune_rarityDOM.appendChild(node5)

        rune_powerDOM.appendChild(rune_effectDOM)
        rune_powerDOM.appendChild(rune_descDOM)
        runeDOM.appendChild(rune_nameDOM)
        runeDOM.appendChild(rune_amountDOM)
        runeDOM.appendChild(rune_powerDOM)
        runeDOM.appendChild(rune_rarityDOM)

        rune_container.appendChild(runeDOM)
    } 
}

let speed_rune = new rune("SPEED RUNE", "Speed", 200, null,null, null, "common")        
let power_rune = new rune("POWER RUNE", "Power", 200, null, null, null, "common")  
let cost_rune = new rune("COST RUNE", "Cheaper gems", 200, null, null, null, "common")    
let shard_rune = new rune("SHARD RUNE", "Shards produced", 200, null, null, null, "common")   
let bonus_rune = new rune("BONUS RUNE", "Extra shards on reset", 200, null, null, null, "common")
let base_rune = new rune("BASE RUNE", "To shard producing gems", 200, null, null, null, "common")

let mega_speed_rune = new rune("MEGA SPEED RUNE", "Speed", 50, null, null, null, "uncommon")
let mega_power_rune = new rune("MEGA POWER RUNE", "Power", 50, null, null, null, "uncommon")
let mega_shard_rune = new rune("MEGA SHARD RUNE", "Shards produced", 50, null, null, null, "uncommon")
let mega_base_rune = new rune("MEGA BASE RUNE", "To shard producing gems", 50, null, null, null, "uncommon")
let gem_rune = new rune("GEM RUNE", "Gems produced", 50, null, null, null, "uncommon")

let mana_rune = new rune("MANA RUNE", "Mana effect & production", 25, null, null, null, "rare")
let production_rune = new rune("PRODUCTION RUNE", "Shards per second", 25, null, null, null, "rare")

let rune_rune = new rune("RUNE RUNE", "Rune effect", 1, null, null, null, "legendary")
let ultra_speed_rune = new rune("ULTRA SPEED RUNE", "Speed", 1, null, null, null, "legendary")
let ultra_power_rune = new rune("ULTRA POWER RUNE", "Power",1, null, null, null, "legendary")

let runeSpeed = 1
let runePower = 1
let runeShard = 1

let runesMaxed = 0
let runesGotten = 0

let totalChance = 0
for(i = 0; i < runes.length; i ++) {
    totalChance += runes[i].chance
}

const getRune = () => {
    game.runePrestiges++
    let randomNumber = Math.round(Math.random() * totalChance)      
    createRune(randomNumber) 

    game.runesUnlocked = true
    timesRuneChanceUp = 0
    game.currency.shard = 5 + bonus_rune.effect
    game.currency.mana = 0
    game.runeCost = 1000 + (250 * game.runePrestiges) * (1 + Math.floor(game.runePrestiges / 10))

    for(i = 0; i < gems.length; i++) {
        document.querySelectorAll(".progress")[i].style.width = `0`
        gems[i].amount = 0 + gems[i].wc * (1 + gems[i].blc)
        gems[i].bought = 0
        gems[i].speed = 0
        gems[i].time = 0
        gems[i].mana = 0
    }   

    document.querySelector(".prestige-container").style.display = "none"
    document.querySelectorAll(".gem")[3].style.display = "grid"
    document.querySelectorAll(".gem")[4].style.display = "grid"
    document.querySelectorAll(".gem")[5].style.display = "grid"
	document.querySelectorAll(".shard")[1].style.display = "inline"
	for(i = 0; i < gem_manafy.length; i++) {
		gem_manafy[i].style.display = "inline"
	}
    for(i = 0; i < runes.length; i ++) {
        runes[i].chance = runes[i].baseChance
    }
    totalChance = 0
    for(i = 0; i < runes.length; i ++) {
        totalChance += runes[i].chance

        rune_amount[i].textContent = `Runes: ${runes[i].amount}`
        if(i != 4 && i != 5 && i != 9) rune_effect[i].textContent = `+${format(runes[i].effect * 100, 1)}% `
        rune_desc[i].textContent = runes[i].desc
        rune_rarity[i].textContent = `${runes[i].rarity} rune`
        rune_name[i].textContent = runes[i].name
    }
    rune_effect[4].textContent = `+${format(runes[4].effect, 1)} `
    rune_effect[5].textContent = `+${format(runes[5].effect, 1)} `
    rune_effect[9].textContent = `+${format(runes[9].effect, 1)} `

    document.querySelectorAll(".navBtn")[2].style.display = "inline"
    document.querySelector("#runes-unlocked").textContent = `Runes unlocked: ${runesGotten} / ${runes.length}`
    document.querySelectorAll(".chance-increase-cost")[0].textContent = 1 + timesRuneChanceUp * 2
    setGemEffect()
}

const createRune = (number) => {
    if(runesMaxed > runes.length) return
    let x = 0
    runesGotten = 0
    runesMaxed = 0
    for(i = 0; i < runes.length; i++) {
        if(between(number, x, (runes[i].chance + x))) {
            if(runes[i].rarity == "common") {
                document.querySelector(".rune-gotten").style.color = "#bbb"
                if(runes[i].amount >= 10 ) {
                    let randomNumber = Math.round(Math.random() * totalChance) 
                    runesGotten++
                    return createRune(randomNumber)
                }
            }
            if(runes[i].rarity == "uncommon") {
                document.querySelector(".rune-gotten").style.color = "green"
                if(runes[i].amount >= 7) {
                    let randomNumber = Math.round(Math.random() * totalChance) 
                    runesGotten++
                    return createRune(randomNumber)
                }
            }
            if(runes[i].rarity == "rare") {
                document.querySelector(".rune-gotten").style.color = "blue"
                if(runes[i].amount >= 5 ) {
                    let randomNumber = Math.round(Math.random() * totalChance) 
                    runesGotten++
                    return createRune(randomNumber)
                }
            }
            if(runes[i].rarity == "epic") {
                document.querySelector(".rune-gotten").style.color = "purple"
                if(runes[i].amount >= 3 ) {
                    let randomNumber = Math.round(Math.random() * totalChance) 
                    runesGotten++
                    return createRune(randomNumber)
                }
            }
            if(runes[i].rarity == "legendary") {
                document.querySelector(".rune-gotten").style.color = "orange"
                if(runes[i].amount >= 1 ) {
                    let randomNumber = Math.round(Math.random() * totalChance) 
                    runesGotten++
                    return createRune(randomNumber)
                }
            }
            runes[i].amount++
            document.querySelector(".rune-gotten").textContent = `YOU GOT: ${runes[i].name}`
            document.querySelector(".rune-gotten").style.opacity = "100%"

            setTimeout(() => {
                document.querySelector(".rune-gotten").style.opacity = "0%"
            }, 3000);
            }
            x += runes[i].chance
            if(runes[i].amount >= 1) runesGotten++
            if(runes[i].rarity == "common" && runes[i].amount >= 10) runesMaxed++
            if(runes[i].rarity == "uncommon" && runes[i].amount >= 7) runesMaxed++
            if(runes[i].rarity == "rare" && runes[i].amount >= 5) runesMaxed++
            if(runes[i].rarity == "epic" && runes[i].amount >= 3) runesMaxed++
            if(runes[i].rarity == "legendary" && runes[i].amount >= 1) runesMaxed++

            if(runes[i].amount >= 1) runeDOM[i].style.display = "grid"
    }

    for(i = 0; i < runes.length; i++) {
        if(runes[i].rarity == "common") totalCP += runes[i].amount
        if(runes[i].rarity == "uncommon") totalCP += runes[i].amount * 3
        if(runes[i].rarity == "rare") totalCP += runes[i].amount * 5
        if(runes[i].rarity == "epic") totalCP += runes[i].amount * 7
        if(runes[i].rarity == "Legendary") totalCP += runes[i].amount * 10
    }

    rune_rune.effect = rune_rune.amount * 0.05

    //Common 
    speed_rune.effect = speed_rune.amount * 0.075 * (1 + rune_rune.effect)
    power_rune.effect = power_rune.amount * 0.075 * (1 + rune_rune.effect)
    cost_rune.effect = cost_rune.amount * 0.015 * (1 + rune_rune.effect)
    shard_rune.effect = shard_rune.amount * 0.1 * (1 + rune_rune.effect)
    bonus_rune.effect = bonus_rune.amount * 5 * (1 + rune_rune.effect)
    base_rune.effect = base_rune.amount * 0.5 * (1 + rune_rune.effect)
    //uncommon
    mega_speed_rune.effect = mega_speed_rune.amount * 0.15 * (1 + rune_rune.effect)
    mega_power_rune.effect = mega_power_rune.amount * 0.15 * (1 + rune_rune.effect)
    mega_shard_rune.effect = mega_shard_rune.amount * 0.175 * (1 + rune_rune.effect)
    mega_base_rune.effect = mega_base_rune.amount * 1 * (1 + rune_rune.effect)
    gem_rune.effect = gem_rune.amount * 0.05 * (1 + rune_rune.effect)
    //rare
    mana_rune.effect = mana_rune.amount * 0.05 * (1 + rune_rune.effect)
    production_rune.effect = production_rune.amount * 0.05 * (1 + rune_rune.effect)
    //legendary
    ultra_speed_rune.effect = ultra_speed_rune.amount * 2 * (1 + rune_rune.effect)
    ultra_power_rune.effect = ultra_power_rune.amount * 2 * (1 + rune_rune.effect)

    runeSpeed = 1 + speed_rune.effect + mega_speed_rune.effect + ultra_speed_rune.effect
    runePower = 1 + power_rune.effect + mega_power_rune.effect + ultra_power_rune.effect
    runeShard = 1 + shard_rune.effect + mega_shard_rune.effect

    basic_gem.cost = 5 * ((1 - cost_rune.effect) - basic_gem.gc * (basic_gem.blc + 1))
    normal_gem.cost = 50 * ((1 - cost_rune.effect) - normal_gem.gc * (normal_gem.blc + 1))
    advanced_gem.cost = 250 * ((1 - cost_rune.effect) - advanced_gem.gc * (advanced_gem.blc + 1))  
    mana_gem.cost = 1000 * ((1 - cost_rune.effect) - mana_gem.gc * (mana_gem.blc + 1))
    complex_gem.cost = 2500 * ((1 - cost_rune.effect) - complex_gem.gc * (complex_gem.blc + 1))
    enchanted_gem.cost = 3 * ((1 - cost_rune.effect) - enchanted_gem.gc * (enchanted_gem.blc + 1))
}

let timesRuneChanceUp = 0
const upRuneChance = () => {
    if(game.currency.mana < 1 + timesRuneChanceUp * 2) return
    game.currency.mana -= 1 + timesRuneChanceUp * 2
    timesRuneChanceUp++
    document.querySelectorAll(".chance-increase-cost")[0].textContent = 1 + timesRuneChanceUp * 2
    for(i = 0; i < runes.length; i++) {
        if(runes[i].rarity == "common") runes[i].chance *= 0.97 * (1 + mana_rune.effect)
        if(runes[i].rarity == "uncommon") runes[i].chance *= 1.075 * (1 + mana_rune.effect)
        if(runes[i].rarity == "rare") runes[i].chance *= 1.12 * (1 + mana_rune.effect)
        if(runes[i].rarity == "epic") runes[i].chance *= 1.75 * (1 + mana_rune.effect)
        if(runes[i].rarity == "legendary") runes[i].chance *= 1.2 * (1 + mana_rune.effect)
    }
    totalChance = 0
    for(i = 0; i < runes.length; i ++) {
        totalChance += runes[i].chance
    }
    
    commonChance = 0
    uncommonChance = 0
    rareChance = 0
    epicChance = 0
    legendaryChance = 0
    for(i = 0; i < commonRunes.length; i++) {
        commonChance += commonRunes[i].chance
    }
    for(i = 0; i < uncommonRunes.length; i++) {
        uncommonChance += uncommonRunes[i].chance
    }
    for(i = 0; i < rareRunes.length; i++) {
        rareChance += rareRunes[i].chance
    }
    for(i = 0; i < epicRunes.length; i++) {
        epicChance += epicRunes[i].chance
    }
    for(i = 0; i < legendaryRunes.length; i++) {
        legendaryChance += legendaryRunes[i].chance
    }
}

//place runes into rarity
const sortRunes = () => {
    for(i = 0; i < runes.length; i++) {
        if(runes[i].rarity == "common") commonRunes.push(runes[i])
        if(runes[i].rarity == "uncommon") uncommonRunes.push(runes[i])
        if(runes[i].rarity == "rare") rareRunes.push(runes[i])
        if(runes[i].rarity == "epic") epicRunes.push(runes[i])
        if(runes[i].rarity == "legendary") legendaryRunes.push(runes[i])
    }
    commonChance = 0
    uncommonChance = 0
    rareChance = 0
    epicChance = 0
    legendaryChance = 0
    for(i = 0; i < commonRunes.length; i++) {
        commonChance += commonRunes[i].chance
    }
    for(i = 0; i < uncommonRunes.length; i++) {
        uncommonChance += uncommonRunes[i].chance
    }
    for(i = 0; i < rareRunes.length; i++) {
        rareChance += rareRunes[i].chance
    }
    for(i = 0; i < epicRunes.length; i++) {
        epicChance += epicRunes[i].chance
    }
    for(i = 0; i < legendaryRunes.length; i++) {
        legendaryChance += legendaryRunes[i].chance
    }
}

const between = (x, min, max) => {
    if(x >= min && x < max) return true
    else return false
}