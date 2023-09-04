import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class CapitalizePipe {
    constructor() { }
    transform(s, args) {
        return s && s[0].toUpperCase() + s.slice(1) || "";
    }
    static ɵfac = function CapitalizePipe_Factory(t) { return new (t || CapitalizePipe)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "capitalize", type: CapitalizePipe, pure: true });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CapitalizePipe, [{
        type: Pipe,
        args: [{
                name: 'capitalize'
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwaXRhbGl6ZS5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGF5bWVudC1saWIvc3JjL2xpYi9waXBlcy9jYXBpdGFsaXplLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7O0FBSXBELE1BQU0sT0FBTyxjQUFjO0lBQ3ZCLGdCQUFnQixDQUFDO0lBQ2pCLFNBQVMsQ0FBQyxDQUFNLEVBQUUsSUFBVTtRQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEQsQ0FBQzt3RUFKUSxjQUFjOzZFQUFkLGNBQWM7O3VGQUFkLGNBQWM7Y0FIMUIsSUFBSTtlQUFDO2dCQUNGLElBQUksRUFBRSxZQUFZO2FBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuQFBpcGUoe1xuICAgIG5hbWU6ICdjYXBpdGFsaXplJ1xufSlcbmV4cG9ydCBjbGFzcyBDYXBpdGFsaXplUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG4gICAgdHJhbnNmb3JtKHM6IGFueSwgYXJncz86IGFueSk6IGFueSB7XG4gICAgICAgIHJldHVybiBzICYmIHNbMF0udG9VcHBlckNhc2UoKSArIHMuc2xpY2UoMSkgfHwgXCJcIjtcbiAgICB9XG59XG4iXX0=