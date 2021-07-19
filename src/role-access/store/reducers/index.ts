import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { ExclusionStateData } from '../../models';
import * as fromExclusion from './exclusion.reducer';

export interface State {
  exclusion: ExclusionStateData;
}

export const reducers: ActionReducerMap<State> = {
  exclusion: fromExclusion.exclusionReducer,
};

export const getRoleAccessFeatureState = createFeatureSelector<State>(
  'role-access'
);

export * from './exclusion.reducer';
