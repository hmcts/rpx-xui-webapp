import { Component, EventEmitter, Input, Output } from '@angular/core';
import { READ_ACCESS } from '../../domain/case-view/access-types.model';
import { DefinitionsService } from '../../services/definitions/definitions.service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/definitions/definitions.service";
function CaseListFiltersComponent_ccd_workbasket_filters_0_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ccd-workbasket-filters", 1);
    i0.ɵɵlistener("onApply", function CaseListFiltersComponent_ccd_workbasket_filters_0_Template_ccd_workbasket_filters_onApply_0_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onWrapperApply($event)); })("onReset", function CaseListFiltersComponent_ccd_workbasket_filters_0_Template_ccd_workbasket_filters_onReset_0_listener($event) { i0.ɵɵrestoreView(_r2); const ctx_r3 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r3.onWrapperReset($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("jurisdictions", ctx_r0.jurisdictions)("defaults", ctx_r0.defaults);
} }
export class CaseListFiltersComponent {
    constructor(definitionsService) {
        this.definitionsService = definitionsService;
        this.onApply = new EventEmitter();
        this.onReset = new EventEmitter();
    }
    ngOnInit() {
        this.isVisible = false;
        this.definitionsService.getJurisdictions(READ_ACCESS)
            .subscribe(jurisdictions => {
            this.isVisible = jurisdictions.length > 0;
            this.jurisdictions = jurisdictions;
        });
    }
    onWrapperApply(value) {
        this.onApply.emit(value);
    }
    onWrapperReset(value) {
        this.onReset.emit(value);
    }
}
CaseListFiltersComponent.ɵfac = function CaseListFiltersComponent_Factory(t) { return new (t || CaseListFiltersComponent)(i0.ɵɵdirectiveInject(i1.DefinitionsService)); };
CaseListFiltersComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseListFiltersComponent, selectors: [["ccd-case-list-filters"]], inputs: { defaults: "defaults" }, outputs: { onApply: "onApply", onReset: "onReset" }, decls: 1, vars: 1, consts: [[3, "jurisdictions", "defaults", "onApply", "onReset", 4, "ngIf"], [3, "jurisdictions", "defaults", "onApply", "onReset"]], template: function CaseListFiltersComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseListFiltersComponent_ccd_workbasket_filters_0_Template, 1, 2, "ccd-workbasket-filters", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.isVisible);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseListFiltersComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-list-filters', template: "<ccd-workbasket-filters\n  *ngIf=\"isVisible\"\n  [jurisdictions]=\"jurisdictions\"\n  [defaults]=\"defaults\"\n  (onApply)=\"onWrapperApply($event)\"\n  (onReset)=\"onWrapperReset($event)\"\n></ccd-workbasket-filters>\n" }]
    }], function () { return [{ type: i1.DefinitionsService }]; }, { defaults: [{
            type: Input
        }], onApply: [{
            type: Output
        }], onReset: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1saXN0LWZpbHRlcnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2Nhc2UtbGlzdC1maWx0ZXJzL2Nhc2UtbGlzdC1maWx0ZXJzLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWxpc3QtZmlsdGVycy9jYXNlLWxpc3QtZmlsdGVycy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUV4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQzs7Ozs7SUNIcEYsaURBTUM7SUFGQyxrTkFBVyxlQUFBLDZCQUFzQixDQUFBLElBQUMscU1BQ3ZCLGVBQUEsNkJBQXNCLENBQUEsSUFEQztJQUVuQyxpQkFBeUI7OztJQUp4QixvREFBK0IsNkJBQUE7O0FET2pDLE1BQU0sT0FBTyx3QkFBd0I7SUFjbkMsWUFDbUIsa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFUbEQsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBR2hELFlBQU8sR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQVF2RCxDQUFDO0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBRXZCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUM7YUFDbEQsU0FBUyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sY0FBYyxDQUFDLEtBQUs7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVNLGNBQWMsQ0FBQyxLQUFLO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7O2dHQW5DVSx3QkFBd0I7MkVBQXhCLHdCQUF3QjtRQ1RyQywrR0FNMEI7O1FBTHZCLG9DQUFlOzt1RkRRTCx3QkFBd0I7Y0FKcEMsU0FBUzsyQkFDRSx1QkFBdUI7cUVBTTFCLFFBQVE7a0JBRGQsS0FBSztZQUlDLE9BQU87a0JBRGIsTUFBTTtZQUlBLE9BQU87a0JBRGIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJFQURfQUNDRVNTIH0gZnJvbSAnLi4vLi4vZG9tYWluL2Nhc2Utdmlldy9hY2Nlc3MtdHlwZXMubW9kZWwnO1xuaW1wb3J0IHsgSnVyaXNkaWN0aW9uIH0gZnJvbSAnLi4vLi4vZG9tYWluL2RlZmluaXRpb24vanVyaXNkaWN0aW9uLm1vZGVsJztcbmltcG9ydCB7IERlZmluaXRpb25zU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2RlZmluaXRpb25zL2RlZmluaXRpb25zLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtY2FzZS1saXN0LWZpbHRlcnMnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FzZS1saXN0LWZpbHRlcnMuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIENhc2VMaXN0RmlsdGVyc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGRlZmF1bHRzO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgb25BcHBseTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBvblJlc2V0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwdWJsaWMganVyaXNkaWN0aW9uczogSnVyaXNkaWN0aW9uW107XG4gIHB1YmxpYyBpc1Zpc2libGU6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBkZWZpbml0aW9uc1NlcnZpY2U6IERlZmluaXRpb25zU2VydmljZSxcbiAgKSB7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcblxuICAgIHRoaXMuZGVmaW5pdGlvbnNTZXJ2aWNlLmdldEp1cmlzZGljdGlvbnMoUkVBRF9BQ0NFU1MpXG4gICAgICAuc3Vic2NyaWJlKGp1cmlzZGljdGlvbnMgPT4ge1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGp1cmlzZGljdGlvbnMubGVuZ3RoID4gMDtcbiAgICAgICAgdGhpcy5qdXJpc2RpY3Rpb25zID0ganVyaXNkaWN0aW9ucztcbiAgICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG9uV3JhcHBlckFwcGx5KHZhbHVlKSB7XG4gICAgdGhpcy5vbkFwcGx5LmVtaXQodmFsdWUpO1xuICB9XG5cbiAgcHVibGljIG9uV3JhcHBlclJlc2V0KHZhbHVlKSB7XG4gICAgdGhpcy5vblJlc2V0LmVtaXQodmFsdWUpO1xuICB9XG5cbn1cbiIsIjxjY2Qtd29ya2Jhc2tldC1maWx0ZXJzXG4gICpuZ0lmPVwiaXNWaXNpYmxlXCJcbiAgW2p1cmlzZGljdGlvbnNdPVwianVyaXNkaWN0aW9uc1wiXG4gIFtkZWZhdWx0c109XCJkZWZhdWx0c1wiXG4gIChvbkFwcGx5KT1cIm9uV3JhcHBlckFwcGx5KCRldmVudClcIlxuICAob25SZXNldCk9XCJvbldyYXBwZXJSZXNldCgkZXZlbnQpXCJcbj48L2NjZC13b3JrYmFza2V0LWZpbHRlcnM+XG4iXX0=