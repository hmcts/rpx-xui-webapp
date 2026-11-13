import type { Page, Request } from '@playwright/test';
import { setupCaseworkerJurisdictionsRoute } from './caseworkerJurisdictionMockRoutes.helper';
import { openDynamicFieldConfigJourney } from './dynamicFieldConfigMockRoutes.helper';
import { setupXuiAppShellBaseRoutes } from './xuiAppShellMockRoutes.helper';
import { buildHearingsUserDetailsMock } from '../mocks/hearings.mock';
import {
  DOCUMENT_UPLOAD_RECOVERY_REPLACEMENT_FILE,
  documentUploadRecoveryCaseData,
  successfulDocumentUploadResponse,
} from '../mocks/documentUploadRecovery.mock';

export async function openDocumentUploadRecoveryJourney(page: Page): Promise<{
  uploadRequests: Request[];
  createCaseRequests: Request[];
}> {
  const uploadRequests: Request[] = [];
  const createCaseRequests: Request[] = [];

  page.on('request', (request) => {
    if (request.method() === 'POST' && new URL(request.url()).pathname === '/data/case-types/xuiTestJurisdiction/cases') {
      createCaseRequests.push(request);
    }
  });

  await setupXuiAppShellBaseRoutes(page);
  await setupCaseworkerJurisdictionsRoute(page, ['DIVORCE']);
  await page.route('**/auth/isAuthenticated*', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(true) });
  });
  await page.route(/\/api\/configuration\?configurationKey=termsAndConditionsEnabled(?:&|$)/, async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(false) });
  });
  await page.route('**/api/monitoring-tools*', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) });
  });
  await page.route('**/data/internal/profile*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(buildHearingsUserDetailsMock(['caseworker-divorce', 'caseworker-divorce-solicitor'])),
    });
  });

  await page.route('**/documentsv2', async (route) => {
    uploadRequests.push(route.request());
    if (uploadRequests.length === 1) {
      await route.fulfill({ status: 502, contentType: 'application/json', body: '{}' });
      return;
    }

    const carriesReplacement = route.request().postData()?.includes(`filename="${DOCUMENT_UPLOAD_RECOVERY_REPLACEMENT_FILE}"`);
    await route.fulfill(
      carriesReplacement
        ? { status: 200, contentType: 'application/json', body: JSON.stringify(successfulDocumentUploadResponse()) }
        : { status: 400, contentType: 'application/json', body: '{}' }
    );
  });

  await openDynamicFieldConfigJourney(page, { caseData: documentUploadRecoveryCaseData() });
  return { uploadRequests, createCaseRequests };
}
