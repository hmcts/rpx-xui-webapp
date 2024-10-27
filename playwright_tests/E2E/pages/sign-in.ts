import {expect, Locator, Page} from '@playwright/test';
import {BasePage} from './base.page';
import axeTest from "../helpers/accessibilityTestHelper";
import config from '../../config';

export class SignIn extends BasePage {
  readonly page: Page;
  readonly url: string;
  readonly signOut: Locator;
  readonly submit: Locator;
  readonly applyLocator: Locator;
  readonly analyticCookie: Locator;
  readonly hideMessage: Locator;
  readonly logoutButton: Locator;

  public  constructor(page: Page) {
    super(page);
    this.page = page;
    this.signOut = page.getByText('Sign out');
    this.submit = page.getByRole('button', { name: 'Submit' });
    this.applyLocator = page.getByRole("button", { name: "Apply" });
    this.analyticCookie = page.getByRole('button', { name: 'Accept analytics cookies' });
    this.hideMessage = page.getByText('Hide message');
  }


  // TODO Once FPL goes lives with QueryManagement - we need to delete the config.QMBaseURL and start to use the
  // steps/login-steps.ts
  async idamLogin(role) {

    await this.page.goto(config.QMBaseURL);
    await this.page.getByLabel('Email address').click();

    if(role == 'solicitor') {
      console.log(' >>>>>>>>>>>> Solicitor has LOGGED IN >>>>>>>...');
      await this.page.getByLabel('Email address').fill('solicitor1@solicitors.uk');
    }else if(role =='admin') {
      console.log('>>>>>>>>>>>>  Admin has LOGGED IN >>>>>');
      await this.page.getByLabel('Email address').fill('fpl-ctsc-admin@justice.gov.uk');
    }
    await this.page.getByLabel('Password').click();
    await this.page.getByLabel('Password').fill('Password12');
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    await this.page.waitForLoadState();
    await this.page.waitForTimeout(3000);

    if (await this.analyticCookie.isVisible()) {
      await this.analyticCookie.click();
    }
    await this.isSignedIn();

    const hideMessagesCount = await this.hideMessage.count();
    for (let i = 0; i < hideMessagesCount; ++i) {
      await this.hideMessage.nth(0).click();
    }
  }

  async isSignedIn() {
    await expect(this.applyLocator).toBeVisible();
  }
}
