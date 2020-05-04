import {createGlobalProxyAgent, ProxyAgentConfigurationType} from 'global-agent'
import {showFeature} from '../configuration'
import {
    FEATURE_PROXY_ENABLED,
} from '../configuration/references'

export function init(): ProxyAgentConfigurationType {
    if (showFeature(FEATURE_PROXY_ENABLED)) {
        console.info('configuring global-agent: ', process.env.MC_HTTP_PROXY, ' no proxy: ', process.env.MC_NO_PROXY)
        return createGlobalProxyAgent({
            environmentVariableNamespace: "MC_",
        })
    }
}
