import { type Page, type Locator, expect } from "@playwright/test";

export class BasePage {
  readonly nextStep: Locator;
  readonly goButton: Locator;
  readonly page: Page;
  readonly continueButton: Locator;
  readonly signOut: Locator;
  readonly saveAndContinue: Locator;
  readonly submit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nextStep = page.getByLabel("Next step");
    this.goButton = page.getByRole('button', {name: 'Go', exact: true});
    this.continueButton = page.getByRole("button", {name: "Continue"});
    this.signOut = page.getByText('Sign out');
    this.saveAndContinue = page.getByRole("button", {name: "Save and Continue"});
    this.submit = page.getByRole('button', {name: 'Submit'});
  }

  async tabNavigation(tabName) {
    await this.page.getByRole('tab', {name: tabName}).click();
  }

  async clickContinue() {
    await this.continueButton.click();
  }

}
