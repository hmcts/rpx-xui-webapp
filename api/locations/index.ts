import { AxiosResponse } from 'axios';
import { NextFunction, Response } from 'express';
import { getConfigValue } from '../configuration';
import { SERVICE_REF_DATA_MAPPING, SERVICES_LOCATION_API_PATH } from '../configuration/references';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { Service } from '../staff-ref-data/models/staff-filter-option.model';
import { CourtVenue } from '../workAllocation/interfaces/location';
import { handleLocationGet } from '../workAllocation/locationService';
import { prepareGetSpecificLocationUrl } from '../workAllocation/util';
import { LocationTypeEnum } from './data/locationType.enum';
import { SERVICES_COURT_TYPE_MAPPINGS } from './data/serviceCourtType.mapping';
import { LocationModel } from './models/location.model';

// const url: string = getConfigValue(SERVICES_PRD_API_URL);
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
  let serviceIds = req.body.serviceIds;
  const locationType = req.body.locationType;
  const userLocations = req.body.userLocations ? req.body.userLocations : [];
  // stops locations from being gathered if they are base locations passed in without relevant services
  if ((!serviceIds || serviceIds.length === 0) && userLocations) {
    res.status(200).send([]);
  }
  if (typeof serviceIds === 'string') {
    serviceIds = serviceIds.split(',');
  }
  const courtTypeIds = getCourtTypeIdsByService(serviceIds);

  if (!isValidServiceId(serviceIds[0])) {
    serviceIds = getServiceIdsByService(serviceIds);
  }
  const markupPath: string = `${url}/refdata/location/court-venues/venue-search?search-string=${searchTerm}&court-type-id=${courtTypeIds}&service_code=${serviceIds}`;
  try {
    const headers = setHeaders(req);
    const response: AxiosResponse<any> = await http.get(markupPath, { headers });
    const containsServiceID = response.data.some((item) => Object.prototype.hasOwnProperty.call(item, 'service_id'));
    let results: LocationModel[] = response.data;
    if (locationType === LocationTypeEnum.HEARING) {
      results = results.filter((location) => location.is_hearing_location === 'Y');
    } else if (locationType === LocationTypeEnum.CASE_MANAGEMENT) {
      results = results.filter((location) => location.is_case_management_location === 'Y');
    }
    // if service not present all locations available for service
    // else check locations/regions, if there are none, provide no locations for service
    userLocations.forEach((userLocation) => {
      const courtTypes = getCourtTypeIdsByService([userLocation.service]);
      const locationIds = getLocationIdsFromLocationList(userLocation.locations);
      const regionIds = getRegionIdsFromLocationList(userLocation.locations);
      // when we are trying to filter out locations when booking location is present - my work
      if (containsServiceID) {
        results = filterOutResultsWhenServiceIdPresent(results, locationIds, regionIds);
      } else {
        results = filterOutResults(results, locationIds, regionIds, courtTypes);
      }
    });
    // Legacy API ignores service_code, so keep the court type cleanup for that response shape only.
    if (!containsServiceID) {
      results = results.filter((location) => courtTypeIds.includes(location.court_type_id));
    }
    response.data.results = results.filter(
      (locationInfo, index, self) => index === self.findIndex((location) => location.epimms_id === locationInfo.epimms_id)
    );

    res.status(response.status).send(response.data.results);
  } catch (error) {
    next(error);
  }
}

export function filterOutResults(
  locations: LocationModel[],
  locationIds: string[],
  regions: string[],
  courtTypes: string[]
): LocationModel[] {
  return locations.filter(
    (location) =>
      !courtTypes.includes(location.court_type_id) ||
      locationIds.includes(location.epimms_id) ||
      regions.includes(location.region_id)
  );
}

export function filterOutResultsWhenServiceIdPresent(
  locations: LocationModel[],
  locationIds: string[],
  regions: string[]
): LocationModel[] {
  return locations.filter((location) => locationIds.includes(location.epimms_id) || regions.includes(location.region_id));
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
      const id = location.locationId;
      const basePath = getConfigValue(SERVICES_LOCATION_API_PATH);
      const path: string = prepareGetSpecificLocationUrl(basePath, id);
      // no longer LocationResponse but CourtVenue
      const response: AxiosResponse<CourtVenue[]> = await handleLocationGet(path, req);
      const filteredResults = response.data.filter((courtVenue) => courtVenue.epimms_id === id.toString());
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
  if (!locations) {
    return [];
  }
  locations.forEach((location) => {
    if (location.id) {
      locationIds.push(location.id.toString());
    }
  });
  return locationIds;
}

function getRegionIdsFromLocationList(locations: any): string[] {
  const regionIds: string[] = [];
  if (!locations) {
    return [];
  }
  locations.forEach((region) => {
    if (region.regionId) {
      regionIds.push(region.regionId.toString());
    }
  });
  return regionIds;
}

function getCourtTypeIdsByService(serviceIdArray: string[]): string[] {
  const courtTypeIdsArray = serviceIdArray
    .map((serviceId) => SERVICES_COURT_TYPE_MAPPINGS[serviceId])
    .reduce(concatCourtTypeWithoutDuplicates, []);
  if (courtTypeIdsArray) {
    return courtTypeIdsArray;
  }
  return [''];
}

export function getServiceIdsByService(serviceIdArray: string[]): string[] {
  const serviceRefDataMappings = getConfigValue<Service[]>(SERVICE_REF_DATA_MAPPING) || [];
  const serviceCodesArray = serviceIdArray
    .map((serviceId) => serviceRefDataMappings.find((serviceMapping) => serviceMapping.service === serviceId)?.serviceCodes)
    .reduce(concatCourtTypeWithoutDuplicates, []);
  if (serviceCodesArray.length) {
    return serviceCodesArray;
  }
  return [''];
}

export function isValidServiceId(serviceId: string): boolean {
  return /^[A-Za-z]{3}\d$/.test(serviceId?.trim());
}

function concatCourtTypeWithoutDuplicates<T>(array1: T[], array2: T[]) {
  array1 = array1 ? array1 : [];
  array2 = array2 ? array2 : [];
  return array1.concat(array2.filter((item) => !array1.includes(item)));
}

function mapCourtVenuesToLocationModels(courtVenues: CourtVenue[]): CourtVenue {
  return courtVenues[0];
}
