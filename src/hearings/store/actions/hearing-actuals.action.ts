import { Action } from '@ngrx/store';
import { HttpError } from '../../../models/httpError.model';
import { HearingActualsMainModel, HearingActualsModel } from '../../models/hearingActualsMainModel';

export const RESET_HEARING_ACTUALS = '[HEARING ACTUALS] Reset Hearing Actuals';
export const UPDATE_HEARING_ACTUALS = '[HEARING ACTUALS] Update Hearing Actuals';
export const UPDATE_HEARING_ACTUALS_SUCCESS = '[HEARING ACTUALS] Update Hearing Actuals Success';
export const GET_HEARING_ACTUALS = '[HEARING ACTUALS] Get Hearing Actuals';
export const GET_HEARING_ACTUALS_SUCCESS = '[HEARING ACTUALS] Get Hearing Actuals success';
export const SUBMIT_HEARING_ACTUALS = '[HEARING ACTUALS] Submit Hearing Actuals';
export const SUBMIT_HEARING_ACTUALS_SUCCESS = '[HEARING ACTUALS] Submit Hearing Actuals Success';
export const SUBMIT_HEARING_ACTUALS_FAILURE = '[HEARING ACTUALS] Submit Hearing Actuals Failure';
export const RESET_HEARING_ACTUALS_LAST_ERROR = '[HEARING ACTUALS] Reset Hearing Actuals Last Error';

export class ResetHearingActuals implements Action {
  public readonly type = RESET_HEARING_ACTUALS;
}

export class GetHearingActuals implements Action {
  public readonly type = GET_HEARING_ACTUALS;

  constructor(public payload: string) {
  }
}

export class GetHearingActualsSuccess implements Action {
  public readonly type = GET_HEARING_ACTUALS_SUCCESS;

  constructor(public payload: HearingActualsMainModel) {
  }
}

export class UpdateHearingActuals implements Action {
  public readonly type = UPDATE_HEARING_ACTUALS;

  constructor(public payload: { hearingActuals: HearingActualsModel, hearingId: string }) {
  }
}

export class UpdateHearingActualsSuccess implements Action {
  public readonly type = UPDATE_HEARING_ACTUALS_SUCCESS;

  constructor(public payload: HearingActualsModel) {
  }
}

export class SubmitHearingActuals implements Action {
  public readonly type = SUBMIT_HEARING_ACTUALS;

  constructor(public payload: string) {
  }
}

export class SubmitHearingActualsSuccess implements Action {
  public readonly type = SUBMIT_HEARING_ACTUALS_SUCCESS;

  constructor(public payload: string) {
  }
}

export class SubmitHearingActualsFailure implements Action {
  public readonly type = SUBMIT_HEARING_ACTUALS_FAILURE;

  constructor(public payload: HttpError) {
  }
}

export class ResetHearingActualsLastError implements Action {
  public readonly type = RESET_HEARING_ACTUALS_LAST_ERROR
}

export type HearingActualsAction =
  | ResetHearingActuals
  | GetHearingActuals
  | GetHearingActualsSuccess
  | UpdateHearingActuals
  | UpdateHearingActualsSuccess
  | SubmitHearingActuals
  | SubmitHearingActualsSuccess
  | SubmitHearingActualsFailure
  | ResetHearingActualsLastError;
