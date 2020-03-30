import {getConfigValue} from '../configuration'
import {
  COOKIES_TOKEN,
  IDAM_SECRET,
  PROTOCOL,
  SERVICES_IDAM_API_URL,
  SERVICES_IDAM_CLIENT_ID,
  SERVICES_IDAM_OAUTH_CALLBACK_URL
} from '../configuration/references'
import { http } from '../lib/http'
import { isReqResSet, request } from '../lib/middleware/responseRequest'
import { valueOrNull } from '../lib/util'

const url = getConfigValue(SERVICES_IDAM_API_URL)
const idamSecret = getConfigValue(IDAM_SECRET) || 'AAAAAAAAAAAAAAAA'

const idamClient = getConfigValue(SERVICES_IDAM_CLIENT_ID)
const idamProtocol = getConfigValue(PROTOCOL)
const oauthCallbackUrl = getConfigValue(SERVICES_IDAM_OAUTH_CALLBACK_URL)

export async function getDetails(idamUrl: string, token: string = null) {
    // have to pass options in at first login as headers are yet to be attached.
    // lets try and see if we have these already
    let details

    /* istanbul ignore else */
    if (isReqResSet()) {
        const req = request()
        details = valueOrNull(req, 'session.user')

        if (details) {
            return details
        }
    }

    const jwt = token || request().cookies[getConfigValue(COOKIES_TOKEN)]
    const options = { headers: { Authorization: `Bearer ${jwt}` } }
    const response = await http.get(`${idamUrl}/details`, options)
    return response.data
}

// this does same as above + more. need to depricate above
export async function getUser(email = null) {
    const response = email ? await http.get(`${url}/users?email=${email}`) : await getDetails(url)

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
