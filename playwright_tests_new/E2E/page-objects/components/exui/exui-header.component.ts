import { WaitUtils } from '@hmcts/playwright-common';
import { expect, Page } from '@playwright/test';

export class ExuiHeaderComponent {
  readonly header = this.page.locator('exui-header');
  readonly results = this.page.locator('ccd-search-result');
  readonly headerMenuItems = this.page.locator('.hmcts-primary-navigation li.hmcts-primary-navigation__item');
  readonly appHeaderLink = this.header.locator('.hmcts-header a.hmcts-header__link');
  readonly languageToggle = this.header.locator('button.language');
  private waitUtils = new WaitUtils();

  constructor(private page: Page) {}

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
    if (language === (await this.languageToggle.innerText())) {
      await this.languageToggle.click();
      await this.page.waitForLoadState('domcontentloaded');
    } else {
      console.log(`Language is already set to ${language}`);
    }
  }
}
