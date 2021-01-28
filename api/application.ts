import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as helmet from 'helmet'
import { getXuiNodeMiddleware } from './auth'
import { getConfigValue, showFeature } from './configuration'
import {
    FEATURE_HELMET_ENABLED,
    HELMET, PROTOCOL,
    SESSION_SECRET,
} from './configuration/references'
import * as health from './health'
import * as log4jui from './lib/log4jui'
import { JUILogger } from './lib/models'
import * as tunnel from './lib/tunnel'
import openRoutes from './openRoutes'
import { initProxy } from './proxy.config'
import routes from './routes'
import taskRouter from './workAllocation/routes'

export const app = express()

/**
 * Add Reform Standard health checks.
 */
health.addReformHealthCheck(app)

if (showFeature(FEATURE_HELMET_ENABLED)) {
    app.use(helmet(getConfigValue(HELMET)))
}

app.use(cookieParser(getConfigValue(SESSION_SECRET)))

// TODO: remove tunnel and configurations
tunnel.init()
app.use(getXuiNodeMiddleware())

// applyProxy needs to be used before bodyParser
initProxy(app)

app.use(bodyParser.json({ limit: '5mb' }))
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))

// TODO: No dash?
// TODO: taskRouter should be called workAllocationRouter
app.use('/workallocation', taskRouter)
app.use('/external', openRoutes)
app.use('/api', routes)

// @ts-ignore
const logger: JUILogger = log4jui.getLogger('Application')
logger.info(`Started up using ${getConfigValue(PROTOCOL)}`)
