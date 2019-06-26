import {Action} from '@ngrx/store';

export const APPLYCASELISTFILTER = '[CaseListFilter] Applied';
export const RESETFILTER = '[CaseListFilter] Reset';

export class ApplyFilter implements Action {
  readonly type = APPLYCASELISTFILTER;
  constructor(public payload: any) {}
}

export class ResetFilter implements Action {
  readonly type = RESETFILTER;
}

export type CaseListFilterAction =
  | ApplyFilter
  | ResetFilter;
