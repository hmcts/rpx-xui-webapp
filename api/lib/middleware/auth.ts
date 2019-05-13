import axios from 'axios'
import * as jwtDecode from 'jwt-decode'
import * as auth from '../../auth'
import { config } from '../../config'
import * as log4jui from '../../lib/log4jui'
import { getDetails } from '../../services/idam'
import { asyncReturnOrError } from '../util'

const logger = log4jui.getLogger('auth')

export function validRoles(roles) {
    //return roles.indexOf(config.juiJudgeRole) > -1 || roles.indexOf(config.juiPanelMember) > -1
    return true //disabled role restriction for XUI
}

export default async (req, res, next) => {
    const userId = req.headers[config.cookies.userId] || req.cookies[config.cookies.userId]
    const jwt = req.headers.authorization || req.cookies[config.cookies.token]

    if (!jwt) {
        next() // this should only occur if there is no auth cookie, which will be picked up by the FE
        return
    }

    const jwtData: any = jwtDecode(jwt)

    const expires = new Date(jwtData.exp).getTime()
    const now = new Date().getTime() / 1000
    const expired = expires < now

    if (!req.session.user) {
        logger.warn('Session expired. Trying to get user details again')
        const details = await asyncReturnOrError(getDetails(), 'Cannot get user details', res, logger, false)

        if (details) {
            logger.info('Setting session')
            req.session.user = details
        }
    }
    if (expired || !req.session.user) {
        logger.warn('Auth token  expired need to log in again')
        auth.doLogout(req, res, 401)
        return

    }

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
        if (req.headers.ServiceAuthorization) {
            axios.defaults.headers.common.ServiceAuthorization = req.headers.ServiceAuthorization
        }

        logger.info('Auth token: ' + `Bearer ${req.auth.token}`)
        logger.info('S2S token: ' + req.headers.ServiceAuthorization)
        logger.info('Attached auth headers to request')

        next()
    }
}
