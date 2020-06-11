import { SearchResultViewItem } from '@hmcts/ccd-case-ui-toolkit';
import { Action } from '@ngrx/store';

export const ADD_SHARE_CASES       = '[ShareCase] Add Share Cases';
export const DELETE_A_SHARE_CASE    = '[ShareCase] Delete A Share Case';

export class AddShareCases implements Action {
  public readonly type = ADD_SHARE_CASES;
  constructor(public payload: SearchResultViewItem[]) {}
}

export class DeleteAShareCase implements Action {
  public readonly type = DELETE_A_SHARE_CASE;
  constructor(public payload: string) {}
}

export type Actions = AddShareCases | DeleteAShareCase;
