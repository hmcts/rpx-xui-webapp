import { WaitUtils } from '@hmcts/playwright-common';
import { Page } from '@playwright/test';
import { logger } from '../../../utils/logger.utils';

export class ExuiHeaderComponent {
  private static readonly LANGUAGE_STATE_TIMEOUT_MS = 20_000;

  readonly header = this.page.locator('exui-header');

  readonly errorHeader = this.page.locator('exui-error-message .govuk-error-summary');
  readonly errorHeaderTitle = this.errorHeader.locator('h2.govuk-error-summary__title');
  readonly errorHeaderListItems = this.errorHeader.locator('ul.govuk-error-summary__list li a');

  readonly results = this.page.locator('ccd-search-result');
  readonly headerMenuItems = this.page.locator('.hmcts-primary-navigation li.hmcts-primary-navigation__item');
  readonly appHeaderLink = this.header.locator('.hmcts-header a.hmcts-header__link').first();

  readonly languageToggle = this.header.locator('button.language').first();

  readonly signOutLink = this.header.locator('.hmcts-header .hmcts-header__navigation-link').first();

  readonly notificationBanner = this.page.locator('.govuk-notification-banner');
  readonly notificationBannerTitle = this.notificationBanner.locator('.govuk-notification-banner__title');
  readonly notificationBannerContent = this.notificationBanner.locator('.govuk-notification-banner__content');

  private readonly waitUtils = new WaitUtils();

  constructor(private readonly page: Page) {}

  private resolveLanguageTarget(language: string): { label: string; code: 'en' | 'cy' } {
    const normalized = language.trim().toLowerCase();
    if (normalized === 'english') {
      return { label: 'English', code: 'en' };
    }

    return { label: 'Cymraeg', code: 'cy' };
  }

  public async selectHeaderMenuItem(menuItemText: string): Promise<void> {
    const menuItem = this.headerMenuItems.filter({ hasText: menuItemText });
    await this.waitUtils.waitForLocatorVisibility(menuItem, { visibility: true });
    await menuItem.click();
  }

  public async switchLanguage(language: string): Promise<void> {
    const target = this.resolveLanguageTarget(language);
    await this.languageToggle.waitFor({ state: 'visible' });
    const toggleText = ((await this.languageToggle.textContent()) ?? '').trim();
    if (!toggleText.includes(target.label)) {
      logger.debug(`Language is already set to ${target.label}`, { language: target.label });
      return;
    }

    await this.languageToggle.click();
    await this.page.waitForLoadState('domcontentloaded');
    // Wait for the EXUI language state and toggle label to settle after the switch.
    await this.page.waitForFunction(
      ({ selector, expectedToggleLabel, expectedLanguageCode }) => {
        const el = document.querySelector(selector);
        const toggleHasFlipped = !el?.textContent?.trim().includes(expectedToggleLabel);
        const rawClientContext = window.sessionStorage.getItem('clientContext');
        if (!rawClientContext) {
          return false;
        }

        try {
          const clientContext = JSON.parse(rawClientContext);
          const currentLanguage = clientContext?.client_context?.user_language?.language;
          return toggleHasFlipped && currentLanguage === expectedLanguageCode;
        } catch {
          return false;
        }
      },
      {
        selector: 'exui-header button.language',
        expectedToggleLabel: target.label,
        expectedLanguageCode: target.code,
      },
      { timeout: ExuiHeaderComponent.LANGUAGE_STATE_TIMEOUT_MS }
    );
  }
}
