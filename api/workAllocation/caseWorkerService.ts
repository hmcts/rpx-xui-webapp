import { AxiosResponse } from 'axios'
import { http } from '../lib/http'
import * as log4jui from '../lib/log4jui'
import { EnhancedRequest, JUILogger } from '../lib/models'
import { setHeaders } from '../lib/proxy'

const logger: JUILogger = log4jui.getLogger('task-service')

export async function handleCaseWorkerGetAll(path: string, req: EnhancedRequest): Promise<any> {
    logger.info('getting all caseworkers for', path)
    const headers = setHeaders(req)
    const response: AxiosResponse = await http.get(path, { headers })
    return response.data
}

export async function handleCaseWorkerForLocation(path: string, req: EnhancedRequest): Promise<any> {
    logger.info('get caseworkers for Location', path)
    const headers = setHeaders(req)
    const response: AxiosResponse = await http.get(path, { headers })
    return response.data
}
