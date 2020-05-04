/**
 * Note that authorization headers have been moved from this file to proxy.ts
 * to achieve better security.
 */

import * as jwtDecode from 'jwt-decode'
import * as auth from '../../auth'
import { getConfigValue } from '../../configuration'
import { COOKIES_TOKEN, COOKIES_USER_ID, SERVICES_IDAM_API_URL } from '../../configuration/references'
import * as log4jui from '../../lib/log4jui'
import { getDetails } from '../../services/idam'
import { asyncReturnOrError } from '../util'
import * as serviceTokenMiddleware from './serviceToken'

const logger = log4jui.getLogger('auth')
const idamURl = getConfigValue(SERVICES_IDAM_API_URL)

export function validRoles(roles) {
    //return roles.indexOf(config.juiJudgeRole) > -1 || roles.indexOf(config.juiPanelMember) > -1
    return true //disabled role restriction for XUI
}

export default async (req, res, next) => {
    const userId = req.headers[getConfigValue(COOKIES_USER_ID)] || req.cookies[getConfigValue(COOKIES_USER_ID)]
    const jwt = req.headers.authorization || req.cookies[getConfigValue(COOKIES_TOKEN)]

    if (!jwt) {
        auth.doLogout(req, res, 401)
        return
    }

    const jwtData: any = jwtDecode(jwt)

    const expires = new Date(jwtData.exp).getTime()
    const now = new Date().getTime() / 1000
    const expired = expires < now

    // TODO: clean this up, why is this even required?
    // concerns: if doLogout is called, req.session.user is cleared but this sets it all up again
    if (!req.session.user) {
        logger.warn('Session expired. Trying to get user details again')
        const details = await asyncReturnOrError(getDetails(idamURl), 'Cannot get user details', res, logger, false)

        if (details) {
            logger.info('Setting session')
            req.session.user = details
        }
    }

    // TODO: expired could be false without req.session.user so this code block could fall through
    if (expired || !req.session.user) {
        logger.warn('Auth token  expired need to log in again')
        auth.doLogout(req, res, 401)
        return

    }

    // TODO: not even a valid test anymore (validRoles() returns true)
    if (!validRoles(req.session.user.roles)) {
        logger.warn('User role does not allow login')
        auth.doLogout(req, res, 401)
    } else {
        req.auth = {}
        req.auth.data = req.session.user
        req.auth.token = jwt
        req.auth.userId = userId

        // !!!
        // The commented lines below have been moved to proxy.ts, where the information
        // is added to the request JIT, instead of setting it as a global default
        // to improve security.

        // axios.defaults.headers.common.Authorization = `Bearer ${req.auth.token}`
        // axios.defaults.headers.common['user-roles'] = req.auth.data.roles.join()

        logger.info('Auth token: ' + `Bearer ${req.auth.token}`)
        req.headers['user-roles'] = req.auth.data.roles.join()

        // moved s2s here so we authenticate first
        await serviceTokenMiddleware.default(req, res, () => {
            logger.info('Attached auth headers to request')
            next()
        })
    }
}
