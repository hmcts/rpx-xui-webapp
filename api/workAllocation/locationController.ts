import { NextFunction, Response } from 'express'

import { EnhancedRequest } from '../lib/models'
import { handleLocationGet } from './locationService'
import { prepareGetLocationUrl } from './util'

export const baseUrl: string = 'http://localhost:8080'

/**
 * getLocation
 *
 * Get the location using the location id.
 */
export async function getLocation(req: EnhancedRequest, res: Response, next: NextFunction) {

  try {
    const locationPath: string = prepareGetLocationUrl(baseUrl, req.params.locationId)

    const jsonResponse = await handleLocationGet(locationPath, req)
    res.status(200)
    res.send(jsonResponse)
  } catch (error) {
    next(error)
  }
}
