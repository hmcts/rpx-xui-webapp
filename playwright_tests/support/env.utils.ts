export function getEnvVar(name: string): string | undefined {
  const value = process.env[name];
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }
  return undefined;
}

export function requireEnvVar(name: string): string {
  const value = getEnvVar(name);
  if (!value) {
    throw new Error(`Missing required environment variable "${name}".`);
  }
  return value;
}

export function getBooleanEnv(
  name: string,
  defaultValue = false
): boolean {
  const value = getEnvVar(name);
  if (value === undefined) {
    return defaultValue;
  }
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

export function isDynamicUserCreationEnabled(): boolean {
  const flag = getEnvVar("USE_DYNAMIC_PLAYWRIGHT_USERS");
  if (flag === undefined) {
    return true;
  }
  return getBooleanEnv("USE_DYNAMIC_PLAYWRIGHT_USERS", true);
}

export function getTestEnvironment(): string {
  return getEnvVar("TEST_ENV") ?? "aat";
}

export interface OAuthClientConfig {
  clientId: string;
  clientSecret: string;
  scope: string;
  grantType: string;
}

export function resolveOAuthClientConfig(): OAuthClientConfig {
  const clientId =
    getEnvVar("CREATE_USER_CLIENT_ID") ??
    getEnvVar("CCD_DATA_STORE_CLIENT_ID") ??
    getEnvVar("CLIENT_ID") ??
    getEnvVar("IDAM_OAUTH2_CLIENT_ID") ??
    requireEnvVar("CLIENT_ID");

  const clientSecret =
    getEnvVar("CREATE_USER_CLIENT_SECRET") ??
    getEnvVar("CCD_DATA_STORE_SECRET") ??
    getEnvVar("IDAM_SECRET") ??
    getEnvVar("IDAM_OAUTH2_CLIENT_SECRET") ??
    requireEnvVar("IDAM_SECRET");

  const scope =
    getEnvVar("CREATE_USER_SCOPE") ??
    getEnvVar("IDAM_OAUTH2_SCOPE") ??
    "profile roles";

  const grantType = getEnvVar("IDAM_OAUTH2_GRANT_TYPE") ?? "client_credentials";

  return {
    clientId,
    clientSecret,
    scope,
    grantType,
  };
}

export function normaliseScopeForGrant(
  grantType: string,
  scope: string
): string {
  if (!scope) {
    return "profile roles";
  }
  if (grantType === "client_credentials") {
    const filtered = scope
      .split(/\s+/)
      .filter((entry) => entry && entry.toLowerCase() !== "openid");
    return filtered.length > 0 ? filtered.join(" ") : "profile roles";
  }
  return scope;
}
