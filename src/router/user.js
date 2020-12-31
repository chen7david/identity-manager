const router = require('koa-router')()
const controller = require('../controllers/user')
const { validateBody, schema} = require('../middleware/validate')

router.param('id', controller.loadInstance)

router.get('/users', controller.index)
router.post('/users', validateBody(schema.createUser), controller.create)
router.get('/users/:id', controller.view)
router.patch('/users/:id', validateBody(schema.updateUser), controller.update)
router.delete('/users/:id', controller.delete)
router.patch('/users/:id/roles', controller.syncRoles)
router.get('/users/:id/tokens', controller.tokens)


module.exports = router