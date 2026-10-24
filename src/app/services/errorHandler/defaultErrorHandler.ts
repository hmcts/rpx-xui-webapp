import { ErrorHandler, Injectable, Optional } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { HearingsTelemetryService } from '../../../hearings/services/hearings-telemetry.service';

@Injectable()
export class DefaultErrorHandler implements ErrorHandler {
  constructor(
    private readonly loggerService: LoggerService,
    @Optional() private readonly hearingsTelemetry?: HearingsTelemetryService
  ) {}

  public handleError(error: Error) {
    // Include resolver failures before NavigationEnd, when a journey is only prepared.
    // Never print the original Hearings error: it can contain bodies, URLs or navigation state.
    if (this.hearingsTelemetry?.currentJourney || this.hearingsTelemetry?.requestJourneyId) {
      try {
        this.hearingsTelemetry.captureException('browser')(error);
      } catch {
        // Telemetry must not interfere with Angular's original error handling.
      }
      return;
    }
    console.error('Handling error with DefaultErrorHandler.');
    console.error(error);
    this.loggerService.error(error);
  }
}
