import { test as base, expect, request } from '@playwright/test';
import { promises as fs } from 'node:fs';
import type { Logger as WinstonLogger } from 'winston';
import {
  ApiClient as PlaywrightApiClient,
  type ApiLogEntry,
  buildApiAttachment,
  createLogger
} from '@hmcts/playwright-common';
import { config } from '../../test_codecept/integration/tests/config/config';
import { ensureStorageState, type ApiUserRole } from './auth';

const baseUrl = stripTrailingSlash(config.baseUrl);

export interface ApiFixtures {
  apiClient: PlaywrightApiClient;
  anonymousClient: PlaywrightApiClient;
  apiClientFor: (role: ApiUserRole) => Promise<PlaywrightApiClient>;
  apiLogs: ApiLogEntry[];
  logger: WinstonLogger;
}

export const test = base.extend<ApiFixtures>({
  logger: async ({}, use, workerInfo) => {
    const logger = createLogger({
      serviceName: 'rpx-xui-node-api',
      defaultMeta: { workerId: workerInfo.workerIndex }
    });
    await use(logger);
  },
  apiLogs: async ({}, use, testInfo) => {
    const entries: ApiLogEntry[] = [];
    await use(entries);
    if (entries.length) {
      await testInfo.attach('node-api-calls.json', {
        body: JSON.stringify(entries, null, 2),
        contentType: 'application/json'
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
  logger: WinstonLogger,
  entries: ApiLogEntry[]
): Promise<PlaywrightApiClient> {
  const storageState = role === 'anonymous' ? undefined : await ensureStorageState(role);
  const buildContext = async (statePath?: string) =>
    request.newContext({
      baseURL: baseUrl,
      storageState: statePath,
      ignoreHTTPSErrors: true,
      extraHTTPHeaders: {
        'Content-Type': 'application/json'
      }
    });

  let context;
  try {
    context = await buildContext(role === 'anonymous' ? undefined : storageState);
  } catch (error) {
    const message = (error as Error)?.message ?? '';
    const statePath = role === 'anonymous' ? undefined : storageState;
    if (statePath && /Unexpected end of JSON input/i.test(message)) {
      try {
        await fs.unlink(statePath);
      } catch {
        // ignore
      }
      const rebuiltPath = await ensureStorageState(role);
      context = await buildContext(rebuiltPath);
    } else {
      throw error;
    }
  }

  return new PlaywrightApiClient({
    baseUrl,
    name: `node-api-${role}`,
    logger,
    captureRawBodies: process.env.PLAYWRIGHT_DEBUG_API === '1',
    onResponse: (entry) => entries.push(entry),
    requestFactory: async () => context
  });
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}
