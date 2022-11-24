import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AllocateRoleStateData, ExclusionStateData, SpecificAccessStateData } from '../../models';
import * as fromAllocateRole from './allocate-role.reducer';
import * as fromExclusion from './exclusion.reducer';
import * as fromSpecificAccess from './specific-access.reducer';

export interface State {
  exclusion: ExclusionStateData;
  allocateRole: AllocateRoleStateData;
  specificAccess: SpecificAccessStateData;
}

export const reducers: ActionReducerMap<State> = {
  exclusion: fromExclusion.exclusionReducer,
  allocateRole: fromAllocateRole.allocateRoleReducer,
  specificAccess: fromSpecificAccess.specificAccessReducer
};

export const getRoleAccessFeatureState = createFeatureSelector<State>(
  'role-access'
);

export * from './exclusion.reducer';
export * from './allocate-role.reducer';
export * from './specific-access.reducer';
