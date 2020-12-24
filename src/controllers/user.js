const { User } = require('./../models')

module.exports = {

    loadInstance: async (id, ctx, next) => {
        const user = await User.query().where('id', id).first()
        if(!user){
            ctx.cargo.msg('invalid user id').status(422)
            throw({status:422})
        }
        ctx.state.user = user
        await next()
    },

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
        ctx.body = ctx.cargo.payload(ctx.state.user)
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