import { expect, test } from '../../../E2E/fixtures';
import { setupCaseFileViewDocumentBinaryMockRoutes, setupCaseFileViewMockRoutes } from '../../helpers';
import { CASE_FILE_VIEW_DOC_IDS, CASE_FILE_VIEW_DOCUMENT_DELIVERY_PDF } from '../../mocks/caseFileView.mock';
import { applySessionCookies } from '../../../common/sessionCapture';

const caseId = '1690807693531270';
const fileViewOnUser = 'RESTRICTED_CASE_FILE_VIEW_ON';
const fileViewOffUser = 'RESTRICTED_CASE_FILE_VIEW_OFF';

test.describe(`Case file view as ${fileViewOnUser}`, { tag: ['@integration', '@integration-case-file-view'] }, () => {
  test('V1.1 shows tree view, media viewer, document count, folder hierarchy and upload stamps', async ({
    caseDetailsPage,
    caseFileViewPage,
    page,
  }) => {
    await test.step('Set up V1.1 case file view mocks', async () => {
      await applySessionCookies(page, fileViewOnUser);
      await setupCaseFileViewMockRoutes(page, caseId);
    });

    await test.step('Open the Case File View tab', async () => {
      await page.goto(`/cases/case-details/PRIVATELAW/PRLAPPS/${caseId}`);
      await caseDetailsPage.selectCaseDetailsTab('Case File View');
      await caseFileViewPage.waitForReady();
    });

    await test.step('Check document header file counts and folder hierarchy', async () => {
      await expect.soft(caseFileViewPage.documentHeader).toContainText('Documents (6)');

      const evidenceNode = await caseFileViewPage.getFolderNode('Evidence');
      const applicationsNode = await caseFileViewPage.getFolderNode('Applications');
      const ordersNode = await caseFileViewPage.getFolderNode('Orders');
      const approvedOrdersNode = await caseFileViewPage.getFolderNode('Orders.Approved orders');

      await expect.soft(caseFileViewPage.getFolderName(applicationsNode)).toContainText('Applications');
      await expect.soft(caseFileViewPage.getFolderName(ordersNode)).toContainText('Orders');
      await expect.soft(caseFileViewPage.getFolderName(approvedOrdersNode)).toContainText('Approved orders');
      await expect.soft(caseFileViewPage.getFolderName(evidenceNode)).toContainText('Evidence');

      await expect.soft(caseFileViewPage.getFolderCount(evidenceNode)).toHaveText('3');
      await expect.soft(caseFileViewPage.getFolderCount(ordersNode)).toHaveText('2');
      await expect.soft(caseFileViewPage.getFolderCount(approvedOrdersNode)).toHaveText('1');
      await expect.soft(caseFileViewPage.getFolderCount(applicationsNode)).toHaveText('1');
    });

    await test.step('Upload timestamps for evidence document are correct', async () => {
      const evidenceNode = await caseFileViewPage.getFolderNode('Evidence');

      await expect.soft(caseFileViewPage.getFileUploadStamp(evidenceNode, 'Alpha evidence.pdf')).toContainText('20 Oct 2023');
      await expect.soft(caseFileViewPage.getFileUploadStamp(evidenceNode, 'Middle evidence.pdf')).toContainText('21 Oct 2023');
      await expect.soft(caseFileViewPage.getFileUploadStamp(evidenceNode, 'Zeta evidence.pdf')).toContainText('22 Oct 2023');
    });
  });

  test('Case view can show V2 and V1 documents', async ({ caseDetailsPage, caseFileViewPage, page }) => {
    const binaryRequests: string[] = [];
    await test.step('Set up case file and binary document mocks', async () => {
      await applySessionCookies(page, fileViewOnUser);
      await setupCaseFileViewMockRoutes(page, caseId);

      await page.route('**/documentsv2/*/binary', async (route) => {
        binaryRequests.push(route.request().url());
        await route.fulfill({ status: 200, contentType: 'application/pdf', body: CASE_FILE_VIEW_DOCUMENT_DELIVERY_PDF });
      });
      await page.route('**/documents/*/binary', async (route) => {
        binaryRequests.push(route.request().url());
        await route.fulfill({ status: 200, contentType: 'application/pdf', body: CASE_FILE_VIEW_DOCUMENT_DELIVERY_PDF });
      });
    });

    await test.step('Open the Case File View tab', async () => {
      await page.goto(`/cases/case-details/PRIVATELAW/PRLAPPS/${caseId}`);
      await caseDetailsPage.selectCaseDetailsTab('Case File View');
      await caseFileViewPage.waitForReady();
      await expect(caseFileViewPage.documentHeader).toContainText('Documents (6)');
    });

    await test.step('Select a V2 document and update the media viewer request target', async () => {
      const requestCountBeforeV2 = binaryRequests.length;
      await caseFileViewPage.clickFile('Evidence', 'Zeta evidence.pdf');
      await expect.poll(() => binaryRequests.length).toBeGreaterThan(requestCountBeforeV2);
      await expect
        .poll(() => binaryRequests.at(-1) || '')
        .toContain(`/documentsv2/${CASE_FILE_VIEW_DOC_IDS.evidenceZetaV2}/binary`);
    });

    await test.step('Select a V1 document and update the media viewer request target', async () => {
      const requestCountBeforeV1 = binaryRequests.length;
      await caseFileViewPage.clickFile('Evidence', 'Alpha evidence.pdf');
      await expect.poll(() => binaryRequests.length).toBeGreaterThan(requestCountBeforeV1);
      await expect
        .poll(() => binaryRequests.at(-1) || '')
        .toContain(`/documents/${CASE_FILE_VIEW_DOC_IDS.evidenceAlphaV1}/binary`);
      await expect(caseFileViewPage.mediaViewerContainer).toBeVisible();
    });

    await test.step('Verify media viewer content', async () => {
      expect(await caseFileViewPage.mediaViewerContainer.textContent()).toContain('Case File View - Document Delivery Fixture');
    });
  });

  test('sort options reorder documents as expected', async ({ caseDetailsPage, caseFileViewPage, page }) => {
    await test.step('Set up case file and binary document mocks', async () => {
      await applySessionCookies(page, fileViewOnUser);
      await setupCaseFileViewMockRoutes(page, caseId);
      await setupCaseFileViewDocumentBinaryMockRoutes(page);
    });

    await test.step('Open the Case File View tab', async () => {
      await page.goto(`/cases/case-details/PRIVATELAW/PRLAPPS/${caseId}`);
      await caseDetailsPage.selectCaseDetailsTab('Case File View');
      await caseFileViewPage.waitForReady();
      await expect(caseFileViewPage.documentHeader).toContainText('Documents (6)');
      await expect(caseFileViewPage.sortButton).toBeVisible();
    });

    await test.step('Show all sort options', async () => {
      await caseFileViewPage.openSortMenu();
      await expect(caseFileViewPage.sortAscendingOption).toBeVisible();
      await expect(caseFileViewPage.sortDescendingOption).toBeVisible();
      await expect(caseFileViewPage.sortRecentFirstOption).toBeVisible();
      await expect(caseFileViewPage.sortOldestFirstOption).toBeVisible();
    });

    await test.step('Sort evidence documents A to Z', async () => {
      await caseFileViewPage.sortByAscending();
      await expect
        .poll(() => caseFileViewPage.getVisibleFileNamesUnderFolder('Evidence'))
        .toEqual(['Alpha evidence.pdf', 'Middle evidence.pdf', 'Zeta evidence.pdf']);
    });

    await test.step('Sort evidence documents Z to A', async () => {
      await caseFileViewPage.sortByDescending();
      await expect
        .poll(() => caseFileViewPage.getVisibleFileNamesUnderFolder('Evidence'))
        .toEqual(['Zeta evidence.pdf', 'Middle evidence.pdf', 'Alpha evidence.pdf']);
    });

    await test.step('Sort evidence documents by most recent first', async () => {
      await caseFileViewPage.sortByRecentFirst();
      await expect
        .poll(() => caseFileViewPage.getVisibleFileNamesUnderFolder('Evidence'))
        .toEqual(['Zeta evidence.pdf', 'Middle evidence.pdf', 'Alpha evidence.pdf']);
    });

    await test.step('Sort evidence documents by oldest first', async () => {
      (await caseFileViewPage.getFolderNode('Orders.Approved orders')).click(); // expand another folder to ensure sort order is applied across the whole tree, not just currently expanded nodes
      await caseFileViewPage.sortByOldestFirst();
      await expect
        .poll(() => caseFileViewPage.getVisibleFileNamesUnderFolder('Evidence'))
        .toEqual(['Alpha evidence.pdf', 'Middle evidence.pdf', 'Zeta evidence.pdf']);
    });
  });
});

test.describe(`Case file view as ${fileViewOffUser}`, { tag: ['@integration', '@integration-case-file-view'] }, () => {
  test('V1 mode User still sees core case file view content', async ({ caseDetailsPage, caseFileViewPage, page }) => {
    await test.step('Set up V1 case file view mocks', async () => {
      await applySessionCookies(page, fileViewOffUser);
      await setupCaseFileViewMockRoutes(page, caseId);
      await setupCaseFileViewDocumentBinaryMockRoutes(page);
    });

    await test.step('Open the Case File View tab in V1 mode', async () => {
      await page.goto(`/cases/case-details/PRIVATELAW/PRLAPPS/${caseId}`);
      await caseDetailsPage.selectCaseDetailsTab('Case File View');
      await caseFileViewPage.waitForReady();
    });

    await test.step('Show the core case file view content', async () => {
      await expect(caseFileViewPage.documentHeader).toContainText('Documents (6)');
      const evidenceNode = await caseFileViewPage.getFolderNode('Evidence');
      await expect.soft(caseFileViewPage.getFileUploadStamp(evidenceNode, 'Alpha evidence.pdf')).toContainText('20 Oct 2023');
    });
  });
});
