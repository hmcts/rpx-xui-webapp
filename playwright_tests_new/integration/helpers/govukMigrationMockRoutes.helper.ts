import type { Page } from '@playwright/test';
import { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po';
import { setupCaseworkerJurisdictionsRoute } from './caseworkerJurisdictionMockRoutes.helper';
import { mockMigrationRequest, setupMigrationVisualRoutes } from './migrationVisualRoutes.helper';
import { CASE_VIEWER_CASE_REFERENCE, CASE_VIEWER_CASE_TYPE, CASE_VIEWER_JURISDICTION } from '../mocks/caseViewer.mock';
import {
  buildMigrationCaseMock,
  buildMigrationPaymentsMock,
  buildMigrationPaymentDetailsMock,
  buildMigrationPaymentStatusesMock,
  MIGRATION_PAYMENT_REFERENCE,
} from '../mocks/govukMigration.mock';

export async function openMigrationCase(page: Page, baseURL: string): Promise<void> {
  await page.context().addCookies([{ name: 'XSRF-TOKEN', value: 'synthetic-migration-token', url: baseURL }]);
  await setupMigrationVisualRoutes(page, ['caseworker-sscs', 'hmcts-staff']);
  await setupCaseworkerJurisdictionsRoute(page, [CASE_VIEWER_JURISDICTION]);
  await mockMigrationRequest(page, baseURL, 'GET', `/data/internal/cases/${CASE_VIEWER_CASE_REFERENCE}`, (route) =>
    route.fulfill({ json: buildMigrationCaseMock() })
  );
  await mockMigrationRequest(page, baseURL, 'GET', `/payments/cases/${CASE_VIEWER_CASE_REFERENCE}/paymentgroups`, (route) =>
    route.fulfill({ json: buildMigrationPaymentsMock() })
  );
  await mockMigrationRequest(
    page,
    baseURL,
    'GET',
    `/payments/payment-groups/fee-pay-apportion/${MIGRATION_PAYMENT_REFERENCE}`,
    (route) => route.fulfill({ json: buildMigrationPaymentDetailsMock() })
  );
  await mockMigrationRequest(
    page,
    baseURL,
    'GET',
    `/payments/credit-account-payments/${MIGRATION_PAYMENT_REFERENCE}/statuses`,
    (route) => route.fulfill({ json: buildMigrationPaymentStatusesMock() })
  );
  await mockMigrationRequest(page, baseURL, 'GET', `/payments/payment-failures/${MIGRATION_PAYMENT_REFERENCE}`, (route) =>
    route.fulfill({ json: { payment_failure_list: [] } })
  );
  // The component requests text and parses the JSON response itself.
  await mockMigrationRequest(page, baseURL, 'GET', '/payments/case-payment-orders', (route) =>
    route.fulfill({ json: { content: [] } })
  );
  await mockMigrationRequest(page, baseURL, 'GET', `/pay-bulkscan/cases/${CASE_VIEWER_CASE_REFERENCE}`, (route) =>
    route.fulfill({ json: { payments: [] } })
  );
  await mockMigrationRequest(page, baseURL, 'GET', '/api/refund', (route) => route.fulfill({ json: { refund_list: [] } }));
  await new CaseDetailsPage(page).openCaseDetails(CASE_VIEWER_JURISDICTION, CASE_VIEWER_CASE_TYPE, CASE_VIEWER_CASE_REFERENCE);
}
