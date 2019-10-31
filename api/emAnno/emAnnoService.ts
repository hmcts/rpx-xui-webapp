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
export async function handleGet(annotationsPath) {

    try {
        logger.info('getting annotations', annotationsPath)
        const response = await http.get(annotationsPath)
        return response.data
    } catch (e) {
        console.log(e)
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
export async function handlePost(annotationsPath, body) {

    try {
        logger.info('posting annotations', annotationsPath)
        const response = await http.post(annotationsPath, body)
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
export async function handlePut(annotationsPath, body) {

    try {
        logger.info('putting annotations', annotationsPath)
        const response = await http.put(annotationsPath, body)
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
export async function handleDelete(annotationsPath) {

    try {
        logger.info('deleting annotations', annotationsPath)
        const response = await http.delete(annotationsPath)
        return response.data
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}
