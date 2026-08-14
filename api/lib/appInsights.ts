import * as applicationinsights from 'applicationinsights';
import * as express from 'express';

import { getConfigValue, showFeature } from '../configuration/';
import { APP_INSIGHTS_CONNECTION_STRING, FEATURE_APP_INSIGHTS_ENABLED } from '../configuration/references';

/**
 * Application Insights telemetry client.
 *
 * This export is intentionally retained because other parts of the
 * application, including log4jui.ts, use the client directly.
 *
 * The client is null when Application Insights is disabled.
 */
export let client: applicationinsights.TelemetryClient | null = null;

if (showFeature(FEATURE_APP_INSIGHTS_ENABLED)) {
  const connectionString = getConfigValue(APP_INSIGHTS_CONNECTION_STRING);

  /**
   * Application Insights 3.x is backed by Azure Monitor OpenTelemetry.
   *
   * The previous 2.x implementation used a TelemetryProcessor for
   * fine-grained sampling:
   *
   *   client.addTelemetryProcessor(...)
   *
   * That API is not supported by the 3.x SDK.
   *
   * IMPORTANT:
   * Fine-grained health/static request filtering is intentionally NOT
   * configured here yet.
   *
   * The setAzureMonitorOptions() API exposed by the installed
   * applicationinsights/Azure Monitor packages does not expose the
   * HTTP ignoreIncomingRequestHook configuration required for that
   * filtering.
   *
   * We keep normal telemetry collection unchanged while the filtering
   * implementation is handled separately.
   */
  applicationinsights
    .setup(connectionString)
    .setAzureMonitorOptions({
      azureMonitorExporterOptions: {
        connectionString,
      },

      enableAutoCollectDependencies: true,
      enableAutoCollectExceptions: true,
      enableAutoCollectPerformance: true,
      enableAutoCollectRequests: true,
      enableLiveMetrics: true,

      /**
       * Keep 100% of telemetry.
       *
       * Do NOT set this to 0.01 because samplingRatio applies globally
       * and would reduce useful application/service telemetry to 1%.
       */
      samplingRatio: 1,
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
 * requests through Azure Monitor OpenTelemetry.
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
 * Existing trace wrapper retained unchanged from the application's
 * perspective.
 *
 * This ensures existing callers continue generating Application Insights
 * trace telemetry rather than changing telemetry type during the SDK
 * migration.
 */
export function trackTrace(trace: string, properties?: Record<string, unknown>): void {
  if (client) {
    client.trackTrace({
      message: trace,
      properties,
    });
  }
}
