import { expect, test } from '../../../E2E/fixtures';
import { openCaseViewer } from '../../helpers/caseViewerMockRoutes.helper';

test.describe('CCD case viewer empty and shuttered states', { tag: ['@integration', '@integration-case-viewer'] }, () => {
  test('renders an empty history tab without inventing event rows', async ({ page, caseDetailsPage }) => {
    await openCaseViewer(page, caseDetailsPage, 'empty');

    const historyTab = page.getByRole('tab', { name: 'Activity and history' });
    await historyTab.click();
    await expect(historyTab).toHaveAttribute('aria-selected', 'true');
    const historyPanel = page.getByRole('tabpanel', { name: 'Activity and history' });
    await expect(historyPanel.getByRole('row', { name: /Create a case/ })).toHaveCount(0);
  });

  test('shutters configured retain/dispose and print controls when disabled', async ({ page, caseDetailsPage }) => {
    await openCaseViewer(page, caseDetailsPage, 'shuttered');

    await expect(page.getByRole('tab', { name: 'Retain or dispose' })).toHaveCount(0);
    await expect(page.getByRole('link', { name: /print/i }).or(page.getByRole('button', { name: /print/i }))).toHaveCount(0);
  });
});
