import { SearchResultCaseList } from './search-result-case-list.model';
import { SearchResultInfo } from './search-result-info.model';

export interface SearchResult {
  info: SearchResultInfo;
  caseList: SearchResultCaseList
}
