const { ValidationError } = require('joi')
const { JsonWebTokenError } = require('jsonwebtoken')
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
            ctx.cargo.original(ctx.request.body).state('validation').status(422)
            ctx.cargo.loadmsg(key, `this ${key} is already taken`)
        }

        if(err instanceof JsonWebTokenError){
            if(err.message == 'invalid signature') ctx.cargo.status(401).msg('invalid token signature')
            if(err.message == 'jwt expired') ctx.cargo.status(401).msg('token expired')
            if(err.message == 'jwt malformed') ctx.cargo.status(401).msg('invalid token format')
            if(err.message == 'jwt must be provided') ctx.cargo.status(401).msg('token missing')
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