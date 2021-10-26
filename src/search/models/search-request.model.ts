import { SearchRequestCriteria, SearchRequestSortCriteria } from './';

export interface SearchRequest {
  maxReturnRecordCount: number;
  searchCriteria: SearchRequestCriteria;
  sortCriteria: SearchRequestSortCriteria;
  startRecordNumber: number;
}
