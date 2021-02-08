import { EnhancedRequest } from '../lib/models'
import { ALL_LOCATIONS } from './constants/locations'

export async function handleLocationGet(path: string, req: EnhancedRequest): Promise<any> {
    const response = {
                      data: ALL_LOCATIONS,
                    }
    return response
}
