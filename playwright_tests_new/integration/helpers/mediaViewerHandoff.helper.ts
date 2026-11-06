import type { Page } from '@playwright/test';
import { CaseDetailsPage } from '../../E2E/page-objects/pages/exui/caseDetails.po';
import { CaseFileViewPage } from '../../E2E/page-objects/pages/exui/caseFileView.po';
import { setupCaseFileViewMockSession } from './caseFileViewMockSession.helper';
import { setupCaseFileViewDocumentBinaryMockRoutes } from './caseFileViewMockRoutes.helper';
import {
  MEDIA_VIEWER_ANNOTATION_RESPONSES,
  MEDIA_VIEWER_HANDOFF_CASE_ID,
  MEDIA_VIEWER_HANDOFF_TOKEN,
  MEDIA_VIEWER_OPENER_HTML,
} from '../mocks/mediaViewerHandoff.mock';

export async function setupMediaViewerHandoffAnnotationRoutes(viewer: Page, baseURL: string) {
  for (const response of MEDIA_VIEWER_ANNOTATION_RESPONSES) {
    await viewer.route(new URL(response.pathname, baseURL).href, async (route) => {
      if (route.request().method() !== 'GET') {
        await route.fallback();
        return;
      }
      await route.fulfill({ status: 200, json: response.body });
    });
  }
}

export async function openMockMediaViewer(opener: Page, baseURL: string) {
  const openerUrl = new URL('/exui-4461-handoff-harness', baseURL).href;
  await opener.route(openerUrl, (route) =>
    route.fulfill({
      contentType: 'text/html',
      headers: { 'Cross-Origin-Opener-Policy': 'same-origin' },
      body: MEDIA_VIEWER_OPENER_HTML,
    })
  );
  await opener.goto(openerUrl);
  const [viewer] = await Promise.all([
    opener.waitForEvent('popup'),
    opener.getByRole('button', { name: 'Open mocked viewer', exact: true }).click(),
  ]);
  const routeClosure = await setupCaseFileViewMockSession(viewer, MEDIA_VIEWER_HANDOFF_CASE_ID, baseURL);
  await setupMediaViewerHandoffAnnotationRoutes(viewer, baseURL);
  const binaryRequests: string[] = [];
  await setupCaseFileViewDocumentBinaryMockRoutes(viewer, (url) => binaryRequests.push(url));
  await viewer.goto(new URL(`/media-viewer?mvToken=${MEDIA_VIEWER_HANDOFF_TOKEN}`, baseURL).href);
  return { viewer, viewerPage: new CaseFileViewPage(viewer), binaryRequests, routeClosure };
}

export async function sendMockMediaViewerHandoff(opener: Page, payload: string, token = MEDIA_VIEWER_HANDOFF_TOKEN) {
  await opener.evaluate(
    ({ payload, token }) => {
      const viewer = (window as Window & { viewer?: Window }).viewer;
      if (!viewer) throw new Error('Mock opener has no viewer window');
      viewer.postMessage({ type: 'MEDIA_VIEWER_HANDOFF', token, payload }, window.location.origin);
    },
    { payload, token }
  );
}

export async function dispatchInvalidMediaViewerHandoff(
  viewer: Page,
  payload: string,
  fault: { origin?: string; source?: string; token?: string; payload?: string }
) {
  await viewer.evaluate(
    ({ payload, fault, token }) => {
      // Synthetic inputs isolate the real component's message guard; these are not real cross-origin journeys.
      window.dispatchEvent(
        new MessageEvent('message', {
          origin: fault.origin ?? window.location.origin,
          source: fault.source === 'self' ? window : window.opener,
          data: { type: 'MEDIA_VIEWER_HANDOFF', token: fault.token ?? token, payload: fault.payload ?? payload },
        })
      );
    },
    { payload, fault, token: MEDIA_VIEWER_HANDOFF_TOKEN }
  );
}

export const MEDIA_VIEWER_BOOTSTRAP_DELAY_MS = 12_000;

export async function openCaseFileViewerWithDelayedBootstrap(opener: Page, baseURL: string) {
  const openerRouteClosure = await setupCaseFileViewMockSession(opener, MEDIA_VIEWER_HANDOFF_CASE_ID, baseURL);
  const caseDetails = new CaseDetailsPage(opener);
  const caseFileView = new CaseFileViewPage(opener);
  await caseDetails.openCaseDetails('PRIVATELAW', 'PRLAPPS', MEDIA_VIEWER_HANDOFF_CASE_ID);
  await caseDetails.selectCaseDetailsTab('Case File View');
  await caseFileView.waitForReady();
  const folder = await caseFileView.getFolderNode('Evidence');
  const documentRow = folder.locator('cdk-nested-tree-node').filter({
    has: opener.getByRole('button', { name: 'Alpha evidence.pdf', exact: true }),
  });
  await documentRow.getByRole('button', { name: 'More document options', exact: true }).click();

  let delayed = false;
  let bootstrapDelayMs = 0;
  await opener.context().route(/\/main[-.][^/]+\.js(?:\?.*)?$/, async (route) => {
    if (route.request().frame().page() === opener || delayed) {
      await route.fallback();
      return;
    }
    delayed = true;
    const started = Date.now();
    // Hold the real popup beyond the toolkit sender's 100 x 100 ms lifetime.
    await new Promise((resolve) => setTimeout(resolve, MEDIA_VIEWER_BOOTSTRAP_DELAY_MS));
    bootstrapDelayMs = Date.now() - started;
    await route.fallback();
  });
  const [viewer] = await Promise.all([
    opener.waitForEvent('popup'),
    opener.getByText('Open in a new tab', { exact: true }).click(),
  ]);
  const routeClosure = await setupCaseFileViewMockSession(viewer, MEDIA_VIEWER_HANDOFF_CASE_ID, baseURL);
  await setupMediaViewerHandoffAnnotationRoutes(viewer, baseURL);
  const binaryRequests: string[] = [];
  await setupCaseFileViewDocumentBinaryMockRoutes(viewer, (url) => binaryRequests.push(url));
  return {
    viewer,
    viewerPage: new CaseFileViewPage(viewer),
    binaryRequests,
    routeClosure,
    openerRouteClosure,
    getBootstrapDelayMs: () => bootstrapDelayMs,
  };
}
