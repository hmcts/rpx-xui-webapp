import { Action } from '@ngrx/store';
import { HttpError } from '../../../models/httpError.model';
import { ServiceHearingValuesModel } from '../../models/serviceHearingValues.model';

export const RESET_HEARING_VALUES = '[HEARING VALUES] Reset Hearing Values';
export const LOAD_HEARING_VALUES = '[HEARING VALUES] Load Hearing Values';
export const LOAD_HEARING_VALUES_SUCCESS = '[HEARING VALUES] Load Hearing Values Success';
export const LOAD_HEARING_VALUES_FAILURE = '[HEARING VALUES] Load Hearing Values Failure';
export const RESET_HEARING_VAUES_LAST_ERROR = '[HEARING VALUES] Reste Hearing Values Last Error';

export class ResetHearingValues implements Action {
  public readonly type = RESET_HEARING_VALUES;
}

export class LoadServiceHearingDataPayload {
  constructor(public jurisdictionId: string, public caseReference: string) {}
}

export class LoadHearingValues implements Action {
  public readonly type = LOAD_HEARING_VALUES;
  constructor(public payload: LoadServiceHearingDataPayload) {}
}

export class LoadHearingValuesSuccess implements Action {
  public readonly type = LOAD_HEARING_VALUES_SUCCESS;

  constructor(public payload: ServiceHearingValuesModel) {}
}

export class LoadHearingValuesFailure implements Action {
  public readonly type = LOAD_HEARING_VALUES_FAILURE;

  constructor(public payload: HttpError) {}
}

export class ResetHearingValuesLastError implements Action {
  public readonly type = RESET_HEARING_VAUES_LAST_ERROR;
}

export type HearingValuesAction =
  | ResetHearingValues
  | LoadHearingValues
  | LoadHearingValuesSuccess
  | LoadHearingValuesFailure
  | ResetHearingValuesLastError;
