/**
 * Common to both server.ts and local.ts files
 */
import * as propertiesVolume from '@hmcts/properties-volume'
import { app } from './application'
import { getAppInsightsSecret, getConfigValue, getS2sSecret } from './configuration'
import {
  APP_INSIGHTS_KEY,
  COOKIES_SESSION_ID,
  COOKIES_TOKEN,
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
  SERVICES_TERMS_AND_CONDITIONS_PATH,
} from './configuration/references'
import { appInsights } from './lib/appInsights'

const secrets = propertiesVolume.addTo({}, { mountPoint: '/Volumes/mnt/secrets/', failOnError: false })

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

// TODO: Let's get the secrets into here.
console.log('s2sSecret')
console.log(getS2sSecret(secrets))
console.log(getAppInsightsSecret(secrets))

app.use(appInsights)

app.listen(3001, () => console.log('Dev server listening on port 3001!'))
