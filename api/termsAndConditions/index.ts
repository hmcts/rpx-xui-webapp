import * as express from 'express'
import { config } from '../config'
import { http } from '../lib/http'
import { getTermsAndConditionsUrl } from './termsAndConditionsUtil'

export async function getTermsAndConditions(req: express.Request, res: express.Response) {
    let errReport: any
    try {
        const url = getTermsAndConditionsUrl(config.services.termsAndConditions)
        const response = await http.get(url)
        res.send(response.data)
    } catch (error) {
        // we get a 404 if the user has not agreed to Terms and conditions
        errReport = {
            apiError: error.data.message,
            apiStatusCode: error.status,
            message: 'Terms and Conditions route error',
        }
        res.status(error.status).send(errReport)
    }
}