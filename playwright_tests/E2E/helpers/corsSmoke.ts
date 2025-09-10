import { Page } from '@playwright/test';

// Add this to any E2E test file where you want to check for CORS issues
export function registerCorsChecker(page: Page) {
  page.on('console', msg => {
    if (
      msg.type() === 'error' &&
      /blocked by CORS policy/i.test(msg.text())
    ) {
      throw new Error('CORS violation: ' + msg.text());
    }
  });
}
