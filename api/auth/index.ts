import axios from 'axios'
import * as express from 'express'
import {Issuer, Strategy, TokenSet, UserinfoResponse} from 'openid-client'
import * as passport from 'passport'
import * as process from 'process'
import {app} from '../application'
import {config} from '../config'
import {router as keepAlive} from '../keepalive'
import * as log4jui from '../lib/log4jui'
import {propsExist} from '../lib/objectUtilities'
import {userHasAppAccess} from './manageCasesUserRoleAuth'

export const router = express.Router({mergeParams: true})

const cookieToken = config.cookies.token
const cookieUserId = config.cookies.userId
const idamURl = config.services.idam.idamApiUrl

const logger = log4jui.getLogger('auth')

// @ts-ignore
const clientMetadata = {
    client_id: config.idamClient,
    client_secret: process.env.IDAM_SECRET,
    post_logout_redirect_uris: ['http://localhost:3000'],
    redirect_uris: ['http://localhost:3000/oauth2/callback'],
    response_types: ['code'],
    token_endpoint_auth_method: 'client_secret_post', // The default is 'client_secret_basic'.
};

// TODO: find a better way of doing this
(async () => {
    const issuer = await Issuer.discover(`${idamURl}/o`)

    const metadata = issuer.metadata
    metadata.issuer = 'https://forgerock-am.service.core-compute-idam-aat.internal:8443/openam/oauth2/hmcts'

    const newIssuer = new Issuer(metadata)

    // @ts-ignore
    app.locals.client = new newIssuer.Client(clientMetadata)

    passport.use('oidc', new Strategy({
        client: app.locals.client,
        params: {scope: 'profile openid roles manage-user create-user'},
    }, oidcVerify))

    // passport.use('s2s', new BearerStrategy())
})()

export async function doLogout(req, res, status = 302) {

    // TODO: we may need to revoke tokens by doing a call to OP

    //passport provides this method on request object
    req.logout()

    res.clearCookie('roles')
    res.clearCookie(cookieToken)
    res.clearCookie(cookieUserId)
    req.session.user = null
    req.session.save(() => {
        if (req.query.redirect || status === 401) {  // 401 is when no accessToken
            res.redirect(status, req.query.redirect || '/')
            console.log('Logged out by userDetails')
        } else {
            const message = JSON.stringify({message: 'You have been logged out!'})
            res.status(200).send(message)
            console.log('Logged out by Session')
        }
    })
}

export async function oidcVerify(tokenset: TokenSet, userinfo: UserinfoResponse, done: any) {

    if (!propsExist(userinfo, ['roles'])) {
        logger.warn('User does not have any access roles.')
        return done(null, false, {message: 'User does not have any access roles.'})
    }

    if (!userHasAppAccess(userinfo.roles)) {
        logger.warn('User has no application access, as they do not have a Caseworker role.')
        return done(null, false, {message: 'User has no application access, as they do not have a Caseworker role.'})
    }
    return done(null, {tokenset, userinfo})

}

export function authCallbackSucess(req: any, res: any) {
    // console.log('callback', req.session)

    // we need extra logic before success redirect
    const userDetails = req.session.passport.user
    const roles = userDetails.userinfo.roles

    axios.defaults.headers.common.Authorization = `Bearer ${userDetails.tokenset.access_token}`
    axios.defaults.headers.common['user-roles'] = roles.join()

    res.cookie(cookieUserId, userDetails.userinfo.uid)
    res.cookie(cookieToken, userDetails.tokenset.access_token)
    res.cookie('roles', roles)

    // need this so angular knows which enviroment config to use ...
    res.cookie('platform', config.environment)

    res.redirect('/')
}

router.get('/logout', (req: any, res: any) => {
    req.query.redirect = '/auth/login'
    doLogout(req, res)
})

// router.get('/login', passport.authenticate('oidc'))

router.get('/login', (req: any, res, next) => {
    passport.authenticate('oidc', (err, user, info) => {
        if (err) {
            console.log('HERE', err)
            return next(err) // will generate a 500 error
        }
        // Generate a JSON response reflecting authentication status
        if (! user) {
            return res.send({ success : false, message : 'authentication failed' })
        }
        // ***********************************************************************
        // "Note that when using a custom callback, it becomes the application's
        // responsibility to establish a session (by calling req.login()) and send
        // a response."
        // Source: http://passportjs.org/docs
        // ***********************************************************************
        req.login(user, loginErr => {
            if (loginErr) {
                return next(loginErr)
            }
            return res.send({ success : true, message : 'authentication succeeded' })
        })
    })(req, res, next)
})

router.use('/keepalive', keepAlive)
