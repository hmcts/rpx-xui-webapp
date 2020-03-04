import * as express from 'express'
import * as striptags from 'striptags'
import {getConfigValue} from '../configuration'
import {
  SERVICES_CCD_COMPONENT_API_PATH,
} from '../configuration/references'

import { http } from './http'
//import * as log4jui from './log4jui'
import { EnhancedRequest } from './models'

//const logger = log4jui.getLogger('proxy')

export function setHeaders(req: EnhancedRequest) {
    const headers: any = {}

    headers['content-type'] = req.headers['content-type']
    if (req.headers.accept) {
        headers.accept = req.headers.accept
    }
    if (req.headers.experimental) {
        headers.experimental = req.headers.experimental
    }

    return headers
}

export async function get(req: EnhancedRequest, res: express.Response) {
    let url = striptags(req.url)
    url = req.baseUrl  + url
    const headers: any = setHeaders(req)

    try {
        const response = await http.get(`${getConfigValue(SERVICES_CCD_COMPONENT_API_PATH)}${url}`, { headers })

        res.status(200)
        res.send(response.data)
    } catch (e) {
        res.status(e.status)
        res.send(e.data)
    }

}

export async function put(req: EnhancedRequest, res: express.Response) {
    let url = striptags(req.url)
    url = req.baseUrl + url

    const headers: any = setHeaders(req)

    try {
        const response = await http.put(`${getConfigValue(SERVICES_CCD_COMPONENT_API_PATH)}${url}`, req.body, { headers })
        res.status(200)
        res.send(response.data)
    } catch (e) {
        res.status(e.status)
        res.send(e.data)
    }
}

export async function post(req: EnhancedRequest, res: express.Response) {
    let url = striptags(req.url)
    url = req.baseUrl + url

    const headers: any = setHeaders(req)

    try {
        const response = await http.post(`${getConfigValue(SERVICES_CCD_COMPONENT_API_PATH)}${url}`, req.body, { headers })
        res.status(200)
        res.send(response.data)
    } catch (e) {
        res.status(e.status)
        res.send(e.data)
    }
}
