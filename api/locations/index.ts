import { NextFunction, Response } from 'express';
import { handleGet } from '../common/mockService';
import { getConfigValue } from '../configuration';
import { SERVICES_PRD_API_URL} from '../configuration/references';
import { EnhancedRequest } from '../lib/models';
import * as mock from '../locations/location.mock';
import {LocationTypeEnum} from "./data/locationType.enum";
import {SERVICES_COURT_TYPE_MAPPINGS} from "./data/serviceCourtType.mapping";
import {LocationModel} from "./models/location.model";

mock.init();

const url: string = getConfigValue(SERVICES_PRD_API_URL);

/**
 * getHearings from case ID
 */
export async function getLocations(req: EnhancedRequest, res: Response, next: NextFunction) {
  // API sample: /api/locations/getLocations?service=SSCS&locationType=hearing&searchTerm=CT9 1RL
  // service=SSCS|IA etc.
  // locationType=hearing|case_management (only these two location type is allowed currently)
  // searchTerm=any search term for postcode/site name/venue name/court name/court address etc.
  // @ts-ignore
  const searchTerm = req.query.searchTerm;
  const service = req.query.service;
  const locationType = req.query.locationType;
  const courtTypeIds = getCourtTypeIdsByService(service);
  // tslint:disable-next-line:max-line-length
  const markupPath: string = `${url}/refdata/location/court-venues/venue-search?search-string=${searchTerm}&court-type-id=${courtTypeIds}`;
  try {
    const {status, data}: { status: number, data: LocationModel[] } = await handleGet(markupPath, req);
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

function getCourtTypeIdsByService(service: string): string {
  const courtTypeIdsArray: [] = SERVICES_COURT_TYPE_MAPPINGS[service];
  if (courtTypeIdsArray) {
    return courtTypeIdsArray.join(',');
  }
  return '';
}
