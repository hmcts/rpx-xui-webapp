import { WaitUtils } from "@hmcts/playwright-common";
import { expect, Page } from "@playwright/test";

export class ExuiHeaderComponent {
  readonly header = this.page.locator("exui-header");
  readonly results = this.page.locator("ccd-search-result");
  private waitUtils = new WaitUtils();

  constructor(private page: Page) {}

  public async checkIsVisible(): Promise<void> {
    await this.waitUtils.waitForLocatorVisibility(this.results, {
      visibility: true,
    });
    await expect(this.header).toBeVisible();
  }
}
