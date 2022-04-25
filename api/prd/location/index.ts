import {NextFunction, Response} from 'express';
import {handleGet} from '../../common/crudService';
import {getConfigValue} from '../../configuration';
import {SERVICES_PRD_LOCATION_API} from '../../configuration/references';
import {EnhancedRequest} from '../../lib/models';
import {getCourtTypeIdsByServices} from '../mappings.utils';
import {LocationTypeEnum} from './data/locationType.enum';
import {LocationModel, toEpimmsLocation} from './models/location.model';

const url: string = getConfigValue(SERVICES_PRD_LOCATION_API);

/**
 * @description getLocations from service ID/location type/search term
 * @overview API sample: /api/locations/getLocations?serviceIds=BBA3,BFA1&locationType=hearing&searchTerm=CT91RL
 * @example serviceIds = BBA3 | BBA3,BFA1 split with ','
 * @example locationType = optional | hearing | case_management
 * @example searchTerm = any search term for postcode | site name | venue name |court name | court address etc.
 */
export async function getLocations(req: EnhancedRequest, res: Response, next: NextFunction) {
  // @ts-ignore
  const searchTerm = req.query.searchTerm;
  const serviceIds = req.query.serviceIds;
  const locationType = req.query.locationType;
  const serviceIdArray = serviceIds.split(',');
  const courtTypeIdsArray: string[] = getCourtTypeIdsByServices(serviceIdArray);
  const strCourtTypeIds = courtTypeIdsArray ? courtTypeIdsArray.join(',') : '';
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
    const identicalLocationByEpimmsId = getIdenticalLocationByEpimmsId(result);
    res.status(status).send(identicalLocationByEpimmsId);
  } catch (error) {
    next(error);
  }
}

/**
 * Gets court location
 * @description getLocationById from epimms_id
 * @overview API sample: /api/locations/court-venues?epimms_id=812332,196538,372653
 */
export async function getLocationById(req: EnhancedRequest, res: Response, next: NextFunction) {
  const epimmsID = req.query.epimms_id;
  const markupPath: string = `${url}/refdata/location/court-venues?epimms_id=${epimmsID}`;
  try {
    const {status, data}: { status: number, data: LocationModel[] } = await handleGet(markupPath, req, next);
    const identicalLocationByEpimmsId = getIdenticalLocationByEpimmsId(data);
    res.status(status).send(identicalLocationByEpimmsId);
  } catch (error) {
    next(error);
  }
}

function getIdenticalLocationByEpimmsId(data: LocationModel[]) {
  return data.map(locationModel => toEpimmsLocation(locationModel))
    .filter((locationByEPIMSModel, index, locationByEPIMSModelArray) =>
      locationByEPIMSModelArray.findIndex(location => (location.epimms_id === locationByEPIMSModel.epimms_id)) === index);
}
