import {JURISDICTION_SERVICES_MAPPINGS, SERVICE_COURT_TYPE_MAPPINGS} from "./mapping";

export function getServicesByJurisdiction(jurisdictionIdArray: string[]): string[] {
  const serviceIdsArray = jurisdictionIdArray.map(jurisdictionId => JURISDICTION_SERVICES_MAPPINGS[jurisdictionId])
    .reduce(concatWithoutDuplicates);
  return serviceIdsArray;
}

export function getCourtTypeIdsByServices(ServicesIdArray: string[]): string[] {
  const courtTypeIdArray = ServicesIdArray.map(serviceId => SERVICE_COURT_TYPE_MAPPINGS[serviceId])
    .reduce(concatWithoutDuplicates);
  return courtTypeIdArray;
}

export function getCourtTypeIdsByJurisdiction(jurisdictionIdArray: string[]): string {
  const courtTypeIdArray = getCourtTypeIdsByServices(getServicesByJurisdiction(jurisdictionIdArray));
  return courtTypeIdArray ? courtTypeIdArray.join(',') : '';
}

function concatWithoutDuplicates(array1: number[], array2: number[]) {
  return array1.concat(array2.filter(item => array1.indexOf(item) < 0));
}
