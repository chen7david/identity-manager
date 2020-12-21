const { ValidationError } = require('joi')
const { UniqueViolationError } = require('objection')

module.exports = {

    mutator: async (err, ctx, next) => {
        let mutated = null
        if(err instanceof ValidationError){
            mutated = err
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
            console.log('errors')
            ctx.status = err.status || 500
            ctx.body = cb ? await cb(err, ctx, next) : err.message
            ctx.app.emit('error', err, ctx)
        }
    },

    logger: (err, ctx) => {
        console.log('logger')
        console.log(err)
    }
}