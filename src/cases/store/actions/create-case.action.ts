import {Action} from '@ngrx/store';

export const APPLY_CHANGE = '[CreateCase] Apply Change';
export const RESET_CHANGE = '[CreateCase] Reset Change';

export const CREATE_CASE_FILTER_APPLY = '[CreateCaseFilter] Apply Change';
export const CREATE_CASE_FILTER_CHANGED = '[CreateCaseFilter] Selection Changed';

export class ApplyChange implements Action {
  readonly type = APPLY_CHANGE;
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
