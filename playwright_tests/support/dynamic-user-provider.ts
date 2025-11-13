import type { DynamicUser } from "./dynamic-user-factory";
import { getDynamicUserDefinition } from "./dynamic-user-definitions";
import { DynamicUserFactory } from "./dynamic-user-factory";
import {
  getEnvVar,
  isDynamicUserCreationEnabled,
  resolveOAuthClientConfig,
  normaliseScopeForGrant,
} from "./env.utils";
import { IdamClient } from "./idam-client";

let factoryPromise: Promise<DynamicUserFactory | null> | null = null;

async function createFactory(): Promise<DynamicUserFactory | null> {
  if (!isDynamicUserCreationEnabled()) {
    return null;
  }

  let bearerToken = getEnvVar("CREATE_USER_BEARER_TOKEN");
  if (!bearerToken) {
    try {
      const { clientId, clientSecret, scope, grantType } =
        resolveOAuthClientConfig();
      const idamClient = new IdamClient();
      bearerToken = await idamClient.generateToken({
        grantType,
        clientId,
        clientSecret,
        scope: normaliseScopeForGrant(grantType, scope),
        username: getEnvVar("IDAM_OAUTH2_USERNAME"),
        password: getEnvVar("IDAM_OAUTH2_PASSWORD"),
        redirectUri: getEnvVar("IDAM_OAUTH2_REDIRECT_URI"),
      });
      process.env.CREATE_USER_BEARER_TOKEN = bearerToken;
      console.info("[dynamic-users] Generated CREATE_USER_BEARER_TOKEN.");
    } catch (error) {
      console.warn(
        "[dynamic-users] Unable to generate CREATE_USER_BEARER_TOKEN:",
        (error as Error).message
      );
      return null;
    }
  }

  return new DynamicUserFactory({ bearerToken });
}

async function getFactory(): Promise<DynamicUserFactory | null> {
  if (!factoryPromise) {
    factoryPromise = createFactory();
  }
  return factoryPromise;
}

export async function resolveDynamicUser(
  userIdentifier: string
): Promise<DynamicUser | null> {
  if (!isDynamicUserCreationEnabled()) {
    return null;
  }

  const definition = getDynamicUserDefinition(userIdentifier);

  if (!definition) {
    console.warn(
      `[dynamic-users] No persona definition found for "${userIdentifier}".`
    );
    return null;
  }

  if (definition.enableDynamic === false) {
    console.warn(
      `[dynamic-users] Dynamic creation disabled for "${userIdentifier}"${
        definition.disableReason ? `: ${definition.disableReason}` : ""
      }`
    );
    return null;
  }

  const factory = await getFactory();
  if (!factory) {
    return null;
  }

  return factory.getOrCreate(definition);
}
