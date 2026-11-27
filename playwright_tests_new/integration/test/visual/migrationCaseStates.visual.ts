import { expect, test } from '@playwright/test';
import { captureMigrationState } from '../../helpers/migrationStateEvidence.helper';
import { setupMigrationVisualRoutes } from '../../helpers/migrationVisualRoutes.helper';
import {
  buildCaseViewerMock,
  CASE_VIEWER_CASE_REFERENCE,
  CASE_VIEWER_CASE_TYPE,
  CASE_VIEWER_JURISDICTION,
} from '../../mocks/caseViewer.mock';

const casePath = `/cases/case-details/${CASE_VIEWER_JURISDICTION}/${CASE_VIEWER_CASE_TYPE}/${CASE_VIEWER_CASE_REFERENCE}`;
const caseApi = `**/data/internal/cases/${CASE_VIEWER_CASE_REFERENCE}*`;

for (const width of [1280, 320]) {
  test.describe(`Case viewer states at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });
    test.beforeEach(async ({ page }) => {
      test.skip(width === 320 && process.env.MIGRATION_STRICT_REFLOW !== 'true', 'Enable strict narrow reflow');
      await setupMigrationVisualRoutes(page, ['caseworker-sscs', 'hmcts-staff']);
    });

    test(
      'activity tab shows an actual event and can return to the case summary',
      { tag: '@migration-sweep' },
      async ({ page }, testInfo) => {
        await page.route(caseApi, (route) => route.fulfill({ json: buildCaseViewerMock() }));
        await page.goto(casePath);
        const summary = page.getByRole('tab', { name: /^Case summary/ });
        await expect(summary).toHaveAttribute('aria-selected', 'true');
        const history = page.getByRole('tab', { name: 'Activity and history' });
        await history.click();
        await expect(history).toHaveAttribute('aria-selected', 'true');
        await expect(
          page
            .getByRole('tabpanel', { name: /^Activity and history/ })
            .getByRole('row', { name: /you are on event Create a case row/i })
        ).toBeVisible();
        const state = await captureMigrationState(page, testInfo, 'case-history');
        expect.soft(state.documentWidth, 'Case history should fit the viewport').toBeLessThanOrEqual(width + 1);
        expect.soft(state.violations).toEqual([]);

        await summary.click();
        await expect(summary).toHaveAttribute('aria-selected', 'true');
        await expect(
          page.getByRole('tabpanel', { name: /^Case summary/ }).getByRole('row', { name: /Case reference/ })
        ).toContainText(CASE_VIEWER_CASE_REFERENCE);
      }
    );

    test(
      'restricted case keeps protected tabs out of the denied view',
      { tag: '@migration-sweep' },
      async ({ page }, testInfo) => {
        await page.route(caseApi, (route) => route.fulfill({ status: 403, json: { message: 'Synthetic restricted case' } }));
        await page.goto(casePath);
        await expect(page).toHaveURL(/\/restricted-case-access\//);
        await expect(page.getByText(/this case is restricted/i)).toBeVisible();
        await expect(page.getByRole('tab', { name: /Case summary|Payment history/ })).toHaveCount(0);
        const state = await captureMigrationState(page, testInfo, 'restricted-case');
        expect.soft(state.documentWidth, 'Restricted case should fit the viewport').toBeLessThanOrEqual(width + 1);
        expect.soft(state.violations).toEqual([]);
      }
    );
  });
}
