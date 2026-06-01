import { resolveCcdCaseStateId, type CcdCaseDetails } from './test-setup/journeys/civilCaseJourneys';

type JsonRecord = Record<string, unknown>;
type DataLossNormalisationOptions = {
  ignoredFlagComment?: string;
};

export function isPageClosingError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes('Target page, context or browser has been closed') ||
    message.includes('Execution context was destroyed') ||
    message.includes('Test ended')
  );
}

function normalizeCellValue(value: string): string {
  return value.replaceAll(/\s+/g, ' ').trim().toLowerCase();
}

export function rowMatchesExpected(row: Record<string, string>, expected: Record<string, string>): boolean {
  return Object.entries(expected).every(([key, value]) => {
    return normalizeCellValue(row[key] ?? '') === normalizeCellValue(value);
  });
}

export function resolveCaseNumberFromPayload(payload: CcdCaseDetails): string | undefined {
  const candidate = payload.caseReference ?? payload.case_reference ?? payload.case_id ?? payload.id;
  return typeof candidate === 'string' || typeof candidate === 'number' ? String(candidate).replace(/\D/g, '') : undefined;
}

export function resolveCivilClaimantPartyName(payload: CcdCaseDetails): string | undefined {
  const caseData = resolveCaseDataPayload(payload);
  const applicant = caseData.applicant1 ?? findCivilClaimantPartyRecord(payload);
  if (!applicant || typeof applicant !== 'object') {
    return undefined;
  }

  return formatCivilPartyName(applicant as JsonRecord);
}

export function rawCivilDataLossAttachmentsEnabled(): boolean {
  return process.env.PW_CIVIL_DATA_LOSS_ATTACH_RAW_JSON === 'true' && !process.env.CI;
}

export function redactCaseReference(caseNumber: string): string {
  const digits = caseNumber.replace(/\D/g, '');
  if (digits.length <= 4) {
    return '****';
  }
  return `${'*'.repeat(Math.max(0, digits.length - 4))}${digits.slice(-4)}`;
}

