import {EnvironmentConfigServices} from '../interfaces/environment.config'
import {getConfigValue} from './index'
import {
  SERVICE_S2S_PATH,
  SERVICES_CCD_DATA_API_PATH,
  SERVICES_CCD_DEF_API_PATH,
  SERVICES_IDAM_API_PATH,
  SERVICES_IDAM_WEB,
  SERVICES_RD_PROFESSIONAL_API_PATH,
} from './references'

export const healthEndpoints = (): EnvironmentConfigServices => {

  const HEALTH = '/health'

  return {
    ccdDataApi: getConfigValue(SERVICES_CCD_DATA_API_PATH) + HEALTH,
    ccdDefApi: getConfigValue(SERVICES_CCD_DEF_API_PATH) + HEALTH,
    idamApi: getConfigValue(SERVICES_IDAM_API_PATH) + HEALTH,
    idamWeb: getConfigValue(SERVICES_IDAM_WEB) + HEALTH,
    rdProfessionalApi: getConfigValue(SERVICES_RD_PROFESSIONAL_API_PATH) + HEALTH,
    s2s: getConfigValue(SERVICE_S2S_PATH) + HEALTH,
  }
}
