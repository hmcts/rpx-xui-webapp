import * as healthcheck from '@hmcts/nodejs-healthcheck'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as session from 'express-session'
import * as globalTunnel from 'global-tunnel-ng'
import * as sessionFileStore from 'session-file-store'
import * as amendedJurisdictions from './amendedJurisdictions'
import * as auth from './auth'
import {config} from './config'
import {router as documentRouter} from './documents/routes'
import healthCheck from './healthCheck'
import {errorStack} from './lib/errorStack'
import * as log4jui from './lib/log4jui'
import authInterceptor from './lib/middleware/auth'
import serviceTokenMiddleware from './lib/middleware/serviceToken'
import {JUILogger} from './lib/models'
import * as postCodeLookup from './postCodeLookup'
import {router as printRouter} from './print/routes'
import routes from './routes'

config.environment = process.env.XUI_ENV || 'local'

export const app = express()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const FileStore = sessionFileStore(session)

app.set('trust proxy', 1)

app.use(
    session({
        cookie: {
            httpOnly: true,
            maxAge: 1800000,
            secure: config.secureCookie !== false,
        },
        name: 'xui-webapp', // keep as string
        resave: true,
        saveUninitialized: true,
        secret: config.sessionSecret,
        // TODO: remove this and use values from cookie token instead
        store: new FileStore({
            path: process.env.NOW ? '/tmp/sessions' : '.sessions',
        }),
    })
)

app.use(cookieParser())

app.use(errorStack)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// TODO: remove this when we have proper frontend configuration
app.use((req, res, next) => {
    // Set cookie for angular to know which config to use
    const platform = process.env.XUI_ENV || 'local'
    res.cookie('platform', platform)
    next()
})

if (config.proxy) {
    globalTunnel.initialize({
        host: config.proxy.host,
        port: config.proxy.port,
    })
}

function healthcheckConfig(msUrl) {
    return healthcheck.web(`${msUrl}/health`, {
        deadline: 6000,
        timeout: 6000,
    })
}

const healthchecks = {
    checks: {
        ccdDataApi: healthcheckConfig(config.services.ccd.dataApi),
        ccdDefApi: healthcheckConfig(config.services.ccd.componentApi),
        dmStoreApi: healthcheckConfig(config.services.documents.api),
        idamApi: healthcheckConfig(config.services.idam.idamApiUrl),
        s2s: healthcheckConfig(config.services.s2s),
    },
}

healthcheck.addTo(app, healthchecks)

app.get('/oauth2/callback', auth.authenticateUser)
app.get('/api/logout', (req, res) => {
    auth.doLogout(req, res)
})

app.use(serviceTokenMiddleware)

app.get('/api/addresses', postCodeLookup.doLookup)

app.get('/api/monitoring-tools', (req, res) => {
    res.send({key: config.appInsightsInstrumentationKey})
})

app.use('/api/healthCheck', healthCheck)

app.get('/aggregated/caseworkers/:uid/jurisdictions', amendedJurisdictions.getJurisdictions)
app.use('/aggregated', routes)
app.use('/data', routes)
// separate route for document upload/view
app.use('/documents', documentRouter)

app.use('/print', printRouter)

// @ts-ignore
const logger: JUILogger = log4jui.getLogger('Application')
logger.info(`Started up on ${config.environment || 'local'} using ${config.protocol}`)
