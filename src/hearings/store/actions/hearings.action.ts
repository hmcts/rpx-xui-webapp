import { Action } from '@ngrx/store';
import { CaseHearingsMainModel } from '../../models/caseHearingsMain.model';

export const RESET = '[HEARINGS] Reset';
export const LOAD_ALL_HEARINGS = '[HEARINGS] Load All Hearings';
export const LOAD_ALL_HEARINGS_SUCCESS = '[HEARINGS] Load All Hearings Successfully';

export class Reset implements Action {
  public readonly type = RESET;
}

export class LoadAllHearings implements Action {
  public readonly type = LOAD_ALL_HEARINGS;

  constructor(public payload: string) {
  }
}

export class LoadAllHearingsSuccess implements Action {
  public readonly type = LOAD_ALL_HEARINGS_SUCCESS;

  constructor(public payload: CaseHearingsMainModel) {
  }
}

export type HearingsAction =
  | Reset
  | LoadAllHearings
  | LoadAllHearingsSuccess;
