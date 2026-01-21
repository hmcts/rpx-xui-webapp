import { WaitUtils } from "@hmcts/playwright-common";
import { expect, Page } from "@playwright/test";

export class ExuiHeaderComponent {
  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="app-header" - brittle custom element selector
  readonly header = this.page.locator("exui-header");
  
  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="header-search-results" - brittle custom element selector
  readonly results = this.page.locator("ccd-search-result");
  
  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="nav-item-{name}" - brittle CSS class selector
  readonly headerMenuItems = this.page.locator('.hmcts-primary-navigation__item');
  
  private readonly waitUtils = new WaitUtils();

  constructor(private readonly page: Page) {}

  public async selectHeaderMenuItem(menuItemText: string): Promise<void> {
    const menuItem = this.headerMenuItems.filter({ hasText: menuItemText });
    await this.waitUtils.waitForLocatorVisibility(menuItem, { visibility: true });
    await menuItem.click();
  }

  public async checkIsVisible(): Promise<void> {
    await this.waitUtils.waitForLocatorVisibility(this.results, {
      visibility: true,
    });
    await expect(this.header).toBeVisible();
  }
}
