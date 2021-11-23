import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { HearingDetailsModel } from 'src/hearings/models/hearingDetails.model';
import { HearingListStateData } from '../../models/hearingListStateData.model';
import { HearingRequestStateData } from '../../models/hearingRequestStateData.model';
import * as fromHearingList from './hearing-list.reducer';
import * as fromHearingRequest from './hearing-request.reducer';
import * as fromHearingDetails from './hearings-details.reducer';

export interface State {
  hearingList: HearingListStateData;
  hearingRequest: HearingRequestStateData;
  hearingDetails: HearingDetailsModel;
}

export const reducers: ActionReducerMap<State> = {
  hearingList: fromHearingList.hearingListReducer,
  hearingRequest: fromHearingRequest.hearingRequestReducer,
  hearingDetails: fromHearingDetails.hearingsDetailsReducer
};

export const getHearingsFeatureState = createFeatureSelector<State>(
  'hearings'
);

export * from './hearing-list.reducer';
export * from './hearing-request.reducer';
export * from './hearings-details.reducer';
