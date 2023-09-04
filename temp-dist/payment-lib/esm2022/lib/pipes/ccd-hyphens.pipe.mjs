import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class CcdHyphensPipe {
    constructor() { }
    transform(value, args) {
        const pattern = /^([0-9]{4})+([0-9]{4})+([0-9]{4})+([0-9]{4})$/;
        if (value.match(pattern)) {
            return value.replace(pattern, '$1-$2-$3-$4');
        }
        return value;
    }
    static ɵfac = function CcdHyphensPipe_Factory(t) { return new (t || CcdHyphensPipe)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ccdHyphens", type: CcdHyphensPipe, pure: true });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CcdHyphensPipe, [{
        type: Pipe,
        args: [{
                name: 'ccdHyphens'
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2NkLWh5cGhlbnMucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvcGlwZXMvY2NkLWh5cGhlbnMucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFJcEQsTUFBTSxPQUFPLGNBQWM7SUFDekIsZ0JBQWUsQ0FBQztJQUNoQixTQUFTLENBQUMsS0FBVSxFQUFFLElBQVU7UUFDOUIsTUFBTSxPQUFPLEdBQUcsK0NBQStDLENBQUM7UUFDaEUsSUFBSyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUMsYUFBYSxDQUFDLENBQUE7U0FDNUM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7d0VBUlUsY0FBYzs2RUFBZCxjQUFjOzt1RkFBZCxjQUFjO2NBSDFCLElBQUk7ZUFBQztnQkFDSixJQUFJLEVBQUUsWUFBWTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbkBQaXBlKHtcbiAgbmFtZTogJ2NjZEh5cGhlbnMnXG59KVxuZXhwb3J0IGNsYXNzIENjZEh5cGhlbnNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M/OiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IHBhdHRlcm4gPSAvXihbMC05XXs0fSkrKFswLTldezR9KSsoWzAtOV17NH0pKyhbMC05XXs0fSkkLztcbiAgICBpZiAoIHZhbHVlLm1hdGNoKHBhdHRlcm4pKSB7XG4gICAgICByZXR1cm4gdmFsdWUucmVwbGFjZShwYXR0ZXJuLCckMS0kMi0kMy0kNCcpICBcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG4iXX0=