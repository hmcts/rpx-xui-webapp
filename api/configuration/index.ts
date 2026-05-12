import * as propertiesVolume from '@hmcts/properties-volume';
import * as config from 'config';
import { proxiedReferences } from './references';

/**
 * Allows us to integrate the Azure key-vault flex volume, so that we are able to access Node configuration values.
 */
propertiesVolume.addTo(config);

/**
 * Get Configuration Value
 *
 * Returns the configuration value, using a config reference. It uses the reference to pull out the value
 * from the custom-environment-variables.json file
 *
 * @see readme.md
 * @see /config/custom-environment-variables.json
 * @see references.ts
 * @param reference - ie. 'services.ccdDefApi'
 */
const ENV_ONLY_CONFIG_REFERENCES: Record<string, string> = {
  'pact.brokerPassword': 'PACT_BROKER_PASSWORD',
  'secrets.rpx.system-user-password': 'SYSTEM_USER_PASSWORD',
};

export const getConfigValue = <T = string>(reference: string): T => {
  const envName = ENV_ONLY_CONFIG_REFERENCES[reference];

  if (envName && process.env[envName]) {
    return process.env[envName] as T;
  }

  return config.get<T>(reference);
};

/**
 * Show Feature
 *
 * Helper method for config feature toggling
 *
 * @param feature
 * @return boolean
 */
export const showFeature = (feature: string): boolean => config.get<boolean>(`feature.${feature}`);

export { proxiedReferences };
