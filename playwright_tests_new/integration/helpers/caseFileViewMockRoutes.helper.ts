import type { Page } from '@playwright/test';
import { applySessionCookies } from '../../common/sessionCapture';
import { buildCaseFileViewCaseMock, buildCaseFileViewCategoriesMock } from '../mocks/caseFileView.mock';

export async function setupCaseFileViewMockRoutes(page: Page, caseId: string, userIdentifier: string): Promise<void> {
  await applySessionCookies(page, userIdentifier);

  const caseDetailsMock = buildCaseFileViewCaseMock(caseId);
  const categoriesMock = buildCaseFileViewCategoriesMock();

  await page.route(`**/data/internal/cases/${caseId}*`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(caseDetailsMock),
    });
  });

  await page.route(`**/categoriesAndDocuments/${caseId}*`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(categoriesMock),
    });
  });
}
