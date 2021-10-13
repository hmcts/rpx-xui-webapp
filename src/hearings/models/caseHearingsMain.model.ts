import { CaseHearingModel } from './caseHearing.model';

export interface CaseHearingsMainModel {
  hmctsServiceID: string;
  caseRef: string;
  caseHearings: CaseHearingModel[];
}
