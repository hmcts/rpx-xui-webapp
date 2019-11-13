import * as fromActions from '../actions/';
import { ConfigurationModel } from '../../models/configuration.model';
import { TCDocument } from '@hmcts/rpx-xui-common-lib';

export interface AppConfigState {
  config: ConfigurationModel | {};
  loaded: boolean;
  loading: boolean;
  termsAndConditions: TCDocument;
}

export const initialState: AppConfigState = {
  config: {},
  loaded: false,
  loading: false,
  termsAndConditions: null
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
    case fromActions.LOAD_TERMS_CONDITIONS_SUCCESS:
      return {
        ...state,
        termsAndConditions: action.payload
      };
  }
  return state;
}


export const getFeatureConfig = (state: AppConfigState) => state.config;
export const getTermsConditions = (state: AppConfigState) => state.termsAndConditions;
