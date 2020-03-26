import * as express from 'express'
import {getConfigValue} from '../configuration'
import {
  PROTOCOL,
  SERVICES_IDAM_CLIENT_ID,
  SERVICES_IDAM_LOGIN_URL,
  SERVICES_IDAM_OAUTH_CALLBACK_URL,
} from '../configuration/references'

export const router = express.Router({mergeParams: true})

router.get('/', configurationUIRoute)

/**
 * All the following environmental variables are passed to the UI.
 */
async function configurationUIRoute(req, res) {
  res.status(200).send({
    clientId: getConfigValue(SERVICES_IDAM_CLIENT_ID),
    idamWeb: getConfigValue(SERVICES_IDAM_LOGIN_URL),
    oAuthCallback: getConfigValue(SERVICES_IDAM_OAUTH_CALLBACK_URL),
    protocol: getConfigValue(PROTOCOL),
  })
}

export default router
