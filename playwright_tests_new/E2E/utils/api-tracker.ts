import { createLogger } from '@hmcts/playwright-common';
import type { Page, Request } from '@playwright/test';

const logger = createLogger({ serviceName: 'api-monitor', format: 'pretty' });
const MAX_TRACKED = 500;
const TIMEOUT_ERROR_PATTERN = /timeout|timed out|ETIMEDOUT/i;
const TLS_HANDSHAKE_ERROR_PATTERN = /secure TLS connection was established|TLS/i;
const CONNECTION_RESET_PATTERN = /ECONNRESET|socket hang up|network socket disconnected/i;
const DNS_ERROR_PATTERN = /ENOTFOUND|EAI_AGAIN|getaddrinfo/i;

type BenignApiErrorRule = {
  method: string;
  status: number;
  urlPattern: RegExp;
};

const benignApiErrorRules: BenignApiErrorRule[] = [
  { method: 'GET', status: 403, urlPattern: /\/api\/organisation$/ },
  { method: 'GET', status: 400, urlPattern: /\/data\/internal\/cases\/\d+$/ },
];

export interface TrackedApiCall {
  url: string;
  method: string;
  status: number;
  duration: number;
  timestamp: string;
  initiatedFrom: string;
  resourceType: string;
  error?: string;
}

export interface TrackedApiError {
  url: string;
  status: number;
  method: string;
  initiatedFrom: string;
  resourceType: string;
}

export interface TrackedFailedRequest {
  url: string;
  method: string;
  errorText: string;
  initiatedFrom: string;
  resourceType: string;
}

export interface TrackedSlowCall {
  url: string;
  duration: number;
  method: string;
}

export interface LastBackendCall {
  url: string;
  method: string;
  status: number;
  durationMs: number | null;
  timestamp: string;
}

export interface ApiTrackingSnapshot {
  apiCalls: TrackedApiCall[];
  apiErrors: TrackedApiError[];
  failedRequests: TrackedFailedRequest[];
  slowCalls: TrackedSlowCall[];
  networkTimeout: boolean;
  lastBackendCall: LastBackendCall | null;
}

interface ApiTrackerState {
  apiCalls: TrackedApiCall[];
  failedRequests: TrackedFailedRequest[];
  slowCalls: TrackedSlowCall[];
  networkTimeout: boolean;
}

const monitoredPages = new WeakSet<Page>();
const stateByPage = new WeakMap<Page, ApiTrackerState>();

function sanitizeUrl(url: string): string {
  return url.split('?')[0];
}

function isBackendApi(url: string): boolean {
  return (
    (url.includes('/api/') ||
      url.includes('/data/') ||
      url.includes('/auth/') ||
      url.includes('/workallocation/') ||
      url.includes('/aggregated/') ||
      url.includes('/caseworkers/')) &&
    !url.includes('.js') &&
    !url.includes('.css') &&
    !url.includes('.woff')
  );
}

function isKnownBenignApiError(url: string, method: string, status: number): boolean {
  const requestMethod = method.toUpperCase();
  return benignApiErrorRules.some((rule) => {
    return rule.status === status && rule.method === requestMethod && rule.urlPattern.test(url);
  });
}

function getInitiatedFrom(request: Request): string {
  const refererHeader = request.headers()['referer'] || '';
  const frameUrl = request.frame()?.url() || '';
  return sanitizeUrl(refererHeader || frameUrl || 'unknown');
}

function getOrCreateState(page: Page): ApiTrackerState {
  const existing = stateByPage.get(page);
  if (existing) {
    return existing;
  }

  const created: ApiTrackerState = {
    apiCalls: [],
    failedRequests: [],
    slowCalls: [],
    networkTimeout: false,
  };
  stateByPage.set(page, created);
  return created;
}

function pushBounded<T>(items: T[], value: T): void {
  items.push(value);
  if (items.length > MAX_TRACKED) {
    items.shift();
  }
}

function classifyTransportFailure(errorText: string): string {
  if (TIMEOUT_ERROR_PATTERN.test(errorText)) {
    return 'timeout';
  }
  if (TLS_HANDSHAKE_ERROR_PATTERN.test(errorText)) {
    return 'tls_handshake';
  }
  if (CONNECTION_RESET_PATTERN.test(errorText)) {
    return 'connection_reset';
  }
  if (DNS_ERROR_PATTERN.test(errorText)) {
    return 'dns_resolution';
  }
  return 'network_error';
}

