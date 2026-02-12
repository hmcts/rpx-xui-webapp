import { randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';

import { ApiClient as PlaywrightApiClient, type ApiLogEntry, createLogger } from '@hmcts/playwright-common';
import { test as base, request } from '@playwright/test';

export { expect } from '@playwright/test';
export { buildApiAttachment } from '@hmcts/playwright-common';

import { config } from '../common/apiTestConfig';
import { ensureStorageState, getStoredCookie, type ApiUserRole } from './utils/auth';
import { formatApiPerformanceSummary, sanitizeUrl, summarizeApiPerformance } from './utils/apiPerformanceUtils';

const baseUrl = stripTrailingSlash(config.baseUrl);
type LoggerInstance = ReturnType<typeof createLogger>;

export interface ApiFixtures {
  apiClient: PlaywrightApiClient;
  anonymousClient: PlaywrightApiClient;
  apiClientFor: (role: ApiUserRole) => Promise<PlaywrightApiClient>;
  apiLogs: ApiLogEntry[];
  logger: LoggerInstance;
}

type FailureType =
  | 'DOWNSTREAM_API_5XX'
  | 'DOWNSTREAM_API_4XX'
  | 'SLOW_API_RESPONSE'
  | 'NETWORK_TIMEOUT'
  | 'ASSERTION_FAILURE'
  | 'UNKNOWN';

type ApiError = {
  url: string;
  status: number;
  method: string;
};

function classifyFailure(
  error: string,
  serverErrors: ApiError[],
  clientErrors: ApiError[],
  slowCalls: Array<{ url: string; duration: number; method: string }>,
  networkTimeout: boolean,
  timedOut: boolean
): FailureType {
  if (timedOut || error.toLowerCase().includes('timeout') || networkTimeout) {
    return slowCalls.length > 0 ? 'SLOW_API_RESPONSE' : 'NETWORK_TIMEOUT';
  }
  if (serverErrors.length > 0) {
    return 'DOWNSTREAM_API_5XX';
  }
  if (clientErrors.length > 0) {
    return 'DOWNSTREAM_API_4XX';
  }
  if (error.includes('expect') || error.includes('Expected') || error.includes('Received')) {
    return 'ASSERTION_FAILURE';
  }
  return 'UNKNOWN';
}

export const test = base.extend<ApiFixtures>({
  logger: async ({}, use, workerInfo) => {
    const level = process.env.API_LOG_LEVEL || 'warn';
    const logger = createLogger({
      serviceName: 'rpx-xui-node-api',
      defaultMeta: { workerId: workerInfo.workerIndex },
      level,
      format: 'pretty',
    });
    await use(logger);
  },
  apiLogs: async ({}, use, testInfo) => {
    const entries: ApiLogEntry[] = [];
    await use(entries);

    const slowThreshold = parsePositiveInteger(process.env.API_SLOW_THRESHOLD_MS) ?? 5000;
    if (entries.length) {
      const pretty = entries.map((entry) => JSON.stringify(entry, null, 2)).join('\n\n---\n\n');
      await fs.writeFile(testInfo.outputPath('node-api-calls.json'), JSON.stringify(entries, null, 2), 'utf8');
      await fs.writeFile(testInfo.outputPath('node-api-calls.pretty.txt'), pretty, 'utf8');
      await testInfo.attach('node-api-calls.json', {
        body: JSON.stringify(entries, null, 2),
        contentType: 'application/json',
      });
      await testInfo.attach('node-api-calls.pretty.txt', {
        body: pretty,
        contentType: 'text/plain',
      });

      const perfSummary = summarizeApiPerformance(entries, slowThreshold);
      const perfJson = JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          ...perfSummary,
        },
        null,
        2
      );
      const perfText = formatApiPerformanceSummary(perfSummary);

      await fs.writeFile(testInfo.outputPath('node-api-performance-summary.json'), perfJson, 'utf8');
      await fs.writeFile(testInfo.outputPath('node-api-performance-summary.txt'), perfText, 'utf8');
      await testInfo.attach('node-api-performance-summary.json', {
        body: perfJson,
        contentType: 'application/json',
      });
      await testInfo.attach('node-api-performance-summary.txt', {
        body: perfText,
        contentType: 'text/plain',
      });

      testInfo.annotations.push({
        type: 'API performance',
        description:
          `p95=${perfSummary.p95DurationMs}ms, slow>${slowThreshold}ms=${perfSummary.slowCallCount}/${perfSummary.totalCalls}, ` +
          `4xx=${perfSummary.clientErrorCount}, 5xx=${perfSummary.serverErrorCount}`,
      });

      const p95WarnMs = parsePositiveInteger(process.env.API_PERF_WARN_P95_MS);
      if (p95WarnMs !== undefined && perfSummary.p95DurationMs > p95WarnMs) {
        testInfo.annotations.push({
          type: 'performance-warning',
          description: `API p95 latency ${perfSummary.p95DurationMs}ms exceeded API_PERF_WARN_P95_MS=${p95WarnMs}ms`,
        });
      }

      const errorRateWarnThreshold = parseRateThreshold(process.env.API_PERF_WARN_ERROR_RATE);
      if (errorRateWarnThreshold !== undefined && perfSummary.totalCalls > 0) {
        const errorRate = (perfSummary.clientErrorCount + perfSummary.serverErrorCount) / perfSummary.totalCalls;
        if (errorRate > errorRateWarnThreshold) {
          testInfo.annotations.push({
            type: 'performance-warning',
            description:
              `API error rate ${(errorRate * 100).toFixed(1)}% exceeded API_PERF_WARN_ERROR_RATE=` +
              `${(errorRateWarnThreshold * 100).toFixed(1)}%`,
          });
        }
      }
    }

    if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
      const errorMessage = testInfo.error?.message || '';
      const apiErrors = entries
        .filter((entry) => typeof entry.status === 'number' && entry.status >= 400)
        .map((entry) => ({
          url: sanitizeUrl(entry.url),
          status: entry.status!,
          method: entry.method,
        }));
      const serverErrors = apiErrors.filter((e) => e.status >= 500);
      const clientErrors = apiErrors.filter((e) => e.status >= 400 && e.status < 500);

      const slowCalls = entries
        .filter((entry) => typeof entry.durationMs === 'number' && entry.durationMs > slowThreshold)
        .map((entry) => ({
          url: sanitizeUrl(entry.url),
          duration: entry.durationMs!,
          method: entry.method,
        }));

      const networkTimeout =
        /timeout|timed out|ETIMEDOUT|ECONNRESET|socket hang up/i.test(errorMessage) ||
        entries.some((entry) => /timeout|timed out|ETIMEDOUT|ECONNRESET|socket hang up/i.test(entry.error || ''));

      const timeoutEntries = entries.filter((entry) =>
        /timeout|timed out|ETIMEDOUT|ECONNRESET|socket hang up/i.test(entry.error || '')
      );
      const timedOut = testInfo.status === 'timedOut';

      const failureType = classifyFailure(errorMessage, serverErrors, clientErrors, slowCalls, networkTimeout, timedOut);

      const diagnosis = [
        `Test failed: ${testInfo.title}`,
        `Failure type: ${failureType}`,
        errorMessage ? `Error: ${errorMessage.substring(0, 300)}` : '',
        `API summary: total=${entries.length}, 5xx=${serverErrors.length}, 4xx=${clientErrors.length}, timeouts=${timeoutEntries.length}, slow>${slowCalls.length}`,
      ]
        .filter(Boolean)
        .join('\n');

      testInfo.annotations.push({
        type: 'Failure type',
        description: failureType,
      });

      if (failureType === 'DOWNSTREAM_API_5XX' || failureType === 'DOWNSTREAM_API_4XX') {
        const errorList = [...serverErrors, ...clientErrors].map((e) => `${e.method} ${e.url} → HTTP ${e.status}`).join(' | ');
        testInfo.annotations.push({
          type: 'API errors',
          description: errorList.substring(0, 500),
        });
      }

      if (slowCalls.length > 0) {
        const slowList = slowCalls
          .map((s) => `${s.method} ${s.url} → ${Math.round(s.duration)}ms`)
          .slice(0, 3)
          .join(' | ');
        testInfo.annotations.push({
          type: 'Slow calls',
          description: slowList,
        });
      }

      await testInfo.attach('Failure diagnosis', {
        body: diagnosis,
        contentType: 'text/plain',
      });
    }
  },
  apiClient: async ({ logger, apiLogs }, use) => {
    const client = await createNodeApiClient('solicitor', logger, apiLogs);
    try {
      await use(client);
    } finally {
      await client.dispose();
    }
  },
  anonymousClient: async ({ logger, apiLogs }, use) => {
    const client = await createNodeApiClient('anonymous', logger, apiLogs);
    try {
      await use(client);
    } finally {
      await client.dispose();
    }
  },
  apiClientFor: async ({ logger, apiLogs }, use) => {
    const clients: PlaywrightApiClient[] = [];
    const factory = async (role: ApiUserRole): Promise<PlaywrightApiClient> => {
      const client = await createNodeApiClient(role, logger, apiLogs);
      clients.push(client);
      return client;
    };

    try {
      await use(factory);
    } finally {
      await Promise.all(clients.map((client) => client.dispose()));
    }
  },
});

