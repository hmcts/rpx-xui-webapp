import { Action } from '@ngrx/store';

export enum LoggerStateActionTypes {
  Debug = '[LoggerState] Debug',
  Trace = '[LoggerState] Trace',
  Info = '[LoggerState] Info',
  Warning = '[LoggerState] Warning',
  Error = '[LoggerState] Error',
  Fatal = '[LoggerState] Fatal',
  Clear = '[LoggerState] Clear'
}

export class Debug implements Action {
  public readonly type = LoggerStateActionTypes.Debug;
  constructor(public payload: string) {}
}
export class Trace implements Action {
  public readonly type = LoggerStateActionTypes.Trace;
  constructor(public payload: string) {}
}
export class Info implements Action {
  public readonly type = LoggerStateActionTypes.Info;
  constructor(public payload: string) {}
}
export class Warning implements Action {
  public readonly type = LoggerStateActionTypes.Warning;
  constructor(public payload: string) {}

}
export class Error implements Action {
  public readonly type = LoggerStateActionTypes.Error;
  constructor(public payload: string) {}
}
export class Fatal implements Action {
  public readonly type = LoggerStateActionTypes.Fatal;
  constructor(public payload: string) {}
}
export class Clear implements Action {
  public readonly type = LoggerStateActionTypes.Clear;
  constructor(public payload: string) {}
}


export type LoggerStateAction = Debug | Trace | Info | Warning | Error | Fatal | Clear;
