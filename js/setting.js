let autoRune = false

document.querySelectorAll(".setting")[0].addEventListener("click", e => {
    reset()
})

document.querySelectorAll(".setting")[1].addEventListener("click", e => {
    autoRune ? autoRune = false : autoRune = true
    updateSettingUI()
})

const updateSettingUI = () => {
    autoRune ? document.querySelectorAll(".setting")[1].textContent = `Auto rune prestige: ON` : document.querySelectorAll(".setting")[1].textContent = `Auto rune prestige: OFF`
}