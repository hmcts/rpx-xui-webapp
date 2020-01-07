import * as express from 'express'
import * as log4jui from '../lib/log4jui'
const logger = log4jui.getLogger('auth')
import { UserProfileModel } from './user'
import * as jwtDecode from 'jwt-decode'

export const router = express.Router({ mergeParams: true })

router.get('/details', handleUserRoute)

function handleUserRoute(req, res) {
  // todo get this from config
  /* Timeout for userDetails less then 8hrs */
  const timeOuts = {
    caseworker: 2 * 60 * 1000,  // 8 hr
    solicitors: 60 * 60 * 1000, // 1 hr
    special: 20 * 60 * 1000 // 20 min
  };
  const userRoles = 'caseworker'

  function getUserTimeouts() {
    if (userRoles.indexOf('caseworker') !== -1) {
      return timeOuts['caseworker']
    }
  }

  // const sessionTimeOut = getUserTimeouts()
  // const sessionTimeStamp = Math.floor(jwtDecode(req.session.auth.token).exp * 1000)
  const now = new Date()
  /* Session timeout */
  // const sessionTimeStamp = now.setMinutes(now.getMinutes() + 1)
  const UserDetails = {
    ...req.session.user,
  }

  try {
      const payload = JSON.stringify(UserDetails);
      console.log(payload)
      res.send(payload)
  } catch (error) {
      // there is bug here
      logger.info(error)
      const errReport = JSON.stringify({ apiError: error, apiStatusCode: error.statusCode, message: '' })
      res.status(500).send(errReport)
  }
}

export default router
