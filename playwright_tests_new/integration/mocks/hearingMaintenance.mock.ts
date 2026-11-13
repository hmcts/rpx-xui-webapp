import type { HearingsMockRoutesConfig } from '../helpers/hearingsMockRoutes.helper';
import { hearingManagerRoles } from '../helpers/hearingJourneySetup.helper';
import { HEARINGS_CASE_REFERENCE, LISTED_HEARING_SCENARIO, buildHearingsListMock } from './hearings.mock';

export const MAINTENANCE_GROUP_ID = 'g-maintenance-101';
export const OTHER_GROUP_ID = 'g-unrelated-202';
export const OTHER_HEARING_ID = '1705614528999';
export const LINKED_HEARING_ID = '1705614528222';
export const LINKED_CASE_REFERENCE = '2222333344445555';
export const maintenanceHearings = [
  { ...LISTED_HEARING_SCENARIO, hearingIsLinkedFlag: true, hearingGroupRequestId: MAINTENANCE_GROUP_ID },
  { ...LISTED_HEARING_SCENARIO, hearingId: OTHER_HEARING_ID, hearingIsLinkedFlag: true, hearingGroupRequestId: OTHER_GROUP_ID },
];
export const originalGroup = {
  groupDetails: { groupLinkType: 'Ordered' },
  hearingsInGroup: [
    { hearingId: LISTED_HEARING_SCENARIO.hearingId, hearingOrder: 1 },
    { hearingId: LINKED_HEARING_ID, hearingOrder: 2 },
  ],
};
export const reorderedGroup = {
  groupDetails: { groupLinkType: 'Ordered' },
  hearingsInGroup: [
    { hearingId: LISTED_HEARING_SCENARIO.hearingId, hearingOrder: 2 },
    { hearingId: LINKED_HEARING_ID, hearingOrder: 1 },
  ],
};
export const maintenanceLinkedCases = [
  {
    caseRef: HEARINGS_CASE_REFERENCE,
    caseName: 'Maintenance primary',
    reasonsForLink: ['CLRC017'],
    caseHearings: [
      {
        hearingID: LISTED_HEARING_SCENARIO.hearingId,
        hearingType: 'ABA5-LISTED',
        hearingIsLinkedFlag: true,
        hearingGroupRequestId: MAINTENANCE_GROUP_ID,
        exuiDisplayStatus: 'LISTED',
        isSelected: false,
      },
    ],
  },
  {
    caseRef: LINKED_CASE_REFERENCE,
    caseName: 'Maintenance partner',
    reasonsForLink: ['CLRC017'],
    caseHearings: [
      {
        hearingID: LINKED_HEARING_ID,
        hearingType: 'ABA5-LISTED',
        hearingIsLinkedFlag: true,
        hearingGroupRequestId: MAINTENANCE_GROUP_ID,
        exuiDisplayStatus: 'LISTED',
        isSelected: false,
      },
    ],
  },
];

export function maintenanceRouteConfig(): HearingsMockRoutesConfig & {
  hearingsApiOverrides: NonNullable<HearingsMockRoutesConfig['hearingsApiOverrides']>;
} {
  return {
    userRoles: hearingManagerRoles,
    hearings: maintenanceHearings,
    caseConfig: { jurisdictionId: 'SSCS', caseTypeId: 'Benefit' },
    enabledCaseVariations: [{ jurisdiction: 'SSCS', caseType: 'Benefit' }],
    amendmentCaseVariations: [{ jurisdiction: 'CIVIL', caseType: 'CIVIL' }],
    hearingsApiOverrides: {
      getLinkedHearingGroup: { body: originalGroup },
      loadServiceLinkedCases: {
        body: [{ caseReference: LINKED_CASE_REFERENCE, caseName: 'Maintenance partner', reasonsForLink: ['CLRC017'] }],
      },
      loadLinkedCasesWithHearings: { body: maintenanceLinkedCases },
    },
  };
}

export const cancelledReadback = buildHearingsListMock(
  [{ ...maintenanceHearings[0], hmcStatus: 'CANCELLED' }, maintenanceHearings[1]],
  { jurisdictionId: 'SSCS', caseTypeId: 'Benefit' }
);
