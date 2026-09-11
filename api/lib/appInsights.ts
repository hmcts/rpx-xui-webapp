import * as applicationinsights from 'applicationinsights';
import * as express from 'express';
import { getConfigValue, showFeature } from '../configuration/';
import { APP_INSIGHTS_CONNECTION_STRING, FEATURE_APP_INSIGHTS_ENABLED } from '../configuration/references';
type TelemetryProcessor = Parameters<applicationinsights.TelemetryClient['addTelemetryProcessor']>[0];
type TelemetryEnvelope = Parameters<TelemetryProcessor>[0];

function fineGrainedSampling(envelope: TelemetryEnvelope): boolean {
  if (['RequestData', 'RemoteDependencyData'].includes(envelope.data?.baseType)) {
    const name = String(envelope.data?.baseData?.name || '').toLowerCase();

    if (
      name.includes('/health') ||
      name.includes('/assets/') ||
      name.includes('/media/') ||
      name.endsWith('.js') ||
      name.endsWith('.css') ||
      name.endsWith('.woff2') ||
      name.endsWith('.svg') ||
      name.endsWith('.png') ||
      name.endsWith('.gif') ||
      name.endsWith('.ico') ||
      name.endsWith('.json') ||
      name.includes('/polyfills')
    ) {
      envelope.sampleRate = 1;
    }
  }
  return true;
}
export let client: applicationinsights.TelemetryClient;

const appInsightsConnectionString = getConfigValue<string>(APP_INSIGHTS_CONNECTION_STRING);
const hasValidAppInsightsConnectionString = /(?:^|;)InstrumentationKey=[^;]+/i.test(appInsightsConnectionString || '');

if (showFeature(FEATURE_APP_INSIGHTS_ENABLED) && hasValidAppInsightsConnectionString) {
  applicationinsights
    .setup(appInsightsConnectionString)
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true, false)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true, true)
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(true)
    .start();

  client = applicationinsights.defaultClient;
  client.addTelemetryProcessor(fineGrainedSampling);
  client.trackTrace({ message: 'App Insight Activated' });
} else {
  client = null;
}

export function appInsights(req: express.Request, res: express.Response, next) {
  if (client) {
    client.trackNodeHttpRequest({ request: req, response: res });
  }

  next();
}

export function trackTrace(trace: string, properties?: { [key: string]: any }) {
  if (client) {
    client.trackTrace({ message: trace, properties });
  }
}
