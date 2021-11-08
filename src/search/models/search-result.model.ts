import { Result } from './result.model';
import { ResultInfo } from './result-info.model';

export interface SearchResult {
  resultInfo: ResultInfo;
  results: Result[];
}
