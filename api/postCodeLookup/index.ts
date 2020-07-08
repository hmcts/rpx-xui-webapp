import * as express from 'express'
import { getConfigValue } from '../configuration'
import { SERVICES_CCD_COMPONENT_API_PATH } from '../configuration/references'
import { http } from '../lib/http'
import { setHeaders } from '../lib/proxy'

export async function doLookup(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {
        const postcode = req.query.postcode

        const url = `${getConfigValue(SERVICES_CCD_COMPONENT_API_PATH)}/addresses?postcode=${postcode}`

        const headers = setHeaders(req)

        const response = await http.get(url, { headers })

        res.send(response.data)
    } catch (error) {
        next(error)

        /*const errReport = {
            apiError: error.message,
            apiErrorDescription: error.data.errorDescription,
            statusCode: error.status,
        }
        res.status(errReport.statusCode)
        res.send(errReport)*/
    }
}
