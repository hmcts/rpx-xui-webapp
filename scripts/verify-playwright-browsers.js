#!/usr/bin/env node

/* eslint-disable no-console */

const fs = require('fs');
const { chromium, firefox, webkit } = require('@playwright/test');

const browserTypes = {
  chromium,
  firefox,
  webkit,
};

const requestedBrowsers = process.argv.slice(2);
const browsersToVerify = requestedBrowsers.length > 0 ? requestedBrowsers : Object.keys(browserTypes);

async function verifyBrowser(browserName) {
  const browserType = browserTypes[browserName];
  if (!browserType) {
    throw new Error(`Unknown Playwright browser: ${browserName}`);
  }

  const executablePath = browserType.executablePath();
  if (!fs.existsSync(executablePath)) {
    throw new Error(`Missing Playwright ${browserName} executable at ${executablePath}`);
  }

  const browser = await browserType.launch();
  await browser.close();
  console.log(`Verified Playwright ${browserName} executable at ${executablePath}`);
}

(async () => {
  for (const browserName of browsersToVerify) {
    await verifyBrowser(browserName);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
