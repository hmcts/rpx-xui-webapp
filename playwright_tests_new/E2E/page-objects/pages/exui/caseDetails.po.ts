import { Page } from "@playwright/test";
import { Base } from "../../base";

export class CaseDetailsPage extends Base {
  enterPostcode(arg0: string) {
    throw new Error("Method not implemented.");
  }
  submitCase() {
    throw new Error("Method not implemented.");
  }
  clickContinue() {
    throw new Error("Method not implemented.");
  }
  selectDynamicAddress() {
    throw new Error("Method not implemented.");
  }
  expectUpdateCaseEventVisible() {
    throw new Error("Method not implemented.");
  }
  readonly container = this.page.locator("exui-case-details-home");
  readonly createCaseSuccessMessage = this.page.locator('.alert-message');
  readonly caseDetailsTabs = this.page.locator('div[role="tab"]');

  //Case flags
  readonly caseActionsDropdown = this.page.locator('#next-step');
  readonly caseActionGoButton = this.page.locator('.event-trigger button');
  readonly submitCaseFlagButton = this.page.locator('.button[type="submit"]');

  readonly caseAlertMessage = this.page.locator('.hmcts-banner--success .alert-message');

  //Update Case 
  readonly person2Group = this.page.getByRole('group', { name: /Person 2 - not retained/i });
  readonly person2Title = this.page.locator("#Person2_Title");
  readonly person2FirstName = this.person2Group.getByLabel("First Name (Optional)");
  readonly person2LastName = this.person2Group.getByLabel("Last Name (Optional)");
  readonly person2Gender = this.person2Group.getByLabel("Gender (Optional)");
  constructor(page: Page) {
    super(page);
  }
  async selectCaseAction(action: string) {
    await this.caseActionsDropdown.selectOption(action);
    await this.caseActionGoButton.click();
  }
  async selectCaseDetailsTab(tabName: string) {
    await this.caseDetailsTabs.filter({ hasText: tabName }).click()
  }
  async fillPerson2Title(title: string) {
  await this.page.locator("#Person2_Title").fill(title);
  }
  async fillPerson2FirstName(first: string) {
    await this.person2FirstName.fill(first);
  }
  async fillPerson2LastName(last: string) {
    await this.person2LastName.fill(last);
  }
  async selectPerson2Gender(genderLabel: string) {
    const options = await this.person2Gender.locator("option").allTextContents();
    console.log("Gender dropdown options:", options);
    await this.person2Gender.selectOption({ label: genderLabel });
  }
  async openHistoryTab() {                   
    await this.page.getByRole("tab", { name: "History" }).click();
    await this.exuiSpinnerComponent.wait();
}

}
  
  

