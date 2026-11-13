import type { HearingsMockRoutesConfig } from '../helpers/hearingsMockRoutes.helper';
import { AWAITING_LISTING_HEARING_SCENARIO, LISTED_HEARING_SCENARIO, UPDATE_REQUESTED_HEARING_SCENARIO } from './hearings.mock';

export const DWP_LISTED_HEARING = { ...LISTED_HEARING_SCENARIO, hearingType: 'BBA3-LISTED' };
export const DWP_NON_LISTED_HEARINGS = [
  { ...AWAITING_LISTING_HEARING_SCENARIO, hearingType: 'BBA3-AWAITING' },
  { ...UPDATE_REQUESTED_HEARING_SCENARIO, hearingType: 'BBA3-UPDATE' },
];

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
