const domRoot = document.querySelector(":root")
const domStyle = getComputedStyle(domRoot)

const currency = document.querySelectorAll(".currency")

const gem_amount = document.querySelectorAll(".gem-amount")
const gem_speed = document.querySelectorAll(".gem-speed")
const gem_cost = document.querySelectorAll(".gem-cost")
const gem_effect = document.querySelectorAll(".gem-effect")
const gem_manafy = document.querySelectorAll(".manafy")
const gem_mana_cost = document.querySelectorAll(".mana-cost")

const runeDOM = document.querySelectorAll(".rune")
const rune_name = document.querySelectorAll(".rune-name")
const rune_amount = document.querySelectorAll(".rune-amount")
const rune_effect = document.querySelectorAll(".rune-effect")
const rune_desc = document.querySelectorAll(".rune-desc")
const rune_rarity = document.querySelectorAll(".rune-rarity")

const red_crystal_effect = document.querySelectorAll(".red-crystal-effect")
const green_crystal_effect = document.querySelectorAll(".green-crystal-effect")
const blue_crystal_effect = document.querySelectorAll(".blue-crystal-effect")
const white_crystal_effect = document.querySelectorAll(".white-crystal-effect")
const black_crystal_effect = document.querySelectorAll(".black-crystal-effect")

const updateUI = () => {
    currency[0].textContent = format(game.currency.shard, 1)
    currency[1].textContent = format(Math.floor(game.currency.mana))

    for(i = 0; i < gems.length; i++) {
        gem_amount[i].textContent = `Amount ${Math.floor(gems[i].amount)} [${format(gems[i].bought)}]`
        gem_cost[i].textContent = format(gems[i].cost, 1)
        gem_effect[i].textContent = format(gems[i].effect, 2)

        gems[i].amount == 0 ? gem_speed[i].textContent = `Speed 0` :gem_speed[i].textContent = `Speed ${format(gems[i].speed, 2)}`
    }

    document.querySelector("#rune-speed").textContent = format((runeSpeed - 1) * 100, 1)
    document.querySelector("#rune-power").textContent = format((runePower - 1)* 100, 1)
    document.querySelector("#rune-cost").textContent = format(cost_rune.effect * 100, 1)

    document.querySelector(".rune-cost").textContent = `Next rune at ${format(game.runeCost, 2)} Shards`
    document.querySelector("#common-chance").textContent = `Common: ${format(1 / (totalChance / commonChance) * 100)}%`
    document.querySelector("#uncommon-chance").textContent = `Uncommon: ${format(1 / (totalChance / uncommonChance) * 100)}%`
    document.querySelector("#rare-chance").textContent = `Rare: ${format(1 / (totalChance / rareChance) * 100)}%`
    document.querySelector("#epic-chance").textContent = `Epic: ${format(1 / (totalChance / epicChance) * 100)}%`
    document.querySelector("#legendary-chance").textContent = `Legendary: ${format(1 / (totalChance / legendaryChance) * 100, 2)}%`

    for(i = 0; i < crystals.length; i++) {
        document.querySelectorAll(".crystal-amount")[i].textContent = crystals[i].amount
    }
    for(i = 0; i < red_crystal_effect.length; i++) {
        red_crystal_effect[i].textContent = `+${format(gems[i].rc * (1 + gems[i].blc) * 100)}% Power`
        green_crystal_effect[i].textContent = `+${format(gems[i].gc * (1 + gems[i].blc) * 100)}% Cheaper`
        blue_crystal_effect[i].textContent = `+${format(gems[i].bc * (1 + gems[i].blc) * 100)}% Speed`
        white_crystal_effect[i].textContent = `+${format(gems[i].wc * (1 + gems[i].blc), 2)} Extra gems`
        black_crystal_effect[i].textContent = `+${format(gems[i].blc * 100)}% Crystal effect`
    }

    document.querySelector(".rune-worth").textContent = `Your runes are worth ${format(totalCP)}`
}



setInterval(updateUI, 50)