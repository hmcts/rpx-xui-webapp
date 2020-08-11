import * as express from 'express'
import {getConfigValue} from './index'
import {
  LAUNCH_DARKLY_CLIENT_ID,
  PROTOCOL,
  SERVICES_IDAM_CLIENT_ID,
  SERVICES_IDAM_LOGIN_URL,
  SERVICES_IDAM_OAUTH_CALLBACK_URL,
} from './references'

export const router = express.Router({mergeParams: true})

router.get('/', uiConfigurationRouter)

/**
 * UI Configuration Route
 *
 * The following environmental variables are passed to the UI.
 *
 * Note that we do not pass the whole appConfiguration to the UI,
 * we only pass what's needed to be precise.
 */
async function uiConfigurationRouter(req, res) {
  res.status(200).send({
    clientId: getConfigValue(SERVICES_IDAM_CLIENT_ID),
    idamWeb: getConfigValue(SERVICES_IDAM_LOGIN_URL),
    launchDarklyClientId: getConfigValue(LAUNCH_DARKLY_CLIENT_ID),
    oAuthCallback: getConfigValue(SERVICES_IDAM_OAUTH_CALLBACK_URL),
    protocol: getConfigValue(PROTOCOL),
  })
}

export default router
