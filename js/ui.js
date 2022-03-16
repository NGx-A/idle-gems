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

    document.querySelector("#common-chance").textContent = `Common: ${format(1 / (totalChance / (runes[0].chance + runes[1].chance + runes[2].chance + runes[3].chance + runes[4].chance + runes[5].chance)) * 100)}%`
    document.querySelector("#uncommon-chance").textContent = `Uncommon: ${format(1 / (totalChance / (runes[6].chance + runes[7].chance + runes[8].chance + runes[9].chance + runes[10].chance)) * 100)}%`
    document.querySelector("#rare-chance").textContent = `Rare: ${format(1 / (totalChance / (runes[11].chance + runes[12].chance)) * 100)}%`
    document.querySelector("#epic-chance").textContent = `Epic: 0%`
    document.querySelector("#legendary-chance").textContent = `Legendary: ${format(1 / (totalChance / (runes[13].chance + runes[14].chance + runes[15].chance)) * 100, 2)}%`
}



setInterval(updateUI, 50)