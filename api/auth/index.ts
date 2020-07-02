import {getConfigValue} from '../configuration'
import {
  COOKIES_TOKEN,
  COOKIES_USER_ID,
  SERVICES_IDAM_API_URL,
} from '../configuration/references'
import * as log4jui from '../lib/log4jui'
import { propsExist } from '../lib/objectUtilities'
import { asyncReturnOrError, exists } from '../lib/util'
import { getDetails, postOauthToken } from '../services/idam'
import { userHasAppAccess } from './manageCasesUserRoleAuth'

const cookieToken = getConfigValue(COOKIES_TOKEN)
const cookieUserId = getConfigValue(COOKIES_USER_ID)
const idamURl = getConfigValue(SERVICES_IDAM_API_URL)

const logger = log4jui.getLogger('auth')

export function doLogout(req, res, status = 302) {
    res.clearCookie(cookieToken)
    res.clearCookie(cookieUserId)
    req.session.user = null
    req.session.save(() => {
        res.redirect(status, req.query.redirect || '/')
    })
}
export function logout(req, res) {
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
        const userDetails = await asyncReturnOrError(getDetails( idamURl, data.access_token), 'Cannot get user userDetails', res, logger, false)

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
            res.cookie('roles', userDetails.roles.join(','))
        }
    }
    logger.info('Auth finished, redirecting')
    req.session.save(() => {
        res.redirect('/')
    })
}
