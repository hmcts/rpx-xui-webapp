import * as http from 'http';

import * as applicationinsights from 'applicationinsights';
import type * as express from 'express';

import { Span, SpanKind, SpanStatusCode, TraceFlags } from '@opentelemetry/api';
import type { HttpInstrumentationConfig } from '@opentelemetry/instrumentation-http';
import type { ReadableSpan, SpanProcessor } from '@opentelemetry/sdk-trace-base';

import { getConfigValue, showFeature } from '../configuration/';
import { APP_INSIGHTS_CONNECTION_STRING, FEATURE_APP_INSIGHTS_ENABLED } from '../configuration/references';

/**
 * High-volume, low-value incoming requests that should not be exported
 * to Application Insights.
 *
 * These requests were previously sampled at approximately 1% by the
 * Application Insights 2.x TelemetryProcessor.
 *
 * They are no longer required in Application Insights and are therefore
 * excluded completely (0%).
 */
const EXCLUDED_TELEMETRY_PATHS = ['/health', '/liveness', '/readiness', '/assets/', '/media/', '/polyfills'];

/**
 * Static resource types identified as high-volume Application Insights
 * ingestion contributors.
 */
const EXCLUDED_TELEMETRY_EXTENSIONS = ['.js', '.css', '.woff2', '.svg', '.png', '.gif', '.ico', '.json'];

/**
 * Determines whether a URL/path belongs to the high-volume health/static
 * telemetry that should not be exported.
 *
 * Query strings are removed so URLs such as:
 *
 *   /main-123.js?v=1
 *   /styles-123.css?cache=456
 *
 * are still correctly identified.
 */
function shouldExcludeTelemetryPath(path = ''): boolean {
  const telemetryPath = path.toLowerCase().split('?')[0];

  return (
    EXCLUDED_TELEMETRY_PATHS.some((excludedPath) => telemetryPath.includes(excludedPath)) ||
    EXCLUDED_TELEMETRY_EXTENSIONS.some((extension) => telemetryPath.endsWith(extension))
  );
}

/**
 * Extract the HTTP path/URL from an OpenTelemetry HTTP server span.
 *
 * Different OpenTelemetry semantic-convention versions can expose the
 * request target under different attribute names, so check the relevant
 * current and legacy HTTP attributes.
 */
function getSpanRequestPath(span: ReadableSpan): string {
  const attributes = span.attributes;

  const path =
    attributes['url.path'] ??
    attributes['url.full'] ??
    attributes['http.target'] ??
    attributes['http.url'] ??
    attributes['http.route'];

  return typeof path === 'string' ? path : span.name;
}

/**
 * Response status code, inclusive, from which an incoming HTTP request
 * is considered failed for Application Insights "Failed requests"
 * purposes, matching the classic Application Insights 2.x behaviour
 * (success = statusCode < 400).
 */
const FAILED_REQUEST_STATUS_CODE_THRESHOLD = 400;

/**
 * Marks incoming (server) HTTP spans with an ERROR status for 4xx/5xx
 * responses.
 *
 * The OpenTelemetry HTTP instrumentation only sets SERVER span status
 * to ERROR for 5xx responses; 4xx is left UNSET because it is treated
 * as a client-side outcome under OpenTelemetry semantic conventions.
 *
 * Azure Monitor's preaggregated "Failed requests" standard metric is
 * derived from `span.status.code` at span-end time. Left as-is, 4xx
 * responses are counted as successful in that metric even though the
 * `requests` table (which reports the raw response code) shows them as
 * failed, producing a chart/table mismatch.
 *
 * This must run via the HTTP instrumentation's applyCustomAttributesOnSpan
 * hook rather than a SpanProcessor: it fires before span.end(), ahead of
 * the SpanProcessor chain, and Azure Monitor's own metric-preaggregation
 * SpanProcessor is registered before any SpanProcessors this module adds.
 */
export function markFailedServerSpanStatus(span: Span, _request: unknown, response: http.IncomingMessage | http.ServerResponse): void {
  if (!(response instanceof http.ServerResponse)) {
    return;
  }

  if (typeof response.statusCode === 'number' && response.statusCode >= FAILED_REQUEST_STATUS_CODE_THRESHOLD) {
    span.setStatus({ code: SpanStatusCode.ERROR });
  }
}

