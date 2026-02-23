import { Page } from '@playwright/test';
import { Base } from '../../base';
import { EXUI_TIMEOUTS, CCD_CASE_REFERENCE_LENGTH, CCD_CASE_REFERENCE_PATTERN } from './exui-timeouts';

export class SearchCasePage extends Base {
  // Locators
  readonly pageHeading = this.page.locator('main h1');
  readonly quickSearchContainer = this.page.locator('.hmcts-primary-navigation__global-search');
  readonly quickSearchContainerFallback = this.page.locator('li:has(#exuiCaseReferenceSearch)').first();
  readonly caseIdTextBox = this.page.locator('#exuiCaseReferenceSearch');
  readonly searchCaseFindButton = this.quickSearchContainer.getByRole('button', { name: 'Find', exact: true });
  readonly searchCaseFindButtonFallback = this.quickSearchContainerFallback.getByRole('button', { name: 'Find', exact: true });
  readonly caseProgressHeading = this.page.locator('#progress_legalOfficer_updateTrib_dismissed_under_rule_31 h2').first();
  readonly caseProgressPanel = this.page.locator('#progress_legalOfficer_updateTrib_dismissed_under_rule_31');
  readonly noResultsHeading = this.page.locator('exui-no-results .govuk-heading-xl');
  readonly noResultsContainer = this.page.locator('exui-no-results');
  readonly backLink = this.page.locator('exui-no-results .govuk-back-link');

  public async searchWith16DigitCaseId(caseId: string): Promise<void> {
    if (!CCD_CASE_REFERENCE_PATTERN.test(caseId)) {
      throw new Error(`Expected ${CCD_CASE_REFERENCE_LENGTH}-digit case reference, received "${caseId}"`);
    }
    await this.caseIdTextBox.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.SEARCH_FIELD_VISIBLE });
    await this.caseIdTextBox.click();
    await this.caseIdTextBox.fill(caseId);
    const primaryFindButtonVisible = await this.searchCaseFindButton.isVisible().catch(() => false);
    const findButton = primaryFindButtonVisible ? this.searchCaseFindButton : this.searchCaseFindButtonFallback;
    await findButton.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.SEARCH_BUTTON_VISIBLE });
    await findButton.scrollIntoViewIfNeeded();
    try {
      await findButton.click({ timeout: EXUI_TIMEOUTS.SEARCH_BUTTON_CLICK });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : JSON.stringify(error);
      if (!errorMsg.includes('intercepts pointer events')) {
        throw error;
      }
      await findButton.click({ force: true, timeout: EXUI_TIMEOUTS.SEARCH_BUTTON_CLICK });
    }
    await this.waitForPostSearchSpinnerCycle();
  }

  private async waitForPostSearchSpinnerCycle(): Promise<void> {
    const spinner = this.page.locator('xuilib-loading-spinner').first();
    await spinner.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.SPINNER_APPEAR_BRIEF }).catch(() => {
      // Spinner may not appear for very fast case lookups.
    });
    await spinner.waitFor({ state: 'hidden', timeout: EXUI_TIMEOUTS.SEARCH_SPINNER_RESULT_HIDDEN }).catch(() => {
      // Continue with URL/assertion checks in tests for better diagnostics.
    });
  }

  constructor(page: Page) {
    super(page);
  }
}
