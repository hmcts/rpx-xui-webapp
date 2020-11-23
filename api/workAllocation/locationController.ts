import { NextFunction, Response } from 'express'

import { EnhancedRequest } from '../lib/models'
import { handleLocationGet } from './locationService'
import { prepareGetLocationByIdUrl, prepareGetLocationsUrl } from './util'

export const baseUrl: string = 'http://localhost:8080'

/**
 * getLocation
 *
 * TODO: Unit test
 *
 * Get the location using the location id.
 */
export async function getLocationById(req: EnhancedRequest, res: Response, next: NextFunction) {

  try {

    const path: string = prepareGetLocationByIdUrl(baseUrl, req.params.locationId)

    const locationById = await handleLocationGet(path, req)

    res.status(200)
    res.send(locationById.data)
  } catch (error) {
    next(error)
  }
}

/**
 * Get locations
 *
 * TODO: Unit test
 */
export async function getLocations(req: EnhancedRequest, res: Response, next: NextFunction) {

  try {

    const path: string = prepareGetLocationsUrl(baseUrl)

    const locations = await handleLocationGet(path, req)

    res.status(200)
    res.send(locations.data)
  } catch (error) {
    next(error)
  }
}
