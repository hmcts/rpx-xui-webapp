import { ExuiCaseDetailsComponent, ExuiCaseListComponent, ExuiSpinnerComponent, createLogger } from '@hmcts/playwright-common';
import { Page } from '@playwright/test';
import { ExuiHeaderComponent } from './components/index.js';

const logger = createLogger({ serviceName: 'api-monitor', format: 'pretty' });

interface ApiCall {
  url: string;
  method: string;
  status: number;
  duration: number;
  timestamp: string;
  error?: string;
}

// A base page inherited by pages & components
// can contain any additional config needed + instantiated page object
export abstract class Base {
  protected readonly logger = logger;
  readonly exuiCaseListComponent = new ExuiCaseListComponent(this.page);
  readonly exuiCaseDetailsComponent = new ExuiCaseDetailsComponent(this.page);
  readonly exuiHeader = new ExuiHeaderComponent(this.page);
  readonly exuiSpinnerComponent = new ExuiSpinnerComponent(this.page);
  private static readonly monitoredPages = new WeakSet<Page>();
  private apiCalls: ApiCall[] = [];
  private readonly monitoringEnabled = true;
  private readonly maxApiCallsTracked = 500; // Prevent memory leaks in long-running tests

  constructor(public readonly page: Page) {
    if (this.monitoringEnabled && !Base.monitoredPages.has(page)) {
      Base.monitoredPages.add(page);
      this.setupApiMonitoring();
    }
  }

  private setupApiMonitoring(): void {
    this.page.on('response', async (response) => {
      const request = response.request();
      const url = request.url();

      // Only track backend APIs (not static assets, fonts, images)
      if (this.isBackendApi(url)) {
        const timing = request.timing();
        const duration = timing.responseEnd;
        const status = response.status();

        const call: ApiCall = {
          url: this.sanitizeUrl(url),
          method: request.method(),
          status,
          duration,
          timestamp: new Date().toISOString(),
        };

        this.apiCalls.push(call);

        // Prevent memory leaks: cap at maxApiCallsTracked (FIFO - remove oldest)
        if (this.apiCalls.length > this.maxApiCallsTracked) {
          this.apiCalls.shift(); // Remove oldest call
        }

        // INSTANT FAILURE DIAGNOSIS
        if (status >= 500) {
          // DO NOT log response body - may contain PII, case data, or credentials
          call.error = `HTTP ${status} - Server Error`;
          logger.error('DOWNSTREAM_API_FAILURE', {
            url: call.url,
            status,
            duration: duration === -1 ? 'unknown' : `${duration}ms`,
            method: request.method(),
          });
        } else if (duration !== -1 && duration > 5000) {
          logger.warn('SLOW_API_RESPONSE', {
            url: call.url,
            duration: `${duration}ms`,
            status,
            method: request.method(),
          });
        } else if (status >= 400 && status < 500) {
          // DO NOT log response body - may contain PII or sensitive error details
          call.error = `HTTP ${status} - Client Error`;
          logger.warn('CLIENT_ERROR', {
            url: call.url,
            status,
            method: request.method(),
          });
        }
      }
    });
  }

  private isBackendApi(url: string): boolean {
    return (
      (url.includes('/api/') ||
        url.includes('/data/') ||
        url.includes('/auth/') ||
        url.includes('/workallocation/') ||
        url.includes('/aggregated/') ||
        url.includes('/caseworkers/')) &&
      !url.includes('.js') &&
      !url.includes('.css') &&
      !url.includes('.woff')
    );
  }

  private sanitizeUrl(url: string): string {
    // Remove query parameters to avoid logging sensitive data
    return url.split('?')[0];
  }

  public getApiCalls(): ApiCall[] {
    return [...this.apiCalls];
  }

  public clearApiCalls(): void {
    this.apiCalls = [];
  }

  public getApiCallsSummary(): string {
    const slow = this.apiCalls.filter((c) => c.duration > 5000);
    const errors = this.apiCalls.filter((c) => c.status >= 400);
    const serverErrors = errors.filter((c) => c.status >= 500);
    const clientErrors = errors.filter((c) => c.status >= 400 && c.status < 500);

    const totalDuration = this.apiCalls.reduce((sum, c) => sum + c.duration, 0);
    const avgDuration = this.apiCalls.length > 0 ? Math.round(totalDuration / this.apiCalls.length) : 0;

    let summary = `
API CALLS SUMMARY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Total calls: ${this.apiCalls.length}
• Server errors (5xx): ${serverErrors.length}
• Client errors (4xx): ${clientErrors.length}
• Slow responses (>5s): ${slow.length}
• Average response time: ${avgDuration}ms
`;

    if (serverErrors.length > 0) {
      summary += '\n SERVER ERRORS (5xx):\n';
      serverErrors.forEach((e) => {
        summary += `  • ${e.method} ${e.url}\n    └─ HTTP ${e.status} (${e.duration}ms)\n`;
        // DO NOT log error body - security/privacy risk
      });
    }

    if (clientErrors.length > 0) {
      summary += '\n  CLIENT ERRORS (4xx):\n';
      clientErrors.forEach((e) => {
        summary += `  • ${e.method} ${e.url}\n    └─ HTTP ${e.status} (${e.duration}ms)\n`;
      });
    }

    if (slow.length > 0) {
      summary += '\n  SLOW RESPONSES (>5s):\n';
      slow.forEach((s) => {
        summary += `  • ${s.method} ${s.url}\n    └─ ${s.duration}ms (HTTP ${s.status})\n`;
      });
    }

    if (errors.length === 0 && slow.length === 0) {
      summary += '\n All API calls successful and performant\n';
    }

    summary += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';

    return summary;
  }
}
