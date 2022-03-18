import { Action } from '@ngrx/store';
import { SpecificAccessState } from '../../models';

export enum SpecificAccessActionTypes {
  CHANGE_NAVIGATION = '[SPECIFIC ACCESS] Change Navigation'
}

export class ChangeSpecificAccessNavigation implements Action {
  public readonly type = SpecificAccessActionTypes.CHANGE_NAVIGATION;

  constructor(public payload: SpecificAccessState) {
  }
}

export type SpecificAccessAction =
  ChangeSpecificAccessNavigation;

