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
 * @returns {Promise<AxiosResponse>}
 */
export async function handleGet(annotationsPath: string, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('getting annotations', annotationsPath)
        const headers = setHeaders(req)
        const response = await http.get(annotationsPath, { headers })
        return response
    } catch (e) {
        e.message ? logger.error(e.message) : logger.error('Error in em-anno-service get response')
        throw e
    }

}

/**
 * Post Annotations
 *
 * @param annotationsPath
 * @param body
 * @returns {Promise<AxiosResponse>}
 */
export async function handlePost(annotationsPath: string, body: Annotation, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('posting annotations', annotationsPath)
        const headers = setHeaders(req)
        const response = await http.post(annotationsPath, body, { headers })
        return response
    } catch (e) {
        e.message ? logger.error(e.message) : logger.error('Error in em-anno-service post response')
        throw e
    }
}

/**
 * Put Annotations
 *
 * @param annotationsPath
 * @param body
 * @returns {Promise<AxiosResponse>}
 */
export async function handlePut(annotationsPath: string, body: Annotation, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('putting annotations', annotationsPath)
        const headers = setHeaders(req)
        const response = await http.put(annotationsPath, body, { headers })
        return response
    } catch (e) {
        e.message ? logger.error(e.message) : logger.error('Error in em-anno-service put response')
        throw e
    }
}

/**
 * Delete Annotations
 *
 * @param annotationsPath
 * @returns {Promise<AxiosResponse>}
 */
export async function handleDelete(annotationsPath: string, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('deleting annotations', annotationsPath)
        const headers = setHeaders(req)
        const response = await http.delete(annotationsPath, { headers })
        return response
    } catch (e) {
        e.message ? logger.error(e.message) : logger.error('Error in em-anno-service delete response')
        throw e
    }
}
