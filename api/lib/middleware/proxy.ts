import { legacyCreateProxyMiddleware as proxy, LegacyOptions, responseInterceptor } from 'http-proxy-middleware';
import { getConfigValue } from '../../configuration';
import { LOGGING } from '../../configuration/references';
import * as log4jui from '../log4jui';
import authInterceptor from './auth';

const logger = log4jui.getLogger('proxy');

export const onProxyError = (err, req, res) => {
  logger.error(err);

  if (req.baseUrl && req.baseUrl === '/activity' && req.user?.userinfo) {
    logger.info(
      'ActivityTrackerResponseFailed => ',
      `id: ${req.user.userinfo.id} forename:${req.user.userinfo.forename} surname:${req.user.userinfo.surname}`
    );
  }

  if (!res.headersSent) {
    res.status(500).send({
      error: 'Error when connecting to remote server',
      status: 504,
    });
  }
};

export const applyProxy = (app, config, modifyBody: boolean = true) => {
  const options: LegacyOptions = {
    changeOrigin: true,
    logLevel: getConfigValue(LOGGING),
    logProvider: () => {
      return {
        debug: (msg) => logger.debug(msg),
        error: (msg) => logger.error(msg),
        info: (msg) => logger.info(msg),
        log: (msg) => logger.info(msg),
        warn: (msg) => logger.warn(msg),
      };
    },
    onError: onProxyError,
    target: config.target,
  };

  if (config.onReq) {
    options.onProxyReq = config.onReq;
  }

  if (config.onRes) {
    if (modifyBody) {
      options.selfHandleResponse = true;
      options.onProxyRes = responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
        const rawBody = responseBuffer ? responseBuffer.toString('utf8') : '';
        let body: unknown = rawBody;

        if (rawBody) {
          try {
            body = JSON.parse(rawBody);
          } catch {
            body = rawBody;
          }
        }

        const updatedBody = await config.onRes(body, req, res, proxyRes);
        if (Buffer.isBuffer(updatedBody) || typeof updatedBody === 'string') {
          return updatedBody;
        }
        if (updatedBody === undefined || updatedBody === null) {
          return '';
        }
        return JSON.stringify(updatedBody);
      });
    } else {
      options.onProxyRes = (proxyRes, req, res) => {
        config.onRes(proxyRes, req, res);
      };
    }
  }

  if (config.ws) {
    options.ws = config.ws;
  }

  if (config.rewrite !== false) {
    if (typeof config.rewriteUrl === 'function') {
      options.pathRewrite = config.rewriteUrl;
    } else {
      options.pathRewrite = {
        [`^${config.source}`]: config.rewriteUrl || '',
      };
    }
  }

  let middlewares = config.skipAuth ? [] : [authInterceptor];

  if (config.middlewares) {
    middlewares = [...middlewares, ...config.middlewares];
  }

  if (config.filter) {
    app.use(config.source, middlewares, proxy(config.filter, options));
  } else {
    app.use(config.source, middlewares, proxy(options));
  }
};
