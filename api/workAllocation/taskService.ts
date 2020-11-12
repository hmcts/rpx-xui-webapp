import { AxiosResponse } from 'axios'

import { http } from '../lib/http'
import * as log4jui from '../lib/log4jui'
import { EnhancedRequest, JUILogger } from '../lib/models'
import { setHeaders } from '../lib/proxy'
import { SearchTaskRequest } from '../workAllocation/interfaces/taskSearchParameter'

const logger: JUILogger = log4jui.getLogger('task-service')

export async function handleTaskGet(path: string, req: EnhancedRequest): Promise<any> {
    logger.info('getting tasks for', path)
    const headers = setHeaders(req)
    const response: AxiosResponse = await http.get(path, { headers })
    return response.data
}

export async function taskPost(path: string, payload: SearchTaskRequest | any, req: EnhancedRequest): Promise<any> {
    logger.info('post task for', payload)
    const headers = setHeaders(req)
    const response: AxiosResponse = await http.post(path, payload, { headers })
    return response
}

export async function handleTaskPost(path: string, payload: any, req: EnhancedRequest): Promise<any> {
    logger.info('posting tasks for', path)
    const headers = setHeaders(req)
    const response: AxiosResponse = await http.post(path, payload, { headers })
    // Return the whole response, not just the data, so we can
    // see what the status of the response is.
    return response
}

export async function handleUnClaimPost(path: string, req: EnhancedRequest): Promise<any> {
    const headers = setHeaders(req)
    const response: AxiosResponse = await http.post(path, { headers })
    return response
}

export async function handleClaimPost(path: string, req: EnhancedRequest): Promise<any> {
    const headers = setHeaders(req)
    const response: AxiosResponse = await http.post(path, { headers })
    return response
}
