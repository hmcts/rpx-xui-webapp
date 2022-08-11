import { AxiosResponse } from 'axios';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { LocationResponse } from './interfaces/location';

export async function handleLocationGet(fullPath: string, req: EnhancedRequest): Promise<AxiosResponse<LocationResponse>> {
  const headers = setHeaders(req);
  const response = await http.get<LocationResponse>(fullPath, {headers});
  return response;
}
