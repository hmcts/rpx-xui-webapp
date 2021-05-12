import { AxiosResponse } from 'axios';
import * as log4jui from '../lib/log4jui';
import { EnhancedRequest, JUILogger } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { exists } from '../lib/util';
import { httpMock } from './httpMock';

const logger: JUILogger = log4jui.getLogger('mock-service');

/**
 * Handle GET method
 *
 * @returns {Promise<AxiosResponse>}\
 * @param path
 * @param req
 */
export async function handleGet(path: string, req: EnhancedRequest): Promise<AxiosResponse> {

  try {
    logger.info('handle get method', path);
    const headers = setHeaders(req);
    return await httpMock.get(path, {headers});
  } catch (e) {
    exists(e, 'message') ? logger.error(e.message) : logger.error('Error in get response');
    throw e;
  }

}

/**
 * Handle POST method
 *
 * @param path
 * @param body
 * @param req
 * @returns {Promise<AxiosResponse>}
 */
export async function handlePost<T>(path: string, body: T, req: EnhancedRequest): Promise<AxiosResponse> {

  try {
    logger.info('handle post method', path);
    const headers = setHeaders(req);
    return await httpMock.post(path, body, {headers});
  } catch (e) {
    exists(e, 'message') ? logger.error(e.message) : logger.error('Error in post response');
    throw e;
  }

}

/**
 * Handle PUT method
 *
 * @param path
 * @param body
 * @param req
 * @returns {Promise<AxiosResponse>}
 */
export async function handlePut<T>(path: string, body: T, req: EnhancedRequest): Promise<AxiosResponse> {
  try {
    logger.info('handle put method', path);
    const headers = setHeaders(req);
    return await httpMock.put(path, body, {headers});
  } catch (e) {
    exists(e, 'message') ? logger.error(e.message) : logger.error('Error in put response');
    throw e;
  }
}

/**
 * Handle DELETE method
 *
 * @param path
 * @param body
 * @param req
 * @returns {Promise<AxiosResponse>}
 */
export async function handleDelete<T>(path: string, body: T, req: EnhancedRequest): Promise<AxiosResponse> {
  try {
    logger.info('handle delete method', path);
    const headers = setHeaders(req);
    return await httpMock.delete(path, {
      data: body,
    });
  } catch (e) {
    exists(e, 'message') ? logger.error(e.message) : logger.error('Error in delete response');
    throw e;
  }
}
