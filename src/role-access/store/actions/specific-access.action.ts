import { Action } from '@ngrx/store';
import { AccessReason } from '../../models/enums';
import { SpecificAccessFormData, SpecificAccessMoreInformationForm, SpecificAccessState, SpecificAccessStateData } from '../../models';

export enum SpecificAccessActionTypes {
  CHANGE_NAVIGATION = '[SPECIFIC ACCESS] Change Navigation',
  SET_SPECIFIC_ACCESS_FORM_DATA = '[SPECIFIC ACCESS] Set Specific Access Form Data',
  SET_SPECIFIC_ACCESS_INFO_FORM_DATA = '[SPECIFIC ACCESS] Set Specific Access Info Form Data',
  DECIDE_SPECIFIC_ACCESS_AND_GO = '[SPECIFIC ACCESS] Decide Specific Access And Go',
  REQUEST_MORE_INFO_SPECIFIC_ACCESS_REQUEST = '[REQUEST_MORE_INFO_SPECIFIC_ACCESS_REQUEST] Request More Info Specific Access Request',
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

export class SetSpecificAccessFormData implements Action {
  public readonly type = SpecificAccessActionTypes.SET_SPECIFIC_ACCESS_FORM_DATA;

  constructor(public payload: SpecificAccessFormData) {
  }
}

export class SetSpecificAccessInfoFormData implements Action {
  public readonly type = SpecificAccessActionTypes.SET_SPECIFIC_ACCESS_INFO_FORM_DATA;

  constructor(public payload: SpecificAccessMoreInformationForm) {
  }
}

export class RequestMoreInfoSpecificAccessRequest implements Action {
  public readonly type = SpecificAccessActionTypes.REQUEST_MORE_INFO_SPECIFIC_ACCESS_REQUEST;
  constructor(public payload: SpecificAccessStateData) {
  }
}




export type SpecificAccessAction =
  | DecideSpecificAccessAndGo
  | SetSpecificAccessFormData
  | ChangeSpecificAccessNavigation
  | SetSpecificAccessInfoFormData
  | RequestMoreInfoSpecificAccessRequest;

