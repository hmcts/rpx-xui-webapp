export interface SearchResultCase {
  ccdCaseTypeId: string;
  ccdCaseTypeName: string;
  ccdJurisdictionId: string;
  ccdJurisdictionName: string;
  hmctsServiceId: string;
  hmctsServiceShortDescription: string;
  baseLocationId: string;
  baseLocationName: string;
  caseManagementCategoryId: string;
  caseManagementCategoryName: string;
  caseNameHmctsInternal: string;
  caseReference: string;
  otherReferences: string[];
  processForAccess: string;
  regionId: string;
  regionName: string;
  stateId: string;
}
