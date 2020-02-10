/**
 * Common to both server.ts and local.ts files
 */
import * as config from 'config'
import * as propertiesVolume from '@hmcts/properties-volume'
import { app } from './application'
import { appInsights } from './lib/appInsights'
// TODO: Remove environmentCheckText?
import {environmentCheckText, getConfigValue, getEnvironment} from './configuration'
// TODO: Not needed?
import {ERROR_NODE_CONFIG_ENV} from './configuration/constants'
import {
  SERVICES_CCD_COMPONENT_API_PATH,
  SERVICES_CCD_DATA_STORE_API_PATH,
  SERVICES_DOCUMENTS_API_PATH,
  COOKIES_TOKEN,
  COOKIES_SESSION_ID,
  SERVICES_IDAM_API_URL,
  SERVICES_IDAM_CLIENT_ID,
  SERVICES_IDAM_LOGIN_URL,
  SERVICES_IDAM_INDEX_URL,
  SERVICES_IDAM_ISS_URL,
  SERVICES_IDAM_OAUTH_CALLBACK_URL,
  PROTOCOL,
  MAX_LOG_LINE,
  LOGGING,
  APP_INSIGHTS_KEY,
  SERVICES_TERMS_AND_CONDITIONS_PATH,
  HEALTH,
} from './configuration/references'

/**
 * Allows us to integrate the Azure key-vault flex volume, so that we are able to access Node configuration values.
 */
propertiesVolume.addTo(config)

console.log(getConfigValue('environment.name'))
console.log(getConfigValue(SERVICES_CCD_COMPONENT_API_PATH))
console.log(getConfigValue(SERVICES_CCD_DATA_STORE_API_PATH))
console.log(getConfigValue(SERVICES_DOCUMENTS_API_PATH))
console.log(getConfigValue(COOKIES_TOKEN))
console.log(getConfigValue(COOKIES_SESSION_ID))
console.log(getConfigValue(SERVICES_IDAM_API_URL))
console.log(getConfigValue(SERVICES_IDAM_CLIENT_ID))
console.log(getConfigValue(SERVICES_IDAM_LOGIN_URL))
console.log(getConfigValue(SERVICES_IDAM_INDEX_URL))
console.log(getConfigValue(SERVICES_IDAM_ISS_URL))
console.log(getConfigValue(SERVICES_IDAM_OAUTH_CALLBACK_URL))
console.log(getConfigValue(PROTOCOL))
console.log(getConfigValue(MAX_LOG_LINE))
console.log(getConfigValue(LOGGING))
console.log(getConfigValue(APP_INSIGHTS_KEY))
console.log(getConfigValue(SERVICES_TERMS_AND_CONDITIONS_PATH))
console.log(getConfigValue(HEALTH))

app.use(appInsights)

app.listen(3001, () => console.log('Dev server listening on port 3001!'))
