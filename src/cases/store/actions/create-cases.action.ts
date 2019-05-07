import {Action} from '@ngrx/store';

export const SELECTION_CHANGED = '[CreateCase] Selection Changed';
export const PAGE_CHANGED = '[CreateCase] Page Changed';
export const APPLY_CHANGE = '[CreateCase] Apply Change';
export const RESET_CHANGE = '[CreateCase] Reset Change';

export class SelectionChanged implements Action {
  readonly type = SELECTION_CHANGED;
}

export class PaygeChanged implements Action {
  readonly type = PAGE_CHANGED;
  constructor(public payload: number) {}
}

export class ApplyChange implements Action {
  readonly type = APPLY_CHANGE;
  constructor(public payload: number) {}
}

export class ResetChange implements Action {
  readonly type = RESET_CHANGE;
  constructor(public payload: number) {}
}

export type CreateCasesAction =
  | SelectionChanged
  | PaygeChanged
  | ApplyChange
  | ResetChange;
