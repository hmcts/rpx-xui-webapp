import { diag, DiagLogLevel } from '@opentelemetry/api';
import type { SpanProcessor } from '@opentelemetry/sdk-trace-base';

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
