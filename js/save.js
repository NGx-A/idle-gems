let hardReset = false

const loadGame = () => {
	let savedGame = JSON.parse(localStorage.getItem("gameSave"))
	if(typeof savedGame.currentTab !== "undefined") game.currentTab = savedGame.currentTab
	if(typeof savedGame.runesUnlocked !== "undefined") game.runesUnlocked = savedGame.runesUnlocked
	if(typeof savedGame.shard !== "undefined") game.currency.shard = savedGame.shard
	if(typeof savedGame.mana !== "undefined") game.currency.mana = savedGame.mana

    if(typeof savedGame.basic_gem !== "undefined") basic_gem = savedGame.basic_gem
    if(typeof savedGame.normal_gem !== "undefined") normal_gem = savedGame.normal_gem
	if(typeof savedGame.advanced_gem !== "undefined") advanced_gem = savedGame.advanced_gem
	if(typeof savedGame.mana_gem !== "undefined") mana_gem = savedGame.mana_gem

	if(typeof savedGame.speed_rune !== "undefined") speed_rune = savedGame.speed_rune
	if(typeof savedGame.power_rune !== "undefined") power_rune = savedGame.power_rune
	if(typeof savedGame.cost_rune !== "undefined") cost_rune = savedGame.cost_rune
	if(typeof savedGame.mega_speed_rune !== "undefined") mega_speed_rune = savedGame.mega_speed_rune
	if(typeof savedGame.mega_power_rune !== "undefined") mega_power_rune = savedGame.mega_power_rune
}

const saveGame = () => {
	let gameSave = {
	currentTab: game.currentTab,

	runesUnlocked: game.runesUnlocked,

	shard: game.currency.shard,
	mana: game.currency.mana,
    
    basic_gem: basic_gem,
    normal_gem: normal_gem,
	advanced_gem: advanced_gem,
	mana_gem: mana_gem,

	speed_rune: speed_rune,
	power_rune: power_rune,
	cost_rune: cost_rune,
	mega_speed_rune: mega_speed_rune,
	mega_power_rune: mega_power_rune,
	}
	localStorage.setItem("gameSave", JSON.stringify(gameSave))
}

window.onunload = function() {
    if(!hardReset) saveGame()
    else hardReset = false
}

window.onload = function() {
	loadGame()

    gems = [basic_gem, normal_gem, advanced_gem, mana_gem]
	runes = [speed_rune, power_rune, cost_rune, mega_speed_rune, mega_power_rune]

	//Check if can rune prestige
	if(game.currency.shard >= 1000) document.querySelector(".runePrestige").style.display = "flex"
	for(i = 0; i < runes.length; i++) {
        if(runes[i].amount >= 1) runeDOM[i].style.display = "grid"
		totalChance += runes[i].chance
    }
	if(game.runesUnlocked) {
		document.querySelectorAll(".gem")[3].style.display = "grid"
		document.querySelectorAll(".shard")[1].style.display = "inline"
		for(i = 0; i < gem_manafy.length; i++) {
			gem_manafy[i].style.display = "inline"
		}
	}

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