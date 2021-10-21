import { SearchResultCase } from './search-result-case.model';
import { SearchResultInfo } from './search-result-info.model';

export interface SearchResult {
  info: SearchResultInfo;
  caseList: SearchResultCase[];
}
