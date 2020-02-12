import { createGlobalProxyAgent } from 'global-agent'
import {getConfigValue, getEnvironment} from '../configuration'
import {
  PROXY_HOST,
  PROXY_PORT,
} from '../configuration/references'

export function init(): void {
    // if (config.proxy && config.localEnv === 'local') {
    if (getEnvironment() === 'local' && getConfigValue(PROXY_HOST)) {
        const globalProxyAgent = createGlobalProxyAgent()
        // console.log('configuring global-agent: %s', config.proxy)
        console.log('configuring global-agent: proxyHost %s', getConfigValue(PROXY_HOST))
        console.log('configuring global-agent: proxyPort %s', getConfigValue(PROXY_PORT))
        // globalProxyAgent.HTTP_PROXY = `http://${config.proxy.host}:${config.proxy.port}`
        globalProxyAgent.HTTP_PROXY = `http://${getConfigValue(PROXY_HOST)}:${getConfigValue(PROXY_PORT)}`
        globalProxyAgent.NO_PROXY = 'localhost'
    }
}
