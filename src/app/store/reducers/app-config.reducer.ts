import { TCDocument } from '@hmcts/rpx-xui-common-lib';
import { TermsAndCondition } from 'src/app/models/TermsAndCondition';
import { ConfigurationModel } from '../../models/configuration.model';
import { AppActions, APP_LOAD_CONFIG_SUCCESS, LOGOUT, LOAD_HAS_ACCEPTED_TC_SUCCESS, LOAD_HAS_ACCEPTED_TC_FAIL, ACCEPT_T_AND_C_SUCCESS, LOAD_TERMS_CONDITIONS_SUCCESS, LOAD_FEATURE_TOGGLE_CONFIG_SUCCESS } from '../actions/';

export interface AppConfigState {
  config: ConfigurationModel | {};
  termsAndCondition: TermsAndCondition;
  loaded: boolean;
  loading: boolean;
  termsAndConditions: TCDocument;
  isTermsAndConditionsFeatureEnabled: boolean;
}

export const initialState: AppConfigState = {
  config: {},
  termsAndCondition: { isLoaded: false, hasUserAcceptedTC: false },
  loaded: false,
  loading: false,
  termsAndConditions: null,
  isTermsAndConditionsFeatureEnabled: false
};

export function reducer(
  state = initialState,
  action: AppActions): AppConfigState {
  switch (action.type) {
    case APP_LOAD_CONFIG_SUCCESS: {
      const config = action.payload;
      return {
        ...state,
        config,
        loaded: true
      };
    }
    // TO add appropriate state as/ when ,reqd.
    case LOGOUT: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case LOAD_HAS_ACCEPTED_TC_SUCCESS: {
      return {
        ...state,
        termsAndCondition: {
          isLoaded: true,
          hasUserAcceptedTC: action.payload
        }
      };
    }
    case LOAD_HAS_ACCEPTED_TC_FAIL: {
      return {
        ...state,
        termsAndCondition: {
          isLoaded: false,
          hasUserAcceptedTC: false
        }
      };
    }
    case ACCEPT_T_AND_C_SUCCESS: {
      return {
        ...state,
        termsAndCondition: {
          isLoaded: true,
          hasUserAcceptedTC: action.payload
        }
      };
    }
    case LOAD_TERMS_CONDITIONS_SUCCESS:
      return {
        ...state,
        termsAndConditions: action.payload
      };
    case LOAD_FEATURE_TOGGLE_CONFIG_SUCCESS:
      return {
          ...state,
          isTermsAndConditionsFeatureEnabled: action.payload
        };
    default:
      return {
        ...state
      };
  }
  return state;
}


export const getFeatureConfig = (state: AppConfigState) => state.config;
export const getTandCLoadedConfig = (state: AppConfigState) => state.termsAndCondition;
export const getTermsConditions = (state: AppConfigState) => state.termsAndConditions;
