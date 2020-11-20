import * as express from 'express'
import {getConfigValue} from '../configuration'
import { JURISDICTIONS } from '../configuration/references'

/**
 * Manually filtering returned jurisdictions
 * to make available jurisdiction in filters array only
 */
export const getJurisdictions = (data: any[], req: express.Request, res: express.Response) => {
    const filters = getConfigValue(JURISDICTIONS)
    const amendedJurisdictions = [...data].filter(o => filters.includes(o.id))
    res.status(200).send(amendedJurisdictions)
}
