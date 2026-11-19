import { context } from '@opentelemetry/api';
import { unsuppressTracing } from '@opentelemetry/core';

/**
 * Run manual telemetry in the current context without inheriting the
 * suppression marker used by OpenTelemetry instrumentation/exporters.
 *
 * Removing that marker preserves the remainder of the context, including any
 * active parent span and baggage.
 */
export function withTracingUnsuppressed<T>(callback: () => T): T {
  return context.with(unsuppressTracing(context.active()), callback);
}
