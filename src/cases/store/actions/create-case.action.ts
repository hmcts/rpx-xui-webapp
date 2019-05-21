import {Action} from '@ngrx/store';

export const APPLY_CHANGE = '[CreateCase] Apply Change';
export const RESET_CHANGE = '[CreateCase] Reset Change';

export class ApplyChange implements Action {
  readonly type = APPLY_CHANGE;
  constructor(public payload: any) {}
}

export class ResetChange implements Action {
  readonly type = RESET_CHANGE;
}

export type CreateCasesAction =
  | ApplyChange
  | ResetChange;
