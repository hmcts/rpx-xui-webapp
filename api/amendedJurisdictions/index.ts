import * as express from 'express'
import * as striptags from 'striptags'
import { config } from '../config'
import { http } from '../lib/http'
import { setHeaders } from '../lib/proxy'

/**
 * Manually filtering returned jurisdictions
 * to make available jurisdiction in filters array only
 */
export async function getJurisdictions(req: express.Request, res: express.Response) {
    console.log(req.url)
    let url = striptags(req.url)
    console.log(url)
    url = req.baseUrl  + url
    const headers: any = setHeaders(req)

    try {
        const response = await http.get(`${config.services.ccd.componentApi}${url}`, { headers })
        const filters = {jurisdiction: ['DIVORCE', 'PROBATE']}
        let amendedJurisdictions = []
        if (config.environment === 'prod' || config.environment === 'aat') {
            amendedJurisdictions = [...response.data].filter(o => filters.jurisdiction.includes(o.id))
        } else {
            amendedJurisdictions = response.data
        }
        res.status(200)
        res.send(amendedJurisdictions)
    } catch (e) {
        res.status(e.response.status)
        res.send(e.response.data)
    }
}
