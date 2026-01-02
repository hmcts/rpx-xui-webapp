import { Page } from "@playwright/test";
import { Base } from "../../base";

export class CaseDetailsPage extends Base {


  readonly container = this.page.locator("exui-case-details-home");
  readonly createCaseSuccessMessage = this.page.locator('.alert-message');
  readonly caseDetailsTabs = this.page.locator('div[role="tab"]');
  readonly caseActionsDropdown = this.page.locator('#next-step');
  readonly caseActionGoButton = this.page.locator('.event-trigger button');
  readonly submitCaseFlagButton = this.page.locator('.button[type="submit"]');
  readonly caseAlertMessage = this.page.locator('.hmcts-banner--success .alert-message');
  readonly person2Group = this.page.getByRole('group', { name: /Person 2 - not retained/i });
  readonly person2FirstName = this.page.getByRole('group', { name: 'Person 2 - retained (Optional)' }).getByLabel('First Name (Optional)');
  readonly person2LastName= this.page.getByRole('group', { name: 'Person 2 - retained (Optional)' }).getByLabel('Last Name (Optional)');
  constructor(page: Page) {
    super(page);
  }
  async selectCaseAction(action: string) {
    await this.caseActionsDropdown.selectOption(action);
    await this.caseActionGoButton.click();
  }
    async startUpdateCase(action: string) {
    await this.caseActionsDropdown.waitFor();
    await this.caseActionsDropdown.selectOption(action);
    await this.caseActionGoButton.click();
  }
  async selectCaseDetailsTab(tabName: string) {
    await this.caseDetailsTabs.filter({ hasText: tabName }).click()
  }
  async fillPerson2FirstName(first: string) {
    await this.person2FirstName.fill(first);
  }
  async fillPerson2LastName(last: string) {
    await this.person2LastName.fill(last);
  }
  async openHistoryTab() {                   
    await this.page.getByRole("tab", { name: "History" }).click();
    await this.exuiSpinnerComponent.wait();
}

}
  
  

