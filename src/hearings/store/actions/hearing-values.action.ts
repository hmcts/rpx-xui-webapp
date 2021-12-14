import {Action} from '@ngrx/store';
import {ServiceHearingValuesModel} from '../../models/serviceHearingValues.model';

export const RESET_HEARING_VALUES = '[HEARING VALUES] Reset Hearing Values';
export const LOAD_HEARING_VALUES = '[HEARING VALUES] Load Hearing Values';
export const LOAD_HEARING_VALUES_SUCCESS = '[HEARING VALUES] Load Hearing Values Success';

export class ResetHearingValues implements Action {
  public readonly type = RESET_HEARING_VALUES;
}

export class LoadHearingValues implements Action {
  public readonly type = LOAD_HEARING_VALUES;
  constructor(public payload: string) {
  }
}

export class LoadHearingValuesSuccess implements Action {
  public readonly type = LOAD_HEARING_VALUES_SUCCESS;

  constructor(public payload: ServiceHearingValuesModel) {
  }
}

export type HearingValuesAction =
  | ResetHearingValues
  | LoadHearingValues
  | LoadHearingValuesSuccess;
