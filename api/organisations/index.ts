import { Response } from 'express'
import { handleGet } from '../common/crudService'
import { getConfigValue } from '../configuration'
import {SERVICES_PRD_API_URL} from '../configuration/references'
import * as log4jui from '../lib/log4jui'
import { EnhancedRequest, JUILogger } from '../lib/models'

const logger: JUILogger = log4jui.getLogger('organisations')

export async function handleGetOrganisationsRoute(req: EnhancedRequest, res: Response) {
    try {
        const path = getOrganisationUri()
        const response = await handleGet(path, req)

        if (response.data.organisations) {
            res.send(response.data.organisations)
        } else {
            res.send(response.data)
        }
    } catch (error) {
        logger.error('Organisations error ' + error)
        if (error.message) {
            logger.error('Error message: ' + error.message)
          }
        if (error.stack) {
            logger.error('Error stack: ' + error.stack)
          }
        if (error.code) {
            logger.error('Error code: ' + error.code)
          }
        const errReport = { apiError: error.data.message, apiStatusCode: error.status,
            message: 'handleGetOrganisationsRoute error' }
        res.status(500).send(errReport)
    }
}

function getOrganisationUri(): string {
    return `${getConfigValue(SERVICES_PRD_API_URL)}/refdata/external/v1/organisations/status/ACTIVE?address=true`
}
