export const corsAllowed = [200, 204, 400, 401, 403] as const;
export const corsDisallowed = [200, 204, 400, 401, 403, 404] as const;

export type CorsValidationResult = {
  valid: boolean;
  message?: string;
};

function matchesPolicy(expected: ReadonlyArray<number>, policy: ReadonlyArray<number>): boolean {
  return expected.length === policy.length && expected.every((status) => policy.includes(status));
}

function getHeader(headers: Record<string, string>, name: string): string | undefined {
  return (
    headers[name] ||
    headers[name.replace(/(^|-)(.)/g, (_match, separator, character) => `${separator}${character.toUpperCase()}`)]
  );
}

export function validateCorsHeaders(
  expected: ReadonlyArray<number>,
  status: number,
  headers: Record<string, string>,
  origin: string
): CorsValidationResult {
  if (matchesPolicy(expected, corsAllowed) && status >= 200 && status < 300) {
    const allowOrigin = getHeader(headers, 'access-control-allow-origin');
    if (allowOrigin !== origin) {
      return {
        valid: false,
        message: `Expected allowed CORS origin ${origin} for HTTP ${status}, received ${allowOrigin ?? '<missing>'}`,
      };
    }
  }
  if (matchesPolicy(expected, corsDisallowed) && status < 500) {
    const allowed = getHeader(headers, 'access-control-allow-origin');
    if ([origin, '*'].includes(allowed ?? '')) {
      return {
        valid: false,
        message: `Expected disallowed CORS origin ${origin} not to be echoed for HTTP ${status}, received ${allowed}`,
      };
    }
  }
  return { valid: true };
}

export function validateCorsPreflightHeaders(
  expected: ReadonlyArray<number>,
  status: number,
  headers: Record<string, string>,
  origin: string,
  requestedMethod: string
): CorsValidationResult {
  const corsValidation = validateCorsHeaders(expected, status, headers, origin);
  if (!corsValidation.valid || !matchesPolicy(expected, corsAllowed) || status < 200 || status >= 300) {
    return corsValidation;
  }

  const credentials = getHeader(headers, 'access-control-allow-credentials');
  if (credentials !== 'true') {
    return {
      valid: false,
      message: `Expected CORS credentials to be true for HTTP ${status}, received ${credentials ?? '<missing>'}`,
    };
  }

  const methods = getHeader(headers, 'access-control-allow-methods')
    ?.split(',')
    .map((method) => method.trim());
  if (!methods?.includes(requestedMethod)) {
    return {
      valid: false,
      message: `Expected CORS methods to include ${requestedMethod} for HTTP ${status}, received ${methods?.join(', ') ?? '<missing>'}`,
    };
  }
  return { valid: true };
}

export function shouldIgnoreCorsError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /ENOTFOUND|ECONNREFUSED/.test(message);
}
