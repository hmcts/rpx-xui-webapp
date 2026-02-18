import { CaseCategoryModel } from './caseCategory.model';

export interface CaseDetailsModel {
  hmctsServiceCode: string;
  caseRef: string;
  requestTimeStamp: string;
  hearingID?: string;
  externalCaseReference?: string;
  caseDeepLink: string;
  hmctsInternalCaseName: string;
  publicCaseName: string;
  caseAdditionalSecurityFlag?: boolean;
  caseInterpreterRequiredFlag: boolean;
  caseCategories: CaseCategoryModel[];
  caseManagementLocationCode: string;
  caserestrictedFlag: boolean;
  caseSLAStartDate: string;
}
