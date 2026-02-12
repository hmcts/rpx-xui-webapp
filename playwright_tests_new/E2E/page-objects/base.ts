import { ExuiCaseDetailsComponent, ExuiCaseListComponent, ExuiSpinnerComponent, createLogger } from '@hmcts/playwright-common';
import { Page } from '@playwright/test';
import { ExuiHeaderComponent } from './components/index.js';
import { clearApiTracking, ensureApiTracker, getApiTrackingSnapshot, type TrackedApiCall } from '../utils/api-tracker';

const logger = createLogger({ serviceName: 'api-monitor', format: 'pretty' });

// A base page inherited by pages & components
// can contain any additional config needed + instantiated page object
export abstract class Base {
  protected readonly logger = logger;
  readonly exuiCaseListComponent = new ExuiCaseListComponent(this.page);
  readonly exuiCaseDetailsComponent = new ExuiCaseDetailsComponent(this.page);
  readonly exuiHeader = new ExuiHeaderComponent(this.page);
  readonly exuiSpinnerComponent = new ExuiSpinnerComponent(this.page);

  constructor(public readonly page: Page) {
    ensureApiTracker(page);
  }

  public getApiCalls(): TrackedApiCall[] {
    return getApiTrackingSnapshot(this.page).apiCalls;
  }

  public clearApiCalls(): void {
    clearApiTracking(this.page);
  }

  public getApiCallsSummary(): string {
    const apiCalls = this.getApiCalls();
    const slow = apiCalls.filter((c) => c.duration > 5000);
    const errors = apiCalls.filter((c) => c.status >= 400);
    const serverErrors = errors.filter((c) => c.status >= 500);
    const clientErrors = errors.filter((c) => c.status >= 400 && c.status < 500);

    const totalDuration = apiCalls.reduce((sum, c) => sum + c.duration, 0);
    const avgDuration = apiCalls.length > 0 ? Math.round(totalDuration / apiCalls.length) : 0;

    let summary = `
API CALLS SUMMARY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Total calls: ${apiCalls.length}
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
    const durations = this.getApiCalls()
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
