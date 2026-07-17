import { NextFunction, Response } from 'express';
import { EnhancedRequest } from '../lib/models';
import { CourtVenue, Location } from './interfaces/location';
import { commonGetFullLocation, getRegionLocationsForServices } from './locationService';

/**
 * Get locations
 *
 */
export async function getLocations(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const response = await commonGetFullLocation(req, true);
    res.send(response).status(200);
  } catch (error) {
    next(error);
  }
}

/**
 * Get locations
 *
 */
export async function getFullLocations(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const response = await commonGetFullLocation(req, false);
    res.send(response).status(200);
  } catch (error) {
    next(error);
  }
}

/**
 * Get locations by region
 *
 */
export async function getLocationsByRegion(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const response = await getRegionLocationsForServices(req);
    res.send(response).status(200);
  } catch (error) {
    next(error);
  }
}

export function mapLocations(venues: CourtVenue[]): Location[] {
  const locations = [];
  venues.forEach((venue) =>
    locations.push({
      id: venue.epimms_id,
      locationName: venue.site_name,
    })
  );
  return locations;
}
