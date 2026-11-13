import type { Page } from '@playwright/test';
import { QUERY_MANAGEMENT_DOCUMENT } from '../mocks/queryManagement.mock';

export async function setupQueryDocumentUpload(page: Page): Promise<void> {
  await page.route('**/documentsv2', async (route) => {
    await route.fulfill({ json: { documents: [QUERY_MANAGEMENT_DOCUMENT] } });
  });
}

export async function observeQueryDocumentViewer(page: Page): Promise<unknown[]> {
  const handoffs: unknown[] = [];
  await page.context().exposeBinding('recordQueryDocumentHandoff', (_source, payload: string) => {
    handoffs.push(JSON.parse(payload));
  });
  await page.context().addInitScript(() => {
    window.addEventListener('message', (event) => {
      if (event.origin === window.location.origin && event.data?.type === 'MEDIA_VIEWER_HANDOFF') {
        void (window as unknown as { recordQueryDocumentHandoff: (payload: string) => Promise<void> }).recordQueryDocumentHandoff(
          event.data.payload
        );
      }
    });
  });
  return handoffs;
}
