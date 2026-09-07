export interface GlobalSearchRequest {
  searchCriteria: {
    CCDJurisdictionIds: string[];
    caseReferences: string[];
    caseManagementBaseLocationIds: string[];
  };
  // sort criteria set to null as not needed
  sortCriteria: null;
  maxReturnRecordCount: number;
  startRecordNumber: number;
}
