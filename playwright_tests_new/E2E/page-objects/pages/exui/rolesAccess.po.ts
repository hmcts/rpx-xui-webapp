import { expect } from '@playwright/test';
import { Base } from '../../base';

export class RolesAccessPage extends Base {
  readonly heading = this.page.getByRole('heading', { name: 'Roles and access' });
  readonly tabPanel = this.page.getByRole('tabpanel', { name: 'Roles and access' });
  readonly personSearchInput = this.page.locator('#inputSelectPerson');
  readonly autocompleteOverlay = this.page.locator('.cdk-overlay-pane').filter({
    has: this.page.locator('[role="option"]'),
  });

  public async open(caseId: string): Promise<void> {
    await this.page.goto(`/cases/case-details/IA/Asylum/${caseId}/roles-and-access`, {
      waitUntil: 'domcontentloaded',
    });
    await this.page.waitForURL(new RegExp(`/cases/case-details/IA/Asylum/${caseId}/roles-and-access(?:\\?.*)?$`));
    await expect(this.heading).toBeVisible();
  }

  public getLink(name: string) {
    return this.tabPanel.getByRole('link', { name, exact: true });
  }

  public getExclusionsAddLink() {
    return this.page.getByRole('heading', { name: 'Exclusions' }).locator('xpath=following::a[normalize-space()="Add"][1]');
  }

  public getSummaryRow(label: string) {
    return this.page.locator(
      `xpath=//div[contains(@class,"govuk-summary-list__row")][.//*[contains(@class,"govuk-summary-list__key") and normalize-space(.)="${label}"]]`
    );
  }

  public async searchAndSelectPerson(searchTerm: string, optionName: string): Promise<void> {
    const matchingOption = this.autocompleteOverlay.last().getByRole('option', { name: new RegExp(optionName, 'i') });

    await this.personSearchInput.fill('');
    await this.personSearchInput.fill(searchTerm);
    await this.autocompleteOverlay.last().waitFor({ state: 'visible' });
    await matchingOption.click();
    await expect(this.personSearchInput).toHaveValue(new RegExp(optionName, 'i'));
  }
}
