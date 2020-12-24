const router = require('koa-router')()
const controller = require('../controllers/role')
const { validateBody, schema} = require('../middleware/validate')

router.param('id', controller.loadInstance)

router.get('/roles', controller.index)
router.post('/roles', validateBody(schema.createUser), controller.create)
router.get('/roles/:id', controller.view)
router.patch('/roles/:id', validateBody(schema.updateUser), controller.update)
router.delete('/roles/:id', controller.delete)
router.patch('/roles/:id/users', controller.syncUsers)


module.exports = router