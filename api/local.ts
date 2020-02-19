/**
 * Common to both server.ts and local.ts files
 */
import { app } from './application'
import {getConfigValue, initialiseSecrets} from './configuration'
import {
  APP_INSIGHTS_KEY,
  APP_INSIGHTS_SECRET,
  COOKIES_SESSION_ID,
  COOKIES_TOKEN,
  HEALTH,
  LOGGING,
  MAX_LOG_LINE,
  PROTOCOL,
  S2S_SECRET,
  SERVICES_CCD_COMPONENT_API_PATH,
  SERVICES_CCD_DATA_STORE_API_PATH,
  SERVICES_DOCUMENTS_API_PATH,
  SERVICES_IDAM_API_URL,
  SERVICES_IDAM_CLIENT_ID,
  SERVICES_IDAM_INDEX_URL,
  SERVICES_IDAM_LOGIN_URL,
  SERVICES_IDAM_OAUTH_CALLBACK_URL,
  SERVICES_TERMS_AND_CONDITIONS_PATH,
} from './configuration/references'
import { appInsights } from './lib/appInsights'

initialiseSecrets()

console.log('CHECK ENVIRONMENT VARIABLES:')
console.log(getConfigValue('environment'))
console.log(getConfigValue(SERVICES_CCD_COMPONENT_API_PATH))
console.log(getConfigValue(SERVICES_CCD_DATA_STORE_API_PATH))
console.log(getConfigValue(SERVICES_DOCUMENTS_API_PATH))
console.log(getConfigValue(COOKIES_TOKEN))
console.log(getConfigValue(COOKIES_SESSION_ID))
console.log(getConfigValue(SERVICES_IDAM_API_URL))
console.log(getConfigValue(SERVICES_IDAM_CLIENT_ID))
console.log(getConfigValue(SERVICES_IDAM_LOGIN_URL))
console.log(getConfigValue(SERVICES_IDAM_INDEX_URL))
console.log(getConfigValue(SERVICES_IDAM_OAUTH_CALLBACK_URL))
console.log(getConfigValue(PROTOCOL))
console.log(getConfigValue(MAX_LOG_LINE))
console.log(getConfigValue(LOGGING))
console.log(getConfigValue(APP_INSIGHTS_KEY))
console.log(getConfigValue(SERVICES_TERMS_AND_CONDITIONS_PATH))
console.log(getConfigValue(HEALTH))
console.log('END CHECK OF ENVIRONMENTAL VARIABLES')

console.log(getConfigValue(S2S_SECRET))
console.log(getConfigValue(APP_INSIGHTS_SECRET))

app.use(appInsights)

app.listen(3001, () => console.log('Dev server listening on port 3001!'))
