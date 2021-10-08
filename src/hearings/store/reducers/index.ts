import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { HearingsStateData } from '../../models/hearingsStateData.model';
import * as fromHearings from './hearings.reducer';

export interface State {
  hearingsList: HearingsStateData;
}

export const reducers: ActionReducerMap<State> = {
  hearingsList: fromHearings.hearingsReducer,
};

export const getHearingsFeatureState = createFeatureSelector<State>(
  'hearings'
);

export * from './hearings.reducer';
