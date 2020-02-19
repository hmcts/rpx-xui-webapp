/**
 * References to the configuration properties and their values contained with
 * the /dep-config .yaml files.
 *
 * We store reference on how to extract the value from the .yaml data structure here.
 *
 * They are reference strings and therefore need to be testable.
 *
 * This file should be representative of the .yaml files in /dep-config, and not
 * contain any additional constants. They are grouped as a representation of the .yaml structure.
 */
// TODO: Path to Url
export const APP_INSIGHTS_SECRET = 'secrets.rpx.AppInsightsInstrumentationKey'
export const S2S_SECRET = 'secrets.rpx.mc-s2s-client-secret'

export const SERVICES_CCD_COMPONENT_API_PATH = 'services.ccd.componentApi'
export const SERVICES_CCD_DATA_STORE_API_PATH = 'services.ccd.dataApi'
export const SERVICES_DOCUMENTS_API_PATH = 'services.documents.api'

export const COOKIES_TOKEN = 'cookies.token'
export const COOKIES_USER_ID = 'cookies.userId'
export const COOKIES_SESSION_ID = 'cookies.sessionId'

export const SECURE_COOKIE = 'secureCookie'
export const SESSION_SECRET = 'sessionSecret'

export const PROXY_ENABLED = 'proxy.enabled'
export const PROXY_HOST = 'proxy.host'
export const PROXY_PORT = 'proxy.port'

export const SERVICES_IDAM_API_URL = 'services.idam.idamApiUrl'

export const SERVICES_IDAM_CLIENT_ID = 'services.idam.idamClientID'
export const SERVICES_IDAM_LOGIN_URL = 'services.idam.idamLoginUrl'
export const SERVICES_IDAM_INDEX_URL = 'services.idam.indexUrl'
export const SERVICES_IDAM_ISS_URL = 'services.idam.iss'
export const SERVICES_IDAM_OAUTH_CALLBACK_URL = 'services.idam.oauthCallbackUrl'

export const SERVICES_EM_ANNO_API_URL = 'services.em_anno_api'
export const SERVICE_S2S_PATH = 'services.s2s'

export const PROTOCOL = 'protocol'
export const MAX_LOG_LINE = 'maxLogLine'
export const LOGGING = 'logging'

export const APP_INSIGHTS_KEY = 'appInsights.instrumentationKey'
export const ENVIRONMENT = 'environment'
export const MICROSERVICE = 'microservice'

// TODO: rename to url
export const SERVICES_TERMS_AND_CONDITIONS_PATH = 'services.termsAndConditions'
export const HEALTH = 'health'

export const JURISDICTIONS = 'jurisdictions'
