import { expect  } from '@playwright/test';
import { test } from '../E2E/fixtures/create-fixture';
import config from '../config';
import * as faker from "faker";

let queryName = ''
let queryDescription='';
let caseId='' ;

test.describe('FPL Test Case Data for QueryManagement  @QM', () => {

  test.beforeAll(async () => {
    console.log(' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Setup Data required across these tests  ~~~~~~~~~~~~~~~~~~~~~~');
    // caseId hardcoded for now - will need to script it once availble on AAT.
    caseId = '1729972152278154';
    queryName = faker.name.firstName(1) + ' '+ faker.name.lastName(1) + ' QM E2E' ;
    queryDescription= ' Query Description for '+ queryName;
 });
  test('Raise a Query as a Solicitor @QM', async ({page,signIn,raiseAQuery,manageDocuments}) => {

    console.log('...Raise a new Query :Solicitor ...');
    // TODO have a new FPL Case created before this suite of tests are run - once FPLA have their code in AAT.
    await signIn.idamLogin('solicitor');
    await raiseAQuery.fillQueryDetails(caseId,queryName,queryDescription,manageDocuments);
    await raiseAQuery.reviewAndSubmitQueryDetails(queryName,queryDescription);

  });

  test('Respond to a Query as a Admin & Follow up as a Solicitor @QM', async ({page, signIn, respondToQuery}) => {
    console.log('...Respond to a Query as a :: Admin  ...');

    await signIn.idamLogin('admin');
    await expect(page.getByRole('heading', {name: 'Case list'})).toBeVisible();
    const xuiQMLandingUrl = config.QMBaseURL + '/case-details/' + caseId + '#Query%20Management';
    await page.goto(xuiQMLandingUrl);

    await respondToQuery.respondAndSubmit(queryName,caseId);

    // Solicitor - Follow up Response to a Query.
    await signIn.idamLogin('solicitor');
    await expect(page.getByRole('heading', {name: 'Case list'})).toBeVisible();
    await page.goto(xuiQMLandingUrl);
    await respondToQuery.followUpResponse(queryName,caseId);

  });
});
