import { Page } from '@playwright/test';
import { Base } from '../../base';
import { EXUI_TIMEOUTS, CCD_CASE_REFERENCE_LENGTH, CCD_CASE_REFERENCE_PATTERN } from './exui-timeouts';

export class SearchCasePage extends Base {
  // Locators
  readonly pageHeading = this.page.locator('main h1');
  // CSS class from HMCTS Design System - stable by design
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

  /**
   * Searches for a case using the 16-digit CCD case reference from header search box.
   *
   * Handles UI variations (primary vs fallback Find button) and overlay interceptions.
   * Waits for search spinner cycle before returning.
   *
   * @param caseId - 16-digit CCD case reference (format: DDDDDDDDDDDDDDDD)
   * @throws {Error} If case ID format is invalid
   */
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

  /**
   * Waits for the EXUI loading spinner cycle to complete after search submission.
   *
   * CCD search operations can return very quickly (< 100ms) or take several seconds.
   * The spinner may never render for fast responses, which is a valid success path.
   *
   * Strategy:
   * 1. Wait briefly for spinner to appear (timeout: 1s)
   * 2. If spinner appears, wait for it to disappear (timeout: 60s)
   * 3. If spinner never appears, continue immediately (fast response)
   *
   * Uses Playwright's built-in smart waiting instead of manual polling.
   *
   * @private
   * @throws Never throws - treats no-spinner as success
   */
  private async waitForPostSearchSpinnerCycle(): Promise<void> {
    const spinner = this.page.locator('xuilib-loading-spinner').first();

    try {
      // Wait for spinner to appear (brief timeout - may not show for fast responses)
      await spinner.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.SPINNER_APPEAR_BRIEF });
      // If visible, wait for it to disappear
      await spinner.waitFor({ state: 'hidden', timeout: EXUI_TIMEOUTS.SEARCH_SPINNER_RESULT_HIDDEN });
    } catch {
      // Spinner never appeared - fast response, continue
      return;
    }
  }

  constructor(page: Page) {
    super(page);
  }
}
