import * as propertiesVolume from '@hmcts/properties-volume'
import * as config from 'config'

/**
 * If you are running locally you might need to set the mountPoint up as documented in the readme.
 * ie. propertiesVolume.addTo(config, { mountPoint: '/Volumes/mnt/secrets/'})
 *
 * ALLOW_CONFIG_MUTATIONS should equal true on the environment otherwise HMCTS Properties Volume will
 * not be able to merge the volume secrets into the Node config object.
 *
 * @see Readme.md
 * @see https://github.com/lorenwest/node-config/wiki/Environment-Variables
 */
export const initialiseSecrets = () => {
  propertiesVolume.addTo(config)
  // propertiesVolume.addTo(config, { mountPoint: '/Volumes/mnt/secrets/'})
}

/**
 * Get Configuration Value
 *
 * Returns the configuration value, using a config reference. It uses the reference to pull out the value
 * from the .json file
 *
 * @see readme.md
 * @see /config .yaml
 * @see references.ts
 * @param reference - ie. 'services.ccdDefApi'
 */
export const getConfigValue = reference => {
  return config.get<string>(reference)
}

export const hasConfigValue = reference => {
  return config.has(reference)
}

export const getConfigValueNumber = reference => {
  return config.get<number>(reference)
}
