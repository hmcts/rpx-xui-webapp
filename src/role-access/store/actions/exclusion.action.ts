import { Action } from '@ngrx/store';
import { ExcludeOption, ExclusionState } from '../../models';

export const RESET = '[EXCLUSION] Reset';
export const CHANGE_NAVIGATION = '[EXCLUSION] Change Navigation';
export const UPDATE_DESCRIBE_EXCLUSION_TEXT = '[EXCLUSION] Update Describe Exclusion Text';
export const SAVE_EXCLUSION_OPTION_AND_GO = '[EXCLUSION] Save Exclusion Option And Go';

export class Reset implements Action {
  public readonly type = RESET;
}

export class ChangeNavigation implements Action {
  public readonly type = CHANGE_NAVIGATION;

  constructor(public payload: ExclusionState) {
  }
}

export class UpdateDescribeExclusionText implements Action {
  public readonly type = UPDATE_DESCRIBE_EXCLUSION_TEXT;

  constructor(public payload: ExclusionState, public describeExclusionText: string) {}
}

export class SaveExclusionOptionAndGo implements Action {
  public readonly type = SAVE_EXCLUSION_OPTION_AND_GO;

  constructor(public payload: { exclusionOption: ExcludeOption, exclusionState: ExclusionState }) {
  }
}

export type ExclusionAction =
  | UpdateDescribeExclusionText
  | Reset
  | ChangeNavigation
  | SaveExclusionOptionAndGo;
