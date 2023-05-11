import { RoleCategory } from '@hmcts/ccd-case-ui-toolkit';
import { Action } from '@ngrx/store';

import { Period, SpecificAccessFormData, SpecificAccessMoreInformationForm, SpecificAccessState, SpecificAccessStateData } from '../../models';
import { AccessReason } from '../../models/enums';

export enum SpecificAccessActionTypes {
  APPROVE_SPECIFIC_ACCESS_REQUEST = '[APPROVE_SPECIFIC_ACCESS_REQUEST] Approve Specific Access Request',
  CHANGE_NAVIGATION = '[SPECIFIC ACCESS] Change Navigation',
  SET_SPECIFIC_ACCESS_INITIAL_DATA = '[SPECIFIC ACCESS] Set Specific Access Initial Data',
  SET_SPECIFIC_ACCESS_FORM_DATA = '[SPECIFIC ACCESS] Set Specific Access Form Data',
  SET_SPECIFIC_ACCESS_INFO_FORM_DATA = '[SPECIFIC ACCESS] Set Specific Access Info Form Data',
  DECIDE_SPECIFIC_ACCESS_AND_GO = '[SPECIFIC ACCESS] Decide Specific Access And Go',
  REQUEST_MORE_INFO_SPECIFIC_ACCESS_REQUEST = '[REQUEST_MORE_INFO_SPECIFIC_ACCESS_REQUEST] Request More Info Specific Access Request',
}

export class ChangeSpecificAccessNavigation implements Action {
  public readonly type = SpecificAccessActionTypes.CHANGE_NAVIGATION;

  constructor(public payload: SpecificAccessState) {}
}

export class SetSpecificAccessInitData implements Action {
  public readonly type = SpecificAccessActionTypes.SET_SPECIFIC_ACCESS_INITIAL_DATA;
  constructor(public payload: {
    state: SpecificAccessState,
    caseId: string,
    taskId: string,
    requestId: string,
    jurisdiction: string,
    caseName: string,
    requestCreated: string,
    actorId: string,
    accessReason: string,
    specificAccessReason: string,
    roleCategory: RoleCategory,
    requestedRole: string
  }) {}
}

export class DecideSpecificAccessAndGo implements Action {
  public readonly type = SpecificAccessActionTypes.DECIDE_SPECIFIC_ACCESS_AND_GO;
  constructor(public payload: { accessReason: AccessReason, specificAccessState: SpecificAccessState }) {}
}

export class SetSpecificAccessFormData implements Action {
  public readonly type = SpecificAccessActionTypes.SET_SPECIFIC_ACCESS_FORM_DATA;

  constructor(public payload: SpecificAccessFormData) {}
}

export class SetSpecificAccessInfoFormData implements Action {
  public readonly type = SpecificAccessActionTypes.SET_SPECIFIC_ACCESS_INFO_FORM_DATA;

  constructor(public payload: SpecificAccessMoreInformationForm) {}
}

export class RequestMoreInfoSpecificAccessRequest implements Action {
  public readonly type = SpecificAccessActionTypes.REQUEST_MORE_INFO_SPECIFIC_ACCESS_REQUEST;
  constructor(public payload: SpecificAccessStateData) {}
}
export class ApproveSpecificAccessRequest implements Action {
  public readonly type = SpecificAccessActionTypes.APPROVE_SPECIFIC_ACCESS_REQUEST;
  constructor(public payload: { specificAccessStateData: SpecificAccessStateData, period: Period }) {}
}

export type SpecificAccessAction =
  | ApproveSpecificAccessRequest
  | DecideSpecificAccessAndGo
  | SetSpecificAccessInitData
  | SetSpecificAccessFormData
  | ChangeSpecificAccessNavigation
  | SetSpecificAccessInfoFormData
  | RequestMoreInfoSpecificAccessRequest;

