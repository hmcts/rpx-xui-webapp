import { TEST_CASE_REFERENCES } from '../testData';

/** Single source of truth: sourced from testData to avoid cross-file duplication */
export const VALID_SEARCH_CASE_REFERENCE = TEST_CASE_REFERENCES.QUICK_SEARCH_VALID;
export const INVALID_SEARCH_CASE_REFERENCE = TEST_CASE_REFERENCES.QUICK_SEARCH_INVALID;

export function buildSearchCaseJurisdictionsMock() {
  return [
    {
      id: 'PUBLICLAW',
      name: 'Public Law',
      caseTypes: [
        {
          id: 'CARE_SUPERVISION_EPO',
          name: 'Care and supervision',
          states: [
            {
              id: 'Open',
              name: 'Open',
            },
          ],
        },
      ],
    },
  ];
}

export function buildGlobalSearchServicesMock() {
  return [
    {
      serviceId: 'PUBLICLAW',
      serviceName: 'Public Law',
    },
  ];
}

export function buildGlobalSearchResultsMock(caseReference: string = VALID_SEARCH_CASE_REFERENCE) {
  return {
    resultInfo: {
      caseStartRecord: 1,
      casesReturned: 1,
      moreResultsToGo: false,
    },
    results: [
      {
        CCDCaseTypeId: 'CARE_SUPERVISION_EPO',
        CCDCaseTypeName: 'Care and supervision',
        CCDJurisdictionId: 'PUBLICLAW',
        CCDJurisdictionName: 'Public Law',
        HMCTSServiceId: 'PUBLICLAW',
        HMCTSServiceShortDescription: 'Public Law',
        baseLocationId: '765324',
        baseLocationName: 'Taylor House',
        caseManagementCategoryId: null,
        caseManagementCategoryName: null,
        caseNameHmctsInternal: 'Case Name Example',
        caseReference,
        otherReferences: null,
        processForAccess: null,
        regionId: '1',
        regionName: 'London',
        stateId: 'Open',
      },
    ],
  };
}

export function buildGlobalSearchNoResultsMock() {
  return {
    resultInfo: {
      caseStartRecord: 1,
      casesReturned: 0,
      moreResultsToGo: false,
    },
    results: [],
  };
}

export function buildCaseDetailsMock(caseReference: string = VALID_SEARCH_CASE_REFERENCE) {
  return {
    _links: {
      self: {
        href: `http://localhost:3000/data/internal/cases/${caseReference}`,
      },
    },
    case_id: caseReference,
    case_type: {
      id: 'CARE_SUPERVISION_EPO',
      name: 'Care and supervision',
      description: 'FPL case type for integration tests',
      jurisdiction: {
        id: 'PUBLICLAW',
        name: 'Public Law',
        description: 'Public law jurisdiction',
      },
      printEnabled: false,
    },
    tabs: [
      {
        id: 'caseSummary',
        label: 'Case summary',
        order: 1,
        fields: [
          {
            id: 'caseSummaryTabHeading',
            label: 'Case information',
            value: 'Case information',
            metadata: false,
            field_type: {
              id: 'Label',
              type: 'Label',
              fixed_list_items: [],
              complex_fields: [],
              collection_field_type: null,
              min: null,
              max: null,
              regular_expression: null,
            },
          },
        ],
      },
    ],
    metadataFields: [
      {
        id: '[CASE_REFERENCE]',
        label: 'Case Reference',
        value: Number(caseReference),
        metadata: true,
        field_type: {
          id: 'Text',
          type: 'Text',
          fixed_list_items: [],
          complex_fields: [],
          collection_field_type: null,
          min: null,
          max: null,
          regular_expression: null,
        },
      },
      {
        id: '[JURISDICTION]',
        label: 'Jurisdiction',
        value: 'PUBLICLAW',
        metadata: true,
        field_type: {
          id: 'Text',
          type: 'Text',
          fixed_list_items: [],
          complex_fields: [],
          collection_field_type: null,
          min: null,
          max: null,
          regular_expression: null,
        },
      },
      {
        id: '[CASE_TYPE]',
        label: 'Case Type',
        value: 'CARE_SUPERVISION_EPO',
        metadata: true,
        field_type: {
          id: 'Text',
          type: 'Text',
          fixed_list_items: [],
          complex_fields: [],
          collection_field_type: null,
          min: null,
          max: null,
          regular_expression: null,
        },
      },
    ],
    state: {
      id: 'Open',
      name: 'Open',
      description: 'Open case',
      title_display: '# ${[CASE_REFERENCE]}',
    },
    triggers: [
      {
        id: 'updateCase',
        name: 'Update case',
        description: 'Update case details',
        order: 1,
      },
    ],
  };
}
