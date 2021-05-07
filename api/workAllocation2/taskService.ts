import { AxiosResponse } from 'axios';

import { http } from '../lib/http';
import * as log4jui from '../lib/log4jui';
import { EnhancedRequest, JUILogger } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { Task } from './interfaces/task';
import { workAllocation2Tasks } from './mocks/tasks';
import { getNodeIdFromPath, getTask } from './util';

const logger: JUILogger = log4jui.getLogger('task-service');

export async function handleTaskGet(path: string, req: EnhancedRequest): Promise<Partial<Task>> {
  logger.info('getting task for', path);
  const nodeId = getNodeIdFromPath(path);
  // const headers = setHeaders(req);
  // const response: AxiosResponse = await http.get(path, {headers});
  // return response.data.task as unknown as Task;
  return getTask(nodeId, workAllocation2Tasks.tasks);
}

export async function handleTaskSearch(
  path: string,
  payload: any,
  req: EnhancedRequest
): Promise<AxiosResponse<{ [p: string]: Array<Partial<Task>> }>> {
  logger.info('search task for', payload);
  // const headers = setHeaders(req);
  // const response: AxiosResponse<{ [key: string]: Array<Partial<Task>> }> = await http.post(path, payload, {headers});
  // return response;
  return {
    config: null,
    data: workAllocation2Tasks,
    headers: null,
    status: 200,
    statusText: 'success',
  };
}

export async function handleTaskPost(path: string, payload: any, req: EnhancedRequest): Promise<any> {
  logger.info('posting tasks for', path);
  const headers = setHeaders(req);
  // const response: AxiosResponse = await http.post(path, payload, {headers});
  // Return the whole response, not just the data, so we can
  // see what the status of the response is.
  const nodeId = getNodeIdFromPath(path);
  if (nodeId === '73335149-acd0-11eb-9261-be82ff3638a7') {
    return {
      config: null,
      data: '',
      headers: null,
      status: 410,
      statusText: 'The task is no longer available.',
    };
  }
  return {
    config: null,
    data: '',
    headers: null,
    status: 204,
    statusText: 'success',
  };
}
