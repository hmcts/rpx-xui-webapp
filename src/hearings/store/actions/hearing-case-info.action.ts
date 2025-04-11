import Action from '@ngrx/store';

export const STORE_JURISDICTION_AND_CASE_REF = '[HEARING VALUES] Store Jurisdiction and Case Ref';
export const RESET_JURISDICTION_AND_CASE_REF = '[HEARING VALUES] Reset Jurisdiction and Case Ref';

export class StoreJurisdictionAndCaseRef implements Action {
  public readonly type = STORE_JURISDICTION_AND_CASE_REF;
  constructor(public payload: any) {}
}
export class ResetJurisdictionAndCaseRef implements Action {
  public readonly type = RESET_JURISDICTION_AND_CASE_REF;
}

export type CaseInfoActions = StoreJurisdictionAndCaseRef | ResetJurisdictionAndCaseRef;
