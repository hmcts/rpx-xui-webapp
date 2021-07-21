import { Action } from '@ngrx/store';
import { ExcludeOption, ExclusionState } from '../../models';
import { RoleAllocationRadioText } from '../../models/enums';

export const RESET = '[EXCLUSION] Reset';
export const CHANGE_NAVIGATION = '[EXCLUSION] Change Navigation';
export const SAVE_EXCLUSION_OPTION_AND_GO = '[EXCLUSION] Save Exclusion Option And Go';

export class Reset implements Action {
  public readonly type = RESET;
}

export class ChangeNavigation implements Action {
  public readonly type = CHANGE_NAVIGATION;

  constructor(public payload: ExclusionState) {
  }
}

export class SaveExclusionOptionAndGo implements Action {
  public readonly type = SAVE_EXCLUSION_OPTION_AND_GO;

  constructor(public payload: { exclusionOption: ExcludeOption, exclusionState: ExclusionState }) {
  }
}

export type ExclusionAction =
  | Reset
  | ChangeNavigation
  | SaveExclusionOptionAndGo;
