import {EnvironmentConfigServices} from '../interfaces/environment.config'
import {getConfigValue} from './index'
import { SERVICES_CCD_COMPONENT_API_PATH } from './references'
import { SERVICES_IDAM_LOGIN_URL } from './references'
import { SERVICE_S2S_PATH } from './references'
import { SERVICES_FEE_AND_PAY_API_PATH } from './references'
import { SERVICES_TERMS_AND_CONDITIONS_URL } from './references'

export const healthEndpoints = (): EnvironmentConfigServices => {

  const HEALTH = '/health'

  return {
    ccdDataApi: getConfigValue(SERVICES_CCD_COMPONENT_API_PATH) + HEALTH,
    // feeAndPayApi: getConfigValue(SERVICES_FEE_AND_PAY_API_PATH) + HEALTH,
    idamApi: getConfigValue(SERVICES_IDAM_LOGIN_URL) + HEALTH,
    s2s: getConfigValue(SERVICE_S2S_PATH) + HEALTH,
    termsAndConditions: getConfigValue(SERVICES_TERMS_AND_CONDITIONS_URL) + HEALTH,
  }
}
