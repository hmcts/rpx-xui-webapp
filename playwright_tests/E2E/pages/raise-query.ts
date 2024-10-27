import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from './base.page';
import axeTest from "../helpers/accessibilityTestHelper";
import config from "../../config";

export class RaiseQuery extends BasePage{

  readonly signOut: Locator;
  readonly submit: Locator;

  public  constructor(page: Page) {
    super(page);
    this.signOut = page.getByText('Sign out');
    this.submit = page.getByRole('button', { name: 'Submit' });
  }

  async  fillQueryDetails(caseId:string,queryName,queryDescription,manageDocuments) {

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

    // Upload Document
    await manageDocuments.uploadDocuments();

    // Hard wait for ensuring that the queriesCollection is populated by RxJS and is available
    await this.page.waitForTimeout(5000);
    await axeTest(this.page);

    await this.page.getByRole('button', {name: 'Continue'}).click();

  }
  async  reviewAndSubmitQueryDetails(queryName,queryDescription) {

    const elements = [
      { role: 'button', name: 'Previous' },
      { role: 'button', name: 'Submit' },
      { role: 'link', name: ' Cancel and return to case ' }
    ];
    this.checkVisiblityOfElements(elements);

    const reviewQueryDetailsSummary =[queryName,queryDescription,'testPdf.pdf'];
    this.verifyTextMessages(reviewQueryDetailsSummary);

    await this.page.waitForTimeout(5000);
    await this.page.getByRole('button', {name: 'Submit'}).click();
    //this.submit;

    // Query Submitted Page - Check static content
    await expect(this.page.getByRole('heading', {name: 'Query submitted'})).toBeVisible();

    const messages = ['Your query has been sent to HMCTS', 'Our team will read your query and will respond',
      'You can Go back to the case'];

    this.verifyTextMessages(messages);

    await this.page.getByRole('link', {name: 'Go back to the case'}).click();
    await this.page.waitForTimeout(2000);
    await axeTest(this.page);

    //  Sign out
    await this.page.getByText('Sign out').click();
    //this.signOut;

    await this.page.waitForTimeout(3000);
  }

  private async verifyTextMessages(messages){
    for (const msg of messages) {
      await expect(this.page.getByText(msg, {exact:true})).toBeVisible();
    }
  }

  private async checkVisiblityOfElements(elements){
    for (const element of elements) {
      await expect(this.page.getByRole(element.role, { name: element.name })).toBeVisible();
    }
  }

}
