import {createGlobalProxyAgent} from 'global-agent';
import {showFeature} from '../configuration';
import {
  FEATURE_PROXY_ENABLED,
} from '../configuration/references';

export function init(): void {
  if (showFeature(FEATURE_PROXY_ENABLED)) {
    console.info('configuring global-agent: ', process.env.MC_HTTP_PROXY, ' no proxy: ', process.env.MC_NO_PROXY);
    createGlobalProxyAgent({
      environmentVariableNamespace: "MC_",
    });
  }
}
