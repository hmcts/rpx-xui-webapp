import type { BrowserContext, Page, Request, Response } from '@playwright/test';

export const MEDIA_VIEWER_DOCUMENT_BINARY_ROUTE_PATTERN = /^\/(documents|documentsv2)\/([^/]+)\/binary\/?$/;

export type DocumentBinaryAction = {
  documentId: string;
  id: number;
};

export type DocumentBinaryObservation = {
  url: string;
  pathname: string;
  search: string;
  gateway: 'legacy' | 'v2';
  documentId: string;
  status: number;
  contentType: string;
  referer: string;
};

export class MediaViewerBackendMonitor {
  private actionId = 0;
  private readonly requestActions = new WeakMap<Request, number>();
  private readonly responses: Array<{ actionId: number; response: Response; observation: DocumentBinaryObservation }> = [];

  constructor(private readonly context: BrowserContext) {
    context.on('request', this.onRequest);
    context.on('response', this.onResponse);
  }

  readonly onRequest = (request: Request): void => {
    this.requestActions.set(request, this.actionId);
  };

  readonly onResponse = (response: Response): void => {
    const request = response.request();
    const actionId = this.requestActions.get(request);
    const url = new URL(response.url());
    const match = MEDIA_VIEWER_DOCUMENT_BINARY_ROUTE_PATTERN.exec(url.pathname);
    if (!actionId || request.method() !== 'GET' || !match) {
      return;
    }

    const refererHeader = request.headers()['referer'];
    const referer = refererHeader ? new URL(refererHeader) : undefined;
    referer?.searchParams.delete('mvToken');

    this.responses.push({
      actionId,
      response,
      observation: {
        url: url.href,
        pathname: url.pathname,
        search: url.search,
        gateway: match[1] === 'documents' ? 'legacy' : 'v2',
        documentId: decodeURIComponent(match[2]),
        status: response.status(),
        contentType: response.headers()['content-type'] ?? '',
        referer: referer?.href ?? '',
      },
    });
  };

  beginAction(documentId: string): DocumentBinaryAction {
    return { documentId, id: ++this.actionId };
  }

  observationsFor(action: DocumentBinaryAction, page: Page): DocumentBinaryObservation[] {
    return this.responses
      .filter(
        (entry) =>
          entry.actionId === action.id &&
          entry.observation.documentId === action.documentId &&
          entry.response.frame().page() === page
      )
      .map((entry) => entry.observation);
  }

  dispose(): void {
    this.context.off('request', this.onRequest);
    this.context.off('response', this.onResponse);
  }
}
