import { Action } from '@ngrx/store';
import { HttpError } from '../../../models/httpError.model';
import {
  LinkedHearingGroupMainModel,
  ServiceLinkedCasesModel,
  ServiceLinkedCasesWithHearingsModel
} from '../../models/linkHearings.model';

export const RESET_HEARING_LINKS = '[HEARING LINKS] Reset Hearing Links';
export const LOAD_SERVICE_LINKED_CASES = '[HEARING LINKS] Load Service Linked Cases';
export const LOAD_SERVICE_LINKED_CASES_SUCCESS = '[HEARING LINKS] Load Service Linked Cases Success';
export const LOAD_SERVICE_LINKED_CASES_FAILURE = '[HEARING LINKS] Load Service Linked Cases Failure';
export const LOAD_SERVICE_LINKED_CASES_GROUP_DETAILS = '[HEARING LINKS] Load Service Linked Details Success';
export const LOAD_SERVICE_LINKED_CASES_WITH_HEARINGS = '[HEARING LINKS] Load Service Linked Cases With Hearings';
export const LOAD_SERVICE_LINKED_CASES_WITH_HEARINGS_SUCCESS = '[HEARING LINKS] Load Service Linked Cases With Hearings Success';
export const LOAD_SERVICE_LINKED_CASES_WITH_HEARINGS_FAILURE = '[HEARING LINKS] Load Service Linked Cases With Hearings Failure';
export const LOAD_LINKED_HEARING_GROUP = '[HEARING LINKS] Load Linked Hearing Group';
export const LOAD_LINKED_HEARING_GROUP_SUCCESS = '[HEARING LINKS] Load Linked Hearing Group Success';
export const LOAD_LINKED_HEARING_GROUP_FAILURE = '[HEARING LINKS] Load Linked Hearing Group Failure';
export const SUBMIT_LINKED_HEARING_GROUP = '[HEARING LINKS] Submit Linked Hearing Group';
export const SUBMIT_LINKED_HEARING_GROUP_FAILURE = '[HEARING LINKS] Submit Linked Hearing Group Failure';
export const MANAGE_LINKED_HEARING_GROUP = '[HEARING LINKS] Manage Linked Hearing Group';
export const MANAGE_LINKED_HEARING_GROUP_FAILURE = '[HEARING LINKS] Manage Linked Hearing Group Failure';
export const RESET_LINKED_HEARING_LAST_ERROR = '[HEARING LINKS] Reset Linked Hearing Last Error';

export class ResetHearingLinks implements Action {
  public readonly type = RESET_HEARING_LINKS;
}
export class LoadServiceLinkedCasesPayload {
  constructor(public jurisdictionId: string, public caseReference: string, public hearingId: string) {}
}

export class LoadServiceLinkedCases implements Action {
  public readonly type = LOAD_SERVICE_LINKED_CASES;
  constructor(public payload: { jurisdictionId: string, caseReference: string, hearingId: string }) {}
}

export class LoadServiceLinkedCasesSuccess implements Action {
  public readonly type = LOAD_SERVICE_LINKED_CASES_SUCCESS;
  constructor(public payload: ServiceLinkedCasesModel[]) {}
}

export class LoadServiceLinkedCasesFailure implements Action {
  public readonly type = LOAD_SERVICE_LINKED_CASES_FAILURE;
  constructor(public payload: HttpError) {}
}

export class LoadServiceLinkedCasesWithHearingsPayload {
  constructor(public jurisdictionId: string, public caseReference: string, public caseName: string, public hearingId?: string) {}
}

export class LoadServiceLinkedCasesWithHearings implements Action {
  public readonly type = LOAD_SERVICE_LINKED_CASES_WITH_HEARINGS;
  constructor(public payload: { jurisdictionId: string, caseReference: string, caseName: string, hearingId?: string }) {}
}

export class LoadServiceLinkedCasesWithHearingsSuccess implements Action {
  public readonly type = LOAD_SERVICE_LINKED_CASES_WITH_HEARINGS_SUCCESS;
  constructor(public payload: ServiceLinkedCasesWithHearingsModel[]) {}
}

export class LoadServiceLinkedCasesWithHearingsFailure implements Action {
  public readonly type = LOAD_SERVICE_LINKED_CASES_WITH_HEARINGS_FAILURE;
  constructor(public payload: HttpError) {}
}

export class LoadServiceLinkedCasesGroupDetail implements Action {
  public readonly type = LOAD_SERVICE_LINKED_CASES_GROUP_DETAILS;
  constructor(public payload: LinkedHearingGroupMainModel) {}
}

export class LoadLinkedHearingGroup implements Action {
  public readonly type = LOAD_LINKED_HEARING_GROUP;
  constructor(public payload: { groupId: string }) {}
}

export class LoadLinkedHearingGroupSuccess implements Action {
  public readonly type = LOAD_LINKED_HEARING_GROUP_SUCCESS;
  constructor(public payload: LinkedHearingGroupMainModel) {}
}

export class LoadLinkedHearingGroupFailure implements Action {
  public readonly type = LOAD_LINKED_HEARING_GROUP_FAILURE;
  constructor(public payload: HttpError) {}
}

export class SubmitLinkedHearingGroup implements Action {
  public readonly type = SUBMIT_LINKED_HEARING_GROUP;
  constructor(public payload: { linkedHearingGroup: LinkedHearingGroupMainModel, caseId: string, hearingId: string, hearingGroupRequestId: string, isManageLink: boolean }) {}
}

export class SubmitLinkedHearingGroupFailure implements Action {
  public readonly type = SUBMIT_LINKED_HEARING_GROUP_FAILURE;
  constructor(public payload: HttpError) {}
}

export class ManageLinkedHearingGroup implements Action {
  public readonly type = MANAGE_LINKED_HEARING_GROUP;
  constructor(public payload: { linkedHearingGroup: LinkedHearingGroupMainModel, caseId: string, hearingGroupRequestId: string, hearingId: string }) {}
}

export class ManageLinkedHearingGroupFailure implements Action {
  public readonly type = MANAGE_LINKED_HEARING_GROUP_FAILURE;
  constructor(public payload: HttpError) {}
}

export class ResetLinkedHearingLastError implements Action {
  public readonly type = RESET_LINKED_HEARING_LAST_ERROR;
}

export type HearingLinksAction =
  | ResetHearingLinks
  | LoadServiceLinkedCases
  | LoadServiceLinkedCasesSuccess
  | LoadServiceLinkedCasesFailure
  | LoadServiceLinkedCasesGroupDetail
  | LoadServiceLinkedCasesWithHearings
  | LoadServiceLinkedCasesWithHearingsSuccess
  | LoadServiceLinkedCasesWithHearingsFailure
  | LoadLinkedHearingGroup
  | LoadLinkedHearingGroupSuccess
  | LoadLinkedHearingGroupFailure
  | SubmitLinkedHearingGroup
  | SubmitLinkedHearingGroupFailure
  | ManageLinkedHearingGroup
  | ManageLinkedHearingGroupFailure
  | ResetLinkedHearingLastError;
