const router = require('koa-router')()
const controller = require('./../controllers/user')
const { validateBody, schema} = require('./../middleware/validate')

router.param('id', controller.loadInstance)

router.get('/users', controller.index)
router.get('/users/:id', controller.view)
// router.post('/users', validateBody(schema.role), controller.create)


module.exports = router