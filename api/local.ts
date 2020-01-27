/**
 * Common to both server.ts and local.ts files
 */
import * as config from 'config'
import * as propertiesVolume from '@hmcts/properties-volume'
import { app } from './application'
import { appInsights } from './lib/appInsights'
import {environmentCheckText, getConfigValue, getEnvironment} from './configuration'
import {ERROR_NODE_CONFIG_ENV} from './configuration/constants'
import {
  APP_INSIGHTS_KEY,
  COOKIE_TOKEN,
  COOKIES_USERID, ENVIRONMENT,
  IDAM_CLIENT,
  JURISDICTIONS,
  LOGGING,
  MAX_LINES, NOW,
  PROXY_HOST,
  SECURE_COOKIE,
  SERVICES_CCD_DATA_API_PATH,
  SERVICES_CCD_DEF_API_PATH,
  SERVICES_IDAM_API_PATH,
  SESSION_SECRET,
} from './configuration/references';

/**
 * Allows us to integrate the Azure key-vault flex volume, so that we are able to access Node configuration values.
 */
propertiesVolume.addTo(config)

/**
 * If there are no configuration properties found we highlight this to the person attempting to initialise
 * this application.
 */
// if (!getEnvironment()) {
//   console.log(ERROR_NODE_CONFIG_ENV)
// }

// console.log(environmentCheckText())
console.log(config.get('environment.name'))

app.use(appInsights)

app.listen(3001, () => console.log('Dev server listening on port 3001!'))
