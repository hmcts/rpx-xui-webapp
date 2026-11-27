import type { Page } from '@playwright/test';
import { setupCaseListMocks } from './caseList.helper';
import { setupXuiAppShellBaseRoutes } from './xuiAppShellMockRoutes.helper';
import {
  buildCaseViewerMock,
  CASE_VIEWER_CASE_REFERENCE,
  CASE_VIEWER_CASE_TYPE,
  CASE_VIEWER_JURISDICTION,
} from '../mocks/caseViewer.mock';
import { buildMigrationRecoveryCaseList } from '../mocks/migrationJourneys.mock';

export async function setupMigrationCaseRecovery(page: Page) {
  const roles = ['caseworker-sscs', 'hmcts-staff'];
  await setupXuiAppShellBaseRoutes(page, { userDetails: { roles } });
  await setupCaseListMocks(page, {
    jurisdictions: [
      {
        id: CASE_VIEWER_JURISDICTION,
        name: CASE_VIEWER_JURISDICTION,
        caseTypes: [{ id: CASE_VIEWER_CASE_TYPE, name: CASE_VIEWER_CASE_TYPE, states: [] }],
      },
    ],
    searchResponse: buildMigrationRecoveryCaseList(),
  });
  let status = 500;
  const responses: number[] = [];
  await page.route(`**/data/internal/cases/${CASE_VIEWER_CASE_REFERENCE}*`, async (route) => {
    responses.push(status);
    await route.fulfill({
      status,
      json: status === 500 ? { message: 'Synthetic case-details failure' } : buildCaseViewerMock('populated', roles),
    });
  });
  return {
    responses,
    restoreCaseDetails: () => {
      status = 200;
    },
  };
}
