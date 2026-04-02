import { Locator, Page } from '@playwright/test';
import { Base } from '../../base';
import { EXUI_TIMEOUTS } from './exui-timeouts';

export class CaseListPage extends Base {
  readonly errorPageHeading = this.page.getByRole('heading', { name: /something went wrong/i });
  readonly serviceDownError = this.exuiBodyComponent.serviceDownError;
  readonly container = this.page.locator('exui-case-home');
  readonly caseListHeading = this.page.locator('main h1');
  readonly filtersContainer = this.page.locator('.search-block .hmcts-filter-layout__filter');
  readonly showHideFilterButton = this.page.locator('.search-block button[aria-controls]').first();
  readonly applyFilterButton = this.page.locator('.search-block button[type="submit"]');
  readonly resetFilterButton = this.page.locator('.search-block button[type="reset"]');
  readonly jurisdictionSelect = this.page.locator('#wb-jurisdiction');
  readonly caseTypeSelect = this.page.locator('#wb-case-type');
  readonly stateSelect = this.page.locator('#wb-case-state');
  readonly textField0Input = this.page.locator('#TextField0');
  readonly textField0FallbackInput = this.page
    .locator('input[id*="TextField0"], input[name*="TextField0"], input[formcontrolname*="TextField0"]')
    .first();
  readonly quickSearchContainer = this.page.locator('.hmcts-primary-navigation__global-search');
  readonly quickSearchCaseReferenceInput = this.page.locator('#exuiCaseReferenceSearch');
  readonly quickSearchFindButton = this.quickSearchContainer.getByRole('button', { name: 'Find', exact: true });
  readonly caseSearchResultsMessage = this.page.locator('#search-result');
  readonly caseResultsTable = this.page.locator('#search-result table');
  readonly caseListResultsLimitWarning = this.page.locator('#search-result .govuk-warning-text__text');
  readonly unselectableCasesInfoMessage = this.page.locator('#info-msg-unselected-case');
  readonly unselectableCasesInfoDetails = this.page.locator('#info-msg-unselected-case details');
  readonly unselectableCasesInfoSummaryButton = this.page.locator('#info-msg-unselected-case summary');
  readonly unselectableCasesInfoSummary = this.page.locator('#sp-msg-unselected-case-header');
  readonly unselectableCasesInfoContent = this.page.locator('#sp-msg-unselected-case-content');
  readonly pagination = this.page.locator('.ngx-pagination');
  readonly paginationNext = this.page.locator('.pagination-next');
  readonly paginationPrevious = this.page.locator('.pagination-previous');
  readonly paginationCurrentPage = this.pagination.locator('.current');
  // Some case list views use an id, others a data-test attribute for the summary
  readonly caseListResultsAmount = this.page.locator('#search-result-summary__text, [data-test="search-result-summary__text"]');

  constructor(page: Page) {
    super(page);
  }

  public async searchByJurisdiction(jurisdiction: string): Promise<void> {
    await this.selectDropdownOption(this.jurisdictionSelect, jurisdiction);
  }

  public async searchByCaseType(caseType: string): Promise<void> {
    await this.selectDropdownOption(this.caseTypeSelect, caseType);
  }

  public async searchByState(state: string): Promise<void> {
    await this.selectDropdownOption(this.stateSelect, state);
  }

  public async searchByTextField0(textField0: string): Promise<boolean> {
    let input = this.textField0Input;
    if (!(await input.isVisible().catch(() => false))) {
      const canToggleFilters = await this.showHideFilterButton.isVisible().catch(() => false);
      if (canToggleFilters) {
        await this.showHideFilterButton.click();
      }
    }

    if (!(await input.isVisible().catch(() => false))) {
      input = this.textField0FallbackInput;
    }

    const isVisible = await input.isVisible().catch(() => false);
    if (!isVisible) {
      return false;
    }
    await input.fill(textField0);
    return true;
  }

  public async quickSearchByCaseReference(caseReference: string): Promise<boolean> {
    const inputVisible = await this.quickSearchCaseReferenceInput.isVisible().catch(() => false);
    const buttonVisible = await this.quickSearchFindButton.isVisible().catch(() => false);
    if (!inputVisible || !buttonVisible) {
      return false;
    }
    await this.quickSearchCaseReferenceInput.fill(caseReference);
    await this.quickSearchFindButton.click();
    await this.exuiSpinnerComponent.wait();
    return true;
  }

  public async applyFilters(): Promise<void> {
    await this.exuiCaseListComponent.filters.applyFilterBtn.click();
    await this.exuiSpinnerComponent.wait();
  }

  private async selectDropdownOption(select: Locator, optionValueOrLabel: string): Promise<void> {
    await select.waitFor({ state: 'visible', timeout: EXUI_TIMEOUTS.SEARCH_FIELD_VISIBLE });

    await this.page.waitForFunction(
      ({ selector, optionValueOrLabel: target }) => {
        const element = document.querySelector(selector);
        if (!(element instanceof HTMLSelectElement)) {
          return false;
        }

        return Array.from(element.options).some((option) => option.value === target || option.label.trim() === target);
      },
      { selector: await select.evaluate((element) => `#${(element as HTMLSelectElement).id}`), optionValueOrLabel },
      { timeout: EXUI_TIMEOUTS.SEARCH_FIELD_VISIBLE }
    );

    const availableOptions = await select.evaluate((element) =>
      Array.from((element as HTMLSelectElement).options).map((option) => ({
        value: option.value,
        label: option.label.trim(),
      }))
    );

    const matchingOption = availableOptions.find(
      (option) => option.value === optionValueOrLabel || option.label === optionValueOrLabel
    );

    if (!matchingOption) {
      throw new Error(`Dropdown option "${optionValueOrLabel}" was not available.`);
    }

    if (matchingOption.value === optionValueOrLabel) {
      await select.selectOption(optionValueOrLabel);
      return;
    }

    await select.selectOption({ label: optionValueOrLabel });
  }

