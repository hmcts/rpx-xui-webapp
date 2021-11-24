import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {HearingListStateData} from '../../models/hearingListStateData.model';
import {HearingRequestStateData} from '../../models/hearingRequestStateData.model';
import {HearingValuesStateData} from '../../models/hearingValuesStateData';
import * as fromHearingList from './hearing-list.reducer';
import * as fromHearingRequest from './hearing-request.reducer';
import * as fromHearingValues from './hearing-values.reducer';

export interface State {
  hearingList: HearingListStateData;
  hearingValues: HearingValuesStateData;
  hearingRequest: HearingRequestStateData;
}

export const reducers: ActionReducerMap<State> = {
  hearingList: fromHearingList.hearingListReducer,
  hearingValues: fromHearingValues.hearingValuesReducer,
  hearingRequest: fromHearingRequest.hearingRequestReducer,
};

export const getHearingsFeatureState = createFeatureSelector<State>(
  'hearings'
);

export * from './hearing-list.reducer';
export * from './hearing-request.reducer';
export * from './hearing-values.reducer';
