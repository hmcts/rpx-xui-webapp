import { expect, test } from '../../../E2E/fixtures';
import {
  setupCaseFileViewDocumentBinaryMockRoutes,
  setupCaseFileViewMockRoutes,
} from '../../helpers/caseFileViewMockRoutes.helper';
import {
  buildEmptyCaseFileViewCategoriesMock,
  CASE_FILE_VIEW_BINARY_FAILURE_RESPONSE,
  CASE_FILE_VIEW_DOC_IDS,
  CASE_FILE_VIEW_DOCUMENT_GATEWAYS,
} from '../../mocks/caseFileView.mock';
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
      await caseDetailsPage.openCaseDetails('PRIVATELAW', 'PRLAPPS', caseId);
      await caseDetailsPage.selectCaseDetailsTab('Case File View');
      await caseFileViewPage.waitForReady();
    });

    await test.step('Show the empty state without crashing', async () => {
      await expect(caseFileViewPage.documentHeader).toContainText('Documents (0)');
      await expect(caseFileViewPage.treeContainer).toContainText('No results found');
      await expect(caseFileViewPage.mediaViewerContainer).toBeVisible();
    });
  });

  for (const gateway of CASE_FILE_VIEW_DOCUMENT_GATEWAYS) {
    test(`Mocked ${gateway.label} binary failure does not display document content`, async ({
      caseDetailsPage,
      caseFileViewPage,
      page,
    }) => {
      const binaryRequests: { url: string; referer: string }[] = [];
      await test.step('Set up case file view mocks with a failing binary endpoint', async () => {
        await setupCaseFileViewMockRoutes(page, caseId, { cdamExclusionList: gateway.cdamExclusionList });
        await setupCaseFileViewDocumentBinaryMockRoutes(
          page,
          (url, referer) => binaryRequests.push({ url, referer }),
          CASE_FILE_VIEW_BINARY_FAILURE_RESPONSE
        );
      });

      await test.step('Open the Case File View tab', async () => {
        await caseDetailsPage.openCaseDetails('PRIVATELAW', 'PRLAPPS', caseId);
        await caseDetailsPage.selectCaseDetailsTab('Case File View');
        await caseFileViewPage.waitForReady();
      });

      await test.step('Keep the page shell visible after a document load failure', async () => {
        const responsePromise = page.waitForResponse((response) =>
          new URL(response.url()).pathname.endsWith(`/${CASE_FILE_VIEW_DOC_IDS.evidenceAlpha}/binary`)
        );
        await caseFileViewPage.clickFile('Evidence', 'Alpha evidence.pdf');
        const response = await responsePromise;
        expect(response.status()).toBe(500);
        await response.finished();
        const caseUrl = new URL(page.url());
        caseUrl.hash = '';
        await expect.poll(() => binaryRequests.length).toBeGreaterThan(0);
        const expectedUrl = `${caseUrl.origin}${gateway.binaryPath}/${CASE_FILE_VIEW_DOC_IDS.evidenceAlpha}/binary`;
        expect([expectedUrl, `${expectedUrl}?caseId=${caseId}`]).toContain(binaryRequests.at(-1)?.url);
        await expect(caseFileViewPage.documentHeader).toContainText('Documents (6)');
        await expect(caseFileViewPage.treeContainer).toContainText('Evidence');
        await expect(caseFileViewPage.mediaViewerToolbar).not.toBeVisible();
        await expect(caseFileViewPage.mediaViewPanel).not.toBeVisible();
      });
    });
  }

  test('Mocked categories failure shows the service error instead of a ready case file', async ({
    caseDetailsPage,
    caseFileViewPage,
    page,
  }) => {
    await setupCaseFileViewMockRoutes(page, caseId, { categoriesStatus: 500 });
    await caseDetailsPage.openCaseDetails('PRIVATELAW', 'PRLAPPS', caseId);
    await caseDetailsPage.selectCaseDetailsTab('Case File View');

    await expect(page.getByRole('heading', { name: 'Sorry, there is a problem with the service', exact: true })).toBeVisible();
    await expect(page.getByText('Try again later.', { exact: true })).toBeVisible();
    await expect(caseFileViewPage.container).not.toBeVisible();
  });
});
