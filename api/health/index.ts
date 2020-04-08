import * as healthcheck from '@hmcts/nodejs-healthcheck'
import {getConfigValue} from '../configuration'
import {
  SERVICE_S2S_PATH,
  SERVICES_DOCUMENTS_API_PATH,
  SERVICES_EM_ANNO_API_URL,
  SERVICES_IDAM_API_URL,
  SERVICES_IDAM_LOGIN_URL
} from '../configuration/references'

export const checkServiceHealth = service => healthcheck.web(`${service}/health`, {
  deadline: 6000,
  timeout: 6000,
})

/**
 * Health Checks
 *
 * Check each 3rd party endpoint to see if it's up and running.
 */
export const healthChecks = {
  checks: {
    documentsApi: checkServiceHealth(getConfigValue(SERVICES_DOCUMENTS_API_PATH)),
    emmoApi: checkServiceHealth(getConfigValue(SERVICES_EM_ANNO_API_URL)),
    idamApi: checkServiceHealth(getConfigValue(SERVICES_IDAM_LOGIN_URL)),
    idamWeb: checkServiceHealth(getConfigValue(SERVICES_IDAM_API_URL)),
    s2s: checkServiceHealth(getConfigValue(SERVICE_S2S_PATH)),
  },
}

/**
 * Add Reform standard Health Checks for /health and /health/liveness
 * to the application.
 *
 * Note that these checks are hit in the Build pipelines.
 *
 * @param app
 */
export const addReformHealthCheck = app => {
  healthcheck.addTo(app, healthChecks)
}
