const explicitIdamRejectionPatterns = [
  /email or password is incorrect/i,
  /invalid (?:email|username|password|credentials)/i,
  /account (?:is )?(?:disabled|locked|suspended)/i,
  /user (?:does not exist|not found)/i,
] as const;

const transientSessionCapturePatterns = [
  /net::ERR_(?:CONNECTION_RESET|CONNECTION_CLOSED|CONNECTION_TIMED_OUT|NETWORK_CHANGED|TIMED_OUT)\b/i,
  /\b(?:502|503|504)\b/,
  /\b(?:bad gateway|service unavailable|gateway timeout)\b/i,
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
  if (isExplicitIdamLoginRejection(error)) {
    return false;
  }
  const message = errorMessage(error);
  const matchesTransientPattern = transientSessionCapturePatterns.some((pattern) => pattern.test(message));
  if (isIdamLoginRejection(error) && !matchesTransientPattern) {
    return false;
  }
  return (error instanceof Error && error.name === 'TimeoutError') || matchesTransientPattern;
}
