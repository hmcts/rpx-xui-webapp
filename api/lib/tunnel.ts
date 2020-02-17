import { createGlobalProxyAgent } from 'global-agent'
import { getConfigValue, hasConfigValue } from '../configuration'
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
