import * as express from 'express'
import * as striptags from 'striptags'
import { config } from '../config'
import { http } from '../lib/http'
import { setHeaders } from '../lib/proxy'

export async function getJurisdictions(req: express.Request, res: express.Response) {
    let url = striptags(req.url)
    url = req.baseUrl  + url
    const headers: any = setHeaders(req)

    try {
        const response = await http.get(`${config.services.ccd.componentApi}${url}`, { headers })

        let amendedJurisdictions = []
        if (config.environment === 'prod') {
            response.data.forEach(element => {
                if (element && element.id === 'PROBATE') {
                    amendedJurisdictions.push(element)
                }
            })
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
