import * as exceptionFormatter from 'exception-formatter';
import { getConfigValue } from '../configuration';
import {
  MAX_LOG_LINE,
} from '../configuration/references';
import * as log4jui from '../lib/log4jui';
import { shorten, valueOrNull } from '../lib/util';

const exceptionOptions = {
  maxLines: 1,
};

export function requestInterceptor(request) {
  const logger = log4jui.getLogger('MOCK: outgoing');

  const url = shorten(request.url, getConfigValue(MAX_LOG_LINE));
  logger.info(`${request.method.toUpperCase()} to ${url}`);
  //add timings to requests
  request.metadata = {startTime: new Date()};

  return request;
}

export function successInterceptor(response) {
  response.config.metadata.endTime = new Date();
  response.duration = response.config.metadata.endTime - response.config.metadata.startTime;

  const logger = log4jui.getLogger('MOCK: return');

  const url = shorten(response.config.url, getConfigValue(MAX_LOG_LINE));

  logger.info(`Success on ${response.config.method.toUpperCase()} to ${url} (${response.duration})`);
  return response;
}

export function errorInterceptor(error) {
  error.config.metadata.endTime = new Date();
  error.duration = error.config.metadata.endTime - error.config.metadata.startTime;

  const logger = log4jui.getLogger('MOCK: return');

  const url = shorten(error.config.url, getConfigValue(MAX_LOG_LINE));

  let data = valueOrNull(error, 'response.data.details');
  if (!data) {
    data = valueOrNull(error, 'response.status') ? JSON.stringify(error.response.data, null, 2) : null;
    if (!data) {
      data = error;
    }
    logger.error(`Error on ${error.config.method.toUpperCase()} to ${url} in (${error.duration}) - ${error} \n
        ${exceptionFormatter(data, exceptionOptions)}`);
  } else {
    logger.error(`Error on ${error.config.method.toUpperCase()} to ${url} in (${error.duration}) - ${error} \n
        ${JSON.stringify(data)}`);
  }

  return Promise.reject(error.response);
}
