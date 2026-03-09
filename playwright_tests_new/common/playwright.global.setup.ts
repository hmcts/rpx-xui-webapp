import { FullConfig } from '@playwright/test';

// Global setup is now a no-op.
// Sessions are captured lazily via test.beforeAll() in each test file.
async function globalSetup(_full: FullConfig) {
  // Sessions will be captured on-demand
}

export default globalSetup;
