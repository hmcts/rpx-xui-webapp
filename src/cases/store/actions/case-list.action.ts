import {Action} from '@ngrx/store';

export const CASELIST_JURISDICTION_SELECTED = '[CreateCaselist] Jurisdiction Selected';
export const CASELIST_APPLIED = '[CreateCaselist] Applied';
export const CASELIST_RESET = '[CreateCaselist] Reset';
export const APPLY_CASELIST_FILTER = '[CreateCaselist] Apply Caselist Filter';
export const APPLY_CASELIST_FILTER_SUCCESS = '[CreateCaselist] Apply Caselist Filter Success';
export const APPLY_CASELIST_FILTER_FAIL = '[CreateCaselist] Apply Caselist Filter Fail';
export const FIND_CASELIST_PAGINATION_METADATA = '[CreateCaselist] Find caselist pagination metadata';
export const FIND_CASELIST_PAGINATION_METADATA_SUCCESS = '[CreateCaselist] Find caselist pagination metadata success';
export const CASELIST_RESULT_PAGE_CHANGE = '[CreateCaselist] Caselist result page change';

export class CaseListJurisdictionSelected implements Action {
  readonly type = CASELIST_JURISDICTION_SELECTED;
}

export class CaseListApplied implements Action {
  readonly type = CASELIST_APPLIED;
  constructor(public payload: any) {}
}

export class CaseListReset implements Action {
  readonly type = CASELIST_RESET;
}

export class ApplyCaselistFilter implements Action {
  readonly type = APPLY_CASELIST_FILTER;
  constructor(public payload: any) {
  }
}

export class FindCaselistPaginationMetadata implements Action {
  readonly type = FIND_CASELIST_PAGINATION_METADATA;
  constructor(public payload: any) {
  }
}

export class CaselistResultPageChange implements Action {
  readonly type = CASELIST_RESULT_PAGE_CHANGE;
  constructor(public payload: any) {
  }
}

export class FindCaselistPaginationMetadataSuccess implements Action {
  readonly type = FIND_CASELIST_PAGINATION_METADATA_SUCCESS;
  constructor(public payload: any) {
  }
}

export class ApplyCaselistFilterSuccess implements Action {
  readonly type = APPLY_CASELIST_FILTER_SUCCESS;
  constructor(public payload: any) {}
}

export class ApplyCaselistFilterFail implements Action {
  readonly type = APPLY_CASELIST_FILTER_FAIL;
  constructor(public payload: any) {
  }
}

export type CaselistAction =
  | CaseListJurisdictionSelected
  | CaseListApplied
  | CaseListReset
  | ApplyCaselistFilter
  | FindCaselistPaginationMetadata
  | CaselistResultPageChange
  | FindCaselistPaginationMetadataSuccess
  | ApplyCaselistFilterSuccess
  | ApplyCaselistFilterFail;
