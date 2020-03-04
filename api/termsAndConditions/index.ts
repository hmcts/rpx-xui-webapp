import * as express from 'express'
import {getConfigValue} from '../configuration'
import {
  SERVICES_IDAM_CLIENT_ID,
  SERVICES_TERMS_AND_CONDITIONS_URL,
} from '../configuration/references'
import { http } from '../lib/http'
import { getTermsAndConditionsUrl } from './termsAndConditionsUtil'

export async function getTermsAndConditions(req: express.Request, res: express.Response) {
    let errReport: any
    try {
        const url = getTermsAndConditionsUrl(getConfigValue(SERVICES_TERMS_AND_CONDITIONS_URL),
          getConfigValue(SERVICES_IDAM_CLIENT_ID))
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
