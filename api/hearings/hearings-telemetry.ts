import { client } from '../lib/appInsights';
import { hearingsTelemetryProperties } from '../lib/hearings-telemetry-correlation';

const OPERATIONS = [
  'loadServiceHearingValues',
  'loadLinkedCasesWithHearings',
  'getHearings',
  'getHearing',
  'submitHearingRequest',
  'cancelHearingRequest',
  'updateHearingRequest',
  'getHearingActuals',
  'updateHearingActuals',
  'submitHearingActuals',
  'getLinkedHearingGroup',
  'postLinkedHearingGroup',
  'putLinkedHearingGroup',
  'deleteLinkedHearingGroup',
  'getServicePath',
  'sendGet',
  'sendPost',
  'sendPut',
  'sendDelete',
  'outboundRequest',
  'serverRequest',
] as const;
export type HearingsTraceOperation = (typeof OPERATIONS)[number];

const DIAGNOSTICS = {
  started: { message: 'Hearings.OperationStarted', severity: 'Information' },
  failed: { message: 'Hearings.OperationFailed', severity: 'Error' },
  'service-not-configured': { message: 'Hearings.ServiceNotConfigured', severity: 'Warning' },
} as const;

/** Native traces with a closed schema: never pass an error, request or response as properties. */
export function traceHearingsDiagnostic(
  operation: HearingsTraceOperation,
  outcome: keyof typeof DIAGNOSTICS,
  error?: unknown
): void {
  try {
    if (!client || !OPERATIONS.includes(operation) || !Object.prototype.hasOwnProperty.call(DIAGNOSTICS, outcome)) {
      return;
    }
    const detail =
      error && typeof error === 'object' ? (error as { status?: unknown; response?: { status?: unknown } }) : undefined;
    const status = detail?.status ?? detail?.response?.status;
    const httpStatus =
      typeof status === 'number' && Number.isInteger(status) && status >= 0 && status <= 599 ? { httpStatus: status } : {};
    client.trackTrace({
      ...DIAGNOSTICS[outcome],
      properties: { telemetryArea: 'Hearings', operation, outcome, ...httpStatus, ...hearingsTelemetryProperties() },
    });
  } catch {
    // Diagnostics must not change the response, replace the original error or block next(error).
  }
}
