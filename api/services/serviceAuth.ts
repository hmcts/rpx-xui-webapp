import * as otp from 'otp'
import { config } from '../config'
import { http } from '../lib/http'
import * as log4jui from '../lib/log4jui'

const url = config.services.s2s
const microservice = config.microservice
const s2sSecret = process.env.S2S_SECRET || 'AAAAAAAAAAAAAAAA'

const logger = log4jui.getLogger('service auth')

export async function postS2SLease() {

    const oneTimePassword = otp({ secret: s2sSecret }).totp()

    logger.info('generating from secret  :', s2sSecret,
        microservice,
        oneTimePassword
    )

    const request = await http.post(`${url}/lease`, {
        microservice,
        oneTimePassword,
    })

    return request.data
}
