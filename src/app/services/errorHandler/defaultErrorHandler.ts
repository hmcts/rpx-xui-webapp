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
    console.error('Handling error with DefaultErrorHandler.');
    console.error(error);
    if (this.hearingsTelemetry?.currentJourney) {
      try {
        this.hearingsTelemetry.captureException('browser')(error);
      } catch {
        // Telemetry must not interfere with Angular's original error handling.
      }
      return;
    }
    this.loggerService.error(error);
  }
}
