import {Application} from 'express'
import {Request, Response} from "express"
import {ProxyAgentConfigurationType} from 'global-agent'
import {ClientRequest, IncomingMessage} from 'http'
import {createProxyMiddleware, Options} from 'http-proxy-middleware'
import {getConfigValue} from '../../configuration'
import {SERVICES_DOCUMENTS_API_PATH} from '../../configuration/references'
import * as log4jui from '../log4jui'
import authInterceptor from '../middleware/auth'
import {JUILogger} from '../models'

const logger: JUILogger = log4jui.getLogger('HttpProxy')
const docUrl: string = getConfigValue(SERVICES_DOCUMENTS_API_PATH)
// const annoUrl: string = getConfigValue(SERVICES_EM_ANNO_API_URL)
// const SERVICE_AUTHORIZATION_HEADER: string = 'serviceauthorization'

const applyProxy = (app, config) => {
  const options = {
    changeOrigin: true,
    logLevel: 'debug',
    logProvider: ()  => {
      return {
        debug: msg => logger.debug(msg),
        error: msg => logger.error(msg),
        info: msg => logger.info(msg),
        log: msg => logger.info(msg),
        warn: msg => logger.warn(msg),
      }
    },
    onError: function onError(err, req, res) {
      console.error(err)
      res.status(500)
      res.json({
        error: 'Error when connecting to remote server',
        status: 504,
      })
    },
    onProxyReq: (req: ClientRequest) => {
      req.setHeader("Accept-Ranges", "bytes")
      console.debug('REQUEST HEADERS =====>>', req.getHeaders())
      /*req.setHeader("user-roles", "caseworker")
      req.setHeader("ServiceAuthorization", this.serviceAuthRepository.getToken())*/
    },
    onProxyRes: (proxyRes: IncomingMessage, req: Request, res: Response) => {
      console.debug('response ->:', proxyRes.pipe(res))
      // res.set(proxyRes.headers)
      /*req.setHeader("user-roles", "caseworker")
      req.setHeader("ServiceAuthorization", this.serviceAuthRepository.getToken())*/
    },
    target: config.target,
  }

  app.use(config.source, async (req, res, next) => {
    await authInterceptor(req, res, next)
    next()
  }, createProxyMiddleware(options as Options))
}

// Set up the proxy for the doc store
export function createDocStoreProxy(app: Application, tunnelAgent: ProxyAgentConfigurationType) {

  applyProxy(app, {
    source: '/documents',
    target: docUrl,
  })

  /*logger.debug('setting up reverse proxy with agent-proxy ', tunnelAgent.HTTP_PROXY)
  const onProxyReq = (proxyReq, req, res) => {
    logger.debug('Proxying request ', req.method, req.url, '->', proxyReq.path)
    const s2s = req.headers.serviceauthorization
    const s2sOut = proxyReq.getHeader(SERVICE_AUTHORIZATION_HEADER)
    logger.debug('ServiceAuthorization: in', s2s)
    logger.debug('ServiceAuthorization:out', s2sOut)
    const roles = req.headers['user-roles']
    const rolesOut = proxyReq.getHeader('user-roles')
    logger.debug('user-roles: in', roles)
    logger.debug('user-roles:out', rolesOut)
  }
  const onProxyError = (proxyError: Error, req, res) => {
    logger.error('proxy error on request ', req.method, req.originalUrl, proxyError)
  }
  const onProxyRes = (proxyRes, req, res) => {
    const s2s = req.headers.serviceauthorization
    logger.debug('serviceauthorization: res', s2s)
    logger.debug('Proxy response to request ', res.req.originalUrl, "->",
      proxyRes.req.path, proxyRes.statusCode, proxyRes.statusMessage)
  }
  const baseOptions = {
    //agent: tunnelAgent
    changeOrigin: true,
    onError: onProxyError,
    onProxyReq,
    onProxyRes,
    secure: false,
  }
  /!*const annoOptions = {
    //endpoints: ["/em-anno"],
    pathRewrite: {
      '^/em-anno': '/api',
    },
    rewrite: true,
    target: annoUrl,
    ...baseOptions,
  }*!/
  const docOptions = {
    //endpoints: ["/documents"],
    // agent: tunnelAgent.HTTP_PROXY,
    rewrite: false,
    changeOrigin: true,
    target: docUrl,
    ws: false,
    ...baseOptions,
  }*/
  /*const mwDoc = createProxyMiddleware('/documents', docOptions)
  app.use('/documents',
    async (req, res, next) => {
      await authInterceptor(req, res, next)
      next()
    },
    mwDoc)*/
  /*
  const mwAnno = createProxyMiddleware( annoOptions )
   app.use ('/em-anno',
     async (req, res, next) => {
        await authInterceptor(req, res, next)
       next()
     },
     mwAnno)
     */
}
