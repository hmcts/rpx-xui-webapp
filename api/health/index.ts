import * as healthcheck from '@hmcts/nodejs-healthcheck'
import {SESSION, xuiNode} from '@hmcts/rpx-xui-node-lib'
import {getConfigValue, showFeature} from '../configuration'
import {
  FEATURE_REDIS_ENABLED,
  // FEATURE_TERMS_AND_CONDITIONS_ENABLED,
  SERVICE_S2S_PATH,
  SERVICES_CCD_COMPONENT_API_PATH,
  SERVICES_CCD_DATA_STORE_API_PATH,
  SERVICES_DOCUMENTS_API_PATH,
  SERVICES_EM_ANNO_API_URL,
  SERVICES_IDAM_API_URL,
  SERVICES_IDAM_LOGIN_URL,
  SERVICES_TERMS_AND_CONDITIONS_URL
} from '../configuration/references'
import * as log4jui from '../lib/log4jui'
import {JUILogger} from '../lib/models'
import {redisHealth} from './redis.health'

const logger: JUILogger = log4jui.getLogger('Health')

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
    ccdComponentApi: checkServiceHealth(getConfigValue(SERVICES_CCD_COMPONENT_API_PATH)),
    ccdDataApi: checkServiceHealth(getConfigValue(SERVICES_CCD_DATA_STORE_API_PATH)),
    documentsApi: checkServiceHealth(getConfigValue(SERVICES_DOCUMENTS_API_PATH)),
    emmoApi: checkServiceHealth(getConfigValue(SERVICES_EM_ANNO_API_URL)),
    idamApi: checkServiceHealth(getConfigValue(SERVICES_IDAM_LOGIN_URL)),
    idamWeb: checkServiceHealth(getConfigValue(SERVICES_IDAM_API_URL)),
    s2s: checkServiceHealth(getConfigValue(SERVICE_S2S_PATH)),
    termsAndConditions: checkServiceHealth(getConfigValue(SERVICES_TERMS_AND_CONDITIONS_URL)),
  },
}

/*if (showFeature(FEATURE_TERMS_AND_CONDITIONS_ENABLED)) {
  healthChecks.checks = {...healthChecks.checks, ...{
  termsAndConditions: checkServiceHealth(getConfigValue(SERVICES_TERMS_AND_CONDITIONS_URL)),
    },
  }
}*/

/**
 * Add Reform standard Health Checks for /health and /health/liveness
 * to the application.
 *
 * Note that these checks are hit in the Build pipelines.
 *
 * @param app
 */
export const addReformHealthCheck = app => {

  if (showFeature(FEATURE_REDIS_ENABLED)) {
    xuiNode.on(SESSION.EVENT.REDIS_CLIENT_READY, (redisClient: any) => {
      app.locals.redisClient = redisClient
      healthChecks.checks = {...healthChecks.checks, ...{
          redis: healthcheck.raw(async () => {
            const status = await redisHealth()
            return status ? healthcheck.up() : healthcheck.down()
          }),
        }}

      healthcheck.addTo(app, healthChecks)
    })
    xuiNode.on(SESSION.EVENT.REDIS_CLIENT_ERROR, (error: any) => {
      logger.error('redis Client error is', error)
    })
  }
  healthcheck.addTo(app, healthChecks)
  // else {
  //   healthcheck.addTo(app, healthChecks)
  // }
}
