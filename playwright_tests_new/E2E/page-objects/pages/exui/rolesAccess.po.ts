import { expect } from '@playwright/test';
import { Base } from '../../base';

export class RolesAccessPage extends Base {
  readonly heading = this.page.getByRole('heading', { name: 'Roles and access' });
  readonly tabPanel = this.page.getByRole('tabpanel', { name: 'Roles and access' });
  readonly mainContent = this.page.locator('main');
  readonly personSearchInput = this.page.locator('#inputSelectPerson');
  readonly continueButton = this.page.getByRole('button', { name: 'Continue' });
  readonly confirmAllocationButton = this.page.getByRole('button', { name: 'Confirm allocation' });
  readonly removeAllocationButton = this.page.getByRole('button', { name: 'Remove allocation' });
  readonly confirmExclusionButton = this.page.getByRole('button', { name: 'Confirm exclusion' });
  readonly indefiniteDurationRadio = this.page.getByLabel('Indefinite');
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

  public getAllocateJudicialRoleLink() {
    return this.getLink('Allocate a judicial role');
  }

  public getAllocateLegalOpsRoleLink() {
    return this.getLink('Allocate a legal ops role');
  }

  public getManageLinks() {
    return this.getLink('Manage');
  }

  public getDeleteLinks() {
    return this.getLink('Delete');
  }

  public getReallocateLinks() {
    return this.getLink('Reallocate');
  }

  public getRemoveAllocationLinks() {
    return this.getLink('Remove Allocation');
  }

  public getExclusionsAddLink() {
    return this.page.getByRole('heading', { name: 'Exclusions' }).locator('xpath=following::a[normalize-space()="Add"][1]');
  }

  public getSummaryRow(label: string) {
    return this.page.locator(
      `xpath=//div[contains(@class,"govuk-summary-list__row")][.//*[contains(@class,"govuk-summary-list__key") and normalize-space(.)="${label}"]]`
    );
  }

  public getSummaryChangeButton(label: string) {
    return this.getSummaryRow(label).getByRole('button', { name: /change/i });
  }

  public getRadio(name: string) {
    return this.page.getByRole('radio', { name });
  }

  public async continue(): Promise<void> {
    await this.continueButton.click();
  }

  public async confirmAllocation(): Promise<void> {
    await this.confirmAllocationButton.click();
  }

  public async confirmExclusion(): Promise<void> {
    await this.confirmExclusionButton.click();
  }

  public async removeAllocation(): Promise<void> {
    await this.removeAllocationButton.click();
  }

  public async selectIndefiniteDuration(): Promise<void> {
    await this.indefiniteDurationRadio.check({ force: true });
  }

  public async openFirstManageLink(): Promise<void> {
    await this.getManageLinks().first().click();
  }

  public async openFirstReallocateLink(): Promise<void> {
    await this.getReallocateLinks().first().click();
  }

  public async openFirstRemoveAllocationLink(): Promise<void> {
    await this.getRemoveAllocationLinks().first().click();
  }

  public async chooseExclusionForAnotherPerson(): Promise<void> {
    await this.getRadio('Exclude another person').check({ force: true });
  }

  public async chooseJudicialPersonRole(): Promise<void> {
    await this.getRadio('Judicial').check({ force: true });
  }

  public async fillExclusionDescription(description: string): Promise<void> {
    await this.page.locator('#exclusion-description').fill(description);
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
