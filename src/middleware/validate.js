const Joi = require('joi')

const schema = {
    role: Joi.object().options({ abortEarly: false, stripUnknown: true }).keys({
        phone: Joi.string().length(11).required(),
        password: Joi.string().required(),
    })
}

module.exports = {
  
    validateBody: (schema) => async (ctx, next) => {
        try {
            const body = ctx.request.body
            const { error, value } = schema.validate(body)
            if(error) ctx.throw(422, 'JoiValidationError', error)
            ctx.request.body = value
            await next()
        } catch (err) {
            ctx.throw(500, 'SystemError', err) 
        }
    }, 
    schema
}