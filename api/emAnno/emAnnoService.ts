import { http } from '../lib/http'
import * as log4jui from '../lib/log4jui'
import { EnhancedRequest, JUILogger } from '../lib/models'
import { setHeaders } from '../lib/proxy'
import { Annotation, Annotations } from './models'

const logger: JUILogger = log4jui.getLogger('em-anno-service')

/**
 * Get Annotations
 *
 * @param annotationsPath
 * @returns {Promise<null>}
 */
export async function handleGet(annotationsPath: string, req: EnhancedRequest): Promise<any> { // todo add typings

    try {
        logger.info('getting annotations', annotationsPath)
        const headers = setHeaders(req)
        const response: { data?: any} = await http.get(annotationsPath, { headers }) // todo make add typings
        return response
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}

/**
 * Post Annotations
 *
 * @param annotationsPath
 * @param body
 * @returns {Promise<null>}
 */
export async function handlePost(annotationsPath: string, body: Annotation, req: EnhancedRequest): Promise<Annotation> {

    try {
        logger.info('posting annotations', annotationsPath)
        const headers = setHeaders(req)
        const response: { data?: Annotation} = await http.post(annotationsPath, body, { headers })
        return response.data
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}

/**
 * Put Annotations
 *
 * @param annotationsPath
 * @param body
 * @returns {Promise<null>}
 */
export async function handlePut(annotationsPath: string, body: Annotation, req: EnhancedRequest): Promise<Annotation> {

    try {
        logger.info('putting annotations', annotationsPath)
        const headers = setHeaders(req)
        const response: { data?: Annotation} = await http.put(annotationsPath, body, { headers })
        return response.data
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}

/**
 * Delete Annotations
 *
 * @param annotationsPath
 * @returns {Promise<null>}
 */
export async function handleDelete(annotationsPath: string, req: EnhancedRequest): Promise<Annotation> {

    try {
        logger.info('deleting annotations', annotationsPath)
        const headers = setHeaders(req)
        const response: { data?: Annotation} = await http.delete(annotationsPath, { headers })
        return response.data
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}
