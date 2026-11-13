import type { Locator, Page } from '@playwright/test';
import { selectCaseRows } from '../../../../integration/helpers/shareCaseMockRoutes.helper';

export class ShareCasePage {
  constructor(private readonly page: Page) {}

  caseSection(caseId: string): Locator {
    return this.page.locator(`#govuk-accordion__section-${caseId}`);
  }

  reviewSection(caseId: string): Locator {
    return this.page.locator(`#user-access-block-${caseId}`);
  }

  async openSelectedCases(rowIndexes = [0, 1]): Promise<void> {
    await selectCaseRows(this.page, rowIndexes);
    await this.page.locator('#btn-share-button').click();
  }

  async addRecipient(email: string): Promise<void> {
    await this.page.locator('#add-user-input input').fill(email);
    await this.page.getByRole('option').filter({ hasText: email }).click();
    await this.page.locator('#btn-add-user').click();
  }

  async expandCase(caseId: string): Promise<void> {
    // GOV.UK replaces the button and wires its handler after the component renders.
    await this.page.locator('#accordion-with-summary-sections[data-govuk-accordion-init]').waitFor();
    const button = this.caseSection(caseId).locator('button[aria-expanded]');
    if ((await button.getAttribute('aria-expanded')) === 'false') {
      await button.click();
    }
  }

  async removeRecipient(caseId: string, email: string): Promise<void> {
    await this.expandCase(caseId);
    await this.caseSection(caseId)
      .getByRole('row')
      .filter({ hasText: email })
      .getByRole('link', { name: /^Remove/ })
      .click();
  }

  async review(): Promise<void> {
    await this.page.locator('#btn-continue').click();
  }

  async confirm(): Promise<void> {
    await this.page.getByRole('button', { name: 'Confirm', exact: true }).click();
  }
}
