import { Action } from '@ngrx/store';
import { OrganisationVm } from '../reducers';

export const LOAD_ALL_ORGANISATIONS = '[OrganisationsList] Load All Organisations';
export const LOAD_ALL_ORGANISATIONS_SUCCESS = '[OrganisationsList] Load All Organisations Success';
export const LOAD_ALL_ORGANISATIONS_FAILURE = '[OrganisationsList] Load All Organisations Failure';

export class LoadAllOrganisations implements Action {
    public readonly type = LOAD_ALL_ORGANISATIONS;
}

export class LoadAllOrganisationsSuccess implements Action {
    constructor(public payload: OrganisationVm[]) {}
    public readonly type = LOAD_ALL_ORGANISATIONS_SUCCESS;
}

export class LoadAllOrganisationsFailure implements Action {
    constructor(public payload: any) {}
    public readonly type = LOAD_ALL_ORGANISATIONS_FAILURE;
}

export type OrganisationsActions = LoadAllOrganisations | LoadAllOrganisationsFailure | LoadAllOrganisationsSuccess;
