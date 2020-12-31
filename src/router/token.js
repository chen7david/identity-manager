const router = require('koa-router')()
const controller = require('../controllers/user')
const { validateBody, schema} = require('../middleware/validate')

router.param('id', controller.loadInstance)

router.get('/tokens', controller.index)
router.get('/tokens/:id', controller.view)
router.patch('/tokens/:id', validateBody(schema.updateToken), controller.update)
router.delete('/tokens/:id', controller.delete)

module.exports = router