import { sessionCapture } from './sessionCapture';
import { resolveIntegrationSessionWarmupUsers } from '../integration/helpers';
import { UserUtils } from '../E2E/utils/user.utils';

function resolveWarmupUsersWithCredentials(userIdentifiers: string[], userUtils: UserUtils = new UserUtils()): string[] {
  return userIdentifiers.filter((userIdentifier) => {
    try {
      userUtils.getUserCredentials(userIdentifier);
      return true;
    } catch (error) {
      const message = (error as Error)?.message ?? String(error);
      const isMissingCredentialError =
        message.includes('credentials are missing') || message.includes(`User "${userIdentifier}" not found`);

      if (!isMissingCredentialError) {
        throw error;
      }

      // Warmup is an optimisation; skip users that are intentionally not configured.
      console.warn(`[playwright.global.setup] Skipping warmup user "${userIdentifier}": ${message}`);
      return false;
    }
  });
}

async function globalSetup() {
  const requestedUserIdentifiers = resolveIntegrationSessionWarmupUsers(process.env);
  const userIdentifiers = resolveWarmupUsersWithCredentials(requestedUserIdentifiers);
  if (userIdentifiers.length > 0) {
    await sessionCapture(userIdentifiers);
  }
}

(globalSetup as { __test__?: unknown }).__test__ = {
  resolveWarmupUsersWithCredentials,
};

export default globalSetup;
