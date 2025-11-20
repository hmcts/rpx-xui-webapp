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
  globalSetup: require.resolve('./playwright_tests_new/integration/playwright.global.setup.ts'),
  globalTeardown: require.resolve('./playwright_tests_new/integration/playwright.global.teardown.ts'),
    use: {
      // Default to local dev server to enable WireMock stubbing; override via MANAGE_CASES_BASE_URL.
      baseURL: process.env.MANAGE_CASES_BASE_URL || 'http://localhost:3000',
      trace: 'on-first-retry',
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
      headless: headlessMode
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' }
    }
  ]
});
