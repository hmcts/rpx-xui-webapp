import { Action } from '@ngrx/store';
import { Person } from '../../../work-allocation-2/models/dtos';
import { ExclusionState } from '../../models';

export const RESET = '[EXCLUSION] Reset';
export const CHANGE_NAVIGATION = '[EXCLUSION] Change Navigation';
export const UPDATE_DESCRIBE_EXCLUSION_TEXT = '[EXCLUSION] Update Describe Exclusion Text';
export const UPDATE_PERSON_EXCLUSION = '[EXCLUSION] Update Person Exclusion';

export class Reset implements Action {
  public readonly type = RESET;
}

export class UpdatePersonExclusion implements Action {
  public readonly type = UPDATE_PERSON_EXCLUSION;
  constructor(public payload: ExclusionState, public person: Person) {}
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

export type ExclusionAction =
  | UpdateDescribeExclusionText
  | Reset
  | ChangeNavigation
  | UpdatePersonExclusion;
