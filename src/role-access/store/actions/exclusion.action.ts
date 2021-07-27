import { Action } from '@ngrx/store';
import { ExcludeOption, ExclusionState, ExclusionStateData, Person, PersonRole, RoleAccessHttpError } from '../../models';

export enum ExclusionActionTypes {
  CHANGE_NAVIGATION = '[EXCLUSION] Change Navigation',
  CONFIRM_EXCLUSION = '[EXCLUSION] Confirm exclusion',
  CONFIRM_EXCLUSION_FAILURE = '[EXCLUSION] Confirm exclusion failure',
  RESET = '[EXCLUSION] Reset',
  SAVE_EXCLUSION_OPTION_AND_GO = '[EXCLUSION] Save Exclusion Option And Go',
  SAVE_PERSON_ROLE_AND_GO = '[EXCLUSION] Save Person Role And Go',
  UPDATE_DESCRIBE_EXCLUSION_TEXT = '[EXCLUSION] Update Describe Exclusion Text',
  UPDATE_PERSON_EXCLUSION = '[EXCLUSION] Update Person Exclusion'
}

export class Reset implements Action {
  public readonly type = ExclusionActionTypes.RESET;
}

export class ChangeNavigation implements Action {
  public readonly type = ExclusionActionTypes.CHANGE_NAVIGATION;

  constructor(public payload: ExclusionState) {
  }
}

export class UpdateDescribeExclusionText implements Action {
  public readonly type = ExclusionActionTypes.UPDATE_DESCRIBE_EXCLUSION_TEXT;

  constructor(public payload: ExclusionState, public describeExclusionText: string) {}
}

export class SaveExclusionOptionAndGo implements Action {
  public readonly type = ExclusionActionTypes.SAVE_EXCLUSION_OPTION_AND_GO;

  constructor(public payload: { exclusionOption: ExcludeOption, exclusionState: ExclusionState }) {
  }
}

export class SavePersonRoleAndGo implements Action {
  public readonly type = ExclusionActionTypes.SAVE_PERSON_ROLE_AND_GO;

  constructor(public payload: { personRole: PersonRole, exclusionState: ExclusionState }) {
  }
}

export class UpdatePersonExclusion implements Action {
  public readonly type = ExclusionActionTypes.UPDATE_PERSON_EXCLUSION;
  constructor(public payload: ExclusionState, public person: Person) {}
}

export class ConfirmExclusionAction implements Action {
  public readonly type = ExclusionActionTypes.CONFIRM_EXCLUSION;
  constructor(public payload: ExclusionStateData) {}
}

export class  ConfirmExclusionFailureAction implements Action {
  readonly type = ExclusionActionTypes.CONFIRM_EXCLUSION_FAILURE

  constructor(public payload: RoleAccessHttpError) { }
}

export type ExclusionAction =
  | ChangeNavigation
  | ConfirmExclusionAction
  | ConfirmExclusionFailureAction
  | Reset
  | SaveExclusionOptionAndGo
  | SavePersonRoleAndGo
  | UpdateDescribeExclusionText
  | UpdatePersonExclusion
;
