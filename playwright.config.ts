import { defineConfig, devices } from "@playwright/test";

const headless = process.env.HEAD !== 'true';

module.exports = defineConfig({
  testDir: "./playwright_tests/E2E",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 3, // Set the number of retries for all projects

  timeout: 3 * 60 * 1000,  // 10 minutes
  expect: {
    timeout: 1 * 60 * 1000,  // 5 minutes
  },
  reportSlowTests: null,

  /* Opt out of parallel tests on CI. */
  workers: process.env.FUNCTIONAL_TESTS_WORKERS ? 1 : 1,
  reporter: process.env.CI ? "html" : "list",
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"],
        channel: "chrome",
        headless: headless,
        trace: "on-first-retry",
      },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"],
        screenshot: 'only-on-failure',
        headless: headless,
        trace: 'off'
      },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"],
        screenshot: 'only-on-failure',
        headless: headless,
        trace: 'off'
      },
    },
    {
      name: "MobileChrome",
      use: { ...devices["Pixel 5"],
        screenshot: 'only-on-failure',
        headless: headless,
        trace: 'off'
      },
    },
    {
      name: "MobileSafari",
      use: { ...devices["iPhone 12"],
        screenshot: 'only-on-failure',
        headless: headless,
        trace: 'off'
      },
    },
    {
      name: "MicrosoftEdge",
      use: { ...devices["Desktop Edge"],
        channel: "msedge",
        screenshot: 'only-on-failure',
        headless: headless,
        trace: 'off'
      },
    },
  ],
});
