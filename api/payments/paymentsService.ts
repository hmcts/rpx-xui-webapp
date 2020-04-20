import {http} from '../lib/http'
import * as log4jui from '../lib/log4jui'
import {JUILogger} from '../lib/models'

const logger: JUILogger = log4jui.getLogger('payments-service')

/**
 * Get Payments
 *
 * @param paymentsPath
 * @returns {Promise<null>}
 */
export async function handleGet(paymentsPath: string): Promise<any> {

    try {
        logger.info('getting payments', paymentsPath)
        const response: { data?: any} = await http.get(paymentsPath)
        return response.data
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}
