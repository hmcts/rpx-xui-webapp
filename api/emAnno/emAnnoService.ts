import { AxiosResponse } from 'axios'
import { http } from '../lib/http'
import * as log4jui from '../lib/log4jui'
import { EnhancedRequest, JUILogger } from '../lib/models'
import { setHeaders } from '../lib/proxy'
import { Annotation } from './models'

const logger: JUILogger = log4jui.getLogger('em-anno-service')

/**
 * Get Annotations
 *
 * @param annotationsPath
 * @returns {Promise<null>}
 */
export async function handleGet(annotationsPath: string, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('getting annotations', annotationsPath)
        const headers = setHeaders(req)
        const response = await http.get(annotationsPath, { headers })
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
export async function handlePost(annotationsPath: string, body: Annotation, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('posting annotations', annotationsPath)
        const headers = setHeaders(req)
        const response = await http.post(annotationsPath, body, { headers })
        return response
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
export async function handlePut(annotationsPath: string, body: Annotation, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('putting annotations', annotationsPath)
        const headers = setHeaders(req)
        const response = await http.put(annotationsPath, body, { headers })
        return response
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
export async function handleDelete(annotationsPath: string, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('deleting annotations', annotationsPath)
        const headers = setHeaders(req)
        const response = await http.delete(annotationsPath, { headers })
        return response
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}
