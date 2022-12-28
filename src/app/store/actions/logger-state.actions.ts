/* eslint-disable @typescript-eslint/no-shadow */
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
  public constructor(public payload: string) {}
}
export class Trace implements Action {
  public readonly type = LoggerStateActionTypes.Trace;
  public constructor(public payload: string) {}
}
export class Info implements Action {
  public readonly type = LoggerStateActionTypes.Info;
  public constructor(public payload: string) {}
}
export class Warning implements Action {
  public readonly type = LoggerStateActionTypes.Warning;
  public constructor(public payload: string) {}

}
export class Error implements Action {
  public readonly type = LoggerStateActionTypes.Error;
  public constructor(public payload: string) {}
}
export class Fatal implements Action {
  public readonly type = LoggerStateActionTypes.Fatal;
  public constructor(public payload: string) {}
}
export class Clear implements Action {
  public readonly type = LoggerStateActionTypes.Clear;
  public constructor(public payload: string) {}
}


export type LoggerStateAction = Debug | Trace | Info | Warning | Error | Fatal | Clear;
