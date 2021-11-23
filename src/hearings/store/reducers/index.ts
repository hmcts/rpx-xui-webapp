import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {HearingListStateData} from '../../models/hearingListStateData.model';
import {HearingRequestStateData} from '../../models/hearingRequestStateData.model';
import * as fromHearingList from './hearing-list.reducer';
import * as fromHearingRequest from './hearing-request.reducer';

export interface State {
  hearingList: HearingListStateData;
  hearingRequest: HearingRequestStateData;
}

export const reducers: ActionReducerMap<State> = {
  hearingList: fromHearingList.hearingListReducer,
  hearingRequest: fromHearingRequest.hearingRequestReducer,
};

export const getHearingsFeatureState = createFeatureSelector<State>(
  'hearings'
);

export * from './hearing-list.reducer';
export * from './hearing-request.reducer';
