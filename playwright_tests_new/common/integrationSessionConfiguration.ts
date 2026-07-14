import fs from 'node:fs';
import path from 'node:path';
import type { SessionIdentityInput } from './sessionIdentity.js';
import { resolveSessionIdentity } from './sessionIdentity.js';

export const INTEGRATION_SESSION_CONFIGURATION_COMPLETE_FILE_ENV = 'PW_INTEGRATION_SESSION_CONFIGURATION_COMPLETE_FILE';

export function validateIntegrationSessionConfiguration(
  userIdentifiers: readonly SessionIdentityInput[],
  env: NodeJS.ProcessEnv = process.env
): void {
  const completeFile = env[INTEGRATION_SESSION_CONFIGURATION_COMPLETE_FILE_ENV]?.trim();
  if (completeFile) {
    fs.rmSync(completeFile, { force: true });
  }

  userIdentifiers.forEach((userIdentifier) => resolveSessionIdentity(userIdentifier));

  if (completeFile) {
    fs.mkdirSync(path.dirname(completeFile), { recursive: true });
    fs.writeFileSync(completeFile, 'complete\n', 'utf8');
  }
}
