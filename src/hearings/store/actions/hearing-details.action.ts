import { Action } from '@ngrx/store';

export const HEARING_DETAILS = '[HEARING DETAILS] Details';

export class HearingDetails implements Action {
  public readonly type = HEARING_DETAILS;
}

export type HearingDetailsAction = HearingDetails;
