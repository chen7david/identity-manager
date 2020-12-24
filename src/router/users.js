const router = require('koa-router')()
const controller = require('./../controllers/user')
const { validateBody, schema} = require('./../middleware/validate')

router.get('/users', controller.index)
router.post('/users', validateBody(schema.role), controller.create)

module.exports = router