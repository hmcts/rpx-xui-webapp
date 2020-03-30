import * as express from 'express'
import {getConfigValue, showFeature} from '../configuration'
import {
  FEATURE_APP_INSIGHTS_ENABLED,
  FEATURE_PROXY_ENABLED,
  FEATURE_REDIS_ENABLED,
  FEATURE_SECURE_COOKIE_ENABLED,
  FEATURE_TERMS_AND_CONDITIONS_ENABLED,
  PROTOCOL,
  SERVICE_S2S_PATH,
  SERVICES_CCD_COMPONENT_API_PATH,
  SERVICES_CCD_DATA_STORE_API_PATH,
  SERVICES_DOCUMENTS_API_PATH,
  SERVICES_IDAM_CLIENT_ID,
  SERVICES_IDAM_LOGIN_URL,
  SERVICES_IDAM_OAUTH_CALLBACK_URL,
} from '../configuration/references'

export const router = express.Router({mergeParams: true})

router.get('/', configurationCheckRoute)

/**
 * Used to check application configuration
 */
async function configurationCheckRoute(req, res) {
  res.status(200).send({
    clientId: getConfigValue(SERVICES_IDAM_CLIENT_ID),
    featureAppInsightsEnabled: showFeature(FEATURE_APP_INSIGHTS_ENABLED),
    featureProxyEnabled: showFeature(FEATURE_PROXY_ENABLED),
    featureRedisEnabled: showFeature(FEATURE_REDIS_ENABLED),
    featureSecureCookieEnabled: showFeature(FEATURE_SECURE_COOKIE_ENABLED),
    featureTermsAndConditionsEnabled: showFeature(FEATURE_TERMS_AND_CONDITIONS_ENABLED),
    idamWeb: getConfigValue(SERVICES_IDAM_LOGIN_URL),
    oAuthCallback: getConfigValue(SERVICES_IDAM_OAUTH_CALLBACK_URL),
    protocol: getConfigValue(PROTOCOL),
    servicesCcdComponentPath: getConfigValue(SERVICES_CCD_COMPONENT_API_PATH),
    servicesCcdDataStorePath: getConfigValue(SERVICES_CCD_DATA_STORE_API_PATH),
    servicesDocumentApiPath: getConfigValue(SERVICES_DOCUMENTS_API_PATH),
    servicesS2sPath: getConfigValue(SERVICE_S2S_PATH),
  })
}

export default router
