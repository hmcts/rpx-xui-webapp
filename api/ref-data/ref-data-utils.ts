import { getConfigValue } from '../configuration';
import { SERVICE_REF_DATA_MAPPING } from '../configuration/references';

export function getServiceRefDataMappingList(): any {
  try {
    return getConfigValue(SERVICE_REF_DATA_MAPPING);
  } catch (error) {
    console.log(error);
  }
}
