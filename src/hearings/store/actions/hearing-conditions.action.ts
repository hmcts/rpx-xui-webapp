import {Action} from '@ngrx/store';
import {HearingConditions} from '../../models/hearingConditions';

export const HEARING_CONDITIONS_RESET = '[HEARING CONDITIONS] Reset';
export const HEARING_CONDITIONS_SAVE = '[HEARING CONDITIONS] Save Condition';

export class HearingConditionsReset implements Action {
  public readonly type = HEARING_CONDITIONS_RESET;
}

export class HearingConditionsSave implements Action {
  public readonly type = HEARING_CONDITIONS_SAVE;
  constructor(public payload: HearingConditions) {
  }
}

export type HearingConditionsAction =
  | HearingConditionsReset
  | HearingConditionsSave;
