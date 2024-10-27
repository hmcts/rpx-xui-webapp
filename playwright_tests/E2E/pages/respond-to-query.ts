import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from './base.page';
import config2 from '../settings/test-docs/file-config';
import axeTest from '../helpers/accessibilityTestHelper';
import config from "../../config";
export class RespondToQuery extends BasePage{


  async respondAndSubmit(queryName:string,caseId:string){
    await this.page.getByRole('link', {name: queryName}).click();

    await expect(this.page.getByText('Query details')).toBeVisible();
    await expect(this.page.getByRole('rowheader', {name: 'Query subject'})).toBeVisible();
    await expect(this.page.getByRole('rowheader', {name: 'Query body'})).toBeVisible();
    await expect(this.page.getByRole('button', {name: 'Response to a query'})).toBeVisible();
    await axeTest(this.page);

    await this.page.getByRole('button', {name: 'Response to a query'}).click();
    await this.page.waitForTimeout(5000);

    // Respond to a Query - Query Details Page
    let rowHeaders = ['Last submitted by', 'Submission date', 'Query body', 'What is the date of the hearing?'];

    // TODO Review Query Response Details page
    // await expect(page.getByRole('rowheader', {name: 'Last submitted by'})).toBeVisible();
    // await expect(page.getByRole('rowheader', {name: 'Submission date'})).toBeVisible();
    // await expect(page.getByRole('rowheader', {name: 'Query body'})).toBeVisible();
    // await expect(page.getByRole('rowheader', {name: 'What is the date of the hearing?'})).toBeVisible();

    for (const header of rowHeaders) {
      await expect(this.page.getByRole('rowheader', {name: header})).toBeVisible();
    }
    await this.page.getByLabel('Response detail')
      .fill('This is the response of the fpla admin . Are we allowed to bring any devices?');

    await axeTest(this.page);

    await this.page.getByRole('button', {name: 'Continue'}).click();
    //await page.continueButton.click();
    await this.page.waitForTimeout(5000);

    // await expect(page.getByRole('heading', {name: 'Review query response details'})).toBeVisible();
    // await expect(page.getByRole('link', {name: 'Cancel and return to tasks'})).toBeVisible();
    // await expect(page.getByRole('button', {name: 'Previous'})).toBeVisible();
    // await expect(page.getByRole('button', {name: 'Submit'})).toBeVisible();

    const elementsToCheck = [
      { role: 'heading', name: 'Review query response details' },
      { role: 'link', name: 'Cancel and return to tasks' },
      { role: 'button', name: 'Previous' },
      { role: 'button', name: 'Submit' }
    ];

    // for (const element of elementsToCheck) {
    //   await expect(page.getByRole(element.role, { name: element.name })).toBeVisible();
    // }
    // Submit the 'Response'
    await axeTest(this.page);
    await this.page.getByRole('button', {name: 'Submit'}).click();
    await this.page.waitForTimeout(5000);
    await this.page.getByText('Sign out').click();
    await this.page.waitForTimeout(3000);



  }


  async followUpResponse(queryName,caseId){
    console.log('....Solicitor - Follow Up Response ....');
    await this.page.getByRole('link', {name: queryName}).click();
    // Query Details Page is displayed now - with the Ask Follow up question link at the bottom
    await expect(this.page.locator('#ask-follow-up-question')).toContainText('Ask a follow-up question');
    await this.page.getByRole('button', {name: 'Ask a follow-up question'}).click();

    await expect(this.page.getByRole('heading', {name: 'Ask a follow-up question'})).toBeVisible();
    await expect(this.page.getByText('Query Body', {exact: true})).toBeVisible();
    await this.page.getByLabel('Query Body').fill('this is the FollowUp question from the solicitor.' +
      'Please confirm the devices you will be bringing to the courtroom on the day of the hearing.');

    await expect(this.page.getByRole('button', {name: 'Previous'})).toBeVisible();
    await expect(this.page.getByRole('button', {name: 'Continue'})).toBeVisible();
    await axeTest(this.page);

    await this.page.getByRole('button', {name: 'Continue'}).click();

    await expect(this.page.getByText('Query detail', {exact: true})).toBeVisible();
    await expect(this.page.getByText('this is the followup question')).toBeVisible();
    await expect(this.page.getByText('Query detail', {exact: true})).toBeVisible();
    await expect(this.page.getByRole('heading', {name: 'Review query details'})).toBeVisible();
    await expect(this.page.locator('#main-content div').filter({hasText: 'Cancel and return to query list'})).toBeVisible();

    await this.page.waitForTimeout(1000);
    await axeTest(this.page);

    // Submit the FollowUp Query 'Response'
    await this.page.waitForTimeout(4000);

    await this.page.getByRole('button', {name: 'Submit'}).click();
    await this.page.waitForTimeout(5000);

    await expect(this.page.getByText('Query submitted', {exact: true})).toBeVisible();
    await expect(this.page.getByText('Your query has been sent to HMCTS', {exact: true})).toBeVisible();
    await expect(this.page.getByText('Our team will read your query and will respond', {exact: true})).toBeVisible();

    await this.page.getByText('Sign out').click();
    await this.page.waitForTimeout(3000);
  }
}
