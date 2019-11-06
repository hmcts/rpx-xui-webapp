import { Action } from '@ngrx/store';
import { ConfigurationModel } from 'src/app/models/configuration.model';


export const APP_LOAD_CONFIG = '[App] Load Config';
export const APP_LOAD_CONFIG_SUCCESS = '[App] Load Config Success';
export const APP_LOAD_CONFIG_FAIL = '[App] Load Config Fail';

export const START_APP_INITIALIZER = '[App] Start App initializer';
export const FINISH_APP_INITIALIZER = '[App] Finish Start App initializer';

export const LOGOUT = '[App] Logout';


export class LoadConfig implements Action {
  public readonly type = APP_LOAD_CONFIG;
}

export class LoadConfigSuccess implements Action {
  public readonly type = APP_LOAD_CONFIG_SUCCESS;
  constructor(public payload: ConfigurationModel) { }
}

export class LoadConfigFail implements Action {
  public readonly type = APP_LOAD_CONFIG_FAIL;
  constructor(public payload: Error) { }
}

export class StartAppInitilizer implements Action {
  public readonly type = START_APP_INITIALIZER;
}

export class FinishAppInitilizer implements Action {
  public readonly type = FINISH_APP_INITIALIZER;
}

export class Logout implements Action {
  public readonly type = LOGOUT;
}


export type AppActions =
  | LoadConfig
  | LoadConfigSuccess
  | LoadConfigFail
  | StartAppInitilizer
  | FinishAppInitilizer
  | Logout;
