import { expect, test } from '@playwright/test';
import { openMockMediaViewer, sendMockMediaViewerHandoff } from '../../helpers/mediaViewerHandoff.helper';
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
