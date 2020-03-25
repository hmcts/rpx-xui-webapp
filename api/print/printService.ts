import { setHeaders } from 'lib/proxy'
import { http } from '../lib/http'
import * as log4jui from '../lib/log4jui'
import { EnhancedRequest, JUILogger } from '../lib/models'

const logger: JUILogger = log4jui.getLogger('print-service')

/**
 * Get CCD Printout
 *
 * This returns a HTML document. Therefore we can just pass it on to the UI.
 *
 * TODO: Unit Test
 *
 * @param printPath
 * @returns {Promise<null>}
 */
export async function getCcdPrintout(printPath, req: EnhancedRequest) {

    try {
        logger.info('getting print document', printPath)
        const headers = setHeaders(req)
        const response = await http.get(printPath, { headers })
        return response.data
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}
