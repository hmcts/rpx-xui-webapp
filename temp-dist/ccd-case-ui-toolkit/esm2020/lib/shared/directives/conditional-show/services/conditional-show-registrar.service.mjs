import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ConditionalShowRegistrarService {
    constructor() {
        this.registeredDirectives = [];
    }
    register(newDirective) {
        this.registeredDirectives.push(newDirective);
    }
    reset() {
        this.registeredDirectives = [];
    }
}
ConditionalShowRegistrarService.ɵfac = function ConditionalShowRegistrarService_Factory(t) { return new (t || ConditionalShowRegistrarService)(); };
ConditionalShowRegistrarService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ConditionalShowRegistrarService, factory: ConditionalShowRegistrarService.ɵfac });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ConditionalShowRegistrarService, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWwtc2hvdy1yZWdpc3RyYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvZGlyZWN0aXZlcy9jb25kaXRpb25hbC1zaG93L3NlcnZpY2VzL2NvbmRpdGlvbmFsLXNob3ctcmVnaXN0cmFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFJM0MsTUFBTSxPQUFPLCtCQUErQjtJQUQ1QztRQUVTLHlCQUFvQixHQUFtQyxFQUFFLENBQUM7S0FTbEU7SUFQUSxRQUFRLENBQUMsWUFBMEM7UUFDdEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU0sS0FBSztRQUNWLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxFQUFFLENBQUM7SUFDakMsQ0FBQzs7OEdBVFUsK0JBQStCO3FGQUEvQiwrQkFBK0IsV0FBL0IsK0JBQStCO3VGQUEvQiwrQkFBK0I7Y0FEM0MsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmRpdGlvbmFsU2hvd0Zvcm1EaXJlY3RpdmUgfSBmcm9tICcuLi9jb25kaXRpb25hbC1zaG93LWZvcm0uZGlyZWN0aXZlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbmRpdGlvbmFsU2hvd1JlZ2lzdHJhclNlcnZpY2Uge1xuICBwdWJsaWMgcmVnaXN0ZXJlZERpcmVjdGl2ZXM6IENvbmRpdGlvbmFsU2hvd0Zvcm1EaXJlY3RpdmVbXSA9IFtdO1xuXG4gIHB1YmxpYyByZWdpc3RlcihuZXdEaXJlY3RpdmU6IENvbmRpdGlvbmFsU2hvd0Zvcm1EaXJlY3RpdmUpOiB2b2lkIHtcbiAgICAgIHRoaXMucmVnaXN0ZXJlZERpcmVjdGl2ZXMucHVzaChuZXdEaXJlY3RpdmUpO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0ZXJlZERpcmVjdGl2ZXMgPSBbXTtcbiAgfVxufVxuIl19