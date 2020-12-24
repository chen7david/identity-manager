const { User } = require('./../models')

module.exports = {

    index: async (ctx) => {
        ctx.body = await User.query()
    },

    create: async (ctx) => {
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