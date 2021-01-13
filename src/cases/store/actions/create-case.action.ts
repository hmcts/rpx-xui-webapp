import {Action} from '@ngrx/store';

export const CREATE_CASE_APPLY = '[CreateCase] Create Case Apply';
export const CREATE_CASE_RESET = '[CreateCase] Reset Change';

export const CREATE_CASE_FILTER_APPLY = '[CreateCase] Filter Apply';
export const CREATE_CASE_FILTER_CHANGED = '[CreateCase] Filter Changed';

export const CREATED_CASE_LOADED = '[CreateCase] Load Finished';

export class ApplyChange implements Action {
  public readonly type = CREATE_CASE_APPLY;
  constructor(public payload: any) {}
}

export class CreateCaseReset implements Action {
  public readonly type = CREATE_CASE_RESET;
}

export class CreateCaseLoaded implements Action {
  constructor(public caseId: any) {}
  public readonly type = CREATED_CASE_LOADED;
}

export class CaseCreateFilterApply implements Action {
  public readonly type = CREATE_CASE_FILTER_APPLY;
  constructor(public payload: any) {}
}

export class CaseCreateFilterChanged implements Action {
  public readonly type = CREATE_CASE_FILTER_CHANGED;
  constructor(public payload: any) {}
}
export type CreateCasesAction =
  | ApplyChange
  | CreateCaseReset
  | CaseCreateFilterApply
  | CaseCreateFilterChanged
  | CreateCaseLoaded;
