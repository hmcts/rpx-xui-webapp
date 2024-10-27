import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from './base.page';
import config2 from '../settings/test-docs/file-config';
import axeTest from "../helpers/accessibilityTestHelper";
import config from "../../config";

export class RaiseQuery extends BasePage{

  readonly url: string;
  readonly signOut: Locator;
  readonly submit: Locator;

  public  constructor(page: Page) {
    super(page);
    this.signOut = page.getByText('Sign out');
    this.submit = page.getByRole('button', { name: 'Submit' });
  }

  async  fillQueryDetails(caseId:string,queryName,queryDescription) {

    await expect(this.page.getByRole('heading', {name: 'Case list'})).toBeVisible();
    const xuiQMLandingUrl = config.QMBaseURL + '/case-details/' + caseId + '#Query%20Management';

    await this.page.goto(xuiQMLandingUrl);

    //Raise A Query Event
    await this.page.getByText('Query Management').click();
    await this.page.getByLabel('Next step').selectOption('9: Object');
    await this.page.getByRole('button', {name: 'Go'}).click();
    await this.page.getByLabel('Raise a new query').check();

    await axeTest(this.page);

    await this.page.getByRole('button', {name: 'Continue'}).click();
    await this.page.getByLabel('Query subject').click();
    await this.page.getByLabel('Query subject').fill(queryName);
    await this.page.getByLabel('Query detail').fill(queryDescription);

    // Hearing Yes/No
    await this.page.getByLabel('Yes').check();

    // Hearing Day Month Year Input
    await this.page.getByLabel('Day').click();
    await this.page.getByLabel('Day').fill('12');
    await this.page.getByLabel('Day').press('Tab');
    await this.page.getByLabel('Month').fill('12');
    await this.page.getByLabel('Month').press('Tab');
    await this.page.locator('//*[@id="formControlName + \'-year\'"]').fill('2024');

    // upload document
    // await manageDocuments.uploadDocuments();
    //await page.getByRole('textbox', { name: 'Upload a document' })
    //.setInputFiles(config.test);

    // Hard wait for ensuring that the queriesCollection is populated by RxJS and is available
    await this.page.waitForTimeout(5000);
    await axeTest(this.page);

    await this.page.getByRole('button', {name: 'Continue'}).click();

  }
  async  reviewAndSubmitQueryDetails(queryName,queryDescription) {

    await expect(this.page.getByRole('button', {name: 'Previous'})).toBeVisible();
    await expect(this.page.getByRole('button', {name: 'Submit'})).toBeVisible();
    await expect(this.page.getByRole('link', {name: ' Cancel and return to case '})).toBeVisible();

    await this.page.waitForTimeout(5000);
    await this.page.getByRole('button', {name: 'Submit'}).click();

    // Query Submitted Page - Check static content
    await expect(this.page.getByRole('heading', {name: 'Query submitted'})).toBeVisible();
    await expect(this.page.getByText('Your query has been sent to HMCTS')).toBeVisible();
    await expect(this.page.getByText('Our team will read your query and will respond')).toBeVisible();
    await expect(this.page.getByText('You can Go back to the case')).toBeVisible();
    await this.page.getByRole('link', {name: 'Go back to the case'}).click();
    await this.page.waitForTimeout(2000);
    await axeTest(this.page);

    //  Sign out
    await this.page.getByText('Sign out').click();
    await this.page.waitForTimeout(3000);
  }
}
