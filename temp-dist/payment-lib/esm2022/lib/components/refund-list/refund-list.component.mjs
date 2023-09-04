import { Component, Input } from '@angular/core';
import { RefundsService } from '../../services/refunds/refunds.service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/refunds/refunds.service";
import * as i2 from "@angular/common";
import * as i3 from "../table/table.component";
function RefundListComponent_ng_container_4_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 5);
    i0.ɵɵtext(2, "No records to display");
    i0.ɵɵelementEnd()();
} }
function RefundListComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 0)(2, "div", 1)(3, "h2", 4);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(5, RefundListComponent_ng_container_4_div_5_Template, 3, 0, "div", 3);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.tableApprovalHeader);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.isApproveTableVisible);
} }
function RefundListComponent_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div");
    i0.ɵɵelement(2, "ccpay-table", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("DATASOURCE", ctx_r1.submittedRefundList)("STATUS", ctx_r1.approvalStatus)("errorMessage", ctx_r1.errorMessage);
} }
function RefundListComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 5);
    i0.ɵɵtext(2, "No records to display");
    i0.ɵɵelementEnd()();
} }
function RefundListComponent_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div");
    i0.ɵɵelement(2, "ccpay-table", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("DATASOURCE", ctx_r3.rejectedRefundList)("STATUS", ctx_r3.rejectStatus)("errorMessage", ctx_r3.errorMessage);
} }
export class RefundListComponent {
    refundService;
    USERID;
    LOGGEDINUSERROLES;
    LOGGEDINUSEREMAIL;
    constructor(refundService) {
        this.refundService = refundService;
    }
    tableApprovalHeader;
    tableRejectedHeader;
    submittedRefundList = [];
    rejectedRefundList = [];
    // approvalStatus = 'Sent for approval';
    // rejectStatus = 'Update required';
    approvalStatus = 'Sent for approval';
    rejectStatus = 'Update required';
    errorMessage = null;
    isApproveTableVisible;
    isRejectTableVisible;
    dropdownvalue;
    isAuthorized = true;
    userLst;
    ngOnInit() {
        this.userLst = this.LOGGEDINUSERROLES;
        if (this.LOGGEDINUSERROLES.some(i => i.includes('payments-refund-approver'))) {
            this.isAuthorized = true;
        }
        else {
            this.isApproveTableVisible = false;
            this.isAuthorized = false;
        }
        this.tableApprovalHeader = 'Refunds to be approved';
        this.tableRejectedHeader = 'Refunds returned to caseworker';
        if (this.isAuthorized) {
            this.refundService.getRefundList(this.approvalStatus, true).subscribe(refundList => {
                this.submittedRefundList = refundList['refund_list'];
                this.isApproveTableVisible = true;
            }),
                (error) => {
                    this.errorMessage = error.replace(/"/g, "");
                };
        }
        this.refundService.getRefundList(this.rejectStatus, false).subscribe(refundList => {
            this.rejectedRefundList = refundList['refund_list'];
            this.isRejectTableVisible = true;
        }),
            (error) => {
                this.errorMessage = error.replace(/"/g, "");
            };
    }
    static ɵfac = function RefundListComponent_Factory(t) { return new (t || RefundListComponent)(i0.ɵɵdirectiveInject(i1.RefundsService)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: RefundListComponent, selectors: [["ccpay-refund-list"]], inputs: { USERID: "USERID", LOGGEDINUSERROLES: "LOGGEDINUSERROLES", LOGGEDINUSEREMAIL: "LOGGEDINUSEREMAIL" }, decls: 12, vars: 5, consts: [[1, "hmcts-page-heading"], [1, "hmcts-page-heading__title"], [1, "govuk-heading-xl"], [4, "ngIf"], [1, "govuk-heading-l"], [1, "govuk-label", "dropdpwn"], [3, "DATASOURCE", "STATUS", "errorMessage"]], template: function RefundListComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
            i0.ɵɵtext(3, "Refund list");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(4, RefundListComponent_ng_container_4_Template, 6, 2, "ng-container", 3);
            i0.ɵɵtemplate(5, RefundListComponent_ng_container_5_Template, 3, 3, "ng-container", 3);
            i0.ɵɵelementStart(6, "div", 0)(7, "div", 1)(8, "h2", 4);
            i0.ɵɵtext(9);
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(10, RefundListComponent_div_10_Template, 3, 0, "div", 3);
            i0.ɵɵtemplate(11, RefundListComponent_ng_container_11_Template, 3, 3, "ng-container", 3);
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", ctx.isAuthorized);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.isApproveTableVisible);
            i0.ɵɵadvance(4);
            i0.ɵɵtextInterpolate(ctx.tableRejectedHeader);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !ctx.isRejectTableVisible);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.isRejectTableVisible);
        } }, dependencies: [i2.NgIf, i3.TableComponent], styles: [".govuk-heading-xl[_ngcontent-%COMP%]{font-size:48px;padding-top:1em}.govuk-heading-l[_ngcontent-%COMP%]{font-size:36px}.govuk-label[_ngcontent-%COMP%]{font-size:19px}.hmcts-page-heading[_ngcontent-%COMP%]{width:110%}"] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(RefundListComponent, [{
        type: Component,
        args: [{ selector: 'ccpay-refund-list', template: "\n\n<div class=\"hmcts-page-heading\">\n  <div class=\"hmcts-page-heading__title\">\n    <h1 class=\"govuk-heading-xl\">Refund list</h1>\n  </div>\n</div>\n\n<ng-container *ngIf=\"isAuthorized\">\n<div class=\"hmcts-page-heading\">\n    <div class=\"hmcts-page-heading__title\">\n      <h2 class=\"govuk-heading-l\">{{tableApprovalHeader}}</h2>\n    </div>\n  </div>\n  <div  *ngIf=\"!isApproveTableVisible\">\n      <div class=\"govuk-label dropdpwn\" >No records to display</div>\n  </div>\n</ng-container>\n  \n<ng-container *ngIf=\"isApproveTableVisible\">\n    \n  <div><ccpay-table [DATASOURCE]=\"submittedRefundList\" [STATUS]=\"approvalStatus\" [errorMessage]=\"errorMessage\"></ccpay-table></div>\n</ng-container>\n\n\n<div class=\"hmcts-page-heading\">\n    <div class=\"hmcts-page-heading__title\">\n      <h2 class=\"govuk-heading-l\">{{tableRejectedHeader}}</h2>\n    </div>\n    \n  </div>\n  <div  *ngIf=\"!isRejectTableVisible\">\n      <div class=\"govuk-label dropdpwn\">No records to display</div>\n  </div>\n<ng-container *ngIf=\"isRejectTableVisible\">\n    \n  <div><ccpay-table [DATASOURCE]=\"rejectedRefundList\" [STATUS]=\"rejectStatus\" [errorMessage]=\"errorMessage\"></ccpay-table></div>\n</ng-container>\n\n\n", styles: [".govuk-heading-xl{font-size:48px;padding-top:1em}.govuk-heading-l{font-size:36px}.govuk-label{font-size:19px}.hmcts-page-heading{width:110%}\n"] }]
    }], function () { return [{ type: i1.RefundsService }]; }, { USERID: [{
            type: Input,
            args: ['USERID']
        }], LOGGEDINUSERROLES: [{
            type: Input,
            args: ['LOGGEDINUSERROLES']
        }], LOGGEDINUSEREMAIL: [{
            type: Input,
            args: ['LOGGEDINUSEREMAIL']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmdW5kLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGF5bWVudC1saWIvc3JjL2xpYi9jb21wb25lbnRzL3JlZnVuZC1saXN0L3JlZnVuZC1saXN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy9yZWZ1bmQtbGlzdC9yZWZ1bmQtbGlzdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFVLEtBQUssRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7Ozs7OztJQ2F0RSwyQkFBcUMsYUFBQTtJQUNFLHFDQUFxQjtJQUFBLGlCQUFNLEVBQUE7OztJQVBwRSw2QkFBbUM7SUFDbkMsOEJBQWdDLGFBQUEsWUFBQTtJQUVFLFlBQXVCO0lBQUEsaUJBQUssRUFBQSxFQUFBO0lBRzVELG1GQUVNO0lBQ1IsMEJBQWU7OztJQU5tQixlQUF1QjtJQUF2QixnREFBdUI7SUFHaEQsZUFBNEI7SUFBNUIsb0RBQTRCOzs7SUFLckMsNkJBQTRDO0lBRTFDLDJCQUFLO0lBQUEsaUNBQXNIO0lBQUEsaUJBQU07SUFDbkksMEJBQWU7OztJQURLLGVBQWtDO0lBQWxDLHVEQUFrQyxpQ0FBQSxxQ0FBQTs7O0lBVXBELDJCQUFvQyxhQUFBO0lBQ0UscUNBQXFCO0lBQUEsaUJBQU0sRUFBQTs7O0lBRW5FLDZCQUEyQztJQUV6QywyQkFBSztJQUFBLGlDQUFtSDtJQUFBLGlCQUFNO0lBQ2hJLDBCQUFlOzs7SUFESyxlQUFpQztJQUFqQyxzREFBaUMsK0JBQUEscUNBQUE7O0FEM0JyRCxNQUFNLE9BQU8sbUJBQW1CO0lBS1Y7SUFKSCxNQUFNLENBQVM7SUFDSixpQkFBaUIsQ0FBUTtJQUN6Qixp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QWlCO2tCQUE1QyxLQUFLO21CQUFDLG1CQUFtQjtZQUNFLGlCQUFpQjtrQkFBNUMsS0FBSzttQkFBQyxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZWZ1bmRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3JlZnVuZHMvcmVmdW5kcy5zZXJ2aWNlJztcbmltcG9ydCB7IElSZWZ1bmRMaXN0IH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcy9JUmVmdW5kTGlzdCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjcGF5LXJlZnVuZC1saXN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3JlZnVuZC1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcmVmdW5kLWxpc3QuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFJlZnVuZExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoJ1VTRVJJRCcpIFVTRVJJRDogc3RyaW5nO1xuICBASW5wdXQoJ0xPR0dFRElOVVNFUlJPTEVTJykgTE9HR0VESU5VU0VSUk9MRVM6IGFueVtdO1xuICBASW5wdXQoJ0xPR0dFRElOVVNFUkVNQUlMJykgTE9HR0VESU5VU0VSRU1BSUw6c3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmdW5kU2VydmljZTogUmVmdW5kc1NlcnZpY2UpIHtcbiAgfVxuXG4gIHRhYmxlQXBwcm92YWxIZWFkZXI6IHN0cmluZztcbiAgdGFibGVSZWplY3RlZEhlYWRlcjogc3RyaW5nO1xuICBzdWJtaXR0ZWRSZWZ1bmRMaXN0OiBJUmVmdW5kTGlzdFtdID0gW107XG4gIHJlamVjdGVkUmVmdW5kTGlzdDogSVJlZnVuZExpc3RbXSA9IFtdO1xuICAvLyBhcHByb3ZhbFN0YXR1cyA9ICdTZW50IGZvciBhcHByb3ZhbCc7XG4gIC8vIHJlamVjdFN0YXR1cyA9ICdVcGRhdGUgcmVxdWlyZWQnO1xuICBhcHByb3ZhbFN0YXR1cyA9ICdTZW50IGZvciBhcHByb3ZhbCc7XG4gIHJlamVjdFN0YXR1cyA9ICdVcGRhdGUgcmVxdWlyZWQnO1xuICBlcnJvck1lc3NhZ2UgPSBudWxsO1xuICBpc0FwcHJvdmVUYWJsZVZpc2libGU6Ym9vbGVhbjtcbiAgaXNSZWplY3RUYWJsZVZpc2libGU6Ym9vbGVhbjtcbiAgZHJvcGRvd252YWx1ZTogc3RyaW5nO1xuICBpc0F1dGhvcml6ZWQ6IGJvb2xlYW4gPSB0cnVlO1xuICB1c2VyTHN0XG4gIG5nT25Jbml0KCkge1xuICAgIFxuICAgIHRoaXMudXNlckxzdCA9IHRoaXMuTE9HR0VESU5VU0VSUk9MRVM7XG5cbiAgICBcbiAgICBpZih0aGlzLkxPR0dFRElOVVNFUlJPTEVTLnNvbWUoaSA9PmkuaW5jbHVkZXMoJ3BheW1lbnRzLXJlZnVuZC1hcHByb3ZlcicpKSl7XG4gICAgICB0aGlzLmlzQXV0aG9yaXplZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNBcHByb3ZlVGFibGVWaXNpYmxlID0gZmFsc2U7XG4gICAgICB0aGlzLmlzQXV0aG9yaXplZCA9IGZhbHNlO1xuICAgIH1cblxuICBcbiAgICB0aGlzLnRhYmxlQXBwcm92YWxIZWFkZXIgPSAnUmVmdW5kcyB0byBiZSBhcHByb3ZlZCc7XG4gICAgdGhpcy50YWJsZVJlamVjdGVkSGVhZGVyID0gJ1JlZnVuZHMgcmV0dXJuZWQgdG8gY2FzZXdvcmtlcic7XG5cbiAgIGlmKHRoaXMuaXNBdXRob3JpemVkKSB7XG4gICAgdGhpcy5yZWZ1bmRTZXJ2aWNlLmdldFJlZnVuZExpc3QodGhpcy5hcHByb3ZhbFN0YXR1cyx0cnVlKS5zdWJzY3JpYmUoXG4gICAgICByZWZ1bmRMaXN0ID0+IHtcbiAgICAgICAgdGhpcy5zdWJtaXR0ZWRSZWZ1bmRMaXN0ID0gcmVmdW5kTGlzdFsncmVmdW5kX2xpc3QnXTtcbiAgICAgICAgdGhpcy5pc0FwcHJvdmVUYWJsZVZpc2libGUgPSB0cnVlO1xuICAgICAgfVxuICAgICksXG4gICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlID0gZXJyb3IucmVwbGFjZSgvXCIvZyxcIlwiKTtcbiAgICB9O1xuICB9XG5cbiAgICB0aGlzLnJlZnVuZFNlcnZpY2UuZ2V0UmVmdW5kTGlzdCh0aGlzLnJlamVjdFN0YXR1cyxmYWxzZSkuc3Vic2NyaWJlKFxuICAgICAgcmVmdW5kTGlzdCA9PiB7XG4gICAgICAgIHRoaXMucmVqZWN0ZWRSZWZ1bmRMaXN0ID0gcmVmdW5kTGlzdFsncmVmdW5kX2xpc3QnXTtcbiAgICAgICAgdGhpcy5pc1JlamVjdFRhYmxlVmlzaWJsZSA9IHRydWU7XG4gICAgICB9XG4gICAgKSxcbiAgICAoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgdGhpcy5lcnJvck1lc3NhZ2UgPSBlcnJvci5yZXBsYWNlKC9cIi9nLFwiXCIpO1xuICAgIH07XG5cbiAgfVxuICBcbn0iLCJcblxuPGRpdiBjbGFzcz1cImhtY3RzLXBhZ2UtaGVhZGluZ1wiPlxuICA8ZGl2IGNsYXNzPVwiaG1jdHMtcGFnZS1oZWFkaW5nX190aXRsZVwiPlxuICAgIDxoMSBjbGFzcz1cImdvdnVrLWhlYWRpbmcteGxcIj5SZWZ1bmQgbGlzdDwvaDE+XG4gIDwvZGl2PlxuPC9kaXY+XG5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJpc0F1dGhvcml6ZWRcIj5cbjxkaXYgY2xhc3M9XCJobWN0cy1wYWdlLWhlYWRpbmdcIj5cbiAgICA8ZGl2IGNsYXNzPVwiaG1jdHMtcGFnZS1oZWFkaW5nX190aXRsZVwiPlxuICAgICAgPGgyIGNsYXNzPVwiZ292dWstaGVhZGluZy1sXCI+e3t0YWJsZUFwcHJvdmFsSGVhZGVyfX08L2gyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiAgKm5nSWY9XCIhaXNBcHByb3ZlVGFibGVWaXNpYmxlXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstbGFiZWwgZHJvcGRwd25cIiA+Tm8gcmVjb3JkcyB0byBkaXNwbGF5PC9kaXY+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG4gIFxuPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzQXBwcm92ZVRhYmxlVmlzaWJsZVwiPlxuICAgIFxuICA8ZGl2PjxjY3BheS10YWJsZSBbREFUQVNPVVJDRV09XCJzdWJtaXR0ZWRSZWZ1bmRMaXN0XCIgW1NUQVRVU109XCJhcHByb3ZhbFN0YXR1c1wiIFtlcnJvck1lc3NhZ2VdPVwiZXJyb3JNZXNzYWdlXCI+PC9jY3BheS10YWJsZT48L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuXG5cbjxkaXYgY2xhc3M9XCJobWN0cy1wYWdlLWhlYWRpbmdcIj5cbiAgICA8ZGl2IGNsYXNzPVwiaG1jdHMtcGFnZS1oZWFkaW5nX190aXRsZVwiPlxuICAgICAgPGgyIGNsYXNzPVwiZ292dWstaGVhZGluZy1sXCI+e3t0YWJsZVJlamVjdGVkSGVhZGVyfX08L2gyPlxuICAgIDwvZGl2PlxuICAgIFxuICA8L2Rpdj5cbiAgPGRpdiAgKm5nSWY9XCIhaXNSZWplY3RUYWJsZVZpc2libGVcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1sYWJlbCBkcm9wZHB3blwiPk5vIHJlY29yZHMgdG8gZGlzcGxheTwvZGl2PlxuICA8L2Rpdj5cbjxuZy1jb250YWluZXIgKm5nSWY9XCJpc1JlamVjdFRhYmxlVmlzaWJsZVwiPlxuICAgIFxuICA8ZGl2PjxjY3BheS10YWJsZSBbREFUQVNPVVJDRV09XCJyZWplY3RlZFJlZnVuZExpc3RcIiBbU1RBVFVTXT1cInJlamVjdFN0YXR1c1wiIFtlcnJvck1lc3NhZ2VdPVwiZXJyb3JNZXNzYWdlXCI+PC9jY3BheS10YWJsZT48L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuXG5cbiJdfQ==