import { AxiosResponse } from 'axios';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { CourtVenue } from './interfaces/location';

export async function handleLocationGet(fullPath: string, req: EnhancedRequest): Promise<AxiosResponse<CourtVenue[]>> {
  const headers = setHeaders(req);
  const response = await http.get<CourtVenue[]>(fullPath, {headers});
  return response;
}