async function createNodeApiClient(
  role: ApiUserRole | 'anonymous',
  logger: LoggerInstance,
  entries: ApiLogEntry[]
): Promise<PlaywrightApiClient> {
  const storageState = role === 'anonymous' ? undefined : await ensureStorageState(role);

  const defaultHeaders = await buildDefaultHeaders(role);
  const context = await buildRequestContext(role, storageState, defaultHeaders);
  const seenRequestIds = new Set<string>();
  const recordEntry = (entry: ApiLogEntry) => {
    if (seenRequestIds.has(entry.id)) {
      return;
    }
    seenRequestIds.add(entry.id);
    entries.push(entry);
  };

  return new PlaywrightApiClient({
    baseUrl,
    name: `node-api-${role}`,
    logger,
    captureRawBodies: process.env.PLAYWRIGHT_DEBUG_API === '1',
    onResponse: (entry) => {
      recordEntry(entry);

      // Monitor API response times and log slow requests
      const duration = entry.durationMs;
      const slowThreshold = Number.parseInt(process.env.API_SLOW_THRESHOLD_MS || '5000', 10);

      if (duration > slowThreshold) {
        logger.warn('Slow API response detected', {
          endpoint: entry.url,
          method: entry.method,
          duration,
          status: entry.status,
          threshold: slowThreshold,
          role,
          operation: 'api-monitoring',
        });
      }

      // Log all API calls in debug mode
      if (process.env.PLAYWRIGHT_DEBUG_API === '1') {
        logger.debug('API call completed', {
          endpoint: entry.url,
          method: entry.method,
          status: entry.status,
          duration,
          role,
          operation: 'api-call',
        });
      }
    },
    onError: (error) => {
      recordEntry(error.logEntry);
      logger.error('API request failed', {
        endpoint: error.logEntry.url,
        method: error.logEntry.method,
        status: error.logEntry.status,
        duration: error.logEntry.durationMs,
        error: error.message,
        role,
        operation: 'api-call-error',
      });
    },
    requestFactory: async () => context,
  });
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function parsePositiveInteger(raw?: string): number | undefined {
  if (!raw) {
    return undefined;
  }
  const value = Number.parseInt(raw, 10);
  if (!Number.isFinite(value) || value <= 0) {
    return undefined;
  }
  return value;
}

function parseRateThreshold(raw?: string): number | undefined {
  if (!raw) {
    return undefined;
  }
  const value = Number.parseFloat(raw);
  if (!Number.isFinite(value) || value < 0 || value > 1) {
    return undefined;
  }
  return value;
}

function shouldAutoInjectXsrf(): boolean {
  const flag = process.env.API_AUTO_XSRF ?? process.env.API_AUTH_AUTO_XSRF;
  return flag ? ['1', 'true', 'yes', 'on'].includes(flag.toLowerCase()) : false;
}

type HeaderDeps = {
  shouldAutoInjectXsrf?: typeof shouldAutoInjectXsrf;
  getStoredCookie?: typeof getStoredCookie;
};

async function buildDefaultHeaders(role: ApiUserRole | 'anonymous', deps: HeaderDeps = {}): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Correlation-Id': randomUUID(),
  };
  const shouldInject = (deps.shouldAutoInjectXsrf ?? shouldAutoInjectXsrf)();
  if (role !== 'anonymous' && shouldInject) {
    const xsrf = await (deps.getStoredCookie ?? getStoredCookie)(role, 'XSRF-TOKEN');
    if (xsrf) {
      headers['X-XSRF-TOKEN'] = xsrf;
    }
  }
  return headers;
}

