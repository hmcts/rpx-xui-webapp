import { createGlobalProxyAgent } from 'global-agent'
import {getConfigValue, hasConfigValue, showFeature} from '../configuration'
import {
  PROXY_ENABLED,
  PROXY_HOST,
  PROXY_PORT,
} from '../configuration/references'

export function init(): void {
    if (hasConfigValue(PROXY_ENABLED) && getConfigValue(PROXY_ENABLED)) {
        const globalProxyAgent = createGlobalProxyAgent()
        console.log('configuring global-agent: proxyHost %s', getConfigValue(PROXY_HOST))
        console.log('configuring global-agent: proxyPort %s', getConfigValue(PROXY_PORT))
        globalProxyAgent.HTTP_PROXY = `http://${getConfigValue(PROXY_HOST)}:${getConfigValue(PROXY_PORT)}`
        globalProxyAgent.NO_PROXY = 'localhost'
    }
}

/*export function init(): void {
    if (showFeature(FEATURE_PROXY_ENABLED)) {
        logger.info('configuring global-agent: ', process.env.MC_HTTP_PROXY, ' no proxy: ', process.env.MC_NO_PROXY)
        createGlobalProxyAgent({
            environmentVariableNamespace: "MC_",
        })
    }
}*/
