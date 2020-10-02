import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import { NocStateData } from '../models/noc.state';

import * as fromNoc from './noc.reducer';

export interface State {
  noc: NocStateData;
}

export const reducers: ActionReducerMap<State> = {
  noc: fromNoc.nocReducer,
};

export const getNocFeatureState = createFeatureSelector<State>(
  'noc'
);

export * from './noc.reducer';
