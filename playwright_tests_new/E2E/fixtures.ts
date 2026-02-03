import { test as baseTest } from '@playwright/test';
import { createLogger } from '@hmcts/playwright-common';
import getPort from 'get-port';
import { PageFixtures, pageFixtures } from './page-objects/pages/page.fixtures.js';
import { UtilsFixtures, utilsFixtures } from './utils/utils.fixtures.js';

const logger = createLogger({ serviceName: 'test-framework', format: 'pretty' });

type FailureType =
  | 'DOWNSTREAM_API_5XX'
  | 'DOWNSTREAM_API_4XX'
  | 'SLOW_API_RESPONSE'
  | 'NETWORK_TIMEOUT'
  | 'UI_ELEMENT_MISSING'
  | 'ASSERTION_FAILURE'
  | 'UNKNOWN';

interface ApiError {
  url: string;
  status: number;
  method: string;
}

/**
 * Sanitize URL by removing query parameters to prevent logging sensitive data.
 * Query params may contain tokens, session IDs, or PII.
 * @param url - Full URL with potential query parameters
 * @returns URL without query parameters
 */
function sanitizeUrl(url: string): string {
  return url.split('?')[0];
}

/**
 * Classify test failure type based on error message and API call patterns.
 * Follows HMCTS observability standards for instant root cause diagnosis.
 */
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
  if (error.includes('locator') || error.includes('element') || error.includes('waiting for')) {
    return 'UI_ELEMENT_MISSING';
  }
  if (error.includes('expect') || error.includes('Expected') || error.includes('Received')) {
    return 'ASSERTION_FAILURE';
  }
  return 'UNKNOWN';
}

// Gather all fixture types into a common type
export type CustomFixtures = PageFixtures & UtilsFixtures;

// Extend 'test' object using custom fixtures with enhanced failure diagnosis
export const test = baseTest.extend<CustomFixtures, { lighthousePort: number }>(
  {
    ...pageFixtures,
    ...utilsFixtures,

    page: async ({ page }, use, testInfo) => {
      const apiErrors: Array<{ url: string; status: number; method: string }> = [];
      const slowCalls: Array<{ url: string; duration: number; method: string }> = [];
      let networkTimeout = false;
      const maxTracked = 500;

      const isBackendApi = (url: string) =>
        (url.includes('/api/') ||
          url.includes('/data/') ||
          url.includes('/auth/') ||
          url.includes('/workallocation/') ||
          url.includes('/caseworkers/')) &&
        !url.includes('.js') &&
        !url.includes('.css');

      // Monitor API calls for failure diagnosis
      page.on('response', async (response) => {
        try {
          const url = response.url();
          if (!isBackendApi(url)) {
            return;
          }

          const status = response.status();
          const method = response.request().method();

          // Track all 4xx and 5xx errors
          if (status >= 400) {
            apiErrors.push({ url: sanitizeUrl(url), status, method });
            if (apiErrors.length > maxTracked) {
              apiErrors.shift();
            }
          }
        } catch (err) {
          // Ignore response parsing errors - test should not fail due to monitoring
          logger.warn('Failed to process response in monitoring', { error: err });
        }
      });

      page.on('requestfinished', (request) => {
        const url = request.url();
        if (!isBackendApi(url)) {
          return;
        }

        const timing = request.timing();
        if (timing.responseEnd !== -1 && timing.responseEnd > 5000) {
          slowCalls.push({
            url: sanitizeUrl(url),
            duration: timing.responseEnd,
            method: request.method()
          });
          if (slowCalls.length > maxTracked) {
            slowCalls.shift();
          }
        }
      });

      page.on('requestfailed', (request) => {
        const url = request.url();
        if (isBackendApi(url)) {
          const failure = request.failure();
          if (failure?.errorText.includes('Timeout') || failure?.errorText.includes('timeout')) {
            networkTimeout = true;
          }
        }
      });

      await use(page);

      // On test failure, classify the root cause and attach diagnosis
      if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
        // Only use error message, not stack trace to prevent PII leakage
        const error = testInfo.error?.message || '';

        // Classify failure type
        const serverErrors = apiErrors.filter((e) => e.status >= 500);
        const clientErrors = apiErrors.filter((e) => e.status >= 400 && e.status < 500);

        const failureType = classifyFailure(error, serverErrors, clientErrors, slowCalls, networkTimeout);

        const diagnosis = [
          `Test failed: ${testInfo.title}`,
          `Failure type: ${failureType}`,
          error ? `Error: ${error.substring(0, 300)}` : '',
          `API summary: total=${apiErrors.length + slowCalls.length}, 5xx=${serverErrors.length}, 4xx=${clientErrors.length}, slow>${slowCalls.length}`
        ]
          .filter(Boolean)
          .join('\n');

        logger.error(diagnosis);

        // Surface to Odhín report as annotations
        testInfo.annotations.push({
          type: 'Failure type',
          description: failureType
        });

        if (failureType === 'DOWNSTREAM_API_5XX' || failureType === 'DOWNSTREAM_API_4XX') {
          const errorList = [...serverErrors, ...clientErrors]
            .map((e) => `${e.method} ${e.url} → HTTP ${e.status}`)
            .join(' | ');
          testInfo.annotations.push({
            type: 'API errors',
            description: errorList.substring(0, 500)
          });
        }

        if (slowCalls.length > 0) {
          const slowList = slowCalls
            .map((s) => `${s.method} ${s.url} → ${Math.round(s.duration)}ms`)
            .slice(0, 3)
            .join(' | ');
          testInfo.annotations.push({
            type: 'Slow calls',
            description: slowList
          });
        }

        // Attach diagnosis to Playwright HTML report
        await testInfo.attach('Failure diagnosis', {
          body: diagnosis,
          contentType: 'text/plain'
        });

        // Also attach as JSON for programmatic analysis
        await testInfo.attach('failure-data.json', {
          body: JSON.stringify({
            failureType,
            apiErrors,
            slowCalls,
            networkTimeout,
            timestamp: new Date().toISOString()
          }, null, 2),
          contentType: 'application/json'
        });
      }
    },

    // Worker scoped fixtures need to be defined separately
    lighthousePort: [
      async ({ browserName }, use) => {
        if (browserName) {
          // no-op: keep the destructured arg in use to satisfy lint rules
        }
        const port = await getPort();
        await use(port);
      },
      { scope: 'worker' }
    ]
  }
);

// If you were extending assertions, you would also import the "expect" property from this file
export const expect = test.expect;
