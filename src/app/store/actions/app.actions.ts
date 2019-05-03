import { Action } from '@ngrx/store';


export const APP_LOAD_CONFIG = '[App] Load Config';
export const APP_LOAD_CONFIG_SUCCESS = '[App] Load Config Success';

export const START_APP_INITIALIZER = '[App] Start App initializer';
export const FINISH_APP_INITIALIZER = '[App] Finish Start App initializer';

export class LoadConfig implements Action {
  readonly type = APP_LOAD_CONFIG;
}

export class LoadConfigSuccess implements Action {
  readonly type = APP_LOAD_CONFIG_SUCCESS;
  constructor(public payload: any ) {}
}

export class LoadConfigFail implements Action {
  readonly type = APP_LOAD_CONFIG_SUCCESS;
  constructor(public payload: any ) {}
}

export class StartAppInitilizer implements Action {
  readonly type = START_APP_INITIALIZER;
}

export class FinishAppInitilizer implements Action {
  readonly type = FINISH_APP_INITIALIZER;
}

export type AppActions =
  | LoadConfig
  | LoadConfigSuccess
  | LoadConfigFail
  | StartAppInitilizer
  | FinishAppInitilizer;
