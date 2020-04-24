import {createProxyMiddleware as proxy, Options} from 'http-proxy-middleware'
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

    if (false !== config.rewrite) {
        options.pathRewrite = {
            [`^${config.source}`]: config.rewriteUrl || '',
        }
    }

    if (config.filter) {
        app.use(config.source, authInterceptor, proxy(config.filter, options))
    } else {
        app.use(config.source, authInterceptor, proxy(options))
    }
}
