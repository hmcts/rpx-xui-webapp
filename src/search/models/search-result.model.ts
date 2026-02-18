import { ResultInfo } from './result-info.model';
import { Result } from './result.model';

export interface SearchResult {
  resultInfo: ResultInfo;
  results: Result[];
}
