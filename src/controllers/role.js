const { Role } = require('../models')

module.exports = {

    loadInstance: async (id, ctx, next) => {
        const role = await Role.query().where('id', id).first()
        if(!role){
            ctx.cargo.msg('invalid role id').status(422)
            throw({status:422})
        }
        ctx.state.role = role
        await next()
    },

    index: async (ctx) => {
        const roles = await Role.query()
        ctx.body = ctx.cargo.payload(roles)
    },

    create: async (ctx) => {
        const body = ctx.request.body
        const role = await Role.query().insert(body).returning('*')
        ctx.body = ctx.cargo.payload(role).msg('role created!')
    },

    view: async (ctx) => {
        ctx.body = ctx.cargo.payload(ctx.state.role)
    },

    update: async (ctx) => {
        const body = ctx.request.body
        const role = await ctx.state.role.$query().patch(body).returning('*')
        ctx.body = ctx.cargo.payload(role).msg('role updated!')
    },

    delete: async (ctx) => {
        const result = await ctx.state.role.$query().delete()
        ctx.body = ctx.cargo.payload(result).msg('role deleted!')
    },

    syncUsers: async (ctx) => {
        const { roleId } = ctx.request.body
        const changed = await ctx.state.role.$sync('users', roleId)
        ctx.body = ctx.cargo.payload({changed: changed}).msg('role users updated')
    },
}