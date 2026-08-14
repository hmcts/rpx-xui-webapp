import * as applicationinsights from 'applicationinsights';
import * as express from 'express';
import type { IncomingMessage, RequestOptions } from 'http';
import { getConfigValue, showFeature } from '../configuration/';
import { APP_INSIGHTS_CONNECTION_STRING, FEATURE_APP_INSIGHTS_ENABLED } from '../configuration/references';

type TelemetryRequestOptions = RequestOptions & {
  href?: string;
  pathname?: string;
};

type HttpInstrumentationOptions = {
  enabled: boolean;
  ignoreIncomingRequestHook: (request: IncomingMessage) => boolean;
  ignoreOutgoingRequestHook: (request: RequestOptions) => boolean;
};

const EXCLUDED_TELEMETRY_PATHS = ['/health', '/assets/', '/media/', '/polyfills'];

const EXCLUDED_TELEMETRY_EXTENSIONS = ['.js', '.css', '.woff2', '.svg', '.png', '.gif', '.ico', '.json'];

function shouldExcludeTelemetryPath(path = ''): boolean {
  const telemetryPath = path.toLowerCase();

  return (
    EXCLUDED_TELEMETRY_PATHS.some((excludedPath) => telemetryPath.includes(excludedPath)) ||
    EXCLUDED_TELEMETRY_EXTENSIONS.some((extension) => telemetryPath.endsWith(extension))
  );
}

function getOutgoingRequestPath(request: RequestOptions): string {
  const telemetryRequest = request as TelemetryRequestOptions;

  if (typeof request.path === 'string') {
    return request.path;
  }

  if (typeof telemetryRequest.href === 'string') {
    return telemetryRequest.href;
  }

  return `${request.protocol || ''}//${request.hostname || request.host || ''}${telemetryRequest.pathname || ''}`;
}
export let client: applicationinsights.TelemetryClient;

if (showFeature(FEATURE_APP_INSIGHTS_ENABLED)) {
  const connectionString = getConfigValue(APP_INSIGHTS_CONNECTION_STRING);
  const httpInstrumentationOptions: HttpInstrumentationOptions = {
    enabled: true,
    ignoreIncomingRequestHook: (request: IncomingMessage) => shouldExcludeTelemetryPath(request.url),
    ignoreOutgoingRequestHook: (request: RequestOptions) => shouldExcludeTelemetryPath(getOutgoingRequestPath(request)),
  };

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
      instrumentationOptions: {
        http: httpInstrumentationOptions,
      },
      samplingRatio: 1,
    })
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true, true)
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(true)
    .start();

  client = applicationinsights.defaultClient;
  client.trackTrace({ message: 'App Insight Activated' });
} else {
  client = null;
}

export function appInsights(_req: express.Request, _res: express.Response, next) {
  // Request telemetry is captured by Azure Monitor OpenTelemetry HTTP instrumentation.
  next();
}

export function trackTrace(trace: string, properties?: Record<string, unknown>) {
  if (client) {
    client.trackTrace({ message: trace, properties });
  }
}
