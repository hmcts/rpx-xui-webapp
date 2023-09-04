import { Component } from '@angular/core';
import { JurisdictionService } from '../../../services/jurisdiction/jurisdiction.service';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/jurisdiction/jurisdiction.service";
import * as i2 from "@angular/common";
function ReadJudicialUserFieldComponent_span_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 1);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate2(" ", ctx_r0.judicialUser.fullName, " (", ctx_r0.judicialUser.emailId, ")\n");
} }
export class ReadJudicialUserFieldComponent extends AbstractFieldReadComponent {
    constructor(jurisdictionService) {
        super();
        this.jurisdictionService = jurisdictionService;
    }
    ngOnInit() {
        if (this.caseField && this.caseField.value && this.caseField.value.personalCode) {
            const personalCode = this.caseField.value.personalCode;
            this.sub = this.jurisdictionService.searchJudicialUsersByPersonalCodes([personalCode]).subscribe(judicialUsers => {
                this.judicialUser = judicialUsers && judicialUsers.length > 0 && judicialUsers[0];
            });
        }
    }
    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
ReadJudicialUserFieldComponent.ɵfac = function ReadJudicialUserFieldComponent_Factory(t) { return new (t || ReadJudicialUserFieldComponent)(i0.ɵɵdirectiveInject(i1.JurisdictionService)); };
ReadJudicialUserFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadJudicialUserFieldComponent, selectors: [["ccd-read-judicial-user-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [["class", "text-16", 4, "ngIf"], [1, "text-16"]], template: function ReadJudicialUserFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, ReadJudicialUserFieldComponent_span_0_Template, 2, 2, "span", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.judicialUser);
    } }, dependencies: [i2.NgIf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadJudicialUserFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-read-judicial-user-field', template: "<span\n  *ngIf=\"judicialUser\"\n  class=\"text-16\">\n  {{ judicialUser.fullName }} ({{ judicialUser.emailId }})\n</span>\n" }]
    }], function () { return [{ type: i1.JurisdictionService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1qdWRpY2lhbC11c2VyLWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2p1ZGljaWFsLXVzZXIvcmVhZC1qdWRpY2lhbC11c2VyLWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2p1ZGljaWFsLXVzZXIvcmVhZC1qdWRpY2lhbC11c2VyLWZpZWxkLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBRzdELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQzFGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOzs7OztJQ0p6RiwrQkFFa0I7SUFDaEIsWUFDRjtJQUFBLGlCQUFPOzs7SUFETCxlQUNGO0lBREUsa0dBQ0Y7O0FETUEsTUFBTSxPQUFPLDhCQUErQixTQUFRLDBCQUEwQjtJQUs1RSxZQUE2QixtQkFBd0M7UUFDbkUsS0FBSyxFQUFFLENBQUM7UUFEbUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtJQUVyRSxDQUFDO0lBRU0sUUFBUTtRQUNiLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7WUFDL0UsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1lBQ3ZELElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGtDQUFrQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQy9HLElBQUksQ0FBQyxZQUFZLEdBQUcsYUFBYSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRixDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVNLFdBQVc7UUFDaEIsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN4QjtJQUNILENBQUM7OzRHQXRCVSw4QkFBOEI7aUZBQTlCLDhCQUE4QjtRQ1YzQyxpRkFJTzs7UUFISix1Q0FBa0I7O3VGRFNSLDhCQUE4QjtjQUoxQyxTQUFTOzJCQUNFLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSnVkaWNpYWxVc2VyTW9kZWwgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vanVyaXNkaWN0aW9uL2p1ZGljaWFsLXVzZXIubW9kZWwnO1xuaW1wb3J0IHsgSnVyaXNkaWN0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2p1cmlzZGljdGlvbi9qdXJpc2RpY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZpZWxkUmVhZENvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UtZmllbGQvYWJzdHJhY3QtZmllbGQtcmVhZC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtcmVhZC1qdWRpY2lhbC11c2VyLWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3JlYWQtanVkaWNpYWwtdXNlci1maWVsZC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgUmVhZEp1ZGljaWFsVXNlckZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGaWVsZFJlYWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgcHVibGljIGp1ZGljaWFsVXNlcjogSnVkaWNpYWxVc2VyTW9kZWw7XG4gIHB1YmxpYyBzdWI6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGp1cmlzZGljdGlvblNlcnZpY2U6IEp1cmlzZGljdGlvblNlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNhc2VGaWVsZCAmJiB0aGlzLmNhc2VGaWVsZC52YWx1ZSAmJiB0aGlzLmNhc2VGaWVsZC52YWx1ZS5wZXJzb25hbENvZGUpIHtcbiAgICAgIGNvbnN0IHBlcnNvbmFsQ29kZSA9IHRoaXMuY2FzZUZpZWxkLnZhbHVlLnBlcnNvbmFsQ29kZTtcbiAgICAgIHRoaXMuc3ViID0gdGhpcy5qdXJpc2RpY3Rpb25TZXJ2aWNlLnNlYXJjaEp1ZGljaWFsVXNlcnNCeVBlcnNvbmFsQ29kZXMoW3BlcnNvbmFsQ29kZV0pLnN1YnNjcmliZShqdWRpY2lhbFVzZXJzID0+IHtcbiAgICAgICAgdGhpcy5qdWRpY2lhbFVzZXIgPSBqdWRpY2lhbFVzZXJzICYmIGp1ZGljaWFsVXNlcnMubGVuZ3RoID4gMCAmJiBqdWRpY2lhbFVzZXJzWzBdO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN1Yikge1xuICAgICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxzcGFuXG4gICpuZ0lmPVwianVkaWNpYWxVc2VyXCJcbiAgY2xhc3M9XCJ0ZXh0LTE2XCI+XG4gIHt7IGp1ZGljaWFsVXNlci5mdWxsTmFtZSB9fSAoe3sganVkaWNpYWxVc2VyLmVtYWlsSWQgfX0pXG48L3NwYW4+XG4iXX0=