import { AsyncLocalStorage } from 'node:async_hooks';
import type { IncomingMessage } from 'node:http';
import type { RequestHandler } from 'express';
import type { Contracts } from 'applicationinsights';
import {
  HEARINGS_JOURNEY_HEADER,
  isHearingsJourneyId,
  isHearingsTelemetryPath,
  HEARINGS_IDENTIFIER_HEADERS,
  HearingsTelemetryIdentifiers,
  hearingTelemetryIdentifiers,
  hearingsUrlIdentifiers,
  mergeHearingsIdentifiers,
} from '../../common/hearings/telemetry-correlation';

const journeys = new AsyncLocalStorage<string | undefined>();
const requestJourneys = new WeakMap<IncomingMessage, string | undefined>();
const hearingRequests = new AsyncLocalStorage<boolean>();
const requestScopes = new WeakMap<IncomingMessage, boolean>();
const identifiers = new AsyncLocalStorage<HearingsTelemetryIdentifiers>();
const requestIdentifiers = new WeakMap<IncomingMessage, HearingsTelemetryIdentifiers>();

function identifiersForRequest(request: IncomingMessage): HearingsTelemetryIdentifiers {
  const url = new URL(request.url || '', 'http://exui.invalid');
  if (!isHearingsTelemetryPath(url.pathname)) {
    return {};
  }
  return mergeHearingsIdentifiers(
    hearingTelemetryIdentifiers({
      caseId: request.headers?.[HEARINGS_IDENTIFIER_HEADERS.caseId],
      hearingId: request.headers?.[HEARINGS_IDENTIFIER_HEADERS.hearingId],
      jurisdiction: request.headers?.[HEARINGS_IDENTIFIER_HEADERS.jurisdiction],
    }),
    hearingsUrlIdentifiers(url)
  );
}

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
  let context: HearingsTelemetryIdentifiers = {};
  try {
    journeyId = requestJourneyId(request);
    context = identifiersForRequest(request);
  } catch {
    // Malformed telemetry metadata must not reject an otherwise valid request.
  }
  // Express can rewrite request.url inside mounted routers. Keep only the validated ID,
  // and let the weak reference expire naturally when the request is released.
  requestJourneys.set(request, journeyId);
  requestIdentifiers.set(request, context);
  const hearings = isHearingsTelemetryRequest(request);
  requestScopes.set(request, hearings);
  // Each request has its own context, including those with no valid journey header.
  hearingRequests.run(hearings, () => journeys.run(journeyId, () => identifiers.run(context, next)));
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
    const context = request ? requestIdentifiers.get(request) || identifiersForRequest(request) : identifiers.getStore() || {};
    if ((journeyId || Object.keys(context).length) && envelope.data?.baseData) {
      envelope.data.baseData.properties = {
        ...envelope.data.baseData.properties,
        ...(journeyId ? { journeyId } : {}),
        ...context,
      };
    }
  } catch {
    // Retain the original telemetry even when optional correlation is unavailable.
  }
  return true;
}
