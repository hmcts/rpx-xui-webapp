import { AxiosResponse } from 'axios';
import { NextFunction } from 'express';
import { http } from '../lib/http';
import { redactTelemetryIdentifiers } from '../lib/appInsights';
import * as log4jui from '../lib/log4jui';
import { EnhancedRequest, JUILogger } from '../lib/models';
import { setHeaders } from '../lib/proxy';

export const logger: JUILogger = log4jui.getLogger('crud-service');

/**
 * Generic handleGet call Rest API with GET method
 * @param path
 * @param req
 * @param next
 * @returns {Promise<AxiosResponse>}
 */
export async function handleGet(path: string, req: EnhancedRequest): Promise<AxiosResponse> {
  logger.info('handle get:', redactTelemetryIdentifiers(path));
  const headers = setHeaders(req);
  return await http.get(path, { headers });
}

export async function sendGet(
  path: string,
  req: EnhancedRequest,
  customHeaders: { [x: string]: string } = {}
): Promise<AxiosResponse> {
  logger.info('sendGet to:', redactTelemetryIdentifiers(path));
  const headers = {
    ...setHeaders(req),
    ...customHeaders,
  };
  return await http.get(path, { headers });
}
/**
 * Generic handlePost call Rest API with POST method
 * @param path
 * @param body
 * @param req
 * @param next
 * @returns {Promise<AxiosResponse>}
 */
export async function handlePost<T>(path: string, body: T, req: EnhancedRequest): Promise<AxiosResponse> {
  logger.info('handlePost:', redactTelemetryIdentifiers(path));
  const headers = setHeaders(req);
  return await http.post(path, body, { headers });
}

export async function sendPost<T>(path: string, body: T, req: EnhancedRequest, next?: NextFunction): Promise<AxiosResponse> {
  try {
    logger.info('sendPost to:', redactTelemetryIdentifiers(path));
    const headers = setHeaders(req);
    return await http.post(path, body, { headers });
  } catch (e) {
    if (next) {
      next(e);
    } else {
      throw e;
    }
  }
}

/**
 * Generic handlePostBlob call Rest API with POST method
 * @param path
 * @param body
 * @param req
 * @param next
 * @returns {Promise<AxiosResponse>}
 */
export async function handlePostBlob<T>(path: string, body: T, req: EnhancedRequest, next: NextFunction): Promise<AxiosResponse> {
  try {
    logger.info('handle post blob:', redactTelemetryIdentifiers(path));
    const headers = setHeaders(req);
    return await http.post(path, body, {
      headers,
      responseType: 'arraybuffer',
    });
  } catch (e) {
    next(e);
  }
}

/**
 * Generic handlePut call Rest API with PUT method
 * @param path
 * @param body
 * @param req
 * @param next
 * @returns {Promise<AxiosResponse>}
 */
export async function handlePut<T>(path: string, body: T, req: EnhancedRequest): Promise<AxiosResponse> {
  logger.info('handle put:', redactTelemetryIdentifiers(path));
  const headers = setHeaders(req);
  return await http.put(path, body, { headers });
}

export async function sendPut<T>(path: string, body: T, req: EnhancedRequest): Promise<AxiosResponse> {
  logger.info('send put request to:', redactTelemetryIdentifiers(path));
  const headers = setHeaders(req);
  return await http.put(path, body, { headers });
}

/**
 * Generic handleDelete call Rest API with DELETE method
 * @param path
 * @param body
 * @param req
 * @param next
 * @returns {Promise<AxiosResponse>}
 */
export async function handleDelete<T>(path: string, body: T, req: EnhancedRequest): Promise<AxiosResponse> {
  logger.info('handle delete:', redactTelemetryIdentifiers(path));
  const headers = setHeaders(req);
  return await http.delete(path, {
    data: body,
    headers,
  });
}

export async function sendDelete<T>(path: string, body: T, req: EnhancedRequest): Promise<AxiosResponse> {
  logger.info('send delete request to:', redactTelemetryIdentifiers(path));
  const headers = setHeaders(req);
  // AM service reject header with 406 error if accept is sent
  delete headers.accept;
  return await http.delete(path, {
    data: body,
    headers,
  });
}
