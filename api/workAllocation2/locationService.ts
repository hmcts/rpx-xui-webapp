import { AxiosResponse } from 'axios';
import { getConfigValue } from '../configuration';
import { SERVICES_LOCATION_API_PATH } from '../configuration/references';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { prepareGetLocationsUrl } from './util';

export async function handleLocationGet(fullPath: string, req: EnhancedRequest): Promise<AxiosResponse<any>> {
  const headers = setHeaders(req);
  const response = await http.get<any>(fullPath, {headers});
  return response;
}

export async function commonGetFullLocation(req: EnhancedRequest) {
  const basePath = getConfigValue(SERVICES_LOCATION_API_PATH);
  const path: string = prepareGetLocationsUrl(basePath);
  const response = await handleLocationGet(path, req);
  return response;
}
