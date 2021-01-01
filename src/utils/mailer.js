const _mailer = require('node_')
const { service, user, pass } = require('config').email

const mailer = _mailer.createTransport({
    service,
    auth: { user, pass }
})

module,exports = () => async (ctx, next) => {
    ctx.mailer = mailer
    await next()
} 