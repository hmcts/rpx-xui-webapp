import { test, expect } from '@playwright/test';

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

