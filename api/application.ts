import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { existsSync, readFileSync } from 'fs';
import helmet from 'helmet';
import * as path from 'path';
import { csp, SECURITY_POLICY } from '@hmcts/rpx-xui-node-lib';
import amRoutes from './accessManagement/routes';
import { getXuiNodeMiddleware } from './auth';
import { getConfigValue, showFeature } from './configuration';
import {
  FEATURE_HELMET_ENABLED,
  FEATURE_COMPRESSION_ENABLED,
  HELMET,
  PROTOCOL,
  SESSION_SECRET
} from './configuration/references';
import * as health from './health';
import * as log4jui from './lib/log4jui';
import { JUILogger } from './lib/models';
import * as tunnel from './lib/tunnel';
import csrf from '@dr.pogodin/csurf';
import openRoutes from './openRoutes';
import { initProxy } from './proxy.config';
import routes from './routes';
import workAllocationRouter from './workAllocation/routes';
import { idamCheck } from './idamCheck';
import { MC_CSP } from './interfaces/csp-config';
import { getNewUsersByServiceName } from './workAllocation';

function loadIndexHtml(): string {
  // production build output
  let p = path.join(__dirname, '..', 'index.html');
  if (!existsSync(p)) {
    // running from sources - use the template inside src/
    p = path.join(__dirname, '..', 'src', 'index.html');
  }
  return readFileSync(p, 'utf8');
}
const indexHtmlRaw = loadIndexHtml();

function injectNonce(html: string, nonce: string): string {
  return html.replace(/{{cspNonce}}/g, nonce);
}

export async function createApp() {
  const app = express();

  const logger: JUILogger = log4jui.getLogger('Application');
  if (showFeature(FEATURE_HELMET_ENABLED)) {
    const helmetConfig = getConfigValue(HELMET);
    if (helmetConfig && typeof helmetConfig === 'object') {
      app.use(helmet(helmetConfig)); // use the configured rules
    } else {
      app.use(helmet()); // fall back to Helmet defaults
    }
    app.use(helmet.noSniff());
    app.use(helmet.frameguard({ action: 'deny' }));
    app.use(helmet.referrerPolicy({ policy: ['origin'] }));
    app.use(helmet.hidePoweredBy());
    app.use(helmet.hsts({ maxAge: 28800000 }));
    app.use(helmet.xssFilter());
    app.use(helmet.contentSecurityPolicy({
      directives: {
        connectSrc: [
          '\'self\' blob: data:',
          '*.gov.uk',
          'dc.services.visualstudio.com',
          '*.launchdarkly.com',
          'www.google-analytics.com',
          '*.hmcts.net',
          'ws:',
          'wss:'
        ],
        defaultSrc: ['\'self\''],
        fontSrc: ['\'self\'', 'https://fonts.gstatic.com', 'data:'],
        formAction: ['\'none\''],
        frameAncestors: ['\'self\''],
        frameSrc: ['\'self\''],
        imgSrc: [
          '\'self\'',
          'data:',
          'https://www.google-analytics.com',
          'https://www.googletagmanager.com',
          'https://raw.githubusercontent.com/hmcts/',
          'http://stats.g.doubleclick.net/',
          'http://ssl.gstatic.com/',
          'http://www.gstatic.com/',
          'https://fonts.gstatic.com'
        ],
        mediaSrc: ['\'self\''],
        scriptSrc: [
          '\'self\'',
          '\'unsafe-inline\'',
          '\'unsafe-eval\'',
          'www.google-analytics.com',
          'www.googletagmanager.com',
          'az416426.vo.msecnd.net'
        ],
        styleSrc: [
          '\'self\'',
          '\'unsafe-inline\'',
          'https://fonts.googleapis.com',
          'https://fonts.gstatic.com',
          'http://tagmanager.google.com/'
        ]
      }
    }));
    app.use((req, res, next) => {
      res.setHeader('X-Robots-Tag', 'noindex');
      res.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate, proxy-revalidate');
      next();
    });
    app.get('/robots.txt', (req, res) => {
      res.type('text/plain');
      res.send('User-agent: *\nDisallow: /');
    });
    app.get('/sitemap.xml', (req, res) => {
      res.type('text/xml');
      res.send('User-agent: *\nDisallow: /');
    });
    app.disable('x-powered-by');
    app.disable('X-Powered-By');
  }
  if (showFeature(FEATURE_HELMET_ENABLED)) {
    app.use(helmet(getConfigValue(HELMET)));
    app.use(helmet.noSniff());
    app.use(helmet.frameguard({ action: 'deny' }));
    app.use(helmet.referrerPolicy({ policy: ['origin'] }));
    app.use(helmet({ crossOriginResourcePolicy: { policy: 'same-site' } }));
    app.use(helmet.hidePoweredBy());
    app.use(helmet.hsts({ maxAge: 28800000 }));
    app.use(
      csp({
        defaultCsp: SECURITY_POLICY,
        ...MC_CSP
      })
    );
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('X-Robots-Tag', 'noindex');
      res.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate, proxy-revalidate');
      next();
    });
    app.get('/robots.txt', (req, res) => {
      res.type('text/plain');
      res.send('User-agent: *\nDisallow: /');
    });
    app.get('/sitemap.xml', (req, res) => {
      res.type('text/xml');
      res.send('User-agent: *\nDisallow: /');
    });
    app.disable('x-powered-by');
    app.disable('X-Powered-By');
  }

  app.use(cookieParser(getConfigValue(SESSION_SECRET)));

  if (showFeature(FEATURE_COMPRESSION_ENABLED)) {
    app.use(compression());
  }

  // TODO: remove tunnel and configurations
  tunnel.init();
  /**
 * Add Reform Standard health checks.
 */
  health.addReformHealthCheck(app);

  const xuiNodeMiddleware = await getXuiNodeMiddleware();
  app.use(xuiNodeMiddleware);

  // applyProxy needs to be used before bodyParser
  initProxy(app);

  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

  app.use('/am', amRoutes);
  app.use('/api', routes);
  app.use('/external', openRoutes);
  app.use('/workallocation', workAllocationRouter);
  app.use(csrf({ cookie: { key: 'XSRF-TOKEN', httpOnly: false, secure: true, path: '/' }, ignoreMethods: ['GET'] }));
  // Serve /index.html through the same nonce injector
  // This is to ensure that <MC URL>/index.html works with CSP
  app.get('/index.html', (req, res) => {
    const html = injectNonce(indexHtmlRaw, res.locals.cspNonce as string);
    res
      .type('html')
      .set('Cache-Control', 'no-store, max-age=0')
      .send(html);
  });
  const staticRoot = path.join(__dirname, '..');
  // runs for every incoming request in the order middleware are declared
  app.use(
    express.static(staticRoot, { index: false })
  );
  // Catch-all handler for every URL that the static middleware didn’t serve
  app.use('/*', (req, res) => {
    const html = injectNonce(indexHtmlRaw, res.locals.cspNonce as string);
    res.type('html').set('Cache-Control', 'no-store, max-age=0').send(html);
  });

  logger.info(`Started up using ${getConfigValue(PROTOCOL)}`);

  new Promise(idamCheck).then(() => 'IDAM is up and running');
  // EUI-2028 - Get the caseworkers, ideally prior to a user logging into application
  new Promise(getNewUsersByServiceName).then(() => 'Caseworkers have been loaded');

  return app;
}

