import * as express from 'express'
import { config } from '../config'
import { http } from '../lib/http'
import { isReqResSet, request } from '../lib/middleware/responseRequest'

import { getHealth, getInfo, valueOrNull } from '../lib/util'

const url = config.services.idam.idamApiUrl

const idamSecret = process.env.IDAM_SECRET || 'AAAAAAAAAAAAAAAA'
const idamClient = config.idamClient
const idamProtocol = config.protocol
const oauthCallbackUrl = config.services.idam.oauthCallbackUrl

export async function getDetails(token: string = null) {
    // have to pass options in at first login as headers are yet to be attached.
    // lets try and see if we have these already
    let details

    if (isReqResSet()) {
        const req = request()
        details = valueOrNull(req, 'session.user')

        if (details) {
            return details
        }
    }

    const jwt = token || request().cookies[config.cookies.token]
    const options = { headers: { Authorization: `Bearer ${jwt}` } }
    const response = await http.get(`${url}/details`, options)
    return response.data
}

// this does same as above + more. need to depricate above
export async function getUser(email = null) {
    const response = email ? await http.get(`${url}/users?email=${email}`) : await getDetails()

    return response
}

export async function postOauthToken(code, host) {
    const redirectUri = `${idamProtocol}://${host}/${oauthCallbackUrl}`
    const urlX = `${url}/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`
    const options = {
        headers: {
            Authorization: `Basic ${Buffer.from(`${idamClient}:${idamSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }

    const response = await http.post(urlX, {}, options)

    return response.data
}

export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/idam', router)

    router.get('/health', (req, res, next) => {
        res.status(200).send(getHealth(url))
    })

    router.get('/info', (req, res, next) => {
        res.status(200).send(getInfo(url))
    })

    router.get('/details', (req, res, next) => {
        res.status(200).send(getDetails())
    })
}
