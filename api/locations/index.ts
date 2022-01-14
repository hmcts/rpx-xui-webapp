import { NextFunction, Response } from 'express';
import { handleGet } from '../common/mockService';
import { getConfigValue } from '../configuration';
import { SERVICES_PRD_API_URL } from '../configuration/references';
import { EnhancedRequest } from '../lib/models';
import * as mock from '../locations/location.mock';
import { LocationTypeEnum } from './data/locationType.enum';
import { SERVICES_COURT_TYPE_MAPPINGS } from './data/serviceCourtType.mapping';
import { LocationModel } from './models/location.model';

mock.init();

const url: string = getConfigValue(SERVICES_PRD_API_URL);

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
  try {
    const { status, data }: { status: number, data: LocationModel[] } = await handleGet(markupPath, req);
    let result: LocationModel[] = data;
    if (locationType === LocationTypeEnum.HEARING) {
      result = data.filter(location => location.is_hearing_location === 'Y');
    } else if (locationType === LocationTypeEnum.CASE_MANAGEMENT) {
      result = data.filter(location => location.is_case_management_location === 'Y');
    }
    res.status(status).send(result);
  } catch (error) {
    next(error);
  }
}

export async function getLocationsById(req: EnhancedRequest, res: Response, next: NextFunction) {
  const ids = req.query.ids;
  const path: string = `${url}/refdata/location/court-locations?epimms_id={}`;
  try {
    const { status, data } = await handleGet(path.replace('{}', ids), req);
    res.status(status).send(data);
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
