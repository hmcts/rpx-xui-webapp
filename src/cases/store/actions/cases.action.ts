import {Action} from '@ngrx/store';

export const SEARCH_CASES = '[Cases] Search Cases';
// todo this is just a place holder
export class SearchCases implements Action {
  readonly type = SEARCH_CASES;
  constructor(public payload: string) {}
}


export type CasesAction =
  | SearchCases;
