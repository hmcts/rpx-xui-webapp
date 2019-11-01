import { ConfigurationModel } from '../../models/configuration.model';
import * as fromActions from '../actions/';

export interface AppConfigState {
  config: ConfigurationModel | {};
  loaded: boolean;
  loading: boolean;
}

export const initialState: AppConfigState = {
  config: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromActions.AppActions): AppConfigState {
  switch (action.type) {
    case fromActions.APP_LOAD_CONFIG_SUCCESS: {
      const config = action.payload;
      return {
        ...state,
        config,
        loaded: true
      };
    }
    // TO add appropriate state as/ when ,reqd.
    case fromActions.LOGOUT: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    default:
      return state;
  }
}


export const getFeatureConfig = (state: AppConfigState) => state.config;
