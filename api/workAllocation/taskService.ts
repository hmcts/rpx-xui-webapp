import { AxiosInstance, AxiosResponse } from 'axios';
import { HttpMock } from '../common/httpMock';
import { http } from '../lib/http';
import * as log4jui from '../lib/log4jui';
import { EnhancedRequest, JUILogger } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { TaskList } from './interfaces/task';
import { handlePost } from './util';

const httpMock: AxiosInstance = HttpMock.getInstance();
const logger: JUILogger = log4jui.getLogger('task-service');

export async function handleTaskGet(path: string, req: EnhancedRequest): Promise<any> {
  logger.info('getting tasks for', path);
  const headers = setHeaders(req);
  const accept = 'Accept';
  const contentType = 'Content-Type';
  delete headers[accept];
  headers[contentType] = 'application/json';
  const response: AxiosResponse = await http.get(path, { headers });
  return response.data;
}

export async function handleTaskRolesGet(path: string, req: EnhancedRequest): Promise<any> {
  logger.info('getting task Roles for', path);
  const headers = setHeaders(req);
  const accept = 'Accept';
  const contentType = 'Content-Type';
  delete headers[accept];
  headers[contentType] = 'application/json';
  const response: AxiosResponse = await http.get(path, { headers });
  return response;
}

export async function handleTaskSearch(path: string, payload: any, req: EnhancedRequest): Promise<any> {
  logger.info('search task for', JSON.stringify(payload));
  const headers = setHeaders(req);
  return await http.post(path, payload, { headers });
}

export async function handleTaskPost(path: string, payload: any, req: EnhancedRequest): Promise<any> {
  logger.info('posting tasks for', path);
  // Return the whole response, not just the data, so we can
  // see what the status of the response is.
  return await handlePost(path, payload, req);
}

export async function handlePostSearch(path: string, payload: string | any, req: EnhancedRequest): Promise<any> {
  logger.info('post search', payload);
  const headers = setHeaders(req);
  const response: AxiosResponse = await http.post(path, payload, { headers });
  return response;
}

export async function handleGetTasksByCaseId(path: string, req: EnhancedRequest): Promise<any> {
  logger.info('getting tasks for', path);
  const headers = setHeaders(req);
  return await httpMock.get<TaskList>(path, { headers });
}
