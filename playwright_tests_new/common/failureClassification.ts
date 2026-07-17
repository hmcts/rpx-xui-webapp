export type FailureType =
  | 'DOWNSTREAM_API_5XX'
  | 'DOWNSTREAM_API_4XX'
  | 'SLOW_API_RESPONSE'
  | 'NETWORK_TIMEOUT'
  | 'UI_ELEMENT_MISSING'
  | 'ASSERTION_FAILURE'
  | 'UNKNOWN';

export interface ApiError {
  url: string;
  status: number;
  method: string;
}

export interface SlowCall {
  url: string;
  duration: number;
  method: string;
}

export interface FailedRequest {
  url: string;
  method: string;
  errorText: string;
}

export type FailureCategory = 'DEPENDENCY_ENVIRONMENT_FAILURE' | 'NON_DEPENDENCY_FAILURE';

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

export function sanitizeUrl(url: string): string {
  return url.split('?')[0];
}

export function hasNetworkErrorSignal(value: string): boolean {
  return NETWORK_ERROR_PATTERNS.some((pattern) => pattern.test(value));
}

export function collectDependencySignals(
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

export function classifyFailure(
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
  if (
    error.toLowerCase().includes('timeout') ||
    networkFailureSignal ||
    failedRequests.length > 0 ||
    hasNetworkErrorSignal(error)
  ) {
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

export function classifyFailureCategory(failureType: FailureType, dependencySignals: string[]): FailureCategory {
  if (DEPENDENCY_FAILURE_TYPES.has(failureType) || dependencySignals.length > 0) {
    return 'DEPENDENCY_ENVIRONMENT_FAILURE';
  }
  return 'NON_DEPENDENCY_FAILURE';
}