type RequestContextDeps = {
  requestFactory?: typeof request.newContext;
  ensureStorageState?: typeof ensureStorageState;
  unlink?: typeof fs.unlink;
};

async function buildRequestContext(
  role: ApiUserRole | 'anonymous',
  storageState: string | undefined,
  defaultHeaders: Record<string, string>,
  deps: RequestContextDeps = {}
) {
  const requestFactory = deps.requestFactory ?? ((options) => request.newContext(options));
  const ensureState = deps.ensureStorageState ?? ensureStorageState;
  const unlinkFile = deps.unlink ?? fs.unlink;

  const buildContext = async (statePath?: string) =>
    requestFactory({
      baseURL: baseUrl,
      storageState: statePath,
      ignoreHTTPSErrors: true,
      extraHTTPHeaders: defaultHeaders,
    });

  let context;
  try {
    context = await buildContext(role === 'anonymous' ? undefined : storageState);
  } catch (error) {
    const message = (error as Error)?.message ?? '';
    const statePath = role === 'anonymous' ? undefined : storageState;
    if (role !== 'anonymous' && statePath && /Unexpected end of JSON input/i.test(message)) {
      try {
        await unlinkFile(statePath);
      } catch {
        // ignore
      }
      const rebuiltPath = await ensureState(role);
      context = await buildContext(rebuiltPath);
    } else {
      throw error;
    }
  }

  return context;
}

export const __test__ = {
  buildDefaultHeaders,
  buildRequestContext,
  shouldAutoInjectXsrf,
  stripTrailingSlash,
};
