import { SearchResultViewColumn, SearchResultViewItemComparator } from '../../../domain';
export declare class SearchResultViewItemComparatorFactory {
    createSearchResultViewItemComparator(column: SearchResultViewColumn): SearchResultViewItemComparator;
    private numberComparator;
    private stringComparator;
    private textArrayComparator;
}
