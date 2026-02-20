import type { ApiLogEntry } from '@hmcts/playwright-common';

type StatusBreakdown = Record<string, number>;
type MethodBreakdown = Record<string, number>;

export interface SlowEndpointSummary {
  endpoint: string;
  method: string;
  count: number;
  averageDurationMs: number;
  p95DurationMs: number;
  maxDurationMs: number;
  statusBreakdown: StatusBreakdown;
}

export interface ApiPerformanceSummary {
  totalCalls: number;
  measuredCallCount: number;
  slowThresholdMs: number;
  slowCallCount: number;
  successCount: number;
  clientErrorCount: number;
  serverErrorCount: number;
  otherStatusCount: number;
  averageDurationMs: number;
  minDurationMs: number;
  p50DurationMs: number;
  p95DurationMs: number;
  p99DurationMs: number;
  maxDurationMs: number;
  statusBreakdown: StatusBreakdown;
  methodBreakdown: MethodBreakdown;
  slowestEndpoints: SlowEndpointSummary[];
}

interface EndpointAccumulator {
  endpoint: string;
  method: string;
  durations: number[];
  statusBreakdown: StatusBreakdown;
}

export function sanitizeUrl(url: string): string {
  return url.split('?')[0];
}

export function summarizeApiPerformance(entries: ApiLogEntry[], slowThresholdMs: number): ApiPerformanceSummary {
  const durations: number[] = [];
  const statusBreakdown: StatusBreakdown = {};
  const methodBreakdown: MethodBreakdown = {};
  const endpointMap = new Map<string, EndpointAccumulator>();

  let successCount = 0;
  let clientErrorCount = 0;
  let serverErrorCount = 0;
  let otherStatusCount = 0;
  let slowCallCount = 0;

  for (const entry of entries) {
    incrementCounter(methodBreakdown, entry.method || 'UNKNOWN');

    if (typeof entry.status === 'number') {
      const statusBucket = String(entry.status);
      incrementCounter(statusBreakdown, statusBucket);
      if (entry.status >= 200 && entry.status < 400) {
        successCount += 1;
      } else if (entry.status >= 400 && entry.status < 500) {
        clientErrorCount += 1;
      } else if (entry.status >= 500) {
        serverErrorCount += 1;
      } else {
        otherStatusCount += 1;
      }
    } else {
      incrementCounter(statusBreakdown, 'NO_STATUS');
      otherStatusCount += 1;
    }

    if (typeof entry.durationMs !== 'number' || !Number.isFinite(entry.durationMs) || entry.durationMs < 0) {
      continue;
    }

    const durationMs = Math.round(entry.durationMs);
    durations.push(durationMs);
    if (durationMs > slowThresholdMs) {
      slowCallCount += 1;
    }

    const method = entry.method || 'UNKNOWN';
    const endpoint = sanitizeUrl(entry.url || '');
    const key = `${method} ${endpoint}`;
    const accumulator = endpointMap.get(key) ?? {
      endpoint,
      method,
      durations: [],
      statusBreakdown: {},
    };

    accumulator.durations.push(durationMs);
    if (typeof entry.status === 'number') {
      incrementCounter(accumulator.statusBreakdown, String(entry.status));
    } else {
      incrementCounter(accumulator.statusBreakdown, 'NO_STATUS');
    }

    endpointMap.set(key, accumulator);
  }

  const sortedDurations = [...durations].sort((left, right) => left - right);
  const minDurationMs = sortedDurations.length > 0 ? sortedDurations[0] : 0;
  const maxDurationMs = sortedDurations.length > 0 ? sortedDurations[sortedDurations.length - 1] : 0;
  const totalDurationMs = sortedDurations.reduce((sum, duration) => sum + duration, 0);
  const averageDurationMs = sortedDurations.length > 0 ? round(totalDurationMs / sortedDurations.length) : 0;

  const slowestEndpoints = [...endpointMap.values()]
    .map((endpoint) => {
      const endpointDurations = [...endpoint.durations].sort((left, right) => left - right);
      const endpointTotal = endpointDurations.reduce((sum, duration) => sum + duration, 0);
      return {
        endpoint: endpoint.endpoint,
        method: endpoint.method,
        count: endpointDurations.length,
        averageDurationMs: endpointDurations.length > 0 ? round(endpointTotal / endpointDurations.length) : 0,
        p95DurationMs: percentile(endpointDurations, 95),
        maxDurationMs: endpointDurations.length > 0 ? endpointDurations[endpointDurations.length - 1] : 0,
        statusBreakdown: endpoint.statusBreakdown,
      };
    })
    .sort((left, right) => {
      if (right.p95DurationMs !== left.p95DurationMs) {
        return right.p95DurationMs - left.p95DurationMs;
      }
      if (right.maxDurationMs !== left.maxDurationMs) {
        return right.maxDurationMs - left.maxDurationMs;
      }
      return right.count - left.count;
    })
    .slice(0, 5);

  return {
    totalCalls: entries.length,
    measuredCallCount: sortedDurations.length,
    slowThresholdMs,
    slowCallCount,
    successCount,
    clientErrorCount,
    serverErrorCount,
    otherStatusCount,
    averageDurationMs,
    minDurationMs,
    p50DurationMs: percentile(sortedDurations, 50),
    p95DurationMs: percentile(sortedDurations, 95),
    p99DurationMs: percentile(sortedDurations, 99),
    maxDurationMs,
    statusBreakdown,
    methodBreakdown,
    slowestEndpoints,
  };
}

