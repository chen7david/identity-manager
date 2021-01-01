const { User, Token } = require('./../models')
const { pubkey } = require('./../utils/keys')
const jwt = require('jsonwebtoken')
const { verkey, pwdkey, pwdexp, verexp } = require('config').security
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
        const user = ctx.state.$user
        if(user.verified) ctx.cargo.msg('this account has already been verified').error(422)
        if(user.blocked) ctx.cargo.msg('this account has been blocked').error(422)

        const token = jwt.sign({ userId: user.userId }, verkey, { expiresIn: verexp })
        const link = verlink.replace(':token', token)

        await ctx.mailer.sendMail({
            to: user.email,
            subject: 'Account Verification',
            html: `please click <a href="${link}">here</a> to verify your account.`
        })
        ctx.body = ctx.cargo.msg(`verification email was sent to ${user.email}!`)
    },

    handleVerification: async (ctx, next) => {
        const { token } = ctx.params
        const { userId } = jwt.verify(token, verkey)
        const user = await User.query().where('userId', userId).first()
        if(!user) ctx.cargo.msg('invalid user id').error(422)
        if(user.isDisabled()) ctx.cargo.msg('this account has been disabled').error(422)
        if(user.isSuspended()) ctx.cargo.msg('this account has been suspended').error(422)
        if(user.isConfirmed()) ctx.cargo.msg('this email has already been verified').error(422)
        await user.confirm()
        ctx.body = ctx.cargo.msg(`your email was successfully verified`)
    },

    requestPasswordReset: async (ctx, next) => {
        const user = ctx.state.$user
        if(!user.isConfirmed()) ctx.cargo.msg('this account has not yet been verified').error(422)
        if(user.isDisabled()) ctx.cargo.msg('this account has been disabled').error(422)

        const token = jwt.sign({ userId: user.userId }, pwdkey, { expiresIn: pwdexp })
        const link = pwdlink.replace(':token', token)

        await ctx.mailer.sendMail({
            to: user.email,
            subject: 'Password Reset',
            html: `please click <a href="${link}">here</a> to reset your password.`
        })
        ctx.body = ctx.cargo.msg(`password-reset email was sent to ${user.email}!`)
    },

    resetPassword: async (ctx, next) => {
        const { password, token } = ctx.request.body
        const { userId } = jwt.verify(token, pwdkey)
        const user = await User.query().where('userId', userId).first()
        if(!user) ctx.cargo.msg('invalid user id').error(422)
        if(user.isDisabled()) ctx.cargo.msg('this account has been disabled').error(422)
        if(user.isSuspended()) ctx.cargo.msg('this account has been suspended').error(422)
        if(!user.isConfirmed()) ctx.cargo.msg('this account email has not been verified').error(422)
        await user.$query().patch({password})
        ctx.body = ctx.cargo.msg(`your password was successfully updated`)
        return next()
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