import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class FixedListPipe {
    transform(value, items) {
        if (!!items) {
            const item = items.find(i => i.code === value);
            return item ? item.label : FixedListPipe.EMPTY;
        }
        else {
            return FixedListPipe.EMPTY;
        }
    }
}
FixedListPipe.EMPTY = '';
FixedListPipe.ɵfac = function FixedListPipe_Factory(t) { return new (t || FixedListPipe)(); };
FixedListPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdFixedList", type: FixedListPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FixedListPipe, [{
        type: Pipe,
        args: [{
                name: 'ccdFixedList'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml4ZWQtbGlzdC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvZml4ZWQtbGlzdC9maXhlZC1saXN0LnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBTXBELE1BQU0sT0FBTyxhQUFhO0lBSWpCLFNBQVMsQ0FBQyxLQUFhLEVBQUUsS0FBc0I7UUFDcEQsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQ1gsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUM7WUFDL0MsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7U0FDaEQ7YUFBTTtZQUNMLE9BQU8sYUFBYSxDQUFDLEtBQUssQ0FBQztTQUM1QjtJQUNILENBQUM7O0FBVHVCLG1CQUFLLEdBQUcsRUFBRSxDQUFDOzBFQUZ4QixhQUFhO2tGQUFiLGFBQWE7dUZBQWIsYUFBYTtjQUh6QixJQUFJO2VBQUM7Z0JBQ0osSUFBSSxFQUFFLGNBQWM7YUFDckIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaXhlZExpc3RJdGVtIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2RlZmluaXRpb24vZml4ZWQtbGlzdC1pdGVtLm1vZGVsJztcblxuQFBpcGUoe1xuICBuYW1lOiAnY2NkRml4ZWRMaXN0J1xufSlcbmV4cG9ydCBjbGFzcyBGaXhlZExpc3RQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgRU1QVFkgPSAnJztcblxuICBwdWJsaWMgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcsIGl0ZW1zOiBGaXhlZExpc3RJdGVtW10pOiBhbnkge1xuICAgIGlmICghIWl0ZW1zKSB7XG4gICAgICBjb25zdCBpdGVtID0gaXRlbXMuZmluZChpID0+IGkuY29kZSA9PT0gdmFsdWUpO1xuICAgICAgcmV0dXJuIGl0ZW0gPyBpdGVtLmxhYmVsIDogRml4ZWRMaXN0UGlwZS5FTVBUWTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIEZpeGVkTGlzdFBpcGUuRU1QVFk7XG4gICAgfVxuICB9XG59XG4iXX0=