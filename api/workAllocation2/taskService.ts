import { AxiosResponse } from 'axios';
import { http } from '../lib/http';
import * as log4jui from '../lib/log4jui';
import { EnhancedRequest, JUILogger } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { handlePost } from './util';

const logger: JUILogger = log4jui.getLogger('task-service');

export async function handleTaskGet(path: string, req: EnhancedRequest): Promise<any> {
    logger.info('getting tasks for', path);
    const headers = setHeaders(req);
    const response: AxiosResponse = await http.get(path, { headers });
    return response.data;
}

export async function handleTaskSearch(path: string, payload: any, req: EnhancedRequest): Promise<any> {
    logger.info('search task for', payload);
    const response: AxiosResponse = await handlePost(path, payload, req);
    return response;
}

export async function handleTaskPost(path: string, payload: any, req: EnhancedRequest): Promise<any> {
    logger.info('posting tasks for', path);
    const response: AxiosResponse = await handlePost(path, payload, req);
    // Return the whole response, not just the data, so we can
    // see what the status of the response is.
    return response;
}
