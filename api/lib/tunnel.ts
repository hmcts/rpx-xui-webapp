import { createGlobalProxyAgent } from 'global-agent'
import {config} from '../z'

export function init(): void {
    if (config.proxy && config.localEnv === 'local') {
        const globalProxyAgent = createGlobalProxyAgent()
        console.log('configuring global-agent: %s', config.proxy)
        globalProxyAgent.HTTP_PROXY = `http://${config.proxy.host}:${config.proxy.port}`
        globalProxyAgent.NO_PROXY = 'localhost'
    }
}
