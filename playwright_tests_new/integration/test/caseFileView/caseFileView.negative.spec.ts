import { expect, test } from '../../../E2E/fixtures';
import { setupCaseFileViewMockRoutes } from '../../helpers';
import { buildEmptyCaseFileViewCategoriesMock } from '../../mocks/caseFileView.mock';
import { applySessionCookies } from '../../../common/sessionCapture';

const caseId = '1690807693531270';
const userIdentifier = 'RESTRICTED_CASE_FILE_VIEW_ON';

test.beforeEach(async ({ page }) => {
  await applySessionCookies(page, userIdentifier);
});

test.describe(`Case file view negative with ${userIdentifier}`, { tag: ['@integration', '@integration-case-file-view'] }, () => {
  test('Empty categories response shows an empty case file view state', async ({ caseDetailsPage, caseFileViewPage, page }) => {
    await test.step('Set up case file view mocks with no categories', async () => {
      await setupCaseFileViewMockRoutes(page, caseId, {
        categoriesMock: buildEmptyCaseFileViewCategoriesMock(),
      });
    });

    await test.step('Open the Case File View tab', async () => {
      await page.goto(`/cases/case-details/PRIVATELAW/PRLAPPS/${caseId}`);
      await caseDetailsPage.selectCaseDetailsTab('Case File View');
      await caseFileViewPage.waitForReady();
    });

    await test.step('Show the empty state without crashing', async () => {
      await expect(caseFileViewPage.documentHeader).toContainText('Documents (0)');
      await expect(caseFileViewPage.treeContainer).toContainText('No results found');
      await expect(caseFileViewPage.mediaViewerContainer).toBeVisible();
    });
  });

  test('Document binary failure keeps the case file view stable', async ({ caseDetailsPage, caseFileViewPage, page }) => {
    await test.step('Set up case file view mocks with a failing binary endpoint', async () => {
      await setupCaseFileViewMockRoutes(page, caseId);

      await page.route('**/documentsv2/*/binary', async (route) => {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'forced document binary failure' }),
        });
      });
      await page.route('**/documents/*/binary', async (route) => {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ message: 'forced document binary failure' }),
        });
      });
    });

    await test.step('Open the Case File View tab', async () => {
      await page.goto(`/cases/case-details/PRIVATELAW/PRLAPPS/${caseId}`);
      await caseDetailsPage.selectCaseDetailsTab('Case File View');
      await caseFileViewPage.waitForReady();
    });

    await test.step('Keep the page shell visible after a document load failure', async () => {
      await caseFileViewPage.clickFile('Evidence', 'Alpha evidence.pdf');

      await expect(caseFileViewPage.documentHeader).toContainText('Documents (6)');
      await expect(caseFileViewPage.treeContainer).toContainText('Evidence');
      await expect(caseFileViewPage.mediaViewerContainer).toBeVisible();
    });
  });
});
