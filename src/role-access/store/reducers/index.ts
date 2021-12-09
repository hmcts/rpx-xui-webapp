import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AllocateRoleStateData, ExclusionStateData } from '../../models';
import * as fromAllocateRole from './allocate-role.reducer';
import * as fromExclusion from './exclusion.reducer';

export interface State {
  exclusion: ExclusionStateData;
  allocateRole: AllocateRoleStateData;
}

export const reducers: ActionReducerMap<State> = {
  exclusion: fromExclusion.exclusionReducer,
  allocateRole: fromAllocateRole.allocateRoleReducer
};

export const getRoleAccessFeatureState = createFeatureSelector<State>(
  'role-access'
);

export * from './exclusion.reducer';
export * from './allocate-role.reducer';
