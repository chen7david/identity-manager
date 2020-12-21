const fs = require('fs')
const p = require('path')
const pripath = p.resolve(__dirname, '../../', 'config', 'private.pem')
const { accexp, refexp, passphrase } = require('config').security
const pubpath = p.resolve(__dirname, '../../', 'config', 'public.pem')
const _prikey = fs.readFileSync(pripath, 'utf8')
const pubkey = fs.readFileSync(pubpath, 'utf8')
const accsign = { expiresIn: accexp, algorithm: 'RS256' }
const refsign = { expiresIn: refexp, algorithm: 'RS256' }
const versign = { algorithms: ['RS256'] }
const prikey = { key: _prikey, passphrase }

const jwt = require('jsonwebtoken')

module.exports = {
    prikey,
    pubkey,
    accsign,
    refsign,
    versign
}

const token = jwt.sign({x:2}, prikey, accsign)
const verify = jwt.verify(token, pubkey, versign)
// 
dd({token, verify})