export function ensureApiTracker(page: Page): void {
  getOrCreateState(page);
  if (monitoredPages.has(page)) {
    return;
  }
  monitoredPages.add(page);

  page.on('response', async (response) => {
    try {
      const request = response.request();
      const rawUrl = request.url();
      if (!isBackendApi(rawUrl)) {
        return;
      }

      const timing = request.timing();
      const duration = timing.responseEnd;
      const status = response.status();
      const method = request.method();
      const sanitizedUrl = sanitizeUrl(rawUrl);
      const call: TrackedApiCall = {
        url: sanitizedUrl,
        method,
        status,
        duration,
        timestamp: new Date().toISOString(),
        initiatedFrom: getInitiatedFrom(request),
        resourceType: request.resourceType(),
      };

      const state = getOrCreateState(page);
      pushBounded(state.apiCalls, call);

      if (status >= 500) {
        call.error = `HTTP ${status} - Server Error`;
        logger.error('DOWNSTREAM_API_FAILURE', {
          url: call.url,
          status,
          duration: duration === -1 ? 'unknown' : `${duration}ms`,
          method,
        });
      } else if (duration !== -1 && duration > 5000) {
        logger.warn('SLOW_API_RESPONSE', {
          url: call.url,
          duration: `${duration}ms`,
          status,
          method,
        });
      } else if (status >= 400 && status < 500 && !isKnownBenignApiError(sanitizedUrl, method, status)) {
        call.error = `HTTP ${status} - Client Error`;
        logger.warn('CLIENT_ERROR', {
          url: call.url,
          status,
          method,
        });
      }
    } catch (error) {
      logger.warn('Failed to process response in API tracker', { error });
    }
  });

  page.on('requestfinished', (request) => {
    const rawUrl = request.url();
    if (!isBackendApi(rawUrl)) {
      return;
    }

    const timing = request.timing();
    if (timing.responseEnd !== -1 && timing.responseEnd > 5000) {
      const state = getOrCreateState(page);
      pushBounded(state.slowCalls, {
        url: sanitizeUrl(rawUrl),
        duration: timing.responseEnd,
        method: request.method(),
      });
    }
  });

  page.on('requestfailed', (request) => {
    const rawUrl = request.url();
    if (!isBackendApi(rawUrl)) {
      return;
    }

    const failure = request.failure();
    const failureText = failure?.errorText || 'Unknown request failure';
    const failureType = classifyTransportFailure(failureText);
    const initiatedFrom = getInitiatedFrom(request);
    const resourceType = request.resourceType();
    const state = getOrCreateState(page);
    pushBounded(state.failedRequests, {
      url: sanitizeUrl(rawUrl),
      method: request.method(),
      errorText: failureText,
      initiatedFrom,
      resourceType,
    });
    if (TIMEOUT_ERROR_PATTERN.test(failureText)) {
      state.networkTimeout = true;
    }
    logger.error('DOWNSTREAM_TRANSPORT_FAILURE', {
      url: sanitizeUrl(rawUrl),
      method: request.method(),
      status: 'none',
      duration: 'unknown',
      failureType,
      errorText: failureText,
      initiatedFrom,
      resourceType,
    });
  });
}

export function getApiTrackingSnapshot(page: Page): ApiTrackingSnapshot {
  const state = getOrCreateState(page);
  const apiCalls = [...state.apiCalls];
  const failedRequests = [...state.failedRequests];
  const slowCalls = [...state.slowCalls];
  const apiErrors = apiCalls
    .filter((call) => {
      if (call.status >= 500) {
        return true;
      }
      return call.status >= 400 && call.status < 500 && !isKnownBenignApiError(call.url, call.method, call.status);
    })
    .map((call) => ({
      url: call.url,
      status: call.status,
      method: call.method,
      initiatedFrom: call.initiatedFrom,
      resourceType: call.resourceType,
    }));
  const lastCall = apiCalls.length > 0 ? apiCalls[apiCalls.length - 1] : null;
  const lastBackendCall: LastBackendCall | null = lastCall
    ? {
        url: lastCall.url,
        method: lastCall.method,
        status: lastCall.status,
        durationMs: lastCall.duration >= 0 ? Math.round(lastCall.duration) : null,
        timestamp: lastCall.timestamp,
      }
    : null;

  return {
    apiCalls,
    apiErrors,
    failedRequests,
    slowCalls,
    networkTimeout: state.networkTimeout,
    lastBackendCall,
  };
}

export function clearApiTracking(page: Page): void {
  const state = getOrCreateState(page);
  state.apiCalls = [];
  state.failedRequests = [];
  state.slowCalls = [];
  state.networkTimeout = false;
}

export function formatLastBackendCallContext(lastBackendCall: LastBackendCall | null, suffix = 'before timeout.'): string {
  if (!lastBackendCall) {
    return 'No backend API call observed before timeout.';
  }

  const completedAtMs = Date.parse(lastBackendCall.timestamp);
  const completedAgoMs = Number.isFinite(completedAtMs) ? Math.max(0, Date.now() - completedAtMs) : null;
  const durationText = lastBackendCall.durationMs === null ? 'unknown' : `${lastBackendCall.durationMs}ms`;
  const completedAgoText = completedAgoMs === null ? 'unknown' : `${completedAgoMs}ms`;
  return `Last backend API call: ${lastBackendCall.method} ${lastBackendCall.url} -> HTTP ${lastBackendCall.status} (${durationText}), completed ${completedAgoText} ${suffix}`;
}

export function buildLastBackendCallContext(page: Page, suffix = 'before timeout.'): string {
  const snapshot = getApiTrackingSnapshot(page);
  return formatLastBackendCallContext(snapshot.lastBackendCall, suffix);
}
