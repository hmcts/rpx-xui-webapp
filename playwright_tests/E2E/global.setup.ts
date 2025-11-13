import type { FullConfig } from "@playwright/test";
import {
  getBooleanEnv,
  getEnvVar,
  isDynamicUserCreationEnabled,
  resolveOAuthClientConfig,
  normaliseScopeForGrant,
} from "../support/env.utils";
import { IdamClient } from "../support/idam-client";

async function ensureIdamToken(): Promise<void> {
  if (!isDynamicUserCreationEnabled()) {
    return;
  }

  if (getEnvVar("CREATE_USER_BEARER_TOKEN")) {
    return;
  }

  const { clientId, clientSecret, scope, grantType } =
    resolveOAuthClientConfig();

  const idamClient = new IdamClient();
  const token = await idamClient.generateToken({
    grantType,
    clientId,
    clientSecret,
    scope: normaliseScopeForGrant(grantType, scope),
    username: getEnvVar("IDAM_OAUTH2_USERNAME"),
    password: getEnvVar("IDAM_OAUTH2_PASSWORD"),
    redirectUri: getEnvVar("IDAM_OAUTH2_REDIRECT_URI"),
  });
  process.env.CREATE_USER_BEARER_TOKEN = token;
  console.info("[dynamic-users] Generated CREATE_USER_BEARER_TOKEN via IDAM.");
}

async function globalSetup(_config: FullConfig): Promise<void> {
  const shouldWarn = getBooleanEnv("USE_DYNAMIC_PLAYWRIGHT_USERS", false);
  if (!shouldWarn) {
    return;
  }

  await ensureIdamToken();
}

export default globalSetup;
