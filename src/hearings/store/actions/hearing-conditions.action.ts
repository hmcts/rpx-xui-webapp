import { Action } from '@ngrx/store';
import { HearingConditions } from '../../models/hearingConditions';

export const RESET_HEARING_CONDITIONS = '[HEARING CONDITIONS] Reset Condition';
export const SAVE_HEARING_CONDITIONS = '[HEARING CONDITIONS] Save Condition';

export class ResetHearingConditions implements Action {
  public readonly type = RESET_HEARING_CONDITIONS;
}

export class SaveHearingConditions implements Action {
  public readonly type = SAVE_HEARING_CONDITIONS;
  constructor(public payload: HearingConditions) {}
}

export type HearingConditionsAction =
  | ResetHearingConditions
  | SaveHearingConditions;
