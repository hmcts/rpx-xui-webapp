import { WaitUtils } from '@hmcts/playwright-common';
import { Page } from '@playwright/test';
import { logger } from '../../../utils/logger.utils';

export class ExuiHeaderComponent {
  private static readonly LANGUAGE_STATE_TIMEOUT_MS = 20_000;
  private static readonly LANGUAGE_STATE_MAX_TIMEOUT_MS = 60_000;
  private static readonly LANGUAGE_STATE_ACTIVITY_WINDOW_MS = 5_000;
  private static readonly LANGUAGE_RENDER_STATE = {
    en: {
      appHeaderLink: 'Manage Cases',
      signOutLink: 'Sign out',
      toggleLabel: 'Cymraeg',
    },
    cy: {
      appHeaderLink: 'Rheoli achosion',
      signOutLink: 'Allgofnodi',
      toggleLabel: 'English',
    },
  } as const;

  readonly header = this.page.locator('exui-header');

  readonly errorHeader = this.page.locator('.govuk-error-summary');
  readonly errorHeaderTitle = this.errorHeader.locator('h2.govuk-error-summary__title');
  readonly errorHeaderListItems = this.errorHeader.locator('ul.govuk-error-summary__list li');

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

  private getExpectedRenderState(languageCode: 'en' | 'cy') {
    return ExuiHeaderComponent.LANGUAGE_RENDER_STATE[languageCode];
  }

  private async waitForLanguageContext(language: string): Promise<void> {
    const target = this.resolveLanguageTarget(language);
    const renderState = this.getExpectedRenderState(target.code);

    await this.page.waitForFunction(
      ({ expectedLanguageCode, expectedToggleLabel }) => {
        const languageToggle = document.querySelector('exui-header button.language');
        const toggleText = languageToggle?.textContent?.trim() ?? '';
        const rawClientContext = window.sessionStorage.getItem('clientContext');
        if (!rawClientContext) {
          return false;
        }

        try {
          const clientContext = JSON.parse(rawClientContext);
          const currentLanguage = clientContext?.client_context?.user_language?.language;
          return currentLanguage === expectedLanguageCode && toggleText.includes(expectedToggleLabel);
        } catch {
          return false;
        }
      },
      {
        expectedLanguageCode: target.code,
        expectedToggleLabel: renderState.toggleLabel,
      },
      { timeout: ExuiHeaderComponent.LANGUAGE_STATE_TIMEOUT_MS }
    );
  }

  public async waitForRenderedLanguageState(language: string): Promise<void> {
    const target = this.resolveLanguageTarget(language);
    const renderState = this.getExpectedRenderState(target.code);

    const waitForState = (timeoutMs: number) =>
      this.page.waitForFunction(
        ({ expectedAppHeaderLink, expectedLanguageCode, expectedSignOutLink, expectedToggleLabel }) => {
          const appHeaderLink = document.querySelector('exui-header .hmcts-header a.hmcts-header__link');
          const languageToggle = document.querySelector('exui-header button.language');
          const signOutLink = document.querySelector('exui-header .hmcts-header .hmcts-header__navigation-link');
          const appHeaderText = appHeaderLink?.textContent?.trim() ?? '';
          const toggleText = languageToggle?.textContent?.trim() ?? '';
          const signOutText = signOutLink?.textContent?.trim() ?? '';
          const rawClientContext = window.sessionStorage.getItem('clientContext');
          if (!rawClientContext) {
            return false;
          }

          try {
            const clientContext = JSON.parse(rawClientContext);
            const currentLanguage = clientContext?.client_context?.user_language?.language;
            return (
              currentLanguage === expectedLanguageCode &&
              toggleText.includes(expectedToggleLabel) &&
              appHeaderText.includes(expectedAppHeaderLink) &&
              signOutText.includes(expectedSignOutLink)
            );
          } catch {
            return false;
          }
        },
        {
          expectedAppHeaderLink: renderState.appHeaderLink,
          expectedLanguageCode: target.code,
          expectedSignOutLink: renderState.signOutLink,
          expectedToggleLabel: renderState.toggleLabel,
        },
        { timeout: timeoutMs }
      );
    const startedAt = Date.now();
    const deadline = startedAt + ExuiHeaderComponent.LANGUAGE_STATE_MAX_TIMEOUT_MS;
    let lastBackendActivityAt = startedAt;
    let backendFailure = false;
    const pendingTranslationRequests = new Set<unknown>();
    const isLanguageBackendRequest = (url: string) =>
      /\/api\/translation\//.test(url) || /\/aggregated\/caseworkers\/[^/]+\/jurisdictions(?:\?|$)/.test(url);
    const onRequest = (request: { url(): string }) => {
      if (isLanguageBackendRequest(request.url())) {
        pendingTranslationRequests.add(request);
        lastBackendActivityAt = Date.now();
      }
    };
    const onResponse = (response: { url(): string; status(): number; request(): unknown }) => {
      const url = response.url();
      if (isLanguageBackendRequest(url)) {
        pendingTranslationRequests.delete(response.request());
        lastBackendActivityAt = Date.now();
        backendFailure ||= response.status() >= 400;
      }
    };
    const onRequestFailed = (request: { url(): string }) => {
      if (isLanguageBackendRequest(request.url())) {
        pendingTranslationRequests.delete(request);
        backendFailure = true;
      }
    };

    this.page.on('request', onRequest);
    this.page.on('response', onResponse);
    this.page.on('requestfailed', onRequestFailed);
    try {
      while (true) {
        try {
          await waitForState(Math.min(ExuiHeaderComponent.LANGUAGE_STATE_TIMEOUT_MS, deadline - Date.now()));
          return;
        } catch (error) {
          const remainingMs = deadline - Date.now();
          const backendIsStillResponding =
            pendingTranslationRequests.size > 0 ||
            Date.now() - lastBackendActivityAt <= ExuiHeaderComponent.LANGUAGE_STATE_ACTIVITY_WINDOW_MS;
          if (
            backendFailure ||
            remainingMs <= 0 ||
            !backendIsStillResponding ||
            !(error instanceof Error && error.name.includes('Timeout'))
          ) {
            throw error;
          }
        }
      }
    } finally {
      this.page.off('request', onRequest);
      this.page.off('response', onResponse);
      this.page.off('requestfailed', onRequestFailed);
    }
  }

  public async selectHeaderMenuItem(menuItemText: string): Promise<void> {
    const menuItem = this.headerMenuItems.filter({ hasText: menuItemText });
    await this.waitUtils.waitForLocatorVisibility(menuItem, { visibility: true });
    await menuItem.click();
  }

  public async switchLanguage(language: string, options: { waitForTranslatedContent?: boolean } = {}): Promise<void> {
    const waitForTranslatedContent = options.waitForTranslatedContent ?? true;
    const target = this.resolveLanguageTarget(language);
    await this.languageToggle.waitFor({ state: 'visible' });
    const toggleText = ((await this.languageToggle.textContent()) ?? '').trim();
    if (!toggleText.includes(target.label)) {
      logger.debug(`Language is already set to ${target.label}`, { language: target.label });
      if (waitForTranslatedContent) {
        await this.waitForRenderedLanguageState(language);
      } else {
        await this.waitForLanguageContext(language);
      }
      return;
    }

    const languageStatePromise = waitForTranslatedContent
      ? this.waitForRenderedLanguageState(language)
      : this.waitForLanguageContext(language);
    try {
      await this.languageToggle.click();
      await this.page.waitForLoadState('domcontentloaded');
      await languageStatePromise;
    } catch (error) {
      await languageStatePromise.catch(() => undefined);
      throw error;
    }
  }
}
