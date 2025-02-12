import { testHearingJuristictions, testEnableHearingAmmendments } from './test';
import { aatHearingJuristictions, aatEnableHearingAmmendments } from './aat';
import { prodHearingJuristictions, prodEnableHearingAmmendment } from './prod';

export function setupHearingConfigs(environment){
  let config;
  switch (environment){
    case 'aat':
      config = {
        hearingJuristictions: aatHearingJuristictions,
        hearingAmmendment: aatEnableHearingAmmendments
      };
      break;
    case 'preview':
      config = {
        hearingJuristictions: testHearingJuristictions,
        hearingAmmendment: testEnableHearingAmmendments
      };
      break;
    default:
      config = {
        hearingJuristictions: prodHearingJuristictions,
        hearingAmmendment: prodEnableHearingAmmendment
      };
      break;
  }
  return config;
}
