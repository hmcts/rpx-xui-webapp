import {Action} from '@ngrx/store';
import {ServiceHearingValuesModel} from '../../models/serviceHearingValues.model';

export const HEARING_VALUES_RESET = '[HEARING VALUES] Reset';
export const LOAD_HEARING_VALUES = '[HEARING VALUES] Load Hearing Values';
export const LOAD_HEARING_VALUES_SUCCESS = '[HEARING VALUES] Load Hearing Values Success';

export class HearingValuesReset implements Action {
  public readonly type = HEARING_VALUES_RESET;
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
  | HearingValuesReset
  | LoadHearingValues
  | LoadHearingValuesSuccess;
