import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class DashPipe {
    transform(value) {
        return value ? value : '-';
    }
}
DashPipe.ɵfac = function DashPipe_Factory(t) { return new (t || DashPipe)(); };
DashPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdDash", type: DashPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DashPipe, [{
        type: Pipe,
        args: [{
                name: 'ccdDash'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvdXRpbHMvZGFzaC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUtwRCxNQUFNLE9BQU8sUUFBUTtJQUVaLFNBQVMsQ0FBQyxLQUFhO1FBQzVCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUM3QixDQUFDOztnRUFKVSxRQUFRO3dFQUFSLFFBQVE7dUZBQVIsUUFBUTtjQUhwQixJQUFJO2VBQUM7Z0JBQ0osSUFBSSxFQUFFLFNBQVM7YUFDaEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2NjZERhc2gnXG59KVxuZXhwb3J0IGNsYXNzIERhc2hQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgcHVibGljIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdmFsdWUgPyB2YWx1ZSA6ICctJztcbiAgfVxufVxuIl19