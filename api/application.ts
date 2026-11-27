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
  DYNATRACE_CDN,
  FEATURE_DYNATRACE_ENABLED,
  FEATURE_HELMET_ENABLED,
  FEATURE_COMPRESSION_ENABLED,
  HELMET,
  PROTOCOL,
  SESSION_SECRET,
} from './configuration/references';
import * as health from './health';
import * as log4jui from './lib/log4jui';
import { JUILogger } from './lib/models';
import { appInsights } from './lib/appInsights';
import * as tunnel from './lib/tunnel';
import csrf from '@dr.pogodin/csurf';
import openRoutes from './openRoutes';
import { initProxy } from './proxy.config';
import routes from './routes';
import workAllocationRouter from './workAllocation/routes';
import { idamCheck } from './idamCheck';
import { MC_CSP } from './interfaces/csp-config';
import { hearingsTelemetryCorrelation } from './lib/hearings-telemetry-correlation';
import { addNonceToExternalScripts } from './lib/csp-nonce';

const PERMISSIONS_POLICY = 'geolocation=(), camera=(), microphone=()';

function resolveStaticRoot(): string {
  const buildRoot = path.join(__dirname, '..');
  const browserRoot = path.join(buildRoot, 'browser');
  return existsSync(browserRoot) ? browserRoot : buildRoot;
}

function loadIndexHtml(staticRoot: string): string {
  // production build output
  let p = path.join(staticRoot, 'index.html');
  if (!existsSync(p)) {
    // running from sources - use the template inside src/
    p = path.join(__dirname, '..', 'src', 'index.html');
  }
  return readFileSync(p, 'utf8');
}

const staticRoot = resolveStaticRoot();
const indexHtmlRaw = loadIndexHtml(staticRoot);
const UP_PATH_REGEXP = /(?:^|[\\/])\.\.(?:[\\/]|$)/;

function escapeHtmlAttribute(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function getDynatraceCdn(): string | null {
  if (!showFeature(FEATURE_DYNATRACE_ENABLED)) {
    return null;
  }

  return getConfigValue<string>(DYNATRACE_CDN)?.trim() || null;
}

function injectTemplateValues(html: string, nonce: string): string {
  // The CSP middleware only creates res.locals.cspNonce when Helmet is enabled.
  // Use an empty value when Helmet is disabled so template markers are always
  // removed and never become the literal string "undefined" in the response.
  const cspNonce = nonce || '';
  const renderedHtml = html
    .replaceAll('{{dynatraceCdn}}', escapeHtmlAttribute(getDynatraceCdn() ?? ''))
    .replaceAll(/{{cspNonce}}/g, cspNonce);

  // Angular adds its generated bundle scripts during the production build, so
  // those tags are not present in src/index.html to receive a nonce marker.
  return addNonceToExternalScripts(renderedHtml, cspNonce);
}

/**
 * Returns true when express.static would resolve a request pathname to the
 * built application's root index.html file.
 *
 *  1. Decode the pathname with decodeURIComponent.
 *  2. Prefix it with `.${path.sep}` so an absolute URL path is treated as a
 *     path relative to the configured static root.
 *  3. Normalize repeated separators and `.`/`..` segments.
 *  4. Reject any `..` segment left after normalization, as `send` does before
 *     resolving a path beneath its static root.
 */
function resolvesToIndexHtml(requestPath: string): boolean {
  let decodedPath: string;
  try {
    decodedPath = decodeURIComponent(requestPath);
  } catch {
    // `send` also rejects malformed percent encoding rather than resolving it
    // to a file, so it must not be treated as an index alias here.
    return false;
  }

  // Null bytes are rejected by `send` and are not valid filesystem paths.
  if (decodedPath.includes('\0')) {
    return false;
  }

  const normalizedPath = path.normalize(`.${path.sep}${decodedPath}`);
  return !UP_PATH_REGEXP.test(normalizedPath) && normalizedPath === 'index.html';
}

export function registerFrontendRoutes(app: express.Express, frontendRoot: string, entryHtml: string): void {
  // Anything that resolves to the index.html file should be handled by the SPA renderer first
  app.use((req, res, next) => {
    if ((req.method !== 'GET' && req.method !== 'HEAD') || !resolvesToIndexHtml(req.path)) {
      return next();
    }

    const html = injectTemplateValues(entryHtml, res.locals.cspNonce as string);
    return res.type('html').set('Cache-Control', 'no-store, max-age=0').send(html);
  });

  app.use(express.static(frontendRoot, { index: false }));

  // Any route that did not map to a real asset is an Angular client-side route
  // and receives the same rendered entry page. This also covers `/`.
  app.use('/{*splat}', (req, res) => {
    const html = injectTemplateValues(entryHtml, res.locals.cspNonce as string);
    res.type('html').set('Cache-Control', 'no-store, max-age=0').send(html);
  });
}

export async function createApp() {
  const app = express();
  app.use(hearingsTelemetryCorrelation);
  app.use(appInsights);

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
    app.use(helmet({ crossOriginResourcePolicy: { policy: 'same-site' } }));
    app.use(helmet.hidePoweredBy());
    app.use(helmet.hsts({ maxAge: 28800000 }));
    const cspMiddleware = csp({
      defaultCsp: SECURITY_POLICY,
      ...MC_CSP,
    }) as unknown as express.RequestHandler;
    app.use(cspMiddleware);
    app.use((req, res, next) => {
      res.setHeader('X-Robots-Tag', 'noindex');
      res.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate, proxy-revalidate');
      res.setHeader('Permissions-Policy', PERMISSIONS_POLICY);
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

  const cookieParserMiddleware = cookieParser(getConfigValue(SESSION_SECRET)) as unknown as express.RequestHandler;
  app.use(cookieParserMiddleware);

  if (showFeature(FEATURE_COMPRESSION_ENABLED)) {
    app.use(compression());
  }

  // TODO: remove tunnel and configurations
  // EXUI-3967 - the above ask requires further investigation and testing on production environments
  tunnel.init();
  /**
   * Add Reform Standard health checks.
   */
  health.addReformHealthCheck(app);

  const xuiNodeMiddleware = await getXuiNodeMiddleware();
  app.use(xuiNodeMiddleware as unknown as express.RequestHandler);

  // applyProxy needs to be used before bodyParser
  initProxy(app);

  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

  app.use('/am', amRoutes);
  app.use('/api', routes);
  app.use('/external', openRoutes);
  app.use('/workallocation', workAllocationRouter);
  const csrfMiddleware = csrf({
    cookie: { key: 'XSRF-TOKEN', httpOnly: false, secure: true, path: '/' },
    ignoreMethods: ['GET'],
  }) as unknown as express.RequestHandler;
  app.use(csrfMiddleware);
  registerFrontendRoutes(app, staticRoot, indexHtmlRaw);

  logger.info(`Started up using ${getConfigValue(PROTOCOL)}`);

  new Promise(idamCheck).then(() => 'IDAM is up and running');

  return app;
}
