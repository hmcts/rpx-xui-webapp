import { SearchRequestParty } from './search-request-party.model';

export class SearchRequestCriteria {
  CCDCaseTypeIds: string[];
  CCDJurisdictionIds: string[];
  caseManagementBaseLocationIds: string[];
  caseManagementRegionIds: string[];
  caseReferences: string[];
  otherReferences: string[];
  parties: SearchRequestParty[];
  stateIds: string[];
}
