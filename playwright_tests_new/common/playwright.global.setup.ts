import { FullConfig } from '@playwright/test';
import { sessionCapture } from './sessionCapture.js';

// Global setup captures storageState for multiple users so tests can reuse sessions.
async function globalSetup(_full: FullConfig) {
  const identifiers = ['SOLICITOR', 'STAFF_ADMIN', 'USER_WITH_FLAGS'];
  await sessionCapture(identifiers);
}

export default globalSetup;
