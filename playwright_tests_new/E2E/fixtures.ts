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

interface SlowCall {
  url: string;
  duration: number;
  method: string;
}

interface FailedRequest {
  url: string;
  method: string;
  errorText: string;
}

type FailureCategory = 'DEPENDENCY_ENVIRONMENT_FAILURE' | 'NON_DEPENDENCY_FAILURE';

const NETWORK_ERROR_PATTERNS: RegExp[] = [
  /timeout/i,
  /timed out/i,
  /net::err_/i,
  /econnreset/i,
  /econnrefused/i,
  /etimedout/i,
  /enotfound/i,
  /eai_again/i,
  /socket hang up/i,
  /connection reset/i,
  /connection refused/i,
  /name not resolved/i,
];

const DEPENDENCY_FAILURE_TYPES: ReadonlySet<FailureType> = new Set([
  'DOWNSTREAM_API_5XX',
  'DOWNSTREAM_API_4XX',
  'SLOW_API_RESPONSE',
  'NETWORK_TIMEOUT',
]);

/**
 * Sanitize URL by removing query parameters to prevent logging sensitive data.
 * Query params may contain tokens, session IDs, or PII.
 * @param url - Full URL with potential query parameters
 * @returns URL without query parameters
 */
function sanitizeUrl(url: string): string {
  return url.split('?')[0];
}

function truncate(value: string, max = 500): string {
  return value.length > max ? value.substring(0, max) : value;
}

function hasNetworkErrorSignal(value: string): boolean {
  return NETWORK_ERROR_PATTERNS.some((pattern) => pattern.test(value));
}

function collectDependencySignals(
  errorMessage: string,
  serverErrors: ApiError[],
  clientErrors: ApiError[],
  slowCalls: SlowCall[],
  failedRequests: FailedRequest[],
  networkFailureSignal: boolean
): string[] {
  const signals: string[] = [];

  if (serverErrors.length > 0) {
    signals.push(`Downstream API 5xx responses=${serverErrors.length}`);
  }
  if (clientErrors.length > 0) {
    signals.push(`Downstream API 4xx responses=${clientErrors.length}`);
  }
  if (slowCalls.length > 0) {
    signals.push(`Slow backend API calls=${slowCalls.length}`);
  }
  if (failedRequests.length > 0) {
    const reasons = Array.from(new Set(failedRequests.map((request) => request.errorText))).slice(0, 3);
    signals.push(`Failed backend requests=${failedRequests.length}${reasons.length > 0 ? ` (${reasons.join('; ')})` : ''}`);
  }
  if (networkFailureSignal) {
    signals.push('Network failure signal detected');
  }
  if (hasNetworkErrorSignal(errorMessage)) {
    signals.push('Network/dependency signature detected in test error');
  }

  return signals;
}

/**
 * Classify test failure type based on error message and API call patterns.
 * Follows HMCTS observability standards for instant root cause diagnosis.
 */
function classifyFailure(
  error: string,
  serverErrors: ApiError[],
  clientErrors: ApiError[],
  slowCalls: SlowCall[],
  failedRequests: FailedRequest[],
  networkFailureSignal: boolean
): FailureType {
  if (serverErrors.length > 0) {
    return 'DOWNSTREAM_API_5XX';
  }
  if (clientErrors.length > 0) {
    return 'DOWNSTREAM_API_4XX';
  }
  if (error.toLowerCase().includes('timeout') || networkFailureSignal || failedRequests.length > 0 || hasNetworkErrorSignal(error)) {
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

function classifyFailureCategory(failureType: FailureType, dependencySignals: string[]): FailureCategory {
  if (DEPENDENCY_FAILURE_TYPES.has(failureType) || dependencySignals.length > 0) {
    return 'DEPENDENCY_ENVIRONMENT_FAILURE';
  }
  return 'NON_DEPENDENCY_FAILURE';
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

      const failureType = classifyFailure(
        error,
        serverErrors,
        clientErrors,
        slowCalls,
        failedRequests,
        networkFailureSignal
      );
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
