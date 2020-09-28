import { Action } from '@ngrx/store';
import { NocNavigationState } from '../reducers/noc-navigation.reducer';

export const CHANGE_NAVIGATION = '[NOC Navigation] Change Navigation';

export class ChangeNavigation implements Action {
    readonly type = CHANGE_NAVIGATION;
    constructor(public payload: NocNavigationState) {}
}

export type NocNavigationAction =
  | ChangeNavigation;
