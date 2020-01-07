import { Action } from '@ngrx/store';
import {UserInterface} from '../../models/user.model';
import {HttpErrorResponse} from '@angular/common/http';


export const APP_LOAD_CONFIG = '[App] Load Config';
export const APP_LOAD_CONFIG_SUCCESS = '[App] Load Config Success';
export const APP_LOAD_CONFIG_FAIL = '[App] Load Config Fail';

export const GET_USER_DETAILS = '[User] Get User Details';
export const GET_USER_DETAILS_SUCCESS = '[User] Get User Details Success';
export const GET_USER_DETAILS_FAIL = '[User]Get User Details Fail';

export const START_APP_INITIALIZER = '[App] Start App initializer';
export const FINISH_APP_INITIALIZER = '[App] Finish Start App initializer';

export const LOGOUT = '[App] Logout';

export const SIGNED_OUT = '[App] Signed Out'; // used by session management
export const SIGNED_OUT_SUCCESS = '[App] Signed Out Success'; // used by session management
export const KEEP_ALIVE = '[App] Keep Alive';
export const SET_MODAL = '[APP] Set Modal';


export class GetUserDetails implements Action {
  readonly type = GET_USER_DETAILS;
}

export class GetUserDetailsSuccess implements Action {
  readonly type = GET_USER_DETAILS_SUCCESS;
  constructor(public payload: UserInterface) {}
}

export class GetUserDetailsFailure implements Action {
  readonly type = GET_USER_DETAILS_FAIL;
  constructor(public payload: HttpErrorResponse) {}
}


export class LoadConfig implements Action {
  readonly type = APP_LOAD_CONFIG;
}

export class LoadConfigSuccess implements Action {
  readonly type = APP_LOAD_CONFIG_SUCCESS;
  constructor(public payload: any) { }
}

export class LoadConfigFail implements Action {
  readonly type = APP_LOAD_CONFIG_FAIL;
  constructor(public payload: any) { }
}

export class StartAppInitilizer implements Action {
  readonly type = START_APP_INITIALIZER;
}

export class FinishAppInitilizer implements Action {
  readonly type = FINISH_APP_INITIALIZER;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SignedOut implements Action {
  readonly type = SIGNED_OUT;
}

export class SignedOutSuccess implements Action {
  readonly type = SIGNED_OUT_SUCCESS;
}

export class KeepAlive implements Action {
  readonly type = KEEP_ALIVE;
}

export class SetModal implements Action {
  readonly type = SET_MODAL;
  constructor(public payload: {[id: string]: {isVisible?: boolean; countdown?: string}}) { }
}

export type AppActions =
  | LoadConfig
  | LoadConfigSuccess
  | LoadConfigFail
  | StartAppInitilizer
  | FinishAppInitilizer
  | Logout
  | SetModal
  | SignedOut
  | KeepAlive
  | GetUserDetails
  | GetUserDetailsSuccess
  | GetUserDetailsFailure;
