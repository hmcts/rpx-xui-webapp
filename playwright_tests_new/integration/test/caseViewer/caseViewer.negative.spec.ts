import { expect, test } from '../../../E2E/fixtures';
import { openCaseViewer, openCaseViewerWithFailure } from '../../helpers/caseViewerMockRoutes.helper';

test.describe('CCD case viewer empty and shuttered states', { tag: ['@integration', '@integration-case-viewer'] }, () => {
  test('renders an empty history tab without inventing event rows', async ({ page, caseDetailsPage }) => {
    await openCaseViewer(page, caseDetailsPage, 'empty');

    const historyTab = page.getByRole('tab', { name: 'Activity and history' });
    await historyTab.click();
    await expect(historyTab).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('mat-tab-body.mat-tab-body-active')).toHaveCount(1);
    await expect(page.locator('ccd-event-log-table')).toHaveCount(0);
    await expect(page.getByRole('row', { name: /Create a case/ })).toHaveCount(0);
  });

  test('does not render viewer data omitted by CCD for a user without the caseworker role', async ({ page, caseDetailsPage }) => {
    await openCaseViewer(page, caseDetailsPage, 'populated', { roles: ['hmcts-staff'] });

    await expect(page.getByRole('tab', { name: 'Case summary' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Activity and history' })).toHaveCount(0);
    await expect(page.getByRole('tab', { name: 'Payment history' })).toHaveCount(0);
    await expect(page.getByRole('tab', { name: 'Retain or dispose' })).toHaveCount(0);
    await expect(page.getByText('Case created from the viewer fixture', { exact: true })).toHaveCount(0);
    await expect(page.getByText('Retain case', { exact: true })).toHaveCount(0);
  });

  test('shutters configured retain/dispose and print controls when disabled', async ({ page, caseDetailsPage }) => {
    await openCaseViewer(page, caseDetailsPage, 'shuttered');

    await expect(page.getByRole('tab', { name: 'Retain or dispose' })).toHaveCount(0);
    await expect(page.getByRole('link', { name: /print/i }).or(page.getByRole('button', { name: /print/i }))).toHaveCount(0);
  });

  for (const [status, expectedUrl, expectedText] of [
    [403, /\/restricted-case-access\//, /this case is restricted/i],
    [500, /\/cases$/, /case list/i],
  ] as const) {
    test(`handles case viewer HTTP ${status} using the application fallback`, async ({ page }) => {
      await openCaseViewerWithFailure(page, 'populated', {
        caseDetailsStatus: status,
        caseDetailsBody: { message: `viewer-${status}` },
      });

      await page.waitForURL(expectedUrl);
      const expectedLocator = status === 500 ? page.getByRole('heading', { name: expectedText }) : page.getByText(expectedText);
      await expect(expectedLocator).toBeVisible();
    });
  }
});
