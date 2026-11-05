import { context, diag, DiagLogLevel, trace } from '@opentelemetry/api';
import { isTracingSuppressed } from '@opentelemetry/core';
import type { SpanProcessor } from '@opentelemetry/sdk-trace-base';

let requestProbes = 0;

export function probeRequestTelemetry(origin: 'incoming' | 'outbound', clientAvailable: boolean): void {
  if (process.env.XUI_TELEMETRY_DIAGNOSTICS !== 'true' || requestProbes >= 10) {
    return;
  }
  requestProbes++;
  try {
    const activeContext = context.active();
    const suppressed = isTracingSuppressed(activeContext);
    const span = trace.getTracer('ApplicationInsightsTracer').startSpan('xui.telemetry.diagnostic-probe');
    const recording = span.isRecording();
    span.end();
    process.stderr.write(
      `${JSON.stringify({ source: 'xui-telemetry-diagnostics', event: 'request-probe', origin, clientAvailable, suppressed, recording })}\n`
    );
  } catch {
    process.stderr.write(`${JSON.stringify({ source: 'xui-telemetry-diagnostics', event: 'request-probe-error', origin })}\n`);
  }
}

export function enableTelemetryDiagnostics(): SpanProcessor | undefined {
  if (process.env.XUI_TELEMETRY_DIAGNOSTICS !== 'true') {
    return undefined;
  }

  let emitted = 0;
  let started = 0;
  let ended = 0;
  let warnings = 0;
  let errors = 0;
  const report = (event: string) => {
    if (emitted >= 50) {
      return;
    }
    emitted++;
    process.stderr.write(`${JSON.stringify({ source: 'xui-telemetry-diagnostics', event, started, ended, warnings, errors })}\n`);
  };

  diag.setLogger(
    {
      error: () => {
        errors++;
        report('sdk-error');
      },
      warn: () => {
        warnings++;
        report('sdk-warning');
      },
      info: () => {},
      debug: () => {},
      verbose: () => {},
    },
    DiagLogLevel.WARN
  );
  report('enabled');

  return {
    onStart: () => {
      started++;
      report('span-start');
    },
    onEnd: () => {
      ended++;
      report('span-end');
    },
    forceFlush: async () => {},
    shutdown: async () => {},
  };
}
