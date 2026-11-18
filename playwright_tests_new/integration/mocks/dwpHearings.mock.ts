import type { HearingsMockRoutesConfig } from '../helpers/hearingsMockRoutes.helper';
import { AWAITING_LISTING_HEARING_SCENARIO, LISTED_HEARING_SCENARIO } from './hearings.mock';

export const DWP_LISTED_HEARING = { ...LISTED_HEARING_SCENARIO, hearingType: 'BBA3-LISTED' };
export const DWP_SECOND_LISTED_HEARING = {
  ...DWP_LISTED_HEARING,
  hearingId: '1705614528199',
  hearingType: 'BBA3-SECOND-LISTED',
  earliestHearingStartDateTime: '2024-03-14T10:00:00',
  hearingEndDateTime: '2024-03-14T12:00:00',
};
export const DWP_NON_LISTED_HEARINGS = [
  'HEARING_REQUESTED',
  'AWAITING_LISTING',
  'UPDATE_REQUESTED',
  'UPDATE_SUBMITTED',
  'EXCEPTION',
  'CANCELLATION_REQUESTED',
  'CANCELLATION_SUBMITTED',
  'AWAITING_ACTUALS',
  'CANCELLED',
  'COMPLETED',
  'ADJOURNED',
].map((hmcStatus, index) => ({
  ...AWAITING_LISTING_HEARING_SCENARIO,
  hearingId: String(1705614528107 + index),
  hmcStatus,
  hearingType: `BBA3-${hmcStatus}`,
}));

export const DWP_HEARINGS_CONFIG: HearingsMockRoutesConfig = {
  userRoles: [
    'caseworker',
    'caseworker-sscs',
    'caseworker-sscs-dwpresponsewriter',
    'cwd-user',
    'dwp',
    'listed-hearing-viewer',
    'sscs-dwp',
  ],
  caseConfig: { jurisdictionId: 'SSCS', caseTypeId: 'Benefit', serviceId: 'BBA3' },
  enabledCaseVariations: [{ jurisdiction: 'SSCS', caseType: 'Benefit' }],
  amendmentCaseVariations: [{ jurisdiction: 'SSCS', caseType: 'Benefit' }],
};
