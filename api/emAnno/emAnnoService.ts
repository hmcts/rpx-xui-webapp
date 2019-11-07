import {http} from '../lib/http'
import * as log4jui from '../lib/log4jui'
import {JUILogger} from '../lib/models'
import { Annotations, Annotation } from './models'

const logger: JUILogger = log4jui.getLogger('em-anno-service')

/**
 * Get Annotations
 *
 * @param annotationsPath
 * @returns {Promise<null>}
 */
export async function handleGet(annotationsPath: string): Promise<Annotations> {

    try {
        logger.info('getting annotations', annotationsPath)
        const response: { data?: Annotations} = await http.get(annotationsPath)
        return response.data
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
export async function handlePost(annotationsPath: string, body: Annotation): Promise<Annotation> {

    try {
        logger.info('posting annotations', annotationsPath)
        const response: { data?: Annotation} = await http.post(annotationsPath, body)
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
export async function handlePut(annotationsPath: string, body: Annotation): Promise<Annotation> {

    try {
        logger.info('putting annotations', annotationsPath)
        const response: { data?: Annotation} = await http.put(annotationsPath, body)
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
export async function handleDelete(annotationsPath: string): Promise<Annotation> {

    try {
        logger.info('deleting annotations', annotationsPath)
        const response: { data?: Annotation} = await http.delete(annotationsPath)
        return response.data
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}
