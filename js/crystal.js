let crystals = []

class crystal {
    constructor(amount) {
        this.amount = 0
    }
}
let totalCP = 0

let red_crystal = new crystal(0)
let green_crystal = new crystal(0)
let blue_crystal = new crystal(0)
let white_crystal = new crystal(0)
let black_crystal = new crystal(0)

const getCrystal = (id) => {
    let crystalPoints = 0
    
    if(game.currency.shard < 1e5 || totalCP < 10) return
    while(crystalPoints < 10) {
        let randomNumber = Math.round(Math.random() * (runes.length - 1))

        if(runes[randomNumber].amount >= 1) {
            if(runes[randomNumber].rarity == "common") crystalPoints++
            if(runes[randomNumber].rarity == "uncommon") crystalPoints += 3
            if(runes[randomNumber].rarity == "rare") crystalPoints += 5
            if(runes[randomNumber].rarity == "epic") crystalPoints += 7
            if(runes[randomNumber].rarity == "legendary") crystalPoints += 10
            runes[randomNumber].amount--
            game.runePrestiges--
            if(game.runePrestiges < 0) game.runePrestiges = 0
            game.runeCost = 1000 + (250 * game.runePrestiges) * (1 + Math.floor(game.runePrestiges / 10))
        }
    }
    crystals[id].amount++
    game.currency.shard -= 1e5
    if(game.currency.shard < 5) game.currency.shard = 5

    totalCP = 0
    for(i = 0; i < runes.length; i++) {
        if(runes[i].amount >= 1) runeDOM[i].style.display = "grid"
		else runeDOM[i].style.display = "none"
        if(runes[i].rarity == "common") totalCP += runes[i].amount
        if(runes[i].rarity == "uncommon") totalCP += runes[i].amount * 3
        if(runes[i].rarity == "rare") totalCP += runes[i].amount * 5
        if(runes[i].rarity == "epic") totalCP += runes[i].amount * 7
        if(runes[i].rarity == "Legendary") totalCP += runes[i].amount * 10
    }
}

const infuseGem = (gemId, crystalId) => {
    if(crystals[crystalId].amount < 1) return
    if(crystalId == 0 && gems[gemId].rc < 5) gems[gemId].rc++
    if(crystalId == 1 && gems[gemId].gc < 0.15) gems[gemId].gc += 0.025
    if(crystalId == 2 && gems[gemId].bc < 5) gems[gemId].bc++
    if(crystalId == 3 && gems[gemId].wc < 1) gems[gemId].wc += 0.2
    if(crystalId == 4 && gems[gemId].blc < 1) gems[gemId].blc += 0.2
    else return
    crystals[crystalId].amount--
    setGemEffect()
}