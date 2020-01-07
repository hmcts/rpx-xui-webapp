import * as healthcheck from '@hmcts/nodejs-healthcheck'
import axios from 'axios'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as session from 'express-session'
import * as globalTunnel from 'global-tunnel-ng'
import {Issuer, Strategy, TokenSet, UserinfoResponse} from 'openid-client'
import * as passport from 'passport'
import * as process from "process"
import * as sessionFileStore from 'session-file-store'
import {userHasAppAccess} from './auth/manageCasesUserRoleAuth'
import * as auth from './auth'
import {config} from './config'
import {router as documentRouter} from './documents/routes'
import {router as emAnnoRouter} from './emAnno/routes'
import healthCheck from './healthCheck'
import {errorStack} from './lib/errorStack'
import * as log4jui from './lib/log4jui'
import authInterceptor from './lib/middleware/auth'
import {JUILogger} from './lib/models'
import {propsExist} from './lib/objectUtilities'
import * as postCodeLookup from './postCodeLookup'
import {router as printRouter} from './print/routes'
import routes from './routes'
import userDetailsRouter from './user'

config.environment = process.env.XUI_ENV || 'local'

export const app = express()
app.disable('x-powered-by')

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
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    // console.log('serialiseUser', user)
    done(null, user)
})

passport.deserializeUser((id, done) => {
    // console.log('deserializeUser', id)
    done(null, {})
})

const cookieToken = config.cookies.token
const cookieUserId = config.cookies.userId
const idamURl = config.services.idam.idamApiUrl

// @ts-ignore
const clientMetadata = {
    client_id: config.idamClient,
    client_secret: process.env.IDAM_SECRET,
    post_logout_redirect_uris: ['http://localhost:3000'],
    redirect_uris: ['http://localhost:3000/oauth2/callback'],
    response_types: ['code'],
    token_endpoint_auth_method: 'client_secret_post', // The default is 'client_secret_basic'.
};

(async () => {
    const issuer = await Issuer.discover(`${idamURl}/o`)

    const metadata = issuer.metadata
    metadata.issuer = 'https://forgerock-am.service.core-compute-idam-aat.internal:8443/openam/oauth2/hmcts'

    const newIssuer = new Issuer(metadata)

    // @ts-ignore
    app.locals.client = new newIssuer.Client(clientMetadata)

    passport.use('oidc', new Strategy({
        client: app.locals.client,
        params: { scope: 'profile openid roles manage-user create-user' },
    }, auth.oidcVerify))

    // passport.use('s2s', new BearerStrategy())
})()

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

app.get('/auth/login', passport.authenticate('oidc'))

app.get('/oauth2/callback', passport.authenticate('oidc', {
    failureRedirect: '/auth/login'
}), (req: any, res: any) => {
    // console.log('callback', req.session)

    // we need extra logic before success redirect
    const userDetails = req.session.passport.user
    const roles = userDetails.userinfo.roles

    axios.defaults.headers.common.Authorization = `Bearer ${userDetails.tokenset.access_token}`
    axios.defaults.headers.common['user-roles'] = roles.join()

    res.cookie(cookieUserId, userDetails.userinfo.uid)
    res.cookie(cookieToken, userDetails.tokenset.access_token)
    res.cookie('roles', roles)

    // need this so angular knows which enviroment config to use ...
    res.cookie('platform', config.environment)

    res.redirect('/')
})

app.get('/auth/logout', (req: any, res: any) => {
    req.query.redirect = '/auth/login'
    auth.doLogout(req, res)
})

app.get('/api/logout', (req: any, res: any) => {
    auth.doLogout(req, res)
})

app.get('/api/addresses', postCodeLookup.doLookup)

app.get('/api/monitoring-tools', (req, res) => {
    res.send({key: config.appInsightsInstrumentationKey})
})

app.use('/api/user', userDetailsRouter)
app.use('/api/healthCheck', healthCheck)

app.use('/aggregated', routes)
app.use('/data', routes)
// separate route for document upload/view
app.use('/documents', documentRouter)
app.use('/em-anno', emAnnoRouter)

app.use('/print', printRouter)

// @ts-ignore
const logger: JUILogger = log4jui.getLogger('Application')
logger.info(`Started up on ${config.environment || 'local'} using ${config.protocol}`)
