import { expect, test } from '@playwright/test';
import {
  MEDIA_VIEWER_BOOTSTRAP_DELAY_MS,
  openCaseFileViewerWithDelayedBootstrap,
  openMockMediaViewer,
  sendMockMediaViewerHandoff,
} from '../../helpers/mediaViewerHandoff.helper';
import { MEDIA_VIEWER_HANDOFF_CASE_ID, MEDIA_VIEWER_HANDOFF_PAYLOAD } from '../../mocks/mediaViewerHandoff.mock';
import { CASE_FILE_VIEW_DOC_IDS } from '../../mocks/caseFileView.mock';

test.describe(
  'Media viewer mocked handoff lifecycle',
  { tag: ['@integration', '@integration-case-file-view-mock-session'] },
  () => {
    test('stores a fresh opener handoff and reloads the stored document', async ({ page, baseURL }) => {
      if (!baseURL) throw new Error('Media viewer handoff requires baseURL');
      const { viewer, viewerPage, binaryRequests, routeClosure } = await openMockMediaViewer(page, baseURL);
      await expect(viewer).toHaveTitle('View Document');
      expect(await viewer.evaluate(() => sessionStorage.getItem('media-viewer-info'))).toBeNull();
      expect(binaryRequests).toEqual([]);

      await sendMockMediaViewerHandoff(page, MEDIA_VIEWER_HANDOFF_PAYLOAD);
      await expect(viewer).toHaveTitle('Alpha evidence.pdf - View Document');
      await expect(viewerPage.standaloneMediaViewPanel).toContainText('Case File View - Document Delivery Fixture');
      expect(await viewer.evaluate(() => sessionStorage.getItem('media-viewer-info'))).toBe(MEDIA_VIEWER_HANDOFF_PAYLOAD);
      expect(new URL(viewer.url()).search).toBe('');
      const expectedBinary = new URL(
        `/documents/${CASE_FILE_VIEW_DOC_IDS.evidenceAlpha}/binary?caseId=${MEDIA_VIEWER_HANDOFF_CASE_ID}`,
        baseURL
      ).href;
      expect(binaryRequests).toHaveLength(1);
      expect(binaryRequests[0]).toBe(expectedBinary);

      binaryRequests.length = 0;
      await viewer.reload();
      await expect(viewer).toHaveTitle('Alpha evidence.pdf - View Document');
      await expect(viewerPage.standaloneMediaViewPanel).toContainText('Case File View - Document Delivery Fixture');
      expect(binaryRequests).toHaveLength(1);
      expect(binaryRequests[0]).toBe(expectedBinary);
      expect(await viewer.evaluate(() => sessionStorage.getItem('media-viewer-info'))).toBe(MEDIA_VIEWER_HANDOFF_PAYLOAD);
      expect(routeClosure.getUnexpectedRequests()).toEqual([]);
    });
  }
);

test.describe('Media viewer real toolkit handoff', { tag: ['@integration', '@integration-case-file-view-mock-session'] }, () => {
  test('retains the selected document when popup bootstrap exceeds the sender lifetime', async ({ page, baseURL }, testInfo) => {
    if (!baseURL) throw new Error('Media viewer handoff requires baseURL');
    const { viewer, viewerPage, binaryRequests, routeClosure, openerRouteClosure, getBootstrapDelayMs } =
      await openCaseFileViewerWithDelayedBootstrap(page, baseURL);
    await expect(viewerPage.standaloneMediaViewerContainer).toBeAttached();
    expect(getBootstrapDelayMs()).toBeGreaterThanOrEqual(MEDIA_VIEWER_BOOTSTRAP_DELAY_MS);
    await testInfo.attach('delayed-bootstrap', {
      body: JSON.stringify({
        bootstrapDelayMs: getBootstrapDelayMs(),
        hasPendingToken: new URL(viewer.url()).searchParams.has('mvToken'),
        hasStoredDocument: await viewer.evaluate(() => sessionStorage.getItem('media-viewer-info') !== null),
        openerDetached: await viewer.evaluate(() => window.opener === null),
      }),
      contentType: 'application/json',
    });
    await expect(viewer).toHaveTitle('Alpha evidence.pdf - View Document');
    await expect(viewerPage.standaloneMediaViewerContainer).toBeVisible();
    await expect(viewerPage.standaloneMediaViewPanel).toContainText('Case File View - Document Delivery Fixture');
    expect(new URL(viewer.url()).search).toBe('');
    const stored = await viewer.evaluate(() => JSON.parse(sessionStorage.getItem('media-viewer-info') ?? 'null'));
    expect(stored).toMatchObject({
      document_filename: 'Alpha evidence.pdf',
      case_id: MEDIA_VIEWER_HANDOFF_CASE_ID,
    });
    const expectedBinary = new URL(
      `/documents/${CASE_FILE_VIEW_DOC_IDS.evidenceAlpha}/binary?caseId=${MEDIA_VIEWER_HANDOFF_CASE_ID}`,
      baseURL
    ).href;
    expect(binaryRequests).toEqual([expectedBinary]);
    expect(openerRouteClosure.getUnexpectedRequests()).toEqual([]);
    expect(routeClosure.getUnexpectedRequests()).toEqual([]);
  });
});
