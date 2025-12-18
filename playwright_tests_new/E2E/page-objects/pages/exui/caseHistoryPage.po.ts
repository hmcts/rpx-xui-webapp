import { Page, expect } from "@playwright/test";
import { Base } from "../../base";
import { faker } from "@faker-js/faker";

export class CaseHistoryPage extends Base {

  readonly historyTab = this.page.getByRole("tab", { name: "History" });
  readonly caseHistoryList = this.page.getByTestId("case-history-list");
  readonly createCaseEventButton = this.page.getByRole("button", { name: "Create a case" });
  readonly eventDetailsText = this.page.getByText("Event Details");

  // create-case flow
  readonly container = this.page.locator("exui-case-home");
  readonly createCaseButton = this.container.getByRole("link", { name: "Create case" });
  readonly jurisdictionSelect = this.page.getByLabel("Jurisdiction");
  readonly caseTypeSelect = this.page.getByLabel("Case type");
  readonly startButton = this.page.getByRole("button", { name: "Start" });
  readonly person1Title = this.page.locator("#Person1_Title");
  readonly firstNameInput = this.page
    .getByRole("group", { name: "Person 1 - retained (Optional)" })
    .getByLabel("First Name (Optional)");
  readonly lastNameInput = this.page
    .getByRole("group", { name: "Person 1 - retained (Optional)" })
    .getByLabel("Last Name (Optional)");
  readonly genderSelect = this.page
    .getByRole("group", { name: "Person 1 - retained (Optional)" })
    .getByLabel("Gender (Optional)");
  readonly jobTitleInput = this.page
    .getByRole("group", { name: "Job (Optional)" })
    .getByLabel("Title (Optional)");
  readonly jobDescriptionInput = this.page.getByRole("textbox", { name: "Description (Optional)" });
  readonly continueButton = this.page.getByRole("button", { name: "Continue" });
  readonly textField0Input = this.page.getByLabel("Text Field 0");
  readonly textField1Input = this.page.getByLabel("Text Field 1 (Optional)");
  readonly textField2Input = this.page.getByLabel("Text Field 2 (Optional)");
  readonly textField3Input = this.page.getByLabel("Text Field 3 (Optional)");
  readonly checkYourAnswersHeading = this.page.getByRole("heading", { name: "Check your answers" });
  readonly testSubmitButton = this.page.getByRole("button", { name: "Test submit" });

  constructor(page: Page) {
    super(page);
  }
  // Case History Page Methods
  async openHistoryTab() {
    await this.page.waitForLoadState("networkidle");
    await this.historyTab.click();
    await this.caseHistoryList.waitFor();
  }
  async openCreateCaseEvent() {
    await this.createCaseEventButton.click();
  }
  async expectEventDetailsVisible() {
    await expect(this.eventDetailsText).toBeVisible();
  }
  async checkCaseHistoryPage(jurisdiction: string, caseType: string, textField0: string) {
    const gender = faker.helpers.arrayElement(["Male", "Female", "Not given"]);

    await this.createCaseButton.click();
    await this.jurisdictionSelect.selectOption(jurisdiction);
    await this.caseTypeSelect.selectOption(caseType);
    await this.startButton.click();
    await this.page.getByLabel(gender, { exact: true }).check();
    await this.person1Title.fill(faker.person.prefix());
    await this.firstNameInput.fill(faker.person.firstName());
    await this.lastNameInput.fill(faker.person.lastName());
    await this.genderSelect.selectOption(gender);
    await this.jobTitleInput.fill(faker.person.jobTitle());
    await this.jobDescriptionInput.fill(faker.lorem.sentence());
    await this.continueButton.click();
    await this.textField0Input.fill(textField0);
    await this.textField3Input.fill(faker.lorem.word());
    await this.textField1Input.fill(faker.lorem.word());
    await this.textField2Input.fill(faker.lorem.word());
    await this.continueButton.click();
    await this.testSubmitButton.click();
    await this.exuiSpinnerComponent.wait();
  }
}
