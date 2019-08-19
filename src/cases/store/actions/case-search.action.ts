import {Action} from '@ngrx/store';

export const JURISDICTION_SELECTED = '[CreateSearch] Jurisdiction Selected';
export const APPLIED = '[CreateSearch] Applied';
export const RESET = '[CreateSearch] Reset';
export const APPLY_SEARCH_FILTER = '[CreateSearch] Apply Search Filter';
export const APPLY_SEARCH_FILTER_SUCCESS = '[CreateSearch] Apply Search Filter Success';
export const APPLY_SEARCH_FILTER_FAIL = '[CreateSearch] Apply Search Filter Fail';
export const FIND_PAGINATION_METADATA = '[CreateSearch] Find pagination metadata';
export const FIND_PAGINATION_METADATA_SUCCESS = '[CreateSearch] Find pagination metadata success';
export const SEARCH_RESULT_PAGE_CHANGE = '[CreateSearch] Search result page change';

export class JurisdictionSelected implements Action {
  readonly type = JURISDICTION_SELECTED;
}

export class Applied implements Action {
  readonly type = APPLIED;
  constructor(public payload: any) {}
}

export class Reset implements Action {
  readonly type = RESET;
}

export class ApplySearchFilter implements Action {
  readonly type = APPLY_SEARCH_FILTER;
  constructor(public payload: any) {
  }
}

export class FindPaginationMetadata implements Action {
  readonly type = FIND_PAGINATION_METADATA;
  constructor(public payload: any) {
  }
}

export class SearchResultPageChange implements Action {
  readonly type = SEARCH_RESULT_PAGE_CHANGE;
  constructor(public payload: any) {
  }
}

export class FindPaginationMetadataSuccess implements Action {
  readonly type = FIND_PAGINATION_METADATA_SUCCESS;
  constructor(public payload: any) {
  }
}

export class ApplySearchFilterSuccess implements Action {
  readonly type = APPLY_SEARCH_FILTER_SUCCESS;
  constructor(public payload: any) {}
}

export class ApplySearchFilterFail implements Action {
  readonly type = APPLY_SEARCH_FILTER_FAIL;
  constructor(public payload: any) {
  }
}

export type CaseSearchAction =
  | JurisdictionSelected
  | Applied
  | Reset
  | ApplySearchFilter
  | FindPaginationMetadata
  | SearchResultPageChange
  | FindPaginationMetadataSuccess
  | ApplySearchFilterSuccess
  | ApplySearchFilterFail;
