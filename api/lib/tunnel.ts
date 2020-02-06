import { createGlobalProxyAgent } from 'global-agent'
import {config} from '../config'

export function init(): void {
    if (config.proxy && config.environment === 'local') {
        console.log('configuring global-agent: %s', config.proxy)
        process.env.GLOBAL_AGENT_HTTP_PROXY = `http://${config.proxy.host}:${config.proxy.port}`
        process.env.GLOBAL_AGENT_NO_PROXY = 'localhost'
        createGlobalProxyAgent({})
    }
}
