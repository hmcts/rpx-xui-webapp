import {http} from '../lib/http'
import * as log4jui from '../lib/log4jui'
import {JUILogger} from '../lib/models'

const logger: JUILogger = log4jui.getLogger('print-service')

/**
 * Get CCD Printout
 *
 * @param annotationsPath
 * @returns {Promise<null>}
 */
export async function handleGet(annotationsPath) {

    try {
        logger.info('getting annotations', annotationsPath)
        const response = await http.get(annotationsPath)
        return response.data
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}
