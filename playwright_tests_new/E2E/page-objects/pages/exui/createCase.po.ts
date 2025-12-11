import { Page } from "@playwright/test";
import { Base } from "../../base";
import {faker} from '@faker-js/faker';

export class CreateCasePage extends Base {
  
  readonly container = this.page.locator("exui-case-home");
  readonly createCaseButton = this.container.getByRole('link', { name: 'Create case' });
  readonly jurisdictionSelect = this.page.getByLabel('Jurisdiction');
  readonly caseTypeSelect = this.page.getByLabel('Case type');
  readonly startButton = this.page.getByRole('button', { name: 'Start' });

  // Locators for the Divorce 
  readonly person1Title = this.page.locator('#Person1_Title');
  readonly firstNameInput = this.page.getByRole('group', { name: 'Person 1 - retained (Optional)' }).getByLabel('First Name (Optional)');
  readonly lastNameInput = this.page.getByRole('group', { name: 'Person 1 - retained (Optional)' }).getByLabel('Last Name (Optional)');
  readonly genderSelect = this.page.getByRole('group', { name: 'Person 1 - retained (Optional)' }).getByLabel('Gender (Optional)');
  readonly jobTitleInput = this.page.getByRole('group', { name: 'Job (Optional)' }).getByLabel('Title (Optional)');
  readonly jobDescriptionInput = this.page.getByRole('textbox', { name: 'Description (Optional)' });
  readonly continueButton = this.page.getByRole('button', { name: 'Continue' });
  readonly textField0Input = this.page.getByLabel('Text Field 0');
  readonly textField1Input = this.page.getByLabel('Text Field 1 (Optional)');
  readonly textField2Input = this.page.getByLabel('Text Field 2 (Optional)');
  readonly textField3Input = this.page.getByLabel('Text Field 3 (Optional)');
  readonly checkYourAnswersHeading = this.page.getByRole('heading', { name: 'Check your answers' });
  readonly testSubmitButton = this.page.getByRole('button', { name: 'Test submit' });

  // Warning modal
  readonly refreshModal = this.page.locator('.refresh-modal');
  readonly refreshModalConfirmButton = this.refreshModal.getByRole('button', { name: 'Ok' });

  constructor(page: Page) {
    super(page);
  }

  async createDivorceCase(jurisdiction: string, caseType: string, textField0:string) {
    const gender = faker.helpers.arrayElement(['Male', 'Female', 'Not given']);
    await this.createCaseButton.click();
    await this.jurisdictionSelect.selectOption(jurisdiction);
    await this.caseTypeSelect.selectOption(caseType);
    await this.startButton.click();
    await this.page.getByLabel(gender, { exact: true }).check();
    await this.person1Title.click();
    await this.person1Title.fill(faker.person.prefix());
    await this.person1Title.press('Tab');
    await this.firstNameInput.fill(faker.person.firstName());
    await this.firstNameInput.press('Tab');
    await this.lastNameInput.fill(faker.person.lastName());
    await this.lastNameInput.press('Tab');
    await this.genderSelect.selectOption(gender);
    await this.jobTitleInput.click();
    await this.jobTitleInput.fill(faker.person.jobTitle());
    await this.jobDescriptionInput.click();
    await this.jobDescriptionInput.fill(faker.lorem.sentence());
    await this.continueButton.click();
    await this.textField0Input.click();
    await this.textField0Input.fill(textField0);
    await this.textField0Input.press('Tab');
    await this.textField3Input.fill(faker.lorem.word());
    await this.textField3Input.press('Tab');
    await this.textField1Input.fill(faker.lorem.word());
    await this.textField1Input.press('Tab');
    await this.textField2Input.fill(faker.lorem.word());
    await this.continueButton.click();
    await this.testSubmitButton.click();
    await this.exuiSpinnerComponent.wait()
  };

}




