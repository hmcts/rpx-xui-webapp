import { Action } from '@ngrx/store';
import { TCDocument } from '@hmcts/rpx-xui-common-lib';

export const APP_LOAD_CONFIG = '[App] Load Config';
export const APP_LOAD_CONFIG_SUCCESS = '[App] Load Config Success';
export const APP_LOAD_CONFIG_FAIL = '[App] Load Config Fail';

export const START_APP_INITIALIZER = '[App] Start App initializer';
export const FINISH_APP_INITIALIZER = '[App] Finish Start App initializer';

export const LOGOUT = '[App] Logout';

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


export type AppActions =
  | LoadConfig
  | LoadConfigSuccess
  | LoadConfigFail
  | StartAppInitilizer
  | FinishAppInitilizer
  | Logout
  | LoadTermsConditions
  | LoadTermsConditionsFail
  | LoadTermsConditionsSuccess;
