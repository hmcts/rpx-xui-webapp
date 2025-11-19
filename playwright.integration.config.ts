const { defineConfig, devices } = require('@playwright/test');

// CommonJS style to align with root Playwright config for fixture compatibility.
const headlessMode = process.env.HEAD !== 'true';

module.exports = defineConfig({
  testDir: 'playwright_tests_new/integration',
  testMatch: ['**/test/**/*.spec.ts'],
  retries: process.env.CI ? 1 : 0,
  timeout: 60_000,
  expect: { timeout: 30_000 },
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? 'dot' : 'list',
  use: {
    baseURL: process.env.MANAGE_CASES_BASE_URL || 'https://manage-case.aat.platform.hmcts.net',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: headlessMode,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' }
    }
  ]
});
