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
        const token = await ctx.state.$user
            .$relatedQuery('tokens')
            .insert({useragent: ctx.headers['user-agent']})

        ctx.body = ctx.cargo.msg('login was successful')
            .payload({
                user: ctx.state.$user,
                access: await token.renderAccessToken(),
                refresh: await token.renderRefreshToken(),
            })
    },

    extend: async (ctx, next) => {
        const { refresh } = ctx.headers

        const payload = await Token.decode(refresh)
        if(!payload || !payload.refresh){
            ctx.cargo.status(401).msg('invalid refresh token')
            throw({status:401})
        }
        try {
            const token = await Token.loadRefreshToken(refresh)
            await token.incrementRefresh()
            ctx.body = ctx.cargo.payload({
                access: token.renderAccessToken(),
            })
        } catch (err) {
            if(err.message == 'jwt expired') {
                ctx.cargo.status(401).msg('refresh-token expired')
                throw({status:401})
            }else{
                throw err
            }
        }
    },
}