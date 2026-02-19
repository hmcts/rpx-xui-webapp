export const FIND_CASE_JURISDICTION_LABEL = 'Public Law';
export const FIND_CASE_CASE_TYPE_LABEL = 'Public Law Applications';

export function buildFindCaseJurisdictionsMock() {
  return [
    {
      id: 'PUBLICLAW',
      name: FIND_CASE_JURISDICTION_LABEL,
      caseTypes: [
        {
          id: 'PRLAPPS',
          name: FIND_CASE_CASE_TYPE_LABEL,
          states: [
            {
              id: 'CaseCreated',
              name: 'Case created',
            },
          ],
        },
      ],
    },
  ];
}

export function buildFindCaseWorkBasketInputsMock() {
  const caseReferenceInput = {
    label: 'Case Reference Number',
    order: 1,
    field: {
      id: '[CASE_REFERENCE]',
      elementPath: null,
      metadata: true,
      field_type: {
        id: 'Number',
        type: 'Number',
        min: null,
        max: null,
        regular_expression: null,
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: null,
      },
      show_condition: null,
    },
    display_context_parameter: null,
  };

  return {
    workbasketInputs: [caseReferenceInput],
    searchInputs: [caseReferenceInput],
  };
}

export function buildFindCaseSearchResultsMock(caseReference: string) {
  const textFieldType = {
    id: 'Text',
    type: 'Text',
    min: null,
    max: null,
    regular_expression: null,
    fixed_list_items: [],
    complex_fields: [],
    collection_field_type: null,
  };

  return {
    columns: [
      {
        label: 'Case reference',
        order: 1,
        metadata: true,
        case_field_id: '[CASE_REFERENCE]',
        case_field_type: textFieldType,
        display_context_parameter: null,
      },
      {
        label: 'Case name',
        order: 2,
        metadata: false,
        case_field_id: 'caseNameHmctsInternal',
        case_field_type: textFieldType,
        display_context_parameter: null,
      },
      {
        label: 'State',
        order: 3,
        metadata: true,
        case_field_id: '[STATE]',
        case_field_type: textFieldType,
        display_context_parameter: null,
      },
    ],
    results: [
      {
        case_id: caseReference,
        supplementary_data: null,
        case_fields: {
          '[CASE_REFERENCE]': caseReference,
          caseNameHmctsInternal: 'Integration test family case',
          '[STATE]': 'CaseCreated',
          '[JURISDICTION]': 'PUBLICLAW',
          '[CASE_TYPE]': 'PRLAPPS',
          '[LAST_MODIFIED_DATE]': new Date().toISOString(),
        },
        case_fields_formatted: {
          '[CASE_REFERENCE]': caseReference,
          caseNameHmctsInternal: 'Integration test family case',
          '[STATE]': 'CaseCreated',
          '[JURISDICTION]': 'PUBLICLAW',
          '[CASE_TYPE]': 'PRLAPPS',
          '[LAST_MODIFIED_DATE]': new Date().toISOString(),
        },
      },
    ],
    total: 1,
  };
}

export function buildFindCaseEmptySearchResultsMock() {
  return {
    columns: [],
    results: [],
    total: 0,
  };
}

export function buildFindCaseCaseDetailsMock(caseReference: string) {
  return {
    case_id: caseReference,
    case_type: {
      id: 'PRLAPPS',
      name: FIND_CASE_CASE_TYPE_LABEL,
      jurisdiction: {
        id: 'PUBLICLAW',
        name: FIND_CASE_JURISDICTION_LABEL,
      },
    },
    state: {
      id: 'CaseCreated',
      name: 'Case created',
    },
    metadataFields: [
      {
        id: '[CASE_REFERENCE]',
        value: Number(caseReference),
      },
      {
        id: '[JURISDICTION]',
        value: 'PUBLICLAW',
      },
      {
        id: '[CASE_TYPE]',
        value: 'PRLAPPS',
      },
    ],
    tabs: [],
    triggers: [
      {
        id: 'updateCase',
        name: 'Update case',
      },
    ],
  };
}

