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
        // TODO
        // EUI-1075
        // Use this when configured in the assure to export the evn variable
        // export JURISDICTIONS=DIVORCE,PROBATE,CMC,PUBLICLAW, IA && npm run start:node
        // const filtersString = process.env.JURISDICTIONS.split(',')
        // const filters = {jurisdiction: filtersString}
        const filters = {jurisdiction: config.environment === 'demo' ? ['DIVORCE', 'PROBATE', 'CMC', 'PUBLICLAW', 'IA'] : ['DIVORCE', 'PROBATE']}
        let amendedJurisdictions = []
        if (config.environment === 'local') {
          amendedJurisdictions = response.data
        } else {
          amendedJurisdictions = [...response.data].filter(o => filters.jurisdiction.includes(o.id))
          res.status(200)
        }
        res.send(amendedJurisdictions)
    } catch (e) {
        res.status(e.response.status)
        res.send(e.response.data)
    }
}
