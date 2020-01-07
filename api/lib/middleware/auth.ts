import axios from 'axios'
import * as jwtDecode from 'jwt-decode'
import * as auth from '../../auth'
import { config } from '../../config'
import * as log4jui from '../../lib/log4jui'
import { getDetails } from '../../services/idam'
import { asyncReturnOrError } from '../util'
import * as serviceTokenMiddleware from './serviceToken'

const logger = log4jui.getLogger('auth')
const idamURl = config.services.idam.idamApiUrl

export function validRoles(roles) {
    //return roles.indexOf(config.juiJudgeRole) > -1 || roles.indexOf(config.juiPanelMember) > -1
    return true //disabled role restriction for XUI
}

export default async (req, res, next) => {
    const userId = req.headers[config.cookies.userId] || req.cookies[config.cookies.userId]
    const jwt = req.headers.authorization || req.cookies[config.cookies.token]

    if (!jwt) {
        auth.doLogout(req, res, 401)
        return
    }

    const jwtData: any = jwtDecode(jwt)

    const expires = new Date(jwtData.exp).getTime()
    const now = new Date().getTime() / 1000
    const expired = expires < now

    // TODO: clean this up, why is this even required?
    // concerns: if doLogout is called, req.session.userDetails is cleared but this sets it all up again
    if (!req.session.user) {
        logger.warn('Session expired. Trying to get userDetails details again')
        const details = await asyncReturnOrError(getDetails(idamURl), 'Cannot get userDetails details', res, logger, false)

        if (details) {
            logger.info('Setting session')
            req.session.user = details
        }
    }

    // TODO: expired could be false without req.session.userDetails so this code block could fall through
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

        axios.defaults.headers.common.Authorization = `Bearer ${req.auth.token}`
        axios.defaults.headers.common['user-roles'] = req.auth.data.roles.join()

        logger.info('Auth token: ' + `Bearer ${req.auth.token}`)

        // moved s2s here so we authenticate first
        await serviceTokenMiddleware.default(req, res, () => {
            logger.info('Attached auth headers to request')
            next()
        })
    }
}
