import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  HEARINGS_JOURNEY_HEADER,
  isHearingsJourneyId,
  isHearingsTelemetryPath,
} from '../../../common/hearings/telemetry-correlation';
import { HearingsTelemetryService } from './hearings-telemetry.service';

export const hearingsJourneyInterceptor: HttpInterceptorFn = (request, next) => {
  let correlatedRequest = request;
  try {
    const browser = inject(Window);
    const url = new URL(request.url, browser.location.origin);
    if (url.origin === browser.location.origin && isHearingsTelemetryPath(url.pathname)) {
      const journeyId = inject(HearingsTelemetryService).requestJourneyId;
      if (isHearingsJourneyId(journeyId)) {
        correlatedRequest = request.clone({ setHeaders: { [HEARINGS_JOURNEY_HEADER]: journeyId } });
      }
    }
  } catch {
    // Correlation is optional: a telemetry failure must not stop or retry the API call.
  }
  return next(correlatedRequest);
};
