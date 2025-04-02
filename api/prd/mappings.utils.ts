import { SERVICES_COURT_TYPE_MAPPINGS } from '../locations/data/serviceCourtType.mapping';

export function getCourtTypeIdsByServices(ServicesIdArray: string[]): string[] {
  return ServicesIdArray.map((serviceId) => SERVICES_COURT_TYPE_MAPPINGS[serviceId])
    .reduce(concatWithoutDuplicates);
}

function concatWithoutDuplicates(array1: number[], array2: number[]) {
  return array1.concat(array2.filter((item) => array1.indexOf(item) < 0));
}
