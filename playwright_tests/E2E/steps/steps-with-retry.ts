import { expect, Page } from '@playwright/test';

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

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
  optionNeedsField: boolean = true,
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
      if (optionNeedsField) {
        await page.getByLabel(label).selectOption({ label: optionLabel}, {timeout: 5000 });
      } else {
        await page.getByLabel(label).selectOption(optionLabel, {timeout: 5000 });
      }
      return;
    } catch (error) {
      console.error(error);
      if (i === attempts - 1) throw error;
      await sleep(delayMs); 
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
      await sleep(delayMs); 
    }
  }
}
