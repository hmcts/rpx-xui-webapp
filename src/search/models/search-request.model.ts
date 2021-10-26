import { SearchRequestCriteria, SearchRequestSortCriteria } from './index';

export interface SearchRequest {
  maxReturnRecordCount: number;
  searchCriteria: SearchRequestCriteria;
  sortCriteria: SearchRequestSortCriteria;
  startRecordNumber: number;
}
