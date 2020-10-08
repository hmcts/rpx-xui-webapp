import {AxiosResponse} from 'axios'
import {http} from '../lib/http'
import * as log4jui from '../lib/log4jui'
import {EnhancedRequest, JUILogger} from '../lib/models'
import {setHeaders} from '../lib/proxy'
import {exists} from '../lib/util'

const logger: JUILogger = log4jui.getLogger('noc-service')

/**
 * Get NoC Questions
 *
 * @returns {Promise<AxiosResponse>}
 * @param noCPath
 * @param req
 */
export async function handleGet(noCPath: string, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('getting noc questions', noCPath)
        const headers = setHeaders(req)
        return await http.get(noCPath, {headers})
    } catch (e) {
        exists(e, 'message') ? logger.error(e.message) : logger.error('Error in get response')
        throw e
    }

}

/**
 * Post Redaction
 *
 * @param noCPath
 * @param body
 * @returns {Promise<AxiosResponse>}
 */
export async function handlePost(noCPath: string, body: any, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('posting redaction', noCPath)
        const headers = setHeaders(req)
        return await http.post(noCPath, body, {headers})
    } catch (e) {
        exists(e, 'message') ? logger.error(e.message) : logger.error('Error in post response')
        throw e
    }

}
