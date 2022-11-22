import { CaseState, CaseType, Jurisdiction, SearchResultViewItem } from '@hmcts/ccd-case-ui-toolkit';

export const CASE_TYPE_1: CaseType = {
    id: 'CT0',
    name: 'Case type 0',
    description: '',
    states: [],
    events: [],
    case_fields: [],
    jurisdiction: null
};

export const CASE_TYPE_2: CaseType = {
    id: 'CT2',
    name: 'Case type 2',
    description: '',
    states: [],
    events: [],
    case_fields: [],
    jurisdiction: null
};

export const CASE_TYPE_3: CaseType = {
    name: 'Benefit',
    id: 'Benefit',
    description: '',
    states: [],
    events: [],
    case_fields: [],
    jurisdiction: null
};

export const JURISDICTION_1: Jurisdiction = {
    id: 'J1',
    name: 'Jurisdiction 1',
    description: '',
    caseTypes: [CASE_TYPE_1, CASE_TYPE_2]
};

export const SSCS: Jurisdiction = {
    id: 'J2',
    name: 'SSCS',
    description: '',
    caseTypes: [CASE_TYPE_3]
};

export const CASE_STATE_1: CaseState = {
    id: 'TEST_STATE',
    name: 'Test Case State',
    description: 'A test Case State'
};

export const mockedJurisdictions = {
    juristdiction1: JURISDICTION_1,
    juristdiction2: SSCS
};

export const mockedSearchFilters = {
    jurisdiction: {
        id: 'TEST',
    },
    metadataFields: {
        id: 'TEST',
    },
    caseType: {
        id: 'TEST',
    }
};

export const mockedSearchFiltersCaseState = {
    jurisdiction: {
        id: 'TEST',
    },
    metadataFields: {
        id: 'TEST',
    },
    caseType: {
        id: 'TEST',
    },
    caseState: {
        id: 'TEST',
    }
};

export const mockedSearchResultPayload: SearchResultViewItem[] = [
    {
        case_id: '1',
        case_fields: {}
    },
    {
        case_id: '2',
        case_fields: {}
    },
    {
        case_id: '3',
        case_fields: {}
    },
    {
        case_id: '4',
        case_fields: {}
    },
    {
        case_id: '5',
        case_fields: {}
    },
    {
        case_id: '6',
        case_fields: {}
    },
    {
        case_id: '7',
        case_fields: {}
    },
    {
        case_id: '8',
        case_fields: {}
    },
    {
        case_id: '9',
        case_fields: {}
    },
    {
        case_id: '10',
        case_fields: {}
    },
    {
        case_id: '11',
        case_fields: {}
    },
    {
        case_id: '12',
        case_fields: {}
    },
    {
        case_id: '13',
        case_fields: {}
    }
];

export const mockedSearchResultResult: SearchResultViewItem[] = [
    {
        case_id: '1',
        case_fields: {}
    },
    {
        case_id: '2',
        case_fields: {}
    },
    {
        case_id: '3',
        case_fields: {}
    },
    {
        case_id: '4',
        case_fields: {}
    },
    {
        case_id: '5',
        case_fields: {}
    },
    {
        case_id: '6',
        case_fields: {}
    },
    {
        case_id: '7',
        case_fields: {}
    },
    {
        case_id: '8',
        case_fields: {}
    },
    {
        case_id: '9',
        case_fields: {}
    },
    {
        case_id: '10',
        case_fields: {}
    }
];
