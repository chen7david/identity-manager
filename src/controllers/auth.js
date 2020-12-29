const { User, Token } = require('./../models')

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

    loadUsername: async (ctx, next) => {
        
        const { username } = ctx.request.body
        const user = await User.query()
            .where('username', username)
            .orWhere('email', username)
            .first()
        if(!user){
            ctx.cargo.status(422).original(ctx.request.body).state('validation')
            .loadmsg('username', 'username not found')
            throw({status:422})
        }
        ctx.state.$user = user
        return next()
    },

    checkPassword: async (ctx, next) => {
        const { password } = ctx.request.body
        if(!await ctx.state.$user.verifyPassword(password)){
            ctx.cargo.status(422).original(ctx.request.body).state('validation')
            .loadmsg('password', 'invalid password')
            throw({status:422})
        }
        return next()
    },

    login: async (ctx) => {
        ctx.body = 'logged in '
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