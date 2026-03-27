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

export function buildCaseListMock(rowCount: number = 2) {
  const columns = [
    {
      label: 'Case reference',
      order: 1,
      metadata: true,
      case_field_id: '[CASE_REFERENCE]',
      case_field_type: {
        id: 'Text',
        type: 'Text',
        min: null,
        max: null,
        regular_expression: null,
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: null,
      },
      display_context_parameter: null,
    },
    {
      label: 'Text Field 0',
      order: 2,
      metadata: false,
      case_field_id: 'TextField0',
      case_field_type: {
        id: 'Text',
        type: 'Text',
        min: null,
        max: null,
        regular_expression: null,
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: null,
      },
      display_context_parameter: null,
    },
    {
      label: 'Text Field 1',
      order: 3,
      metadata: false,
      case_field_id: 'TextField1',
      case_field_type: {
        id: 'Text',
        type: 'Text',
        min: null,
        max: null,
        regular_expression: null,
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: null,
      },
      display_context_parameter: null,
    },
    {
      label: 'Text Field 2',
      order: 4,
      metadata: false,
      case_field_id: 'TextField2',
      case_field_type: {
        id: 'Text',
        type: 'Text',
        min: null,
        max: null,
        regular_expression: null,
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: null,
      },
      display_context_parameter: null,
    },
  ];

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

export function buildCaseListSubmittedStateWorkbasketInputsMock() {
  return {
    workbasketInputs: [],
    searchInputs: [],
  };
}

export function buildCaseListMockWithOptionalFields(rowCount: number = 2) {
  const columns = [
    {
      label: 'Case reference',
      order: 1,
      metadata: true,
      case_field_id: '[CASE_REFERENCE]',
      case_field_type: {
        id: 'Text',
        type: 'Text',
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: null,
      },
      display_context_parameter: null,
    },
    {
      label: 'Text Field 0',
      order: 2,
      metadata: false,
      case_field_id: 'TextField0',
      case_field_type: {
        id: 'Text',
        type: 'Text',
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: null,
      },
      display_context_parameter: null,
    },
    {
      label: 'Text Field 1',
      order: 3,
      metadata: false,
      case_field_id: 'TextField1',
      case_field_type: {
        id: 'Text',
        type: 'Text',
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: null,
      },
      display_context_parameter: null,
    },
    {
      label: 'Text Field 2',
      order: 4,
      metadata: false,
      case_field_id: 'TextField2',
      case_field_type: {
        id: 'Text',
        type: 'Text',
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: null,
      },
      display_context_parameter: null,
    },
  ];

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

    const emptyOptionalFieldValue = '';
    const maybeEmptyValue = (value: string) => (faker.datatype.boolean() ? value : emptyOptionalFieldValue);

    return {
      case_id: caseReference,
      supplementary_data: null,
      case_fields: {
        TextField0: maybeEmptyValue(faker.lorem.word()),
        '[STATE]': 'CaseCreated',
        '[SECURITY_CLASSIFICATION]': emptyOptionalFieldValue,
        '[JURISDICTION]': 'DIVORCE',
        '[LAST_STATE_MODIFIED_DATE]': lastStateModifiedDate.toISOString(),
        '[CREATED_DATE]': emptyOptionalFieldValue,
        TextField2: maybeEmptyValue(faker.lorem.word()),
        '[CASE_TYPE]': 'xuiTestJurisdiction',
        TextField1: maybeEmptyValue(faker.lorem.word()),
        '[CASE_REFERENCE]': caseReference,
        '[LAST_MODIFIED_DATE]': emptyOptionalFieldValue,
      },
    };
  });

  return {
    columns,
    results,
    total: rowCount,
  };
}

export default buildCaseListMock;
