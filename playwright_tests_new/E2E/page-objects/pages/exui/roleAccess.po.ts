import type { Page } from '@playwright/test';

export class RoleAccessPage {
  constructor(private readonly page: Page) {}

  readonly removeAllocationButton = this.page.getByRole('button', { name: 'Remove allocation', exact: true });
  readonly confirmExclusionButton = this.page.getByRole('button', { name: 'Confirm exclusion', exact: true });
  readonly deleteExclusionButton = this.page.getByRole('button', { name: 'Delete exclusion', exact: true });
  readonly personSearch = this.page.getByRole('combobox', { name: 'select a person' });
  readonly continueButton = this.page.getByRole('button', { name: 'Continue', exact: true });
  readonly confirmButton = this.page.getByRole('button', { name: 'Confirm allocation', exact: true });
  readonly cancelLink = this.page.getByRole('link', { name: 'Cancel', exact: true });
  readonly summary = this.page.locator('exui-answers');
  readonly errorSummary = this.page.locator('exui-error-message');
  readonly description = this.page.getByRole('textbox', { name: 'exclusion description' });

  summaryValue(label: string) {
    return this.summary
      .locator('.govuk-summary-list__row')
      .filter({ has: this.page.getByText(label, { exact: true }) })
      .locator('dd')
      .first();
  }

  exclusionChoice(name: 'Exclude me' | 'Exclude another person' | 'Legal Ops') {
    return this.page.getByRole('radio', { name, exact: true });
  }

  deleteExclusionLink(personName: string) {
    return this.page
      .locator('exui-exclusions-table table.govuk-table')
      .getByRole('row')
      .filter({ hasText: personName })
      .getByRole('link', { name: 'Delete', exact: true });
  }

  async chooseReplacement() {
    await this.personSearch.fill('Clara');
    await this.page.getByRole('option', { name: 'Clara Replacement (clara@example.com)', exact: true }).click();
    await this.continueButton.click();
  }

  async reviewReallocation() {
    await this.chooseReplacement();
    await this.page.getByRole('radio', { name: 'Indefinite', exact: true }).check();
    await this.continueButton.click();
  }

  async reviewExclusion(who: 'Exclude me' | 'Exclude another person', reason: string) {
    await this.exclusionChoice(who).check();
    await this.continueButton.click();
    if (who === 'Exclude another person') {
      await this.exclusionChoice('Legal Ops').check();
      await this.continueButton.click();
      await this.chooseReplacement();
    }
    await this.description.fill(reason);
    await this.continueButton.click();
  }
}
