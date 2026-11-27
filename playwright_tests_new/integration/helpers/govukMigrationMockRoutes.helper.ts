import type { Page } from '@playwright/test';
import { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po';
import { setupCaseworkerJurisdictionsRoute } from './caseworkerJurisdictionMockRoutes.helper';
import { setupMigrationVisualRoutes } from './migrationVisualRoutes.helper';
import { CASE_VIEWER_CASE_REFERENCE, CASE_VIEWER_CASE_TYPE, CASE_VIEWER_JURISDICTION } from '../mocks/caseViewer.mock';
import { buildMigrationCaseMock, buildMigrationPaymentsMock } from '../mocks/govukMigration.mock';

export async function openMigrationCase(page: Page, baseURL: string): Promise<void> {
  await page.context().addCookies([{ name: 'XSRF-TOKEN', value: 'synthetic-migration-token', url: baseURL }]);
  await setupMigrationVisualRoutes(page, ['caseworker-sscs', 'hmcts-staff']);
  await setupCaseworkerJurisdictionsRoute(page, [CASE_VIEWER_JURISDICTION]);
  await page.route(`**/data/internal/cases/${CASE_VIEWER_CASE_REFERENCE}*`, (route) =>
    route.fulfill({ json: buildMigrationCaseMock() })
  );
  await page.route(`**/cases/${CASE_VIEWER_CASE_REFERENCE}/paymentgroups*`, (route) =>
    route.fulfill({ json: buildMigrationPaymentsMock() })
  );
  // The component requests text and parses the JSON response itself.
  await page.route('**/case-payment-orders?case_ids=*', (route) => route.fulfill({ json: { content: [] } }));
  await page.route(`**/pay-bulkscan/cases/${CASE_VIEWER_CASE_REFERENCE}*`, (route) => route.fulfill({ json: { payments: [] } }));
  await page.route(`**/api/refund?ccdCaseNumber=${CASE_VIEWER_CASE_REFERENCE}*`, (route) =>
    route.fulfill({ json: { refund_list: [] } })
  );
  await new CaseDetailsPage(page).openCaseDetails(CASE_VIEWER_JURISDICTION, CASE_VIEWER_CASE_TYPE, CASE_VIEWER_CASE_REFERENCE);
}
