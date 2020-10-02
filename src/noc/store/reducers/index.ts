import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import { NocState } from '../models/noc.state';

import * as fromNoc from './noc.reducer';

export interface State {
  noc: NocState;
}

export const reducers: ActionReducerMap<State> = {
  noc: fromNoc.nocReducer,
};

export const getNocFeatureState = createFeatureSelector<State>(
  'noc'
);

export * from './noc.reducer';
