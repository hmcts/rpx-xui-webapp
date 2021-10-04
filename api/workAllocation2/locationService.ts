import { AxiosResponse } from 'axios';
import { getConfigValue } from '../configuration';
import { SERVICES_LOCATION_API_PATH } from '../configuration/references';
import { http } from '../lib/http';
import { setHeaders } from '../lib/proxy';
import {EnhancedRequest} from '../lib/models';

export async function handleLocationGet(path: string, req: EnhancedRequest): Promise<any> {
  const basePath = getConfigValue(SERVICES_LOCATION_API_PATH);
  const fullPath = `${basePath}/refdata/location/court-venue/services?service_code=BFA1`;
  const headers = setHeaders(req);
  const response: AxiosResponse = await http.get(fullPath, {headers});
  return response;
}
