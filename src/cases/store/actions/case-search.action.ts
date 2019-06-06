import {Action} from '@ngrx/store';

export const JURISDICTION_SELECTED = '[CreateSearch] Jurisdiction Selected';
export const APPLIED = '[CreateSearch] Applied';
export const RESET = '[CreateSearch] Reset';
export const SUCCESS = '[CreateSearch] Success';
export const ERROR = '[CreateSearch] Error';

export class JurisdictionSelected implements Action {
  readonly type = JURISDICTION_SELECTED;
}

export class Applied implements Action {
  readonly type = APPLIED;
  constructor(public payload: any) {}
}

export class Reset implements Action {
  readonly type = RESET;
}

export class SearchSuccess implements Action {
  readonly type = SUCCESS;
  constructor(public payload: any) {}
}

export class SearchFailure implements Action {
  readonly type = ERROR;
  constructor(public payload: any) {}
}

export type CaseSearchAction =
  | JurisdictionSelected
  | Applied
  | Reset;
