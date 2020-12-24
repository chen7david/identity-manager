const { User } = require('./../models')

module.exports = {

    index: async (ctx) => {
        const users = await User.query()
        ctx.body = ctx.cargo.payload(users)
    },

    create: async (ctx) => {
        const body = ctx.request.body
        const user = await User.query().insert(body).returning('*')
        ctx.body = ctx.cargo.payload(user).msg('user created!')
    },

    view: async (ctx) => {
        ctx.body = 'test'
    },

    update: async (ctx) => {
        ctx.body = 'test'
    },

    delete: async (ctx) => {
        ctx.body = 'test'
    },

    syncRoles: async (ctx) => {
        ctx.body = 'test'
    },
}