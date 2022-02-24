import { Action } from '@ngrx/store';
import { HearingRequestMainModel } from '../../models/hearingRequestMain.model';

export const RESET_HEARING_REQUEST_TO_COMPARE = '[HEARING REQUEST] Reset Hearing Request To Compare';
export const INITIALIZE_HEARING_REQUEST_TO_COMPARE = '[HEARING REQUEST] Initialize Hearing Request To Compare';

export class ResetHearingRequestToCompare implements Action {
  public readonly type = RESET_HEARING_REQUEST_TO_COMPARE;
}

export class InitializeHearingRequestToCompare implements Action {
  public readonly type = INITIALIZE_HEARING_REQUEST_TO_COMPARE;

  constructor(public payload: HearingRequestMainModel) {
  }
}

export type HearingRequestToCompareAction =
  | ResetHearingRequestToCompare
  | InitializeHearingRequestToCompare;
