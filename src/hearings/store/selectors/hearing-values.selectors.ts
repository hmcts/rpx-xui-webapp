import { createSelector } from '@ngrx/store';
import { PartyUnavailabilityRange } from 'src/hearings/models/partyUnavilabilityRange.model';

import * as fromFeature from '../reducers';

export const getHearingValues = createSelector(
  fromFeature.getHearingsFeatureState,
  (state: fromFeature.State) => state.hearingValues
);

export const getHearingValuesModel = createSelector(
  getHearingValues,
  fromFeature.hearingValuesModel
);

export const getHearingUnavailabilityList = createSelector(
  getHearingValuesModel,
  (hearingValues): PartyUnavailabilityRange[] => hearingValues && hearingValues.parties && hearingValues.parties.map(dates => dates.unavailability).flat()
);

export const getHearingValuesLastError = createSelector(
  getHearingValues,
  fromFeature.hearingRequestLastError
);
