import { AxiosResponse } from 'axios';
import { NextFunction, Response } from 'express';
import { getConfigValue } from '../configuration';
import { SERVICES_LOCATION_API_PATH } from '../configuration/references';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { CourtVenue } from '../workAllocation2/interfaces/location';
import { handleLocationGet } from '../workAllocation2/locationService';
import { prepareGetLocationsUrl } from '../workAllocation2/util';
import { LocationTypeEnum } from './data/locationType.enum';
import { SERVICES_COURT_TYPE_MAPPINGS } from './data/serviceCourtType.mapping';
import { LocationModel } from './models/location.model';

const url: string = getConfigValue(SERVICES_LOCATION_API_PATH);

/**
 * @description getLocations from service ID/location type/search term
 * @overview API sample: /api/locations/getLocations?serviceIds=SSCS,IA&locationType=hearing&searchTerm=CT91RL
 * @example service = SSCS | SSCS,IA split with ','
 * @example locationType = optional | hearing | case_management
 * @example searchTerm = any search term for postcode | site name | venue name |court name | court address etc.
 */
export async function getLocations(req: EnhancedRequest, res: Response, next: NextFunction) {
  const searchTerm = req.query.searchTerm;
  const serviceIds = req.query.serviceIds;
  const locationType = req.query.locationType;
  const serviceIdArray = serviceIds.split(',');
  const courtTypeIds = getCourtTypeIdsByService(serviceIdArray);
  // tslint:disable-next-line:max-line-length
  const markupPath: string = `${url}/refdata/location/court-venues/venue-search?search-string=${searchTerm}&court-type-id=${courtTypeIds}`;
  // const markupPath: string = `${url}/refdata/location/court-venues/venue-search?search-string=${searchTerm}`;
  try {
    const headers = setHeaders(req);
    const response: AxiosResponse<any> = await http.get(markupPath, { headers });
    let result: LocationModel[] = response.data;
    if (locationType === LocationTypeEnum.HEARING) {
      result = result.filter(location => location.is_hearing_location === 'Y');
    } else if (locationType === LocationTypeEnum.CASE_MANAGEMENT) {
      result = result.filter(location => location.is_case_management_location === 'Y');
    }
    res.status(response.status).send(result);
  } catch (error) {
    next(error);
  }
}

/**
 * Get locations
 *
 */
export async function getLocationsById(req: EnhancedRequest, res: Response, next: NextFunction) {
  const id = req.query.ids;
  try {
    const basePath = getConfigValue(SERVICES_LOCATION_API_PATH);
    const path: string = prepareGetLocationsUrl(basePath);
    const response = await handleLocationGet(path, req);
    const filteredResults = response.data.court_venues.filter(courtVenue =>
      courtVenue.epimms_id === id
    );
    const mappedLocationModel = mapCourtVenuesToLocationModels(filteredResults);
    res.send(mappedLocationModel).status(response.status);
  } catch (error) {
    next(error);
  }
}

function getCourtTypeIdsByService(serviceIdArray: string[]): string {
  const courtTypeIdsArray = serviceIdArray.map(serviceId => SERVICES_COURT_TYPE_MAPPINGS[serviceId])
    .reduce(concatCourtTypeWithoutDuplicates);
  if (courtTypeIdsArray) {
    return courtTypeIdsArray.join(',');
  }
  return '';
}

function concatCourtTypeWithoutDuplicates(array1: number[], array2: number[]) {
  return array1.concat(array2.filter(item => array1.indexOf(item) < 0));
}

function mapCourtVenuesToLocationModels(courtVenues: CourtVenue[]): CourtVenue {
  return courtVenues[0];
}
