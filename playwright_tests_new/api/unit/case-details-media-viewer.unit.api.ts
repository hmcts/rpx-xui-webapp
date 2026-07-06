import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

import { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po.js';

function never<T>(): Promise<T> {
  return new Promise<T>(() => undefined);
}

function mediaViewerPage(): Page {
  return {
    waitForURL: async () => undefined,
    url: () => 'https://xui.example/media-viewer?document=1',
  } as unknown as Page;
}

test.describe('Case details Media Viewer helper', { tag: '@svc-internal' }, () => {
  test('returns same page when the document opens Media Viewer without a popup', async () => {
    const page = {
      waitForEvent: () => never<Page>(),
      waitForURL: async () => undefined,
      context: () => ({ pages: () => [] }),
      url: () => 'https://xui.example/media-viewer?document=1',
    } as unknown as Page;

    const openedPage = await CaseDetailsPage.prototype.openDocumentOneInMediaViewer.call({
      getRecommendedTimeoutMs: () => 1,
      openDocumentOne: async () => undefined,
      page,
    });

    expect(openedPage).toBe(page);
  });

  test('returns popup when the document opens Media Viewer in a new page', async () => {
    const popup = mediaViewerPage();
    const page = {
      waitForEvent: async () => popup,
      waitForURL: () => never<void>(),
      context: () => ({ pages: () => [] }),
      url: () => 'https://xui.example/cases/case-details/DIVORCE/xuiTestCaseType/1781862986135651#Tab%201',
    } as unknown as Page;

    const openedPage = await CaseDetailsPage.prototype.openDocumentOneInMediaViewer.call({
      getRecommendedTimeoutMs: () => 1,
      openDocumentOne: async () => undefined,
      page,
    });

    expect(openedPage).toBe(popup);
  });

  test('retries the document click once when Media Viewer does not open on the first attempt', async () => {
    const popup = mediaViewerPage();
    let attempt = 0;
    const page = {
      waitForEvent: async () => {
        if (attempt === 0) {
          throw new Error('no popup on first attempt');
        }
        return popup;
      },
      waitForURL: async () => {
        throw new Error('no same-page navigation');
      },
      context: () => ({ pages: () => [] }),
      url: () => 'https://xui.example/cases/case-details/DIVORCE/xuiTestCaseType/1781862986135651#Tab%201',
    } as unknown as Page;

    const openedPage = await CaseDetailsPage.prototype.openDocumentOneInMediaViewer.call({
      getRecommendedTimeoutMs: () => 1,
      openDocumentOne: async () => {
        attempt += 1;
      },
      page,
    });

    expect(openedPage).toBe(popup);
    expect(attempt).toBe(2);
  });

  test('fails clearly when selecting the document does not open Media Viewer', async () => {
    const page = {
      waitForEvent: async () => {
        throw new Error('no popup');
      },
      waitForURL: async () => {
        throw new Error('no navigation');
      },
      context: () => ({ pages: () => [] }),
      url: () => 'https://xui.example/cases/case-details/DIVORCE/xuiTestCaseType/1781862986135651#Tab%201',
    } as unknown as Page;

    await expect(
      CaseDetailsPage.prototype.openDocumentOneInMediaViewer.call({
        getRecommendedTimeoutMs: () => 1,
        openDocumentOne: async () => undefined,
        page,
      })
    ).rejects.toThrow(/Media Viewer did not open within 1ms after selecting Document 1 across 2 attempts/);
  });
});
