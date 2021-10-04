import { NextFunction, Response } from 'express';
import { getConfigValue } from '../configuration';
import { SERVICES_LOCATION_API_PATH } from '../configuration/references';
import { EnhancedRequest } from '../lib/models';
import { handleLocationGet } from './locationService';
import { prepareGetLocationByIdUrl, prepareGetLocationsUrl } from './util';

export const baseUrl: string = 'http://localhost:8080';

/**
 * getLocation
 *
 * Get the location using the location id.
 */
export async function getLocationById(req: EnhancedRequest, res: Response, next: NextFunction) {

  try {

    const path: string = prepareGetLocationByIdUrl(baseUrl, req.params.locationId);
    /*TODO: Implement get location*/
    const locationById = await handleLocationGet(path, req);

    res.status(200);
    res.send(locationById.data);
  } catch (error) {
    next(error);
  }
}

/**
 * Get locations
 *
 */
export async function getLocations(req: EnhancedRequest, res: Response, next: NextFunction) {

  try {
    const basePath = getConfigValue(SERVICES_LOCATION_API_PATH);
    const path: string = prepareGetLocationsUrl(basePath);
    const locations = await handleLocationGet(path, req);

    res.status(200);
    res.send(mapLocations(locations.data.court_venues));
  } catch (error) {
    next(error);
  }
}

function mapLocations(venues: Array<{epimms_id, site_name}>) {
  const locations = [];
  venues.forEach(venue => locations.push({
                              id: venue.epimms_id,
                              locationName: venue.site_name,
                            }));
  return locations;
}
