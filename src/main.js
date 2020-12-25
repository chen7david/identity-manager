global.dd = (val) => console.log(val)
const Koa = require('koa')
const app = new Koa()
const cors = require('kcors')
const bodyparser = require('koa-bodyparser')
const { server } = require('config')
const router  = require('./router')
const cargo = require('./utils/cargo')
const { errors, logger, mutator } = require('./middleware/app')

/* ERROR HANDLING MIDDLEWARE */
app.use(errors(mutator))
app.on('error', logger)

/* APPLICATION MIDDLEWARE */
app.use(cargo())
app.use(cors())
app.use(bodyparser())

/* ROUTES */
Object.keys(router).map(key => app.use(router[key].routes()))

/* SERVER BLOCK */
app.listen(server.port, () => {
    const msg = 'server running at: '
    console.log(msg + require('url').format(server))
})