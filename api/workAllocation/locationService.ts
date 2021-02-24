import { AxiosResponse } from 'axios'

import { http } from '../lib/http'
import * as log4jui from '../lib/log4jui'
import { EnhancedRequest, JUILogger } from '../lib/models'
import { setHeaders } from '../lib/proxy'

// TODO: task-service or work-allocation-service?
const logger: JUILogger = log4jui.getLogger('task-service')

export async function handleLocationGet(path: string, req: EnhancedRequest): Promise<any> {
    logger.info('get location for', path)
    const headers = setHeaders(req)

    const response: AxiosResponse = await http.get(path, { headers })
    return response
}
