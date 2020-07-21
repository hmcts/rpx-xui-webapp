import {getConfigValue} from '../configuration'
import {
    SERVICES_IDAM_API_URL,
} from '../configuration/references'
import {http} from '../lib/http'

const url = getConfigValue(SERVICES_IDAM_API_URL)

export async function getDetails(idamUrl: string, token: string = null) {
    // have to pass options in at first login as headers are yet to be attached.
    // lets try and see if we have these already

    const options = { headers: { Authorization: `Bearer ${token}` } }
    const response = await http.get(`${idamUrl}/details`, options)
    return response.data
}

// this does same as above + more. need to depricate above
export async function getUser(email = null) {
    const response = email ? await http.get(`${url}/users?email=${email}`) : await getDetails(url)

    return response
}
