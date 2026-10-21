import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  HEARINGS_JOURNEY_HEADER,
  isHearingsJourneyId,
  isHearingsTelemetryPath,
  HEARINGS_IDENTIFIER_HEADERS,
  hearingTelemetryIdentifiers,
  hearingsUrlIdentifiers,
  mergeHearingsIdentifiers,
} from '../../../common/hearings/telemetry-correlation';
import { HearingsTelemetryService } from './hearings-telemetry.service';

export const hearingsJourneyInterceptor: HttpInterceptorFn = (request, next) => {
  let correlatedRequest = request;
  try {
    const browser = inject(Window);
    const url = new URL(request.url, browser.location.origin);
    if (url.origin === browser.location.origin && isHearingsTelemetryPath(url.pathname)) {
      const telemetry = inject(HearingsTelemetryService);
      const journeyId = telemetry.requestJourneyId;
      if (isHearingsJourneyId(journeyId)) {
        const headers = { [HEARINGS_JOURNEY_HEADER]: journeyId };
        const identifiers = mergeHearingsIdentifiers(
          hearingTelemetryIdentifiers(telemetry.requestIdentifiers),
          hearingsUrlIdentifiers(url)
        );
        for (const key of ['caseId', 'hearingId', 'jurisdiction'] as const) {
          if (identifiers[key]) {
            headers[HEARINGS_IDENTIFIER_HEADERS[key]] = identifiers[key];
          }
        }
        correlatedRequest = request.clone({ setHeaders: headers });
      }
    }
  } catch {
    // Correlation is optional: a telemetry failure must not stop or retry the API call.
  }
  return next(correlatedRequest);
};
