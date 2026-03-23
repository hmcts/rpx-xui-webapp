import type { Page } from '@playwright/test';
import { applySessionCookies } from '../../common/sessionCapture';
import { buildCaseFileViewCaseMock, buildCaseFileViewCategoriesMock } from '../mocks/caseFileView.mock';

export interface CaseFileViewMockRoutesConfig {
  categoriesMock?: unknown;
  categoriesStatus?: number;
  caseDetailsMock?: unknown;
  caseDetailsStatus?: number;
}

export async function setupCaseFileViewMockRoutes(
  page: Page,
  caseId: string,
  userIdentifier: string,
  config: CaseFileViewMockRoutesConfig = {}
): Promise<void> {
  await applySessionCookies(page, userIdentifier);

  const caseDetailsMock = config.caseDetailsMock ?? buildCaseFileViewCaseMock(caseId);
  const categoriesMock = config.categoriesMock ?? buildCaseFileViewCategoriesMock();

  await page.route(`**/data/internal/cases/${caseId}*`, async (route) => {
    await route.fulfill({
      status: config.caseDetailsStatus ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(caseDetailsMock),
    });
  });

  await page.route(`**/categoriesAndDocuments/${caseId}*`, async (route) => {
    await route.fulfill({
      status: config.categoriesStatus ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(categoriesMock),
    });
  });
}
