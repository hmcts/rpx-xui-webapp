import {AxiosResponse} from 'axios'
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
 * @param req
 * @returns {Promise<null>}
 */
export async function handleGet(annotationsPath: string, req: EnhancedRequest): Promise<Annotations> {
    logger.info('getting annotations', annotationsPath)
    const headers = setHeaders(req)
    const response: AxiosResponse<Annotations> = await http.get(annotationsPath, { headers })
    return response.data

}

/**
 * Post Annotations
 *
 * @param annotationsPath
 * @param body
 * @param req
 * @returns {Promise<null>}
 */
export async function handlePost(annotationsPath: string, body: Annotation, req: EnhancedRequest): Promise<Annotation> {
    logger.info('posting annotations', annotationsPath)
    const headers = setHeaders(req)
    const response: AxiosResponse<Annotation> = await http.post(annotationsPath, body, { headers })
    return response.data
}

/**
 * Put Annotations
 *
 * @param annotationsPath
 * @param body
 * @param req
 * @returns {Promise<null>}
 */
export async function handlePut(annotationsPath: string, body: Annotation, req: EnhancedRequest): Promise<Annotation> {
    logger.info('putting annotations', annotationsPath)
    const headers = setHeaders(req)
    const response: AxiosResponse<Annotation> = await http.put(annotationsPath, body, { headers })
    return response.data
}

/**
 * Delete Annotations
 *
 * @param annotationsPath
 * @param req
 * @returns {Promise<null>}
 */
export async function handleDelete(annotationsPath: string, req: EnhancedRequest): Promise<Annotation> {
    logger.info('deleting annotations', annotationsPath)
    const headers = setHeaders(req)
    const response: AxiosResponse<Annotation> = await http.delete(annotationsPath, { headers })
    return response.data
}
