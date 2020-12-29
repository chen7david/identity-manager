const { User, Token } = require('./../models')

module.exports = {

    loadUsername: async (ctx, next) => {
        
        const { username } = ctx.request.body
        const user = await User.query()
            .where('username', username)
            .orWhere('email', username)
            .first()
            
        if(!user) return ctx.body = ctx.cargo.loadDetails('invalid', 'username', 'username')
        ctx.state.$user = user
        return next()
    },

    checkPassword: async (ctx, next) => {
        const { password } = ctx.request.body
        if(!await ctx.state.$user.verifyPassword(password)) 
            return ctx.body = ctx.cargo.loadDetails('invalid', 'password', 'password')
        return next()
    },

    index: async (ctx) => {
        ctx.body = 'test'
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