const router = require('koa-router')()
const controller = require('./../controllers/user')
const { validateBody, schema} = require('./../middleware/validate')

router.get('/users', validateBody(schema.role), controller.index)

module.exports = router