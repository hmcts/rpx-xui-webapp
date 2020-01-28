import * as config from 'config'
import { propsExist } from '../lib/objectUtilities'
import {DEVELOPMENT, HTTP} from './constants'
import {ENVIRONMENT, PROTOCOL} from './references'

/**
 * Get Environment
 *
 * See Readme for more information on how the configuration file is set.
 * 'Environmental Variables Setup & Error Handling'
 *
 * TODO: Not required???? See when you get all the way through the environments.
 *
 * @see Readme
 * @returns {string} ie. - development / preview / aat / ithc, prod
 */
export const getEnvironment = () => process.env.NODE_CONFIG_ENV

/**
 * Get Configuration Value
 *
 * Returns the configuration value, using a dep-config reference. It uses the reference to pull out the value
 * from the .yaml file
 *
 * @see /config .yaml
 * @see references.ts
 * @param reference - ie. 'services.ccdDefApi'
 */
export const getConfigValue = reference => config.get(reference)

/**
 * Get Idam Secret
 *
 * The Idam secret is contained within the Azure Key Vault, and not within our .yaml file. All references to process.env
 * are managed from this file therefore we call process.env.IDAM_SECRET here.
 *
 * @returns {string}
 */
export const getIdamSecret = () => process.env.IDAM_SECRET

/**
 * Get S2S Secret
 *
 * We're able to pull in the S2S secret into the application using the following:
 * secretsConfig['secrets']['rpx']['mc-s2s-client-secret']
 *
 * The secret always comes from keyVaults.rpx.secrets.mc-s2s-client-secret
 * @see values.yaml
 *
 * @returns {string}
 */
export const getS2sSecret = (secretsConfig): string => {
  const ERROR_S2S_SECRET_NOT_FOUND =
    'secrets.rpx.mc-s2s-client-secret not found on this environment.'

  if (propsExist(secretsConfig, ['secrets', 'rpx', 'mc-s2s-client-secret'])) {
    // tslint:disable-next-line: no-string-literal
    return secretsConfig['secrets']['rpx']['mc-s2s-client-secret']
  } else {
    console.log(ERROR_S2S_SECRET_NOT_FOUND)
    return ''
  }
}

/**
 * Generate Environment Check Text
 *
 * We generate text to be used for debugging purposes, so as the person attempting to initialise the application knows
 * what the NODE_CONFIG_ENV is set as and what dep-config file is being used.
 */
export const environmentCheckText = () => `NODE_CONFIG_ENV is set as ${process.env.NODE_CONFIG_ENV} therefore we are using the ${config.get(ENVIRONMENT)} config.`

/**
 * Get Protocol
 *
 * If running locally we return 'http'
 *
 * @returns {string | string}
 */
export const getProtocol = () => getEnvironment() === DEVELOPMENT ? HTTP : getConfigValue(PROTOCOL)
