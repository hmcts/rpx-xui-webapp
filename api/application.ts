import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as helmet from 'helmet'
// import {router as termsAndCRoutes} from './termsAndConditions/routes'
// import {router as userTandCRoutes} from './userTermsAndConditions/routes'
import {getXuiNodeMiddleware} from './auth'
import { getConfigValue, showFeature } from './configuration'
import {
    APP_INSIGHTS_KEY,
    FEATURE_HELMET_ENABLED,
    HELMET,
    PROTOCOL,
    SERVICES_CCD_COMPONENT_API_PATH,
    SERVICES_DOCUMENTS_API_PATH, SESSION_SECRET,
} from './configuration/references'
import {router as emAnnoRouter} from './emAnno/routes'
import * as health from './health'
import healthCheck from './healthCheck'
import * as log4jui from './lib/log4jui'
import authInterceptor from './lib/middleware/auth'
import {applyProxy} from './lib/middleware/proxy'
import {JUILogger} from './lib/models'
import * as tunnel from './lib/tunnel'
import openRoutes from './openRoutes'
import {router as paymentsRouter} from './payments/routes'
import * as postCodeLookup from './postCodeLookup'
import routes from './routes'
// import {router as termsAndCRoutes} from './termsAndConditions/routes'
import userRouter from './user/routes'
// import {router as userTandCRoutes} from './userTermsAndConditions/routes'

export const app = express()
if (showFeature(FEATURE_HELMET_ENABLED)) {
    app.use(helmet(getConfigValue(HELMET)))
}

// app.use(errorStack)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser(getConfigValue(SESSION_SECRET)))

app.use(getXuiNodeMiddleware())
tunnel.init()

/**
 * Add Reform Standard health checks.
 */
health.addReformHealthCheck(app)

app.use('/external', openRoutes)

app.get('/api/addresses', authInterceptor, postCodeLookup.doLookup)

app.get('/api/monitoring-tools', (req, res) => {
    res.send({key: getConfigValue(APP_INSIGHTS_KEY)})
})

app.use('/api/healthCheck', healthCheck)
app.use('/api/user', userRouter)

/*if (showFeature(FEATURE_TERMS_AND_CONDITIONS_ENABLED)) {
    app.use('/api/userTermsAndConditions', userTandCRoutes)
    app.use('/api/termsAndConditions', termsAndCRoutes)
}*/

app.get('/api/configuration', (req, res) => {
    res.send(showFeature(req.query.configurationKey as string))
})

// TODO: move these to proxy routes as well
app.use('/aggregated', routes)
app.use('/data', routes)

applyProxy(app, {
    rewrite: false,
    source: '/documents',
    target: getConfigValue(SERVICES_DOCUMENTS_API_PATH),
})

applyProxy(app, {
    rewrite: false,
    source: '/print',
    target: getConfigValue(SERVICES_CCD_COMPONENT_API_PATH),
})

// TODO: works when getting annotation-set but not when creating one?
/*applyProxy(app, {
    rewrite: true,
    rewriteUrl: '/api',
    source: '/em-anno',
    target: getConfigValue(SERVICES_EM_ANNO_API_URL),
})*/

// TODO: move to proxy route as above
app.use('/em-anno', emAnnoRouter)

app.use('/payments', paymentsRouter)

// @ts-ignore
const logger: JUILogger = log4jui.getLogger('Application')
logger.info(`Started up using ${getConfigValue(PROTOCOL)}`)
