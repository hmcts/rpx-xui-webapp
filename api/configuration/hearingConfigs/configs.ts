import { aatHearingJuristictions } from './aat';
import { prodHearingJuristictions } from './prod';
import { testHearingJuristictions } from './test';

export function setupHearingConfigs(environment){
  let config;
  switch (environment){
    case 'prod':
      config = prodHearingJuristictions;
      break;
    case 'aat':
      config = aatHearingJuristictions;
      break;
    case 'preview':
      config = testHearingJuristictions;
      break;
    default:
      config = prodHearingJuristictions;
      break;
  }
  return config;
}
