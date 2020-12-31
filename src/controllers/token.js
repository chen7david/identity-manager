const { Token } = require('../models')

module.exports = {

    loadInstance: async (id, ctx, next) => {
        const token = await Token.query().where('id', id).first()
        if(!token){
            ctx.cargo.status(422).original(_original).state('validation').
            throw({status:422})
        }
        ctx.state.token = token
        await next()
    },

    index: async (ctx) => {
        const tokens = await Token.query()
        ctx.body = ctx.cargo.payload(tokens)
    },

    create: async (ctx) => {
        const body = ctx.request.body
        const token = await Token.query().insert(body).returning('*')
        ctx.body = ctx.cargo.payload(token).msg('token created!')
    },

    view: async (ctx) => {
        ctx.body = ctx.cargo.payload(ctx.state.token)
    },

    update: async (ctx) => {
        const body = ctx.request.body
        const token = await ctx.state.token.$query().patch(body).returning('*')
        ctx.body = ctx.cargo.payload(token).msg('token updated!')
    },

    delete: async (ctx) => {
        const result = await ctx.state.token.$query().delete()
        ctx.body = ctx.cargo.payload(result).msg('token deleted!')
    },

    syncUsers: async (ctx) => {
        const { tokenId } = ctx.request.body
        const changed = await ctx.state.token.$sync('users', tokenId)
        ctx.body = ctx.cargo.payload({changed: changed}).msg('token users updated')
    },
}