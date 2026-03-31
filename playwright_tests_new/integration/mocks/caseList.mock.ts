import { faker } from '@faker-js/faker';

export const CASE_LIST_SUBMITTED_STATE_JURISDICTION_ID = 'PUBLICLAW';
export const CASE_LIST_SUBMITTED_STATE_JURISDICTION_LABEL = 'Public Law';
export const CASE_LIST_SUBMITTED_STATE_CASE_TYPE_ID = 'CARE_SUPERVISION_EPO';
export const CASE_LIST_SUBMITTED_STATE_CASE_TYPE_LABEL = 'Public Law Applications';
export const CASE_LIST_SUBMITTED_STATE_OPTIONS = [
  'Open',
  'Submitted',
  'Gatekeeping',
  'Gatekeeping Listing',
  'Case management',
  'Final hearing',
  'Closed',
  'Returned',
];

function buildTextFieldType() {
  return {
    id: 'Text',
    type: 'Text',
    min: null,
    max: null,
    regular_expression: null,
    fixed_list_items: [],
    complex_fields: [],
    collection_field_type: null,
  };
}

function buildFixedListFieldType(id: string, type: 'FixedList' | 'MultiSelectList', options: string[]) {
  return {
    id,
    type,
    min: null,
    max: null,
    regular_expression: null,
    fixed_list_items: options.map((option, index) => ({
      code: option,
      label: option,
      order: index + 1,
    })),
    complex_fields: [],
    collection_field_type: null,
  };
}

function buildWorkbasketInput(
  label: string,
  id: string,
  fieldType: ReturnType<typeof buildTextFieldType | typeof buildFixedListFieldType>
) {
  return {
    label,
    order: 1,
    field: {
      id,
      elementPath: null,
      metadata: false,
      field_type: fieldType,
      show_condition: null,
    },
    display_context_parameter: null,
  };
}

function buildCaseListColumns() {
  return [
    {
      label: 'Case reference',
      order: 1,
      metadata: true,
      case_field_id: '[CASE_REFERENCE]',
      case_field_type: buildTextFieldType(),
      display_context_parameter: null,
    },
    {
      label: 'Text Field 0',
      order: 2,
      metadata: false,
      case_field_id: 'TextField0',
      case_field_type: buildTextFieldType(),
      display_context_parameter: null,
    },
    {
      label: 'Text Field 1',
      order: 3,
      metadata: false,
      case_field_id: 'TextField1',
      case_field_type: buildTextFieldType(),
      display_context_parameter: null,
    },
    {
      label: 'Text Field 2',
      order: 4,
      metadata: false,
      case_field_id: 'TextField2',
      case_field_type: buildTextFieldType(),
      display_context_parameter: null,
    },
  ];
}

export function buildCaseListMock(rowCount: number = 2) {
  const columns = buildCaseListColumns();

  const maxResults = 25;
  const now = new Date();
  const results = Array.from({ length: Math.min(rowCount, maxResults) }, () => {
    const caseReference = `#${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int({ min: 1000, max: 9999 })}`;

    // Generate dates: created < last state modified < last modified
    const createdDate = faker.date.between({
      from: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      to: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
    });
    const lastStateModifiedDate = faker.date.between({
      from: createdDate,
      to: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
    });
    const lastModifiedDate = faker.date.between({ from: lastStateModifiedDate, to: now });

    return {
      case_id: caseReference,
      supplementary_data: null,
      case_fields: {
        TextField0: faker.lorem.word(),
        '[STATE]': 'CaseCreated',
        '[SECURITY_CLASSIFICATION]': 'PUBLIC',
        '[JURISDICTION]': 'DIVORCE',
        '[LAST_STATE_MODIFIED_DATE]': lastStateModifiedDate.toISOString(),
        '[CREATED_DATE]': createdDate.toISOString(),
        TextField2: faker.lorem.word(),
        '[CASE_TYPE]': 'xuiTestJurisdiction',
        TextField1: faker.lorem.word(),
        '[CASE_REFERENCE]': caseReference,
        '[LAST_MODIFIED_DATE]': lastModifiedDate.toISOString(),
      },
    };
  });

  return {
    columns,
    results,
    total: rowCount,
  };
}

