import type { Page } from '@playwright/test';
import { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po';
import { setupCaseworkerJurisdictionsRoute } from './caseworkerJurisdictionMockRoutes.helper';
import { setupVisualManageCasesRoutes } from './visualManageCasesRoutes.helper';
import { buildXuiAppShellEnvironmentConfigMock } from './xuiAppShellMockRoutes.helper';
import { CASE_VIEWER_CASE_REFERENCE, CASE_VIEWER_CASE_TYPE, CASE_VIEWER_JURISDICTION } from '../mocks/caseViewer.mock';
import { buildMigrationCaseMock, buildMigrationPaymentsMock, MIGRATION_FEATURE_FLAGS } from '../mocks/govukMigration.mock';

export async function openMigrationCase(page: Page, baseURL: string): Promise<void> {
  await page.context().addCookies([{ name: 'XSRF-TOKEN', value: 'synthetic-migration-token', url: baseURL }]);
  await setupVisualManageCasesRoutes(page, ['caseworker-sscs', 'hmcts-staff']);
  const flagHeaders = { date: new Date().toUTCString(), 'access-control-expose-headers': 'Date' };
  await page.route('**/*launchdarkly.com/**', (route) => route.fulfill({ status: 202, headers: flagHeaders, body: '' }));
  await page.route('**/*launchdarkly.com/sdk/eval**', (route) =>
    route.fulfill({
      headers: flagHeaders,
      json: MIGRATION_FEATURE_FLAGS,
    })
  );
  await page.route('**/*launchdarkly.com/sdk/goals/**', (route) => route.fulfill({ headers: flagHeaders, json: [] }));
  await page.route(/\/external\/config\/ui(?:\/|\?|$)/, (route) =>
    route.fulfill({
      json: {
        ...buildXuiAppShellEnvironmentConfigMock(),
        hearingJurisdictionConfig: { hearingJurisdictions: { '.+': [] }, hearingAmendment: { '.+': [] } },
      },
    })
  );
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
