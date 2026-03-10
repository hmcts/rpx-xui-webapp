type GenerateIdamTokenArgs = {
  grantType: 'password' | 'client_credentials';
  clientId: string;
  clientSecret: string;
  scope: string;
  username?: string;
  password?: string;
  redirectUri?: string;
};

export async function tryGenerateAssignmentBearerTokenFromCredentialsFlow(
  args: {
    configuredAssignmentUsername?: string;
    configuredAssignmentPassword?: string;
    fallbackUsername?: string;
    fallbackPassword?: string;
    clientId: string;
    clientSecret?: string;
    redirectUri?: string;
    scopesToTry: string[];
  },
  deps: {
    generateIdamToken: (args: GenerateIdamTokenArgs) => Promise<string>;
    isInvalidScopeError: (message: string) => boolean;
    warn: (message: string, meta: Record<string, unknown>) => void;
  }
): Promise<string | undefined> {
  const username = args.configuredAssignmentUsername ?? args.fallbackUsername;
  const password = args.configuredAssignmentPassword ?? args.fallbackPassword;
  if (!username || !password) {
    return undefined;
  }
  if (!args.configuredAssignmentUsername || !args.configuredAssignmentPassword) {
    deps.warn(
      'ORG_USER_ASSIGNMENT_USERNAME/ORG_USER_ASSIGNMENT_PASSWORD not fully configured; falling back to solicitor credentials for assignment token hydration.',
      {}
    );
  }

  if (!args.clientSecret) {
    deps.warn('Unable to hydrate assignment bearer token from credentials because no IDAM client secret is configured.', {});
    return undefined;
  }

  for (const scope of args.scopesToTry) {
    try {
      return await deps.generateIdamToken({
        grantType: 'password',
        clientId: args.clientId,
        clientSecret: args.clientSecret,
        scope,
        username,
        password,
        redirectUri: args.redirectUri,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (deps.isInvalidScopeError(message)) {
        deps.warn('Assignment bearer-token scope rejected by IDAM; retrying with next scope candidate.', {
          username,
          clientId: args.clientId,
          scope,
        });
        continue;
      }
      deps.warn('Failed to hydrate assignment bearer token from credentials.', {
        username,
        clientId: args.clientId,
        scope,
        message,
      });
      return undefined;
    }
  }

  deps.warn('Failed to hydrate assignment bearer token from credentials after trying all scope candidates.', {
    username,
    clientId: args.clientId,
    attemptedScopes: args.scopesToTry,
  });
  return undefined;
}

export async function resolveAssignmentBearerTokenFlow(
  args: {
    providedToken?: string;
    envAssignmentBearerToken?: string;
    fallbackCreateUserToken?: string;
  },
  deps: {
    stripBearerPrefix: (token: string) => string;
    assertExpectedAssignmentPrincipal: (token: string) => Promise<void>;
    tryGenerateAssignmentBearerTokenFromCredentials: () => Promise<string | undefined>;
    persistAssignmentBearerToken: (token: string) => void;
    warn: (message: string, meta?: Record<string, unknown>) => void;
  }
): Promise<string> {
  const fromOptionsOrEnv = firstNonEmpty(args.providedToken, args.envAssignmentBearerToken);
  if (fromOptionsOrEnv) {
    const resolved = deps.stripBearerPrefix(fromOptionsOrEnv);
    await deps.assertExpectedAssignmentPrincipal(resolved);
    return resolved;
  }

  const generatedFromPasswordGrant = await deps.tryGenerateAssignmentBearerTokenFromCredentials();
  if (generatedFromPasswordGrant) {
    deps.persistAssignmentBearerToken(generatedFromPasswordGrant);
    const resolved = deps.stripBearerPrefix(generatedFromPasswordGrant);
    await deps.assertExpectedAssignmentPrincipal(resolved);
    return resolved;
  }

  if (args.fallbackCreateUserToken) {
    deps.warn(
      'Using CREATE_USER_BEARER_TOKEN for org assignment. Prefer ORG_USER_ASSIGNMENT_BEARER_TOKEN or ORG_USER_ASSIGNMENT_USERNAME/ORG_USER_ASSIGNMENT_PASSWORD.'
    );
    const resolved = deps.stripBearerPrefix(args.fallbackCreateUserToken);
    await deps.assertExpectedAssignmentPrincipal(resolved);
    return resolved;
  }

  throw new Error(
    'Missing assignment bearer token. Set ORG_USER_ASSIGNMENT_BEARER_TOKEN, or provide ORG_USER_ASSIGNMENT_USERNAME/ORG_USER_ASSIGNMENT_PASSWORD with IDAM client credentials.'
  );
}

export async function resolveCreateUserBearerTokenFlow(
  args: {
    providedToken?: string;
    envCreateUserBearerToken?: string;
    clientId: string;
    clientSecret?: string;
    requestedScope: string;
    maxAttempts?: number;
  },
  deps: {
    stripBearerPrefix: (token: string) => string;
    sanitiseClientCredentialsScope: (scope: string) => string;
    generateIdamToken: (args: GenerateIdamTokenArgs) => Promise<string>;
    persistCreateUserBearerToken: (token: string) => void;
    shouldRetryTokenHydrationError: (error: unknown) => boolean;
    sleep: (ms: number) => Promise<void>;
    warn: (message: string, meta: Record<string, unknown>) => void;
    createError: (error: unknown, fallbackMessage: string) => Error;
  }
): Promise<string> {
  const fromOptionsOrEnv = firstNonEmpty(args.providedToken, args.envCreateUserBearerToken);
  if (fromOptionsOrEnv) {
    return deps.stripBearerPrefix(fromOptionsOrEnv);
  }

  if (!args.clientSecret) {
    throw new Error('Missing bearer token. Set CREATE_USER_BEARER_TOKEN or configure IDAM_SECRET for auto-hydration.');
  }

  const scope = deps.sanitiseClientCredentialsScope(args.requestedScope);
  const maxAttempts = args.maxAttempts ?? 3;
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const generated = await deps.generateIdamToken({
        grantType: 'client_credentials',
        clientId: args.clientId,
        clientSecret: args.clientSecret,
        scope,
      });
      deps.persistCreateUserBearerToken(generated);
      return deps.stripBearerPrefix(generated);
    } catch (error) {
      lastError = error;
      if (attempt === maxAttempts || !deps.shouldRetryTokenHydrationError(error)) {
        throw error;
      }
      const waitMs = Math.min(250 * 2 ** (attempt - 1), 2_000);
      deps.warn('Transient create-user bearer token hydration failure; retrying', {
        attempt,
        maxAttempts,
        clientId: args.clientId,
        scope,
        waitMs,
        message: error instanceof Error ? error.message : String(error),
      });
      await deps.sleep(waitMs);
    }
  }
  throw deps.createError(lastError, 'Failed to hydrate create-user bearer token.');
}

