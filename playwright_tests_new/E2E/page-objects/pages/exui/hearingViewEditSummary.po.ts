import { expect, Page } from '@playwright/test';

export class HearingViewEditSummaryPage {
  constructor(private readonly page: Page) {}

  readonly container = this.page.locator('exui-hearing-view-edit-summary');
  readonly heading = this.container.locator('h1').first();

  async waitForReady(): Promise<void> {
    await expect(this.container).toBeVisible();
    await expect(this.heading).toHaveText(/view( or edit)? hearing/i);
  }
}
