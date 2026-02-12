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
  initiatedFrom: string;
  resourceType: string;
}

interface FailedRequest {
  url: string;
  method: string;
  errorText: string;
  initiatedFrom: string;
  resourceType: string;
}

interface ApiFailureAggregate {
  count: number;
  method: string;
  url: string;
  outcome: string;
  initiatedFrom: string;
  resourceType: string;
}

type BenignApiErrorRule = {
  method: string;
  status: number;
  urlPattern: RegExp;
};

const benignApiErrorRules: BenignApiErrorRule[] = [
  { method: 'GET', status: 403, urlPattern: /\/api\/organisation$/ },
  { method: 'GET', status: 400, urlPattern: /\/data\/internal\/cases\/\d+$/ },
];

const MAX_API_ERRORS_DETAILS_CHARS = 420;
const ANSI_ESCAPE = String.fromCodePoint(27);
const ANSI_ESCAPE_PATTERN = new RegExp(String.raw`${ANSI_ESCAPE}\[[0-?]*[ -/]*[@-~]`, 'g');

/**
 * Sanitize URL by removing query parameters to prevent logging sensitive data.
 * Query params may contain tokens, session IDs, or PII.
 * @param url - Full URL with potential query parameters
 * @returns URL without query parameters
 */
function sanitizeUrl(url: string): string {
  return url.split('?')[0];
}

function stripAnsi(value: string): string {
  return value.replaceAll(ANSI_ESCAPE_PATTERN, '');
}

function isKnownBenignApiError(url: string, method: string, status: number): boolean {
  const requestMethod = method.toUpperCase();
  return benignApiErrorRules.some((rule) => {
    return rule.status === status && rule.method === requestMethod && rule.urlPattern.test(url);
  });
}

function summarizeApiFailures(serverErrors: ApiError[], clientErrors: ApiError[], failedRequests: FailedRequest[]): string[] {
  const aggregates = new Map<string, ApiFailureAggregate>();

  const add = (method: string, url: string, outcome: string, initiatedFrom: string, resourceType: string) => {
    const key = `${method}|${url}|${outcome}|${initiatedFrom}|${resourceType}`;
    const existing = aggregates.get(key);
    if (existing) {
      existing.count += 1;
      return;
    }
    aggregates.set(key, {
      count: 1,
      method,
      url,
      outcome,
      initiatedFrom,
      resourceType,
    });
  };

  serverErrors.forEach((error) => add(error.method, error.url, `HTTP ${error.status}`, error.initiatedFrom, error.resourceType));
  clientErrors.forEach((error) => add(error.method, error.url, `HTTP ${error.status}`, error.initiatedFrom, error.resourceType));
  failedRequests.forEach((request) =>
    add(
      request.method,
      request.url,
      `REQUEST_FAILED (${stripAnsi(request.errorText).substring(0, 120)})`,
      request.initiatedFrom,
      request.resourceType
    )
  );

  return Array.from(aggregates.values()).map((item) =>
    item.count > 1
      ? `${item.method} ${item.url} -> ${item.outcome} [from: ${item.initiatedFrom}] [type: ${item.resourceType}] (x${item.count})`
      : `${item.method} ${item.url} -> ${item.outcome} [from: ${item.initiatedFrom}] [type: ${item.resourceType}]`
  );
}

function buildBoundedApiDetails(entries: string[], maxChars: number): string {
  if (!entries.length) {
    return '';
  }

  let details = '';
  let included = 0;

  for (const candidate of entries) {
    const separator = details ? ' | ' : '';
    const next = `${details}${separator}${candidate}`;
    if (next.length > maxChars) {
      break;
    }
    details = next;
    included += 1;
  }

  if (!details) {
    const truncated = entries[0].slice(0, Math.max(1, maxChars - 32)).trimEnd();
    const overflow = entries.length - 1;
    return overflow > 0
      ? `${truncated}... | +${overflow} more (see failure-data.json)`
      : `${truncated}... (see failure-data.json)`;
  }

  const overflow = entries.length - included;
  return overflow > 0 ? `${details} | +${overflow} more (see failure-data.json)` : details;
}

function buildTimeoutSuspects(
  slowCalls: Array<{ url: string; duration: number; method: string }>,
  failedRequests: FailedRequest[]
): string[] {
  const timeoutFailures = failedRequests.filter((request) => /timeout|timed out|ETIMEDOUT/i.test(request.errorText));
  const suspectsFromFailed = timeoutFailures.map(
    (request) => `${request.method} ${request.url} -> REQUEST_FAILED (${stripAnsi(request.errorText).substring(0, 120)})`
  );
  const suspectsFromSlow = slowCalls.map((call) => `${call.method} ${call.url} -> SLOW (${Math.round(call.duration)}ms)`);

  return [...suspectsFromFailed, ...suspectsFromSlow];
}

