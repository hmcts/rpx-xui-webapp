// A random, per-journey correlation value only; never an authorization or case identifier.
export const HEARINGS_JOURNEY_HEADER = 'x-exui-hearings-journey-id';
export const HEARINGS_IDENTIFIER_HEADERS = {
  caseId: 'x-exui-hearings-case-id',
  hearingId: 'x-exui-hearings-hearing-id',
  jurisdiction: 'x-exui-hearings-jurisdiction',
} as const;

export interface HearingsTelemetryIdentifiers {
  caseId?: string;
  hearingId?: string;
  jurisdiction?: string;
}

/** Only explicitly permitted identifiers; never spread arbitrary context or error properties. */
export function hearingTelemetryIdentifiers(
  source?: { caseId?: unknown; hearingId?: unknown; jurisdiction?: unknown } | null
): HearingsTelemetryIdentifiers {
  const result: HearingsTelemetryIdentifiers = {};
  for (const key of ['caseId', 'hearingId', 'jurisdiction'] as const) {
    const value = source?.[key];
    if (typeof value === 'string' && value.length > 0 && value.length <= 128 && !/[^a-zA-Z0-9_-]/.test(value)) {
      result[key] = value;
    }
  }
  return result;
}

export function hearingsUrlIdentifiers(url: URL): HearingsTelemetryIdentifiers {
  const scalar = (key: string) => (url.searchParams.getAll(key).length === 1 ? url.searchParams.get(key) : undefined);
  return hearingTelemetryIdentifiers({
    caseId: scalar('caseId') || scalar('caseRef') || scalar('caseReference'),
    hearingId: scalar('hearingId') || url.pathname.match(/^\/api\/hearings\/hearingActuals(?:Completion)?\/([^/]+)$/)?.[1],
    jurisdiction: scalar('jurisdictionId') || scalar('jurisdiction'),
  });
}

/** Never combine the previous hearing's metadata with a request for a different target. */
export function mergeHearingsIdentifiers(
  context: HearingsTelemetryIdentifiers,
  target: HearingsTelemetryIdentifiers
): HearingsTelemetryIdentifiers {
  const previous = hearingTelemetryIdentifiers(context);
  const next = hearingTelemetryIdentifiers(target);
  return (previous.caseId && next.caseId && previous.caseId !== next.caseId) ||
    (previous.hearingId && next.hearingId && previous.hearingId !== next.hearingId)
    ? next
    : { ...previous, ...next };
}

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
