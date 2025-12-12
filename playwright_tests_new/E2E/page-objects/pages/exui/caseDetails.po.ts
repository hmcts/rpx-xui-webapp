import { Page } from "@playwright/test";
import { Base } from "../../base";


export class CaseDetailsPage extends Base {
  readonly container = this.page.locator("exui-case-details-home");
  readonly createCaseSuccessMessage = this.page.locator('.alert-message');

  //Case flags
  readonly caseActionsDropdown = this.page.locator('#next-step');
  readonly caseActionGoButton = this.page.locator('.event-trigger button');
  readonly submitCaseFlagButton = this.page.locator('button.button');
  
  constructor(page: Page) {
    super(page);
  }
  async selectCaseAction(action: string) {
    await this.caseActionsDropdown.selectOption(action);
    await this.caseActionGoButton.click();
  } 

}
