import { PipeTransform } from '@angular/core';
import { SearchResultViewItem } from '../../../domain/search/search-result-view-item.model';
import { SortParameters } from '../../../domain/search/sorting/sort-parameters';
import * as i0 from "@angular/core";
export declare class SortSearchResultPipe implements PipeTransform {
    transform(searchResults: SearchResultViewItem[], sortParameters: SortParameters): SearchResultViewItem[];
    static ɵfac: i0.ɵɵFactoryDeclaration<SortSearchResultPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<SortSearchResultPipe, "ccdSortSearchResult", false>;
}
//# sourceMappingURL=sort-search-result.pipe.d.ts.map