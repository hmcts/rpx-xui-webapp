import { Page } from "@playwright/test";
import config from "../../../utils/config.utils.js";
import { Base } from "../../base.js";

export class CaseListPage extends Base {
  readonly container = this.page.locator("exui-case-home");
  readonly jurisdictionSelect = this.page.locator("#wb-jurisdiction")
  readonly caseTypeSelect = this.page.locator("#wb-case-type")
  readonly textField0Input = this.page.locator("#TextField0")
  readonly caseListResultsAmount = this.page.locator("#search-result .pagination-top");

  constructor(page: Page) {
    super(page);
  }
  public async searchByJurisdiction(jurisdiction: string): Promise<void> {
    await this.jurisdictionSelect.selectOption(jurisdiction);
    await this.exuiCaseListComponent.filters.applyFilterBtn.click();
    await this.exuiSpinnerComponent.wait();
  }

  public async searchByCaseType(caseType: string): Promise<void> {
    await this.caseTypeSelect.selectOption(caseType);
    await this.exuiCaseListComponent.filters.applyFilterBtn.click();
    await this.exuiSpinnerComponent.wait();
  }

  public async searchByTextField0(textField0: string): Promise<void> {
    await this.textField0Input.fill(textField0);
    await this.exuiCaseListComponent.filters.applyFilterBtn.click();
    await this.exuiSpinnerComponent.wait();
  }

  async goto() {
    await this.page.goto(config.urls.manageCaseBaseUrl);
    await this.exuiHeader.checkIsVisible();
  }
}
