import { CaseCategoryModel } from './caseCategory.model';

// Used in hearingActualsMainModel and hearingRequestMainModel to define the case details data structure returned from the API
// Not populated directly
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
