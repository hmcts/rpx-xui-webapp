export const GLOBAL_SEARCH_CASE_REFERENCE = '1111222233334444';
export const GLOBAL_SEARCH_NON_EXISTENT_CASE_REFERENCE = '9999888877776666';
export const GLOBAL_SEARCH_CASE_NAME = 'Care Proceedings - Child A';

export function buildGlobalSearchServicesMock() {
  return [
    {
      serviceId: 'PUBLICLAW',
      serviceName: 'Public Law',
    },
  ];
}

export function buildGlobalSearchJurisdictionsMock() {
  return [
    {
      id: 'PUBLICLAW',
      name: 'Public Law',
      caseTypes: [
        {
          id: 'PRLAPPS',
          name: 'Public Law Applications',
          states: [
            {
              id: 'Submitted',
              name: 'Submitted',
            },
          ],
        },
      ],
    },
  ];
}

export function buildGlobalSearchResultsMock() {
  return {
    resultInfo: {
      casesReturned: 1,
      moreResultsToGo: false,
    },
    results: [
      {
        CCDCaseTypeId: 'PRLAPPS',
        CCDCaseTypeName: 'Public Law Applications',
        CCDJurisdictionId: 'PUBLICLAW',
        CCDJurisdictionName: 'Public Law',
        HMCTSServiceId: 'ABA5',
        HMCTSServiceShortDescription: 'Public Law',
        baseLocationId: '231596',
        baseLocationName: 'Taylor House',
        caseManagementCategoryId: null,
        caseManagementCategoryName: null,
        caseNameHmctsInternal: GLOBAL_SEARCH_CASE_NAME,
        caseReference: GLOBAL_SEARCH_CASE_REFERENCE,
        otherReferences: [],
        processForAccess: 'NONE',
        regionId: null,
        regionName: null,
        stateId: 'Submitted',
      },
    ],
  };
}

export function buildGlobalSearchNoResultsMock() {
  return {
    resultInfo: {
      casesReturned: 0,
      moreResultsToGo: false,
    },
    results: [],
  };
}

export function buildGlobalSearchCaseDetailsMock(caseReference: string = GLOBAL_SEARCH_CASE_REFERENCE) {
  return {
    case_id: caseReference,
    case_type: {
      id: 'PRLAPPS',
      name: 'Public Law Applications',
      jurisdiction: {
        id: 'PUBLICLAW',
        name: 'Public Law',
      },
    },
    state: {
      id: 'Submitted',
      name: 'Submitted',
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
    tabs: [
      {
        id: 'caseSummary',
        label: 'Case summary',
        fields: [],
      },
    ],
    triggers: [
      {
        id: 'updateCase',
        name: 'Update case',
      },
    ],
  };
}
