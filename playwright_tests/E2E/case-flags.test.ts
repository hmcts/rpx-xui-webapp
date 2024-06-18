import { caseMessagesMockData } from '@hmcts/ccd-case-ui-toolkit';
import { test, expect } from '@playwright/test';
import * as c from 'config';

test('Create case flag 2', async ({ page }) => {
  await page.goto('https://manage-case.aat.platform.hmcts.net/');
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('henry_fr_harper@yahoo.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Nagoya0102');
  await page.getByRole('button', { name: 'Sign in' }).click();
  
  const caseId = '1698182796208883';
  console.log("Going to case details page for caseId: "+caseId);
  await page.goto('https://manage-case.aat.platform.hmcts.net/cases/case-details/'+caseId);
  await expect(page.getByText('Case flags', { exact: true })).toBeVisible();
  await page.getByText('Case flags', { exact: true }).click();
  await expect(page.getByRole('table', { name: 'Respondant' }).getByRole('caption')).toBeVisible();
  await expect(page.locator('#case-viewer-field-read--FlagLauncher1').getByText('Language Interpreter')).toBeVisible();

  console.log("Check Respondant details");
  const tableClass= "govuk-table";
  const tableName = "Respondant";
  const rowTextRef = "Language Interpreter";
  const textsToCheck = [/Test/, /Oct 2023/, /Active/];
  await checkTableRowContent(page, tableClass, tableName, rowTextRef, textsToCheck);
  await checkNumberOfRow(page, tableClass, tableName, 1+1);//One row for the header
});

test('View case flag', async ({ page }) => {
  await page.goto('https://manage-case.aat.platform.hmcts.net/');
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('henry_fr_harper@yahoo.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Nagoya0102');
  await page.locator('body').click();
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.goto('https://manage-case.aat.platform.hmcts.net/cases/case-details/1698182796208883');
  

  await expect(page.getByText('There are 4 active flags on')).toBeVisible();

  console.log("Check Applicant details");
  await page.getByText('Case flags', { exact: true }).click();
  await expect(page.getByRole('table', { name: 'Applicant' }).getByRole('caption')).toBeVisible();
  const tableClass= "govuk-table";
  const tableName = "Applicant";
  await checkNumberOfRow(page, tableClass, tableName, 5);//One row for the header
  await expect(page.getByRole('table', { name: 'Applicant' }).getByRole('caption')).toBeVisible();
  
  const rowTextRef = "Support filling in forms";
  const textsToCheck = [/Test/, /24 Oct 2023/, /Active/];
  await checkTableRowContent(page, tableClass, tableName, rowTextRef, textsToCheck);

  console.log("Check line 1");
  await checkTableCellContent(page, tableName, 1, 0, "Documents in a specified colour");
  await checkTableCellContent(page, tableName, 1, 1, "Test");
  await checkTableCellContent(page, tableName, 1, 2, "24 Oct 2023");
  await checkTableCellContent(page, tableName, 1, 4, "ACTIVE");

  console.log("Check line 2");
  await checkTableCellContent(page, tableName, 2, 0, "Documents in a specified colour");
  await checkTableCellContent(page, tableName, 2, 1, "Test");
  await checkTableCellContent(page, tableName, 2, 2, "24 Oct 2023");
  await checkTableCellContent(page, tableName, 2, 4, "ACTIVE");

  console.log("Check line 3");
  await checkTableCellContent(page, tableName, 3, 0, "Support filling in forms");
  await checkTableCellContent(page, tableName, 3, 1, "Test");
  await checkTableCellContent(page, tableName, 3, 2, "24 Oct 2023");
  await checkTableCellContent(page, tableName, 3, 4, "ACTIVE");

  console.log("Check line 4");
  await checkTableCellContent(page, tableName, 4, 0, "Documents in a specified colour");
  await checkTableCellContent(page, tableName, 4, 1, "Test auto comment");
  await checkTableCellContent(page, tableName, 4, 2, "05 Feb 2024");
  await checkTableCellContent(page, tableName, 4, 4, "REQUESTED");
  
});

async function checkTableCellContent(page, tableName: string, rowId: number, colID: number, expectedText: string) {
  const row = await page.locator(`table.govuk-table:has-text("${tableName}")`).locator('tr').nth(rowId);
  const text = await row.locator('td').nth(colID).innerText();
  await expect(text).toBe(expectedText);
  console.log(tableName+"["+rowId+","+colID+"]"+ text);
}

async function checkTableRowContent(page, tableClass: string, tableName: string, rowTextRef: string, textsToCheck: RegExp[]) {
  const respondantTable = page.locator(`.${tableClass}:has-text("${tableName}")`);
  await expect(respondantTable.locator('td', { hasText: `${rowTextRef}` })).toBeVisible(); 
  const rowToCheck = respondantTable.locator(`tr:has-text("${rowTextRef}")`);
  for (const text of textsToCheck) {
    await expect(rowToCheck).toHaveText(text);
  }
}
async function checkNumberOfRow(page, tableClass: string, tableName: string, expectedRowCount: number) {
  const respondantTable = page.locator(`.${tableClass}:has-text("${tableName}")`);
  const rowCount = await respondantTable.locator('tr').count();
  await expect(rowCount).toBe(expectedRowCount);
}

