class rune {
    constructor(chance, effect, amount, rarity) {
        this.chance = chance
        this.effect = 0
        this.amount = 0
        this.rarity = rarity
    }
}

let runes = []

speed_rune = new rune(100, null, null, "common")        
power_rune = new rune(100, null, null, "common")  
cost_rune = new rune(80, null, null, "common")    

mega_speed_rune = new rune(50, null, null, "uncommon")
mega_power_rune = new rune(50, null, null, "uncommon")

let totalChance = 0
for(i = 0; i < runes.length; i ++) {
    totalChance += runes[i].chance
}

const getRune = () => {
    game.runesUnlocked = true
    game.currency.shard = 5

    for(i = 0; i < gems.length; i++) {
        document.querySelectorAll(".progress")[i].style.width = `0`
        gems[i].amount = 0
        gems[i].speed = 0
        gems[i].time = 0
    }   

    //Get the rune 
    let randomNumber = Math.round(Math.random() * totalChance)       
    createRune(randomNumber)     

    document.querySelector(".runePrestige").style.display = "none"
    document.querySelectorAll(".gem")[3].style.display = "grid"
}

const createRune = (number) => {
    if(speed_rune.amount >= 10) if(power_rune.amount >= 10) if(cost_rune.amount >= 10) if(mega_rune.amount >= 10) return
    let x = 0
    for(i = 0; i < runes.length; i++) {
        if(i == 0) {
            if(between(number, 0, runes[i].chance)) {
                if(runes[i].amount >= 10) {
                    let randomNumber = Math.round(Math.random() * totalChance) 
                    createRune(randomNumber)
                }
                runes[i].amount++
            } 
            x += runes[i].chance
            } 
        if(i != 0) {
            if(between(number, x, (runes[i].chance + x))) {
                if(runes[i].amount >= 10) {
                    let randomNumber = Math.round(Math.random() * totalChance) 
                    return createRune(randomNumber)
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
    mega_speed_rune.effect = mega_speed_rune.amount * 0.15
    mega_power_rune.effect = mega_power_rune.amount * 0.15

    basic_gem.cost = 5 * (1 - cost_rune.effect)
    normal_gem.cost = 100 * (1 - cost_rune.effect)
    advanced_gem.cost = 250 * (1 - cost_rune.effect)  
    mana_gem.cost = 1000 * (1 - cost_rune.effect)
}

const between = (x, min, max) => {
    if(x >= min && x < max) return true
    else return false
}