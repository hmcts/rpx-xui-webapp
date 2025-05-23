import { test, expect } from '@playwright/test';
import { checkTableCellContent, checkTableRowContent, checkNumberOfRow } from "./steps/table-steps"
import config from "../config"
import { routeToCasePage } from './steps/case-steps';
import { getActiveFlagsForCase, checkActiveRowsMatchesBanner } from './steps/flag-steps';

test('Create case flag 2', async ({ page }) => {
  await loginExUIWithCaseFlag(page);

  await routeToCasePage(page, '1747043572209027');
  await expect(page.getByText('Case flags', { exact: true })).toBeVisible();
  await page.getByText('Case flags', { exact: true }).click();
  await expect(page.getByRole('table', { name: 'Respondent' }).getByRole('caption')).toBeVisible();
  await expect(page.locator('#case-viewer-field-read--FlagLauncher1').getByText('Language Interpreter')).toBeVisible();

  console.log("Check Respondant details");
  const tableClass= "govuk-table";
  const tableName = "Respondent";
  const rowTextRef = "Language Interpreter";
  const textsToCheck = [/est/, /May 2025/, /Active/];
  await checkTableRowContent(page, tableClass, tableName, rowTextRef, textsToCheck);
  await checkNumberOfRow(page, tableClass, tableName, 1+1);//One row for the header
});

test('View case flag', async ({ page }) => {
  await loginExUIWithCaseFlag(page);
  await routeToCasePage(page, '1747043572209027');
  const currentActiveFlags = getActiveFlagsForCase(page);

  console.log('Check the banner shows the correct value');
  await expect(page.getByText(`There are ${await currentActiveFlags} active flags on`)).toBeVisible();
  await page.getByText('Case flags', { exact: true }).click();
  console.log('Check all the party tables on the page for any active flags');
  await checkActiveRowsMatchesBanner(page, currentActiveFlags);

  console.log("Check Applicant details");
  const tableClass= "govuk-table";
  const tableName = "Applicant";
  await expect(page.getByRole('table', { name: 'Applicant' }).getByRole('caption')).toBeVisible();

  const rowTextRef = "Documents in a specified colour";
  const textsToCheck = [/test/, /12 May 2025/, /Active/];
  await checkTableRowContent(page, tableClass, tableName, rowTextRef, textsToCheck);

  console.log("Check line 1");
  await checkTableCellContent(page, tableName, 1, 0, "Documents in a specified colour");
  await checkTableCellContent(page, tableName, 1, 1, "test");
  await checkTableCellContent(page, tableName, 1, 2, "12 May 2025");
  await checkTableCellContent(page, tableName, 1, 4, "ACTIVE");

  console.log("Check line 2");
  await checkTableCellContent(page, tableName, 2, 0, "Documents in large print");
  await checkTableCellContent(page, tableName, 2, 1, "test");
  await checkTableCellContent(page, tableName, 2, 2, "12 May 2025");
  await checkTableCellContent(page, tableName, 2, 4, "ACTIVE");

  console.log("Check line 3");
  await checkTableCellContent(page, tableName, 3, 0, "Support filling in forms");
  await checkTableCellContent(page, tableName, 3, 1, "test");
  await checkTableCellContent(page, tableName, 3, 2, "12 May 2025");
  await checkTableCellContent(page, tableName, 3, 4, "ACTIVE");

});

async function loginExUIWithCaseFlag(page) {
  await page.goto(config.CaseBaseURL);
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('henry_fr_harper@yahoo.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Nagoya0102');
  await page.getByRole('button', { name: 'Sign in' }).click();
}

