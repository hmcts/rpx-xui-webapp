import {Action} from '@ngrx/store';

export const APPLYFILTER = '[CaseListFilter] Applied';
export const RESETFILTER = '[CaseListFilter] Reset';

export class ApplyFilter implements Action {
  readonly type = APPLYFILTER;
  constructor(public payload: any) {}
}

export class ResetFilter implements Action {
  readonly type = RESETFILTER;
}

export type CaseListFilterAction =
  | ApplyFilter
  | ResetFilter;
