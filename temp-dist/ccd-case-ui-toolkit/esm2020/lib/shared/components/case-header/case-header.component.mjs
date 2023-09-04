import { Component, Input } from '@angular/core';
import { CaseView } from '../../domain/case-view/case-view.model';
import { CaseField } from '../../domain/definition/case-field.model';
import { Draft } from '../../domain/draft.model';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../palette/label/label-field.component";
import * as i3 from "../../pipes/case-reference/case-reference.pipe";
function CaseHeaderComponent_h1_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h1", 2);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ccdCaseReference");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("#", i0.ɵɵpipeBind1(2, 1, ctx_r0.caseDetails.case_id), "");
} }
function CaseHeaderComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵelement(1, "ccd-label-field", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("caseField", ctx_r1.caseTitle)("caseFields", ctx_r1.caseFields);
} }
export class CaseHeaderComponent {
    ngOnInit() {
        this.caseTitle = new CaseField();
        if (!this.isDraft() && this.caseDetails.state.title_display) {
            this.caseTitle.label = this.caseDetails.state.title_display;
            this.caseFields = this.getCaseFields();
        }
    }
    isDraft() {
        return Draft.isDraft(this.caseDetails.case_id);
    }
    getCaseFields() {
        const caseDataFields = this.caseDetails.tabs.reduce((acc, tab) => {
            return acc.concat(tab.fields);
        }, []);
        return caseDataFields.concat(this.caseDetails.metadataFields);
    }
}
CaseHeaderComponent.ɵfac = function CaseHeaderComponent_Factory(t) { return new (t || CaseHeaderComponent)(); };
CaseHeaderComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseHeaderComponent, selectors: [["ccd-case-header"]], inputs: { caseDetails: "caseDetails" }, decls: 2, vars: 2, consts: [["class", "heading-h1", 4, "ngIf"], ["class", "case-title", 4, "ngIf"], [1, "heading-h1"], [1, "case-title"], [3, "caseField", "caseFields"]], template: function CaseHeaderComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseHeaderComponent_h1_0_Template, 3, 3, "h1", 0);
        i0.ɵɵtemplate(1, CaseHeaderComponent_div_1_Template, 2, 2, "div", 1);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", !ctx.caseTitle.label);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseTitle.label);
    } }, dependencies: [i1.NgIf, i2.LabelFieldComponent, i3.CaseReferencePipe], styles: [".case-title[_ngcontent-%COMP%]{margin-top:47px;margin-bottom:10px}.heading-h1[_ngcontent-%COMP%]{margin-top:40px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseHeaderComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-header', template: "<h1 *ngIf=\"!caseTitle.label\" class=\"heading-h1\">#{{ caseDetails.case_id | ccdCaseReference}}</h1>\n\n<div *ngIf=\"caseTitle.label\" class=\"case-title\">\n  <ccd-label-field [caseField]=\"caseTitle\" [caseFields]=\"caseFields\"></ccd-label-field>\n</div>\n", styles: [".case-title{margin-top:47px;margin-bottom:10px}.heading-h1{margin-top:40px}\n"] }]
    }], null, { caseDetails: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1oZWFkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2Nhc2UtaGVhZGVyL2Nhc2UtaGVhZGVyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWhlYWRlci9jYXNlLWhlYWRlci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDckUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7SUNIakQsNkJBQWdEO0lBQUEsWUFBNEM7O0lBQUEsaUJBQUs7OztJQUFqRCxlQUE0QztJQUE1QyxnRkFBNEM7OztJQUU1Riw4QkFBZ0Q7SUFDOUMscUNBQXFGO0lBQ3ZGLGlCQUFNOzs7SUFEYSxlQUF1QjtJQUF2Qiw0Q0FBdUIsaUNBQUE7O0FEUTFDLE1BQU0sT0FBTyxtQkFBbUI7SUFPdkIsUUFBUTtRQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRTtZQUMzRCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7WUFDNUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBRU0sT0FBTztRQUNaLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTyxhQUFhO1FBQ25CLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUMvRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVQLE9BQU8sY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7O3NGQXpCVSxtQkFBbUI7c0VBQW5CLG1CQUFtQjtRQ1hoQyxrRUFBaUc7UUFFakcsb0VBRU07O1FBSkQsMkNBQXNCO1FBRXJCLGVBQXFCO1FBQXJCLDBDQUFxQjs7dUZEU2QsbUJBQW1CO2NBTi9CLFNBQVM7MkJBQ0UsaUJBQWlCO2dCQVFwQixXQUFXO2tCQURqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXNlVmlldyB9IGZyb20gJy4uLy4uL2RvbWFpbi9jYXNlLXZpZXcvY2FzZS12aWV3Lm1vZGVsJztcbmltcG9ydCB7IENhc2VGaWVsZCB9IGZyb20gJy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uL2Nhc2UtZmllbGQubW9kZWwnO1xuaW1wb3J0IHsgRHJhZnQgfSBmcm9tICcuLi8uLi9kb21haW4vZHJhZnQubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtY2FzZS1oZWFkZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FzZS1oZWFkZXIuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Nhc2UtaGVhZGVyLnNjc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIENhc2VIZWFkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjYXNlRGV0YWlsczogQ2FzZVZpZXc7XG4gIHB1YmxpYyBjYXNlVGl0bGU6IENhc2VGaWVsZDtcbiAgcHVibGljIGNhc2VGaWVsZHM6IENhc2VGaWVsZFtdO1xuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNhc2VUaXRsZSA9IG5ldyBDYXNlRmllbGQoKTtcbiAgICBpZiAoIXRoaXMuaXNEcmFmdCgpICYmIHRoaXMuY2FzZURldGFpbHMuc3RhdGUudGl0bGVfZGlzcGxheSkge1xuICAgICAgdGhpcy5jYXNlVGl0bGUubGFiZWwgPSB0aGlzLmNhc2VEZXRhaWxzLnN0YXRlLnRpdGxlX2Rpc3BsYXk7XG4gICAgICB0aGlzLmNhc2VGaWVsZHMgPSB0aGlzLmdldENhc2VGaWVsZHMoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNEcmFmdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gRHJhZnQuaXNEcmFmdCh0aGlzLmNhc2VEZXRhaWxzLmNhc2VfaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRDYXNlRmllbGRzKCk6IENhc2VGaWVsZFtdIHtcbiAgICBjb25zdCBjYXNlRGF0YUZpZWxkcyA9IHRoaXMuY2FzZURldGFpbHMudGFicy5yZWR1Y2UoKGFjYywgdGFiKSA9PiB7XG4gICAgICByZXR1cm4gYWNjLmNvbmNhdCh0YWIuZmllbGRzKTtcbiAgICB9LCBbXSk7XG5cbiAgICByZXR1cm4gY2FzZURhdGFGaWVsZHMuY29uY2F0KHRoaXMuY2FzZURldGFpbHMubWV0YWRhdGFGaWVsZHMpO1xuICB9XG59XG4iLCI8aDEgKm5nSWY9XCIhY2FzZVRpdGxlLmxhYmVsXCIgY2xhc3M9XCJoZWFkaW5nLWgxXCI+I3t7IGNhc2VEZXRhaWxzLmNhc2VfaWQgfCBjY2RDYXNlUmVmZXJlbmNlfX08L2gxPlxuXG48ZGl2ICpuZ0lmPVwiY2FzZVRpdGxlLmxhYmVsXCIgY2xhc3M9XCJjYXNlLXRpdGxlXCI+XG4gIDxjY2QtbGFiZWwtZmllbGQgW2Nhc2VGaWVsZF09XCJjYXNlVGl0bGVcIiBbY2FzZUZpZWxkc109XCJjYXNlRmllbGRzXCI+PC9jY2QtbGFiZWwtZmllbGQ+XG48L2Rpdj5cbiJdfQ==