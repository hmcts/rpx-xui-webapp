import * as applicationinsights from 'applicationinsights';
import * as express from 'express';

import { SpanKind, TraceFlags } from '@opentelemetry/api';
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
 * Replaces the Application Insights 2.x fine-grained TelemetryProcessor
 * used for health/static request telemetry.
 *
 * Previous behaviour:
 *
 *   health/static request -> approximately 1%
 *
 * New behaviour:
 *
 *   health/static request -> 0%
 *
 * Normal application requests are left untouched.
 *
 * The processor only evaluates SERVER spans. This is intentional:
 * outgoing service GET/POST dependency telemetry must continue to be
 * collected.
 *
 * Azure Monitor's documented filtering approach marks matching spans as
 * not sampled by setting their trace flags to NONE/DEFAULT, preventing
 * them from being exported.
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
    /*
     * Only filter incoming HTTP/server request telemetry.
     *
     * Do not filter CLIENT spans because those represent outgoing
     * dependencies such as service GET/POST calls that we want to keep.
     */
    if (span.kind !== SpanKind.SERVER) {
      return;
    }

    const requestPath = getSpanRequestPath(span);

    if (shouldExcludeTelemetryPath(requestPath)) {
      /*
       * Mark this span as not sampled so Azure Monitor does not export it.
       *
       * This intentionally changes the previous ~1% health/static
       * retention to 0%.
       */
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
   * Application Insights 3.x no longer supports TelemetryProcessor.
   * The equivalent extensibility mechanism is an OpenTelemetry
   * SpanProcessor.
   *
   * Health/static requests are now excluded completely (0%) because
   * this telemetry is not required in Application Insights.
   *
   * All other telemetry continues to follow the existing environment
   * sampling configuration:
   *
   *   lower environments -> 1%
   *   production         -> 100%
   *   performance        -> 100%
   *
   * Those environment percentages remain managed by the existing
   * Terraform/Application Insights resource configuration.
   */
  applicationinsights
    .setup(connectionString)
    .setAzureMonitorOptions({
      azureMonitorExporterOptions: {
        connectionString,
      },

      /*
       * Continue collecting useful application telemetry.
       */
      enableAutoCollectDependencies: true,
      enableAutoCollectExceptions: true,
      enableAutoCollectPerformance: true,
      enableAutoCollectRequests: true,
      enableLiveMetrics: true,

      /**
       * Filter health/static SERVER spans before Azure Monitor exports
       * them.
       *
       * Outgoing CLIENT/dependency spans are deliberately unaffected.
       */
      spanProcessors: [healthStaticFilteringProcessor],
    })

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
     * Preserve Live Metrics.
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