function buildTopSuspect(
  failureType: FailureType,
  timeoutSuspects: string[],
  serverErrors: ApiError[],
  clientErrors: ApiError[],
  failedRequests: FailedRequest[],
  slowCalls: Array<{ url: string; duration: number; method: string }>
): string {
  if ((failureType === 'NETWORK_TIMEOUT' || failureType === 'SLOW_API_RESPONSE') && timeoutSuspects.length > 0) {
    return timeoutSuspects[0];
  }

  const summarizedFailedCalls = summarizeApiFailures(serverErrors, clientErrors, failedRequests);
  if (summarizedFailedCalls.length > 0) {
    return summarizedFailedCalls[0];
  }

  if (slowCalls.length > 0) {
    const firstSlow = slowCalls[0];
    return `${firstSlow.method} ${firstSlow.url} -> SLOW (${Math.round(firstSlow.duration)}ms)`;
  }

  return 'No backend/API suspect identified';
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
export const test = baseTest.extend<CustomFixtures, { lighthousePort: number }>({
  ...pageFixtures,
  ...utilsFixtures,

  page: async ({ page }, use, testInfo) => {
    const apiErrors: ApiError[] = [];
    const failedRequests: FailedRequest[] = [];
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
        const request = response.request();
        const method = request.method();
        const refererHeader = request.headers()['referer'] || '';
        const frameUrl = request.frame()?.url() || '';
        const initiatedFrom = sanitizeUrl(refererHeader || frameUrl || 'unknown');
        const resourceType = request.resourceType();
        const sanitizedUrl = sanitizeUrl(url);

        // Track all 4xx and 5xx errors
        if (status >= 400 && !isKnownBenignApiError(sanitizedUrl, method, status)) {
          apiErrors.push({ url: sanitizedUrl, status, method, initiatedFrom, resourceType });
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
        const refererHeader = request.headers()['referer'] || '';
        const frameUrl = request.frame()?.url() || '';
        const initiatedFrom = sanitizeUrl(refererHeader || frameUrl || 'unknown');
        const resourceType = request.resourceType();
        failedRequests.push({
          url: sanitizeUrl(url),
          method: request.method(),
          errorText: failure?.errorText || 'Unknown request failure',
          initiatedFrom,
          resourceType,
        });
        if (failedRequests.length > maxTracked) {
          failedRequests.shift();
        }
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
      const timeoutSuspects = buildTimeoutSuspects(slowCalls, failedRequests);
      const topSuspect = buildTopSuspect(failureType, timeoutSuspects, serverErrors, clientErrors, failedRequests, slowCalls);
      const timeoutSummary =
        failureType === 'NETWORK_TIMEOUT' || failureType === 'SLOW_API_RESPONSE'
          ? buildBoundedApiDetails(timeoutSuspects, MAX_API_ERRORS_DETAILS_CHARS) ||
            'No backend timeout call captured (likely UI timeout or non-API wait)'
          : '';

      const diagnosis = [
        `Test failed: ${testInfo.title}`,
        `Failure type: ${failureType}`,
        error ? `Error: ${error.substring(0, 300)}` : '',
        `API summary: total=${apiErrors.length + failedRequests.length + slowCalls.length}, 5xx=${serverErrors.length}, 4xx=${clientErrors.length}, requestfailed=${failedRequests.length}, slow>${slowCalls.length}`,
        timeoutSummary ? `Timeout suspects: ${timeoutSummary}` : '',
      ]
        .filter(Boolean)
        .join('\n');

      logger.error(diagnosis);

      // Surface to Odhín report as annotations
      testInfo.annotations.push(
        { type: 'Failure type', description: failureType },
        { type: 'Top suspect', description: topSuspect }
      );

      if (failureType === 'DOWNSTREAM_API_5XX' || failureType === 'DOWNSTREAM_API_4XX' || failedRequests.length > 0) {
        const summarizedFailedCalls = summarizeApiFailures(serverErrors, clientErrors, failedRequests);
        const boundedApiDetails = buildBoundedApiDetails(summarizedFailedCalls, MAX_API_ERRORS_DETAILS_CHARS);
        testInfo.annotations.push({
          type: 'API errors',
          description: `${summarizedFailedCalls.length} unique failed endpoint/outcome combination(s) captured`,
        });
        if (boundedApiDetails) {
          testInfo.annotations.push({ type: 'API errors (details)', description: boundedApiDetails });
        }
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

      if (timeoutSummary) {
        testInfo.annotations.push({ type: 'Timeout suspects', description: timeoutSummary });
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
            topSuspect,
            apiErrors,
            failedRequests,
            slowCalls,
            networkTimeout,
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
