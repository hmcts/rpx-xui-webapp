import { Page } from "@playwright/test";
import { Base } from "../../base";

export class CaseListPage extends Base {
  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="case-list-container" - brittle custom element selector
  readonly container = this.page.locator("exui-case-home");
  
  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="jurisdiction-select" - prefer test ID over #id
  readonly jurisdictionSelect = this.page.locator("#wb-jurisdiction")
  
  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="case-type-select" - prefer test ID over #id
  readonly caseTypeSelect = this.page.locator("#wb-case-type")
  
  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="text-field-0-input" - prefer test ID over #id
  readonly textField0Input = this.page.locator("#TextField0")
  
  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="search-results-message" - prefer test ID over #id
  readonly caseSearchResultsMessage = this.page.locator('#search-result')
  
  // TODO(TEST_ID_REQUIREMENTS.md): Add data-testid="pagination-container" - brittle CSS class selector
  readonly pagination = this.page.locator('.ngx-pagination');

  // Some case list views use an id, others a data-test attribute for the summary
  readonly caseListResultsAmount = this.page.locator(
    '#search-result-summary__text, [data-test="search-result-summary__text"]'
  );

  constructor(page: Page) {
    super(page);
  } 
  
  public async searchByJurisdiction(jurisdiction: string): Promise<void> {
    await this.jurisdictionSelect.selectOption(jurisdiction);
  }

  public async searchByCaseType(caseType: string): Promise<void> {
    await this.caseTypeSelect.selectOption(caseType);
  }

  public async searchByTextField0(textField0: string): Promise<void> {
    await this.textField0Input.fill(textField0);
  }

  public async applyFilters(): Promise<void> {
    await this.exuiCaseListComponent.filters.applyFilterBtn.click();
    await this.exuiSpinnerComponent.wait();
  }

  async goto() {
    await this.exuiHeader.selectHeaderMenuItem('Case list');
  }

  async navigateTo(){
    await this.page.goto(`/cases`);
  }

  async getPaginationFinalItem(): Promise<string | undefined> {
    const items = (await this.pagination.locator('li').allTextContents()).map(i => i.trim());
    return items.at(-1);
  }

   async openCaseByReference(cleanedCaseNumber: string) {
  const caseLink = this.page.locator(`a:has-text("${cleanedCaseNumber}")`);
  await caseLink.first().waitFor({ state: 'visible' });
  await caseLink.first().click();
}
}