/**
 * Extracts a 16-digit case reference from Find Case search payload.
 *
 * **Why Complex**: CCD API returns inconsistent payload structures across different endpoints:
 * - Direct field: `{ caseReference: "1234567890123456" }`
 * - Nested object: `{ search: { filters: [{ id: "[CASE_REFERENCE]", value: "1234..." }] } }`
 * - Array wrapping: `[{ caseReference: "1234..." }]`
 *
 * This function handles all observed variants via recursive traversal with fallback to regex extraction.
 * The complexity is necessary for robust test mocking across multiple CCD endpoints.
 *
 * @param payload - Unknown payload structure from CCD API
 * @returns 16-digit case reference string or undefined if not found
 */
// NOSONAR typescript:S3776 - Cognitive complexity 18 justified by CCD API payload variance
export function getCaseReferenceFromFindCaseSearchPayload(payload: unknown): string | undefined {
  const caseReferenceFromKnownKeys = findCaseReferenceInPayload(payload);
  if (caseReferenceFromKnownKeys) {
    return caseReferenceFromKnownKeys;
  }

  const payloadJson = safeJsonStringify(payload);
  return payloadJson ? extractSixteenDigitCaseReference(payloadJson) : undefined;
}

function findCaseReferenceInPayload(payload: unknown): string | undefined {
  if (Array.isArray(payload)) {
    return findCaseReferenceInArray(payload);
  }

  if (!payload || typeof payload !== 'object') {
    return undefined;
  }

  return findCaseReferenceInObject(payload as Record<string, unknown>);
}

function findCaseReferenceInArray(arr: unknown[]): string | undefined {
  for (const value of arr) {
    const foundValue = findCaseReferenceInPayload(value);
    if (foundValue) {
      return foundValue;
    }
  }
  return undefined;
}

function findCaseReferenceInObject(payloadRecord: Record<string, unknown>): string | undefined {
  const directMatch = findDirectCaseReferenceInObject(payloadRecord);
  if (directMatch) {
    return directMatch;
  }

  const nestedMatch = findNestedCaseReferenceInObject(payloadRecord);
  if (nestedMatch) {
    return nestedMatch;
  }

  return undefined;
}

function findDirectCaseReferenceInObject(payloadRecord: Record<string, unknown>): string | undefined {
  for (const [key, value] of Object.entries(payloadRecord)) {
    if (!isCaseReferenceIdentifier(key)) {
      continue;
    }

    const normalizedCaseReference = normalizeCaseReferenceValue(value);
    if (normalizedCaseReference) {
      return normalizedCaseReference;
    }
  }

  if (typeof payloadRecord.id === 'string' && isCaseReferenceIdentifier(payloadRecord.id) && 'value' in payloadRecord) {
    const normalizedCaseReference = normalizeCaseReferenceValue(payloadRecord.value);
    if (normalizedCaseReference) {
      return normalizedCaseReference;
    }
  }

  return undefined;
}

function findNestedCaseReferenceInObject(payloadRecord: Record<string, unknown>): string | undefined {
  for (const value of Object.values(payloadRecord)) {
    const foundValue = findCaseReferenceInPayload(value);
    if (foundValue) {
      return foundValue;
    }
  }
  return undefined;
}

function isCaseReferenceIdentifier(identifier: string): boolean {
  const normalizedIdentifier = normalizeIdentifier(identifier);
  return normalizedIdentifier === 'casereference' || normalizedIdentifier === 'ccdcasereference';
}

function normalizeIdentifier(value: string): string {
  return value.replaceAll(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

function normalizeCaseReferenceValue(value: unknown): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value === 'string') {
    return extractSixteenDigitCaseReference(value);
  }

  if (typeof value === 'number') {
    return extractSixteenDigitCaseReference(String(value));
  }

  if (typeof value === 'object') {
    try {
      const stringValue = JSON.stringify(value);
      return extractSixteenDigitCaseReference(stringValue);
    } catch {
      return undefined;
    }
  }

  // Handle other primitive types (boolean, symbol, bigint, function)
  // Case references should not be in these types, return undefined
  return undefined;
}

function extractSixteenDigitCaseReference(value: string): string | undefined {
  const pattern = /\d{16}/;
  const match = pattern.exec(value);
  return match ? match[0] : undefined;
}

function safeJsonStringify(value: unknown): string | undefined {
  try {
    return JSON.stringify(value);
  } catch {
    return undefined;
  }
}
