import { client } from '../lib/appInsights';

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
] as const;
export type HearingsTraceOperation = (typeof OPERATIONS)[number];

const DIAGNOSTICS = {
  started: { message: 'Hearings.OperationStarted', severity: 1 },
  failed: { message: 'Hearings.OperationFailed', severity: 3 },
  'service-not-configured': { message: 'Hearings.ServiceNotConfigured', severity: 2 },
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
    const status = error && typeof error === 'object' ? (error as { status?: unknown }).status : undefined;
    const httpStatus =
      typeof status === 'number' && Number.isInteger(status) && status >= 0 && status <= 599 ? { httpStatus: status } : {};
    // The registered server telemetry processor adds the request-scoped anonymous journeyId.
    client.trackTrace({
      ...DIAGNOSTICS[outcome],
      properties: { telemetryArea: 'Hearings', operation, outcome, ...httpStatus },
    });
  } catch {
    // Diagnostics must not change the response, replace the original error or block next(error).
  }
}
