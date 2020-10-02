import { Action } from '@ngrx/store';
import { Noc } from '../models/noc.state';

export const CHANGE_NAVIGATION = '[NOC Navigation] Change Navigation';

export class ChangeNavigation implements Action {
    readonly type = CHANGE_NAVIGATION;
    constructor(public payload: Noc) {}
}

export type NocNavigationAction =
  | ChangeNavigation;
