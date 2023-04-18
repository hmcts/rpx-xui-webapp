import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { HearingActualsStateData } from '../../models/hearingActualsStateData.model';
import { HearingConditions } from '../../models/hearingConditions';
import { HearingLinksStateData } from '../../models/hearingLinksStateData.model';
import { HearingListStateData } from '../../models/hearingListStateData.model';
import { HearingRequestStateData } from '../../models/hearingRequestStateData.model';
import { HearingValuesStateData } from '../../models/hearingValuesStateData';
import * as fromHearingActuals from './hearing-actuals.reducer';
import * as fromHearingConditions from './hearing-conditions.reducer';
import * as fromHearingLinks from './hearing-links.reducer';
import * as fromHearingList from './hearing-list.reducer';
import * as fromHearingRequestToCompare from './hearing-request-to-compare.reducer';
import * as fromHearingRequest from './hearing-request.reducer';
import * as fromHearingValues from './hearing-values.reducer';

export interface State {
  hearingList: HearingListStateData;
  hearingValues: HearingValuesStateData;
  hearingRequestToCompare: HearingRequestStateData;
  hearingRequest: HearingRequestStateData;
  hearingConditions: HearingConditions;
  hearingActuals: HearingActualsStateData;
  hearingLinks: HearingLinksStateData;
}

export const reducers: ActionReducerMap<State> = {
  hearingList: fromHearingList.hearingListReducer,
  hearingValues: fromHearingValues.hearingValuesReducer,
  hearingRequestToCompare: fromHearingRequestToCompare.hearingRequestToCompareReducer,
  hearingRequest: fromHearingRequest.hearingRequestReducer,
  hearingConditions: fromHearingConditions.hearingConditionsReducer,
  hearingActuals: fromHearingActuals.hearingActualsReducer,
  hearingLinks: fromHearingLinks.hearingLinksReducer
};

export const getHearingsFeatureState = createFeatureSelector<State>(
  'hearings'
);

export * from './hearing-list.reducer';
export * from './hearing-request-to-compare.reducer';
export * from './hearing-request.reducer';
export * from './hearing-values.reducer';
export * from './hearing-conditions.reducer';
export * from './hearing-actuals.reducer';
export * from './hearing-links.reducer';
