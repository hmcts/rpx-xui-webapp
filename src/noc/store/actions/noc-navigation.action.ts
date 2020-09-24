import { Action } from '@ngrx/store';

export const CHANGE_NAVIGATION = '[NOC Navigation] Change Navigation';

export class ChangeNavigation implements Action {
    readonly type = CHANGE_NAVIGATION;
    constructor(public payload: any) {}
}

export type NocNavigationAction =
  | ChangeNavigation;
