import { defer, MonoTypeOperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HearingsOperation } from './hearings-exception-telemetry';
import { HearingsTelemetryService } from './hearings-telemetry.service';

/** Observe failures before a resolver/effect handles them, without changing the stream. */
export function reportHearingsApiErrors<T>(
  telemetry: HearingsTelemetryService | null | undefined,
  operation: HearingsOperation
): MonoTypeOperatorFunction<T> {
  return (source) =>
    defer(() => {
      let report: (error: unknown) => void;
      try {
        // Snapshot context at subscription time, not when a slow request eventually fails.
        report = telemetry?.captureException(operation);
      } catch {
        // Initialization failure must not prevent the request.
      }
      return source.pipe(
        tap({
          error: (error) => {
            try {
              report?.(error);
            } catch {
              // Preserve the original error and the consumer's existing recovery behaviour.
            }
          },
        })
      );
    });
}
