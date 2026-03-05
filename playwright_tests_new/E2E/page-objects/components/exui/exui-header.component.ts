import { WaitUtils } from '@hmcts/playwright-common';
import { Page } from '@playwright/test';
import { logger } from '../../../utils/logger.utils';

export class ExuiHeaderComponent {
  readonly header = this.page.locator('exui-header');

  readonly results = this.page.locator('ccd-search-result');
  readonly headerMenuItems = this.page.locator('.hmcts-primary-navigation li.hmcts-primary-navigation__item');
  readonly headerAppLink = this.header
    .locator('.hmcts-header a.hmcts-header__link')
    .or(this.page.getByRole('banner').getByRole('link', { name: /Manage Cases|Rheoli Achosion/ }));

  readonly languageToggle = this.header
    .locator('button.language')
    .or(this.page.getByRole('banner').getByRole('button', { name: /Cymraeg|English/ }));

  readonly signOutLink = this.header
    .locator('.hmcts-header .hmcts-header__navigation-link')
    .or(this.page.getByRole('banner').getByRole('link', { name: /Sign out|Allgofnodi/ }));

  readonly notificationBanner = this.page.locator('.govuk-notification-banner');
  readonly notificationBannerTitle = this.notificationBanner.locator('.govuk-notification-banner__title');
  readonly notificationBannerContent = this.notificationBanner.locator('.govuk-notification-banner__content');

  private readonly waitUtils = new WaitUtils();

  constructor(private readonly page: Page) {}

  public async selectHeaderMenuItem(menuItemText: string): Promise<void> {
    const menuItem = this.headerMenuItems.filter({ hasText: menuItemText });
    await this.waitUtils.waitForLocatorVisibility(menuItem, { visibility: true });
    await menuItem.click();
  }

  public async switchLanguage(language: string): Promise<void> {
    const toggleText = (await this.languageToggle.innerText()).trim();
    if (!toggleText.includes(language)) {
      logger.debug(`Language is already set to ${language}`, { language });
      return;
    }

    await this.languageToggle.click();
    await this.page.waitForLoadState('domcontentloaded');
    // Wait for the toggle to flip to the other language to confirm the switch.
    await this.page.waitForFunction(
      ({ selector, expected }) => {
        const el = document.querySelector(selector);
        return !el?.textContent?.trim().includes(expected);
      },
      { selector: 'exui-header button.language', expected: language }
    );
  }
}
