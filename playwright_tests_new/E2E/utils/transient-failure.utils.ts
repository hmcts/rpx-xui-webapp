export const DEFAULT_TRANSIENT_MAX_ATTEMPTS = 2;

const TRANSIENT_FAILURE_PATTERNS: RegExp[] = [
  /DOWNSTREAM_API_5\d\d/,
  /status\s+5\d\d/i,
  /NETWORK_TIMEOUT/,
  /SLOW_API_RESPONSE/,
  /The event could not be created/i,
  /Validation error after/i,
  /Something went wrong page was displayed/i,
  /callback data failed validation/i,
  /timeout of \d+ms exceeded/i,
  /ECONNRESET/i,
  /ETIMEDOUT/i,
  /Exceeded \d+ auto-advance attempts before submit/i,
  /Submit button did not become available/i,
  /Submit button not visible/i,
  /Continue button not visible while retrying wizard advance/i,
  /Critical wizard endpoint failure/i,
  /Test ended/i,
];

const FATAL_PAGE_CLOSED_PATTERNS: RegExp[] = [
  /Target page, context or browser has been closed/i,
  /Execution context was destroyed/i,
];

function asErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export function isTransientWorkflowFailure(error: unknown): boolean {
  const message = asErrorMessage(error);
  if (FATAL_PAGE_CLOSED_PATTERNS.some((pattern) => pattern.test(message))) {
    return false;
  }
  return TRANSIENT_FAILURE_PATTERNS.some((pattern) => pattern.test(message));
}

export async function retryOnTransientFailure<T>(
  action: () => Promise<T>,
  options: {
    maxAttempts?: number;
    onRetry?: (attempt: number, error: unknown) => Promise<void> | void;
  } = {}
): Promise<T> {
  const maxAttempts = options.maxAttempts ?? DEFAULT_TRANSIENT_MAX_ATTEMPTS;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await action();
    } catch (error) {
      if (attempt === maxAttempts || !isTransientWorkflowFailure(error)) {
        throw error;
      }
      if (options.onRetry) {
        try {
          await options.onRetry(attempt, error);
        } catch (retryError) {
          if (!isTransientWorkflowFailure(retryError)) {
            throw retryError;
          }
        }
      }
    }
  }

  throw new Error('retryOnTransientFailure exhausted without returning or throwing.');
}
