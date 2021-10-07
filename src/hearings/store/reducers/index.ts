import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromHearings from './hearings.reducer';
import { HearingsStateData } from '../../models/hearingsStateData.model';

export interface State {
  hearings: HearingsStateData;
}

export const reducers: ActionReducerMap<State> = {
  hearings: fromHearings.hearingsReducer,
};

export const getHearingsFeatureState = createFeatureSelector<State>(
  'hearings'
);

export * from './hearings.reducer';
