import { WaitUtils } from '@hmcts/playwright-common';
import { expect, Page } from '@playwright/test';
import { logger } from '../../../utils/logger.utils';

export class ExuiHeaderComponent {
  readonly header = this.page.locator('exui-header');

  readonly errorHeader = this.page.locator('exui-error-message .govuk-error-summary');
  readonly errorHeaderTitle = this.errorHeader.locator('h2.govuk-error-summary__title');
  readonly errorHeaderListItems = this.errorHeader.locator('ul.govuk-error-summary__list li a');

  readonly results = this.page.locator('ccd-search-result');
  readonly headerMenuItems = this.page.locator('.hmcts-primary-navigation li.hmcts-primary-navigation__item');
  readonly selectedPageItem = this.header
    .locator('.hmcts-header a.hmcts-header__link')
    .or(this.page.getByRole('banner').getByRole('link', { name: /Manage Cases|Rheoli Achosion/ }));

  readonly languageToggle = this.header
    .locator('button.language')
    .or(this.page.getByRole('banner').getByRole('button', { name: /Cymraeg|English/ }));
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
