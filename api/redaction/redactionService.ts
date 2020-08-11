import { AxiosResponse } from 'axios'
import { http } from '../lib/http'
import * as log4jui from '../lib/log4jui'
import { EnhancedRequest, JUILogger } from '../lib/models'
import { setHeaders } from '../lib/proxy'
import { Redaction } from './redactionModels'

// TODO: combine with emAnnoService

const logger: JUILogger = log4jui.getLogger('redaction-service')

/**
 * Get Redaction
 *
 * @param redactionPath
 * @returns {Promise<AxiosResponse>}
 */
export async function handleGet(redactionPath: string, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('getting redaction', redactionPath)
        const headers = setHeaders(req)
        const response = await http.get(redactionPath, { headers })
        return response
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}

/**
 * Post Redaction
 *
 * @param redactionPath
 * @param body
 * @returns {Promise<AxiosResponse>}
 */
export async function handlePost(redactionPath: string, body: Redaction, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('posting redaction', redactionPath)
        const headers = setHeaders(req)
        const response = await http.post(redactionPath, body, { headers })
        return response
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}

/**
 * Post Blob Redaction
 *
 * @param redactionPath
 * @param body
 * @returns {Promise<AxiosResponse>}
 */
export async function handlePostBlob(redactionPath: string, body: any, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('posting blob redaction', redactionPath)
        const headers = setHeaders(req)
        const response = await http.post(redactionPath, body, {
            headers,
            responseType: 'arraybuffer',
        })
        return response
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}

/**
 * Put Redaction
 *
 * @param redactionPath
 * @param body
 * @returns {Promise<AxiosResponse>}
 */
export async function handlePut(redactionPath: string, body: Redaction, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('putting redaction', redactionPath)
        const headers = setHeaders(req)
        const response = await http.put(redactionPath, body, { headers })
        return response
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}

/**
 * Delete Redaction
 *
 * @param redactionPath
 * @returns {Promise<AxiosResponse>}
 */
export async function handleDelete(redactionPath: string, req: EnhancedRequest): Promise<AxiosResponse> {

    try {
        logger.info('deleting redaction', redactionPath)
        const headers = setHeaders(req)
        const response = await http.delete(redactionPath, { headers })
        return response
    } catch (e) {
        logger.error(e.message)
        throw e
    }

}
