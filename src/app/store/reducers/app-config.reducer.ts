import { TCDocument } from '@hmcts/rpx-xui-common-lib';
import { UserDetails } from '../../../app/models/user-details.model';
import { ConfigurationModel } from '../../models/configuration.model';
import {TermsAndCondition} from '../../models/TermsAndCondition';
import * as fromActions from '../actions/';

export interface AppConfigState {
  config: ConfigurationModel | {};
  termsAndCondition: TermsAndCondition;
  loaded: boolean;
  loading: boolean;
  termsAndConditions: TCDocument;
  isTermsAndConditionsFeatureEnabled: boolean;
  useIdleSessionTimeout: boolean;
  userDetails: UserDetails;
}

export const initialState: AppConfigState = {
  config: {},
  termsAndCondition: { isLoaded: false, hasUserAcceptedTC: false },
  loaded: false,
  loading: false,
  termsAndConditions: null,
  isTermsAndConditionsFeatureEnabled: false,
  useIdleSessionTimeout: false,
  userDetails: {
    sessionTimeout: {
      idleModalDisplayTime: 0,
      totalIdleTime: 0,
    },
    canShareCases: false,
    userInfo: null
  }
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
          hasUserAcceptedTC: action.payload
        }
      };
    }
    case fromActions.LOAD_HAS_ACCEPTED_TC_FAIL: {
      return {
        ...state,
        termsAndCondition: {
          isLoaded: false,
          hasUserAcceptedTC: false
        }
      };
    }
    case fromActions.ACCEPT_T_AND_C_SUCCESS: {
      return {
        ...state,
        termsAndCondition: {
          isLoaded: true,
          hasUserAcceptedTC: action.payload
        }
      };
    }
    case fromActions.LOAD_TERMS_CONDITIONS_SUCCESS:
      return {
        ...state,
        termsAndConditions: action.payload
      };
    case fromActions.LOAD_FEATURE_TOGGLE_CONFIG_SUCCESS:
      return {
          ...state,
          isTermsAndConditionsFeatureEnabled: action.payload
        };
    case fromActions.LOAD_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: action.payload
      };
    case fromActions.START_IDLE_SESSION_TIMEOUT:
      return {
        ...state,
        useIdleSessionTimeout: true
      };
    case fromActions.STOP_IDLE_SESSION_TIMEOUT:
      return {
        ...state,
        useIdleSessionTimeout: false
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
export const getUseIdleSessionTimeout = (state: AppConfigState) => state.useIdleSessionTimeout;
export const getUserDetails = (state: AppConfigState) => state.userDetails;
