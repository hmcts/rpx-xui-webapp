import { type Locator, type Page } from '@playwright/test';
import { IdamPage } from '@hmcts/playwright-common';

const IDAM_USERNAME_FALLBACK_SELECTOR =
  'input#email, input[name="email"], input[name="emailAddress"], input[autocomplete="email"]';
const IDAM_SUBMIT_FALLBACK_SELECTOR = 'button:has-text("Sign in"), button:has-text("Continue")';

export class SessionCapturePage {
  constructor(private readonly page: Page) {}

  get header(): Locator {
    return this.page.locator('exui-header');
  }

  get appSurface(): Locator {
    return this.page.locator('exui-header, exui-case-home');
  }

  get acceptCookiesButton(): Locator {
    return this.page.getByRole('button', { name: /accept (additional|analytics) cookies/i }).first();
  }

  get createCaseLink(): Locator {
    return this.page.getByRole('link', { name: 'Create case' }).first();
  }

  get caseListLink(): Locator {
    return this.page.getByRole('link', { name: 'Case list' }).first();
  }

  get caseActionDropdown(): Locator {
    return this.page.locator('#next-step').first();
  }

  get jurisdictionSelect(): Locator {
    return this.page.locator('#cc-jurisdiction').first();
  }

  idamUsernameCandidates(idamPage: IdamPage): Locator[] {
    return [idamPage.usernameInput.first(), this.page.locator(IDAM_USERNAME_FALLBACK_SELECTOR).first()];
  }

  idamSubmitCandidates(idamPage: IdamPage): Locator[] {
    return [idamPage.submitBtn.first(), this.page.locator(IDAM_SUBMIT_FALLBACK_SELECTOR).first()];
  }

  appShellMarkers(preferredSelector?: string): Array<{ name: string; locator: Locator }> {
    const markers: Array<{ name: string; locator: Locator }> = [];

    if (preferredSelector?.trim()) {
      markers.push({
        name: `preferred:${preferredSelector}`,
        locator: this.page.locator(preferredSelector).first(),
      });
    }

    markers.push(
      { name: 'exui-header', locator: this.header.first() },
      { name: 'create-case-link', locator: this.createCaseLink },
      { name: 'case-list-link', locator: this.caseListLink },
      { name: 'case-action-dropdown', locator: this.caseActionDropdown },
      { name: 'jurisdiction-select', locator: this.jurisdictionSelect }
    );

    return markers;
  }

  async waitForAppSurface(timeoutMs: number): Promise<void> {
    await this.appSurface.first().waitFor({ state: 'visible', timeout: timeoutMs });
  }
}
