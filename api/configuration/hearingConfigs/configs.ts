import { previewHearingJurisdictions, previewEnableHearingAmendments } from './preview';
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
        hearingJurisdictions: previewHearingJurisdictions,
        hearingAmendment: previewEnableHearingAmendments
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
