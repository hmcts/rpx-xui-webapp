import { Page } from '@playwright/test';
import { Base } from '../../base';

export class CaseListPage extends Base {
  readonly container = this.page.locator('exui-case-home');
  readonly caseListHeading = this.page.locator('main h1');
  readonly filtersContainer = this.page.locator('.search-block .hmcts-filter-layout__filter');
  readonly showHideFilterButton = this.page.locator('.search-block button[aria-controls]').first();
  readonly applyFilterButton = this.page.locator('.search-block button[type="submit"]');
  readonly resetFilterButton = this.page.locator('.search-block button[type="reset"]');
  readonly jurisdictionSelect = this.page.locator('#wb-jurisdiction');

  readonly caseTypeSelect = this.page.locator('#wb-case-type');

  readonly textField0Input = this.page.locator('#TextField0');
  readonly textField0FallbackInput = this.page
    .locator('input[id*="TextField0"], input[name*="TextField0"], input[formcontrolname*="TextField0"]')
    .first();
  readonly quickSearchContainer = this.page.locator('.hmcts-primary-navigation__global-search');
  readonly quickSearchCaseReferenceInput = this.page.locator('#exuiCaseReferenceSearch');
  readonly quickSearchFindButton = this.quickSearchContainer.getByRole('button', { name: 'Find', exact: true });
  readonly caseSearchResultsMessage = this.page.locator('#search-result');
  readonly caseResultsTable = this.page.locator('#search-result table');
  readonly pagination = this.page.locator('.ngx-pagination');

  // Some case list views use an id, others a data-test attribute for the summary
  readonly caseListResultsAmount = this.page.locator('#search-result-summary__text, [data-test="search-result-summary__text"]');

  constructor(page: Page) {
    super(page);
  }

  public async searchByJurisdiction(jurisdiction: string): Promise<void> {
    await this.jurisdictionSelect.selectOption(jurisdiction);
  }

  public async searchByCaseType(caseType: string): Promise<void> {
    await this.caseTypeSelect.selectOption(caseType);
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

  async goto() {
    await this.page.goto('/cases');
    await this.exuiSpinnerComponent.wait();
  }

  async navigateTo() {
    await this.page.goto('/cases');
  }

  async getPaginationFinalItem(): Promise<string | undefined> {
    const items = (await this.pagination.locator('li').allTextContents()).map((i) => i.trim());
    return items.at(-1);
  }

  async openCaseByReference(cleanedCaseNumber: string) {
    const caseLink = this.page.locator(`a:has-text("${cleanedCaseNumber}")`);
    await caseLink.first().waitFor({ state: 'visible' });
    await caseLink.first().click();
  }
}
