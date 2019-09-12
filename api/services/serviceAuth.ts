import * as express from 'express'
import * as otp from 'otp'
import { config } from '../config'
import { http } from '../lib/http'
import * as log4jui from '../lib/log4jui'
import { getHealth, getInfo } from '../lib/util'

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

export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/s2s', router)

    router.get('/health', (req, res, next) => {
        res.status(200).send(getHealth(url))
    })

    router.get('/info', (req, res, next) => {
        res.status(200).send(getInfo(url))
    })
}