export function buildCaseListMockForPage(totalResults: number, pageNumber: number, pageSize: number = 25) {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = Math.min(totalResults, pageNumber * pageSize);
  const rowCount = Math.max(endIndex - startIndex, 0);
  const mock = buildCaseListMock(rowCount);
  mock.total = totalResults;
  return mock;
}

export function buildCaseListMockForState(state: string) {
  const normalizedState = state === 'Any' ? 'Any' : state;
  const mock = buildCaseListMock(25);

  mock.results.forEach((result) => {
    result.case_fields['[STATE]'] = normalizedState === 'Any' ? 'CaseCreated' : normalizedState;
    result.case_fields['[JURISDICTION]'] = CASE_LIST_SUBMITTED_STATE_JURISDICTION_ID;
    result.case_fields['[CASE_TYPE]'] = CASE_LIST_SUBMITTED_STATE_CASE_TYPE_ID;
  });

  mock.total = 100;
  return mock;
}

function applyOptionalFieldOverrides<T extends { results: Array<{ case_fields: Record<string, string> }> }>(mock: T): T {
  if (mock.results[0]) {
    mock.results[0].case_fields.TextField0 = '';
    mock.results[0].case_fields['[SECURITY_CLASSIFICATION]'] = '';
  }

  if (mock.results[1]) {
    mock.results[1].case_fields.TextField1 = '';
    mock.results[1].case_fields['[CREATED_DATE]'] = '';
  }

  if (mock.results[2]) {
    mock.results[2].case_fields.TextField2 = '';
    mock.results[2].case_fields['[LAST_MODIFIED_DATE]'] = '';
  }

  return mock;
}

export function buildCaseListJurisdictionsMock() {
  return [
    {
      id: 'DIVORCE',
      name: 'Family Divorce',
      caseTypes: [
        {
          id: 'xuiTestJurisdiction',
          name: 'XUI Case PoC',
          states: [
            {
              id: 'CaseCreated',
              name: 'Case Created',
            },
          ],
        },
      ],
    },
  ];
}

export function buildCaseListSubmittedStateJurisdictionsMock() {
  return [
    {
      id: CASE_LIST_SUBMITTED_STATE_JURISDICTION_ID,
      name: CASE_LIST_SUBMITTED_STATE_JURISDICTION_LABEL,
      caseTypes: [
        {
          id: CASE_LIST_SUBMITTED_STATE_CASE_TYPE_ID,
          name: CASE_LIST_SUBMITTED_STATE_CASE_TYPE_LABEL,
          states: CASE_LIST_SUBMITTED_STATE_OPTIONS.map((state) => ({
            id: state,
            name: state,
          })),
        },
      ],
    },
  ];
}

export function buildCaseListStateFilterInputsMock() {
  const stateInput = buildWorkbasketInput(
    'State',
    'state',
    buildFixedListFieldType('FixedList-state', 'FixedList', ['Any', ...CASE_LIST_SUBMITTED_STATE_OPTIONS])
  );
  const textFieldInput = buildWorkbasketInput('Case name', 'TextField0', buildTextFieldType());
  const regionInput = buildWorkbasketInput(
    'DFJ Area',
    'DfjArea',
    buildFixedListFieldType('FixedList-dfj-area', 'FixedList', ['North', 'South'])
  );
  const localAuthorityInput = buildWorkbasketInput(
    'Local authority',
    'LocalAuthority',
    buildFixedListFieldType('MultiSelectList-local-authority', 'MultiSelectList', ['Authority 1', 'Authority 2'])
  );

  return {
    workbasketInputs: [textFieldInput, stateInput, regionInput, localAuthorityInput],
    searchInputs: [textFieldInput, stateInput, regionInput, localAuthorityInput],
  };
}

export function buildCaseListMockWithOptionalFields(rowCount: number = 2) {
  return applyOptionalFieldOverrides(buildCaseListMock(rowCount));
}

export function buildCaseListMockWithOptionalFieldsForPage(totalResults: number, pageNumber: number, pageSize: number = 25) {
  return applyOptionalFieldOverrides(buildCaseListMockForPage(totalResults, pageNumber, pageSize));
}

export default buildCaseListMock;
