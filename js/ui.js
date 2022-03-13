const domRoot = document.querySelector(":root")

const currency = document.querySelectorAll(".currency")

const gem_amount = document.querySelectorAll(".gem-amount")
const gem_speed = document.querySelectorAll(".gem-speed")
const gem_cost = document.querySelectorAll(".gem-cost")
const gem_effect = document.querySelectorAll(".gem-effect")
const gem_manafy = document.querySelectorAll(".manafy")
const gem_mana_cost = document.querySelectorAll(".mana-cost")

const runeDOM = document.querySelectorAll(".rune")
const rune_amount = document.querySelectorAll(".rune-amount")
const rune_effect = document.querySelectorAll(".rune-effect")
const rune_rarity = document.querySelectorAll(".rune-rarity")

const updateUI = () => {
    currency[0].textContent = format(game.currency.shard)
    currency[1].textContent = Math.floor(game.currency.mana)

    for(i = 0; i < gems.length; i++) {
        gem_amount[i].textContent = `Amount ${Math.floor(gems[i].amount)}`
        gem_cost[i].textContent = `Cost ${format(gems[i].cost)} Shards`

        gems[i].amount == 0 ? gem_speed[i].textContent = `Speed 0` :gem_speed[i].textContent = `Speed ${format(gems[i].speed, 2)}`
    }
    for(i = 0; i < runes.length; i++) {
        rune_amount[i].textContent = `Amount: ${runes[i].amount}`
        rune_rarity[i].textContent = `${runes[i].rarity} rune`
    }

    gem_effect[0].textContent = format(basic_gem.effect, 2)
    gem_effect[1].textContent = format(normal_gem.effect, 2)
    gem_effect[2].textContent = format(advanced_gem.effect, 2)
    gem_effect[3].textContent = format(mana_gem.effect, 2)

    rune_effect[0].textContent = `+${format(speed_rune.effect * 100)}% Speed to all gems`
    rune_effect[1].textContent = `+${format(power_rune.effect * 100)}% Power to all gems`
    rune_effect[2].textContent = `${format(cost_rune.effect * 100, 1)}% Cheaper gems`
    rune_effect[3].textContent = `+${format(mega_speed_rune.effect * 100)}% Speed to all gems`
    rune_effect[4].textContent = `+${format(mega_power_rune.effect * 100)}% Power to all gems`

    document.querySelector("#rune-speed").textContent = format((speed_rune.effect + mega_speed_rune.effect) * 100)
    document.querySelector("#rune-power").textContent = format((power_rune.effect + mega_power_rune.effect) * 100)
    document.querySelector("#rune-cost").textContent = format(cost_rune.effect * 100, 1)
}

setInterval(updateUI, 50)