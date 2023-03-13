import {
  ActivatedRouteSnapshot,
  Params,
  RouterStateSnapshot,
} from '@angular/router';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';

import * as fromApp from './app-config.reducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  appConfig: fromApp.AppConfigState;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
  appConfig: fromApp.reducer
};

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  public serialize(routerState: RouterStateSnapshot): RouterStateUrl {
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
  fromRouter.RouterReducerState<RouterStateUrl>
  >('routerReducer');


export const getRouterUrl = createSelector(
  getRouterState,
  state => state.state.url
);

export const getAppConfigState = createFeatureSelector<any>( 'appConfig' );

