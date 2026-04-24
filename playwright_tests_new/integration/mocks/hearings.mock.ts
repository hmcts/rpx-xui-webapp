import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { EXUISectionStatusEnum, HMCStatus } = require('../../../src/hearings/models/hearings.enum');
const { hearingStatusMappings } = require('../../../src/hearings/models/hearingStatusMappings');
const hearingsListTemplate = require('./fixtures/hearings/caseHearings.json');
const listedHearingTemplate = require('./fixtures/hearings/mock_HMC_setup.json');
const serviceHearingValuesTemplate = require('./fixtures/hearings/mock_SHV_setup.json');
const appConfigTemplate = require('../../../src/assets/config/config.json');
const headerConfigTemplate = require('./fixtures/hearings/baseConfig.js');
const hearingTestData = require('../../../src/hearings/hearing.test.data');

export const HEARINGS_CASE_REFERENCE = '1234567812345678';
export const HEARINGS_CASE_JURISDICTION = 'CIVIL';
export const HEARINGS_CASE_TYPE = 'CIVIL';
export const HEARINGS_LISTED_HEARING_ID = '1705614528106';
export const HEARINGS_AWAITING_LISTING_HEARING_ID = '1705614528107';
export const HEARINGS_UPDATE_REQUESTED_HEARING_ID = '1705614528108';
export const HEARINGS_SERVICE_ID = 'ABA5';
export const HEARINGS_LOCATION_ID = '827534';
export const HEARINGS_LOCATION_NAME = 'Aberystwyth Justice Centre';
export const HEARINGS_USER_ID = 'hearing-cr84-user';

type UnknownRecord = Record<string, unknown>;

export interface HearingsCaseVariation {
  jurisdiction: string;
  caseType: string;
}

export interface HearingsCaseConfig {
  caseReference?: string;
  jurisdictionId?: string;
  caseTypeId?: string;
  serviceId?: string;
  locationId?: string;
  locationName?: string;
}

export interface HearingScenario {
  hearingId: string;
  hmcStatus: string;
  hearingType?: string;
  earliestHearingStartDateTime?: string;
  hearingEndDateTime?: string;
  displayStatus?: string;
  hearingIsLinkedFlag?: boolean;
  hearingGroupRequestId?: string | null;
}

const DEFAULT_CASE_CONFIG: Required<HearingsCaseConfig> = {
  caseReference: HEARINGS_CASE_REFERENCE,
  jurisdictionId: HEARINGS_CASE_JURISDICTION,
  caseTypeId: HEARINGS_CASE_TYPE,
  serviceId: HEARINGS_SERVICE_ID,
  locationId: HEARINGS_LOCATION_ID,
  locationName: HEARINGS_LOCATION_NAME,
};

const DEFAULT_ENABLED_VARIATIONS: HearingsCaseVariation[] = [
  {
    jurisdiction: HEARINGS_CASE_JURISDICTION,
    caseType: HEARINGS_CASE_TYPE,
  },
];

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function withDefaults(caseConfig?: HearingsCaseConfig): Required<HearingsCaseConfig> {
  return {
    ...DEFAULT_CASE_CONFIG,
    ...caseConfig,
  };
}

function asFeatureVariations(variations: HearingsCaseVariation[]): Array<{ jurisdiction: string; includeCaseTypes: string[] }> {
  return variations.map((variation) => ({
    jurisdiction: variation.jurisdiction,
    includeCaseTypes: [variation.caseType],
  }));
}

function resolveStatusMapping(hmcStatus: string) {
  return hearingStatusMappings.find((statusMapping) => statusMapping.hmcStatus === hmcStatus);
}

function resolveDisplayStatus(scenario: HearingScenario): string {
  return scenario.displayStatus ?? resolveStatusMapping(scenario.hmcStatus)?.exuiDisplayStatus ?? scenario.hmcStatus;
}

function buildHearingDaySchedule(caseConfig: Required<HearingsCaseConfig>, scenario: HearingScenario) {
  return [
    {
      hearingStartDateTime: scenario.earliestHearingStartDateTime ?? '2024-02-13T10:00:00',
      hearingEndDateTime: scenario.hearingEndDateTime ?? '2024-02-13T12:00:00',
      hearingVenueId: caseConfig.locationId,
      hearingRoomId: 'Aberystwyth Courtroom 01',
      hearingJudgeId: '',
      panelMemberIds: [],
      attendees: [
        { hearingSubChannel: 'INTER', partyID: '1234-uytr-7654-asdf-0001' },
        { hearingSubChannel: 'INTER', partyID: '1234-uytr-7654-asdf-0002' },
      ],
      listAssistSessionID: null,
    },
  ];
}

