const _mailer = require('nodemailer')
const { service, user, pass } = require('config').email

// Allow less secure apps From your Google Account
// https://myaccount.google.com/lesssecureapps

const mailer = _mailer.createTransport({
    service,
    auth: { user, pass }
})

module.exports = () => async (ctx, next) => {
    ctx.mailer = mailer
    await next()
} 