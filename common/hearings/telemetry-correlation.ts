// A random, per-journey correlation value only; never an authorization or case identifier.
export const HEARINGS_JOURNEY_HEADER = 'x-exui-hearings-journey-id';

export function isHearingsJourneyId(value: unknown): value is string {
  return typeof value === 'string' && value.length === 32 && /^[a-f0-9]{32}$/.test(value);
}

export function isHearingsTelemetryPath(path: string): boolean {
  return (
    /^\/api\/hearings(?:\/|$)/.test(path) ||
    /^\/api\/prd\/(?:lov|caseFlag|location|judicial)\//.test(path) ||
    path === '/refdata/commondata/lov/categories/CaseLinkingReasonCode'
  );
}
