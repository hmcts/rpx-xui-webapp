import {Action} from '@ngrx/store';
import {HttpError} from '../../../models/httpError.model';
import {LinkedHearingGroupMainModel, ServiceLinkedCasesModel} from '../../models/linkHearings.model';

export const RESET_HEARING_LINKS = '[HEARING LINKS] Reset Hearing Links';
export const LOAD_SERVICE_LINKED_CASES = '[HEARING LINKS] Load Service Linked Cases';
export const LOAD_SERVICE_LINKED_CASES_SUCCESS = '[HEARING LINKS] Load Service Linked Cases Success';
export const LOAD_SERVICE_LINKED_CASES_FAILURE = '[HEARING LINKS] Load Service Linked Cases Failure';
export const LOAD_SERVICE_LINKED_CASES_GROUP_DETAILS = '[HEARING LINKS] Load Service Linked Details Success';

export class ResetHearingLinks implements Action {
  public readonly type = RESET_HEARING_LINKS;
}

export class LoadServiceLinkedCases implements Action {
  public readonly type = LOAD_SERVICE_LINKED_CASES;
  constructor(public payload: { caseReference: string, hearingId: string }) {
  }
}

export class LoadServiceLinkedCasesSuccess implements Action {
  public readonly type = LOAD_SERVICE_LINKED_CASES_SUCCESS;
  constructor(public payload: ServiceLinkedCasesModel[]) {
  }
}

export class LoadServiceLinkedCasesFailure implements Action {
  public readonly type = LOAD_SERVICE_LINKED_CASES_FAILURE;
  constructor(public payload: HttpError) {
  }
}

export class LoadServiceLinkedCasesGroupDetail implements Action {
  public readonly type = LOAD_SERVICE_LINKED_CASES_GROUP_DETAILS;
  constructor(public payload: LinkedHearingGroupMainModel) {
  }
}

export type HearingLinksAction =
  | ResetHearingLinks
  | LoadServiceLinkedCases
  | LoadServiceLinkedCasesSuccess
  | LoadServiceLinkedCasesFailure
  | LoadServiceLinkedCasesGroupDetail;
