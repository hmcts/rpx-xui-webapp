import * as fromActions from '../actions/';
import {ConfigurationModel} from '../../models/configuration.model';
export interface AppConfigState {
  config: ConfigurationModel;
  loaded: boolean;
  loading: boolean;
}

export const initialState: AppConfigState = {
  config: { features: {}, endPoints: []},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromActions.AppActions ): AppConfigState {
  switch ( action.type ) {
    case fromActions.APP_LOAD_CONFIG_SUCCESS: {
      const config = action.payload;
      return {
        ...state,
        config,
        loaded: true
      }
    }
  }
  return state;
}

export const getFeatureConfig = (state: AppConfigState ) => state.config;


