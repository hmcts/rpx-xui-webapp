import { ExuiCaseDetailsComponent, ExuiCaseListComponent, ExuiSpinnerComponent, createLogger } from '@hmcts/playwright-common';
import { Page } from '@playwright/test';
import { ExuiFooterComponent, ExuiHeaderComponent } from './components/index.js';

const logger = createLogger({ serviceName: 'api-monitor', format: 'pretty' });

type BenignApiErrorRule = {
  method: string;
  status: number;
  urlPattern: RegExp;
};

const benignApiErrorRules: BenignApiErrorRule[] = [
  { method: 'GET', status: 403, urlPattern: /\/api\/organisation$/ },
  { method: 'GET', status: 400, urlPattern: /\/data\/internal\/cases\/\d+$/ },
];

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
  readonly exuiFooter = new ExuiFooterComponent(this.page);
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
        const method = request.method();
        const sanitizedUrl = this.sanitizeUrl(url);

        const call: ApiCall = {
          url: sanitizedUrl,
          method,
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
            method,
          });
        } else if (duration !== -1 && duration > 5000) {
          logger.warn('SLOW_API_RESPONSE', {
            url: call.url,
            duration: `${duration}ms`,
            status,
            method,
          });
        } else if (status >= 400 && status < 500 && !this.isKnownBenignApiError(sanitizedUrl, method, status)) {
          // DO NOT log response body - may contain PII or sensitive error details
          call.error = `HTTP ${status} - Client Error`;
          logger.warn('CLIENT_ERROR', {
            url: call.url,
            status,
            method,
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

  private isKnownBenignApiError(url: string, method: string, status: number): boolean {
    const requestMethod = method.toUpperCase();
    return benignApiErrorRules.some((rule) => {
      return rule.status === status && rule.method === requestMethod && rule.urlPattern.test(url);
    });
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

  protected getApiTimingStats(sampleSize = 50): { count: number; avg: number; p95: number } {
    const durations = this.apiCalls
      .slice(-sampleSize)
      .map((c) => c.duration)
      .filter((d) => Number.isFinite(d) && d > 0)
      .sort((a, b) => a - b);
    const count = durations.length;
    if (count === 0) {
      return { count: 0, avg: 0, p95: 0 };
    }
    const avg = Math.round(durations.reduce((sum, d) => sum + d, 0) / count);
    const p95Index = Math.floor(0.95 * (count - 1));
    const p95 = durations[p95Index] ?? durations[count - 1];
    return { count, avg, p95 };
  }

  protected getRecommendedTimeoutMs(
    options: {
      min?: number;
      max?: number;
      multiplier?: number;
      fallback?: number;
      sampleSize?: number;
    } = {}
  ): number {
    const apiTimingConfig = {
      min: 15000,
      max: 120000,
      multiplier: 4,
      fallback: 120000,
      sampleSize: 50,
    };
    const {
      min = apiTimingConfig.min,
      max = apiTimingConfig.max,
      multiplier = apiTimingConfig.multiplier,
      fallback = apiTimingConfig.fallback,
      sampleSize = apiTimingConfig.sampleSize,
    } = options;
    const stats = this.getApiTimingStats(sampleSize);
    if (stats.count === 0) {
      return fallback;
    }
    const baseline = stats.avg;
    const computed = Math.ceil(baseline * multiplier);
    return Math.min(max, Math.max(min, computed));
  }
}
