import { AxiosResponse } from 'axios';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { setHeaders } from '../lib/proxy';

export async function handleLocationGet(fullPath: string, req: EnhancedRequest): Promise<AxiosResponse<any>> {
  const headers = setHeaders(req);
  const response = await http.get<any>(fullPath, {headers});
  return response;
}
