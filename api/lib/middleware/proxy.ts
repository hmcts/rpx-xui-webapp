import {createProxyMiddleware as proxy, Options} from 'http-proxy-middleware'
import * as modifyResponse from 'node-http-proxy-json'
import {getConfigValue} from '../../configuration'
import {LOGGING} from '../../configuration/references'
import * as log4jui from '../log4jui'
import authInterceptor from './auth'

const logger = log4jui.getLogger('proxy')

export const onProxyError = (err, req, res) => {
    logger.error(err)
    res.status(500).send({
        error: 'Error when connecting to remote server',
        status: 504,
    })
}

export const applyProxy = (app, config) => {
    const options: Options = {
        changeOrigin: true,
        logLevel: getConfigValue(LOGGING),
        logProvider: ()  => {
            return {
                debug: msg => logger.debug(msg),
                error: msg => logger.error(msg),
                info: msg => logger.info(msg),
                log: msg => logger.info(msg),
                warn: msg => logger.warn(msg),
            }
        },
        onError: onProxyError,
        target: config.target,
    }

    if (config.onReq) {
        options.onProxyReq = config.onReq
    }

    if (config.onRes) {
        options.onProxyRes = (proxyRes, req, res) => {
            modifyResponse(res, proxyRes, body => {
                if (body) {
                    // modify some information
                    body = config.onRes(proxyRes, req, res, body)
                }
                return body // return value can be a promise
            })
        }
    }

    if (config.ws) {
        options.ws = config.ws
    }

    if (false !== config.rewrite) {
        options.pathRewrite = {
            [`^${config.source}`]: config.rewriteUrl || '',
        }
    }

    let middlewares = [authInterceptor]

    if (config.middlewares) {
        middlewares = [...middlewares, ...config.middlewares]
    }

    if (config.filter) {
        app.use(config.source, middlewares, proxy(config.filter, options))
    } else {
        app.use(config.source, middlewares, proxy(options))
    }
}
