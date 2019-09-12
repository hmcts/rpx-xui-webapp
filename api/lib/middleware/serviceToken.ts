import * as jwtDecode from 'jwt-decode'
import { config } from '../../config'
import { postS2SLease } from '../../services/serviceAuth'
import * as log4jui from '../log4jui'
import { asyncReturnOrError } from '../util'

const logger = log4jui.getLogger('service-token')

const cache = {}
// simple variable cache because s2s token is application level not user level

const microservice = config.microservice

function validateCache() {
    logger.info('validaing s2s cache')
    const currentTime = Math.floor(Date.now() / 1000)
    if (!cache[microservice]) {
        return false
    }
    return currentTime < cache[microservice].expiresAt
}

function getToken() {
    return cache[microservice]
}

async function generateToken() {
    logger.info('Getting new s2s token')
    const token = await postS2SLease()

    const tokenData: any = jwtDecode(token)

    cache[microservice] = {
        expiresAt: tokenData.exp,
        token,
    }

    return token
}

async function serviceTokenGenerator() {
    if (validateCache()) {
        logger.info('Getting cached s2s token')
        const tokenData = getToken()
        return tokenData.token
    } else {
        return await generateToken()
    }
}

export default async (req, res, next) => {
    const token = await asyncReturnOrError(serviceTokenGenerator(), 'Error getting s2s token', res, logger)
    if (token) {
        logger.info('Attaching s2s token')
        req.headers.ServiceAuthorization = token
        next()
    }
}