  private async assertCasesPageHealthy(context: string): Promise<void> {
    if (await this.errorPageHeading.isVisible().catch(() => false)) {
      throw new Error(`Cases page showed "Something went wrong" while ${context}.`);
    }
    if (await this.serviceDownError.isVisible().catch(() => false)) {
      throw new Error(`Cases page showed service down while ${context}.`);
    }
  }

  private async waitForCasesSpinnerToSettle(timeoutMs: number): Promise<void> {
    await this.page
      .waitForFunction(() => document.querySelectorAll('xuilib-loading-spinner').length === 0, undefined, { timeout: timeoutMs })
      .catch(() => undefined);
  }

  private async waitForCasesShellReady(): Promise<void> {
    const bootstrapTimeoutMs = EXUI_TIMEOUTS.SEARCH_FIELD_VISIBLE;
    await this.waitForCasesSpinnerToSettle(10_000);
    const bootstrapSignal = await Promise.any([
      this.caseListHeading.waitFor({ state: 'visible', timeout: bootstrapTimeoutMs }).then(() => 'heading'),
      this.quickSearchCaseReferenceInput.waitFor({ state: 'visible', timeout: bootstrapTimeoutMs }).then(() => 'quick-search'),
      this.quickSearchContainer.waitFor({ state: 'visible', timeout: bootstrapTimeoutMs }).then(() => 'quick-search-container'),
      this.filtersContainer.waitFor({ state: 'visible', timeout: bootstrapTimeoutMs }).then(() => 'filters'),
      this.container.waitFor({ state: 'visible', timeout: bootstrapTimeoutMs }).then(() => 'container'),
      this.errorPageHeading.waitFor({ state: 'visible', timeout: bootstrapTimeoutMs }).then(() => 'error-page'),
      this.serviceDownError.waitFor({ state: 'visible', timeout: bootstrapTimeoutMs }).then(() => 'service-down'),
    ]).catch(async () => {
      await this.assertCasesPageHealthy('waiting for cases shell bootstrap');
      throw new Error(`Cases page shell did not become ready within ${bootstrapTimeoutMs}ms.`);
    });

    if (bootstrapSignal === 'error-page' || bootstrapSignal === 'service-down') {
      await this.assertCasesPageHealthy('waiting for cases shell bootstrap');
    }

    await this.waitForCasesSpinnerToSettle(10_000);
    await this.assertCasesPageHealthy('waiting for cases shell bootstrap');

    try {
      await Promise.any([
        this.quickSearchCaseReferenceInput.waitFor({ state: 'visible', timeout: 10000 }),
        this.quickSearchContainer.waitFor({ state: 'visible', timeout: 10000 }),
        this.filtersContainer.waitFor({ state: 'visible', timeout: 10000 }),
        this.container.waitFor({ state: 'visible', timeout: 10000 }),
      ]);
    } catch {
      await this.page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => undefined);
      await this.assertCasesPageHealthy('waiting for cases page network idle');
      await this.container.waitFor({ state: 'visible', timeout: 10000 });
    }
  }

  async goto() {
    await this.page.goto('/cases', { waitUntil: 'domcontentloaded' });
    await this.waitForCasesShellReady();
  }

  async navigateTo() {
    await this.goto();
  }

  async getPaginationFinalItem(): Promise<string | undefined> {
    const items = (await this.pagination.locator('li').allTextContents()).map((i) => i.trim());
    return items.at(-1);
  }

  async getVisiblePaginationPageNumbers(): Promise<number[]> {
    const paginationItems = this.pagination.locator('li');
    const itemCount = await paginationItems.count();
    const visiblePageNumbers = new Set<number>();

    for (let index = 0; index < itemCount; index += 1) {
      const item = paginationItems.nth(index);
      if (!(await item.isVisible().catch(() => false))) {
        continue;
      }

      const digitMatches = ((await item.textContent()) ?? '').match(/\d+/g) ?? [];
      for (const match of digitMatches) {
        visiblePageNumbers.add(Number(match));
      }
    }

    return Array.from(visiblePageNumbers).sort((first, second) => first - second);
  }

  private async getVisiblePaginationPageControl(pageNumber: number): Promise<Locator> {
    const pageText = pageNumber.toString();
    const candidateControls = this.page.locator('.ngx-pagination a, .ngx-pagination button').filter({
      hasText: new RegExp(`^\\s*${pageText}\\s*$`),
    });
    const candidateCount = await candidateControls.count();

    for (let index = 0; index < candidateCount; index += 1) {
      const candidate = candidateControls.nth(index);
      if (await candidate.isVisible().catch(() => false)) {
        return candidate;
      }
    }

    const paginationItems = (await this.page.locator('.ngx-pagination li').allTextContents()).map((item) => item.trim());
    throw new Error(`Pagination page control "${pageText}" was not visible. Available items: ${paginationItems.join(', ')}`);
  }

  async clickPaginationPage(pageNumber: number): Promise<void> {
    const pageControl = await this.getVisiblePaginationPageControl(pageNumber);
    await pageControl.click({ timeout: 10_000 });
  }

  async openCaseByReference(cleanedCaseNumber: string) {
    const caseLink = this.page.locator(`a:has-text("${cleanedCaseNumber}")`);
    await caseLink.first().waitFor({ state: 'visible' });
    await caseLink.first().click();
  }
}
