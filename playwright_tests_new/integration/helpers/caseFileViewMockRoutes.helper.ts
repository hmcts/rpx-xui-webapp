import type { Page } from '@playwright/test';
import nodeAppDataModels from '../../api/data/nodeAppDataModels';

import {
  buildCaseFileViewCaseMock,
  buildCaseFileViewCategoriesMock,
  CASE_FILE_VIEW_DOCUMENT_DELIVERY_PDF,
} from '../mocks/caseFileView.mock';
import { setupCaseworkerJurisdictionsRoute } from './caseworkerJurisdictionMockRoutes.helper';

export interface CaseFileViewMockRoutesConfig {
  categoriesMock?: object;
  categoriesStatus?: number;
  caseDetailsMock?: object;
  caseDetailsStatus?: number;
}

export interface CaseFileViewUserDetailsConfig {
  idamId: string;
  email: string;
}

export async function setupCaseFileViewUserDetailsRoute(page: Page, config: CaseFileViewUserDetailsConfig): Promise<void> {
  const userDetails = nodeAppDataModels.getUserDetails_oauth();
  userDetails.userInfo = {
    ...userDetails.userInfo,
    id: config.idamId,
    email: config.email,
  };

  await page.route('**/api/user/details*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(userDetails),
    });
  });
}

export async function setupCaseFileViewMockRoutes(
  page: Page,
  caseId: string,
  config: CaseFileViewMockRoutesConfig = {}
): Promise<void> {
  const caseDetailsMock = config.caseDetailsMock ?? buildCaseFileViewCaseMock(caseId);
  const categoriesMock = config.categoriesMock ?? buildCaseFileViewCategoriesMock();

  await setupCaseworkerJurisdictionsRoute(page, ['PRIVATELAW'], [{ serviceId: 'PRIVATELAW', serviceName: 'Private Law' }]);

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

  await page.route('**/api/markups/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
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
