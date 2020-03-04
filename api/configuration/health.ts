import {EnvironmentConfigServices} from '../interfaces/environment.config'
import {getConfigValue} from './index'
import {
  SERVICE_S2S_PATH,
  SERVICES_CCD_DATA_STORE_API_PATH,
  SERVICES_IDAM_API_URL,
} from './references'

export const healthEndpoints = (): EnvironmentConfigServices => {

  const HEALTH = '/health'

  return {
    ccdDataApi: getConfigValue(SERVICES_CCD_DATA_STORE_API_PATH) + HEALTH,
    idamApi: getConfigValue(SERVICES_IDAM_API_URL) + HEALTH,
    s2s: getConfigValue(SERVICE_S2S_PATH) + HEALTH,
  }
}
