import axios from 'axios'
import * as passport from 'passport'
import * as auth from '../../auth'
import * as log4jui from '../../lib/log4jui'
import * as serviceTokenMiddleware from './serviceToken'

const logger = log4jui.getLogger('auth')

export function validRoles(roles) {
    //return roles.indexOf(dep-config.juiJudgeRole) > -1 || roles.indexOf(dep-config.juiPanelMember) > -1
    return true //disabled role restriction for XUI
}

export default async (req, res, next) => {
    if (req.isAuthenticated()) {

        const userDetails = req.session.passport.user
        const roles = userDetails.userinfo.roles

        if (!validRoles(roles)) {
            logger.warn('User role does not allow login')
            return auth.doLogout(req, res, 401)
        }

        logger.info('Auth token: ' + `Bearer ${userDetails.tokenset.access_token}`)

        axios.defaults.headers.common.Authorization = `Bearer ${userDetails.tokenset.access_token}`
        axios.defaults.headers.common['user-roles'] = roles.join()

        // moved s2s here so we authenticate first
        return await serviceTokenMiddleware.default(req, res, () => {
            logger.info('Attached auth headers to request')
            next()
        })

    }

    return passport.authenticate('oidc')(req, res, next)
}
