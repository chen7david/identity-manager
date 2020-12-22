const fs = require('fs')
const p = require('path')
const pripath = p.resolve(__dirname, '../../', 'config', 'private.pem')
const { accexp, refkey, refexp, passphrase } = require('config').security
const pubpath = p.resolve(__dirname, '../../', 'config', 'public.pem')
const _prikey = fs.readFileSync(pripath, 'utf8')
const pubkey = fs.readFileSync(pubpath, 'utf8')
const prikey = { key: _prikey, passphrase }
const accsign = { expiresIn: accexp, algorithm: 'RS256' }
const refsign = { expiresIn: refexp }
const versign = { algorithms: ['RS256'] }


module.exports = {
    prikey,
    refkey,
    pubkey,
    accsign,
    refsign,
    versign
}