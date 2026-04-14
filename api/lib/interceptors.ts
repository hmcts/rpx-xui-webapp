import * as exceptionFormatter from 'exception-formatter';
import { getConfigValue } from '../configuration';
import { MAX_LOG_LINE } from '../configuration/references';

import { shorten, valueOrNull } from '../lib/util';
import * as log4jui from './log4jui';

const exceptionOptions = {
  maxLines: 1,
};

interface LogContext {
  callDateTime: string;
  host?: string;
  method?: string;
  outboundId: string;
  caseId?: string;
  jurisdiction?: string;
  service?: string;
  taskId?: string;
}

interface TelemetryProperties {
  caseId?: string;
  jurisdiction?: string;
  taskId?: string;
  callDateTime: string;
  host?: string;
  outboundId: string;
  service?: string;
}

let outboundRequestCounter = 0;

function tryParseJson(data: any): any {
  if (!data || typeof data !== 'string') {
    return data;
  }

  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
}

function firstDefinedString(...values: any[]): string | undefined {
  const value = values.find((candidate) => typeof candidate === 'string' && candidate.trim().length);
  return value ? value.trim() : undefined;
}

function findNestedValue(source: any, keys: string[], seen = new Set<any>()): string | undefined {
  if (!source || typeof source !== 'object' || seen.has(source)) {
    return undefined;
  }

  seen.add(source);

  for (const key of keys) {
    const directValue = source[key];
    if (typeof directValue === 'string' && directValue.trim().length) {
      return directValue.trim();
    }

    if (Array.isArray(directValue)) {
      const arrayValue = directValue.find((item) => typeof item === 'string' && item.trim().length);
      if (arrayValue) {
        return arrayValue.trim();
      }
    }

    if (directValue && typeof directValue === 'object') {
      const nestedDirect = firstDefinedString(directValue.value, directValue.id, directValue.caseId, directValue.taskId);
      if (nestedDirect) {
        return nestedDirect;
      }
    }
  }

  for (const value of Object.values(source)) {
    if (value && typeof value === 'object') {
      const nestedValue = findNestedValue(value, keys, seen);
      if (nestedValue) {
        return nestedValue;
      }
    }
  }

  return undefined;
}

function extractFromUrl(url?: string): { caseId?: string; jurisdiction?: string; taskId?: string } {
  if (!url) {
    return {};
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url, 'http://localhost');
  } catch {
    return {};
  }
  const caseId = firstDefinedString(
    parsedUrl.searchParams.get('caseId'),
    parsedUrl.searchParams.get('case_id'),
    parsedUrl.searchParams.get('caseRef'),
    parsedUrl.searchParams.get('caseReference')
  );
  const jurisdiction = firstDefinedString(
    parsedUrl.searchParams.get('jurisdiction'),
    parsedUrl.searchParams.get('jurisdictionId'),
    parsedUrl.searchParams.get('case_jurisdiction')
  );
  const taskIdFromQuery = firstDefinedString(parsedUrl.searchParams.get('taskId'), parsedUrl.searchParams.get('task_id'));
  const taskIdFromPath = parsedUrl.pathname.match(/\/task\/([^/?]+)/)?.[1];
  const caseIdFromPath =
    parsedUrl.pathname.match(/\/hearings\/([^/?]+)/)?.[1] ||
    parsedUrl.pathname.match(/\/hearingActuals\/([^/?]+)/)?.[1] ||
    parsedUrl.pathname.match(/\/case-details\/([^/?]+)/)?.[1];

  return {
    caseId: caseId || caseIdFromPath,
    jurisdiction,
    taskId: taskIdFromQuery || taskIdFromPath,
  };
}

function extractRequestTarget(url?: string): { host?: string; service?: string } {
  if (!url) {
    return {};
  }

  try {
    const parsedUrl = new URL(url, 'http://localhost');
    const host = parsedUrl.host || undefined;
    const service = parsedUrl.hostname?.split('.')[0] || undefined;
    return { host, service };
  } catch {
    return {};
  }
}

function extractFromBody(data: any): { caseId?: string; jurisdiction?: string; taskId?: string } {
  const parsedData = tryParseJson(data);
  if (!parsedData || typeof parsedData !== 'object') {
    return {};
  }

  return {
    caseId: findNestedValue(parsedData, ['caseId', 'case_id', 'caseRef', 'caseReference']),
    jurisdiction: findNestedValue(parsedData, ['jurisdiction', 'jurisdictionId', 'case_jurisdiction']),
    taskId: findNestedValue(parsedData, ['taskId', 'task_id']),
  };
}

