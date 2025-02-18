import { testHearingJurisdictions, testEnableHearingAmendments } from './test';
import { aatHearingJurisdictions, aatEnableHearingAmendments } from './aat';
import { prodHearingJurisdictions, prodEnableHearingAmendment } from './prod';

export function setupHearingConfigs(environment){
  let config;
  switch (environment){
    case 'aat':
      config = {
        hearingJurisdictions: aatHearingJurisdictions,
        hearingAmendment: aatEnableHearingAmendments
      };
      break;
    case 'preview':
      config = {
        hearingJurisdictions: testHearingJurisdictions,
        hearingAmendment: testEnableHearingAmendments
      };
      break;
    default:
      config = {
        hearingJurisdictions: prodHearingJurisdictions,
        hearingAmendment: prodEnableHearingAmendment
      };
      break;
  }
  return config;
}
