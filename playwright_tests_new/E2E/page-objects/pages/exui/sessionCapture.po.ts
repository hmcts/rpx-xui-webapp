import { type Locator, type Page } from '@playwright/test';
import { IdamPage } from '@hmcts/playwright-common';
import { ExuiHeaderComponent } from '../../components/exui/exui-header.component.js';

const IDAM_USERNAME_FALLBACK_SELECTOR =
  'input#email, input[name="email"], input[name="emailAddress"], input[autocomplete="email"]';
const IDAM_SUBMIT_FALLBACK_SELECTOR = 'button:has-text("Sign in"), button:has-text("Continue")';

export class SessionCapturePage {
  readonly header = new ExuiHeaderComponent(this.page).header;
  readonly caseHome = this.page.locator('exui-case-home');
  readonly acceptCookiesButton = this.page.getByRole('button', { name: /accept (additional|analytics) cookies/i }).first();
  readonly createCaseLink = this.page.getByRole('link', { name: 'Create case' }).first();
  readonly caseListLink = this.page.getByRole('link', { name: 'Case list' }).first();
  readonly caseActionDropdown = this.page.locator('#next-step').first();
  readonly jurisdictionSelect = this.page.locator('#cc-jurisdiction').first();

  constructor(private readonly page: Page) {}

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
    await this.header.or(this.caseHome).first().waitFor({ state: 'visible', timeout: timeoutMs });
  }
}
