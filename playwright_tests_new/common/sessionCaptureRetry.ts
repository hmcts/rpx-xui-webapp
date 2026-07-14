const explicitIdamRejectionPatterns = [
  /email or password is incorrect/i,
  /invalid (?:email|username|password|credentials)/i,
  /account (?:is )?(?:disabled|locked|suspended)/i,
  /user (?:does not exist|not found)/i,
] as const;

const transientSessionCapturePatterns = [
  /\btimeout\b/i,
  /timed out/i,
  /net::ERR_/i,
  /chrome-error:\/\//i,
  /navigation failed/i,
  /target page, context or browser has been closed/i,
  /IDAM login did not establish authenticated session/i,
  /Cannot persist unauthenticated session/i,
  /\b(?:502|503|504)\b/,
  /bad gateway|service unavailable|gateway timeout/i,
] as const;

export const SESSION_CAPTURE_LOGIN_ATTEMPTS = 2;

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
  return (
    (error instanceof Error && error.name === 'TimeoutError') ||
    transientSessionCapturePatterns.some((pattern) => pattern.test(message))
  );
}
