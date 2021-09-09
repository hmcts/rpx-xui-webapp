import { SearchResultViewItem } from '../search-result-view-item.model';
export interface SearchResultViewItemComparator {
    compare(a: SearchResultViewItem, b: SearchResultViewItem): number;
}
