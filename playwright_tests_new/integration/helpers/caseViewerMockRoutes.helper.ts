import type { Page } from '@playwright/test';
import type { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po';
import { applySessionCookies } from '../../common/sessionCapture';
import { setupCaseworkerJurisdictionsRoute } from './caseworkerJurisdictionMockRoutes.helper';
import { setupXuiAppShellBaseRoutes } from './xuiAppShellMockRoutes.helper';
import {
  buildCaseViewerMock,
  CASE_VIEWER_CASE_REFERENCE,
  CASE_VIEWER_CASE_TYPE,
  CASE_VIEWER_JURISDICTION,
} from '../mocks/caseViewer.mock';

export type CaseViewerVariant = 'populated' | 'empty' | 'shuttered';

export type CaseViewerMockConfig = {
  roles?: string[];
  caseDetailsStatus?: number;
  caseDetailsBody?: unknown;
};

export async function setupCaseViewerMockRoutes(
  page: Page,
  variant: CaseViewerVariant = 'populated',
  config: CaseViewerMockConfig = {}
): Promise<void> {
  await applySessionCookies(page, 'STAFF_ADMIN');
  await setupXuiAppShellBaseRoutes(page, {
    userDetails: {
      roles: config.roles ?? ['caseworker-sscs', 'hmcts-staff'],
    },
  });
  await setupCaseworkerJurisdictionsRoute(page, [CASE_VIEWER_JURISDICTION]);

  const caseDetails = buildCaseViewerMock(variant);
  await page.route(`**/data/internal/cases/${CASE_VIEWER_CASE_REFERENCE}*`, async (route) => {
    await route.fulfill({
      status: config.caseDetailsStatus ?? 200,
      contentType: 'application/json',
      body: JSON.stringify(config.caseDetailsBody ?? caseDetails),
    });
  });
}

export async function openCaseViewer(
  page: Page,
  caseDetailsPage: CaseDetailsPage,
  variant: CaseViewerVariant = 'populated',
  config: CaseViewerMockConfig = {}
): Promise<void> {
  await setupCaseViewerMockRoutes(page, variant, config);
  await caseDetailsPage.openCaseDetails(CASE_VIEWER_JURISDICTION, CASE_VIEWER_CASE_TYPE, CASE_VIEWER_CASE_REFERENCE);
}

export async function openCaseViewerWithFailure(
  page: Page,
  variant: CaseViewerVariant,
  config: CaseViewerMockConfig
): Promise<void> {
  await setupCaseViewerMockRoutes(page, variant, config);
  await page.goto(`/cases/case-details/${CASE_VIEWER_JURISDICTION}/${CASE_VIEWER_CASE_TYPE}/${CASE_VIEWER_CASE_REFERENCE}`, {
    waitUntil: 'domcontentloaded',
  });
}
