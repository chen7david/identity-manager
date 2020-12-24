const { User } = require('./../models')

module.exports = {

    index: async (ctx) => {
        const body = ctx.request.body
        dd({body})
        ctx.body = await User.query()
    },

    create: async (ctx) => {
        throw('introuble')
        ctx.body = 'test'
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