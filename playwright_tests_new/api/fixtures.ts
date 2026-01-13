import { randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';

import {
  ApiClient as PlaywrightApiClient,
  type ApiLogEntry,
  buildApiAttachment,
  createLogger
} from '@hmcts/playwright-common';
import { test as base, expect, request } from '@playwright/test';

import { config } from '../common/apiTestConfig';
import { ensureStorageState, getStoredCookie, type ApiUserRole } from './utils/auth';

const baseUrl = stripTrailingSlash(config.baseUrl);
type LoggerInstance = ReturnType<typeof createLogger>;

export interface ApiFixtures {
  apiClient: PlaywrightApiClient;
  anonymousClient: PlaywrightApiClient;
  apiClientFor: (role: ApiUserRole) => Promise<PlaywrightApiClient>;
  apiLogs: ApiLogEntry[];
  logger: LoggerInstance;
}

export const test = base.extend<ApiFixtures>({
  logger: async ({}, use, workerInfo) => {
    const logger = createLogger({
      serviceName: 'rpx-xui-node-api',
      defaultMeta: { workerId: workerInfo.workerIndex },
      format: 'pretty'
    });
    await use(logger);
  },
  apiLogs: async ({}, use, testInfo) => {
    const entries: ApiLogEntry[] = [];
    await use(entries);
    if (entries.length) {
      const pretty = entries.map((entry) => JSON.stringify(entry, null, 2)).join('\n\n---\n\n');
      await fs.writeFile(testInfo.outputPath('node-api-calls.json'), JSON.stringify(entries, null, 2), 'utf8');
      await fs.writeFile(testInfo.outputPath('node-api-calls.pretty.txt'), pretty, 'utf8');
      await testInfo.attach('node-api-calls.json', {
        body: JSON.stringify(entries, null, 2),
        contentType: 'application/json'
      });
      await testInfo.attach('node-api-calls.pretty.txt', {
        body: pretty,
        contentType: 'text/plain'
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
  }
});

export { expect, buildApiAttachment };

async function createNodeApiClient(
  role: ApiUserRole | 'anonymous',
  logger: LoggerInstance,
  entries: ApiLogEntry[]
): Promise<PlaywrightApiClient> {
  const storageState =
    role === 'anonymous'
      ? undefined
      : await ensureStorageState(role as ApiUserRole);

  const defaultHeaders = await buildDefaultHeaders(role);
  const context = await buildRequestContext(role, storageState, defaultHeaders);

  return new PlaywrightApiClient({
    baseUrl,
    name: `node-api-${role}`,
    logger,
    captureRawBodies: process.env.PLAYWRIGHT_DEBUG_API === '1',
    onResponse: (entry) => {
      entries.push(entry);

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
          operation: 'api-monitoring'
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
          operation: 'api-call'
        });
      }
    },
    requestFactory: async () => context
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

async function buildDefaultHeaders(
  role: ApiUserRole | 'anonymous',
  deps: HeaderDeps = {}
): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Correlation-Id': randomUUID()
  };
  const shouldInject = (deps.shouldAutoInjectXsrf ?? shouldAutoInjectXsrf)();
  if (role !== 'anonymous' && shouldInject) {
    const xsrf = await (deps.getStoredCookie ?? getStoredCookie)(role as ApiUserRole, 'XSRF-TOKEN');
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
      extraHTTPHeaders: defaultHeaders
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
      const rebuiltPath = await ensureState(role as ApiUserRole);
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
  stripTrailingSlash
};
