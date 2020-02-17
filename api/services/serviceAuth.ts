import * as propertiesVolume from '@hmcts/properties-volume'
import * as otp from 'otp'
import { getConfigValue, getS2sSecret } from '../configuration'
import {
  MICROSERVICE,
  SERVICE_S2S_PATH,
} from '../configuration/references'
import { http } from '../lib/http'
import * as log4jui from '../lib/log4jui'

// const s2sPath = config.get('services.s2s')
const s2sPath = getConfigValue(SERVICE_S2S_PATH)
// const microservice = config.get('microservice')
const microservice = getConfigValue(MICROSERVICE)

const mountedSecrets = propertiesVolume.addTo({})
// const mountedSecrets = propertiesVolume.addTo({}, { mountPoint: '/Volumes/mnt/secrets/' })

const s2sSecret = getS2sSecret(mountedSecrets)

const logger = log4jui.getLogger('service auth')

export async function postS2SLease() {

    const oneTimePassword = otp({ secret: s2sSecret }).totp()

    console.log('serviceAuth: s2sSecret')
    console.log(s2sSecret)
    logger.info('generating from secret  :', s2sSecret,
        microservice,
        oneTimePassword
    )

    const request = await http.post(`${s2sPath}/lease`, {
        microservice,
        oneTimePassword,
    })

    return request.data
}
