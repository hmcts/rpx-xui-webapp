import {Action} from '@ngrx/store';
import {HearingListMainModel} from '../../models/hearingListMain.model';

export const HEARING_LIST_RESET = '[HEARING LIST] Reset';
export const LOAD_ALL_HEARINGS = '[HEARING LIST] Load All Hearings';
export const LOAD_ALL_HEARINGS_SUCCESS = '[HEARING LIST] Load All Hearings Successfully';

export class HearingListReset implements Action {
  public readonly type = HEARING_LIST_RESET;
}

export class LoadAllHearings implements Action {
  public readonly type = LOAD_ALL_HEARINGS;

  constructor(public payload: string) {
  }
}

export class LoadAllHearingsSuccess implements Action {
  public readonly type = LOAD_ALL_HEARINGS_SUCCESS;

  constructor(public payload: HearingListMainModel) {
  }
}

export type HearingListAction =
  | HearingListReset
  | LoadAllHearings
  | LoadAllHearingsSuccess;
