import {HearingListEffects} from './hearing-list.effects';
import {HearingRefDataEffects} from './hearing-refdata.effects';
import {HearingRequestEffects} from './hearing-request.effects';
import {HearingValuesEffects} from './hearing-values.effects';

export const effects: any[] = [
  HearingListEffects,
  HearingValuesEffects,
  HearingRequestEffects,
  HearingRefDataEffects
];

export * from './hearing-list.effects';
export * from './hearing-request.effects';
export * from './hearing-values.effects';
export * from './hearing-refdata.effects';
