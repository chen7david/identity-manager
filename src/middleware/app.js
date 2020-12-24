const { ValidationError } = require('joi')
const { UniqueViolationError } = require('objection')

module.exports = {

    mutator: async (err, ctx, next) => {
        let mutated = ''
        if(err instanceof ValidationError){
            const { details, _original } = err
            ctx.cargo.original(_original).state('validation')
            details.map(d => ctx.cargo.loadmsg(d.context.key, d.message))
            mutated = ctx.cargo
        }

        if(err instanceof UniqueViolationError){
            mutated = UniqueViolationError
        }

        return mutated
    },

    errors: (cb = null) => async (ctx, next) => {
        try {
            await next()
        } catch (err) {
            const data = cb ? await cb(err, ctx, next) : err.message 
            ctx.status = err.status || 500
            ctx.body = data
            ctx.app.emit('error', err, ctx)
        }
    },

    logger: (err, ctx) => {
        console.log(err)
    }
}