export function normaliseCaseDataForDataLossComparison(value: unknown, options: DataLossNormalisationOptions = {}): unknown {
  if (Array.isArray(value)) {
    const normalised = value
      .map((entry) => normaliseCaseDataForDataLossComparison(entry, options))
      .filter((entry) => entry !== undefined);
    if (arrayOnlyContainedIgnoredCreatedFlag(value, normalised, options.ignoredFlagComment)) {
      return undefined;
    }
    return normalised;
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  const record = value as JsonRecord;
  if (objectIsIgnoredCreatedFlag(record, options.ignoredFlagComment) || objectLooksVolatileCaseViewField(record)) {
    return undefined;
  }

  const normalised: JsonRecord = {};
  for (const [key, entryValue] of Object.entries(record)) {
    if (isVolatileCaseMetadataKey(key)) {
      continue;
    }

    const cleanedValue = normaliseCaseDataForDataLossComparison(entryValue, options);
    if (cleanedValue !== undefined) {
      normalised[key] = cleanedValue;
    }
  }

  return normalised;
}

export function buildDataLossComparisonReport(options: {
  baselineCaseDetails: CcdCaseDetails;
  caseNumber: string;
  normalisedBaseline: unknown;
  normalisedUpdated: unknown;
  rawJsonAttached?: boolean;
  updatedCaseDetails: CcdCaseDetails;
}): string {
  const baselineDataKeys = Object.keys(resolveCaseDataPayload(options.baselineCaseDetails)).sort((a, b) => a.localeCompare(b));
  const updatedDataKeys = Object.keys(resolveCaseDataPayload(options.updatedCaseDetails)).sort((a, b) => a.localeCompare(b));
  const changedPaths = collectChangedPaths(options.normalisedBaseline, options.normalisedUpdated);
  const normalisedMatch = changedPaths.length === 0;

  return [
    '# Civil Create Case Flags Data Loss Report',
    '',
    `Case number: ${redactCaseReference(options.caseNumber)}`,
    '',
    '## Before Create Case Flags',
    '',
    `State: ${resolveCcdCaseStateId(options.baselineCaseDetails) ?? 'unknown'}`,
    `Top-level case data keys: ${baselineDataKeys.length}`,
    '',
    '## After Create Case Flags',
    '',
    `State: ${resolveCcdCaseStateId(options.updatedCaseDetails) ?? 'unknown'}`,
    `Top-level case data keys: ${updatedDataKeys.length}`,
    '',
    '## Comparison',
    '',
    `Normalised case data match: ${normalisedMatch ? 'Yes' : 'No'}`,
    '',
    'Ignored expected changes:',
    '- Case flag entry created by this test',
    '- CCD event history / case history entries',
    '- CCD last modified timestamps and trigger/action metadata',
    '',
    'Changed normalised paths:',
    ...(changedPaths.length > 0 ? changedPaths.map((change) => `- ${change}`) : ['- None']),
    '',
    options.rawJsonAttached
      ? 'Raw and normalised JSON snapshots are attached because PW_CIVIL_DATA_LOSS_ATTACH_RAW_JSON=true was set outside CI.'
      : 'Raw and normalised JSON snapshots are not attached; set PW_CIVIL_DATA_LOSS_ATTACH_RAW_JSON=true in a local run only if debugging requires them.',
    '',
  ].join('\n');
}

function isVolatileCaseMetadataKey(key: string): boolean {
  return [
    'actions',
    'case_history',
    'caseHistory',
    'created_date',
    'events',
    'event_history',
    'eventHistory',
    'last_modified',
    'last_state_modified_date',
    'modified_date',
    'security_classification',
    'supplementary_data',
    'triggers',
  ].includes(key);
}

function objectLooksVolatileCaseViewField(value: JsonRecord): boolean {
  const fieldType = value.field_type as JsonRecord | undefined;
  const fieldTypeName = typeof fieldType?.type === 'string' ? fieldType.type : undefined;
  if (fieldTypeName === 'CaseHistoryViewer') {
    return true;
  }

  const fieldIdentifier = [value.id, value.label]
    .filter((candidate): candidate is string => typeof candidate === 'string')
    .join(' ');
  return /case\s*history|event\s*history|last\s*modified|lastModified|modified_date|last_state_modified_date/i.test(
    fieldIdentifier
  );
}

function objectIsIgnoredCreatedFlag(value: JsonRecord, ignoredFlagComment: string | undefined): boolean {
  if (!ignoredFlagComment) {
    return false;
  }

  if (objectHasDirectStringValue(value, ignoredFlagComment)) {
    return true;
  }

  const collectionValue = value.value;
  return (
    collectionValue !== null &&
    typeof collectionValue === 'object' &&
    objectHasDirectStringValue(collectionValue as JsonRecord, ignoredFlagComment)
  );
}

function objectHasDirectStringValue(value: JsonRecord, expectedText: string): boolean {
  return Object.values(value).some((candidate) => typeof candidate === 'string' && candidate.includes(expectedText));
}

function arrayOnlyContainedIgnoredCreatedFlag(
  originalValue: unknown[],
  normalisedValue: unknown[],
  ignoredFlagComment: string | undefined
): boolean {
  if (!ignoredFlagComment) {
    return false;
  }

  if (originalValue.length === 0 || normalisedValue.length > 0) {
    return false;
  }

  return originalValue.every((entry) => {
    return entry !== null && typeof entry === 'object' && objectIsIgnoredCreatedFlag(entry as JsonRecord, ignoredFlagComment);
  });
}

function resolveCaseDataPayload(caseDetails: CcdCaseDetails): JsonRecord {
  const data = caseDetails.data ?? caseDetails.case_data;
  return data && typeof data === 'object' ? data : {};
}

function findCivilClaimantPartyRecord(value: unknown, visited = new WeakSet<object>()): JsonRecord | undefined {
  if (!value || typeof value !== 'object') {
    return undefined;
  }

  if (visited.has(value)) {
    return undefined;
  }
  visited.add(value);

  if (Array.isArray(value)) {
    for (const entry of value) {
      const match = findCivilClaimantPartyRecord(entry, visited);
      if (match) {
        return match;
      }
    }
    return undefined;
  }

  const record = value as JsonRecord;
  if (formatCivilPartyName(record) && recordLooksLikeClaimant1(record)) {
    return record;
  }

  for (const preferredKey of ['applicant1', 'value', 'formatted_value']) {
    const match = findCivilClaimantPartyRecord(record[preferredKey], visited);
    if (match) {
      return match;
    }
  }

  for (const [key, entryValue] of Object.entries(record)) {
    if (['applicant1', 'value', 'formatted_value'].includes(key)) {
      continue;
    }
    const match = findCivilClaimantPartyRecord(entryValue, visited);
    if (match) {
      return match;
    }
  }

  return formatCivilPartyName(record) ? record : undefined;
}

function recordLooksLikeClaimant1(record: JsonRecord): boolean {
  const flags = record.flags;
  if (!flags || typeof flags !== 'object' || Array.isArray(flags)) {
    return false;
  }

  const roleOnCase = (flags as JsonRecord).roleOnCase;
  return typeof roleOnCase === 'string' && /claimant\s*1/i.test(roleOnCase);
}

function formatCivilPartyName(record: JsonRecord): string | undefined {
  const name = [record.individualTitle, record.individualFirstName, record.individualLastName]
    .filter((part): part is string => typeof part === 'string' && part.trim().length > 0)
    .join(' ');
  return name || undefined;
}

function collectChangedPaths(before: unknown, after: unknown, path = '$', changes: string[] = []): string[] {
  if (changes.length >= 50 || Object.is(before, after)) {
    return changes;
  }

  if (Array.isArray(before) || Array.isArray(after)) {
    if (!Array.isArray(before) || !Array.isArray(after)) {
      changes.push(path);
      return changes;
    }
    if (before.length !== after.length) {
      changes.push(`${path}.length`);
    }
    for (let index = 0; index < Math.max(before.length, after.length); index += 1) {
      collectChangedPaths(before[index], after[index], `${path}[${index}]`, changes);
    }
    return changes;
  }

  if (before && after && typeof before === 'object' && typeof after === 'object') {
    const beforeRecord = before as JsonRecord;
    const afterRecord = after as JsonRecord;
    const keys = new Set([...Object.keys(beforeRecord), ...Object.keys(afterRecord)]);
    for (const key of keys) {
      collectChangedPaths(beforeRecord[key], afterRecord[key], `${path}.${key}`, changes);
    }
    return changes;
  }

  changes.push(path);
  return changes;
}
