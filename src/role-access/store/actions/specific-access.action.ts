import { Action } from '@ngrx/store';
import { SpecificAccessState } from '../../models';
import { AccessReason } from '../../models/enums';

export enum SpecificAccessActionTypes {
  CHANGE_NAVIGATION = '[SPECIFIC ACCESS] Change Navigation',
  DECIDE_SPECIFIC_ACCESS_AND_GO = '[SPECIFIC ACCESS] Decide Specific Access And Go',
}

export class ChangeSpecificAccessNavigation implements Action {
  public readonly type = SpecificAccessActionTypes.CHANGE_NAVIGATION;

  constructor(public payload: SpecificAccessState) {
  }
}

export class DecideSpecificAccessAndGo implements Action {
  public readonly type = SpecificAccessActionTypes.DECIDE_SPECIFIC_ACCESS_AND_GO;
  constructor(public payload: { accessReason: AccessReason, specificAccessState: SpecificAccessState}) {
  }
}

export type SpecificAccessAction =
  | ChangeSpecificAccessNavigation
  | DecideSpecificAccessAndGo;

