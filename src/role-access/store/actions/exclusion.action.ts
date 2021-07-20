import { Action } from '@ngrx/store';
import { ExclusionState } from '../../models';

export const RESET = '[EXCLUSION] Reset';
export const CHANGE_NAVIGATION = '[EXCLUSION] Change Navigation';

export class Reset implements Action {
  public readonly type = RESET;
}

export class ChangeNavigation implements Action {
  public readonly type = CHANGE_NAVIGATION;

  constructor(public payload: ExclusionState) {
  }
}

export type ExclusionAction =
  | Reset
  | ChangeNavigation;
