import { AxiosResponse } from 'axios'
import { http } from '../lib/http'
import * as log4jui from '../lib/log4jui'
import { EnhancedRequest, JUILogger } from '../lib/models'
import { setHeaders } from '../lib/proxy'

const logger: JUILogger = log4jui.getLogger('location-service')

export async function handleLocationGet(path: string, req: EnhancedRequest): Promise<any> {
  logger.info('getting location for', path)
  const headers = setHeaders(req)
  const response: AxiosResponse = await http.get(path, { headers })
  return response.data
}

export async function handleLocationGetAll(path: string, req: EnhancedRequest): Promise<any> {
  logger.info('getting all locations for', path)
  const headers = setHeaders(req)
  const response: AxiosResponse = await http.get(path, { headers })
  return response.data
}

export async function handleLocationPost(path: string, payload: any, req: EnhancedRequest): Promise<any> {
  logger.info('posting locations for', path)
  const headers = setHeaders(req)
  const response: AxiosResponse = await http.post(path, payload, { headers })
  // Return the whole response, not just the data, so we can
  // see what the status of the response is.
  return response
}

