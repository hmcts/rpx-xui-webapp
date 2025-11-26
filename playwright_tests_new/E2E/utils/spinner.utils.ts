import { Page } from '@playwright/test';

export class SpinnerUtils {
  public async waitForSpinner(page: Page) {
    try {
      await page.waitForSelector('xuilib-loading-spinner', { state: 'attached', timeout: 5000 });
      await page.waitForSelector('xuilib-loading-spinner', { state: 'detached' });
    } catch (error) {
      console.log('Spinner did not appear within the timeout period.');
    }
  }
}
