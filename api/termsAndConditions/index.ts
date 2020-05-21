import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import {getConfigValue, showFeature} from '../configuration'
import {
    FEATURE_TERMS_AND_CONDITIONS_ENABLED,
    SERVICES_IDAM_CLIENT_ID,
    SERVICES_TERMS_AND_CONDITIONS_URL
} from '../configuration/references'
import { http } from '../lib/http'
import { setHeaders } from '../lib/proxy'
import { getTermsAndConditionsUrl } from './termsAndConditionsUtil'

export async function getTermsAndConditions(req: express.Request, res: express.Response) {
    if (!showFeature(FEATURE_TERMS_AND_CONDITIONS_ENABLED)) {
        const TERMS_PATH = path.join(__dirname, './resources', 'terms.html')
        const terms = fs.readFileSync(TERMS_PATH, 'utf8')

        res.status(200).send({
            content: terms,
            mimeType: 'text/html',
            version: 1,
        })
    }

    let errReport: any
    try {
        const url = getTermsAndConditionsUrl(getConfigValue(SERVICES_TERMS_AND_CONDITIONS_URL),
          getConfigValue(SERVICES_IDAM_CLIENT_ID))
        const headers = setHeaders(req)
        const response = await http.get(url, { headers })
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
