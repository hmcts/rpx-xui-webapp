import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params,
} from '@angular/router';
import { createFeatureSelector, ActionReducerMap, createSelector } from '@ngrx/store';

import { RouterReducerState, routerReducer as fromRouterReducer, RouterStateSerializer } from '@ngrx/router-store';

import { AppConfigState, reducer } from './app-config.reducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: RouterReducerState<RouterStateUrl>;
  appConfig: AppConfigState;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouterReducer,
  appConfig: reducer
};

export class CustomSerializer
  implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}


export const getRouterState = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
  >('routerReducer');


export const getRouterUrl = createSelector(
  getRouterState,
  state => state.state.url
);

export const getAppConfigState = createFeatureSelector<any>( 'appConfig' );

