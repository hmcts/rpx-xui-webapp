import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { HearingListStateData } from '../../models/hearingsStateData.model';
import * as fromHearingList from './hearing-list.reducer';

export interface State {
  hearingList: HearingListStateData;
  // hearingRequest: HearingRequestStateData;
}

export const reducers: ActionReducerMap<State> = {
  hearingList: fromHearingList.hearingListReducer,
  // hearingRequest: fromHearings.hearingsReducer,
};

export const getHearingsFeatureState = createFeatureSelector<State>(
  'hearings'
);

export * from './hearing-list.reducer';
