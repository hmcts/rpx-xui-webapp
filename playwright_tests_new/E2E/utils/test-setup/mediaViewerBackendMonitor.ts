import { Page, Response } from '@playwright/test';

export const MEDIA_VIEWER_DOCUMENT_BINARY_ROUTE_PATTERN = /\/documents(?:v2)?\/[^/]+\/binary$/;

const DOCUMENT_BINARY_WAIT_TIMEOUT_MS = 20_000;
const CRITICAL_BACKEND_ROUTE_PATTERNS = [
  MEDIA_VIEWER_DOCUMENT_BINARY_ROUTE_PATTERN,
  /\/data\/internal\/cases\/[^/]+$/,
  /\/aggregated\/caseworkers\/[^/]+\/jurisdictions(?:\/|$)/,
];

export class MediaViewerBackendMonitor {
  private readonly documentBinaryUrls: string[] = [];
  private readonly blockingFailures: string[] = [];
  private readonly failureWaiters: Array<(failure: string) => void> = [];

  readonly onResponse = (response: Response): void => {
    const pathname = new URL(response.url()).pathname;
    const isDocumentBinaryResponse = MEDIA_VIEWER_DOCUMENT_BINARY_ROUTE_PATTERN.test(pathname);

    if (isDocumentBinaryResponse && response.ok()) {
      this.documentBinaryUrls.push(response.url());
    }

    if (response.status() < 500 || response.request().method() !== 'GET') {
      return;
    }

    if (!CRITICAL_BACKEND_ROUTE_PATTERNS.some((pattern) => pattern.test(pathname))) {
      return;
    }

    const failure = `${response.status()} ${response.url()}`;
    if (!this.blockingFailures.includes(failure)) {
      this.blockingFailures.push(failure);
      this.failureWaiters.splice(0).forEach((resolve) => resolve(failure));
    }
  };

  get lastDocumentBinaryUrl(): string {
    return this.documentBinaryUrls.at(-1) ?? '';
  }

  failIfCriticalBackendFailure(stage: string): void {
    if (this.blockingFailures.length === 0) {
      return;
    }

    throw new Error(
      `Media Viewer ${stage} hit a downstream 5xx before the document could be opened: ${this.blockingFailures[0]}`
    );
  }

  async waitForDocumentBinaryResponse(page: Page): Promise<void> {
    if (this.documentBinaryUrls.length > 0) {
      return;
    }

    await this.failFastOnCriticalBackendFailure(
      'load',
      page
        .waitForResponse(
          (response) =>
            response.request().method() === 'GET' &&
            MEDIA_VIEWER_DOCUMENT_BINARY_ROUTE_PATTERN.test(new URL(response.url()).pathname) &&
            response.ok(),
          { timeout: DOCUMENT_BINARY_WAIT_TIMEOUT_MS }
        )
        .then((response) => {
          this.onResponse(response);
        })
        .catch((error) => {
          throw new Error(
            `Media Viewer did not request the uploaded document binary within ${DOCUMENT_BINARY_WAIT_TIMEOUT_MS}ms. ` +
              `Observed blocking failures: ${this.blockingFailures.join(' | ') || 'none'}. ` +
              `Last wait error: ${error instanceof Error ? error.message : String(error)}`
          );
        })
    );
  }

  async failFastOnCriticalBackendFailure<T>(stage: string, action: Promise<T>): Promise<T> {
    this.failIfCriticalBackendFailure(stage);

    let resolveFailure: ((failure: string) => void) | undefined;
    const failurePromise = new Promise<never>((_, reject) => {
      resolveFailure = (failure: string): void => {
        reject(new Error(`Media Viewer ${stage} hit a downstream 5xx before the document could be opened: ${failure}`));
      };
      this.failureWaiters.push(resolveFailure);
    });

    try {
      return await Promise.race([action, failurePromise]);
    } finally {
      if (resolveFailure) {
        const waiterIndex = this.failureWaiters.indexOf(resolveFailure);
        if (waiterIndex >= 0) {
          this.failureWaiters.splice(waiterIndex, 1);
        }
      }
    }
  }
}