function buildLogContext(config: any, startTime: Date): LogContext {
  const urlContext = extractFromUrl(config?.url);
  const bodyContext = extractFromBody(config?.data);
  const requestTarget = extractRequestTarget(config?.url);

  return {
    callDateTime: startTime.toISOString(),
    host: requestTarget.host,
    method: config?.method?.toUpperCase?.(),
    outboundId: `outbound-${startTime.getTime()}-${++outboundRequestCounter}`,
    caseId: firstDefinedString(urlContext.caseId, bodyContext.caseId),
    jurisdiction: firstDefinedString(urlContext.jurisdiction, bodyContext.jurisdiction),
    service: requestTarget.service,
    taskId: firstDefinedString(urlContext.taskId, bodyContext.taskId),
  };
}

function buildLogPrefix(context: LogContext, extras: { durationMs?: number; event: string; status?: number } ): string {
  const parts = [
    `event=${extras.event}`,
    `datetime=${context.callDateTime}`,
    `outboundId=${context.outboundId}`,
  ];

  if (context.method) {
    parts.push(`method=${context.method}`);
  }
  if (extras.status) {
    parts.push(`status=${extras.status}`);
  }
  if (typeof extras.durationMs === 'number') {
    parts.push(`durationMs=${extras.durationMs}`);
  }
  if (context.service) {
    parts.push(`service=${context.service}`);
  }
  if (context.host) {
    parts.push(`host=${context.host}`);
  }
  if (context.jurisdiction) {
    parts.push(`jurisdiction=${context.jurisdiction}`);
  }
  if (context.taskId) {
    parts.push(`taskId=${context.taskId}`);
  }
  if (context.caseId) {
    parts.push(`caseId=${context.caseId}`);
  }

  return `${parts.join(' ')} |`;
}

function buildTelemetryProperties(context: LogContext): TelemetryProperties {
  return {
    callDateTime: context.callDateTime,
    caseId: context.caseId,
    host: context.host,
    jurisdiction: context.jurisdiction,
    outboundId: context.outboundId,
    service: context.service,
    taskId: context.taskId,
  };
}

export function requestInterceptor(request) {
  const logger = log4jui.getLogger('outgoing');
  const startTime = new Date();
  const url = shorten(request.url, getConfigValue(MAX_LOG_LINE));
  const logContext = buildLogContext(request, startTime);
  logger.info(`${buildLogPrefix(logContext, { event: 'request' })} ${request.method.toUpperCase()} to ${url}`);
  //add timings to requests
  request.metadata = { ...request.metadata, logContext, startTime };

  return request;
}

export function successInterceptor(response) {
  response.config.metadata = response.config.metadata || {};
  response.config.metadata.startTime = response.config.metadata.startTime || new Date();
  response.config.metadata.endTime = new Date();
  response.duration = response.config.metadata.endTime - response.config.metadata.startTime;

  const logger = log4jui.getLogger('return');

  const url = shorten(response.config.url, getConfigValue(MAX_LOG_LINE));
  const logContext = response.config.metadata.logContext || buildLogContext(response.config, response.config.metadata.startTime);
  const status = response.status;

  logger.info(`${buildLogPrefix(logContext, { durationMs: response.duration, event: 'response', status })} Success on ${response.config.method.toUpperCase()} to ${url}`);
  logger.trackRequest({
    duration: response.duration,
    name: `Service ${response.config.method.toUpperCase()} call`,
    properties: buildTelemetryProperties(logContext),
    resultCode: status,
    success: true,
    url: response.config.url,
  });
  return response;
}

export function errorInterceptor(error) {
  error.config.metadata = error.config.metadata || {};
  error.config.metadata.startTime = error.config.metadata.startTime || new Date();
  error.config.metadata.endTime = new Date();
  error.duration = error.config.metadata.endTime - error.config.metadata.startTime;

  const logger = log4jui.getLogger('return');

  const url = shorten(error.config.url, getConfigValue(MAX_LOG_LINE));
  const logContext = error.config.metadata.logContext || buildLogContext(error.config, error.config.metadata.startTime);
  const status = error.status || error.response?.status;

  let data = valueOrNull(error, 'response.data.details');
  if (data) {
    logger.error(`${buildLogPrefix(logContext, { durationMs: error.duration, event: 'error', status })} Error on ${error.config.method.toUpperCase()} to ${url} - ${error} \n
    ${JSON.stringify(data)}`);
  } else {
    data = valueOrNull(error, 'response.status') ? JSON.stringify(error.response.data, null, 2) : null;
    if (!data) {
      data = error;
    }
    logger.error(`${buildLogPrefix(logContext, { durationMs: error.duration, event: 'error', status })} Error on ${error.config.method.toUpperCase()} to ${url} - ${error} \n
    ${exceptionFormatter(data, exceptionOptions)}`);
  }

  logger.trackRequest({
    duration: error.duration,
    name: `Service ${error.config.method.toUpperCase()} call`,
    properties: buildTelemetryProperties(logContext),
    resultCode: status,
    success: false,
    url: error.config.url,
  });

  return Promise.reject(error.response);
}