export const LISTED_HEARING_SCENARIO: HearingScenario = {
  hearingId: HEARINGS_LISTED_HEARING_ID,
  hmcStatus: HMCStatus.LISTED,
  hearingType: 'ABA5-LISTED',
};

export const AWAITING_LISTING_HEARING_SCENARIO: HearingScenario = {
  hearingId: HEARINGS_AWAITING_LISTING_HEARING_ID,
  hmcStatus: HMCStatus.AWAITING_LISTING,
  hearingType: 'ABA5-AWAITING',
};

export const UPDATE_REQUESTED_HEARING_SCENARIO: HearingScenario = {
  hearingId: HEARINGS_UPDATE_REQUESTED_HEARING_ID,
  hmcStatus: HMCStatus.UPDATE_REQUESTED,
  hearingType: 'ABA5-UPDATE',
};

export function buildHearingsUserDetailsMock(roles: string[]) {
  return {
    sessionTimeout: {
      idleModalDisplayTime: 300,
      totalIdleTime: 900,
    },
    canShareCases: false,
    userInfo: {
      id: HEARINGS_USER_ID,
      uid: HEARINGS_USER_ID,
      forename: 'Playwright',
      surname: 'Hearings',
      email: 'playwright.hearings@justice.gov.uk',
      active: true,
      roleCategory: 'LEGAL_OPERATIONS',
      roles,
    },
    roleAssignmentInfo: [],
  };
}

export function buildHearingsAppConfigMock() {
  return deepClone(appConfigTemplate) as UnknownRecord;
}

export function buildHearingsEnvironmentConfigMock(options?: {
  enabledCaseVariations?: HearingsCaseVariation[];
  amendmentCaseVariations?: HearingsCaseVariation[];
}) {
  const enabledCaseVariations = options?.enabledCaseVariations ?? DEFAULT_ENABLED_VARIATIONS;
  const amendmentCaseVariations = options?.amendmentCaseVariations ?? DEFAULT_ENABLED_VARIATIONS;

  return {
    accessManagementEnabled: true,
    ccdGatewayUrl: 'http://localhost:3001',
    clientId: 'xui-webapp',
    idamWeb: 'https://idam-web-public.aat.platform.hmcts.net',
    judicialBookingApi: '/api/am',
    launchDarklyClientId: '5de6610b23ce5408280f2268',
    oAuthCallback: '/oauth2/callback',
    oidcEnabled: true,
    paymentReturnUrl: '',
    protocol: 'http',
    substantiveEnabled: false,
    waWorkflowApi: '/workallocation',
    headerConfig: deepClone(headerConfigTemplate),
    hearingJurisdictionConfig: {
      hearingJurisdictions: {
        '.*': asFeatureVariations(enabledCaseVariations),
      },
      hearingAmendment: {
        '.*': asFeatureVariations(amendmentCaseVariations),
      },
    },
  };
}

