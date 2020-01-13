import * as express from 'express'
import {config} from '../config'
import * as log4jui from '../lib/log4jui'
import authInterceptor from '../lib/middleware/auth'
const logger = log4jui.getLogger('auth')

export const router = express.Router({ mergeParams: true })

router.use(authInterceptor)

router.get('/details', handleUserRoute)

function handleUserRoute(req, res) {

  const isProd: boolean = (config.environment === 'prod' || config.environment === 'local')
  // in milliseconds
  const idleTimeOuts: {caseworker: number; solicitors: number; special: number} = {
    caseworker: isProd ? 8 * 60 * 60 * 1000 : 60 * 1000, // 8 hr
    solicitors: isProd ? 60 * 60 * 1000 : 60 * 1000, // 1 hr
    special: isProd ? 20 * 60 * 1000 :  60 * 1000, // 20 min
  }

  const userRoles: string[] = req.session.passport.user.userinfo.roles

  const isDwpOrHomeOffice: boolean = (
    userRoles.includes('caseworker-sscs-dwpresponsewriter') ||
    userRoles.includes('caseworker-ia-homeofficeapc') ||
    userRoles.includes('caseworker-ia-homeofficelart') ||
    userRoles.includes('caseworker-ia-homeofficepou')
  )

  const isSolicitor: boolean = userRoles.includes('pui-case-manager')

  function getUserTimeouts() {
    if (isSolicitor) {
      return idleTimeOuts.solicitors
    } else if (isDwpOrHomeOffice) {
      return idleTimeOuts.special
    } else {
      return idleTimeOuts.caseworker
    }
  }

  const UserDetails = {
    ...req.session.user,
    idleTime: getUserTimeouts(),
    timeout: isProd ? 10 * 60 : 50, // in seconds
  }

  try {
      const payload = JSON.stringify(UserDetails)
      console.log(payload)
      res.send(payload)
  } catch (error) {
      logger.info(error)
      const errReport = JSON.stringify({ apiError: error, apiStatusCode: error.statusCode, message: '' })
      res.status(500).send(errReport)
  }
}

export default router