/**
 * Replaces the Application Insights 2.x fine-grained TelemetryProcessor
 * used for health/static request telemetry.
 *
 * The compatibility SDK exposes Azure Monitor span processors, but not
 * the lower-level HTTP ignoreIncomingRequestHook type. Keep this scoped
 * to SERVER spans so outgoing service telemetry is not affected.
 */
class HealthStaticFilteringProcessor implements SpanProcessor {
  forceFlush(): Promise<void> {
    return Promise.resolve();
  }

  shutdown(): Promise<void> {
    return Promise.resolve();
  }

  onStart(): void {
    // No processing required when the span starts.
  }

  onEnd(span: ReadableSpan): void {
    if (span.kind !== SpanKind.SERVER) {
      return;
    }

    if (shouldExcludeTelemetryPath(getSpanRequestPath(span))) {
      span.spanContext().traceFlags = TraceFlags.NONE;
    }
  }
}

/**
 * Application Insights telemetry client.
 *
 * This export is retained because other parts of the application,
 * including log4jui.ts, use the client directly.
 *
 * The client remains null when Application Insights is disabled.
 */
export let client: applicationinsights.TelemetryClient | null = null;

if (showFeature(FEATURE_APP_INSIGHTS_ENABLED)) {
  const connectionString = getConfigValue(APP_INSIGHTS_CONNECTION_STRING);
  const healthStaticFilteringProcessor = new HealthStaticFilteringProcessor();

  /**
   * Application Insights 3.x uses Azure Monitor OpenTelemetry.
   *
   * The previous Application Insights 2.x implementation used:
   *
   *   client.addTelemetryProcessor(...)
   *
   * to reduce health/static telemetry to approximately 1%.
   *
   * Request/dependency/exception/performance collection remains on the
   * compatibility SDK chain. Azure Monitor OpenTelemetry options are used
   * only for exporter configuration and the health/static SpanProcessor.
   *
   * Telemetry continues to follow the existing environment sampling
   * configuration:
   *
   *   lower environments -> 1%
   *   production         -> 100%
   *   performance        -> 100%
   *
   * Those environment percentages remain managed by the existing
   * Terraform/Application Insights resource configuration.
   */
  const appInsightsSetup = applicationinsights.setup(connectionString);

  appInsightsSetup.setAzureMonitorOptions({
    spanProcessors: [healthStaticFilteringProcessor],
    instrumentationOptions: {
      http: {
        applyCustomAttributesOnSpan: markFailedServerSpanStatus,
      } as HttpInstrumentationConfig,
    },
  });

  appInsightsSetup

    /*
     * Continue collecting useful application telemetry.
     */
    .setAutoCollectRequests(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectPerformance(true, true)

    /*
     * Preserve request/dependency correlation.
     */
    .setAutoDependencyCorrelation(true)

    /*
     * Preserve existing console telemetry collection.
     */
    .setAutoCollectConsole(true, true)

    /*
     * Preserve disk retry caching.
     */
    .setUseDiskRetryCaching(true)

    /*
     * Preserve Live Metrics through the compatibility SDK chain.
     * Do not move this to setAzureMonitorOptions as enableLiveMetrics;
     * the compatibility API exposes it as setSendLiveMetrics.
     */
    .setSendLiveMetrics(true)

    .start();

  client = applicationinsights.defaultClient;

  client.trackTrace({
    message: 'App Insight Activated',
  });
}

/**
 * Legacy Express middleware.
 *
 * Application Insights 2.x manually called:
 *
 *   client.trackNodeHttpRequest(...)
 *
 * Application Insights 3.x automatically instruments incoming HTTP
 * requests through OpenTelemetry.
 *
 * Manual request tracking is therefore removed to avoid duplicate
 * request telemetry.
 *
 * The middleware remains as a no-op so existing Express registration
 * does not need to change as part of this migration.
 */
export function appInsights(_req: express.Request, _res: express.Response, next: express.NextFunction): void {
  next();
}

/**
 * Existing trace wrapper retained unchanged.
 *
 * Existing callers continue generating Application Insights trace
 * telemetry without needing to migrate to OpenTelemetry APIs directly.
 */
export function trackTrace(trace: string, properties?: Record<string, unknown>): void {
  if (client) {
    client.trackTrace({
      message: trace,
      properties,
    });
  }
}
