const router = require('koa-router')()
const controller = require('../controllers/auth')
const { loadUsername, checkPassword } = controller
const { validateBody, schema } = require('../middleware/validate')

router.param('id', controller.loadInstance)

router.post('/login', 
    validateBody(schema.login), 
    loadUsername, checkPassword, 
    controller.login
)

router.post('email-verification', '/verification', 
    validateBody(schema.username), 
    loadUsername, 
    controller.requestVerification
)

router.get('email-verification', '/verification/:token', controller.requestVerification)


router.get('/pubkey', controller.pubkey)
router.patch('/login', controller.extend)


module.exports = router