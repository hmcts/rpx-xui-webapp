import * as applicationinsights from 'applicationinsights';
import type { Contracts } from 'applicationinsights';
import * as express from 'express';
import { getConfigValue, showFeature } from '../configuration/';
import {
  APP_INSIGHTS_CONNECTION_STRING,
  APP_INSIGHTS_SAMPLING_PERCENTAGE,
  FEATURE_APP_INSIGHTS_ENABLED,
} from '../configuration/references';

export function redactTelemetryIdentifiers(value: string): string {
  return value
    .replace(/(\/cases\/case-details\/[^/?#]+\/[^/?#]+\/)[^/?#]+/gi, '$1[REDACTED]')
    .replace(/(\/cases\/case-details\/)\d+(?=[/?#]|$)/gi, '$1[REDACTED]')
    .replace(/(\/am\/role-assignments\/actors\/)[^/?#]+/gi, '$1[REDACTED]')
    .replace(/(\/case\/tasks\/)[^/?#]+(\/event\/)[^/?#]+/gi, '$1[REDACTED]$2[REDACTED]')
    .replace(/(\/task\/)(?!search-for-completable(?=[/?#]|$)|task-types(?=[/?#]|$))[^/?#]+/gi, '$1[REDACTED]')
    .replace(/(\/hearings\/sessions\/)[^/?#]+/gi, '$1[REDACTED]')
    .replace(/(\/linkedHearingGroup\/)[^/?#]+/gi, '$1[REDACTED]')
    .replace(/(\/hearings?\/)(?!sessions(?=[/?#]|$))[^/?#]+/gi, '$1[REDACTED]')
    .replace(/(\/hearingActuals(?:Completion)?\/)[^/?#]+/gi, '$1[REDACTED]')
    .replace(
      /([?&](?:access_?token|refresh_?token|id_?token|bearer_?token|token|client_?secret|secret|password|api[_-]?key|authorization)=)[^&#]*/gi,
      '$1[REDACTED]'
    )
    .replace(
      /([?&](?:id|case_?id|case_?ref(?:erence)?|event_?id|task_?id|person_?id|user_?id|correlation_?id|hearing_?id|group_?id|hearing_?group_?id)=)[^&#]*/gi,
      '$1[REDACTED]'
    )
    .replace(/([?&]case_ids=)[^&#]*/gi, '$1[REDACTED]')
    .replace(/\b((?:case_ids)["']?\s*[:=]\s*)\[[^\]]*\]/gi, '$1[REDACTED]')
    .replace(
      /\b((?:id|case[_-]?ref(?:erence)?|(?:case|event|task|person|user|correlation|hearing|group)[_-]?id|hearing[_-]?group[_-]?id)["']?\s*[:=]\s*["']?)[^"'\s,;}]+/gi,
      '$1[REDACTED]'
    );
}

export function fineGrainedSampling(envelope: Contracts.EnvelopeTelemetry): boolean {
  const baseData = envelope.data?.baseData as
    | {
        data?: string;
        name?: string;
        url?: string;
        message?: string;
        properties?: Record<string, unknown>;
        exceptions?: Array<{
          typeName?: string;
          message?: string;
          stack?: string;
          parsedStack?: Array<{ method?: string; assembly?: string; fileName?: string }>;
        }>;
      }
    | undefined;
  if (baseData) {
    for (const key of ['data', 'name', 'url', 'message'] as const) {
      if (typeof baseData[key] === 'string') {
        baseData[key] = redactTelemetryIdentifiers(baseData[key]);
      }
    }
    for (const key of Object.keys(baseData.properties || {})) {
      if (
        /^(?:id|case[_-]?(?:ids?|ref(?:erence)?)|(?:event|task|person|user|correlation|hearing|group)[_-]?id|hearing[_-]?group[_-]?id)$/i.test(
          key
        )
      ) {
        baseData.properties[key] = '[REDACTED]';
      }
    }
    for (const exception of baseData.exceptions || []) {
      for (const key of ['typeName', 'message', 'stack'] as const) {
        if (typeof exception[key] === 'string') {
          exception[key] = redactTelemetryIdentifiers(exception[key]);
        }
      }
      for (const frame of exception.parsedStack || []) {
        for (const key of ['method', 'assembly', 'fileName'] as const) {
          if (typeof frame[key] === 'string') {
            frame[key] = redactTelemetryIdentifiers(frame[key]);
          }
        }
      }
    }
  }

  if (['RequestData', 'RemoteDependencyData'].includes(envelope.data.baseType)) {
    const name = (envelope.data.baseData.name || '').toLowerCase();

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

if (showFeature(FEATURE_APP_INSIGHTS_ENABLED)) {
  const appInsightsConfiguration = applicationinsights
    .setup(getConfigValue(APP_INSIGHTS_CONNECTION_STRING))
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true, true)
    .setUseDiskRetryCaching(true)
    .setSendLiveMetrics(true);

  client = applicationinsights.defaultClient;
  client.config.samplingPercentage = getConfigValue<number>(APP_INSIGHTS_SAMPLING_PERCENTAGE);
  client.addTelemetryProcessor(fineGrainedSampling);
  appInsightsConfiguration.start();
  console.log(`Application Insights sampling percentage: ${client.config.samplingPercentage}%`);
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
