/**
 * References to the configuration properties and their values contained with
 * the /config .json files.
 *
 * We store reference on how to extract the value from the .json data structure here.
 *
 * They are reference strings and therefore need to be testable.
 *
 * This file should be representative of the .json files in /config
 */
export const APP_INSIGHTS_SECRET = 'secrets.rpx.AppInsightsInstrumentationKey'
export const S2S_SECRET = 'secrets.rpx.mc-s2s-client-secret'

export const COOKIES_TOKEN = 'cookies.token'
export const COOKIES_USER_ID = 'cookies.userId'
export const COOKIES_SESSION_ID = 'cookies.sessionId'

export const APP_INSIGHTS_KEY = 'appInsights.instrumentationKey'

export const LOGGING = 'logging'
export const MAX_LOG_LINE = 'maxLogLine'
export const HEALTH = 'health'

export const SERVICES_CCD_COMPONENT_API_PATH = 'services.ccd.componentApi'
export const SERVICES_CCD_DATA_STORE_API_PATH = 'services.ccd.dataApi'

export const SERVICES_DOCUMENTS_API_PATH = 'services.documents.api'

export const SERVICES_EM_ANNO_API_URL = 'services.em_anno_api'

export const SERVICES_IDAM_API_URL = 'services.idam.idamApiUrl'
export const SERVICES_IDAM_CLIENT_ID = 'services.idam.idamClientID'
export const SERVICES_IDAM_LOGIN_URL = 'services.idam.idamLoginUrl'
export const SERVICES_IDAM_INDEX_URL = 'services.idam.indexUrl'
export const SERVICES_IDAM_ISS_URL = 'services.idam.iss'
export const SERVICES_IDAM_OAUTH_CALLBACK_URL = 'services.idam.oauthCallbackUrl'

export const SERVICE_S2S_PATH = 'services.s2s'
export const SERVICES_TERMS_AND_CONDITIONS_URL = 'services.termsAndConditions'

export const PROTOCOL = 'protocol'
export const MICROSERVICE = 'microservice'

export const PROXY_ENABLED = 'proxy.enabled'
export const PROXY_HOST = 'proxy.host'
export const PROXY_PORT = 'proxy.port'

export const SESSION_SECRET = 'sessionSecret'
export const SECURE_COOKIE = 'secureCookie'

export const ENVIRONMENT = 'environment'

export const JURISDICTIONS = 'jurisdictions'

export const IDAM_SECRET = 'secrets.rpx.mc-idam-client-secret'

export const LOGIN_ROLE_MATCHER = 'loginRoleMatcher'

export const LOG4_J_CONFIG = 'log4JConfig'

export const FEATURE_SECURE_COOKIE_ENABLED = 'secureCookieEnabled'
export const FEATURE_APP_INSIGHTS_ENABLED = 'appInsightsEnabled'
export const FEATURE_PROXY_ENABLED = 'proxyEnabled'
export const FEATURE_TERMS_AND_CONDITIONS_ENABLED = 'termsAndConditionsEnabled'
