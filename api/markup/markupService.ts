import { AxiosResponse } from 'axios'
import { http } from '../lib/http'
import * as log4jui from '../lib/log4jui'
import { EnhancedRequest, JUILogger } from '../lib/models'
import { setHeaders } from '../lib/proxy'
import { Markup } from './models'

// TODO: combine with emAnnoService

const logger: JUILogger = log4jui.getLogger('markup-service')

/**
 * Get Markup
 *
 * @param markupPath
 * @returns {Promise<AxiosResponse>}
 */
export async function handleGet(markupPath: string, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('getting markup', markupPath)
        const headers = setHeaders(req)
        const response = await http.get(markupPath, { headers })
        return response
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}

/**
 * Post Markup
 *
 * @param markupPath
 * @param body
 * @returns {Promise<AxiosResponse>}
 */
export async function handlePost(markupPath: string, body: Markup, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('posting markup', markupPath)
        const headers = setHeaders(req)
        const response = await http.post(markupPath, body, { headers })
        return response
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}

/**
 * Put Markup
 *
 * @param markupPath
 * @param body
 * @returns {Promise<AxiosResponse>}
 */
export async function handlePut(markupPath: string, body: Markup, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('putting markup', markupPath)
        const headers = setHeaders(req)
        const response = await http.put(markupPath, body, { headers })
        return response
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}

/**
 * Delete Markup
 *
 * @param markupPath
 * @returns {Promise<AxiosResponse>}
 */
export async function handleDelete(markupPath: string, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('deleting markup', markupPath)
        const headers = setHeaders(req)
        const response = await http.delete(markupPath, { headers })
        return response
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}
