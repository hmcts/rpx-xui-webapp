import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { HearingListStateData } from '../../models/hearingListStateData.model';
import * as fromHearingList from './hearing-list.reducer';

export interface State {
  hearingList: HearingListStateData;
  // hearingRequest: HearingRequestStateData;
}

export const reducers: ActionReducerMap<State> = {
  hearingList: fromHearingList.hearingListReducer,
  // hearingRequest: fromHearingRequest.hearingsReducer,
};

export const getHearingsFeatureState = createFeatureSelector<State>(
  'hearings'
);

export * from './hearing-list.reducer';
