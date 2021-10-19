import { SearchRequestCriteria } from "./search-request-criteria.model";
import { SearchRequestSortCriteria } from "./search-request-sort-criteria.model"

export interface SearchRequest {
  maxReturnRecordCount: number;
  searchCriteria: SearchRequestCriteria;
  sortCriteria: SearchRequestSortCriteria;
  startRecordNumber: number;
}
