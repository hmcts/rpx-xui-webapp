import {
  getRuntimeUserCredentialEnvMapping,
  getRuntimeUserCredentials,
  resolveRuntimeUserCredentialsForIdentifier,
  resolveRuntimeUserCredentialsFromEnv,
} from './runtimeUserCredentials';

export class UserUtils {
  public getUserCredentials(userIdentifier: string) {
    const dynamicCredentials = this.getDynamicCredentials(userIdentifier);
    if (dynamicCredentials) {
      return dynamicCredentials;
    }

    const mapping = getRuntimeUserCredentialEnvMapping(userIdentifier);
    if (!mapping) {
      throw new Error(`User "${userIdentifier}" not found`);
    }

    throw new Error(
      `User "${userIdentifier}" credentials are missing. Populate env vars "${mapping.username}" and "${mapping.password}" from Azure Key Vault.`
    );
  }

  private getDynamicCredentials(userIdentifier: string): { email: string; password: string } | undefined {
    const fallbackResolvedCredentials = resolveRuntimeUserCredentialsForIdentifier(userIdentifier);
    if (fallbackResolvedCredentials) {
      return fallbackResolvedCredentials;
    }

    const runtimeCredentials = getRuntimeUserCredentials(userIdentifier);
    if (runtimeCredentials) {
      return runtimeCredentials;
    }

    const mapping = getRuntimeUserCredentialEnvMapping(userIdentifier);
    if (!mapping) {
      return undefined;
    }

    return resolveRuntimeUserCredentialsFromEnv(mapping);
  }
}
