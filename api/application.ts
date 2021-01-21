import * as healthcheck from '@hmcts/nodejs-healthcheck'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as helmet from 'helmet'
import {getXuiNodeMiddleware} from './auth'
import { getConfigValue, showFeature } from './configuration'
import {
  FEATURE_HELMET_ENABLED, FEATURE_REDIS_ENABLED, FEATURE_TERMS_AND_CONDITIONS_ENABLED,
  HELMET,
  PROTOCOL, SERVICE_S2S_PATH,
  SERVICES_CCD_COMPONENT_API_PATH,
  SERVICES_CCD_DATA_STORE_API_PATH,
  SERVICES_DOCUMENTS_API_PATH,
  SERVICES_EM_ANNO_API_URL,
  SERVICES_IDAM_API_URL, SERVICES_IDAM_LOGIN_URL,
  SERVICES_TERMS_AND_CONDITIONS_URL,
  SESSION_SECRET,
} from './configuration/references'
import * as log4jui from './lib/log4jui'
import {JUILogger} from './lib/models'
import * as tunnel from './lib/tunnel'
import openRoutes from './openRoutes'
import {initProxy} from './proxy.config'
import routes from './routes'
import taskRouter from './workAllocation/routes'

export const app = express()

/**
 * Add Reform Standard health checks.
 */
// health.addReformHealthCheck(app)

if (showFeature(FEATURE_HELMET_ENABLED)) {
    app.use(helmet(getConfigValue(HELMET)))
}

app.use(cookieParser(getConfigValue(SESSION_SECRET)))

// TODO: remove tunnel and configurations
tunnel.init()

export const checkServiceHealth = service => healthcheck.web(`${service}/health`, {
  deadline: 6000,
  timeout: 6000,
})

const healthChecks = {
  checks: {
    ccdComponentApi: checkServiceHealth(getConfigValue(SERVICES_CCD_COMPONENT_API_PATH)),
    ccdDataApi: checkServiceHealth(getConfigValue(SERVICES_CCD_DATA_STORE_API_PATH)),
    documentsApi: checkServiceHealth(getConfigValue(SERVICES_DOCUMENTS_API_PATH)),
    emmoApi: checkServiceHealth(getConfigValue(SERVICES_EM_ANNO_API_URL)),
    idamApi: checkServiceHealth(getConfigValue(SERVICES_IDAM_LOGIN_URL)),
    idamWeb: checkServiceHealth(getConfigValue(SERVICES_IDAM_API_URL)),
    s2s: checkServiceHealth(getConfigValue(SERVICE_S2S_PATH)),
    // termsAndConditions: checkServiceHealth(getConfigValue(SERVICES_TERMS_AND_CONDITIONS_URL)),
  },
}

if (showFeature(FEATURE_TERMS_AND_CONDITIONS_ENABLED)) {
  healthChecks.checks = {...healthChecks.checks, ...{
    termsAndConditions: checkServiceHealth(getConfigValue(SERVICES_TERMS_AND_CONDITIONS_URL)),
  }}
}

if (showFeature(FEATURE_REDIS_ENABLED)) {
  healthChecks.checks = {...healthChecks.checks, ...{
    redis: healthcheck.raw(() => {
      return app.locals.redisClient.connected ? healthcheck.up() : healthcheck.down()
    }),
  }}
}

console.log('healthChecks', healthChecks)

healthcheck.addTo(app, healthChecks)

app.use(getXuiNodeMiddleware())

// applyProxy needs to be used before bodyParser
initProxy(app)

app.use(bodyParser.json({limit: '5mb'}))
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}))

// TODO: No dash?
// TODO: taskRouter should be called workAllocationRouter
app.use('/workallocation', taskRouter)
app.use('/external', openRoutes)
app.use('/api', routes)

// @ts-ignore
const logger: JUILogger = log4jui.getLogger('Application')
logger.info(`Started up using ${getConfigValue(PROTOCOL)}`)
