import * as fromActions from '../actions/';
import { ConfigurationModel } from '../../models/configuration.model';
import { TermsAndCondition } from 'src/app/models/TermsAndCondition';
export interface AppConfigState {
  config: ConfigurationModel | {};
  termsAndCondition: TermsAndCondition;
  loaded: boolean;
  loading: boolean;
}

export const initialState: AppConfigState = {
  config: {},
  termsAndCondition: { isLoaded: false, hasUserAcceptedTC: 'true', },
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
    case fromActions.LOAD_HAS_ACCEPTED_TC_SUCCESS: {
      return {
        ...state,
        termsAndCondition: {
          isLoaded: true,
          hasUserAcceptedTC: action.payload.toString()
        }
      };
    }
  }
  return state;
}


export const getFeatureConfig = (state: AppConfigState) => state.config;
export const getTandCLoadedConfig = (state: AppConfigState) => state.termsAndCondition;
