import {Action} from '@ngrx/store';

export const HEARING_REQUEST_RESET = '[HEARING REQUEST] Reset';

export class HearingRequestReset implements Action {
  public readonly type = HEARING_REQUEST_RESET;
}

export type HearingRequestAction =
  | HearingRequestReset;
