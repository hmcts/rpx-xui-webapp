import type { BrowserContext, Page } from '@playwright/test';

type ViewerMetadata = {
  document_binary_url?: string;
  document_filename?: string;
  content_type?: string;
  case_id?: string;
  case_jurisdiction?: string;
};

export type MediaViewerLifecycleObservation = {
  initialMetadata: ViewerMetadata | null;
  handoffs: Array<{ sameOrigin: boolean; fromOpener: boolean; tokenMatches: boolean }>;
};

type ObservedWindow = Window & { __pwMediaViewerLifecycle?: MediaViewerLifecycleObservation };

export async function observeMediaViewerLifecycle(context: BrowserContext): Promise<void> {
  await context.addInitScript(() => {
    // Chrome can run a popup's init script before its about:blank URL becomes /media-viewer.
    const openingPopup = window.location.href === 'about:blank' && window.opener !== null;
    if (window.top !== window || (window.location.pathname !== '/media-viewer' && !openingPopup)) {
      return;
    }
    const stored = sessionStorage.getItem('media-viewer-info');
    const parsed = stored ? JSON.parse(stored) : null;
    const metadata = parsed && {
      document_binary_url: parsed.document_binary_url,
      document_filename: parsed.document_filename,
      content_type: parsed.content_type,
      case_id: parsed.case_id,
      case_jurisdiction: parsed.case_jurisdiction,
    };
    const observation: MediaViewerLifecycleObservation = {
      initialMetadata: metadata,
      handoffs: [],
    };
    (window as ObservedWindow).__pwMediaViewerLifecycle = observation;
    window.addEventListener('message', (event: MessageEvent) => {
      if (event.data?.type === 'MEDIA_VIEWER_HANDOFF') {
        observation.handoffs.push({
          sameOrigin: event.origin === window.location.origin,
          fromOpener: event.source === window.opener,
          tokenMatches: event.data.token === new URLSearchParams(window.location.search).get('mvToken'),
        });
      }
    });
  });
}

export async function readMediaViewerLifecycle(page: Page): Promise<{
  observation: MediaViewerLifecycleObservation | undefined;
  storedMetadata: ViewerMetadata | null;
}> {
  return page.evaluate(() => {
    const stored = sessionStorage.getItem('media-viewer-info');
    const parsed = stored ? JSON.parse(stored) : null;
    const metadata = parsed && {
      document_binary_url: parsed.document_binary_url,
      document_filename: parsed.document_filename,
      content_type: parsed.content_type,
      case_id: parsed.case_id,
      case_jurisdiction: parsed.case_jurisdiction,
    };
    return {
      observation: (window as ObservedWindow).__pwMediaViewerLifecycle,
      storedMetadata: metadata,
    };
  });
}
