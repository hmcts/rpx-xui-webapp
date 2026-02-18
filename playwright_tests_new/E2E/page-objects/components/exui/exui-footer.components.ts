import { Page } from '@playwright/test';

export class ExuiFooterComponent {
  readonly footer = this.page.locator('footer');
  readonly footerLinks = this.footer.locator('.hmcts-footer__list-item a.govuk-footer__link');

  readonly copyrightLink = this.footer.locator('.govuk-footer__meta-item > a.govuk-footer__link');

  constructor(private readonly page: Page) {}
}
