import {http} from '../lib/http'
import * as log4jui from '../lib/log4jui'
import { EnhancedRequest, JUILogger } from '../lib/models'
import { setHeaders } from '../lib/proxy'

const logger: JUILogger = log4jui.getLogger('payments-service')

/**
 * Get Payments
 *
 * @param paymentsPath
 * @returns {Promise<null>}
 */
export async function handleGet(paymentsPath: string, req: EnhancedRequest): Promise<any> {

    try {
        logger.info('getting payments', paymentsPath)
        const headers = setHeaders(req)
        console.log(headers)
        console.log(paymentsPath)
        const response: { data?: any} = await http.get(paymentsPath, { headers })
        return response.data
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}
