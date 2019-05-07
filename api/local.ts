import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as session from 'express-session'
import * as globalTunnel from 'global-tunnel-ng'
import * as log4js from 'log4js'
import * as sessionFileStore from 'session-file-store'
import * as auth from './auth'
import { config } from './config'
import { errorStack } from './lib/errorStack'
import routes from './routes'

const FileStore = sessionFileStore(session)

const app = express()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

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

if (config.proxy) {
    globalTunnel.initialize({
        host: config.proxy.host,
        port: config.proxy.port,
    })
}

app.use(errorStack)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/oauth2/callback', auth.oauth)

app.use(auth.attach)

app.use('/api', routes)

const port = process.env.PORT || 3001
app.listen(port)

const logger = log4js.getLogger('server')
logger.level = config.logging ? config.logging : 'OFF'

logger.info(`Local server up at ${port}`)
