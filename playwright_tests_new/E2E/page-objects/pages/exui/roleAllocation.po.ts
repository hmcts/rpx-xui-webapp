import type { Page } from '@playwright/test';

export class RoleAllocationPage {
  constructor(private readonly page: Page) {}

  readonly continueButton = this.page.getByRole('button', { name: 'Continue', exact: true });
  readonly confirmButton = this.page.getByRole('button', { name: 'Confirm allocation', exact: true });
  readonly cancelLink = this.page.getByRole('link', { name: 'Cancel', exact: true });
  readonly personSearch = this.page.getByRole('combobox', { name: 'select a person' });
  readonly errorSummary = this.page.locator('exui-error-message');

  summaryValue(label: string) {
    return this.page
      .locator('exui-answers .govuk-summary-list__row')
      .filter({ has: this.page.getByText(label, { exact: true }) })
      .locator('dd')
      .first();
  }

  async choosePerson() {
    await this.personSearch.fill('Clara');
    await this.page.getByRole('option', { name: 'Clara Replacement (clara@example.com)', exact: true }).click();
    await this.continueButton.click();
  }

  async reviewAllocation() {
    await this.page.getByRole('radio', { name: 'Case manager', exact: true }).check();
    await this.continueButton.click();
    await this.page.getByRole('radio', { name: 'Allocate to another person', exact: true }).check();
    await this.continueButton.click();
    await this.choosePerson();
    await this.page.getByRole('radio', { name: 'Indefinite', exact: true }).check();
    await this.continueButton.click();
  }
}
