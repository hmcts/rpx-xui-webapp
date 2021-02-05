import { AxiosResponse } from 'axios'

import { http } from '../lib/http'
import * as log4jui from '../lib/log4jui'
import { EnhancedRequest, JUILogger } from '../lib/models'
import { setHeaders } from '../lib/proxy'
import { ALL_LOCATIONS } from './constants/locations'

// TODO: task-service or work-allocation-service?
const logger: JUILogger = log4jui.getLogger('task-service')

export async function handleLocationGet(path: string, req: EnhancedRequest): Promise<any> {
    const response = { 
                      data: ALL_LOCATIONS
                    }
    return response
}
