import { expect, Page } from '@playwright/test';

type RetryLabelByOptionOpts = {
  attempts?: number;   // default 6
  delayMs?: number;    // default 5000ms
  label?: string;
};

type VisibleRetryOpts = {
  exact?: boolean;      // default true
  attempts?: number;    // default 3
  delayMs?: number;     // default 2000
  timeoutPerAttempt?: number; // default 5000
};

export async function selectOptionWithRetry(
  page: Page,
  optionLabel: string,
  opts: RetryLabelByOptionOpts = {}
) {
  const {
    attempts = 6,
    delayMs = 5000,
    label = 'Jurisdiction',
  } = opts;

  for (let i = 0; i < attempts; i++) {
    try {
      if (i !== 0) {
        console.log(`Attempt ${i}: Failed to select '${label}', retrying...`);
      }
      await page.getByLabel(label).selectOption({ label: optionLabel });
      return;
    } catch (error) {
      console.error(error);
      if (i === attempts - 1) throw error;
      await page.waitForTimeout(delayMs);
    }
  }
}

export async function expectTextVisibleWithRetry(
  page: Page,
  text: string,
  opts: VisibleRetryOpts = {}
) {
  const {
    exact = true,
    attempts = 6,
    delayMs = 2000,
    timeoutPerAttempt = 5000,
  } = opts;

  for (let i = 0; i < attempts; i++) {
    try {
      if (i !== 0) {
        console.log(`Retry attempt ${i}: waiting for text "${text}"`);
      }
      await expect(
        page.getByText(text, { exact })
      ).toBeVisible({ timeout: timeoutPerAttempt });
      return;
    } catch (err) {
      if (i === attempts - 1) {
        throw err;
      }
      console.warn(`Text "${text}" not visible on attempt ${i + 1}, retrying in ${delayMs}ms...`);
      await page.waitForTimeout(delayMs);
    }
  }
}
