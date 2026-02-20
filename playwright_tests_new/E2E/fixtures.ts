import { test as baseTest, type Request, type Response, type TestInfo } from '@playwright/test';
import { createLogger } from '@hmcts/playwright-common';
import getPort from 'get-port';
import { PageFixtures, pageFixtures } from './page-objects/pages/page.fixtures.js';
import { UtilsFixtures, utilsFixtures } from './utils/utils.fixtures.js';
import { getSetupMarker } from '../common/sessionCapture';

const logger = createLogger({ serviceName: 'test-framework', format: 'pretty' });

type FailureType =
  | 'DOWNSTREAM_API_5XX'
  | 'DOWNSTREAM_API_4XX'
  | 'SLOW_API_RESPONSE'
  | 'NETWORK_TIMEOUT'
  | 'TIMEOUT_NO_API_ACTIVITY'
  | 'GLOBAL_TIMEOUT_UI_STALL'
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

interface SlowCallAggregate {
  count: number;
  method: string;
  url: string;
  totalDuration: number;
  maxDuration: number;
}

interface ExecutionSignals {
  lastMainFrameUrl: string;
  mainFrameNavigationCount: number;
  totalRequestsObserved: number;
  backendRequestsObserved: number;
}

interface ErrorContext {
  primaryMessage: string;
  diagnosticText: string;
  actionableLine: string;
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
const DEFAULT_API_SLOW_THRESHOLD_MS = 5_000;
const DEFAULT_LIVE_TEST_TIMER_INTERVAL_MS = 30_000;
const STRONG_SLOW_CALL_DURATION_MS = 15_000;
const STRONG_SLOW_CALL_COUNT = 2;
const ANSI_ESCAPE = String.fromCodePoint(27);
const ANSI_ESCAPE_PATTERN = new RegExp(String.raw`${ANSI_ESCAPE}\[[0-?]*[ -/]*[@-~]`, 'g');
const TRUTHY_ENV_VALUES = new Set(['1', 'true', 'yes', 'on']);

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

function getApiSlowThresholdMs(): number {
  const rawThreshold = process.env.API_SLOW_THRESHOLD_MS;
  if (!rawThreshold) {
    return DEFAULT_API_SLOW_THRESHOLD_MS;
  }

  const parsedThreshold = Number.parseInt(rawThreshold, 10);
  return Number.isFinite(parsedThreshold) && parsedThreshold > 0 ? parsedThreshold : DEFAULT_API_SLOW_THRESHOLD_MS;
}

function isLiveTestTimerEnabled(): boolean {
  const rawFlag = process.env.PW_LIVE_TEST_TIMER?.trim().toLowerCase();
  if (!rawFlag) {
    return false;
  }
  return TRUTHY_ENV_VALUES.has(rawFlag);
}

function getLiveTestTimerIntervalMs(): number {
  const rawInterval = process.env.PW_LIVE_TEST_TIMER_INTERVAL_MS;
  if (!rawInterval) {
    return DEFAULT_LIVE_TEST_TIMER_INTERVAL_MS;
  }
  const parsedInterval = Number.parseInt(rawInterval, 10);
  return Number.isFinite(parsedInterval) && parsedInterval >= 1_000 ? parsedInterval : DEFAULT_LIVE_TEST_TIMER_INTERVAL_MS;
}

function formatElapsed(elapsedMs: number): string {
  const totalSeconds = Math.floor(Math.max(0, elapsedMs) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
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
  if (failureType === 'GLOBAL_TIMEOUT_UI_STALL') {
    return 'No dominant backend/API suspect identified';
  }

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

function aggregateSlowCalls(slowCalls: Array<{ url: string; duration: number; method: string }>): SlowCallAggregate[] {
  const aggregates = new Map<string, SlowCallAggregate>();
  for (const call of slowCalls) {
    const key = `${call.method}|${call.url}`;
    const current = aggregates.get(key);
    if (current) {
      current.count += 1;
      current.totalDuration += call.duration;
      current.maxDuration = Math.max(current.maxDuration, call.duration);
      continue;
    }
    aggregates.set(key, {
      count: 1,
      method: call.method,
      url: call.url,
      totalDuration: call.duration,
      maxDuration: call.duration,
    });
  }

  return Array.from(aggregates.values()).sort((a, b) => {
    if (b.maxDuration !== a.maxDuration) {
      return b.maxDuration - a.maxDuration;
    }
    if (b.count !== a.count) {
      return b.count - a.count;
    }
    return b.totalDuration - a.totalDuration;
  });
}

function summarizeSlowEndpoint(aggregate: SlowCallAggregate): string {
  const averageDuration = Math.round(aggregate.totalDuration / aggregate.count);
  return `${aggregate.method} ${aggregate.url} (count=${aggregate.count}, avg=${averageDuration}ms, max=${Math.round(aggregate.maxDuration)}ms)`;
}

function hasStrongSlowBackendSignal(slowCalls: Array<{ url: string; duration: number; method: string }>): boolean {
  if (slowCalls.length >= STRONG_SLOW_CALL_COUNT) {
    return true;
  }
  return slowCalls.some((call) => call.duration >= STRONG_SLOW_CALL_DURATION_MS);
}

function extractFailureLocation(error: string, testInfo: TestInfo): string {
  const stackMatches = error.match(/\(([^()]+:\d+:\d+)\)/g) ?? [];
  for (const match of stackMatches) {
    const location = match.slice(1, -1);
    if (!location.includes('node_modules')) {
      return location;
    }
  }

  const directMatch = /at\s+([^\s()]+:\d+:\d+)/.exec(error);
  if (directMatch?.[1]) {
    return directMatch[1];
  }

  const file = testInfo.file ? sanitizeUrl(testInfo.file) : 'unknown';
  const line = typeof testInfo.line === 'number' ? testInfo.line : 0;
  const column = typeof testInfo.column === 'number' ? testInfo.column : 0;
  return `${file}:${line}:${column}`;
}

function summarizeExecutionSignals(signals: ExecutionSignals): string {
  return `lastUrl=${signals.lastMainFrameUrl}, navigations=${signals.mainFrameNavigationCount}, requests=${signals.totalRequestsObserved}, backendRequests=${signals.backendRequestsObserved}`;
}

function deriveBackendWaitFlag(
  failureType: FailureType,
  serverErrors: ApiError[],
  clientErrors: ApiError[],
  slowCalls: Array<{ url: string; duration: number; method: string }>,
  failedRequests: FailedRequest[]
): 'yes' | 'no' {
  if (failureType === 'GLOBAL_TIMEOUT_UI_STALL') {
    return 'no';
  }
  const hasTimeoutFailedRequest = failedRequests.some((request) => /timeout|timed out|ETIMEDOUT/i.test(request.errorText));
  const hasBackendFailureSignal =
    serverErrors.length > 0 || clientErrors.length > 0 || slowCalls.length > 0 || hasTimeoutFailedRequest;
  if (hasBackendFailureSignal) {
    return 'yes';
  }
  if (failureType === 'NETWORK_TIMEOUT' || failureType === 'SLOW_API_RESPONSE') {
    return 'yes';
  }
  return 'no';
}

function isSlowOrNetworkTimeout(failureType: FailureType): boolean {
  return failureType === 'SLOW_API_RESPONSE' || failureType === 'NETWORK_TIMEOUT';
}

function deriveTimeoutPhaseMarker(
  failureType: 'TIMEOUT_NO_API_ACTIVITY' | 'GLOBAL_TIMEOUT_UI_STALL',
  inSetupHook: boolean,
  executionSignals: ExecutionSignals
): string {
  if (failureType === 'TIMEOUT_NO_API_ACTIVITY') {
    if (inSetupHook) {
      return 'setup-pre-backend';
    }
    if (executionSignals.totalRequestsObserved === 0) {
      return 'bootstrap-pre-network';
    }
    if (executionSignals.backendRequestsObserved === 0) {
      return 'ui-wait-pre-backend';
    }
    return 'ui-timeout-no-backend';
  }
  // GLOBAL_TIMEOUT_UI_STALL
  if (inSetupHook) {
    return 'setup-ui-timeout';
  }
  return executionSignals.backendRequestsObserved > 0 ? 'ui-timeout-post-backend' : 'ui-timeout-pre-backend';
}

function derivePhaseMarker(
  failureType: FailureType,
  error: string,
  executionSignals: ExecutionSignals,
  backendWait: 'yes' | 'no'
): string {
  const inSetupHook = /beforeEach|beforeAll|hook/i.test(error);

  if (failureType === 'TIMEOUT_NO_API_ACTIVITY' || failureType === 'GLOBAL_TIMEOUT_UI_STALL') {
    return deriveTimeoutPhaseMarker(failureType, inSetupHook, executionSignals);
  }
  if (isSlowOrNetworkTimeout(failureType)) {
    return backendWait === 'yes' ? 'backend-wait-timeout' : 'timeout-unknown-wait';
  }
  if (failureType === 'DOWNSTREAM_API_5XX') {
    return 'backend-5xx';
  }
  if (failureType === 'DOWNSTREAM_API_4XX') {
    return 'backend-4xx';
  }
  if (failureType === 'UI_ELEMENT_MISSING') {
    return backendWait === 'yes' ? 'ui-wait-post-backend' : 'ui-wait-pre-backend';
  }
  if (failureType === 'ASSERTION_FAILURE') {
    return backendWait === 'yes' ? 'assertion-post-backend' : 'assertion-pre-backend';
  }

  return backendWait === 'yes' ? 'unknown-post-backend' : 'unknown-pre-backend';
}

function extractActionableErrorLine(diagnosticText: string): string {
  const lines = stripAnsi(diagnosticText)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const nonActionablePatterns: RegExp[] = [
    /^Test timeout of \d+ms exceeded/i,
    /^Timeout of \d+ms exceeded/i,
    /^at /,
    /^Call log:/i,
    /^attachment #/i,
    /^Error Context:/i,
    /^API summary:/i,
    /^Timeout suspects:/i,
    /^ENOENT:/i,
    /^apiRequestContext\._wrapApiCall: ENOENT/i,
  ];

  for (const rawLine of lines) {
    const line = rawLine.replace(/^Error:\s*/, '');
    if (nonActionablePatterns.some((pattern) => pattern.test(line))) {
      continue;
    }
    if (line.length < 6) {
      continue;
    }
    return line.slice(0, 220);
  }

  return '';
}

function collectErrorContext(testInfo: TestInfo): ErrorContext {
  const allErrorEntries = (testInfo.errors ?? []).map((item) =>
    [item.message ?? '', item.stack ?? ''].filter(Boolean).join('\n')
  );
  const fallbackEntry = [testInfo.error?.message ?? '', testInfo.error?.stack ?? ''].filter(Boolean).join('\n');
  const diagnosticText = (allErrorEntries.length > 0 ? allErrorEntries : [fallbackEntry]).filter(Boolean).join('\n\n---\n\n');
  const primaryMessage =
    testInfo.error?.message ??
    allErrorEntries.find((entry) => entry.trim().length > 0)?.split('\n')[0] ??
    'No error message captured by Playwright';

  return {
    primaryMessage,
    diagnosticText: diagnosticText || primaryMessage,
    actionableLine: extractActionableErrorLine(diagnosticText || primaryMessage),
  };
}

interface TimeoutRootCauseContext {
  failureType: 'TIMEOUT_NO_API_ACTIVITY' | 'GLOBAL_TIMEOUT_UI_STALL';
  error: string;
  dominantSlowEndpoint: SlowCallAggregate | null;
  executionSignals: ExecutionSignals;
  failureLocation: string;
  actionableErrorLine: string;
}

function deriveTimeoutRootCause({
  failureType,
  error,
  dominantSlowEndpoint,
  executionSignals,
  failureLocation,
  actionableErrorLine,
}: TimeoutRootCauseContext): string {
  const locationHint = failureLocation && failureLocation !== 'unknown:0:0' ? ` Location: ${failureLocation}.` : '';
  const actionableHint = actionableErrorLine ? ` Last actionable error: ${actionableErrorLine}.` : '';
  const isPageClosed = /Target page, context or browser has been closed/i.test(error);
  const closureHint = isPageClosed
    ? ' Page/context was then closed by Playwright timeout teardown; locator/page-closed errors are secondary.'
    : '';

  if (failureType === 'TIMEOUT_NO_API_ACTIVITY') {
    const inSetupHook = /beforeEach|beforeAll|hook/i.test(error);
    const phaseHint = inSetupHook
      ? 'Likely stuck in session bootstrap, navigation, or UI wait before backend calls.'
      : 'Likely spent timeout budget in UI-only steps/retries before backend calls were triggered.';
    return `Global test timeout with no backend API activity (${summarizeExecutionSignals(executionSignals)}). ${phaseHint}${closureHint}${locationHint}${actionableHint}`;
  }

  // GLOBAL_TIMEOUT_UI_STALL
  const slowHint = dominantSlowEndpoint
    ? ` Observed isolated slow backend call (${summarizeSlowEndpoint(dominantSlowEndpoint)}), but not enough evidence to treat backend latency as dominant root cause.`
    : '';
  return `Global test timeout during UI workflow (${summarizeExecutionSignals(executionSignals)}). Backend activity occurred, but no dominant backend failure/timeout pattern was captured.${slowHint}${closureHint}${locationHint}${actionableHint}`;
}

interface RootCauseContext {
  failureType: FailureType;
  testStatus: TestInfo['status'];
  error: string;
  timeoutSummary: string;
  dominantSlowEndpoint: SlowCallAggregate | null;
  topSuspect: string;
  executionSignals: ExecutionSignals;
  failureLocation: string;
  actionableErrorLine: string;
}

function deriveLikelyRootCause({
  failureType,
  testStatus,
  error,
  timeoutSummary,
  dominantSlowEndpoint,
  topSuspect,
  executionSignals,
  failureLocation,
  actionableErrorLine,
}: RootCauseContext): string {
  const isPageClosed = /Target page, context or browser has been closed/i.test(error);

  if (failureType === 'TIMEOUT_NO_API_ACTIVITY' || failureType === 'GLOBAL_TIMEOUT_UI_STALL') {
    return deriveTimeoutRootCause({
      failureType,
      error,
      dominantSlowEndpoint,
      executionSignals,
      failureLocation,
      actionableErrorLine,
    });
  }

  if (isSlowOrNetworkTimeout(failureType) && dominantSlowEndpoint) {
    const endpointSummary = summarizeSlowEndpoint(dominantSlowEndpoint);
    return testStatus === 'timedOut' || isPageClosed
      ? `Global test timeout reached while backend dependency remained slow: ${endpointSummary}`
      : `Backend dependency latency likely caused failure: ${endpointSummary}`;
  }

  if (isSlowOrNetworkTimeout(failureType) && timeoutSummary) {
    return `Timeout-related failure with backend/network suspects: ${timeoutSummary}`;
  }

  if (failureType === 'DOWNSTREAM_API_5XX') {
    return `Downstream 5xx response caused workflow failure (${topSuspect})`;
  }

  if (failureType === 'DOWNSTREAM_API_4XX') {
    return `Downstream 4xx response likely blocked workflow (${topSuspect})`;
  }

  if (isPageClosed && testStatus === 'timedOut') {
    return 'Page was closed because the test exceeded the global timeout budget';
  }

  if (topSuspect !== 'No backend/API suspect identified') {
    return `Likely failure driver: ${topSuspect}`;
  }

  return 'No dominant backend suspect identified; inspect stack/location and trace';
}

interface ClassifyFailureContext {
  error: string;
  serverErrors: ApiError[];
  clientErrors: ApiError[];
  slowCalls: Array<{ url: string; duration: number; method: string }>;
  failedRequests: FailedRequest[];
  networkTimeout: boolean;
  testStatus: TestInfo['status'];
  executionSignals: ExecutionSignals;
}

/**
 * Classify test failure type based on error message and API call patterns.
 * Follows HMCTS observability standards for instant root cause diagnosis.
 */
function classifyFailure({
  error,
  serverErrors,
  clientErrors,
  slowCalls,
  failedRequests,
  networkTimeout,
  testStatus,
  executionSignals,
}: ClassifyFailureContext): FailureType {
  const normalizedError = error.toLowerCase();
  const hasTimeoutKeyword = normalizedError.includes('timeout') || normalizedError.includes('timed out');
  const hasBackendFailureSignals = serverErrors.length + clientErrors.length + slowCalls.length + failedRequests.length > 0;
  const hasStrongSlowSignal = hasStrongSlowBackendSignal(slowCalls);
  const hasLocatorSignal = error.includes('locator') || error.includes('element') || error.includes('waiting for');
  const hasNetworkTimeoutFailure =
    networkTimeout || failedRequests.some((request) => /timeout|timed out|ETIMEDOUT/i.test(request.errorText));

  if (serverErrors.length > 0) {
    return 'DOWNSTREAM_API_5XX';
  }
  if (clientErrors.length > 0) {
    return 'DOWNSTREAM_API_4XX';
  }
  if (hasNetworkTimeoutFailure) {
    return slowCalls.length > 0 ? 'SLOW_API_RESPONSE' : 'NETWORK_TIMEOUT';
  }
  if (testStatus !== 'timedOut' && hasLocatorSignal && !hasBackendFailureSignals) {
    return 'UI_ELEMENT_MISSING';
  }
  if (testStatus === 'timedOut' || hasTimeoutKeyword) {
    if (!hasBackendFailureSignals && executionSignals.backendRequestsObserved === 0) {
      return 'TIMEOUT_NO_API_ACTIVITY';
    }
    if (hasStrongSlowSignal) {
      return 'SLOW_API_RESPONSE';
    }
    return 'GLOBAL_TIMEOUT_UI_STALL';
  }
  if (hasLocatorSignal) {
    return 'UI_ELEMENT_MISSING';
  }
  if (error.includes('expect') || error.includes('Expected') || error.includes('Received')) {
    return 'ASSERTION_FAILURE';
  }
  return 'UNKNOWN';
}

/**
 * Helper to determine if a URL is a backend API endpoint.
 * Excludes static assets (JS, CSS) from monitoring.
 */
function isBackendApi(url: string): boolean {
  return (
    (url.includes('/api/') ||
      url.includes('/data/') ||
      url.includes('/auth/') ||
      url.includes('/workallocation/') ||
      url.includes('/aggregated/') ||
      url.includes('/caseworkers/')) &&
    !url.includes('.js') &&
    !url.includes('.css')
  );
}

/**
 * Creates a response handler for tracking API errors.
 * Monitors 4xx and 5xx responses, excluding known benign errors.
 */
function createResponseHandler(apiErrors: ApiError[], maxTracked: number) {
  return async (response: Response) => {
    try {
      const url = response.url();
      if (!isBackendApi(url)) {
        return;
      }

      const status = response.status();
      const request = response.request();
      const method = request.method();
      const refererHeader = request.headers()['referer'] ?? '';
      const frameUrl = request.frame()?.url() ?? '';
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
  };
}

/**
 * Creates a request finished handler for tracking slow API calls.
 */
function createRequestFinishedHandler(
  slowCalls: Array<{ url: string; duration: number; method: string }>,
  slowThreshold: number,
  maxTracked: number
) {
  return (request: Request) => {
    const url = request.url();
    if (!isBackendApi(url)) {
      return;
    }

    const timing = request.timing();
    if (timing.responseEnd !== -1 && timing.responseEnd > slowThreshold) {
      slowCalls.push({
        url: sanitizeUrl(url),
        duration: timing.responseEnd,
        method: request.method(),
      });
      if (slowCalls.length > maxTracked) {
        slowCalls.shift();
      }
    }
  };
}

/**
 * Creates a request failed handler for tracking failed network requests.
 */
function createRequestFailedHandler(failedRequests: FailedRequest[], maxTracked: number, networkTimeoutRef: { value: boolean }) {
  return (request: Request) => {
    const url = request.url();
    if (isBackendApi(url)) {
      const failure = request.failure();
      const refererHeader = request.headers()['referer'] ?? '';
      const frameUrl = request.frame()?.url() ?? '';
      const initiatedFrom = sanitizeUrl(refererHeader || frameUrl || 'unknown');
      const resourceType = request.resourceType();
      failedRequests.push({
        url: sanitizeUrl(url),
        method: request.method(),
        errorText: failure?.errorText ?? 'Unknown request failure',
        initiatedFrom,
        resourceType,
      });
      if (failedRequests.length > maxTracked) {
        failedRequests.shift();
      }
      if (failure?.errorText?.includes('Timeout') || failure?.errorText?.includes('timeout')) {
        networkTimeoutRef.value = true;
      }
    }
  };
}

interface FailureDiagnosisContext {
  testInfo: TestInfo;
  testStatus: TestInfo['status'];
  error: string;
  primaryError: string;
  actionableError: string;
  setupMarker: string;
  apiErrors: ApiError[];
  failedRequests: FailedRequest[];
  slowCalls: Array<{ url: string; duration: number; method: string }>;
  networkTimeout: boolean;
  slowThreshold: number;
  executionSignals: ExecutionSignals;
}

/**
 * Attaches failure diagnosis annotations and artifacts to test info.
 * Follows HMCTS observability standards for instant root cause diagnosis.
 */
async function attachFailureDiagnosis(context: FailureDiagnosisContext): Promise<void> {
  const {
    testInfo,
    testStatus,
    error,
    primaryError,
    actionableError,
    setupMarker,
    apiErrors,
    failedRequests,
    slowCalls,
    networkTimeout,
    slowThreshold,
    executionSignals,
  } = context;
  const serverErrors = apiErrors.filter((e) => e.status >= 500);
  const clientErrors = apiErrors.filter((e) => e.status >= 400 && e.status < 500);
  const failureType = classifyFailure({
    error,
    serverErrors,
    clientErrors,
    slowCalls,
    failedRequests,
    networkTimeout,
    testStatus,
    executionSignals,
  });
  const timeoutSuspects = buildTimeoutSuspects(slowCalls, failedRequests);
  const slowCallAggregates = aggregateSlowCalls(slowCalls);
  const dominantSlowEndpoint = slowCallAggregates[0] ?? null;
  const slowEndpointSummary = slowCallAggregates.slice(0, 3).map((entry) => summarizeSlowEndpoint(entry));
  const topSuspect = buildTopSuspect(failureType, timeoutSuspects, serverErrors, clientErrors, failedRequests, slowCalls);
  const timeoutSummary =
    failureType === 'NETWORK_TIMEOUT' || failureType === 'SLOW_API_RESPONSE'
      ? buildBoundedApiDetails(timeoutSuspects, MAX_API_ERRORS_DETAILS_CHARS) ||
        'No backend timeout call captured (likely UI timeout or non-API wait)'
      : '';
  const backendWait = deriveBackendWaitFlag(failureType, serverErrors, clientErrors, slowCalls, failedRequests);
  const phaseMarker = derivePhaseMarker(failureType, error, executionSignals, backendWait);
  const failureLocation = extractFailureLocation(error, testInfo);
  const likelyRootCause = deriveLikelyRootCause({
    failureType,
    testStatus,
    error,
    timeoutSummary,
    dominantSlowEndpoint,
    topSuspect,
    executionSignals,
    failureLocation,
    actionableErrorLine: actionableError,
  });
  const executionSignalSummary = summarizeExecutionSignals(executionSignals);
  const slowEndpointDetails = buildBoundedApiDetails(slowEndpointSummary, MAX_API_ERRORS_DETAILS_CHARS);

  const diagnosis = [
    `Test failed: ${testInfo.title}`,
    `Status: ${testStatus}`,
    `Failure type: ${failureType}`,
    `Phase marker: ${phaseMarker}`,
    `Setup marker: ${setupMarker}`,
    `Backend wait: ${backendWait}`,
    `Likely root cause: ${likelyRootCause}`,
    `Failure location: ${failureLocation}`,
    `Execution signals: ${executionSignalSummary}`,
    actionableError ? `Actionable error: ${actionableError}` : '',
    primaryError ? `Error: ${primaryError.substring(0, 300)}` : '',
    `API summary: total=${apiErrors.length + failedRequests.length + slowCalls.length}, 5xx=${serverErrors.length}, 4xx=${clientErrors.length}, requestfailed=${failedRequests.length}, slow>${slowThreshold}ms=${slowCalls.length}`,
    slowEndpointDetails ? `Slow endpoint summary: ${slowEndpointDetails}` : '',
    timeoutSummary ? `Timeout suspects: ${timeoutSummary}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  logger.error(diagnosis);

  // Surface to Odhín report as annotations
  testInfo.annotations.push(
    { type: 'Failure type', description: failureType },
    { type: 'Phase marker', description: phaseMarker },
    { type: 'Setup marker', description: setupMarker },
    { type: 'Backend wait', description: backendWait },
    { type: 'Likely root cause', description: likelyRootCause },
    { type: 'Failure location', description: failureLocation },
    { type: 'Execution signals', description: executionSignalSummary },
    { type: 'Top suspect', description: topSuspect }
  );
  if (actionableError) {
    testInfo.annotations.push({ type: 'Actionable error', description: actionableError });
  }

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
    if (slowEndpointDetails) {
      testInfo.annotations.push({
        type: 'Slow endpoint summary',
        description: slowEndpointDetails,
      });
    }
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
        phaseMarker,
        setupMarker,
        backendWait,
        likelyRootCause,
        failureLocation,
        actionableError,
        executionSignals,
        topSuspect,
        slowEndpointSummary,
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
    const networkTimeoutRef = { value: false };
    const liveTimerEnabled = isLiveTestTimerEnabled();
    const liveTimerIntervalMs = getLiveTestTimerIntervalMs();
    const testStartEpochMs = Date.now();
    let mainFrameNavigationCount = 0;
    let totalRequestsObserved = 0;
    let backendRequestsObserved = 0;
    let lastMainFrameUrl = sanitizeUrl(page.url() || 'about:blank');
    let liveTimerHandle: NodeJS.Timeout | undefined;
    const maxTracked = 500;
    const slowThreshold = getApiSlowThresholdMs();

    if (liveTimerEnabled) {
      logger.info('Test timer started', {
        title: testInfo.title,
        project: testInfo.project.name,
        worker: process.env.TEST_WORKER_INDEX ?? 'unknown',
        intervalMs: liveTimerIntervalMs,
      });
      liveTimerHandle = setInterval(() => {
        const elapsedMs = Date.now() - testStartEpochMs;
        logger.info('Test in progress', {
          title: testInfo.title,
          elapsedMs,
          elapsed: formatElapsed(elapsedMs),
          worker: process.env.TEST_WORKER_INDEX ?? 'unknown',
          setupMarker: getSetupMarker(page),
          lastUrl: lastMainFrameUrl,
        });
      }, liveTimerIntervalMs);
      liveTimerHandle.unref?.();
    }

    page.on('framenavigated', (frame) => {
      if (frame !== page.mainFrame()) {
        return;
      }
      mainFrameNavigationCount += 1;
      lastMainFrameUrl = sanitizeUrl(frame.url() || lastMainFrameUrl);
    });
    page.on('request', (request) => {
      totalRequestsObserved += 1;
      if (isBackendApi(request.url())) {
        backendRequestsObserved += 1;
      }
    });

    // Set up monitoring handlers
    page.on('response', createResponseHandler(apiErrors, maxTracked));
    page.on('requestfinished', createRequestFinishedHandler(slowCalls, slowThreshold, maxTracked));
    page.on('requestfailed', createRequestFailedHandler(failedRequests, maxTracked, networkTimeoutRef));

    try {
      await use(page);
    } finally {
      if (liveTimerHandle) {
        clearInterval(liveTimerHandle);
      }
    }

    // On test failure, classify the root cause and attach diagnosis
    if (testInfo.status === 'failed' || testInfo.status === 'timedOut') {
      const errorContext = collectErrorContext(testInfo);
      await attachFailureDiagnosis({
        testInfo,
        testStatus: testInfo.status,
        error: errorContext.diagnosticText,
        primaryError: errorContext.primaryMessage,
        actionableError: errorContext.actionableLine,
        setupMarker: getSetupMarker(page),
        apiErrors,
        failedRequests,
        slowCalls,
        networkTimeout: networkTimeoutRef.value,
        slowThreshold,
        executionSignals: {
          lastMainFrameUrl,
          mainFrameNavigationCount,
          totalRequestsObserved,
          backendRequestsObserved,
        },
      });
    }

    if (liveTimerEnabled) {
      const elapsedMs = Date.now() - testStartEpochMs;
      logger.info('Test timer finished', {
        title: testInfo.title,
        status: testInfo.status,
        elapsedMs,
        elapsed: formatElapsed(elapsedMs),
        worker: process.env.TEST_WORKER_INDEX ?? 'unknown',
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
