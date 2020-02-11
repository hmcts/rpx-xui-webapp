import {healthEndpoints} from './health'
import {getConfigValue, getEnvironment} from './index'
import {
  EnvironmentConfigCookies,
  EnvironmentConfigExceptionOptions,
  EnvironmentConfigProxy,
  EnvironmentConfigServices
} from '../interfaces/environment.config'
import {
  COOKIE_TOKEN,
  COOKIES_USERID,
  IDAM_CLIENT,
  INDEX_URL,
  LOGGING,
  MAX_LINES,
  MAX_LOG_LINE,
  MICROSERVICE,
  NOW,
  OAUTH_CALLBACK_URL,
  PROTOCOL,
  PROXY_HOST,
  PROXY_PORT,
  SECURE_COOKIE,
  SERVICE_S2S_PATH,
  SERVICES_CCD_DATA_API_PATH,
  SERVICES_CCD_DEF_API_PATH,
  SERVICES_IDAM_API_PATH,
  SERVICES_IDAM_WEB,
  SERVICES_RD_PROFESSIONAL_API_PATH,
  SESSION_SECRET
} from './references'

export const uiConfig = () => {

  const configEnv = getEnvironment()

  return {
    configEnv,
    cookies: {
      token: getConfigValue(COOKIE_TOKEN),
      userId: getConfigValue(COOKIES_USERID),
    } as EnvironmentConfigCookies,
    exceptionOptions: {
      maxLines: getConfigValue(MAX_LINES),
    } as EnvironmentConfigExceptionOptions,
    health: healthEndpoints() as EnvironmentConfigServices,
    idamClient: getConfigValue(IDAM_CLIENT),
    indexUrl: getConfigValue(INDEX_URL),
    logging: getConfigValue(LOGGING),
    maxLogLine: getConfigValue(MAX_LOG_LINE),
    microservice: getConfigValue(MICROSERVICE),
    now: getConfigValue(NOW),
    oauthCallbackUrl: getConfigValue(OAUTH_CALLBACK_URL),
    protocol: getConfigValue(PROTOCOL),
    proxy: {
      host: getConfigValue(PROXY_HOST),
      port: getConfigValue(PROXY_PORT),
    } as EnvironmentConfigProxy,
    secureCookie: getConfigValue(SECURE_COOKIE),
    services: {
      ccdDataApi: getConfigValue(SERVICES_CCD_DATA_API_PATH),
      ccdDefApi: getConfigValue(SERVICES_CCD_DEF_API_PATH),
      idamApi: getConfigValue(SERVICES_IDAM_API_PATH),
      idamWeb: getConfigValue(SERVICES_IDAM_WEB),
      rdProfessionalApi: getConfigValue(SERVICES_RD_PROFESSIONAL_API_PATH),
      s2s: getConfigValue(SERVICE_S2S_PATH),
    } as EnvironmentConfigServices,
    sessionSecret: getConfigValue(SESSION_SECRET),
  }
}
