import { expect, test } from '@playwright/test';
import {
  dispatchInvalidMediaViewerHandoff,
  openMockMediaViewer,
  sendMockMediaViewerHandoff,
} from '../../helpers/mediaViewerHandoff.helper';
import {
  MEDIA_VIEWER_HANDOFF_CASE_ID,
  MEDIA_VIEWER_HANDOFF_PAYLOAD,
  MEDIA_VIEWER_INVALID_HANDOFFS,
  MEDIA_VIEWER_REPLAY_PAYLOAD,
} from '../../mocks/mediaViewerHandoff.mock';
import { CASE_FILE_VIEW_DOC_IDS } from '../../mocks/caseFileView.mock';

test.describe('Media viewer mocked handoff guards', { tag: ['@integration', '@integration-case-file-view-mock-session'] }, () => {
  for (const fault of MEDIA_VIEWER_INVALID_HANDOFFS) {
    test(`rejects ${fault.name} before accepting a valid opener message`, async ({ page, baseURL }) => {
      if (!baseURL) throw new Error('Media viewer handoff requires baseURL');
      const { viewer, viewerPage, binaryRequests, routeClosure } = await openMockMediaViewer(page, baseURL);
      await expect(viewer).toHaveTitle('View Document');
      expect(await viewer.evaluate(() => sessionStorage.getItem('media-viewer-info'))).toBeNull();

      await dispatchInvalidMediaViewerHandoff(viewer, MEDIA_VIEWER_HANDOFF_PAYLOAD, fault);
      expect(await viewer.evaluate(() => sessionStorage.getItem('media-viewer-info'))).toBeNull();
      expect(binaryRequests).toEqual([]);
      await expect(viewerPage.standaloneMediaViewPanel).toHaveCount(0);

      await sendMockMediaViewerHandoff(page, MEDIA_VIEWER_HANDOFF_PAYLOAD);
      await expect(viewer).toHaveTitle('Alpha evidence.pdf - View Document');
      await expect(viewerPage.standaloneMediaViewPanel).toContainText('Case File View - Document Delivery Fixture');
      expect(await viewer.evaluate(() => sessionStorage.getItem('media-viewer-info'))).toBe(MEDIA_VIEWER_HANDOFF_PAYLOAD);
      const expectedBinary = new URL(
        `/documents/${CASE_FILE_VIEW_DOC_IDS.evidenceAlpha}/binary?caseId=${MEDIA_VIEWER_HANDOFF_CASE_ID}`,
        baseURL
      ).href;
      expect(binaryRequests).toHaveLength(1);
      expect(binaryRequests[0]).toBe(expectedBinary);
      expect(routeClosure.getUnexpectedRequests()).toEqual([]);
    });
  }

  test('replayed handoff cannot replace the accepted document', async ({ page, baseURL }) => {
    if (!baseURL) throw new Error('Media viewer handoff requires baseURL');
    const { viewer, viewerPage, binaryRequests, routeClosure } = await openMockMediaViewer(page, baseURL);
    await expect(viewer).toHaveTitle('View Document');
    await sendMockMediaViewerHandoff(page, MEDIA_VIEWER_HANDOFF_PAYLOAD);
    await expect(viewerPage.standaloneMediaViewPanel).toContainText('Case File View - Document Delivery Fixture');

    await dispatchInvalidMediaViewerHandoff(viewer, MEDIA_VIEWER_REPLAY_PAYLOAD, {});
    expect(await viewer.evaluate(() => sessionStorage.getItem('media-viewer-info'))).toBe(MEDIA_VIEWER_HANDOFF_PAYLOAD);
    await expect(viewer).toHaveTitle('Alpha evidence.pdf - View Document');
    const expectedBinary = new URL(
      `/documents/${CASE_FILE_VIEW_DOC_IDS.evidenceAlpha}/binary?caseId=${MEDIA_VIEWER_HANDOFF_CASE_ID}`,
      baseURL
    ).href;
    expect(binaryRequests).toHaveLength(1);
    expect(binaryRequests[0]).toBe(expectedBinary);
    expect(routeClosure.getUnexpectedRequests()).toEqual([]);
  });
});
