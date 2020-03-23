import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as session from 'express-session'
import * as helmet from 'helmet'
import * as auth from './auth'
import { getConfigValue, showFeature } from './configuration'
import {
    APP_INSIGHTS_KEY,
    COOKIES_TOKEN,
    COOKIES_USER_ID,
    FEATURE_APP_INSIGHTS_ENABLED,
    FEATURE_HELMET_ENABLED,
    FEATURE_PROXY_ENABLED,
    FEATURE_SECURE_COOKIE_ENABLED,
    FEATURE_TERMS_AND_CONDITIONS_ENABLED,
    HELMET,
    JURISDICTIONS,
    MAX_LOG_LINE,
    MICROSERVICE,
    NOW,
    PROTOCOL,
    REDIS_ACCESS_KEY,
    REDIS_CLOUD_URL,
    REDIS_KEY_PREFIX,
    REDIS_PORT,
    REDIS_SSL_ENABLED,
    REDIS_TTL,
    SERVICE_S2S_PATH,
    SERVICES_DOCUMENTS_API_PATH,
    SERVICES_EM_ANNO_API_URL,
    SERVICES_IDAM_API_URL,
    SERVICES_IDAM_CLIENT_ID,
    SERVICES_IDAM_LOGIN_URL,
    SERVICES_IDAM_OAUTH_CALLBACK_URL,
    SERVICES_TERMS_AND_CONDITIONS_URL,
    SESSION_SECRET,
} from './configuration/references'
import {router as documentRouter} from './documents/routes'
import {router as emAnnoRouter} from './emAnno/routes'
import healthCheck from './healthCheck'
import {errorStack} from './lib/errorStack'
import * as log4jui from './lib/log4jui'
import authInterceptor from './lib/middleware/auth'
import {JUILogger} from './lib/models'
import { getStore } from './lib/sessionStore'
import * as tunnel from './lib/tunnel'
import * as postCodeLookup from './postCodeLookup'
import {router as printRouter} from './print/routes'
import routes from './routes'
import {router as termsAndCRoutes} from './termsAndConditions/routes'
import {router as userTandCRoutes} from './userTermsAndConditions/routes'

export const app = express()
if (showFeature(FEATURE_HELMET_ENABLED)) {
    console.log('Helmet enabled')
    app.use(helmet(getConfigValue(HELMET)))
}

app.set('trust proxy', 1)
app.use(
    session({
        cookie: {
            httpOnly: true,
            maxAge: 1800000,
            secure: showFeature(FEATURE_SECURE_COOKIE_ENABLED),
        },
        name: 'xui-webapp', // keep as string
        resave: true,
        saveUninitialized: true,
        secret: getConfigValue(SESSION_SECRET),
        // TODO: remove this and use values from cookie token instead
        store: getStore(),
    })
)

app.use(cookieParser())

app.use(errorStack)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

tunnel.init()

app.get('/oauth2/callback', auth.authenticateUser)
app.get('/api/logout', (req, res) => {
    auth.doLogout(req, res)
})

app.get('/api/addresses', authInterceptor, postCodeLookup.doLookup)

app.get('/api/monitoring-tools', (req, res) => {
    res.send({key: getConfigValue(APP_INSIGHTS_KEY)})
})

app.use('/api/healthCheck', healthCheck)

app.use('/aggregated', routes)
app.use('/data', routes)
app.use('/api/userTermsAndConditions', userTandCRoutes)
app.use('/api/termsAndConditions', termsAndCRoutes)
app.get('/api/configuration', (req, res) => {
    res.send(showFeature(req.query.configurationKey))
})
app.get('/health', (req, res) => {
    res.status(200).send({
        allowConfigMutations: process.env.ALLOW_CONFIG_MUTATIONS,
        nodeConfigEnv: process.env.NODE_CONFIG_ENV,
        // 1st set
        // tslint:disable-next-line:object-literal-sort-keys
        idamClient: getConfigValue(SERVICES_IDAM_CLIENT_ID),
        maxLogLine: getConfigValue(MAX_LOG_LINE),
        microService: getConfigValue(MICROSERVICE),
        now: getConfigValue(NOW),
        // 2nd set
        cookieToken: getConfigValue(COOKIES_TOKEN),
        cookieUserId: getConfigValue(COOKIES_USER_ID),
        oauthCallBack: getConfigValue(SERVICES_IDAM_OAUTH_CALLBACK_URL),
        protocol: getConfigValue(PROTOCOL),
        // 3rd set
        idamApiPath: getConfigValue(SERVICES_IDAM_API_URL),
        idamWeb: getConfigValue(SERVICES_IDAM_LOGIN_URL),
        s2sPath: getConfigValue(SERVICE_S2S_PATH),
        emAnnoApi: getConfigValue(SERVICES_EM_ANNO_API_URL),
        documentsApi: getConfigValue(SERVICES_DOCUMENTS_API_PATH),
        termsAndConditionsApi: getConfigValue(SERVICES_TERMS_AND_CONDITIONS_URL),
        // 4th set
        sessionSecret: getConfigValue(SESSION_SECRET),
        jurisdictions: getConfigValue(JURISDICTIONS),
        // 5th set
        featureSecureCookieEnabled: showFeature(FEATURE_SECURE_COOKIE_ENABLED),
        featureAppInsightEnabled: showFeature(FEATURE_APP_INSIGHTS_ENABLED),
        featureProxyEnabled: showFeature(FEATURE_PROXY_ENABLED),
        featureTermsAndConditionsEnabled: showFeature(FEATURE_TERMS_AND_CONDITIONS_ENABLED),
        // 6th set
        redisPort: getConfigValue(REDIS_PORT), // works
        redisSslEnabled: getConfigValue(REDIS_SSL_ENABLED), // works
        redisKeyPrefix: getConfigValue(REDIS_KEY_PREFIX), // works
        redisTtl: getConfigValue(REDIS_TTL), // works
        redisCloudUrl: getConfigValue(REDIS_CLOUD_URL), // check if works
        redisAccessKey: getConfigValue(REDIS_ACCESS_KEY), // works and returns access key
    })
})
// separate route for document upload/view
app.use('/documents', documentRouter)
app.use('/em-anno', emAnnoRouter)

app.use('/print', printRouter)

// @ts-ignore
const logger: JUILogger = log4jui.getLogger('Application')
logger.info(`Started up using ${getConfigValue(PROTOCOL)}`)
