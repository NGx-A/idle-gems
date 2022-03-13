let letters = ["K", "M", "B", "T", "QA", "QU", "SX", "SP", "OC", "NO"]

let notation = 3

let format

//Scientific
if(notation == 1) {
     format = (amount) => {
        let power = Math.floor(Math.log10(amount))
        let mantissa = amount / (Math.pow(10, power))
        if(power < 4) return amount.toFixed(2)
        return mantissa.toFixed(2) + "e" + power
    }
}

//Letter
if (notation == 2) {
     format = (amount) => {
        let power = Math.floor(Math.log10(amount))
        let mantissa = amount / Math.pow(1000, Math.floor(power / 3))
        let letter = Math.floor(power / 3)
        if(power < 3) return amount.toFixed(2)
        if((power % 3) == 0) return mantissa.toFixed(2) + letters[letter - 1]
        if((power % 3) == 1) return mantissa.toFixed(1) + letters[letter - 1]
        if((power % 3) == 2) return mantissa.toFixed(0) + letters[letter - 1]
        return mantissa.toFixed(2) + letters[letter - 1]
    }
}

//Mixed scientific
if (notation == 3) {
    format = (amount, decimals) => {
        if(amount < 1e15) {
            let power = Math.floor(Math.log10(amount))
            let mantissa = amount / Math.pow(1000, Math.floor(power / 3))
            let letter = Math.floor(power / 3)
            if(power < 3) return amount.toFixed(decimals)
            if((power % 3) == 0) return mantissa.toFixed(2) + letters[letter - 1]
            if((power % 3) == 1) return mantissa.toFixed(1) + letters[letter - 1]
            if((power % 3) == 2) return mantissa.toFixed(0) + letters[letter - 1]
            return mantissa.toFixed(2) + letters[letter - 1]
        }
        let power = Math.floor(Math.log10(amount))
        let mantissa = amount / (Math.pow(10, power))
        if(power < 4) return amount.toFixed(decimals)
        return mantissa.toFixed(2) + "e" + power
   }
}





