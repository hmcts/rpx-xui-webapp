import * as express from 'express'
import * as striptags from 'striptags'
import {getConfigValue} from '../configuration'
import {
  JURISDICTIONS,
  SERVICES_CCD_COMPONENT_API_PATH,
} from '../configuration/references'
import { http } from '../lib/http'
import { setHeaders } from '../lib/proxy'

/**
 * getFilters
 */
const getFilters = () => getConfigValue(JURISDICTIONS)

/**
 * Manually filtering returned jurisdictions
 * to make available jurisdiction in filters array only
 */
export async function getJurisdictions(req: express.Request, res: express.Response, next: express.NextFunction) {
    let url = striptags(req.url)
    url = req.baseUrl  + url
    const headers: any = setHeaders(req)

    res.status(200)

    try {
        const response = await http.get(`${getConfigValue(SERVICES_CCD_COMPONENT_API_PATH)}${url}`, { headers })

        const filters = { jurisdiction: getFilters() }

        const amendedJurisdictions = [...response.data].filter(o => {
          return filters.jurisdiction.includes(o.id)
        })

        res.status(200)

        res.send(amendedJurisdictions)
    } catch (e) {
        next(e)
        /*res.status(e.response.status)
        res.send(e.response.data)*/
    }
}
