const explicitIdamRejectionPatterns = [
  /(?:email or password is incorrect|incorrect email or password)/i,
  /invalid (?:email|username|password|credentials)/i,
  /account (?:is )?(?:disabled|locked|suspended)/i,
  /user (?:does not exist|not found)/i,
] as const;

const transientSessionCapturePatterns = [
  // The verifier configuration changed mid-request; certificate validation failures remain terminal.
  /(?:net::)?ERR_(?:CERT_VERIFIER_CHANGED|CONNECTION_RESET|CONNECTION_CLOSED|CONNECTION_TIMED_OUT|INTERNET_DISCONNECTED|NAME_NOT_RESOLVED|NETWORK_CHANGED|TIMED_OUT)\b/i,
  /chrome-error:\/\/chromewebdata\//i,
  /\b(?:HTTP(?: status)?|status(?: code)?|response status)\s*[:=]?\s*(?:502|503|504)\b/i,
  /\b(?:bad gateway|service unavailable|gateway timeout)\b/i,
] as const;

const transientNavigationTimeoutPatterns = [
  /page\.goto: Timeout \d+ms exceeded/i,
  /\bnavigation (?:timed out|timeout)\b/i,
  /^Session capture attempt timed out after \d+ms$/i,
] as const;

export const SESSION_CAPTURE_LOGIN_ATTEMPTS = 2;

export function isIdamLoginRejection(error: unknown): boolean {
  const message = errorMessage(error);
  return message.includes('IDAM login did not establish authenticated session') || message.includes('IDAM page message:');
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export function isExplicitIdamLoginRejection(error: unknown): boolean {
  const message = errorMessage(error);
  if (!message.includes('IDAM page message:')) {
    return false;
  }
  return explicitIdamRejectionPatterns.some((pattern) => pattern.test(message));
}

export function isTransientSessionCaptureError(error: unknown): boolean {
  if (error instanceof Error && ['SessionCancellationError', 'SessionPersistenceError'].includes(error.name)) {
    return false;
  }
  if (isExplicitIdamLoginRejection(error)) {
    return false;
  }
  const message = errorMessage(error);
  const matchesTransientPattern = transientSessionCapturePatterns.some((pattern) => pattern.test(message));
  if (isIdamLoginRejection(error) && !matchesTransientPattern) {
    return false;
  }
  const isNavigationTimeout =
    error instanceof Error &&
    error.name === 'TimeoutError' &&
    transientNavigationTimeoutPatterns.some((pattern) => pattern.test(message));
  return isNavigationTimeout || matchesTransientPattern;
}
