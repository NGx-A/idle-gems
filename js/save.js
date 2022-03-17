let hardReset = false

const loadGame = () => {
	let savedGame = JSON.parse(localStorage.getItem("gameSave"))
	if(typeof savedGame.currentTab !== "undefined") game.currentTab = savedGame.currentTab
	if(typeof savedGame.runesUnlocked !== "undefined") game.runesUnlocked = savedGame.runesUnlocked
	if(typeof savedGame.runeCost !== "undefined") game.runeCost = savedGame.runeCost
	if(typeof savedGame.runePrestiges !== "undefined") game.runePrestiges = savedGame.runePrestiges

	if(typeof savedGame.crystalsUnlocked !== "undefined") game.crystalsUnlocked = savedGame.crystalsUnlocked

	if(typeof savedGame.autoRune !== "undefined") autoRune = savedGame.autoRune
	if(typeof savedGame.theme !== "undefined") theme = savedGame.theme
	
	if(typeof savedGame.shard !== "undefined") game.currency.shard = savedGame.shard
	if(typeof savedGame.mana !== "undefined") game.currency.mana = savedGame.mana

    if(typeof savedGame.basic_gem !== "undefined") basic_gem = savedGame.basic_gem
    if(typeof savedGame.normal_gem !== "undefined") normal_gem = savedGame.normal_gem
	if(typeof savedGame.advanced_gem !== "undefined") advanced_gem = savedGame.advanced_gem
	if(typeof savedGame.mana_gem !== "undefined") mana_gem = savedGame.mana_gem
	if(typeof savedGame.complex_gem !== "undefined") complex_gem = savedGame.complex_gem
	if(typeof savedGame.enchanted_gem !== "undefined") enchanted_gem = savedGame.enchanted_gem

	if(typeof savedGame.timesRuneChanceUp !== "undefined") timesRuneChanceUp = savedGame.timesRuneChanceUp
	if(typeof savedGame.runeSpeed !== "undefined") runeSpeed = savedGame.runeSpeed
	if(typeof savedGame.runePower !== "undefined") runePower = savedGame.runePower
	if(typeof savedGame.runeShard !== "undefined") runeShard = savedGame.runeShard
	if(typeof savedGame.runesMaxed !== "undefined") runesMaxed = savedGame.runesMaxed
	if(typeof savedGame.runesGotten !== "undefined") runesGotten = savedGame.runesGotten
	if(typeof savedGame.totalCP !== "undefined") totalCP = savedGame.totalCP

	if(typeof savedGame.speed_rune !== "undefined") speed_rune = savedGame.speed_rune
	if(typeof savedGame.power_rune !== "undefined") power_rune = savedGame.power_rune
	if(typeof savedGame.cost_rune !== "undefined") cost_rune = savedGame.cost_rune
	if(typeof savedGame.shard_rune !== "undefined") shard_rune = savedGame.shard_rune
	if(typeof savedGame.bonus_rune !== "undefined") bonus_rune = savedGame.bonus_rune
	if(typeof savedGame.base_rune !== "undefined") base_rune = savedGame.base_rune

	if(typeof savedGame.mega_speed_rune !== "undefined") mega_speed_rune = savedGame.mega_speed_rune
	if(typeof savedGame.mega_power_rune !== "undefined") mega_power_rune = savedGame.mega_power_rune
	if(typeof savedGame.mega_shard_rune !== "undefined") mega_shard_rune = savedGame.mega_shard_rune
	if(typeof savedGame.mega_base_rune !== "undefined") mega_base_rune = savedGame.mega_base_rune
	if(typeof savedGame.gem_rune !== "undefined") gem_rune = savedGame.gem_rune

	if(typeof savedGame.mana_rune !== "undefined") mana_rune = savedGame.mana_rune
	if(typeof savedGame.production_rune !== "undefined") production_rune = savedGame.production_rune

	if(typeof savedGame.rune_rune !== "undefined") rune_rune = savedGame.rune_rune
	if(typeof savedGame.ultra_speed_rune !== "undefined") ultra_speed_rune = savedGame.ultra_speed_rune
	if(typeof savedGame.ultra_power_rune !== "undefined") ultra_power_rune = savedGame.ultra_power_rune

	if(typeof savedGame.red_crystal !== "undefined") red_crystal = savedGame.red_crystal
	if(typeof savedGame.green_crystal !== "undefined") green_crystal = savedGame.green_crystal
	if(typeof savedGame.blue_crystal !== "undefined") blue_crystal = savedGame.blue_crystal
	if(typeof savedGame.white_crystal !== "undefined") white_crystal = savedGame.white_crystal
	if(typeof savedGame.black_crystal !== "undefined") black_crystal = savedGame.black_crystal
}

