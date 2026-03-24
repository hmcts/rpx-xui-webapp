import type { Page } from '@playwright/test';

import {
  buildCaseFileViewCaseMock,
  buildCaseFileViewCategoriesMock,
  CASE_FILE_VIEW_DOCUMENT_DELIVERY_PDF,
} from '../mocks/caseFileView.mock';

export interface CaseFileViewMockRoutesConfig {
  categoriesMock?: object;
  categoriesStatus?: number;
  caseDetailsMock?: object;
  caseDetailsStatus?: number;
}

export async function setupCaseFileViewMockRoutes(
  page: Page,
  caseId: string,
  config: CaseFileViewMockRoutesConfig = {}
): Promise<void> {
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

export async function setupCaseFileViewDocumentBinaryMockRoutes(page: Page): Promise<void> {
  await page.route('**/documentsv2/*/binary', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/pdf', body: CASE_FILE_VIEW_DOCUMENT_DELIVERY_PDF });
  });

  await page.route('**/documents/*/binary', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/pdf', body: CASE_FILE_VIEW_DOCUMENT_DELIVERY_PDF });
  });
}