export function buildHearingsCaseDetailsMock(caseConfig?: HearingsCaseConfig) {
  const resolvedCase = withDefaults(caseConfig);

  return {
    _links: {
      self: {
        href: `http://localhost:3000/data/internal/cases/${resolvedCase.caseReference}`,
      },
    },
    case_id: resolvedCase.caseReference,
    case_type: {
      id: resolvedCase.caseTypeId,
      name: resolvedCase.caseTypeId,
      description: `${resolvedCase.caseTypeId} case type for hearings integration tests`,
      jurisdiction: {
        id: resolvedCase.jurisdictionId,
        name: resolvedCase.jurisdictionId,
        description: `${resolvedCase.jurisdictionId} jurisdiction`,
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
        value: Number(resolvedCase.caseReference),
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
        value: resolvedCase.jurisdictionId,
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
        value: resolvedCase.caseTypeId,
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

export function buildHearingsListMock(hearings: HearingScenario[] = [LISTED_HEARING_SCENARIO], caseConfig?: HearingsCaseConfig) {
  const resolvedCase = withDefaults(caseConfig);
  const payload = deepClone(hearingsListTemplate) as UnknownRecord;
  const caseHearings = payload.caseHearings as UnknownRecord[];
  const templateHearing = deepClone(caseHearings[0]) as UnknownRecord;

  payload.caseRef = resolvedCase.caseReference;
  payload.caseHearings = hearings.map((scenario) => {
    const hearing = deepClone(templateHearing) as UnknownRecord;
    const statusMapping = resolveStatusMapping(scenario.hmcStatus);

    hearing.hearingID = Number(scenario.hearingId);
    hearing.hmcStatus = scenario.hmcStatus;
    hearing.listAssistCaseStatus = scenario.hmcStatus;
    hearing.exuiDisplayStatus = resolveDisplayStatus(scenario);
    hearing.exuiSectionStatus = statusMapping?.exuiSectionStatus ?? EXUISectionStatusEnum.UPCOMING;
    hearing.hearingType = scenario.hearingType ?? 'ABA5-ABC';
    hearing.earliestHearingStartDateTime = scenario.earliestHearingStartDateTime ?? '2024-02-13T10:00:00';
    hearing.hearingDaySchedule = buildHearingDaySchedule(resolvedCase, scenario);
    hearing.hearingIsLinkedFlag = scenario.hearingIsLinkedFlag ?? false;
    hearing.hearingGroupRequestId = scenario.hearingGroupRequestId ?? null;

    return hearing;
  });
  payload.hmctsServiceID = resolvedCase.serviceId;
  payload.hmctsServiceCode = resolvedCase.serviceId;

  return payload;
}

export function buildHearingRequestMock(scenario: HearingScenario = LISTED_HEARING_SCENARIO, caseConfig?: HearingsCaseConfig) {
  const resolvedCase = withDefaults(caseConfig);
  const payload = deepClone(listedHearingTemplate) as UnknownRecord;
  const requestDetails = payload.requestDetails as UnknownRecord;
  const caseDetails = payload.caseDetails as UnknownRecord;
  const hearingDetails = payload.hearingDetails as UnknownRecord;
  const hearingResponse = payload.hearingResponse as UnknownRecord;

  requestDetails.hearingRequestID = scenario.hearingId;
  requestDetails.status = scenario.hmcStatus;
  caseDetails.caseRef = resolvedCase.caseReference;
  caseDetails.hmctsInternalCaseName = resolvedCase.caseReference;
  caseDetails.publicCaseName = 'Mock case public name';
  caseDetails.hmctsServiceCode = resolvedCase.serviceId;
  caseDetails.caseManagementLocationCode = resolvedCase.locationId;
  hearingDetails.hearingType = scenario.hearingType ?? 'ABA5-ABC';
  hearingDetails.hearingLocations = [
    {
      locationType: 'court',
      locationId: resolvedCase.locationId,
    },
  ];
  hearingResponse.laCaseStatus = scenario.hmcStatus;
  hearingResponse.listingStatus = scenario.hmcStatus === HMCStatus.LISTED ? 'FIXED' : 'DRAFT';
  hearingResponse.hearingDaySchedule = buildHearingDaySchedule(resolvedCase, scenario);

  return payload;
}

export function buildServiceHearingValuesMock(
  caseConfig?: HearingsCaseConfig,
  scenario: HearingScenario = LISTED_HEARING_SCENARIO
) {
  const resolvedCase = withDefaults(caseConfig);
  const payload = deepClone(serviceHearingValuesTemplate) as UnknownRecord;

  payload.hmctsServiceID = resolvedCase.serviceId;
  payload.hmctsInternalCaseName = resolvedCase.caseReference;
  payload.publicCaseName = 'Mock case public name';
  payload.caseDeepLink = `https://xui.example/cases/case-details/${resolvedCase.caseReference}`;
  payload.caseManagementLocationCode = resolvedCase.locationId;
  payload.hearingType = scenario.hearingType ?? 'ABA5-ABC';
  payload.hearingLocations = [
    {
      locationType: 'court',
      locationId: resolvedCase.locationId,
    },
  ];

  return payload;
}

export function buildLovRefDataMock(
  categoryKey?: string,
  options?: {
    hearingTypes?: string[];
    caseTypeId?: string;
  }
) {
  const scenarioHearingTypes = options?.hearingTypes ?? [LISTED_HEARING_SCENARIO.hearingType ?? 'ABA5-ABC'];
  const baselineHearingTypeItems = (hearingTestData.hearingStageRefData ?? [])
    .map((item: { key?: string; value_en?: string; value_cy?: string }) =>
      item.key
        ? {
            key: item.key,
            value_en: item.value_en ?? item.key,
            value_cy: item.value_cy ?? item.value_en ?? item.key,
          }
        : null
    )
    .filter((item): item is { key: string; value_en: string; value_cy: string } => item !== null);
  const additionalScenarioHearingTypeItems = scenarioHearingTypes
    .filter((hearingType) => !baselineHearingTypeItems.some((baselineType) => baselineType.key === hearingType))
    .map((hearingType) => ({ key: hearingType, value_en: hearingType, value_cy: hearingType }));
  const hearingTypeItems = [...baselineHearingTypeItems, ...additionalScenarioHearingTypeItems];
  const caseTypeId = options?.caseTypeId ?? HEARINGS_CASE_TYPE;
  const itemsByCategory: Record<string, Array<Record<string, unknown>>> = {
    HearingType: hearingTypeItems.map((hearingType, index) => ({
      key: hearingType.key,
      value_en: hearingType.value_en,
      value_cy: hearingType.value_cy,
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: index + 1,
      parent_key: null,
      category_key: 'HearingType',
      parent_category: null,
      active_flag: true,
      child_nodes: [],
    })),
    HearingPriority: [
      {
        key: 'Standard',
        value_en: 'Standard',
        value_cy: 'Standard',
        hint_text_en: '',
        hint_text_cy: '',
        lov_order: 1,
        parent_key: null,
        category_key: 'HearingPriority',
        parent_category: null,
        active_flag: true,
        child_nodes: [],
      },
    ],
    caseType: [
      {
        key: caseTypeId,
        value_en: caseTypeId,
        value_cy: caseTypeId,
        hint_text_en: '',
        hint_text_cy: '',
        lov_order: 1,
        parent_key: null,
        category_key: 'caseType',
        parent_category: null,
        active_flag: true,
        child_nodes: [],
      },
    ],
    Facilities: [],
    HearingChannel: [
      {
        key: 'INTER',
        value_en: 'In person',
        value_cy: 'In person',
        hint_text_en: '',
        hint_text_cy: '',
        lov_order: 1,
        parent_key: null,
        category_key: 'HearingChannel',
        parent_category: null,
        active_flag: true,
        child_nodes: [],
      },
      {
        key: 'VID',
        value_en: 'Video',
        value_cy: 'Video',
        hint_text_en: '',
        hint_text_cy: '',
        lov_order: 2,
        parent_key: null,
        category_key: 'HearingChannel',
        parent_category: null,
        active_flag: true,
        child_nodes: [],
      },
    ],
    HearingSubChannel: [
      {
        key: 'INTER',
        value_en: 'In person',
        value_cy: 'In person',
        hint_text_en: '',
        hint_text_cy: '',
        lov_order: 1,
        parent_key: null,
        category_key: 'HearingSubChannel',
        parent_category: null,
        active_flag: true,
        child_nodes: [],
      },
    ],
    ChangeReasons: [
      {
        key: 'reasonOne',
        value_en: 'Reason 1',
        value_cy: 'Reason 1',
        hint_text_en: 'Reason 1',
        hint_text_cy: 'Reason 1',
        lov_order: 1,
        parent_key: null,
        category_key: 'ChangeReasons',
        parent_category: null,
        active_flag: true,
        child_nodes: [],
      },
      {
        key: 'reasonTwo',
        value_en: 'Reason 2',
        value_cy: 'Reason 2',
        hint_text_en: 'Reason 2',
        hint_text_cy: 'Reason 2',
        lov_order: 2,
        parent_key: null,
        category_key: 'ChangeReasons',
        parent_category: null,
        active_flag: true,
        child_nodes: [],
      },
      {
        key: 'reasonThree',
        value_en: 'Reason 3',
        value_cy: 'Reason 3',
        hint_text_en: 'Reason 3',
        hint_text_cy: 'Reason 3',
        lov_order: 3,
        parent_key: null,
        category_key: 'ChangeReasons',
        parent_category: null,
        active_flag: true,
        child_nodes: [],
      },
    ],
    JudgeType: [],
    PanelMemberType: [],
  };

  return categoryKey ? (itemsByCategory[categoryKey] ?? []) : [];
}

export function buildCaseFlagsMock() {
  return {
    flags: [
      {
        FlagDetails: [],
      },
    ],
  };
}

export function buildCourtLocationMock(caseConfig?: HearingsCaseConfig) {
  const resolvedCase = withDefaults(caseConfig);

  return [
    {
      epimms_id: resolvedCase.locationId,
      court_name: resolvedCase.locationName,
      welsh_court_name: resolvedCase.locationName,
      region_id: '7',
      region: 'Wales',
    },
  ];
}

export function buildHearingActualsMock() {
  return deepClone(hearingTestData.hearingActualsMainModel) as UnknownRecord;
}

function resolveHearingLinks() {
  const initialState = hearingTestData.initialState as UnknownRecord;
  const hearingsState = (initialState.hearings ?? {}) as UnknownRecord;
  return (initialState.hearingLinks ?? hearingsState.hearingLinks ?? {}) as UnknownRecord;
}

export function buildServiceLinkedCasesMock() {
  const hearingLinks = resolveHearingLinks();
  return deepClone(hearingLinks.serviceLinkedCases ?? []);
}

export function buildLinkedCasesWithHearingsMock() {
  const hearingLinks = resolveHearingLinks();
  return deepClone(hearingLinks.serviceLinkedCasesWithHearings ?? []);
}

export function buildLinkedHearingGroupMock() {
  const hearingLinks = resolveHearingLinks();
  return deepClone(hearingLinks.linkedHearingGroup ?? { groupDetails: {}, hearingsInGroup: [] });
}

export function buildLinkedHearingGroupResponseMock() {
  return {
    hearingGroupRequestId: 'g100001',
  };
}
