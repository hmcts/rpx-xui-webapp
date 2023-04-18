import { Person, PersonRole } from '@hmcts/rpx-xui-common-lib/lib/models/person.model';
import { Action } from '@ngrx/store';
import { ExcludeOption, ExclusionState, ExclusionStateData, RoleAccessHttpError } from '../../models';

export enum ExclusionActionTypes {
  EXCLUSION_SET_CASE_ID = '[EXCLUSION] Set Case ID',
  CHANGE_NAVIGATION = '[EXCLUSION] Change Navigation',
  CONFIRM_EXCLUSION = '[EXCLUSION] Confirm exclusion',
  CONFIRM_EXCLUSION_FAILURE = '[EXCLUSION] Confirm exclusion failure',
  EXCLUSION_RESET = '[EXCLUSION] Reset',
  SAVE_EXCLUSION_OPTION_AND_GO = '[EXCLUSION] Save Exclusion Option And Go',
  SAVE_PERSON_ROLE_AND_GO = '[EXCLUSION] Save Person Role And Go',
  UPDATE_DESCRIBE_EXCLUSION_TEXT = '[EXCLUSION] Update Describe Exclusion Text',
  UPDATE_PERSON_EXCLUSION = '[EXCLUSION] Update Person Exclusion'
}

export class ExclusionReset implements Action {
  public readonly type = ExclusionActionTypes.EXCLUSION_RESET;
}

export class ChangeNavigation implements Action {
  public readonly type = ExclusionActionTypes.CHANGE_NAVIGATION;

  constructor(public payload: ExclusionState) {}
}

export class ExclusionSetCaseId implements Action {
  public readonly type = ExclusionActionTypes.EXCLUSION_SET_CASE_ID;
  constructor(public caseId: string, public jurisdiction: string) {}
}

export class UpdateDescribeExclusionText implements Action {
  public readonly type = ExclusionActionTypes.UPDATE_DESCRIBE_EXCLUSION_TEXT;

  constructor(public payload: ExclusionState, public describeExclusionText: string) {}
}

export class SaveExclusionOptionAndGo implements Action {
  public readonly type = ExclusionActionTypes.SAVE_EXCLUSION_OPTION_AND_GO;

  constructor(public payload: { exclusionOption: ExcludeOption, exclusionState: ExclusionState }) {}
}

export class SavePersonRoleAndGo implements Action {
  public readonly type = ExclusionActionTypes.SAVE_PERSON_ROLE_AND_GO;

  constructor(public payload: { personRole: PersonRole, exclusionState: ExclusionState }) {}
}

export class UpdatePersonExclusion implements Action {
  public readonly type = ExclusionActionTypes.UPDATE_PERSON_EXCLUSION;
  constructor(public payload: ExclusionState, public person: Person) {}
}

export class ConfirmExclusionAction implements Action {
  public readonly type = ExclusionActionTypes.CONFIRM_EXCLUSION;
  constructor(public payload: ExclusionStateData) {}
}

export class ConfirmExclusionFailureAction implements Action {
  public readonly type = ExclusionActionTypes.CONFIRM_EXCLUSION_FAILURE;
  constructor(public payload: RoleAccessHttpError) {}
}

export type ExclusionAction =
  | ChangeNavigation
  | ExclusionSetCaseId
  | ConfirmExclusionAction
  | ConfirmExclusionFailureAction
  | ExclusionReset
  | SaveExclusionOptionAndGo
  | SavePersonRoleAndGo
  | UpdateDescribeExclusionText
  | UpdatePersonExclusion;
