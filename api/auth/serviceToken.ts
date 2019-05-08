import axios, { AxiosInstance } from 'axios'
import * as jwtDecode from 'jwt-decode'
import * as log4jui from '../lib/log4jui'
import * as otp from 'otp'
import { config } from '../config'
import { Token } from '../lib/models'

const logger = log4jui.getLogger('serviceToken')
const microservice = config.microservice
const secret = process.env.S2S_SECRET

const cache = {}
let http: AxiosInstance

function validateCache(): boolean {
    const currentTime = Math.floor(Date.now() / 1000)
    if (!cache[microservice]) {
        return false
    }
    return currentTime < cache[microservice].expiresAt
}

function getToken(): Token {
    return cache[microservice]
}

async function generateToken() {
    logger.info('generating from secret  :', secret)
    const oneTimePassword = otp({ secret }).totp()
    http = axios.create({})

    try {
        const response = await http.post(`${config.s2s}/lease`, {
            microservice,
            oneTimePassword,
        })

        const tokenData = jwtDecode(response.data)
        cache[microservice] = {
            expiresAt: tokenData.exp,
            token: response.data,
        }
    } catch (e) {
        logger.info('Error creating S2S token! S2S service error - ', e)
    }
}
export async function serviceTokenGenerator(): Promise<Token> {
    try {
        if (validateCache()) {
            return getToken()
        } else {
            await generateToken()
            return getToken()
        }
    } catch (e) {
        logger.info('Failed to get S2S token')
    }
}
