import { FullConfig } from '@playwright/test';
import { sessionCapture } from './sessionCapture';
import { resolveIntegrationSessionWarmupUsers } from '../integration/helpers';

async function globalSetup(_full: FullConfig) {
  void _full;
  const userIdentifiers = resolveIntegrationSessionWarmupUsers(process.env);
  if (userIdentifiers.length > 0) {
    await sessionCapture(userIdentifiers);
  }
}

export default globalSetup;
