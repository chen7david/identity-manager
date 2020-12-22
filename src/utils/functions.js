const crypto = require('crypto')

const self = {
    
    md5: () => crypto.createHash('md5').update(`${Math.random()}`).digest('hex'),
    toms: (str) => {

        const unit = str.slice(str.length - 1)
    
        units = {
            "s": 1,
            "m": 60,
            "h": 60 * 60,
            "d": 24 * 60 * 60,
            "w": 7 * 24 * 60 * 60,
            "y": 24 * 60 * 60 * 365,
        }
    
        if(!Object.keys(units).includes(unit)) throw('invalid entry: [s,m,h,d,w,y]')
        const magnitude = parseInt(str, 10)
        if(!magnitude)  throw('invalid entry: [s,m,h,d,w,y]')
        return magnitude * units[unit] * 1000
    },
    randInt: (min,max) => Math.floor(Math.random() * (max - min + 1)) + min,
    randChar: () => {
        const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ"
        const index = self.randInt(0, chars.length -1)
        return chars[index]
    },
    randAlphNum: () => {
        const chars = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGIJKLMNOPQRSTUVWXYZ"
        const index = self.randInt(0, chars.length -1)
        return chars[index]
    },
    serialInt: (mask) => {
        let serial = ""
        if(mask) {
            for(let i = 0; i < mask.length; i++){
                let maskChar = mask[i] 
                serial += maskChar == "0" ? self.randInt(0,9) : maskChar
            }
        }
        return serial
    },
    serialChar: (mask) => {
        let serial = ""
        if(mask) {
            for(let i = 0; i < mask.length; i++){
                let maskChar = mask[i] 
                serial += maskChar == "0" ? self.randChar() : maskChar
            }
        }
        return serial
    },
    serialAlphNum: (mask) => {
        let serial = ""
        if(mask) {
            for(let i = 0; i < mask.length; i++){
                let maskChar = mask[i] 
                serial += maskChar == "0" ? self.randAlphNum() : maskChar
            }
        }
        return serial
    },
}

module.exports = self
