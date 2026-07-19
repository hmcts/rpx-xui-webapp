export const PROBATE_FIND_CASE_JURISDICTION_LABEL = 'Probate';
export const PROBATE_FIND_CASE_CASE_TYPE_LABEL = 'Grant of Representation';

// TODO Clean this -Retained to get code 2 compile.
export const FIND_CASE_JURISDICTION_LABEL = 'Public Law';
export const FIND_CASE_CASE_TYPE_LABEL = 'Public Law Applications';

type FindCaseStateMock = { id: string; name: string };

type FindCaseTypeMock = {
  jurisdictionId: string;
  jurisdictionName: string;
  caseTypeId: string;
  caseTypeName: string;
  states: FindCaseStateMock[];
};

const FIND_CASE_TYPE_MOCKS: Record<string, FindCaseTypeMock> = {
  PROBATE: {
    jurisdictionId: 'PROBATE',
    jurisdictionName: PROBATE_FIND_CASE_JURISDICTION_LABEL,
    caseTypeId: 'Grant of Representation',
    caseTypeName: PROBATE_FIND_CASE_CASE_TYPE_LABEL,
    states: [
      { id: 'Draft', name: 'Draft' },
      { id: 'Submitted', name: 'Submitted' },
    ],
  },
  C100: {
    jurisdictionId: 'PRIVATELAW',
    jurisdictionName: 'Private Law',
    caseTypeId: 'C100',
    caseTypeName: 'C100 Application',
    states: [
      { id: 'Draft', name: 'Draft' },
      { id: 'Submitted', name: 'Submitted' },
    ],
  },
};

// Probate Jurisdiction
export function buildProbateFindCaseJurisdictionsMock(caseType: string = FIND_CASE_JURISDICTION_LABEL) {
  const config = FIND_CASE_TYPE_MOCKS[caseType];

  if (!config) {
    const known = Object.keys(FIND_CASE_TYPE_MOCKS).join(', ');
    throw new Error(`Unknown find-case caseType "${caseType}". Known: ${known}`);
  }

  return [
    {
      id: config.jurisdictionId,
      name: config.jurisdictionName,
      caseTypes: [
        {
          id: config.caseTypeId,
          name: config.caseTypeName,
          states: config.states.map((state) => ({ ...state })),
        },
      ],
    },
  ];
}

// PROBATE  WorkBasket Items
export function buildProbateFindCaseWorkBasketInputsMock() {
  const caseReferenceInput = {
    label: 'Case Reference',
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
  };

  const applicantForenameInput = {
    label: 'Applicant forename(s)',
    order: 2,
    field: {
      id: 'applicantForenames',
      elementPath: null,
      metadata: true,
      field_type: {
        id: 'Text',
        type: 'Text',
        min: null,
        max: null,
        regular_expression: null,
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: null,
      },
      show_condition: null,
    },
    dataType: null,
    display_context_parameter: null,
  };

  const handOffReason = {
    label: 'Handoff reason',
    order: 3,
    field: {
      id: 'boHandoffReasonList',
      elementPath: null,
      metadata: false,
      field_type: {
        id: 'boHandoffReasonList-6d281a9f-2360-43ec-a50d-5a0b6f2b1230',
        type: 'Collection',
        min: null,
        max: null,
        regular_expression: null,
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: {
          id: 'boHandoffReason',
          type: 'Complex',
          min: null,
          max: null,
          regular_expression: null,
          fixed_list_items: [],
          complex_fields: [
            {
              id: 'caseHandoffReason',
              label: 'Select a reason for Handoff',
              hidden: null,
              order: null,
              metadata: false,
              case_type_id: null,
              hint_text: null,
              field_type: {
                id: 'FixedList-handoffReasonFixedList',
                type: 'FixedList',
                min: null,
                max: null,
                regular_expression: null,
                fixed_list_items: [
                  {
                    code: 'ColligendaBona',
                    label: 'Ad Colligenda Bona',
                    order: '1',
                  },
                  {
                    code: 'ForeignWill',
                    label: 'Application to prove a foreign will',
                    order: '2',
                  },
                  {
                    code: 'RectifyWillCodicil',
                    label: 'Application to rectify a will or codicil',
                    order: '3',
                  },
                  {
                    code: 'CodicilMis',
                    label: 'Codicil mis-recital',
                    order: '4',
                  },
                  {
                    code: 'DeBonisNon',
                    label: 'De Bonis Non',
                    order: '5',
                  },
                  {
                    code: 'DoubleProbate',
                    label: 'Double Probate',
                    order: '6',
                  },
                  {
                    code: 'FiatWill',
                    label: 'Fiat Will',
                    order: '7',
                  },
                  {
                    code: 'ForeignDomicile',
                    label: 'Foreign Domicile',
                    order: '8',
                  },
                  {
                    code: 'HorizonScheme',
                    label: 'Horizon Scheme',
                    order: '9',
                  },
                  {
                    code: 'IBCA',
                    label: 'Infected Blood Compensation Authority (IBCA)',
                    order: '10',
                  },
                  {
                    code: 'IBIS',
                    label: 'Infected Blood Interim Scheme',
                    order: '11',
                  },
                  {
                    code: 'IncapacityRule35',
                    label: 'Incapacity under rule 35',
                    order: '12',
                  },
                  {
                    code: 'LeadingFollowing Grants',
                    label: 'Leading / following Grants',
                    order: '13',
                  },
                  {
                    code: 'LiteraryEstate',
                    label: 'Literary Estate',
                    order: '14',
                  },
                  {
                    code: 'LostWill',
                    label: 'Lost Will / Codicil',
                    order: '15',
                  },
                  {
                    code: 'MinorityInterest',
                    label: 'Minority Interest',
                    order: '16',
                  },
                  {
                    code: 'POA',
                    label: 'Power of Attorney (POA)',
                    order: '17',
                  },
                  {
                    code: 'ResealForeignGrant',
                    label: 'Reseal of Foreign Grant',
                    order: '18',
                  },
                  {
                    code: 'Section116',
                    label: 'Section 116 (Order to bypass prior entitlement)',
                    order: '19',
                  },
                  {
                    code: 'Spreadsheet',
                    label: 'Spreadsheet',
                    order: '20',
                  },
                  {
                    code: 'TrustCorporation',
                    label: 'Trust Corporation',
                    order: '21',
                  },
                  {
                    code: 'WillCodicilNotated',
                    label: 'Will or codicil to be notated',
                    order: '22',
                  },
                  {
                    code: 'WindrushScheme',
                    label: 'Windrush Scheme',
                    order: '23',
                  },
                  {
                    code: 'WitnessInterview',
                    label: 'Witness Interview',
                    order: '24',
                  },
                ],
                complex_fields: [],
                collection_field_type: null,
              },
              security_classification: 'PUBLIC',
              live_from: null,
              live_until: null,
              show_condition: null,
              complexACLs: [],
              display_context: null,
              display_context_parameter: null,
              retain_hidden_value: null,
              formatted_value: null,
              category_id: null,
            },
          ],
          collection_field_type: null,
        },
      },
      show_condition: null,
    },
    dataType: 'collection',
    display_context_parameter: null,
  };

  return {
    workbasketInputs: [caseReferenceInput, applicantForenameInput, handOffReason],
    searchInputs: [caseReferenceInput, applicantForenameInput, handOffReason],
  };
}
