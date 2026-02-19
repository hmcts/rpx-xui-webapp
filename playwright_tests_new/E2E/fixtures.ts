import { test as baseTest } from '@playwright/test';
import { createLogger } from '@hmcts/playwright-common';
import getPort from 'get-port';
import { PageFixtures, pageFixtures } from './page-objects/pages/page.fixtures.js';
import { UtilsFixtures, utilsFixtures } from './utils/utils.fixtures.js';
import {
  type SlowCall,
  type FailedRequest,
  sanitizeUrl,
  hasNetworkErrorSignal,
  collectDependencySignals,
  classifyFailure,
  classifyFailureCategory,
} from '../common/failureClassification';

const logger = createLogger({ serviceName: 'test-framework', format: 'pretty' });

function truncate(value: string, max = 500): string {
  return value.length > max ? value.substring(0, max) : value;
}

// Gather all fixture types into a common type
export type CustomFixtures = PageFixtures & UtilsFixtures;

// Extend 'test' object using custom fixtures with enhanced failure diagnosis
export const test = baseTest.extend<CustomFixtures, { lighthousePort: number }>({
  ...pageFixtures,
  ...utilsFixtures,

  page: async ({ page }, use, testInfo) => {
    const apiErrors: Array<{ url: string; status: number; method: string }> = [];
    const slowCalls: SlowCall[] = [];
    const failedRequests: FailedRequest[] = [];
    let networkTimeout = false;
    let networkFailure = false;
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
          method: request.method(),
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
        const errorText = failure?.errorText || 'unknown request failure';

        failedRequests.push({
          url: sanitizeUrl(url),
          method: request.method(),
          errorText: truncate(errorText, 160),
        });
        if (failedRequests.length > maxTracked) {
          failedRequests.shift();
        }

        if (/timeout|timed out/i.test(errorText)) {
          networkTimeout = true;
        }
        if (hasNetworkErrorSignal(errorText)) {
          networkFailure = true;
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
      const networkFailureSignal = networkFailure || networkTimeout;
      const dependencySignals = collectDependencySignals(
        error,
        serverErrors,
        clientErrors,
        slowCalls,
        failedRequests,
        networkFailureSignal
      );

      const failureType = classifyFailure(error, serverErrors, clientErrors, slowCalls, failedRequests, networkFailureSignal);
      const failureCategory = classifyFailureCategory(failureType, dependencySignals);

      const diagnosis = [
        `Test failed: ${testInfo.title}`,
        `Failure type: ${failureType}`,
        `Failure category: ${failureCategory}`,
        error ? `Error: ${error.substring(0, 300)}` : '',
        `API summary: total=${apiErrors.length + slowCalls.length + failedRequests.length}, 5xx=${serverErrors.length}, 4xx=${clientErrors.length}, slow=${slowCalls.length}, failedRequests=${failedRequests.length}`,
        dependencySignals.length > 0 ? `Dependency signals: ${dependencySignals.join(' | ')}` : '',
      ]
        .filter(Boolean)
        .join('\n');

      logger.error(diagnosis);

      // Surface to Odhín report as annotations
      testInfo.annotations.push({
        type: 'Failure type',
        description: failureType,
      });

      testInfo.annotations.push({
        type: 'Failure category',
        description: failureCategory,
      });

      if (dependencySignals.length > 0) {
        testInfo.annotations.push({
          type: 'Dependency signals',
          description: truncate(dependencySignals.join(' | ')),
        });
      }

      if (failureType === 'DOWNSTREAM_API_5XX' || failureType === 'DOWNSTREAM_API_4XX') {
        const errorList = [...serverErrors, ...clientErrors].map((e) => `${e.method} ${e.url} → HTTP ${e.status}`).join(' | ');
        testInfo.annotations.push({
          type: 'API errors',
          description: truncate(errorList),
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

      if (failedRequests.length > 0) {
        const failedRequestList = failedRequests
          .slice(0, 5)
          .map((request) => `${request.method} ${request.url} → ${request.errorText}`)
          .join(' | ');
        testInfo.annotations.push({
          type: 'Failed requests',
          description: truncate(failedRequestList),
        });
      }

      // Attach diagnosis to Playwright HTML report
      await testInfo.attach('Failure diagnosis', {
        body: diagnosis,
        contentType: 'text/plain',
      });

      // Also attach as JSON for programmatic analysis
      await testInfo.attach('failure-data.json', {
        body: JSON.stringify(
          {
            failureType,
            failureCategory,
            dependencySignals,
            apiErrors,
            slowCalls,
            failedRequests,
            networkTimeout,
            networkFailure,
            timestamp: new Date().toISOString(),
          },
          null,
          2
        ),
        contentType: 'application/json',
      });
    }
  },

  // Worker scoped fixtures need to be defined separately
  lighthousePort: [
    async ({ browserName }, use) => {
      const port = await getPort();
      logger.info('Allocated lighthouse port', { browserName, port });
      await use(port);
    },
    { scope: 'worker' },
  ],
});

// If you were extending assertions, you would also import the "expect" property from this file
export const expect = test.expect;

export const __test__ = {
  sanitizeUrl,
  hasNetworkErrorSignal,
  collectDependencySignals,
  classifyFailure,
  classifyFailureCategory,
};
