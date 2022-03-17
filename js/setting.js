let autoRune = false
let theme = 0

document.querySelectorAll(".setting")[0].addEventListener("click", e => {
    reset()
})

document.querySelectorAll(".setting")[1].addEventListener("click", e => {
    autoRune ? autoRune = false : autoRune = true
    updateSettingUI()
})

document.querySelectorAll(".setting")[2].addEventListener("click", e => {
    theme++
    if(theme > 4) theme = 0
    updateSettingUI()
})

const updateSettingUI = () => {
    autoRune ? document.querySelectorAll(".setting")[1].textContent = `Auto rune prestige: ON` : document.querySelectorAll(".setting")[1].textContent = `Auto rune prestige: OFF`

    //Theme
    if(theme == 0) {    //Normal
        domRoot.style.setProperty("--bgcolor", "#151515")
        domRoot.style.setProperty("--textcolor", "white")
        domRoot.style.setProperty("--runetext", "red")
        domRoot.style.setProperty("--btncolor", "transparent")
        domRoot.style.setProperty("--runetext", "red")
        domRoot.style.setProperty("--btnborder", "white")
        domRoot.style.setProperty("--progresscolor", "aquamarine")
    }
    if(theme == 1) {    //light
        domRoot.style.setProperty("--bgcolor", "#fff")
        domRoot.style.setProperty("--textcolor", "black")
        domRoot.style.setProperty("--runetext", "red")
        domRoot.style.setProperty("--btncolor", "#fff")
        domRoot.style.setProperty("--btnborder", "black")
        domRoot.style.setProperty("--progresscolor", "#05d08c")
    }
    if(theme == 2) {    //Custom #1
        domRoot.style.setProperty("--bgcolor", "#000814")
        domRoot.style.setProperty("--textcolor", "#4494E0")
        domRoot.style.setProperty("--runetext", "blue")
        domRoot.style.setProperty("--btncolor", "#fff")
        domRoot.style.setProperty("--btnborder", "#ffc300")
        domRoot.style.setProperty("--progresscolor", "#ffd60a")
    }
    if(theme == 3) {    //Custom #2
        domRoot.style.setProperty("--bgcolor", "#261132")
        domRoot.style.setProperty("--textcolor", "#CDF7F6")
        domRoot.style.setProperty("--runetext", "#FFC857")
        domRoot.style.setProperty("--btncolor", "#8FB8DE")
        domRoot.style.setProperty("--btnborder", "#9A94BC")
        domRoot.style.setProperty("--progresscolor", "#CDF7F6")
    }
    if(theme == 4) {    //Custom #3
        domRoot.style.setProperty("--bgcolor", "#042A2B")
        domRoot.style.setProperty("--textcolor", "#5EB1BF")
        domRoot.style.setProperty("--runetext", "#90d0dc")
        domRoot.style.setProperty("--btncolor", "#097171")
        domRoot.style.setProperty("--btnborder", "#9EE37D")
        domRoot.style.setProperty("--progresscolor", "#63C132")
    }
}