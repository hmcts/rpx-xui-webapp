import {Action} from '@ngrx/store';

export const JURISTDICTION_SELECTED = '[CreateSearch] Jurisdiction Selected';
export const APPLIED = '[CreateSearch] Applied';
export const RESET = '[CreateSearch] Reset';

export class JurisdictionSelected implements Action {
  readonly type = JURISTDICTION_SELECTED;
}

export class Applied implements Action {
  readonly type = APPLIED;
}

export class Reset implements Action {
  readonly type = RESET;
}

export type CaseSearchAction =
  | JurisdictionSelected
  | Applied
  | Reset;
