import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { HearingDetailsModel } from 'src/hearings/models/hearingDetails.model';
import { HearingsStateData } from '../../models/hearingsStateData.model';
import * as fromHearingsDetails from './hearings-details.reducer';
import * as fromHearings from './hearings.reducer';

export interface State {
  hearingsList: HearingsStateData;
  hearingDetails: HearingDetailsModel;
}

export const reducers: ActionReducerMap<State> = {
  hearingsList: fromHearings.hearingsReducer,
  hearingDetails: fromHearingsDetails.hearingsDetailsReducer
};

export const getHearingsFeatureState = createFeatureSelector<State>(
  'hearings'
);

export * from './hearings.reducer';
