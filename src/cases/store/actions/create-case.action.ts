import {Action} from '@ngrx/store';

export const CREATE_CASE_APPLY = '[CreateCase] Create Case Apply';
export const RESET_CHANGE = '[CreateCase] Reset Change';

export const CREATE_CASE_FILTER_APPLY = '[CreateCase] Filter Apply';
export const CREATE_CASE_FILTER_CHANGED = '[CreateCase] Filter Changed';

export class ApplyChange implements Action {
  readonly type = CREATE_CASE_APPLY;
  constructor(public payload: any) {}
}

export class ResetChange implements Action {
  readonly type = RESET_CHANGE;
}

export class CaseCreateFilterApply implements Action {
  readonly type = CREATE_CASE_FILTER_APPLY;
  constructor(public payload: any) {}
}

export class CaseCreateFilterChanged implements Action {
  readonly type = CREATE_CASE_FILTER_CHANGED;
  constructor(public payload: any) {}
}
export type CreateCasesAction =
  | ApplyChange
  | ResetChange
  | CaseCreateFilterApply
  | CaseCreateFilterChanged;
