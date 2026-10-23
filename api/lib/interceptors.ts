import { getConfigValue } from '../configuration';
import { MAX_LOG_LINE, SERVICES_WORK_ALLOCATION_TASK_API_PATH } from '../configuration/references';

import { shorten } from '../lib/util';
import { redactTelemetryIdentifiers } from './appInsights';
import * as log4jui from './log4jui';

interface LogContext {
  callDateTime: string;
  host?: string;
  method?: string;
  outboundId: string;
  jurisdiction?: string;
  service?: string;
}

interface TelemetryProperties {
  jurisdiction?: string;
  callDateTime: string;
  host?: string;
  outboundId: string;
  service?: string;
}

interface RequestTarget {
  method?: string;
  url?: string;
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

function extractFromUrl(url?: string): { jurisdiction?: string } {
  if (!url) {
    return {};
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url, 'http://localhost');
  } catch {
    return {};
  }
  const jurisdiction = firstDefinedString(
    parsedUrl.searchParams.get('jurisdiction'),
    parsedUrl.searchParams.get('jurisdictionId'),
    parsedUrl.searchParams.get('case_jurisdiction')
  );
  return {
    jurisdiction,
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

function extractFromBody(data: any): { jurisdiction?: string } {
  const parsedData = tryParseJson(data);
  if (!parsedData || typeof parsedData !== 'object') {
    return {};
  }

  return {
    jurisdiction: findNestedValue(parsedData, ['jurisdiction', 'jurisdictionId', 'case_jurisdiction']),
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
    jurisdiction: firstDefinedString(urlContext.jurisdiction, bodyContext.jurisdiction),
    service: requestTarget.service,
  };
}

function buildLogPrefix(
  context: LogContext,
  extras: { durationMs?: number; event: string; status?: number | 'unavailable' }
): string {
  const parts = [`event=${extras.event}`, `datetime=${context.callDateTime}`, `outboundId=${context.outboundId}`];

  if (context.method) {
    parts.push(`method=${context.method}`);
  }
  if (extras.status !== undefined) {
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
  return `${parts.join(' ')} |`;
}

function buildTelemetryProperties(context: LogContext): TelemetryProperties {
  return {
    callDateTime: context.callDateTime,
    host: context.host,
    jurisdiction: context.jurisdiction,
    outboundId: context.outboundId,
    service: context.service,
  };
}

export function isWorkAllocationTaskSearchRequest(config: RequestTarget): boolean {
  if (config?.method?.toUpperCase?.() !== 'POST' || typeof config?.url !== 'string') {
    return false;
  }

  try {
    const taskSearchUrl = new URL(`${getConfigValue(SERVICES_WORK_ALLOCATION_TASK_API_PATH)}/task`);
    const requestUrl = new URL(config.url, taskSearchUrl);
    return (
      requestUrl.origin === taskSearchUrl.origin &&
      (requestUrl.pathname === taskSearchUrl.pathname ||
        requestUrl.pathname === `${taskSearchUrl.pathname}/search-for-completable`)
    );
  } catch {
    return false;
  }
}

function safeRequestUrl(config: RequestTarget): string {
  return isWorkAllocationTaskSearchRequest(config) ? '/workallocation/task' : redactTelemetryIdentifiers(config.url || '');
}

export function requestInterceptor(request) {
  const logger = log4jui.getLogger('outgoing');
  const startTime = new Date();
  const safeUrl = safeRequestUrl(request);
  const url = shorten(safeUrl, getConfigValue(MAX_LOG_LINE));
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

  const safeUrl = safeRequestUrl(response.config);
  const url = shorten(safeUrl, getConfigValue(MAX_LOG_LINE));
  const logContext = response.config.metadata.logContext || buildLogContext(response.config, response.config.metadata.startTime);
  const status = response.status;

  logger.info(
    `${buildLogPrefix(logContext, { durationMs: response.duration, event: 'response', status })} Success on ${response.config.method.toUpperCase()} to ${url}`
  );
  logger.trackRequest({
    duration: response.duration,
    name: `Service ${response.config.method.toUpperCase()} call`,
    properties: buildTelemetryProperties(logContext),
    resultCode: status,
    success: true,
    url: safeUrl,
  });
  return response;
}

export function errorInterceptor(error) {
  error.config.metadata = error.config.metadata || {};
  error.config.metadata.startTime = error.config.metadata.startTime || new Date();
  error.config.metadata.endTime = new Date();
  error.duration = error.config.metadata.endTime - error.config.metadata.startTime;

  const logger = log4jui.getLogger('return');

  const safeUrl = safeRequestUrl(error.config);
  const url = shorten(safeUrl, getConfigValue(MAX_LOG_LINE));
  const logContext = error.config.metadata.logContext || buildLogContext(error.config, error.config.metadata.startTime);
  const rawStatus = error.status ?? error.response?.status;
  const status = Number.isInteger(rawStatus) && rawStatus >= 100 && rawStatus <= 599 ? rawStatus : 'unavailable';

  const failureMessage = isWorkAllocationTaskSearchRequest(error.config)
    ? 'Work Allocation task request failed'
    : `Error on ${error.config.method.toUpperCase()} to ${url} - request failed`;
  logger.error(`${buildLogPrefix(logContext, { durationMs: error.duration, event: 'error', status })} ${failureMessage}`);

  logger.trackRequest({
    duration: error.duration,
    name: `Service ${error.config.method.toUpperCase()} call`,
    properties: buildTelemetryProperties(logContext),
    resultCode: typeof status === 'number' ? status : undefined,
    success: false,
    url: safeUrl,
  });

  return Promise.reject(error.response ?? error);
}
