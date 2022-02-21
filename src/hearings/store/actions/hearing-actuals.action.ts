import { Action } from '@ngrx/store';
import { HearingActualsMainModel } from '../../models/hearingActualsMainModel';

export const RESET_HEARING_ACTUALS = '[HEARING ACTUALS] Reset Hearing Actuals';
export const UPDATE_HEARING_ACTUALS = '[HEARING ACTUALS] Update Hearing Actuals';
export const GET_HEARING_ACTUALS = '[HEARING ACTUALS] Get Hearing Actuals';
export const SUBMIT_HEARING_ACTUALS = '[HEARING ACTUALS] Submit Hearing Actuals';

export class ResetHearingActuals implements Action {
  public readonly type = RESET_HEARING_ACTUALS;
}

export class GetHearingActuals implements Action {
  public readonly type = GET_HEARING_ACTUALS;

  constructor(public payload: HearingActualsMainModel) {
  }
}

export class UpdateHearingActuals implements Action {
  public readonly type = UPDATE_HEARING_ACTUALS;

  constructor(public payload: HearingActualsMainModel) {
  }
}

export class SubmitHearingActuals implements Action {
  public readonly type = SUBMIT_HEARING_ACTUALS;

  constructor(public payload: HearingActualsMainModel) {
  }
}

export type HearingActualsAction =
  | ResetHearingActuals
  | GetHearingActuals
  | UpdateHearingActuals
  | SubmitHearingActuals;
