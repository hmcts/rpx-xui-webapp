import { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po.ts';
import { expect } from '../../E2E/fixtures.ts';
import { formatCaseNumberWithDashes } from '../../E2E/utils';
import { VALID_SEARCH_CASE_REFERENCE } from '../mocks/search.mock.ts';
import type { Page } from '@playwright/test';

const RESTRICTED_ACCESS_MESSAGE = 'This case is restricted. The details of the users with access are provided below.';

export async function restrictedCaseAccessContainerHelper(page: Page, caseDetailsPage: CaseDetailsPage) {
  await expect(page.getByText(RESTRICTED_ACCESS_MESSAGE)).toBeVisible();
  expect(await caseDetailsPage.exuiBodyComponent.mainHeading.textContent()).toContain(
    formatCaseNumberWithDashes(VALID_SEARCH_CASE_REFERENCE)
  );
  await expect(caseDetailsPage.restrictedAccessContainer).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Users with access' })).toBeVisible();

  const table = caseDetailsPage.exuiBodyComponent.table;
  await expect(table.locator('thead th, thead td')).toHaveCount(3);
  await expect(table.locator('thead th, thead td').nth(0)).toHaveText('User');
  await expect(table.locator('thead th, thead td').nth(1)).toHaveText('Case role');
  await expect(table.locator('thead th, thead td').nth(2)).toHaveText('Email address');
  await expect(table.locator('tbody tr')).toHaveCount(0);
}
