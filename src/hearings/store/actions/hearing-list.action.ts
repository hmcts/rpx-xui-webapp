import {Action} from '@ngrx/store';
import {HearingListMainModel} from '../../models/hearingListMain.model';

export const RESET_HEARING_LIST = '[HEARING LIST] Reset Hearing List';
export const LOAD_ALL_HEARINGS = '[HEARING LIST] Load All Hearings';
export const LOAD_ALL_HEARINGS_SUCCESS = '[HEARING LIST] Load All Hearings Successfully';

export class ResetHearingList implements Action {
  public readonly type = RESET_HEARING_LIST;
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
  | ResetHearingList
  | LoadAllHearings
  | LoadAllHearingsSuccess;
