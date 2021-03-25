// load organisation
import { Action } from '@ngrx/store';

export const LOAD_ORGANISATION = '[Organisation] Load Organisation';
export const LOAD_ORGANISATION_SUCCESS = '[Organisation] Load Organisation Success';
export const LOAD_ORGANISATION_FAIL = '[Organisation] Load Organisation Fail';

export class LoadOrganisation {
  readonly type = LOAD_ORGANISATION;
  constructor() { }
}

export class LoadOrganisationSuccess implements Action {
  readonly type = LOAD_ORGANISATION_SUCCESS;
  constructor(public payload: any) {
  }
}

export class LoadOrganisationFail implements Action {
  readonly type = LOAD_ORGANISATION_FAIL;
  constructor(public payload: any) { }
}

export type organisationActions =
  | LoadOrganisation
  | LoadOrganisationSuccess
  | LoadOrganisationFail;

