export function asErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export function isDependencyEnvironmentFailure(error: unknown): boolean {
  const message = asErrorMessage(error);
  return (
    /returned HTTP 5\d\d/i.test(message) ||
    /status\s+5\d\d/i.test(message) ||
    /something went wrong page/i.test(message) ||
    /network timeout/i.test(message) ||
    /ECONNRESET|ETIMEDOUT/i.test(message) ||
    /Target page, context or browser has been closed/i.test(message) ||
    /setup exceeded \d+ms/i.test(message)
  );
}
