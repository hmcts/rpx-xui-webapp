import * as express from 'express'
import { config } from '../dep-config'
import { http } from '../lib/http'

export async function doLookup(req: express.Request, res: express.Response) {

    try {
        const postcode = req.query.postcode

        const url = `${config.services.ccd.componentApi}/addresses?postcode=${postcode}`

        const response = await http.get(url)

        res.send(response.data)
    } catch (error) {

        const errReport = {
            apiError: error.message,
            apiErrorDescription: error.data.errorDescription,
            statusCode: error.status,
        }
        res.status(errReport.statusCode)
        res.send(errReport)
    }
}
