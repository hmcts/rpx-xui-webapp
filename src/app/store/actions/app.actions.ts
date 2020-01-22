import {HttpErrorResponse} from '@angular/common/http';
import { TCDocument } from '@hmcts/rpx-xui-common-lib';
import { Action } from '@ngrx/store';
import {UserInterface} from '../../models/user.model';

export const APP_LOAD_CONFIG = '[App] Load Config';
export const APP_LOAD_CONFIG_SUCCESS = '[App] Load Config Success';
export const APP_LOAD_CONFIG_FAIL = '[App] Load Config Fail';

export const GET_USER_DETAILS = '[User] Get User Details';
export const GET_USER_DETAILS_SUCCESS = '[User] Get User Details Success';
export const GET_USER_DETAILS_FAIL = '[User]Get User Details Fail';

export const START_APP_INITIALIZER = '[App] Start App initializer';
export const FINISH_APP_INITIALIZER = '[App] Finish Start App initializer';

export const LOGOUT = '[App] Logout';

export const LOAD_HAS_ACCEPTED_TC = '[T&C] Lad Has Accepted';
export const LOAD_HAS_ACCEPTED_TC_SUCCESS = '[T&C] Lad Has Accepted Success';
export const LOAD_HAS_ACCEPTED_TC_FAIL = '[T&C] Lad Has Accepted Fail';


export const ACCEPT_T_AND_C = '[T&C] Accept T&C';
export const ACCEPT_T_AND_C_SUCCESS = '[T&C] Accept T&C Success';
export const ACCEPT_T_AND_C_FAIL = '[T&C] Accept T&C Fail';

export const LOAD_TERMS_CONDITIONS = '[TC] Load Terms Conditions';
export const LOAD_TERMS_CONDITIONS_SUCCESS = '[TC] Load Terms Conditions Success';
export const LOAD_TERMS_CONDITIONS_FAIL = '[TC] Load Terms Conditions Fail';


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

export class LoadHasAcceptedTC implements Action {
  constructor(public payload: string) {}
  readonly type = LOAD_HAS_ACCEPTED_TC;
}

export class LoadHasAcceptedTCSuccess implements Action {
  readonly type = LOAD_HAS_ACCEPTED_TC_SUCCESS;
  constructor(public payload: boolean) {}
}

export class LoadHasAcceptedTCFail implements Action {
  readonly type = LOAD_HAS_ACCEPTED_TC_FAIL;
  constructor(public payload: boolean) {}
}

export class AcceptTandC implements Action {
  readonly type = ACCEPT_T_AND_C;
  constructor(public payload: string) {}
}

export class AcceptTandCSuccess implements Action {
  readonly type = ACCEPT_T_AND_C_SUCCESS;
  constructor(public payload: boolean) {}
}

export class AcceptTandCFail implements Action {
  readonly type = ACCEPT_T_AND_C_FAIL;
  constructor(public payload: boolean) {}
}

export class LoadTermsConditions {
  public readonly type = LOAD_TERMS_CONDITIONS;
}

export class LoadTermsConditionsSuccess {
  public readonly type = LOAD_TERMS_CONDITIONS_SUCCESS;
  constructor(public payload: TCDocument) {}
}

export class LoadTermsConditionsFail {
  public readonly type = LOAD_TERMS_CONDITIONS_FAIL;
  constructor(public payload: any) {}
}

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
  | LoadHasAcceptedTC
  | LoadHasAcceptedTCSuccess
  | LoadHasAcceptedTCFail
  | AcceptTandC
  | AcceptTandCFail
  | AcceptTandCSuccess
  | LoadTermsConditions
  | LoadTermsConditionsFail
  | LoadTermsConditionsSuccess
  | SetModal
  | SignedOut
  | KeepAlive
  | GetUserDetails
  | GetUserDetailsSuccess
  | GetUserDetailsFailure;
