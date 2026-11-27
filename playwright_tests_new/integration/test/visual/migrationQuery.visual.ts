import { expect, test } from '@playwright/test';
import { CaseDetailsPage } from '../../../E2E/page-objects/pages/exui/caseDetails.po';
import { QueryManagementPage } from '../../../E2E/page-objects/pages/exui/queryManagement.po';
import { captureMigrationState } from '../../helpers/migrationStateEvidence.helper';
import { setupMigrationVisualRoutes } from '../../helpers/migrationVisualRoutes.helper';
import { setupQueryManagementMockRoutes } from '../../helpers/queryManagementMockRoutes.helper';
import {
  QUERY_MANAGEMENT_CASE_REFERENCE,
  QUERY_MANAGEMENT_CASE_TYPE,
  QUERY_MANAGEMENT_JURISDICTION,
  QUERY_MANAGEMENT_QUERY_DETAIL,
  QUERY_MANAGEMENT_QUERY_SUBJECT,
  QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_NAME,
} from '../../mocks/queryManagement.mock';

for (const width of [1280, 320]) {
  test.describe(`Query review at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });
    test.beforeEach(() => {
      test.skip(width === 320 && process.env.MIGRATION_STRICT_REFLOW !== 'true', 'Enable strict narrow reflow');
    });

    test(
      'renders the entered query in review with submission still available',
      { tag: '@migration-sweep' },
      async ({ page }, testInfo) => {
        await setupMigrationVisualRoutes(page, ['pui-case-manager']);
        const requests = await setupQueryManagementMockRoutes(page, { user: 'solicitor' });
        const details = new CaseDetailsPage(page);
        const query = new QueryManagementPage(page);
        await details.openCaseDetails(QUERY_MANAGEMENT_JURISDICTION, QUERY_MANAGEMENT_CASE_TYPE, QUERY_MANAGEMENT_CASE_REFERENCE);
        await details.selectCaseAction(QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_NAME, {
          expectedLocator: query.raiseANewQueryHeading,
          expectedPath: new RegExp(`/query-management/query/${QUERY_MANAGEMENT_CASE_REFERENCE}(?:$|[/?#])`),
        });
        await query.chooseRaiseAQueryJourney();
        await expect(query.enterQueryDetailsHeading).toBeVisible();
        await query.enterQueryDetailsAndContinue(QUERY_MANAGEMENT_QUERY_SUBJECT, QUERY_MANAGEMENT_QUERY_DETAIL);
        await expect(query.reviewQueryDetailsHeading).toBeVisible();
        await expect(query.reviewSummaryValues.nth(0)).toContainText(QUERY_MANAGEMENT_QUERY_SUBJECT);
        await expect(query.reviewSummaryValues.nth(1)).toContainText(QUERY_MANAGEMENT_QUERY_DETAIL);
        await expect(page.getByRole('button', { name: 'Submit', exact: true })).toBeEnabled();
        expect(requests.submittedEvents).toHaveLength(0);
        const state = await captureMigrationState(page, testInfo, 'query-review');
        expect.soft(state.documentWidth, 'Query review should fit the viewport').toBeLessThanOrEqual(width + 1);
        expect.soft(state.violations).toEqual([]);
      }
    );
  });
}
