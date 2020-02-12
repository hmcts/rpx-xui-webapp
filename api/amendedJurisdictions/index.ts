import * as express from 'express'
import * as striptags from 'striptags'
import {getConfigValue} from '../configuration'
import {
  SERVICES_TERMS_AND_CONDITIONS_PATH,
  SERVICES_CCD_COMPONENT_API_PATH,
  SERVICES_CCD_DATA_STORE_API_PATH,
} from '../configuration/references'
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

    res.status(200)

    // TODO: Add this back in
    // try {
    //     const response = await http.get(`${getConfigValue(SERVICES_CCD_COMPONENT_API_PATH)}${url}`, { headers })
    //     // TODO ok so we don't want to place these in each environment,
    //     // does that make sense?
    //     // EUI-1075
    //     // Use this when configured in the assure to export the evn variable
    //     // export JURISDICTIONS=DIVORCE,PROBATE,CMC && npm run start:node
    //     // const filtersString = process.env.JURISDICTIONS.split(',')
    //     // const filters = {jurisdiction: filtersString}
    //
    //     // ok so we can't place an array into Azure?
    //     // we might need a config changer then.
    //     const filters = {jurisdiction: config.environment === 'demo' ?
    //         ['DIVORCE', 'PROBATE', 'CMC', 'IA', 'FR', 'PUBLICLAW', 'SSCS'] :
    //         ['DIVORCE', 'PROBATE', 'FR', 'PUBLICLAW', 'IA']}
    //     let amendedJurisdictions = []
    //     if (config.environment === 'local') {
    //       amendedJurisdictions = response.data
    //     } else {
    //       amendedJurisdictions = [...response.data].filter(o => filters.jurisdiction.includes(o.id))
    //       res.status(200)
    //     }
    //     res.send(amendedJurisdictions)
    // } catch (e) {
    //     res.status(e.response.status)
    //     res.send(e.response.data)
    // }
}
