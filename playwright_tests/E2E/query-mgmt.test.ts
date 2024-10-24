import { test, expect } from '@playwright/test';
import { checkTableCellContent, checkTableRowContent, checkNumberOfRow } from './steps/table-steps'
import config from '../config';
import {name,date,internet}  from 'faker' ;
import {signIn} from "./steps/login-steps";

import {retryAction} from "./steps/retry-steps";
import {clickOnMainMenu} from "./steps/steps-functions";
import axeTest from "./helpers/accessibilityTestHelper";
import * as faker from "faker";

test.describe('FPL Test Case Data to be shared by all Tests @QM', () => {
  let queryName = ''
  let queryDescription='';
  let caseId='';


  test.beforeAll(async () => {
    console.log(' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Setup Data required across these tests  ~~~~~~~~~~~~~~~~~~~~~~');
    // caseId hardcoded for now
    caseId = '1729586799128026';
    queryName = 'QM E2E '+ faker.name.firstName(1) + ' '+ faker.name.lastName(1) ;
    queryDescription= ' Query Description for '+ queryName;
    console.log('....>>>>>>>>  Query Name   >>>>>>>> ' +  queryName);

  });


  test('Raise a Query as a Solicitor @QM', async ({page}) => {

    console.log('...Raise a new Query ...');
    // Login as Solicitor on a Existing case
    // TODO have a new FPL Case created before this suite of tests are run - once FPLA have their code in AAT.
    // Currently we use an existing case on the fpl-pr environment as a workaround.

    await loginExUIForQueryManagement(page, 'solicitor');
    await expect(page.getByRole('heading', {name: 'Case list'})).toBeVisible();
    const xuiQMLandingUrl = page.url()+`/case-details/${caseId}`+`#Query%20Management`;

    await page.goto(xuiQMLandingUrl);

    //Raise A Query Event
    await page.getByText('Query Management').click();
    await page.getByLabel('Next step').selectOption('9: Object');
    await page.getByRole('button', {name: 'Go'}).click();
    await page.getByLabel('Raise a new query').check();

    await axeTest(page);

    await page.getByRole('button', {name: 'Continue'}).click();

    // Query Details
    await page.getByLabel('Query subject').click();
    await page.getByLabel('Query subject').fill(queryName);
    await page.getByLabel('Query detail').fill(queryDescription);

    // Hearing Yes/No
    await page.getByLabel('Yes').check();

    // Hearing Day Month Year Input
    await page.getByLabel('Day').click();
    await page.getByLabel('Day').fill('12');
    await page.getByLabel('Day').press('Tab');
    await page.getByLabel('Month').fill('12');
    await page.getByLabel('Month').press('Tab');
    // can this be changed or xpath'ified as a last resort
    await page.locator('[id="formControlName\\ \\+\\ \\\'-year\\\'"]').fill('2024');

    // Hard wait for ensuring that the queriesCollection is populated by RxJS and is available
    await page.waitForTimeout(5000);
    await axeTest(page);

    await page.getByRole('button', {name: 'Continue'}).click();

    // Review Query Details Page.
    await expect(page.getByRole('button', {name: 'Previous'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Submit'})).toBeVisible();
    await expect(page.getByRole('link', {name: ' Cancel and return to case '})).toBeVisible();

    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'Submit' }).click();

    // Query Submitted Page - Check static content
    await expect(page.getByRole('heading', {name: 'Query submitted'})).toBeVisible();
    await expect(page.getByText('Your query has been sent to HMCTS')).toBeVisible();
    await expect(page.getByText('Our team will read your query and will respond')).toBeVisible();
    await expect(page.getByText('You can Go back to the case')).toBeVisible();
    await page.getByRole('link', {name: 'Go back to the case'}).click();
    await page.waitForTimeout(2000);
    await axeTest(page);

    //  Sign out
    await page.getByText('Sign out').click();
    await page.waitForTimeout(1000);
  });

  test('Respond to a Query as a Admin / Caseworker from FPL @QM', async ({page}) => {

    console.log('...Respond to a Query as a Caseworker/Admin');

    // Login as CW Admin
    await loginExUIForQueryManagement(page, 'admin');
    await expect(page.getByRole('heading', {name: 'Case list'})).toBeVisible();
    const xuiQMLandingUrl = config.QMBaseURL + '/case-details/' + caseId + '#Query%20Management';
    await page.goto(xuiQMLandingUrl);

    await page.getByRole('link', {name: queryName}).click();

    await expect(page.getByText('Query details')).toBeVisible();
    await expect(page.getByRole('rowheader', {name: 'Query subject'})).toBeVisible();
    await expect(page.getByRole('rowheader', {name: 'Query body'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Response to a query'})).toBeVisible();
    await axeTest(page);

    await page.getByRole('button', {name: 'Response to a query'}).click();
    await page.waitForTimeout(5000);

    // Respond to a Query - Query Details Page
    await expect(page.getByRole('rowheader', {name: 'Last submitted by'})).toBeVisible();
    await expect(page.getByRole('rowheader', {name: 'Submission date'})).toBeVisible();
    await expect(page.getByRole('rowheader', {name: 'Query body'})).toBeVisible();
    await expect(page.getByRole('rowheader', {name: 'What is the date of the hearing?'})).toBeVisible();

    await page.getByLabel('Response detail').fill('This is the response of the fpla admin . Are we allowed to bring any devices?');
    await axeTest(page);

    await page.getByRole('button', {name: 'Continue'}).click();
    await page.waitForTimeout(5000);


    // Review Query Response Details page
    await expect(page.getByRole('heading', {name: 'Review query response details'})).toBeVisible();
    await expect(page.getByRole('link', {name: 'Cancel and return to tasks'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Previous'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Submit'})).toBeVisible();

    // Submit the 'Response'
    await axeTest(page);
    await page.getByRole('button', {name: 'Submit'}).click();
    await page.waitForTimeout(5000);
    await page.getByText('Sign out').click();

  });

  test('Follow Up Query as a Solicitor from FPL', async ({page}) => {

    console.log('....Follow Up Response as a Solicitor.....');

    // Login as CW Admin
    await loginExUIForQueryManagement(page, 'solicitor'); //this is a FPLA CA/CW
    await expect(page.getByRole('heading', {name: 'Case list'})).toBeVisible();
    const xuiQMLandingUrl = config.QMBaseURL + '/case-details/' + caseId + '#Query%20Management';

    await page.goto(xuiQMLandingUrl);

    await axeTest(page);

    await page.getByRole('link', {name: queryName}).click();
    // Query Details Page is displayed now - with the Ask Follow up question link at the bottom
    await expect(page.locator('#ask-follow-up-question')).toContainText('Ask a follow-up question');
    await page.getByRole('button', {name: 'Ask a follow-up question'}).click();

    await expect(page.getByRole('heading', {name: 'Ask a follow-up question'})).toBeVisible();
    await expect(page.getByText('Query Body', {exact: true})).toBeVisible();
    await page.getByLabel('Query Body').fill('this is the FollowUp question from the solicitor.' +
      'Please confirm the devices you will be bringing to the courtroom on the day of the hearing.');

    await expect(page.getByRole('button', {name: 'Previous'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Continue'})).toBeVisible();
    await axeTest(page);

    await page.getByRole('button', {name: 'Continue'}).click();

    await expect(page.getByText('Query detail', {exact: true})).toBeVisible();
    await expect(page.getByText('this is the followup question')).toBeVisible();
    await expect(page.getByText('Query detail', {exact: true})).toBeVisible();
    await expect(page.getByRole('heading', {name: 'Review query details'})).toBeVisible();
    await expect(page.locator('#main-content div').filter({hasText: 'Cancel and return to query list'})).toBeVisible();

    // Submit the FollowUp Query 'Response'
    await page.waitForTimeout(1000);
    await axeTest(page);

    await page.getByRole('button', {name: 'Submit'}).click();
    await page.waitForTimeout(5000);

    await page.getByText('Sign out').click();
    await page.waitForTimeout(1000);

  });

});

async function loginExUIForQueryManagement(page, role) {

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
}