export function formatApiPerformanceSummary(summary: ApiPerformanceSummary): string {
  const lines: string[] = [
    'API Performance Summary',
    `Total calls: ${summary.totalCalls}`,
    `Measured latency calls: ${summary.measuredCallCount}`,
    `Slow threshold: ${summary.slowThresholdMs}ms`,
    `Slow calls: ${summary.slowCallCount}`,
    `Statuses: success=${summary.successCount}, 4xx=${summary.clientErrorCount}, 5xx=${summary.serverErrorCount}, other=${summary.otherStatusCount}`,
    `Latency (ms): min=${summary.minDurationMs}, p50=${summary.p50DurationMs}, p95=${summary.p95DurationMs}, p99=${summary.p99DurationMs}, max=${summary.maxDurationMs}, avg=${summary.averageDurationMs}`,
    `Status breakdown: ${formatBreakdown(summary.statusBreakdown)}`,
    `Method breakdown: ${formatBreakdown(summary.methodBreakdown)}`,
  ];

  if (summary.slowestEndpoints.length > 0) {
    lines.push('', 'Top slow endpoints (by p95):');
    for (const endpoint of summary.slowestEndpoints) {
      lines.push(
        `- ${endpoint.method} ${endpoint.endpoint} | calls=${endpoint.count} | p95=${endpoint.p95DurationMs}ms | max=${endpoint.maxDurationMs}ms | avg=${endpoint.averageDurationMs}ms | statuses=${formatBreakdown(endpoint.statusBreakdown)}`
      );
    }
  }

  return lines.join('\n');
}

function percentile(sortedDurations: number[], percentileRank: number): number {
  if (sortedDurations.length === 0) {
    return 0;
  }
  const index = Math.min(sortedDurations.length - 1, Math.max(0, Math.ceil((percentileRank / 100) * sortedDurations.length) - 1));
  return sortedDurations[index];
}

function incrementCounter(counter: Record<string, number>, key: string): void {
  counter[key] = (counter[key] ?? 0) + 1;
}

function formatBreakdown(counter: Record<string, number>): string {
  const entries = Object.entries(counter).sort(([left], [right]) => left.localeCompare(right));
  if (entries.length === 0) {
    return 'n/a';
  }
  return entries.map(([key, value]) => `${key}:${value}`).join(', ');
}

function round(value: number): number {
  return Math.round(value);
}
