import { SearchResultViewColumn } from '../../../domain/search/search-result-view-column.model';
import { SearchResultViewItemComparator } from '../../../domain/search/sorting/search-result-view-item-comparator';
import * as i0 from "@angular/core";
export declare class SearchResultViewItemComparatorFactory {
    createSearchResultViewItemComparator(column: SearchResultViewColumn): SearchResultViewItemComparator;
    private numberComparator;
    private stringComparator;
    private textArrayComparator;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchResultViewItemComparatorFactory, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SearchResultViewItemComparatorFactory>;
}
//# sourceMappingURL=search-result-view-item-comparator-factory.d.ts.map