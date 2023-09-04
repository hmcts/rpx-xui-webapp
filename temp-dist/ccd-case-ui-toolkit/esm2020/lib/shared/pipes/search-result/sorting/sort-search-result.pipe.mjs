import { Pipe } from '@angular/core';
import { isUndefined } from 'util';
import { SortOrder } from '../../../components/palette/complex/sort-order';
import * as i0 from "@angular/core";
export class SortSearchResultPipe {
    transform(searchResults, sortParameters) {
        if (isUndefined(searchResults) || isUndefined(sortParameters)) {
            return searchResults;
        }
        return searchResults.sort((a, b) => {
            return sortParameters.comparator.compare(a, b)
                * (sortParameters.sortOrder === SortOrder.DESCENDING ? 1 : -1);
        });
    }
}
SortSearchResultPipe.ɵfac = function SortSearchResultPipe_Factory(t) { return new (t || SortSearchResultPipe)(); };
SortSearchResultPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdSortSearchResult", type: SortSearchResultPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SortSearchResultPipe, [{
        type: Pipe,
        args: [{
                name: 'ccdSortSearchResult'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1zZWFyY2gtcmVzdWx0LnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL3BpcGVzL3NlYXJjaC1yZXN1bHQvc29ydGluZy9zb3J0LXNlYXJjaC1yZXN1bHQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQzs7QUFPM0UsTUFBTSxPQUFPLG9CQUFvQjtJQUV4QixTQUFTLENBQUMsYUFBcUMsRUFBRSxjQUE4QjtRQUVwRixJQUFJLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxXQUFXLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDN0QsT0FBTyxhQUFhLENBQUM7U0FDdEI7UUFDRCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQ3ZCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ1AsT0FBTyxjQUFjLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2tCQUNsQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNFLENBQUMsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7d0ZBYlUsb0JBQW9CO2dHQUFwQixvQkFBb0I7dUZBQXBCLG9CQUFvQjtjQUhoQyxJQUFJO2VBQUM7Z0JBQ0osSUFBSSxFQUFFLHFCQUFxQjthQUM1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGlzVW5kZWZpbmVkIH0gZnJvbSAndXRpbCc7XG5pbXBvcnQgeyBTb3J0T3JkZXIgfSBmcm9tICcuLi8uLi8uLi9jb21wb25lbnRzL3BhbGV0dGUvY29tcGxleC9zb3J0LW9yZGVyJztcbmltcG9ydCB7IFNlYXJjaFJlc3VsdFZpZXdJdGVtIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL3NlYXJjaC9zZWFyY2gtcmVzdWx0LXZpZXctaXRlbS5tb2RlbCc7XG5pbXBvcnQgeyBTb3J0UGFyYW1ldGVycyB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9zZWFyY2gvc29ydGluZy9zb3J0LXBhcmFtZXRlcnMnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdjY2RTb3J0U2VhcmNoUmVzdWx0J1xufSlcbmV4cG9ydCBjbGFzcyBTb3J0U2VhcmNoUmVzdWx0UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIHB1YmxpYyB0cmFuc2Zvcm0oc2VhcmNoUmVzdWx0czogU2VhcmNoUmVzdWx0Vmlld0l0ZW1bXSwgc29ydFBhcmFtZXRlcnM6IFNvcnRQYXJhbWV0ZXJzKSB7XG5cbiAgICBpZiAoaXNVbmRlZmluZWQoc2VhcmNoUmVzdWx0cykgfHwgaXNVbmRlZmluZWQoc29ydFBhcmFtZXRlcnMpKSB7XG4gICAgICByZXR1cm4gc2VhcmNoUmVzdWx0cztcbiAgICB9XG4gICAgcmV0dXJuIHNlYXJjaFJlc3VsdHMuc29ydChcbiAgICAgIChhLCBiKSA9PiB7XG4gICAgICAgIHJldHVybiBzb3J0UGFyYW1ldGVycy5jb21wYXJhdG9yLmNvbXBhcmUoYSwgYilcbiAgICAgICAgICAgICAgICAgICogKHNvcnRQYXJhbWV0ZXJzLnNvcnRPcmRlciA9PT0gU29ydE9yZGVyLkRFU0NFTkRJTkcgPyAxIDogLTEpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxufVxuIl19