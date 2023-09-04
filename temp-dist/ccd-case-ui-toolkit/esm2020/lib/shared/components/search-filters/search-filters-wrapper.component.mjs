import { Component, EventEmitter, Input, Output } from '@angular/core';
import { READ_ACCESS } from '../../domain/case-view/access-types.model';
import { DefinitionsService } from '../../services/definitions/definitions.service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/definitions/definitions.service";
function SearchFiltersWrapperComponent_ccd_search_filters_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ccd-search-filters", 1);
    i0.ɵɵlistener("onApply", function SearchFiltersWrapperComponent_ccd_search_filters_0_Template_ccd_search_filters_onApply_0_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onWrapperApply($event)); })("onReset", function SearchFiltersWrapperComponent_ccd_search_filters_0_Template_ccd_search_filters_onReset_0_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.onWrapperReset($event)); })("onJuridiction", function SearchFiltersWrapperComponent_ccd_search_filters_0_Template_ccd_search_filters_onJuridiction_0_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.onWrapperJurisdiction($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("jurisdictions", ctx_r0.jurisdictions)("autoApply", ctx_r0.autoApply);
} }
export class SearchFiltersWrapperComponent {
    constructor(definitionsService) {
        this.definitionsService = definitionsService;
        this.onApply = new EventEmitter();
        this.onReset = new EventEmitter();
        this.onJurisdiction = new EventEmitter();
    }
    ngOnInit() {
        this.isVisible = false;
        this.definitionsService.getJurisdictions(READ_ACCESS)
            .subscribe(jurisdictions => {
            this.isVisible = true;
            this.jurisdictions = jurisdictions;
        });
    }
    onWrapperApply(value) {
        this.onApply.emit(value);
    }
    onWrapperReset(value) {
        this.onReset.emit(value);
    }
    onWrapperJurisdiction(value) {
        this.onJurisdiction.emit(value);
    }
}
SearchFiltersWrapperComponent.ɵfac = function SearchFiltersWrapperComponent_Factory(t) { return new (t || SearchFiltersWrapperComponent)(i0.ɵɵdirectiveInject(i1.DefinitionsService)); };
SearchFiltersWrapperComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SearchFiltersWrapperComponent, selectors: [["ccd-search-filters-wrapper"]], inputs: { autoApply: "autoApply" }, outputs: { onApply: "onApply", onReset: "onReset", onJurisdiction: "onJurisdiction" }, decls: 1, vars: 1, consts: [[3, "jurisdictions", "autoApply", "onApply", "onReset", "onJuridiction", 4, "ngIf"], [3, "jurisdictions", "autoApply", "onApply", "onReset", "onJuridiction"]], template: function SearchFiltersWrapperComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, SearchFiltersWrapperComponent_ccd_search_filters_0_Template, 1, 2, "ccd-search-filters", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.isVisible);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SearchFiltersWrapperComponent, [{
        type: Component,
        args: [{ selector: 'ccd-search-filters-wrapper', template: "<ccd-search-filters\n    *ngIf=\"isVisible\"\n    [jurisdictions]=\"jurisdictions\"\n    [autoApply]=\"autoApply\"\n    (onApply)=\"onWrapperApply($event)\"\n    (onReset)=\"onWrapperReset($event)\"\n    (onJuridiction)=\"onWrapperJurisdiction($event)\"\n></ccd-search-filters>" }]
    }], function () { return [{ type: i1.DefinitionsService }]; }, { autoApply: [{
            type: Input
        }], onApply: [{
            type: Output
        }], onReset: [{
            type: Output
        }], onJurisdiction: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZpbHRlcnMtd3JhcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvc2VhcmNoLWZpbHRlcnMvc2VhcmNoLWZpbHRlcnMtd3JhcHBlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvc2VhcmNoLWZpbHRlcnMvc2VhcmNoLWZpbHRlcnMtd3JhcHBlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUV4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQzs7Ozs7SUNIcEYsNkNBT0M7SUFIRywrTUFBVyxlQUFBLDZCQUFzQixDQUFBLElBQUMsa01BQ3ZCLGVBQUEsNkJBQXNCLENBQUEsSUFEQyw4TUFFakIsZUFBQSxvQ0FBNkIsQ0FBQSxJQUZaO0lBR3JDLGlCQUFxQjs7O0lBTGxCLG9EQUErQiwrQkFBQTs7QURRbkMsTUFBTSxPQUFPLDZCQUE2QjtJQWlCdEMsWUFDcUIsa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFacEQsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR2hELFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUdoRCxtQkFBYyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBUTlELENBQUM7SUFFTSxRQUFRO1FBQ1gsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQzthQUNoRCxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0sY0FBYyxDQUFDLEtBQUs7UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVNLGNBQWMsQ0FBQyxLQUFLO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTSxxQkFBcUIsQ0FBQyxLQUFLO1FBQzlCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7OzBHQTFDUSw2QkFBNkI7Z0ZBQTdCLDZCQUE2QjtRQ1YxQyw0R0FPc0I7O1FBTmpCLG9DQUFlOzt1RkRTUCw2QkFBNkI7Y0FMekMsU0FBUzsyQkFDSSw0QkFBNEI7cUVBTy9CLFNBQVM7a0JBRGYsS0FBSztZQUlDLE9BQU87a0JBRGIsTUFBTTtZQUlBLE9BQU87a0JBRGIsTUFBTTtZQUlBLGNBQWM7a0JBRHBCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSRUFEX0FDQ0VTUyB9IGZyb20gJy4uLy4uL2RvbWFpbi9jYXNlLXZpZXcvYWNjZXNzLXR5cGVzLm1vZGVsJztcbmltcG9ydCB7IEp1cmlzZGljdGlvbiB9IGZyb20gJy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uL2p1cmlzZGljdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBEZWZpbml0aW9uc1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9kZWZpbml0aW9ucy9kZWZpbml0aW9ucy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdjY2Qtc2VhcmNoLWZpbHRlcnMtd3JhcHBlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1maWx0ZXJzLXdyYXBwZXIuY29tcG9uZW50Lmh0bWwnLFxufSlcblxuZXhwb3J0IGNsYXNzIFNlYXJjaEZpbHRlcnNXcmFwcGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIGF1dG9BcHBseTogYm9vbGVhbjtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkFwcGx5OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvblJlc2V0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKVxuICAgIHB1YmxpYyBvbkp1cmlzZGljdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBwdWJsaWMganVyaXNkaWN0aW9uczogSnVyaXNkaWN0aW9uW107XG4gICAgcHVibGljIGlzVmlzaWJsZTogYm9vbGVhbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJlYWRvbmx5IGRlZmluaXRpb25zU2VydmljZTogRGVmaW5pdGlvbnNTZXJ2aWNlLFxuICAgICkge1xuICAgIH1cblxuICAgIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmRlZmluaXRpb25zU2VydmljZS5nZXRKdXJpc2RpY3Rpb25zKFJFQURfQUNDRVNTKVxuICAgICAgICAgICAgLnN1YnNjcmliZShqdXJpc2RpY3Rpb25zID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5qdXJpc2RpY3Rpb25zID0ganVyaXNkaWN0aW9ucztcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbldyYXBwZXJBcHBseSh2YWx1ZSkge1xuICAgICAgICB0aGlzLm9uQXBwbHkuZW1pdCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uV3JhcHBlclJlc2V0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMub25SZXNldC5lbWl0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25XcmFwcGVySnVyaXNkaWN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHRoaXMub25KdXJpc2RpY3Rpb24uZW1pdCh2YWx1ZSk7XG4gICAgfVxufVxuIiwiPGNjZC1zZWFyY2gtZmlsdGVyc1xuICAgICpuZ0lmPVwiaXNWaXNpYmxlXCJcbiAgICBbanVyaXNkaWN0aW9uc109XCJqdXJpc2RpY3Rpb25zXCJcbiAgICBbYXV0b0FwcGx5XT1cImF1dG9BcHBseVwiXG4gICAgKG9uQXBwbHkpPVwib25XcmFwcGVyQXBwbHkoJGV2ZW50KVwiXG4gICAgKG9uUmVzZXQpPVwib25XcmFwcGVyUmVzZXQoJGV2ZW50KVwiXG4gICAgKG9uSnVyaWRpY3Rpb24pPVwib25XcmFwcGVySnVyaXNkaWN0aW9uKCRldmVudClcIlxuPjwvY2NkLXNlYXJjaC1maWx0ZXJzPiJdfQ==