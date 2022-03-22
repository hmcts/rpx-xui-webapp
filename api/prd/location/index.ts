import {NextFunction, Response} from 'express';
import {handleGet} from '../../common/crudService';
import {getConfigValue} from '../../configuration';
import {SERVICES_PRD_LOCATION_API} from '../../configuration/references';
import {EnhancedRequest} from '../../lib/models';
import {getCourtTypeIdsByJurisdiction} from '../utils/mapping.utils';
import {LocationTypeEnum} from './data/locationType.enum';
import {LocationModel} from './models/location.model';

const url: string = getConfigValue(SERVICES_PRD_LOCATION_API);

/**
 * @description getLocations from service ID/location type/search term
 * @overview API sample: /api/locations/getLocations?serviceIds=SSCS,IA&locationType=hearing&searchTerm=CT91RL
 * @example jurisdiction = SSCS | SSCS,IA split with ','
 * @example locationType = optional | hearing | case_management
 * @example searchTerm = any search term for postcode | site name | venue name |court name | court address etc.
 */
export async function getLocations(req: EnhancedRequest, res: Response, next: NextFunction) {
  // @ts-ignore
  const searchTerm = req.query.searchTerm;
  const jurisdictionIds = req.query.serviceIds;
  const locationType = req.query.locationType;
  const jurisdictionIdArray = jurisdictionIds.split(',');
  const strCourtTypeIds: string = getCourtTypeIdsByJurisdiction(jurisdictionIdArray);
  // tslint:disable-next-line:max-line-length
  const markupPath: string = `${url}/refdata/location/court-venues/venue-search?search-string=${searchTerm}&court-type-id=${strCourtTypeIds}`;
  try {
    const {status, data}: { status: number, data: LocationModel[] } = await handleGet(markupPath, req, next);
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

/**
 * Gets court locations
 * @description getCourtLocations from epimms_id
 * @overview API sample: /api/locations/court-locations?epimms_id=812332
 */
export async function getCourtLocations(req: EnhancedRequest, res: Response, next: NextFunction) {
  const epimmsID = req.query.epimms_id;
  const markupPath: string = `${url}/refdata/location/court-locations?epimms_id=${epimmsID}`;
  try {
    const {status, data}: { status: number, data: LocationModel } = await handleGet(markupPath, req, next);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
