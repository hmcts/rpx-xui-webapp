import {getConfigValue, showFeature} from './index'

import {
  COOKIES_SESSION_ID,
  COOKIES_TOKEN,
  FEATURE_APP_INSIGHTS_ENABLED,
  FEATURE_HELMET_ENABLED,
  FEATURE_OIDC_ENABLED,
  FEATURE_PROXY_ENABLED,
  FEATURE_REDIS_ENABLED,
  FEATURE_SECURE_COOKIE_ENABLED,
  FEATURE_TERMS_AND_CONDITIONS_ENABLED,
  HEALTH,
  LOGGING,
  MAX_LOG_LINE,
  PROTOCOL,
  SERVICE_S2S_PATH,
  SERVICES_CCD_CASE_ASSIGNMENT_API_PATH,
  SERVICES_CCD_COMPONENT_API_PATH,
  SERVICES_CCD_DATA_STORE_API_PATH,
  SERVICES_DOCUMENTS_API_PATH,
  SERVICES_IDAM_API_URL,
  SERVICES_IDAM_CLIENT_ID,
  SERVICES_IDAM_LOGIN_URL,
  SERVICES_IDAM_OAUTH_CALLBACK_URL,
  SERVICES_PAYMENTS_URL,
  SERVICES_PRD_API_URL,
  SERVICES_TERMS_AND_CONDITIONS_URL,
  SERVICES_WORK_ALLOCATION_TASK_API_PATH,
} from './references'

/**
 * Application Configuration
 *
 * Details the applications configuration.
 *
 * Note that we do not include the secrets within this object.
 *
 * @returns
 */
export const applicationConfiguration = () => {
  return {
    clientId: getConfigValue(SERVICES_IDAM_CLIENT_ID),
    cookieSessionId: getConfigValue(COOKIES_SESSION_ID),
    cookieToken: getConfigValue(COOKIES_TOKEN),
    featureAppInsightsEnabled: showFeature(FEATURE_APP_INSIGHTS_ENABLED),
    featureHelmetEnabled: showFeature(FEATURE_HELMET_ENABLED),
    featureOidcEnabled: showFeature(FEATURE_OIDC_ENABLED),
    featureProxyEnabled: showFeature(FEATURE_PROXY_ENABLED),
    featureRedisEnabled: showFeature(FEATURE_REDIS_ENABLED),
    featureSecureCookieEnabled: showFeature(FEATURE_SECURE_COOKIE_ENABLED),
    featureTermsAndConditionsEnabled: showFeature(FEATURE_TERMS_AND_CONDITIONS_ENABLED),
    health: getConfigValue(HEALTH),
    idamApiUrl: getConfigValue(SERVICES_IDAM_API_URL),
    idamWeb: getConfigValue(SERVICES_IDAM_LOGIN_URL),
    logging: getConfigValue(LOGGING),
    maxLogLine: getConfigValue(MAX_LOG_LINE),
    oAuthCallback: getConfigValue(SERVICES_IDAM_OAUTH_CALLBACK_URL),
    payments: getConfigValue(SERVICES_PAYMENTS_URL),
    protocol: getConfigValue(PROTOCOL),
    servicesCcdCaseAssignmentPath: getConfigValue(SERVICES_CCD_CASE_ASSIGNMENT_API_PATH),
    servicesCcdComponentPath: getConfigValue(SERVICES_CCD_COMPONENT_API_PATH),
    servicesCcdDataStorePath: getConfigValue(SERVICES_CCD_DATA_STORE_API_PATH),
    servicesDocumentApiPath: getConfigValue(SERVICES_DOCUMENTS_API_PATH),
    servicesPrdApiPath: getConfigValue(SERVICES_PRD_API_URL),
    servicesS2sPath: getConfigValue(SERVICE_S2S_PATH),
    servicesTermsAndConditionsPath: getConfigValue(SERVICES_TERMS_AND_CONDITIONS_URL),
    workAllocationTaskPath: getConfigValue(SERVICES_WORK_ALLOCATION_TASK_API_PATH)
  }
}
