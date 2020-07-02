import {AxiosResponse} from 'axios'
import {http} from '../lib/http'
import * as log4jui from '../lib/log4jui'
import { EnhancedRequest, JUILogger } from '../lib/models'
import { setHeaders } from '../lib/proxy'

const logger: JUILogger = log4jui.getLogger('payments-service')

/**
 * Get Payments
 *
 * @param paymentsPath
 * @param req
 * @returns {Promise<null>}
 */
export async function handleGet(paymentsPath: string, req: EnhancedRequest): Promise<any> {
    logger.info('getting payments', paymentsPath)
    const headers = setHeaders(req)
    const response: AxiosResponse = await http.get(paymentsPath, { headers })
    return response.data
}
