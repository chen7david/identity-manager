const { User, Token } = require('./../models')
const { pubkey } = require('./../utils/keys')
const { verlink, pwdlink } = require('config').endpoints

module.exports = {

    loadInstance: async (id, ctx, next) => {
        const user = await User.query().where('id', id).first()
        if(!user) ctx.cargo.msg('invalid user id').error(422)
        ctx.state.user = user
        await next()
    },

    loadUsername: async (ctx, next) => {
        const { username } = ctx.request.body
        const user = await User.query()
            .where('username', username)
            .orWhere('email', username)
            .first()
        if(!user) ctx.cargo.original(ctx.request.body).state('validation')
            .loadmsg('username', 'username not found').error(422)
        ctx.state.$user = user
        return next()
    },

    requestVerification: async (ctx, next) => {
        try {
            const user = ctx.state.$user
        if(user.verified) ctx.cargo.msg('this account has already been verified').error(422)
        if(user.blocked) ctx.cargo.msg('this account has been blocked').error(422)
        const link = verlink.replace(':key', user.renderVerificationToken())
        await ctx.mailer.sendMail({
            to: user.email,
            subject: 'Account Verification',
            html: `please verify your account by clicking this link: ${link}`
        })
        dd(link) 
        ctx.body = ctx.cargo.msg('account verification complete!')
        } catch (err) {
            dd({err})
        }
    },

    handleVerification: async (ctx, next) => {
        const { email, verified, blocked } = ctx.state.$user
        if(verified) ctx.cargo.msg('this account has already been verified').error(422)
        if(blocked) ctx.cargo.msg('this account has been blocked').error(422)
        ctx.mailer.sendMail({
            to: email,
            subject: 'Account Verification',
            html: `please verify your account by clicking this link`
        })
    },

    checkPassword: async (ctx, next) => {
        const { password } = ctx.request.body
        if(!await ctx.state.$user.verifyPassword(password)){
            ctx.cargo.original(ctx.request.body).state('validation')
            .loadmsg('password', 'invalid password').error(422)
        }
        return next()
    },

    pubkey: async (ctx) => {
        ctx.body = ctx.cargo.payload({pubkey})
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
        if(!payload || !payload.refresh) ctx.cargo.msg('invalid refresh token').error(401)
        try {
            const token = await Token.loadRefreshToken(refresh)
            await token.incrementRefresh()
            ctx.body = ctx.cargo.payload({
                access: token.renderAccessToken(),
            })
        } catch (err) {
            if(err.message == 'jwt expired') {
                ctx.cargo.msg('refresh-token expired').error(401)
            }else{
                throw err
            }
        }
    },
}