const saveGame = () => {
	let gameSave = {
	currentTab: game.currentTab,

	//Settings
	autoRune: autoRune,
	theme: theme,

	//Unlocked
	runesUnlocked: game.runesUnlocked,
	runeCost: game.runeCost,
	runePrestiges: game.runePrestiges,
	crystalsUnlocked: game.crystalsUnlocked,

	//Currency
	shard: game.currency.shard,
	mana: game.currency.mana,
    
	//Gems
    basic_gem: basic_gem,
    normal_gem: normal_gem,
	advanced_gem: advanced_gem,
	mana_gem: mana_gem,
	complex_gem: complex_gem,
	enchanted_gem: enchanted_gem,

	//Runes
	timesRuneChanceUp, timesRuneChanceUp,
	runeSpeed: runeSpeed,
	runePower: runePower,
	runeShard: runeShard,
	runesMaxed: runesMaxed,
	runesGotten: runesGotten,
	totalCP: totalCP,

	speed_rune: speed_rune,
	power_rune: power_rune,
	cost_rune: cost_rune,
	shard_rune: shard_rune,
	bonus_rune: bonus_rune,
	base_rune: base_rune,

	mega_speed_rune: mega_speed_rune,
	mega_power_rune: mega_power_rune,
	mega_shard_rune: mega_shard_rune,
	mega_base_rune: mega_base_rune,
	gem_rune: gem_rune,

	mana_rune: mana_rune,
	production_rune: production_rune,

	rune_rune: rune_rune,
	ultra_speed_rune: ultra_speed_rune,
	ultra_power_rune: ultra_power_rune,

	red_crystal: red_crystal,
	green_crystal: green_crystal,
	blue_crystal: blue_crystal,
	white_crystal: white_crystal,
	black_crystal: black_crystal,
	}
	localStorage.setItem("gameSave", JSON.stringify(gameSave))
}

window.onunload = function() {
    if(!hardReset) saveGame()
    else hardReset = false
}

window.onload = function() {
	loadGame()

    gems = [
		basic_gem, 
		normal_gem, 
		advanced_gem, 
		mana_gem,
		complex_gem,
		enchanted_gem,
	]
	runes = [
		speed_rune, 
		power_rune, 
		cost_rune, 
		shard_rune, 
		bonus_rune,
		base_rune,
		mega_speed_rune, 
		mega_power_rune, 
		mega_shard_rune, 
		mega_base_rune, 
		gem_rune,
		mana_rune,
		production_rune,
		rune_rune,
		ultra_speed_rune,
		ultra_power_rune,
	]

	crystals = [
		red_crystal,
		green_crystal,
		blue_crystal,
		white_crystal,
		black_crystal
	]

	//Check if can rune prestige
	totalChance = 0
	if(game.currency.shard >= game.runeCost) document.querySelector(".prestige-container").style.display = "flex"
	for(i = 0; i < runes.length; i++) {
        if(runes[i].amount >= 1) runeDOM[i].style.display = "grid"
		else runeDOM[i].style.display = "none"

		if(runes[i].rarity == "common") {
			runes[i].baseChance = 200
			rune_rarity[i].style.color = "#bbb"
		}
		if(runes[i].rarity == "uncommon") {
			runes[i].baseChance = 50
			rune_rarity[i].style.color = "green"
		}
		if(runes[i].rarity == "rare") {
			runes[i].baseChance = 30
			rune_rarity[i].style.color = "blue"
		}
		if(runes[i].rarity == "epic") {
			runes[i].baseChance = 10
			rune_rarity[i].style.color = "purple"
		}
		if(runes[i].rarity == "legendary") {
			runes[i].baseChance = 1
			rune_rarity[i].style.color = "orange"
		}
		 
		totalChance += runes[i].chance

		//Update rune ui
		rune_amount[i].textContent = `Runes: ${runes[i].amount}`
		if(i != 4 && i != 5 && i != 9) rune_effect[i].textContent = `+${format(runes[i].effect * 100, 1)}% `
		rune_desc[i].textContent = runes[i].desc
		rune_rarity[i].textContent = `${runes[i].rarity} rune`
		rune_name[i].textContent = runes[i].name	
    }
	rune_effect[4].textContent = `+${format(runes[4].effect, 1)} `
	rune_effect[5].textContent = `+${format(runes[5].effect, 1)} `
	rune_effect[9].textContent = `+${format(runes[9].effect, 1)} `

	if(game.runesUnlocked) {
		document.querySelectorAll(".navBtn")[2].style.display = "inline"
		document.querySelectorAll(".gem")[3].style.display = "grid"
		document.querySelectorAll(".gem")[4].style.display = "grid"
		document.querySelectorAll(".gem")[5].style.display = "grid"
		document.querySelectorAll(".shard")[1].style.display = "inline"
		for(i = 0; i < gem_manafy.length; i++) {
			gem_manafy[i].style.display = "inline"
		}
	}

	if(game.crystalsUnlocked) {
		document.querySelectorAll(".navBtn")[3].style.display = "inline"
	}

	sortRunes()

	document.querySelector("#runes-unlocked").textContent = `Runes unlocked: ${runesGotten} / ${runes.length}`
	document.querySelectorAll(".chance-increase-cost")[0].textContent = 1 + timesRuneChanceUp * 2

	updateSettingUI()
	openTab(game.currentTab)
    updateUI()
}

const reset = () => {
	if(confirm("CONFIRM_TEXT")) {
    hardReset = true
	let gameSave = {}
	localStorage.setItem("gameSave", JSON.stringify(gameSave))
	location.reload()
	}
}