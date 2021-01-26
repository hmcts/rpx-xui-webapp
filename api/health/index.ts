import {app} from '../application'
import {SESSION, xuiNode} from '@hmcts/rpx-xui-node-lib'
import * as healthcheck from '@hmcts/nodejs-healthcheck'
import { getConfigValue, showFeature } from '../configuration'
import {
  FEATURE_REDIS_ENABLED,
  FEATURE_TERMS_AND_CONDITIONS_ENABLED,
  SERVICE_S2S_PATH,
  SERVICES_CCD_COMPONENT_API_PATH,
  SERVICES_CCD_DATA_STORE_API_PATH,
  SERVICES_DOCUMENTS_API_PATH,
  SERVICES_EM_ANNO_API_URL,
  SERVICES_IDAM_API_URL,
  SERVICES_IDAM_LOGIN_URL,
  SERVICES_TERMS_AND_CONDITIONS_URL
} from '../configuration/references'
import { redisHealth } from './redis.health'
import * as log4jui from '../lib/log4jui'
import {JUILogger} from '../lib/models'
const logger: JUILogger = log4jui.getLogger('RedisHealth')

export const checkServiceHealth = service => healthcheck.web(`${service}/health`, {
  deadline: 6000,
  timeout: 6000,
})

const config = {
  checks: {
    ccdComponentApi: checkServiceHealth(getConfigValue(SERVICES_CCD_COMPONENT_API_PATH)),
    ccdDataApi: checkServiceHealth(getConfigValue(SERVICES_CCD_DATA_STORE_API_PATH)),
    documentsApi: checkServiceHealth(getConfigValue(SERVICES_DOCUMENTS_API_PATH)),
    emmoApi: checkServiceHealth(getConfigValue(SERVICES_EM_ANNO_API_URL)),
    idamApi: checkServiceHealth(getConfigValue(SERVICES_IDAM_LOGIN_URL)),
    idamWeb: checkServiceHealth(getConfigValue(SERVICES_IDAM_API_URL)),
    s2s: checkServiceHealth(getConfigValue(SERVICE_S2S_PATH)),
  },
}

export const addReformHealthCheck = app => {
  if (showFeature(FEATURE_TERMS_AND_CONDITIONS_ENABLED)) {
    config.checks = {
      ...config.checks, ...{
        termsAndConditions: checkServiceHealth(getConfigValue(SERVICES_TERMS_AND_CONDITIONS_URL)),
      },
    }
  }
  if (showFeature(FEATURE_REDIS_ENABLED)) {
    xuiNode.on(SESSION.EVENT.REDIS_CLIENT_READY, (redisClient: any) => {
      console.log('REDIS EVENT FIRED!!')
      config.checks = {...config.checks, ...{
          redis: healthcheck.raw(() => {
            return redisClient.connected ? healthcheck.up() : healthcheck.down()
          }),
        },
      }
    })
    xuiNode.on(SESSION.EVENT.REDIS_CLIENT_ERROR, (error: any) => {
      logger.error('redis Client error is', error)
    })
  }
  console.log('config', config)
  healthcheck.addTo(app, config)
}
