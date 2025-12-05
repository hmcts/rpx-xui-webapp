import { Page } from "@playwright/test";
import {config } from "../../../utils/config.utils";
import { Base } from "../../base";

export class CaseListPage extends Base {
  readonly container = this.page.locator("exui-case-home");
  readonly jurisdictionSelect = this.page.locator("#wb-jurisdiction")
  readonly caseTypeSelect = this.page.locator("#wb-case-type")
  readonly textField0Input = this.page.locator("#TextField0")
  readonly caseListResultsAmount = this.page.locator("#search-result .pagination-top");
  readonly caseSearchResultsMessage = this.page.locator('#search-result')
  readonly pagination = this.page.locator('.ngx-pagination');

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

  async getPaginationFinalItem(): Promise<string | undefined> {
    const items = (await this.pagination.locator('li').allTextContents()).map(i => i.trim());
    return items.length > 0 ? items[items.length - 1] : undefined;
  }
}
