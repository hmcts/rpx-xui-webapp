import { Action } from '@ngrx/store';
import { HearingRequestMainModel } from '../../models/hearingRequestMain.model';

export const RESET_HEARING_REQUEST = '[HEARING REQUEST] Reset Hearing Request';
export const NAVIGATE_BACK_HEARING_REQUEST = '[HEARING REQUEST] Navigate Back Hearing Request';
export const UPDATE_HEARING_REQUEST = '[HEARING REQUEST] Update Hearing Request';
export const INITIALIZE_HEARING_REQUEST = '[HEARING REQUEST] Initialize Hearing Request';
export const SUBMIT_HEARING_REQUEST = '[HEARING REQUEST] Submit Hearing Request';

export class ResetHearingRequest implements Action {
  public readonly type = RESET_HEARING_REQUEST;
}

export class NavigateBackHearingRequest implements Action {
  public readonly type = NAVIGATE_BACK_HEARING_REQUEST;
}

export class InitializeHearingRequest implements Action {
  public readonly type = INITIALIZE_HEARING_REQUEST;

  constructor(public payload: HearingRequestMainModel) {
  }
}

export class UpdateHearingRequest implements Action {
  public readonly type = UPDATE_HEARING_REQUEST;

  constructor(public payload: HearingRequestMainModel) {
  }
}

export class SubmitHearingRequest implements Action {
  public readonly type = SUBMIT_HEARING_REQUEST;

  constructor(public payload: HearingRequestMainModel) {
  }
}

export type HearingRequestAction =
  | ResetHearingRequest
  | NavigateBackHearingRequest
  | InitializeHearingRequest
  | UpdateHearingRequest
  | SubmitHearingRequest;
