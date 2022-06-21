import { AxiosResponse } from 'axios';
import { getConfigValue } from '../configuration';
import { SERVICES_LOCATION_API_PATH } from '../configuration/references';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { prepareGetLocationsUrl } from './util';
import { CourtVenue } from './interfaces/location';

export async function handleLocationGet(fullPath: string, req: EnhancedRequest): Promise<AxiosResponse<CourtVenue[]>> {
  const headers = setHeaders(req);
  const response = await http.get<CourtVenue[]>(fullPath, {headers});
  return response;
}

export async function commonGetFullLocation(req: EnhancedRequest) {
  const basePath = getConfigValue(SERVICES_LOCATION_API_PATH);
  const path: string = prepareGetLocationsUrl(basePath);
  const response = await handleLocationGet(path, req);
  return response;
}
