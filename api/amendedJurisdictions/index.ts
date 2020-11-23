import {getConfigValue} from '../configuration'
import { JURISDICTIONS } from '../configuration/references'

/**
 * Manually filtering returned jurisdictions
 * to make available jurisdiction in filters array only
 */
export const getJurisdictions = (data: any[]) => {
    if (!Array.isArray(data)) {
        return data
    }
    const filters = getConfigValue(JURISDICTIONS)
    return [...data].filter(o => filters.includes(o.id))
}
