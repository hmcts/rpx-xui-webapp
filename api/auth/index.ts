
import {TokenSet, UserinfoResponse} from 'openid-client'
import { config } from '../config'
import * as log4jui from '../lib/log4jui'
import * as serviceTokenMiddleware from '../lib/middleware/serviceToken'
import { propsExist } from '../lib/objectUtilities'
import { asyncReturnOrError, exists } from '../lib/util'
import { getDetails, postOauthToken } from '../services/idam'
import { userHasAppAccess } from './manageCasesUserRoleAuth'

const cookieToken = config.cookies.token
const cookieUserId = config.cookies.userId
const idamURl = config.services.idam.idamApiUrl

const logger = log4jui.getLogger('auth')

export function doLogout(req, res, status = 302) {
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
export function logout(req, res) {
    console.log('auth logout called##11')
    doLogout(req, res)
}

export async function authenticateUser(req: any, res, next) {
    req.session.user = null
    const data = await asyncReturnOrError(
        postOauthToken(req.query.code, req.get('host')),
        'Error getting token for code',
        res,
        logger,
        false
    )

    if (exists(data, 'access_token')) {
        // tslint:disable-next-line
        const userDetails = await asyncReturnOrError(getDetails( idamURl, data.access_token), 'Cannot get userDetails userDetails', res, logger, false)

        if (!propsExist(userDetails, ['roles'])) {
          logger.warn('User does not have any access roles.')
          doLogout(req, res)
          return false
        }

        if (!userHasAppAccess(userDetails.roles)) {
          logger.warn('User has no application access, as they do not have a Caseworker role.')
          doLogout(req, res)
          return false
        }

        if (userDetails) {
            logger.info('Setting session and cookies')
            req.session.user = userDetails
            res.cookie(cookieUserId, userDetails.id)
            res.cookie(cookieToken, data.access_token)
            res.cookie('roles', userDetails.roles)

            // need this so angular knows which enviroment config to use ...
            res.cookie('platform', config.environment)
        }
    }
    logger.info('Auth finished, redirecting')
    req.session.save(() => {
        res.redirect('/')
    })
}

export async function oidcVerify(tokenset: TokenSet, userinfo: UserinfoResponse, done: any ) {

    console.log('expires_in: ', tokenset.expires_in)

    if (!propsExist(userinfo, ['roles'])) {
        logger.warn('User does not have any access roles.')
        return done(null, false, { message: 'User does not have any access roles.'})
    }

    if (!userHasAppAccess(userinfo.roles)) {
        logger.warn('User has no application access, as they do not have a Caseworker role.')
        return done(null, false, { message: 'User has no application access, as they do not have a Caseworker role.'})
    }

    logger.info('Auth token: ' + `Bearer ${tokenset.access_token}`)

    // moved s2s here so we authenticate first
    await serviceTokenMiddleware.default(null, null, () => {
        logger.info('Attached auth headers to request')
        logger.info('Auth finished, redirecting')
        return done(null, {tokenset, userinfo})
    })

    return done(null, {tokenset, userinfo})

}
