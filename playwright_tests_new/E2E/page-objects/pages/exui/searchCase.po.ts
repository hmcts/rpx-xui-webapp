import { Page } from '@playwright/test';
import { Base } from '../../base';
import { remainingNavigationTimeout } from '../../../utils/test-setup/navigationDeadline';
import { EXUI_TIMEOUTS, CCD_CASE_REFERENCE_LENGTH, CCD_CASE_REFERENCE_PATTERN } from './exui-timeouts';

export class SearchCasePage extends Base {
  // Locators
  readonly pageHeading = this.page.locator('main h1');
  readonly quickSearchContainer = this.page.locator('form:has(#exuiCaseReferenceSearch)');
  readonly quickSearchContainerFallback = this.page.locator('li:has(#exuiCaseReferenceSearch)').first();
  readonly caseIdTextBox = this.page.locator('#exuiCaseReferenceSearch');
  readonly searchCaseFindButton = this.quickSearchContainer.getByRole('button', { name: 'Find', exact: true });
  readonly searchCaseFindButtonFallback = this.quickSearchContainerFallback.getByRole('button', { name: 'Find', exact: true });
  readonly caseProgressHeading = this.page.locator('#progress_legalOfficer_updateTrib_dismissed_under_rule_31 h2').first();
  readonly caseProgressPanel = this.page.locator('#progress_legalOfficer_updateTrib_dismissed_under_rule_31');
  readonly noResultsHeading = this.page.locator('exui-no-results .govuk-heading-xl');
  readonly noResultsContainer = this.page.locator('exui-no-results');
  readonly restrictedCaseAccessContainer = this.page.locator('exui-restricted-case-access-container');
  readonly backLink = this.page.locator('exui-no-results .govuk-back-link');

  /**
   * Searches for a case using the 16-digit CCD case reference from header search box.
   *
   * Handles UI variations (primary vs fallback Find button) and overlay interceptions.
   * Waits for the searched case, restricted-access shell, or no-results view, and for the spinner to clear.
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
    const deadlineMs = Date.now() + EXUI_TIMEOUTS.SEARCH_BUTTON_CLICK + EXUI_TIMEOUTS.SEARCH_SPINNER_RESULT_HIDDEN;
    const remaining = () => remainingNavigationTimeout(deadlineMs, 'completing the header search');
    // A previous no-results view can remain visible while a new search is still loading.
    const caseLookupResponse = this.page
      .waitForResponse(
        (response) =>
          new URL(response.url()).pathname.endsWith(`/internal/cases/${caseId}`) && [400, 403, 404].includes(response.status()),
        { timeout: remaining() }
      )
      .then(
        (response) => response.status(),
        () => null
      );
    try {
      await findButton.click({ timeout: Math.min(EXUI_TIMEOUTS.SEARCH_BUTTON_CLICK, remaining()) });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : JSON.stringify(error);
      if (!errorMsg.includes('intercepts pointer events')) {
        throw error;
      }
      await this.waitForPostSearchSpinnerCycle(remaining());
      await findButton.click({ timeout: Math.min(EXUI_TIMEOUTS.SEARCH_BUTTON_CLICK, remaining()) });
    }
    await this.waitForImmediateSearchOutcome(caseId, deadlineMs, caseLookupResponse);
    await this.waitForPostSearchSpinnerCycle(remainingNavigationTimeout(deadlineMs, 'waiting for the search spinner'));
  }

  private async waitForPostSearchSpinnerCycle(timeoutMs: number = EXUI_TIMEOUTS.SEARCH_SPINNER_RESULT_HIDDEN): Promise<void> {
    // An absent spinner is already hidden; a spinner that stays visible must fail the search.
    await this.page.locator('xuilib-loading-spinner').first().waitFor({
      state: 'hidden',
      timeout: timeoutMs,
    });
  }

  private async waitForImmediateSearchOutcome(
    caseId: string,
    deadlineMs: number,
    caseLookupResponse: Promise<number | null>
  ): Promise<void> {
    const remaining = () => remainingNavigationTimeout(deadlineMs, 'waiting for the header search result');
    await Promise.any([
      this.page
        .waitForURL((url) => /^\/cases\/case-details\//.test(url.pathname) && url.pathname.split('/').includes(caseId), {
          timeout: remaining(),
        })
        .then(() => this.page.getByRole('tablist').waitFor({ state: 'visible', timeout: remaining() })),
      caseLookupResponse.then(async (status) => {
        if (status === 403) {
          await this.page.waitForURL((url) => url.pathname === `/cases/restricted-case-access/${caseId}`, {
            timeout: remaining(),
          });
          await this.restrictedCaseAccessContainer.waitFor({ state: 'visible', timeout: remaining() });
          return;
        }
        if (status === 400 || status === 404) {
          await this.page.waitForURL((url) => url.pathname === '/search/noresults', { timeout: remaining() });
          await this.noResultsContainer.waitFor({ state: 'visible', timeout: remaining() });
          return;
        }
        throw new Error('No missing-case or restricted-case response was received for this search');
      }),
    ]).catch(() => {
      throw new Error(
        `Header quick-search did not reach the searched case, restricted-access shell, or no-results view (path=${new URL(this.page.url()).pathname})`
      );
    });
  }

  constructor(page: Page) {
    super(page);
  }
}
