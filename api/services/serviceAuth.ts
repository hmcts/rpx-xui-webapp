
// import { config } from '../dep-config'
import config from 'config'
import * as secretsConfig from 'config'
import * as otp from 'otp'
import { getS2sSecret } from '../configuration'
import { http } from '../lib/http'
import * as log4jui from '../lib/log4jui'
import * as propertiesVolume from '@hmcts/properties-volume'

const s2sPath = config.get('services.s2s')
const microservice = config.get('microservice')

propertiesVolume.addTo(secretsConfig)

const s2sSecret = getS2sSecret(secretsConfig)

const logger = log4jui.getLogger('service auth')

export async function postS2SLease() {

    const oneTimePassword = otp({ secret: s2sSecret }).totp()

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
