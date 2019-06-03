import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as session from 'express-session'
import * as globalTunnel from 'global-tunnel-ng'
import * as sessionFileStore from 'session-file-store'
import * as auth from './auth'
import { config } from './config'
import { errorStack } from './lib/errorStack'
import * as log4jui from './lib/log4jui'
import routes from './routes'

config.environment = process.env.JUI_ENV || 'local'

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
        name: 'jui-webapp',
        resave: true,
        saveUninitialized: true,
        secret: config.sessionSecret,
        store: new FileStore({
            path: process.env.NOW ? '/tmp/sessions' : '.sessions',
        }),
    })
)

app.use(errorStack)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use((req, res, next) => {
    // Set cookie for angular to know which config to use
    const platform = process.env.JUI_ENV || 'local'
    res.cookie('platform', platform)
    next()
}
)

if (config.proxy) {
    globalTunnel.initialize({
        host: config.proxy.host,
        port: config.proxy.port,
    })
}

app.get('/oauth2/callback', auth.authenticateUser)
app.use('/data', routes)

const logger = log4jui.getLogger('Application')
logger.info(`Started up on ${config.environment || 'local'} using ${config.protocol}`)
