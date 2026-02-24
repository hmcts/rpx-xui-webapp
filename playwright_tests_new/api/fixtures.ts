import { randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';

import {
  ApiClient as PlaywrightApiClient,
  type ApiLogEntry,
  type ApiRequestOptions,
  type ApiResponsePayload,
  createLogger,
} from '@hmcts/playwright-common';
import { test as base, request } from '@playwright/test';

export { expect } from '@playwright/test';
export { buildApiAttachment } from '@hmcts/playwright-common';

import { config } from '../common/apiTestConfig';
import { ensureStorageState, getStoredCookie, type ApiUserRole } from './utils/auth';

const baseUrl = stripTrailingSlash(config.baseUrl);
type LoggerInstance = ReturnType<typeof createLogger>;
const DEFAULT_API_SLOW_THRESHOLD_MS = 10_000;
const DEFAULT_API_REQUEST_TIMEOUT_MS = 60_000;

class TimeoutAwareApiClient extends PlaywrightApiClient {
  public constructor(
    private readonly defaultRequestTimeoutMs: number,
    options: ConstructorParameters<typeof PlaywrightApiClient>[0]
  ) {
    super(options);
  }

  public override get<T = unknown>(path: string, options?: ApiRequestOptions): Promise<ApiResponsePayload<T>> {
    return super.get<T>(path, this.withDefaultTimeout(options));
  }

  public override post<T = unknown, TBody = unknown>(
    path: string,
    options?: ApiRequestOptions<TBody>
  ): Promise<ApiResponsePayload<T>> {
    return super.post<T, TBody>(path, this.withDefaultTimeout(options));
  }

  public override put<T = unknown, TBody = unknown>(
    path: string,
    options?: ApiRequestOptions<TBody>
  ): Promise<ApiResponsePayload<T>> {
    return super.put<T, TBody>(path, this.withDefaultTimeout(options));
  }

  public override patch<T = unknown, TBody = unknown>(
    path: string,
    options?: ApiRequestOptions<TBody>
  ): Promise<ApiResponsePayload<T>> {
    return super.patch<T, TBody>(path, this.withDefaultTimeout(options));
  }

  public override delete<T = unknown>(path: string, options?: ApiRequestOptions): Promise<ApiResponsePayload<T>> {
    return super.delete<T>(path, this.withDefaultTimeout(options));
  }

  private withDefaultTimeout<TBody = unknown>(options?: ApiRequestOptions<TBody>): ApiRequestOptions<TBody> {
    if (typeof options?.timeoutMs === 'number' && options.timeoutMs > 0) {
      return options;
    }
    if (options) {
      return { ...options, timeoutMs: this.defaultRequestTimeoutMs };
    }
    return { timeoutMs: this.defaultRequestTimeoutMs };
  }
}

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

function sanitizeUrl(url: string): string {
  return url.split('?')[0];
}

function getApiSlowThresholdMs(): number {
  const rawThreshold = process.env.API_SLOW_THRESHOLD_MS;
  if (!rawThreshold) {
    return DEFAULT_API_SLOW_THRESHOLD_MS;
  }

  const parsedThreshold = Number.parseInt(rawThreshold, 10);
  return Number.isFinite(parsedThreshold) && parsedThreshold > 0 ? parsedThreshold : DEFAULT_API_SLOW_THRESHOLD_MS;
}

function getApiRequestTimeoutMs(): number {
  const rawTimeout = process.env.API_REQUEST_TIMEOUT_MS ?? process.env.PLAYWRIGHT_API_REQUEST_TIMEOUT_MS;
  if (!rawTimeout) {
    return DEFAULT_API_REQUEST_TIMEOUT_MS;
  }

  const parsedTimeout = Number.parseInt(rawTimeout, 10);
  return Number.isFinite(parsedTimeout) && parsedTimeout > 0 ? parsedTimeout : DEFAULT_API_REQUEST_TIMEOUT_MS;
}

function classifyFailure(
  error: string,
  serverErrors: ApiError[],
  clientErrors: ApiError[],
  slowCalls: Array<{ url: string; duration: number; method: string }>,
  networkTimeout: boolean
): FailureType {
  if (serverErrors.length > 0) {
    return 'DOWNSTREAM_API_5XX';
  }
  if (clientErrors.length > 0) {
    return 'DOWNSTREAM_API_4XX';
  }
  if (error.toLowerCase().includes('timeout') || networkTimeout) {
    return slowCalls.length > 0 ? 'SLOW_API_RESPONSE' : 'NETWORK_TIMEOUT';
  }
  if (error.includes('expect') || error.includes('Expected') || error.includes('Received')) {
    return 'ASSERTION_FAILURE';
  }
  return 'UNKNOWN';
}

export const test = base.extend<ApiFixtures>({
  logger: async ({ request }, use, workerInfo) => {
    const logger = createLogger({
      serviceName: 'rpx-xui-node-api',
      defaultMeta: {
        workerId: workerInfo.workerIndex,
        requestContext: request.constructor?.name ?? 'unknown',
      },
      format: 'pretty',
    });
    await use(logger);
  },
  apiLogs: async ({ request }, use, testInfo) => {
    const requestContext = request.constructor?.name ?? 'unknown';
    const entries: ApiLogEntry[] = [];
    await use(entries);
    const isFailure = testInfo.status === 'failed' || testInfo.status === 'timedOut';

    if (entries.length && isFailure) {
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
    }

    if (isFailure) {
      const errorMessage = testInfo.error?.message || '';
      const apiErrors = entries
        .filter((entry) => typeof entry.status === 'number' && entry.status >= 400)
        .map((entry) => ({
          url: sanitizeUrl(entry.url),
          status: entry.status,
          method: entry.method,
        }));
      const serverErrors = apiErrors.filter((e) => e.status >= 500);
      const clientErrors = apiErrors.filter((e) => e.status >= 400 && e.status < 500);

      const slowThreshold = getApiSlowThresholdMs();
      const slowCalls = entries
        .filter((entry) => typeof entry.durationMs === 'number' && entry.durationMs > slowThreshold)
        .map((entry) => ({
          url: sanitizeUrl(entry.url),
          duration: entry.durationMs,
          method: entry.method,
        }));

      const networkTimeout =
        /timeout|timed out|ETIMEDOUT|ECONNRESET|socket hang up/i.test(errorMessage) ||
        entries.some((entry) => /timeout|timed out|ETIMEDOUT/i.test(entry.errorMessage || ''));

      const failureType = classifyFailure(errorMessage, serverErrors, clientErrors, slowCalls, networkTimeout);

      const diagnosis = [
        `Test failed: ${testInfo.title}`,
        `Failure type: ${failureType}`,
        `Request context: ${requestContext}`,
        errorMessage ? `Error: ${errorMessage.substring(0, 300)}` : '',
        `API summary: total=${apiErrors.length + slowCalls.length}, 5xx=${serverErrors.length}, 4xx=${clientErrors.length}, slow>${slowThreshold}ms=${slowCalls.length}`,
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
  const defaultRequestTimeoutMs = getApiRequestTimeoutMs();

  return new TimeoutAwareApiClient(defaultRequestTimeoutMs, {
    baseUrl,
    name: `node-api-${role}`,
    logger,
    captureRawBodies: process.env.PLAYWRIGHT_DEBUG_API === '1',
    onResponse: (entry) => {
      entries.push(entry);

      // Monitor API response times and log slow requests
      const duration = entry.durationMs;
      const slowThreshold = getApiSlowThresholdMs();

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
    requestFactory: async () => context,
  });
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
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
