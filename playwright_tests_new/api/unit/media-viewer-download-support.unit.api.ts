import { runInNewContext } from 'node:vm';
import { expect, test } from '@playwright/test';
import type { BrowserContext, Page } from '@playwright/test';

import { CaseFileViewPage } from '../../E2E/page-objects/pages/exui/caseFileView.po';
import type { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po';
import type { CreateCasePage } from '../../E2E/page-objects/pages/exui/createCase.po';
import { createLegacyEmploymentDocument } from '../../E2E/utils/test-setup/employmentDocumentFixture';
import { attachEmploymentDraftDocumentViaApi } from '../../E2E/utils/test-setup/journeys/employmentJourneys';
import {
  observeMediaViewerLifecycle,
  readMediaViewerLifecycle,
} from '../../E2E/utils/test-setup/mediaViewerLifecycleObservation';

const document = {
  document_url: 'https://dm.example/documents/document-1',
  document_binary_url: 'https://dm.example/documents/document-1/binary',
  document_filename: 'fixture.pdf',
  document_hash: 'genuine-upload-hash',
};

function employmentFixtureHarness(body: unknown, status = 200) {
  const calls: Array<{ operation: string; value: unknown }> = [];
  const page = {
    request: {
      get: async (url: string) => {
        calls.push({ operation: 'readback', value: url });
        return { status: () => status, json: async () => body };
      },
    },
  } as unknown as Page;
  const options = {
    page,
    createCasePage: {} as CreateCasePage,
    caseDetailsPage: {
      reopenCaseDetails: async (url: string) => calls.push({ operation: 'reopen', value: url }),
    } as unknown as CaseDetailsPage,
    fileName: document.document_filename,
    mimeType: 'application/pdf',
    content: Buffer.from('%PDF-1.4 synthetic'),
  };
  const dependencies = {
    setupCaseForJourney: async (value: unknown) => {
      calls.push({ operation: 'create', value });
      return { caseNumber: '1234567890123456', mode: 'api' as const };
    },
    uploadLegacyDocument: async (value: unknown) => {
      calls.push({ operation: 'upload', value });
      return document;
    },
    attachEmploymentDraftDocumentViaApi: async (value: unknown) => {
      calls.push({ operation: 'attach', value });
    },
  };
  return { options, dependencies, calls };
}

function eventPage({ triggerStatus = 200, submitStatus = 201, token = 'event-token' } = {}) {
  const requests: Array<{ method: string; url: string; options: unknown }> = [];
  const response = (status: number, json: unknown) => ({
    ok: () => status >= 200 && status < 300,
    status: () => status,
    json: async () => json,
    text: async () => 'synthetic response',
  });
  const page = {
    request: {
      get: async (url: string, options: unknown) => {
        requests.push({ method: 'GET', url, options });
        return response(triggerStatus, { event_token: token });
      },
      post: async (url: string, options: unknown) => {
        requests.push({ method: 'POST', url, options });
        return response(submitStatus, {});
      },
    },
  } as unknown as Page;
  return { page, requests };
}

test.describe('Media Viewer download support', { tag: '@svc-internal' }, () => {
  for (const visible of [true, false]) {
    test(`downloads through the ${visible ? 'visible toolbar' : 'overflow menu'} without bypassing actionability`, async () => {
      const actions: string[] = [];
      const viewer = {
        visibleDownloadButton: {
          isVisible: async () => visible,
          click: async () => actions.push('download'),
        },
        visibleMoreOptionsButton: { click: async () => actions.push('more options') },
      } as unknown as CaseFileViewPage;
      await CaseFileViewPage.prototype.downloadDocument.call(viewer);
      expect(actions).toEqual(visible ? ['download'] : ['more options', 'download']);
    });
  }

  test('attaches genuine uploaded metadata with the existing Employment event and categories', async () => {
    const { page, requests } = eventPage();
    await attachEmploymentDraftDocumentViaApi({ page, caseNumber: '1234567890123456', uploadedDocument: document });
    expect(requests.map(({ method, url }) => ({ method, url }))).toEqual([
      { method: 'GET', url: 'data/internal/cases/1234567890123456/event-triggers/uploadDocument?ignore-warning=false' },
      { method: 'POST', url: 'data/cases/1234567890123456/events' },
    ]);
    expect(requests[1].options).toMatchObject({
      data: {
        data: {
          documentCollection: [
            {
              id: expect.any(String),
              value: { uploadedDocument: document, topLevelDocuments: 'Misc', miscDocuments: 'Other' },
            },
          ],
        },
        event: { id: 'uploadDocument' },
        event_token: 'event-token',
        ignore_warning: false,
      },
    });
  });

  test('provisions the existing Employment profile and verifies saved collection membership before reopening', async () => {
    const savedDocument = {
      document_url: document.document_url,
      document_binary_url: document.document_binary_url,
      document_filename: document.document_filename,
    };
    const { options, dependencies, calls } = employmentFixtureHarness({
      case_id: '1234567890123456',
      tabs: [{ fields: [{ id: 'documentCollection', value: [{ value: { uploadedDocument: savedDocument } }] }] }],
    });
    const fixture = await createLegacyEmploymentDocument(options, dependencies);
    expect(calls.map(({ operation }) => operation)).toEqual(['create', 'upload', 'attach', 'readback', 'reopen']);
    expect(calls[0].value).toMatchObject({
      jurisdiction: 'EMPLOYMENT',
      caseType: 'ET_EnglandWales',
      apiEventId: 'initiateCase',
      mode: 'api-required',
    });
    expect(calls[2].value).toMatchObject({ caseNumber: '1234567890123456', uploadedDocument: document });
    expect(calls[4].value).toBe('/cases/case-details/EMPLOYMENT/ET_EnglandWales/1234567890123456');
    expect(fixture).toMatchObject({
      caseId: '1234567890123456',
      jurisdictionId: 'EMPLOYMENT',
      caseTypeId: 'ET_EnglandWales',
      gateway: 'legacy',
      savedDocument,
      binaryPath: '/documents/document-1/binary?caseId=1234567890123456',
      expectedContent: options.content,
    });
  });

  test('fails Employment fixture setup when readback cannot prove the selected document membership', async () => {
    for (const collection of [
      undefined,
      [],
      [{ value: { uploadedDocument: { ...document, document_filename: 'other.pdf' } } }],
      [{ value: { uploadedDocument: { ...document, document_binary_url: 'https://dm.example/documents/other/binary' } } }],
    ]) {
      const { options, dependencies, calls } = employmentFixtureHarness({
        case_id: '1234567890123456',
        tabs: [{ fields: [{ id: 'documentCollection', value: collection }] }],
      });
      await expect(createLegacyEmploymentDocument(options, dependencies)).rejects.toThrow('documentCollection membership');
      expect(calls.some(({ operation }) => operation === 'reopen')).toBe(false);
    }
  });

  test('rejects unsuccessful Employment readback and empty source bytes', async () => {
    const failed = employmentFixtureHarness({}, 500);
    await expect(createLegacyEmploymentDocument(failed.options, failed.dependencies)).rejects.toThrow('HTTP 500');
    const empty = employmentFixtureHarness({});
    await expect(
      createLegacyEmploymentDocument({ ...empty.options, content: Buffer.alloc(0) }, empty.dependencies)
    ).rejects.toThrow('content must not be empty');
    expect(empty.calls).toEqual([]);
  });

  test('keeps explicitly selected Employment categories', async () => {
    const { page, requests } = eventPage();
    await attachEmploymentDraftDocumentViaApi({
      page,
      caseNumber: '1234567890123456',
      uploadedDocument: document,
      topLevelDocuments: 'Other supported category',
      miscDocuments: 'Selected subcategory',
    });
    expect(requests[1].options).toMatchObject({
      data: {
        data: {
          documentCollection: [
            { value: { topLevelDocuments: 'Other supported category', miscDocuments: 'Selected subcategory' } },
          ],
        },
      },
    });
  });

  for (const fault of [
    { options: { triggerStatus: 403 }, message: /fetch event trigger.*403/, requests: 1 },
    { options: { token: '' }, message: /did not include event_token/, requests: 1 },
    { options: { submitStatus: 500 }, message: /submit failed.*500/, requests: 2 },
  ]) {
    test(`preserves Employment attachment failure: ${fault.message.source}`, async () => {
      const { page, requests } = eventPage(fault.options);
      await expect(
        attachEmploymentDraftDocumentViaApi({ page, caseNumber: '1234567890123456', uploadedDocument: document })
      ).rejects.toThrow(fault.message);
      expect(requests).toHaveLength(fault.requests);
    });
  }

  test('observes fresh handoff and reload storage without writing application metadata', async () => {
    for (const initialUrl of ['https://xui.example/media-viewer?mvToken=synthetic-token', 'about:blank']) {
      let stored: string | null = null;
      let messageListener: ((event: unknown) => void) | undefined;
      const window = {
        location: new URL(initialUrl),
        opener: {} as object | null,
        top: undefined as unknown,
        addEventListener: (_event: string, listener: (event: unknown) => void) => (messageListener = listener),
      };
      window.top = window;
      const sandbox = {
        window,
        URLSearchParams,
        sessionStorage: { getItem: (key: string) => (key === 'media-viewer-info' ? stored : null) },
      };
      const context = {
        addInitScript: async (callback: () => void) => runInNewContext(`(${callback.toString()})()`, sandbox),
      } as unknown as BrowserContext;
      const page = {
        evaluate: async (callback: () => unknown) => runInNewContext(`(${callback.toString()})()`, sandbox),
      } as unknown as Page;

      await observeMediaViewerLifecycle(context);
      expect((await readMediaViewerLifecycle(page)).observation?.initialMetadata).toBeNull();
      window.location = new URL('https://xui.example/media-viewer?mvToken=synthetic-token');
      messageListener?.({
        origin: 'https://xui.example',
        source: window.opener,
        data: { type: 'MEDIA_VIEWER_HANDOFF', token: 'synthetic-token' },
      });
      expect((await readMediaViewerLifecycle(page)).observation?.handoffs).toEqual([
        { sameOrigin: true, fromOpener: true, tokenMatches: true },
      ]);
      expect(stored).toBeNull();

      window.opener = null;
      const metadata = { document_filename: 'fixture.pdf', case_id: '1234567890123456' };
      stored = JSON.stringify({ ...metadata, token: 'must-not-be-returned' });
      await observeMediaViewerLifecycle(context);
      const reload = await readMediaViewerLifecycle(page);
      expect(reload.observation?.initialMetadata).toEqual(metadata);
      expect(reload.observation?.handoffs).toEqual([]);
      expect(reload.storedMetadata).toEqual(metadata);
    }
  });

  test('does not observe unrelated pages, openerless blank pages or child frames', async () => {
    for (const state of [
      { url: 'https://xui.example/cases', opener: {} },
      { url: 'about:blank', opener: null },
      { url: 'https://xui.example/media-viewer', opener: {}, childFrame: true },
    ]) {
      const window = {
        location: new URL(state.url),
        opener: state.opener,
        top: undefined as unknown,
        __pwMediaViewerLifecycle: undefined,
        addEventListener: () => {
          throw new Error('An unrelated page must not install the observer.');
        },
      };
      window.top = state.childFrame ? {} : window;
      const sandbox = {
        window,
        sessionStorage: {
          getItem: () => {
            throw new Error('An unrelated page must not read session storage.');
          },
        },
      };
      const context = {
        addInitScript: async (callback: () => void) => runInNewContext(`(${callback.toString()})()`, sandbox),
      } as unknown as BrowserContext;
      await observeMediaViewerLifecycle(context);
      expect(window.__pwMediaViewerLifecycle).toBeUndefined();
    }
  });
});
