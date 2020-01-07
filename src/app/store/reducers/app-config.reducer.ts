import * as fromActions from '../actions/';
import { ConfigurationModel } from '../../models/configuration.model';
import {UserModel} from '../../models/user.model';

export interface AppState {
  config: ConfigurationModel | {};
  userDetails: UserModel | null;
  modal: {[id: string]: {isVisible?: boolean; countdown?: string}};
  loaded: boolean;
  loading: boolean;
}

export const initialState: AppState = {
  config: {},
  userDetails: null,
  modal: {
    session: {
      isVisible: false,
      countdown: ''
    }
  },
  loaded: false,
  loading: false
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


    case fromActions.SET_MODAL: {
      return {
        ...state,
        modal: {...action.payload}
      }
    }
  }
  return state;
}


export const getFeatureConfig = (state: AppState) => state.config;
export const getUserDetails = (state: AppState) => state.userDetails;
export const getModal = (state: AppState) => state.modal;
