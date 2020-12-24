const { ValidationError } = require('joi')
const { UniqueViolationError, ForeignKeyViolationError } = require('objection')
const { serialInt } = require('./../utils/functions')

module.exports = {

    mutator: async (err, ctx, next) => {
        
        if(err instanceof ValidationError){
            const { details, _original } = err
            ctx.cargo.original(_original).state('validation').status(422)
            details.map(d => ctx.cargo.loadmsg(d.context.key, d.message))
        }

        if(err instanceof UniqueViolationError){
            let key = err.columns.pop()
            ctx.cargo.original({}).state('validation').status(422)
            ctx.cargo.loadmsg(key, `this ${key} is already taken`)
        }
        
        if(err instanceof ForeignKeyViolationError){
            let key = err.columns.pop()
            dd({key})
            ctx.cargo.original({}).state('validation').status(422)
            ctx.cargo.loadmsg(key, `this ${key} is already taken`)
        }

        /* DEFAULT EXCEPTION MUTATOR */
        if(Object.keys(ctx.cargo.details).length == 0){
            const serial = serialInt('000000')
            ctx.cargo.serial(serial).msg(`unknow error - ER${serial}`).status(500)
        }

        return ctx.cargo
    },

    errors: (cb = null) => async (ctx, next) => {
        try {
            await next()
        } catch (err) {
            const data = cb ? await cb(err, ctx, next) : err.message 
            ctx.status = err.status || ctx.cargo.status || 500
            ctx.body = data
            ctx.app.emit('error', err, ctx)
        }
    },

    logger: (err, ctx) => {
        console.log(ctx.cargo.serial, err)
    }
}