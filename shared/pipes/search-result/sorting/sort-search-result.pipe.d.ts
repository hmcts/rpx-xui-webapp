import { PipeTransform } from '@angular/core';
import { SearchResultViewItem, SortParameters } from '../../../domain';
export declare class SortSearchResultPipe implements PipeTransform {
    transform(searchResults: SearchResultViewItem[], sortParameters: SortParameters): SearchResultViewItem[];
}
