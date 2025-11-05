import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';
import * as log4jui from '../log4jui';
import authInterceptor from './auth';

const logger = log4jui.getLogger('proxy');

export const onProxyError = (err, req, res) => {
  logger.error(err);

  if (req.baseUrl && req.baseUrl === '/activity' && req.user && req.user.userinfo) {
    logger.info('ActivityTrackerResponseFailed => ',
      `id: ${req.user.userinfo.id} forename:${req.user.userinfo.forename} surname:${req.user.userinfo.surname}`
    );
  }

  if (!res.headersSent) {
    res.status(500).send({
      error: 'Error when connecting to remote server',
      status: 504
    });
  }
};

export interface ProxyConfig {
  source: string | string[];
  target: string;
  rewrite?: boolean;
  rewriteUrl?: string | ((path: string, req: any) => string);
  filter?: string | string[];
  middlewares?: any[];
  onReq?: (proxyReq: any, req: any, res: any) => void;
  onRes?: (responseBody: string | any, req: any, res: any) => any;
  ws?: boolean;
}

function buildPathRewrite(config: ProxyConfig) {
  const sources = Array.isArray(config.source) ? config.source : [config.source];
  if (config.rewrite === false) {
    return (path: string, req: any) => {
      if (path.startsWith('/?')){
        path = path.replace('/', '');
      }
      const prefix = req.baseUrl || sources[0] || '';
      return (path === '/' || path === '') ? prefix : prefix + path;
    };
  }
  if (typeof config.rewriteUrl === 'function') {
    return config.rewriteUrl;
  }
  const buildMapping = (replacement: string) => {
    const mapping: Record<string, string> = {};
    sources.forEach((src) => {
      mapping[`^${src}`] = replacement;
    });
    return mapping;
  };
  if (config.rewriteUrl !== undefined) {
    console.log('buildMapping called with: ' + (config.rewriteUrl as string));
    return buildMapping((config.rewriteUrl as string) || '');
  }
  if (config.rewrite === undefined || config.rewrite === true) {
    console.log('buildMapping called with: ' + '');
    return buildMapping('');
  }
  return undefined;
}

export const applyProxy = (app: any, config: ProxyConfig, modifyBody: boolean = true) => {
  logger.info(config);
  const pathRewrite = buildPathRewrite(config);

  const hasCustomHandlers = !!config.onRes || !!config.onReq;

  const isDocumentsSource = (Array.isArray(config.source) ? config.source : [config.source])
    .some((src) => src === '/documents' || src.startsWith('/documents'));

  const proxyMiddleware = createProxyMiddleware({
    target: config.target,
    changeOrigin: true,
    logger,
    selfHandleResponse: hasCustomHandlers && !isDocumentsSource,
    pathFilter: config.filter,
    ws: config.ws ? true : false,
    ...(pathRewrite && { pathRewrite }),
    on: {
      proxyReq: (proxyReq, req, res) => {
        if (config.onReq){
          config.onReq(proxyReq, req, res);
        }
      },
      proxyRes: (proxyRes, req, res) => {
        if (isDocumentsSource) {
          if (config.onRes) {
            config.onRes('', req, res);
          }
          return proxyRes;
        }
        if (!(config.onRes && modifyBody)) {
          if (config.onRes) {
            config.onRes('', req, res);
          }
          return proxyRes;
        }
        return responseInterceptor(async (responseBuffer) => {
          const response = responseBuffer ? responseBuffer.toString('utf8') : '';
          const result = config.onRes!(response, req, res);
          if (typeof result === 'object' && result !== null && !Buffer.isBuffer(result)) {
            return JSON.stringify(result);
          }
          return result;
        })(proxyRes, req, res);
      },
      error: (err, req, res) => onProxyError(err, req, res)
    }
  });

  const middlewares = [authInterceptor, ...(config.middlewares || [])];
  app.use(config.source, middlewares, proxyMiddleware);
};

