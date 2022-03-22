import {JURISDICTION_SERVICES_MAPPINGS, SERVICE_COURT_TYPE_MAPPINGS} from './mappings.data';

export function getServicesByJurisdiction(jurisdictionIdArray: string[]): string[] {
  return jurisdictionIdArray.map(jurisdictionId => JURISDICTION_SERVICES_MAPPINGS[jurisdictionId])
    .reduce(concatWithoutDuplicates);
}

export function getCourtTypeIdsByServices(ServicesIdArray: string[]): string[] {
  return ServicesIdArray.map(serviceId => SERVICE_COURT_TYPE_MAPPINGS[serviceId])
    .reduce(concatWithoutDuplicates);
}

export function getCourtTypeIdsByJurisdiction(jurisdictionIdArray: string[]): string[] {
  return getCourtTypeIdsByServices(getServicesByJurisdiction(jurisdictionIdArray));
}

function concatWithoutDuplicates(array1: number[], array2: number[]) {
  return array1.concat(array2.filter(item => array1.indexOf(item) < 0));
}
