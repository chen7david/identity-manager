const router = require('koa-router')()
const controller = require('./../controllers/user')

router.get('/users', controller.index)

module.exports = router