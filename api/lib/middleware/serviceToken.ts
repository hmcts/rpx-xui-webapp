import axios from 'axios'
import * as jwtDecode from 'jwt-decode'
import {getConfigValue} from '../../configuration'
import {
  MICROSERVICE,
} from '../../configuration/references'
import { postS2SLease } from '../../services/serviceAuth'
import * as log4jui from '../log4jui'
import { asyncReturnOrError } from '../util'

const logger = log4jui.getLogger('service-token')
const that = this
const cache = {}
const microservice = getConfigValue(MICROSERVICE)

export function validateCache() {
  logger.info('validaing s2s cache')
  const currentTime = Math.floor(Date.now() / 1000)
  /* istanbul ignore else */
  if (!cache[microservice]) {
    return false
  }
  return currentTime < cache[microservice].expiresAt
}

export function getToken() {
  return cache[microservice]
}

export async function generateToken() {
  logger.info('Getting new s2s token')
  const token = await postS2SLease()

  const tokenData: any = jwtDecode(token)

  cache[microservice] = {
    expiresAt: tokenData.exp,
    token,
  }

  return token
}

export async function serviceTokenGenerator() {
  if (that.validateCache()) {
    logger.info('Getting cached s2s token')
    const tokenData = getToken()
    return tokenData.token
  } else {
    return await that.generateToken()
  }
}

export default async (req, res, next) => {
  const token = await asyncReturnOrError(that.serviceTokenGenerator(), 'Error getting s2s token', res, logger)
  /* istanbul ignore else */
  if (token) {
    logger.info('Attaching s2s token')
    axios.defaults.headers.common.ServiceAuthorization = token
    req.headers.ServiceAuthorization = token
    next()
  }
}
