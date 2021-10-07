import { Action } from '@ngrx/store';

export const RESET = '[HEARINGS] Reset';
export const LOAD_ALL_HEARINGS = '[HEARINGS] Load All Hearings';

export class Reset implements Action {
    public readonly type = RESET;
}

export class LoadAllHearings implements Action {
    public readonly type = LOAD_ALL_HEARINGS;
    constructor(public payload: string) {}
}

export type HearingsAction =
  | Reset
  | LoadAllHearings;
