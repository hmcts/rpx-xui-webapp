import { TCDocument } from '@hmcts/rpx-xui-common-lib';
import { TermsAndCondition } from 'src/app/models/TermsAndCondition';
import { ConfigurationModel } from '../../models/configuration.model';
import {UserModel} from '../../models/user.model';
import * as fromActions from '../actions/';

export interface AppState {
  config: ConfigurationModel | {};
  termsAndCondition: TermsAndCondition;
  loaded: boolean;
  loading: boolean;
  termsAndConditions: TCDocument;
  userDetails: UserModel | null;
  modal: {[id: string]: {isVisible?: boolean; countdown?: string}};
}

export const initialState: AppState = {
  config: {},
  termsAndCondition: { isLoaded: false, hasUserAcceptedTC: false },
  loaded: false,
  loading: false,
  termsAndConditions: null,
  userDetails: null,
  modal: {
    session: {
      isVisible: false,
      countdown: ''
    }
  },
};

export function reducer(
  state = initialState,
  action: fromActions.AppActions): AppState {
  switch (action.type) {
    case fromActions.APP_LOAD_CONFIG_SUCCESS: {
      const config = action.payload;
      return {
      ...state,
      config,
      loaded: true
      };
    }

    case fromActions.GET_USER_DETAILS_SUCCESS: {
      const userDetails = new UserModel(action.payload);
      return {
      ...state,
      userDetails,
      loaded: true,
      loading: false,
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

    case fromActions.APP_LOAD_CONFIG_SUCCESS: {
      const config = action.payload;
      return {
      ...state,
      config,
      loaded: true
      };
    }
  // TO add appropriate state as/ when ,reqd.
  case fromActions.SET_MODAL: {
    return {
      ...state,
      modal: {...action.payload}
    };
  }
}
  return state;
}


export const getFeatureConfig = (state: AppState) => state.config;
export const getTandCLoadedConfig = (state: AppState) => state.termsAndCondition;
export const getTermsConditions = (state: AppState) => state.termsAndConditions;
export const getUserDetails = (state: AppState) => state.userDetails;
export const getModal = (state: AppState) => state.modal;
