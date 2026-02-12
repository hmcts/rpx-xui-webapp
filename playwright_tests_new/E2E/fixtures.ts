import { test as baseTest } from '@playwright/test';
import { createLogger } from '@hmcts/playwright-common';
import getPort from 'get-port';
import { PageFixtures, pageFixtures } from './page-objects/pages/page.fixtures.js';
import { UtilsFixtures, utilsFixtures } from './utils/utils.fixtures.js';
import {
  ensureApiTracker,
  formatLastBackendCallContext,
  getApiTrackingSnapshot,
  type LastBackendCall,
  type TrackedApiError,
  type TrackedFailedRequest,
  type TrackedSlowCall,
} from './utils/api-tracker';

const logger = createLogger({ serviceName: 'test-framework', format: 'pretty' });

type FailureType =
  | 'DOWNSTREAM_API_5XX'
  | 'DOWNSTREAM_API_4XX'
  | 'SLOW_API_RESPONSE'
  | 'NETWORK_TIMEOUT'
  | 'UI_ELEMENT_MISSING'
  | 'ASSERTION_FAILURE'
  | 'UNKNOWN';

interface ApiFailureAggregate {
  count: number;
  method: string;
  url: string;
  outcome: string;
  initiatedFrom: string;
  resourceType: string;
}

const MAX_API_ERRORS_DETAILS_CHARS = 420;
const ANSI_ESCAPE = String.fromCodePoint(27);
const ANSI_ESCAPE_PATTERN = new RegExp(String.raw`${ANSI_ESCAPE}\[[0-?]*[ -/]*[@-~]`, 'g');

function stripAnsi(value: string): string {
  return value.replaceAll(ANSI_ESCAPE_PATTERN, '');
}

function summarizeApiFailures(
  serverErrors: TrackedApiError[],
  clientErrors: TrackedApiError[],
  failedRequests: TrackedFailedRequest[]
): string[] {
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
  slowCalls: TrackedSlowCall[],
  failedRequests: TrackedFailedRequest[]
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
  serverErrors: TrackedApiError[],
  clientErrors: TrackedApiError[],
  failedRequests: TrackedFailedRequest[],
  slowCalls: TrackedSlowCall[],
  lastBackendCall?: LastBackendCall | null
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

  if (lastBackendCall) {
    const durationText = lastBackendCall.durationMs === null ? 'unknown' : `${lastBackendCall.durationMs}ms`;
    return `${lastBackendCall.method} ${lastBackendCall.url} -> HTTP ${lastBackendCall.status} (${durationText})`;
  }

  return 'No backend/API suspect identified';
}

function buildLastBackendTimeoutContext(lastBackendCall: LastBackendCall | null): string {
  if (!lastBackendCall) {
    return 'No backend timeout call captured and no backend API calls were observed before failure.';
  }
  return `No backend timeout call captured. ${formatLastBackendCallContext(lastBackendCall, 'before failure.')}`;
}

/**
 * Classify test failure type based on error message and API call patterns.
 * Follows HMCTS observability standards for instant root cause diagnosis.
 */
function classifyFailure(
  error: string,
  serverErrors: TrackedApiError[],
  clientErrors: TrackedApiError[],
  slowCalls: TrackedSlowCall[],
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
    ensureApiTracker(page);

    await use(page);

    // On test failure, classify the root cause and attach diagnosis
    if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
      const snapshot = getApiTrackingSnapshot(page);
      const apiErrors = snapshot.apiErrors;
      const failedRequests = snapshot.failedRequests;
      const slowCalls = snapshot.slowCalls;
      const lastBackendCall = snapshot.lastBackendCall;
      const networkTimeout = snapshot.networkTimeout;

      // Only use error message, not stack trace to prevent PII leakage
      const error = testInfo.error?.message || '';

      // Classify failure type
      const serverErrors = apiErrors.filter((e) => e.status >= 500);
      const clientErrors = apiErrors.filter((e) => e.status >= 400 && e.status < 500);
      const failureType = classifyFailure(error, serverErrors, clientErrors, slowCalls, networkTimeout);
      const timeoutSuspects = buildTimeoutSuspects(slowCalls, failedRequests);
      const topSuspect = buildTopSuspect(
        failureType,
        timeoutSuspects,
        serverErrors,
        clientErrors,
        failedRequests,
        slowCalls,
        lastBackendCall
      );
      const timeoutSummary =
        failureType === 'NETWORK_TIMEOUT' || failureType === 'SLOW_API_RESPONSE'
          ? buildBoundedApiDetails(timeoutSuspects, MAX_API_ERRORS_DETAILS_CHARS) ||
            buildLastBackendTimeoutContext(lastBackendCall)
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
            lastBackendCall,
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
