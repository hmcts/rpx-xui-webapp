/**
 * Common to both server.ts and local.ts files
 */
import { app } from './application'
import {getConfigValue, showFeature} from './configuration'
import {
  COOKIES_SESSION_ID,
  COOKIES_TOKEN,
  FEATURE_APP_INSIGHTS_ENABLED,
  FEATURE_HELMET_ENABLED,
  FEATURE_PROXY_ENABLED,
  FEATURE_REDIS_ENABLED,
  FEATURE_SECURE_COOKIE_ENABLED,
  FEATURE_TERMS_AND_CONDITIONS_ENABLED,
  HEALTH,
  LOGGING,
  MAX_LOG_LINE,
  PROTOCOL,
  SERVICES_CCD_COMPONENT_API_PATH,
  SERVICES_CCD_DATA_STORE_API_PATH,
  SERVICES_DOCUMENTS_API_PATH,
  SERVICES_IDAM_API_URL,
  SERVICES_IDAM_CLIENT_ID,
  SERVICES_IDAM_INDEX_URL,
  SERVICES_IDAM_LOGIN_URL,
  SERVICES_IDAM_OAUTH_CALLBACK_URL,
  SERVICES_TERMS_AND_CONDITIONS_URL,
} from './configuration/references'
import { appInsights } from './lib/appInsights'

console.log('CHECK ENVIRONMENT VARIABLES:')
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
console.log(getConfigValue(SERVICES_TERMS_AND_CONDITIONS_URL))
console.log(getConfigValue(HEALTH))
console.log(showFeature(FEATURE_SECURE_COOKIE_ENABLED))
console.log(showFeature(FEATURE_APP_INSIGHTS_ENABLED))
console.log(showFeature(FEATURE_PROXY_ENABLED))
console.log(showFeature(FEATURE_TERMS_AND_CONDITIONS_ENABLED))
console.log(showFeature(FEATURE_HELMET_ENABLED))
console.log(showFeature(FEATURE_REDIS_ENABLED))
console.log('END CHECK OF ENVIRONMENTAL VARIABLES')

app.use(appInsights)

app.listen(3001, () => console.log('Dev server listening on port 3001!'))
