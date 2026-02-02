import { WaitUtils } from "@hmcts/playwright-common";
import { expect, Page } from "@playwright/test";

export class ExuiHeaderComponent {
  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="app-header" - brittle custom element selector
  readonly header = this.page.locator("exui-header");
  
  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="header-search-results" - brittle custom element selector
  readonly results = this.page.locator("ccd-search-result");
  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="nav-item-{name}" - brittle CSS class selector
  readonly headerMenuItems = this.page.locator('.hmcts-primary-navigation li.hmcts-primary-navigation__item');
  readonly selectedPageItem = this.header.locator('.hmcts-header a.hmcts-header__link')
  readonly languageToggle = this.header.locator('button.language');
  private waitUtils = new WaitUtils();

  constructor(private page: Page) { }

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

  public async switchLanguage(language: string): Promise<void> {
    const toggleText = (await this.languageToggle.innerText()).trim();
    if (toggleText.includes(language)) {
      await this.languageToggle.click();
      await this.page.waitForLoadState('domcontentloaded');
       }
    else {
      console.log(`Language is already set to ${language}`);
    }
  }

}
