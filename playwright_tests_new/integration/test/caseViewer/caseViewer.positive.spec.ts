import { expect, test } from '../../../E2E/fixtures';
import { openCaseViewer } from '../../helpers/caseViewerMockRoutes.helper';

test.describe('CCD case viewer regression coverage', { tag: ['@integration', '@integration-case-viewer'] }, () => {
  test('renders configured viewer tabs and case data', async ({ page, caseDetailsPage }) => {
    await openCaseViewer(page, caseDetailsPage);

    await expect(page.getByRole('tab', { name: 'Case summary' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Activity and history' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Payment history' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'Retain or dispose' })).toBeVisible();
    await expect(caseDetailsPage.caseViewerRow(CASE_VIEWER_CASE_REFERENCE)).toBeVisible();
  });

  test('renders populated history and payment warning on their configured tabs', async ({ page, caseDetailsPage }) => {
    await openCaseViewer(page, caseDetailsPage);

    await caseDetailsPage.selectCaseDetailsTab('Activity and history');
    await expect(page.getByRole('tabpanel', { name: 'Activity and history' })).toContainText('Create a case');

    await caseDetailsPage.selectCaseDetailsTab('Payment history');
    await expect(page.getByRole('tabpanel', { name: 'Payment history' })).toContainText(
      'Recent payments may take a few minutes to reflect here.'
    );
  });

  test('exposes the print entry point when printing is enabled', async ({ page, caseDetailsPage }) => {
    await openCaseViewer(page, caseDetailsPage);

    await expect(page.getByRole('link', { name: /print/i }).or(page.getByRole('button', { name: /print/i }))).toBeVisible();
  });
});

const CASE_VIEWER_CASE_REFERENCE = '1652112127295261';
