import { AxiosResponse } from 'axios'
import { http } from '../lib/http'
import * as log4jui from '../lib/log4jui'
import { EnhancedRequest, JUILogger } from '../lib/models'
import { setHeaders } from '../lib/proxy'

const logger: JUILogger = log4jui.getLogger('caseworker-service')
const MAX_RECORDS:number = 100

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

export async function handleCaseWorkerForService(path: string, req: EnhancedRequest): Promise<any> {
    logger.info('get caseworkers for Service', path)
    const headers = setHeaders(req)
    const response: AxiosResponse = await http.get(path, { headers })
    return response.data
}

export async function handleCaseWorkerForLocationAndService(path: string, req: EnhancedRequest): Promise<any> {
    logger.info('get caseworkers for Location and Service', path)
    const headers = setHeaders(req)
    const response: AxiosResponse = await http.get(path, { headers })
    return response.data
}

export async function handleCaseWorkerDetails(path: string, req: EnhancedRequest): Promise<any> {
    logger.info('get caseworkers Details', path)
    const headers = setHeaders(req)
    const response: AxiosResponse = await http.get(path, { headers })
    return response.data
}

export async function handlePostSearch(path: string, payload: string | any, req: EnhancedRequest): Promise<any> {
    logger.info('post search', payload)
    const headers = setHeaders(req)
    const response: AxiosResponse = await http.post(path, payload, { headers })
    return response
}

export async function handlePostRoleAssingnments(path: string, payload: any, req: EnhancedRequest): Promise<any> {
    const headers = setHeaders(req)
    headers['pageNumber'] = 0
    headers['size'] = MAX_RECORDS
    // sort 
    // direction
    const response: AxiosResponse = await http.post(path, payload, { headers })
    return response
}

export async function handlePostCaseWorkersRefData(path: string, userIds: any, req: EnhancedRequest): Promise<any> {
    const payload = {
        userIds
    }
    const headers = setHeaders(req)
    const response: AxiosResponse = await http.post(path, payload, { headers })
    return response
}

export function getUserIdsFromRoleApiResponse(response: any): Array<string> {
    let userIds = new Array<string>()
    if (response && response.roleAssignmentResponse) {
        response.roleAssignmentResponse.forEach(roleAssingment => {
           userIds = [...userIds, roleAssingment.actorId]
       });
    }
    return userIds
}
