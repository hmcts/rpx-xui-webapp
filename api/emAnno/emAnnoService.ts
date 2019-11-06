import {http} from '../lib/http'
import * as log4jui from '../lib/log4jui'
import {JUILogger} from '../lib/models'

const logger: JUILogger = log4jui.getLogger('em-anno-service')

/**
 * Get Annotations
 *
 * @param annotationsPath
 * @returns {Promise<null>}
 */
export async function handleGet(annotationsPath): Promise<any> {

    try {
        logger.info('getting annotations', annotationsPath)
        const response: { data?: {}} = await http.get(annotationsPath)
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
export async function handlePost(annotationsPath, body): Promise<any> {

    try {
        logger.info('posting annotations', annotationsPath)
        const response: { data?: {}} = await http.post(annotationsPath, body)
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
export async function handlePut(annotationsPath, body): Promise<any> {

    try {
        logger.info('putting annotations', annotationsPath)
        const response: { data?: {}} = await http.put(annotationsPath, body)
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
export async function handleDelete(annotationsPath): Promise<any> {

    try {
        logger.info('deleting annotations', annotationsPath)
        const response: { data?: {}} = await http.delete(annotationsPath)
        return response.data
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}
