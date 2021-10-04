import { AxiosResponse } from 'axios';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { setHeaders } from '../lib/proxy';

export async function handleLocationGet(fullPath: string, req: EnhancedRequest): Promise<any> {
  const headers = setHeaders(req);
  const response: AxiosResponse = await http.get(fullPath, {headers});
  return response;
}
