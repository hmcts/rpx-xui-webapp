import { AsyncLocalStorage } from 'node:async_hooks';
import type { IncomingMessage } from 'node:http';
import type { RequestHandler } from 'express';
import type { Contracts } from 'applicationinsights';
import {
  HEARINGS_JOURNEY_HEADER,
  isHearingsJourneyId,
  isHearingsTelemetryPath,
} from '../../common/hearings/telemetry-correlation';

const journeys = new AsyncLocalStorage<string | undefined>();
const requestJourneys = new WeakMap<IncomingMessage, string | undefined>();
const hearingRequests = new AsyncLocalStorage<boolean>();
const requestScopes = new WeakMap<IncomingMessage, boolean>();

/** Identify the logging scope independently of an optional browser journey header. */
export function isHearingsTelemetryRequest(request?: IncomingMessage): boolean {
  try {
    if (!request) {
      return hearingRequests.getStore() === true;
    }
    return (
      requestScopes.get(request) ??
      (/^\/api\/hearings(?:\/|$)/.test((request.url || '').split('?')[0]) || !!requestJourneyId(request))
    );
  } catch {
    return false;
  }
}

function requestJourneyId(request: IncomingMessage): string | undefined {
  // Treat the header as untrusted metadata. Never retain URLs, bodies or other headers.
  const path = (request.url || '').split('?')[0];
  const value = request.headers[HEARINGS_JOURNEY_HEADER];
  return isHearingsTelemetryPath(path) && isHearingsJourneyId(value) ? value : undefined;
}

export const hearingsTelemetryCorrelation: RequestHandler = (request, _response, next) => {
  let journeyId: string | undefined;
  try {
    journeyId = requestJourneyId(request);
  } catch {
    // Malformed telemetry metadata must not reject an otherwise valid request.
  }
  // Express can rewrite request.url inside mounted routers. Keep only the validated ID,
  // and let the weak reference expire naturally when the request is released.
  requestJourneys.set(request, journeyId);
  const hearings = isHearingsTelemetryRequest(request);
  requestScopes.set(request, hearings);
  // Each request has its own context, including those with no valid journey header.
  hearingRequests.run(hearings, () => journeys.run(journeyId, next));
};

export function addHearingsJourneyToTelemetry(
  envelope: Contracts.EnvelopeTelemetry,
  contextObjects?: { [name: string]: unknown }
): boolean {
  try {
    // Request telemetry may be finalized outside the route's async context by the SDK.
    const request = contextObjects?.['http.ServerRequest'] as IncomingMessage | undefined;
    const journeyId = request
      ? requestJourneys.has(request)
        ? requestJourneys.get(request)
        : requestJourneyId(request)
      : journeys.getStore();
    if (journeyId && envelope.data?.baseData) {
      envelope.data.baseData.properties = {
        ...envelope.data.baseData.properties,
        journeyId,
      };
    }
  } catch {
    // Retain the original telemetry even when optional correlation is unavailable.
  }
  return true;
}
