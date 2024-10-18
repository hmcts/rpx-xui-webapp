
import { test, expect } from '@playwright/test';
//import { checkTableCellContent, checkTableRowContent, checkNumberOfRow } from "./table-steps"
import config from "../config"
import { routeToCasePage } from './steps/case-steps';
import {signIn} from "./steps/login-steps";
import {retryAction} from "./steps/retry-steps";
import {clickOnMainMenu} from "./steps/steps-functions";


test('Raise a Query as a Solicitor' ,async ({ page }) => {

  console.log('...Inside Raise New Query ...' + Date.now().toLocaleString() );

  // Login as Solicitor on a Existing case
  // TODO have a new FPL Case created before this suite of tests are run - once FPLA have their code in AAT.
  // Currently we have to use an existing case on the fpl-pr environment only

  await loginExUIForQueryManagement(page,'solicitor');
  await expect(page.getByRole('heading', { name: 'Case list' })).toBeVisible();
  const xuiQMLandingUrl = config.QMBaseURL + '/case-details/1728910376478466#Query%20Management';
  await page.goto(xuiQMLandingUrl);

  //Raise A Query Event
  await page.getByText('Query Management').click();
  await page.getByLabel('Next step').selectOption('9: Object');
  await page.getByRole('button', { name: 'Go' }).click();
  await page.getByLabel('Raise a new query').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // Query Details
  await page.getByLabel('Query subject').click();
  await page.getByLabel('Query subject').fill('XUI FPL E2E 14th October - 3');
  await page.getByLabel('Query detail').fill('XUI FPL E2E Automation Test details of the query');

  // Hearing Yes/No
  await page.getByLabel('Yes').check();

  // Hearing Day Month Year Input
  await page.getByLabel('Day').click();
  await page.getByLabel('Day').fill('12');
  await page.getByLabel('Day').press('Tab');
  await page.getByLabel('Month').fill('12');
  await page.getByLabel('Month').press('Tab');
  await page.locator('[id="formControlName\\ \\+\\ \\\'-year\\\'"]').fill('2024');

  // Attach documents to be done using the dumm1y.pdf already avaialble.
  //var fileToUpload1 = path.resolve("/../test/e2e/documents/dummy1.pdf");

  await page.getByRole('button', { name: 'Continue' }).click();

  // Review Query Details Page.
  await expect(page.getByText('Upload a file to the query')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  await expect(page.getByRole('link', { name: ' Cancel and return to case ' })).toBeVisible();

  // KASI - STUCK HERE ON SUBMIT
  //await page.waitForSelector('.govuk-button')
  console.log('>>>>>>>>>>>>>>>>>>>>>>>   Before Submit - Follow Up Query   >>>>>>>>>>>>>>>>>>>>');

  await page.getByRole('button', { name: ' Submit ' }).click();

  console.log('>>>>>>>>>>>>>>>>>>>>>>>  After  Submit - Follow Up Query  >>>>>>>>>>>>>>>>>>>>');


  // Query Submitted Page
  await expect(page.getByRole('heading', { name: 'Query submitted' })).toBeVisible();
  await expect(page.getByText('Your query has been sent to HMCTS')).toBeVisible();
  await expect(page.getByText('Our team will read your query and will respond')).toBeVisible();
  await expect(page.getByText('You can Go back to the case')).toBeVisible();
  await page.getByRole('link', { name: 'Go back to the case' }).click();


  // Submit
  //await page.getByRole('button', { name: 'Continue' }).click();
  //await page.getByRole('button', {name:'Submit'}).click();
  //await expect(page.locator('ccd-query-check-your-answers div').filter({ hasText: 'Submit' })).toBeVisible();

  //await page.getByRole('button',{ name: 'Submit' }).click();
  //this works
  // await page.getByRole('link',{ name: 'Submit' }).click();
  //await page.locator('button[type="submit"]').scrollIntoViewIfNeeded();
  //await page.click('button[type="submit"]');
  // await page.getByRole('link',{ name: 'Submit' }).click();
//  await page.getByRole('link',{ name: 'Cancel and return to case' }).click();

//  await page.waitForSelector('button[type="submit"]', { state: 'visible' });
//  await page.click('text=Submit');

  // await page.click('button[type="submit"]');
  // await page.click('button[type="submit"] click' );




});


test.skip('Respond to a Query as a Admin / Caseworker from FPL ',async ({ page }) => {

  console.log('..Responsd to a Query as a CW / Admin' );

  // Login as CW Admin
  await loginExUIForQueryManagement(page,'admin'); //this is a FPLA CA/CW
  await expect(page.getByRole('heading', { name: 'Case list' })).toBeVisible();
  const xuiQMLandingUrl = config.QMBaseURL + '/case-details/1728661912249891#Query%20Management';
  await page.goto(xuiQMLandingUrl);

  // this is the name of the Query created as part of the earlier test
  // Make it dynamic ,dont hardcode -use @Before


  await page.getByRole('link', { name: 'Query 13 Oco 0917hrs' }).click();

  // Query Details Page loaded now. Assert Details and THEN click on the 'Response to a query'
  //await expect(page.getByLabel('Query Management').getByRole('paragraph')).toContainText('Back to query list');
  await expect(page.getByText('Query details')).toBeVisible();
  await expect(page.getByRole('rowheader', { name: 'Query subject' })).toBeVisible();
  await expect(page.getByRole('rowheader', { name: 'Query body' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Response to a query' })).toBeVisible();
  await page.getByRole('button', { name: 'Response to a query' }).click();

  await expect(page.getByRole('rowheader', { name: 'Last submitted by' })).toBeVisible();
  await expect(page.getByRole('rowheader', { name: 'Submission date' })).toBeVisible();
  await expect(page.getByRole('rowheader', { name: 'Query body' })).toBeVisible();
  await expect(page.getByRole('rowheader', { name: 'What is the date of the hearing?' })).toBeVisible();

  //await page.getByLabel('Response detail').click();
  await page.getByLabel('Response detail').fill('this is the response of the fpla admin . are we allowed to bring devices?');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Review Query Response Details page
  await expect(page.getByRole('heading', { name: 'Review query response details' })).toBeVisible();
  //await expect(page.getByRole('rowheader', { name: 'Document attached' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Cancel and return to tasks' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();

  // Submit the 'Response'
  console.log('>>>>>>>>>>>>>>>>>>>>>>>   Before Submit - Response to a Query  >>>>>>>>>>>>>>>>>>>>');
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(5000);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>   After  Submit - Response to a Query  >>>>>>>>>>>>>>>>>>>>');

});

test.skip('Follow Up Query as a Solicitor from FPL ',async ({ page }) => {

  console.log('....>>>>>>>>>>>>>>> Follow Up Response as a Solicitor >>>>>>>>>>>>>>>' );

  // Login as CW Admin
  await loginExUIForQueryManagement(page,'solicitor'); //this is a FPLA CA/CW
  await expect(page.getByRole('heading', { name: 'Case list' })).toBeVisible();
  const xuiQMLandingUrl = config.QMBaseURL + '/case-details/1728661912249891#Query%20Management';
  await page.goto(xuiQMLandingUrl);

  // This is the name of the Query created as part of the first test
  // Make it dynamic ,dont hardcode -use @Before

  await page.getByRole('link', {name: 'Query 13 Oco 0917hrs'}).click();
  // Query Details Page is displayed now - with the Ask Follow up question link at the bottom
  await expect(page.locator('#ask-follow-up-question')).toContainText('Ask a follow-up question');
  await page.getByRole('button', {name: 'Ask a follow-up question'}).click();

  await expect(page.getByRole('heading', { name: 'Ask a follow-up question' })).toBeVisible();
  await expect(page.getByText('Query Body', { exact: true })).toBeVisible();
  await page.getByLabel('Query Body').fill('this is the followup question from the solicitor.' +
    'Please confirm the devices you will be bringing to the courtroom on the day of the hearing.');

  await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page.getByText('Query detail', { exact: true })).toBeVisible();
  await expect(page.getByText('this is the followup question')).toBeVisible();
  await expect(page.getByText('Query detail', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Review query details' })).toBeVisible();
  await expect(page.locator('#main-content div').filter({ hasText: 'Cancel and return to query list' })).toBeVisible();

  // Submit the FollowUp Query 'Response'
  console.log('>>>>>>>>>>>>>>>>>>>>>>>   Before Submit - Follow Up Query   >>>>>>>>>>>>>>>>>>>>');
  await page.getByRole('button', { name: 'Submit' }).click();
  console.log('>>>>>>>>>>>>>>>>>>>>>>>  Before Submit - Follow Up Query  >>>>>>>>>>>>>>>>>>>>');

  // Post Submission of Follow Up Query can be verified
  // by clicking on the query and ensuring the FollowUp Reponse is present

});

function findCaseId(page: any) {
  if (page.url().includes('aat')) {
    console.log('Use aat case id');
    return '1714721967501327';
  }
  console.log('Use demo case id');
  return '1662020492250902';
}

async function loginExUIForQueryManagement(page, role) {
  console.log(' ||| Enter loginExUIForQueryManagement ' + Date.now().toLocaleString() )
  await page.goto(config.QMBaseURL);
  await page.getByLabel('Email address').click();
  if(role == 'solicitor') {
    console.log('>>>>>>>>>>>>       Solicitor has LOGGED IN >>>>>>>>>>>>>>>>>>...');
    await page.getByLabel('Email address').fill('solicitor1@solicitors.uk');
  }else if(role =='admin') {
    await page.getByLabel('Email address').fill('fpl-ctsc-admin@justice.gov.uk');
  }
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Password12');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForTimeout(3000)
  console.log(' ||| Exit loginExUIForQueryManagement()  ' + Date.now().toLocaleString() )

}



