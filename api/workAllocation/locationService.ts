import { AxiosResponse } from 'axios'

import { http } from '../lib/http'
import * as log4jui from '../lib/log4jui'
import { EnhancedRequest, JUILogger } from '../lib/models'
import { setHeaders } from '../lib/proxy'

// TODO: task-service or work-allocation-service?
const logger: JUILogger = log4jui.getLogger('task-service')

export async function handleLocationGet(path: string, req: EnhancedRequest): Promise<any> {
    const response = { 
                      data: [
                        {  id: '231596', locationName: 'BIRMINGHAM'},
                        {  id: '698118', locationName: 'BRADFORD'},
                        {  id: '198444', locationName: 'GLASGOW'},
                        {  id: '386417', locationName: 'HATTON_CROSS'},
                        {  id: '512401', locationName: 'MANCHESTER'},
                        {  id: '227101', locationName: 'NEWPORT'},
                        {  id: '765324', locationName: 'TAYLOR_HOUSE'},
                        {  id: '562808', locationName: 'NORTH_SHIELDS'},
                     ]
                    }
    return response
}
