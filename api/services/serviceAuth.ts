import * as otp from 'otp'
import {getConfigValue} from '../configuration'
import {
  MICROSERVICE, S2S_SECRET,
  SERVICE_S2S_PATH,
} from '../configuration/references'
import { http } from '../lib/http'
import * as log4jui from '../lib/log4jui'

const s2sPath = getConfigValue(SERVICE_S2S_PATH)
const microservice = getConfigValue(MICROSERVICE)

const logger = log4jui.getLogger('service auth')

export async function postS2SLease() {

    const s2sSecret = getConfigValue(S2S_SECRET)
    const oneTimePassword = otp({ secret: s2sSecret }).totp()

    console.log('serviceAuth: s2sSecret')
    console.log(s2sSecret)
    console.log('microservice')
    console.log(microservice)
    console.log('oneTimePassword')
    console.log(oneTimePassword)
    console.log('s2sPath')
    console.log(s2sPath)
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
