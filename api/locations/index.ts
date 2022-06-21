import { NextFunction, Response } from 'express';
import { AxiosResponse } from 'axios';
import { http } from '../lib/http';
import { setHeaders } from '../lib/proxy';
import { getConfigValue } from '../configuration';
import { SERVICES_LOCATION_API_PATH } from '../configuration/references';
import { EnhancedRequest } from '../lib/models';
import { LocationTypeEnum } from './data/locationType.enum';
import { SERVICES_COURT_TYPE_MAPPINGS } from './data/serviceCourtType.mapping';
import { LocationModel } from './models/location.model';
import { CourtVenue } from '../workAllocation2/interfaces/location';
import { handleLocationGet } from '../workAllocation2/locationService';
import { prepareGetSpecificLocationUrl } from '../workAllocation2/util';


// const url: string = getConfigValue(SERVICES_PRD_API_URL);
// TODO: CAM_BOOKING - check this
const url: string = getConfigValue(SERVICES_LOCATION_API_PATH);

/**
 * @description getLocations from service ID/location type/search term
 * @overview API sample: /api/locations/getLocations?serviceIds=SSCS,IA&locationType=hearing&searchTerm=CT91RL
 * @example service = SSCS | SSCS,IA split with ','
 * @example locationType = optional | hearing | case_management
 * @example searchTerm = any search term for postcode | site name | venue name |court name | court address etc.
 */
export async function getLocations(req: EnhancedRequest, res: Response, next: NextFunction) {
  const searchTerm = req.body.searchTerm;
  const serviceIds = req.body.serviceIds;
  const locationType = req.body.locationType;
  const userLocations = req.body.userLocations;
  // stops locations from being gathered if they are base locations passed in without relevant services
  if ((!serviceIds || serviceIds.length === 0) && userLocations) {
    res.status(200).send([]);
  }
  const serviceIdArray = serviceIds.split(',');
  const courtTypeIds = getCourtTypeIdsByService(serviceIdArray);
  // tslint:disable-next-line:max-line-length
  const markupPath: string = `${url}/refdata/location/court-venues/venue-search?search-string=${searchTerm}&court-type-id=${courtTypeIds}`;

  try {
    const headers = setHeaders(req);
    const response: AxiosResponse<any> = await http.get(markupPath, { headers });
    let results: LocationModel[] = response.data;
    if (locationType === LocationTypeEnum.HEARING) {
      results = results.filter(location => location.is_hearing_location === 'Y');
    } else if (locationType === LocationTypeEnum.CASE_MANAGEMENT) {
      results = results.filter(location => location.is_case_management_location === 'Y');
    }
    // add in check to make sure user only able to select base locations if specified
    userLocations.forEach(userLocation => {
      const courtTypes = getCourtTypeIdsByService([userLocation.service]);
      const locationIds = getLocationIdsFromLocationList(userLocation.locations);
      results = results.filter(thisResult => !(courtTypes.includes(thisResult.court_type_id))
       || locationIds.includes(thisResult.epimms_id));
    })
    res.status(response.status).send(results);
  } catch (error) {
    next(error);
  }

}

/**
 * Get locations
 *
 */
export async function getLocationsById(req: EnhancedRequest, res: Response, next: NextFunction) {
  const locations = req.body.locations;
  try {
    const locationModels = [];
    let responseStatus;
    for (const location of locations) {
      const id = location.id;
      const basePath = getConfigValue(SERVICES_LOCATION_API_PATH);
      const path: string = prepareGetSpecificLocationUrl(basePath, id);
      // no longer LocationResponse but CourtVenue
      const response: AxiosResponse<CourtVenue[]> = await handleLocationGet(path, req);
      const filteredResults = response.data.filter(courtVenue =>
        courtVenue.epimms_id === id.toString()
      );
      const mappedLocationModel = mapCourtVenuesToLocationModels(filteredResults);
      locationModels.push(mappedLocationModel);
      responseStatus = response.status;
    }
    res.send(locationModels).status(responseStatus);
  } catch (error) {
    next(error);
  }
}

function getLocationIdsFromLocationList(locations: any): string[] {
  const locationIds: string[] = [];
  locations.forEach(location => {
    locationIds.push(location.id.toString());
  });
  return locationIds;
}

function getCourtTypeIdsByService(serviceIdArray: string[]): string[] {
  const courtTypeIdsArray = serviceIdArray.map(serviceId => SERVICES_COURT_TYPE_MAPPINGS[serviceId])
    .reduce(concatCourtTypeWithoutDuplicates);
  if (courtTypeIdsArray) {
    return courtTypeIdsArray;
  }
  return [''];
}

function concatCourtTypeWithoutDuplicates(array1: number[], array2: number[]) {
  return array2 ? array1.concat(array2.filter(item => array1.indexOf(item) < 0)) : array1;
}

function mapCourtVenuesToLocationModels(courtVenues: CourtVenue[]): CourtVenue {
  return courtVenues[0];
}
