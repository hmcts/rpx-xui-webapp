import {getConfigValue} from '../configuration'
import { JURISDICTIONS } from '../configuration/references'

/**
 * Manually filtering returned jurisdictions
 * to make available jurisdiction in filters array only
 */
export const getJurisdictions = (proxyRes, req, res, data: any[]) => {
    if (!Array.isArray(data)) {
        return data
    }
    const filters = getConfigValue(JURISDICTIONS)
    req.session.jurisdictions = [...data].filter(o => filters.includes(o.id))
    return req.session.jurisdictions
}

export const checkCachedJurisdictions = (proxyReq, req, res) => {
    if (req.session.jurisdictions) {
        res.send(req.session.jurisdictions)
        proxyReq.end()
    }
}