export async function assertExpectedAssignmentPrincipalFlow(
  args: {
    token: string;
    expectedEmail?: string;
  },
  deps: {
    decodeJwtPayload: (token: string) => Record<string, unknown> | undefined;
    resolveTokenPrincipalUsername: (claims: Record<string, unknown> | undefined) => string | undefined;
    probeIdamUserInfo: (assignmentBearerToken: string) => Promise<Record<string, unknown>>;
    isRecord: (value: unknown) => value is Record<string, unknown>;
    warn: (message: string) => void;
  }
): Promise<void> {
  if (!args.expectedEmail) {
    deps.warn(
      'Skipping assignment token principal validation because neither ORG_USER_ASSIGNMENT_EXPECTED_EMAIL nor ORG_USER_ASSIGNMENT_USERNAME is configured.'
    );
    return;
  }

  const claims = deps.decodeJwtPayload(args.token);
  let username = deps.resolveTokenPrincipalUsername(claims)?.trim().toLowerCase();

  if (!username) {
    const userInfoProbe = await deps.probeIdamUserInfo(args.token);
    if (userInfoProbe.status === 200 && deps.isRecord(userInfoProbe.body)) {
      username = deps.resolveTokenPrincipalUsername(userInfoProbe.body)?.trim().toLowerCase();
    }
  }

  if (!username) {
    throw new Error(
      `Assignment bearer token does not expose a principal email (claims/userinfo). Expected principal: ${args.expectedEmail}.`
    );
  }

  if (username !== args.expectedEmail) {
    throw new Error(`Assignment bearer token principal mismatch. Expected ${args.expectedEmail}, got ${username}.`);
  }
}

function firstNonEmpty(...values: Array<string | undefined>): string | undefined {
  for (const candidate of values) {
    const normalized = candidate?.trim();
    if (normalized) {
      return normalized;
    }
  }
  return undefined;
}
