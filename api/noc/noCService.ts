import {AxiosResponse} from 'axios'
import * as log4jui from '../lib/log4jui'
import {EnhancedRequest, JUILogger} from '../lib/models'
import {setHeaders} from '../lib/proxy'
import {exists} from '../lib/util'
import {httpMock} from './httpMock'

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
        return await httpMock.get(noCPath, {headers})
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
 * @param req
 * @returns {Promise<AxiosResponse>}
 */
export async function handlePost(noCPath: string, body: any, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('posting noc', noCPath)
        const headers = setHeaders(req)
        return await httpMock.post(noCPath, body, {headers})
    } catch (e) {
        exists(e, 'message') ? logger.error(e.message) : logger.error('Error in post response')
        throw e
    }

}
