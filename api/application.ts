import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as helmet from 'helmet'
import { getXuiNodeMiddleware } from './auth'
import { getConfigValue, showFeature } from './configuration'
import {
  FEATURE_HELMET_ENABLED,
  HELMET,
  PROTOCOL,
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

if (showFeature(FEATURE_HELMET_ENABLED)) {
  app.use(helmet(getConfigValue(HELMET)))
  app.use(helmet.contentSecurityPolicy({
    directives: {
      connectSrc: ['\'self\''],
      defaultSrc: ['\'self\''],
      fontSrc: ['\'self\' data:'],
      frameSrc: [
        '\'self\'',
        'vcc-eu4.8x8.com',
        'vcc-eu4b.8x8.com',
      ],
      imgSrc: [
        '\'self\'',
        'www.google-analytics.com',
        'hmctspiwik.useconnect.co.uk',
        'vcc-eu4.8x8.com',
        'vcc-eu4b.8x8.com',
      ],
      mediaSrc: ['\'self\''],
      scriptSrc: [
        '\'self\'',
        '\'unsafe-inline\'',
        'www.google-analytics.com',
        'hmctspiwik.useconnect.co.uk',
        'vcc-eu4.8x8.com',
        'vcc-eu4b.8x8.com',
      ],
    },
  }))
  // app.use(helmet.xframe());
  // app.use(helmet.xframe('sameorigin')) // SAMEORIGIN
  app.use(helmet.noSniff())
  app.use(helmet.frameguard({ action: 'deny' }))
  app.use(helmet.referrerPolicy({ policy: 'origin' }))
  app.use(helmet.hidePoweredBy())
  app.use((req, res, next) => {
    res.setHeader('X-Robots-Tag', 'noindex')
    res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store')
    next()
  })
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain')
    res.send('User-agent: *\nDisallow: /')
  })
  app.disable('x-powered-by')
  app.disable('X-Powered-By')
}

app.use(cookieParser(getConfigValue(SESSION_SECRET)))

// TODO: remove tunnel and configurations
tunnel.init()
/**
 * Add Reform Standard health checks.
 */
health.addReformHealthCheck(app)

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
