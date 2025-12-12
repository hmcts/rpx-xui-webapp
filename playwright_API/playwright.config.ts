import { defineConfig } from '@playwright/test';

const odhinOutputFolder = process.env.PLAYWRIGHT_REPORT_FOLDER ?? 'functional-output/tests/playwright-api/odhin-report';

export default defineConfig({
  testDir: './tests',
  timeout: 120_000,
  expect: { timeout: 15_000 },
  use:{
    baseURL: process.env.TEST_URL?.trim() || 'https://manage-case.aat.platform.hmcts.net'
  },
  reporter: [
    [process.env.CI ? 'dot' : 'list'],
    ['odhin-reports-playwright', {
      outputFolder: odhinOutputFolder,
      indexFilename: 'xui-playwright.html',
      title: 'Sample Playwright API Tests',
      testEnvironment: process.env.TEST_URL ?? 'local'
    }]
  ],
  globalSetup: require.resolve('./globalSetup.ts'),
  projects: [
    {
      name: 'node-api',
      use: { headless: true },
      testMatch: ['**/*.spec.ts']
    }
  ]
});
