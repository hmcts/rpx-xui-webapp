import { type Page, type Locator, expect } from "@playwright/test";

export class BasePage {
  readonly nextStep: Locator;
  readonly goButton: Locator;
  readonly page: Page;
  readonly continueButton: Locator;
  readonly signOut: Locator;
  readonly checkYourAnswersHeader: Locator;
  readonly saveAndContinue: Locator;
  readonly submit: Locator;
  readonly postCode: Locator;
  readonly findAddress: Locator;
  readonly rateLimit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nextStep = page.getByLabel("Next step");
    this.goButton = page.getByRole('button', {name: 'Go', exact: true});
    this.continueButton = page.getByRole("button", {name: "Continue"});
    this.signOut = page.getByText('Sign out');
    this.checkYourAnswersHeader = page.getByRole('heading', {name: 'Check your answers'});
    this.saveAndContinue = page.getByRole("button", {name: "Save and Continue"});
    this.submit = page.getByRole('button', {name: 'Submit'});
    this.postCode = page.getByRole('textbox', {name: 'Enter a UK postcode'});
    this.findAddress = page.getByRole('button', {name: 'Find address'});
    this.rateLimit = page.getByText('Your request was rate limited. Please wait a few seconds before retrying your document upload');
  }

  async tabNavigation(tabName) {
    await this.page.getByRole('tab', {name: tabName}).click();
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async waitForAllUploadsToBeCompleted() {
    const locs = await this.page.getByText('Cancel upload').all();
    for (let i = 0; i < locs.length; i++) {
      await expect(locs[i]).toBeDisabled();
    }
  }

  async waitForTabToBeVisible(tabName: string) {
    expect(await this.reloadAndCheckForText(tabName, 10000, 3)).toBeTruthy();
  }

  async reloadAndCheckForText(text: string, timeout?: number, maxAttempts?: number): Promise<boolean> {
    // reload the page, wait 5s, see if it's there
    for (let attempt = 0; attempt < (maxAttempts ?? 12); attempt++) {
      await this.page.reload();
      await this.page.waitForLoadState();
      await this.page.waitForTimeout(timeout ?? 5000);
      if (await this.page.getByText(text).isVisible()) {
        return true;
      }
    }
  }
}
