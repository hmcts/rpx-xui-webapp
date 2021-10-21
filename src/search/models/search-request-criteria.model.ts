import { SearchRequestParty } from "./search-request-party.model";

export class SearchRequestCriteria {
  ccdCaseTypeIds: string[];
  ccdJurisdictionIds: string[];
  caseManagementBaseLocationIds: string[];
  caseManagementRegionIds: string[];
  caseReferences: string[];
  otherReferences: string[];
  parties: SearchRequestParty[];
  stateIds: string[];
}
