import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractAppConfig } from '../../../../app.config';
import { CommonDataService } from '../../../services/common-data-service/common-data-service';
import { LinkedCasesService } from './services';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "./services";
import * as i3 from "../../../../app.config";
import * as i4 from "../../../services/common-data-service/common-data-service";
function ReadLinkedCasesFieldComponent_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function ReadLinkedCasesFieldComponent_ng_container_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function ReadLinkedCasesFieldComponent_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function ReadLinkedCasesFieldComponent_ng_container_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function ReadLinkedCasesFieldComponent_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "p", 9);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 10)(4, "a", 11);
    i0.ɵɵlistener("click", function ReadLinkedCasesFieldComponent_ng_template_16_Template_a_click_4_listener() { i0.ɵɵrestoreView(_r9); const ctx_r8 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r8.reloadCurrentRoute()); });
    i0.ɵɵtext(5, "Reload the Linked cases tab");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r5.serverLinkedApiError.message);
} }
function ReadLinkedCasesFieldComponent_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "p", 9);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 10)(4, "a", 11);
    i0.ɵɵlistener("click", function ReadLinkedCasesFieldComponent_ng_template_18_Template_a_click_4_listener() { i0.ɵɵrestoreView(_r11); const ctx_r10 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r10.reloadCurrentRoute()); });
    i0.ɵɵtext(5, "Reload the Linked cases tab");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r7 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r7.serverError.message);
} }
export class ReadLinkedCasesFieldComponent {
    constructor(route, router, linkedCasesService, appConfig, commonDataService) {
        this.route = route;
        this.router = router;
        this.linkedCasesService = linkedCasesService;
        this.appConfig = appConfig;
        this.commonDataService = commonDataService;
        this.reasonListLoaded = false;
        this.reload = false;
        this.serverError = null;
        this.serverLinkedApiError = null;
        this.isServerReasonCodeError = false;
        this.isServerJurisdictionError = false;
        this.isServerLinkedFromError = false;
        this.isServerLinkedToError = false;
    }
    ngOnInit() {
        if (this.route.snapshot.data.case && this.route.snapshot.data.case.tabs) {
            const tabs = this.route.snapshot.data.case.tabs;
            const tab = tabs?.filter(tabItem => tabItem.fields?.some(field => field.id === 'caseLinks'))[0];
            this.caseField = tab?.fields?.find(field => field.id === 'caseLinks');
        }
        this.isServerJurisdictionError = this.linkedCasesService.serverJurisdictionError || false;
        const reasonCodeAPIurl = `${this.appConfig.getRDCommonDataApiUrl()}/lov/categories/CaseLinkingReasonCode`;
        this.commonDataService.getRefData(reasonCodeAPIurl).subscribe({
            next: reasons => {
                this.reasonListLoaded = true;
                this.linkedCasesService.linkCaseReasons = reasons.list_of_values.sort((a, b) => (a.value_en > b.value_en) ? 1 : -1);
            },
            error: () => {
                this.isServerReasonCodeError = true;
                this.linkedCasesService.isServerReasonCodeError = true;
            }
        });
        this.serverLinkedApiError = {
            id: 'backendError', message: 'Some case information is not available at the moment'
        };
        this.serverError = {
            id: 'backendError', message: 'There has been a system error and your request could not be processed.'
        };
    }
    ngAfterViewInit() {
        this.linkedCasesService.caseFieldValue = this.caseField?.value || [];
        let labelField = document.getElementsByClassName('govuk-heading-l');
        if (labelField && labelField.length) {
            labelField[0].replaceWith('');
        }
        labelField = document.getElementsByClassName('heading-h2');
        if (labelField && labelField.length) {
            labelField[0].replaceWith('');
        }
        labelField = document.getElementsByClassName('case-viewer-label');
        if (labelField && labelField.length) {
            labelField[0].replaceWith('');
        }
    }
    reloadCurrentRoute() {
        this.router.navigate(['cases', 'case-details', this.linkedCasesService.caseDetails.case_id], { fragment: 'Linked cases' });
    }
    getFailureLinkedToNotification(evt) {
        this.isServerLinkedToError = true;
    }
    getFailureLinkedFromNotification(evt) {
        this.isServerLinkedFromError = true;
    }
}
ReadLinkedCasesFieldComponent.ɵfac = function ReadLinkedCasesFieldComponent_Factory(t) { return new (t || ReadLinkedCasesFieldComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i1.Router), i0.ɵɵdirectiveInject(i2.LinkedCasesService), i0.ɵɵdirectiveInject(i3.AbstractAppConfig), i0.ɵɵdirectiveInject(i4.CommonDataService)); };
ReadLinkedCasesFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadLinkedCasesFieldComponent, selectors: [["ccd-read-linked-cases-field"]], decls: 20, vars: 10, consts: [[1, "govuk-!-margin-bottom-2"], [1, "heading-h1"], [1, "table-sub-heading"], ["reloadPage", "reload", 3, "caseField", "notifyAPIFailure"], [4, "ngIf", "ngIfThen"], [1, "govuk-!-margin-top-8"], ["singleApiError", ""], ["multiApisError", ""], [1, "govuk-main-wrapper"], [1, "govuk-body"], [1, "govuk-body", "align-left"], ["href", "javascript:void(0)", "id", "reload-linked-cases-tab", 1, "govuk-link", 3, "click"]], template: function ReadLinkedCasesFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div")(1, "div", 0)(2, "h1", 1);
        i0.ɵɵtext(3, "Linked cases");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "label", 2);
        i0.ɵɵtext(5, "This case is linked to");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(6, "ccd-linked-cases-to-table", 3);
        i0.ɵɵlistener("notifyAPIFailure", function ReadLinkedCasesFieldComponent_Template_ccd_linked_cases_to_table_notifyAPIFailure_6_listener($event) { return ctx.getFailureLinkedToNotification($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(7, ReadLinkedCasesFieldComponent_ng_container_7_Template, 1, 0, "ng-container", 4);
        i0.ɵɵtemplate(8, ReadLinkedCasesFieldComponent_ng_container_8_Template, 1, 0, "ng-container", 4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(9, "div", 5)(10, "label", 2);
        i0.ɵɵtext(11, "This case is linked from");
        i0.ɵɵelementEnd();
        i0.ɵɵelement(12, "br");
        i0.ɵɵelementStart(13, "ccd-linked-cases-from-table", 3);
        i0.ɵɵlistener("notifyAPIFailure", function ReadLinkedCasesFieldComponent_Template_ccd_linked_cases_from_table_notifyAPIFailure_13_listener($event) { return ctx.getFailureLinkedFromNotification($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(14, ReadLinkedCasesFieldComponent_ng_container_14_Template, 1, 0, "ng-container", 4);
        i0.ɵɵtemplate(15, ReadLinkedCasesFieldComponent_ng_container_15_Template, 1, 0, "ng-container", 4);
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(16, ReadLinkedCasesFieldComponent_ng_template_16_Template, 6, 1, "ng-template", null, 6, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(18, ReadLinkedCasesFieldComponent_ng_template_18_Template, 6, 1, "ng-template", null, 7, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r4 = i0.ɵɵreference(17);
        const _r6 = i0.ɵɵreference(19);
        i0.ɵɵadvance(6);
        i0.ɵɵproperty("caseField", ctx.caseField);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isServerLinkedToError && ctx.isServerJurisdictionError && ctx.isServerReasonCodeError)("ngIfThen", _r6);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !(ctx.isServerLinkedToError && ctx.isServerJurisdictionError && ctx.isServerReasonCodeError) && (ctx.isServerLinkedToError || ctx.isServerJurisdictionError || ctx.isServerReasonCodeError))("ngIfThen", _r4);
        i0.ɵɵadvance(5);
        i0.ɵɵproperty("caseField", ctx.caseField);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isServerLinkedFromError && ctx.isServerJurisdictionError && ctx.isServerReasonCodeError)("ngIfThen", _r6);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !(ctx.isServerLinkedFromError && ctx.isServerJurisdictionError && ctx.isServerReasonCodeError) && (ctx.isServerLinkedFromError || ctx.isServerJurisdictionError || ctx.isServerReasonCodeError))("ngIfThen", _r4);
    } }, styles: [".table-sub-heading[_ngcontent-%COMP%]{font-size:24px;font-weight:700}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadLinkedCasesFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-read-linked-cases-field', template: "<div>\n  <div class=\"govuk-!-margin-bottom-2\">\n    <h1 class=\"heading-h1\">Linked cases</h1>\n    <label class=\"table-sub-heading\">This case is linked to</label>\n    <ccd-linked-cases-to-table [caseField]=\"caseField\" (notifyAPIFailure)=\"getFailureLinkedToNotification($event)\"\n      reloadPage=\"reload\"></ccd-linked-cases-to-table>\n    <ng-container\n      *ngIf=\"(isServerLinkedToError && isServerJurisdictionError && isServerReasonCodeError); then multiApisError;\">\n    </ng-container>\n    <ng-container\n      *ngIf=\"!(isServerLinkedToError && isServerJurisdictionError && isServerReasonCodeError) && (isServerLinkedToError || isServerJurisdictionError || isServerReasonCodeError); then singleApiError;\">\n    </ng-container>\n  </div>\n  <div class=\"govuk-!-margin-top-8\">\n    <label class=\"table-sub-heading\">This case is linked from</label>\n    <br>\n    <ccd-linked-cases-from-table [caseField]=\"caseField\" (notifyAPIFailure)=\"getFailureLinkedFromNotification($event)\"\n      reloadPage=\"reload\"></ccd-linked-cases-from-table>\n    <ng-container\n      *ngIf=\"(isServerLinkedFromError && isServerJurisdictionError && isServerReasonCodeError); then multiApisError;\">\n    </ng-container>\n    <ng-container\n      *ngIf=\"!(isServerLinkedFromError && isServerJurisdictionError && isServerReasonCodeError) && (isServerLinkedFromError || isServerJurisdictionError || isServerReasonCodeError); then singleApiError;\">\n    </ng-container>\n  </div>\n</div>\n\n<ng-template #singleApiError>\n  <div class=\"govuk-main-wrapper\">\n    <p class=\"govuk-body\">{{serverLinkedApiError.message}}</p>\n    <span class=\"govuk-body align-left\">\n      <a href=\"javascript:void(0)\" (click)=\"reloadCurrentRoute()\" id=\"reload-linked-cases-tab\" class=\"govuk-link\">Reload\n        the Linked cases tab</a>\n    </span>\n  </div>\n</ng-template>\n<ng-template #multiApisError>\n  <div class=\"govuk-main-wrapper\">\n    <p class=\"govuk-body\">{{serverError.message}}</p>\n    <span class=\"govuk-body align-left\">\n      <a href=\"javascript:void(0)\" (click)=\"reloadCurrentRoute()\" id=\"reload-linked-cases-tab\" class=\"govuk-link\">Reload\n        the Linked cases tab</a>\n    </span>\n  </div>\n</ng-template>\n", styles: [".table-sub-heading{font-size:24px;font-weight:700}\n"] }]
    }], function () { return [{ type: i1.ActivatedRoute }, { type: i1.Router }, { type: i2.LinkedCasesService }, { type: i3.AbstractAppConfig }, { type: i4.CommonDataService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1saW5rZWQtY2FzZXMtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvbGlua2VkLWNhc2VzL3JlYWQtbGlua2VkLWNhc2VzLWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2xpbmtlZC1jYXNlcy9yZWFkLWxpbmtlZC1jYXNlcy1maWVsZC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTNELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLFlBQVksQ0FBQzs7Ozs7OztJQ0M1Qyx3QkFFZTs7O0lBQ2Ysd0JBRWU7OztJQU9mLHdCQUVlOzs7SUFDZix3QkFFZTs7OztJQUtqQiw4QkFBZ0MsV0FBQTtJQUNSLFlBQWdDO0lBQUEsaUJBQUk7SUFDMUQsZ0NBQW9DLFlBQUE7SUFDTCw4S0FBUyxlQUFBLDJCQUFvQixDQUFBLElBQUM7SUFBaUQsMkNBQ3RGO0lBQUEsaUJBQUksRUFBQSxFQUFBOzs7SUFITixlQUFnQztJQUFoQyx5REFBZ0M7Ozs7SUFReEQsOEJBQWdDLFdBQUE7SUFDUixZQUF1QjtJQUFBLGlCQUFJO0lBQ2pELGdDQUFvQyxZQUFBO0lBQ0wsZ0xBQVMs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LEdBQUcsSUFBSSxDQUFDO0lBQ3RDLENBQUM7OzBHQXZFVSw2QkFBNkI7Z0ZBQTdCLDZCQUE2QjtRQ1oxQywyQkFBSyxhQUFBLFlBQUE7UUFFc0IsNEJBQVk7UUFBQSxpQkFBSztRQUN4QyxnQ0FBaUM7UUFBQSxzQ0FBc0I7UUFBQSxpQkFBUTtRQUMvRCxvREFDc0I7UUFENkIseUpBQW9CLDBDQUFzQyxJQUFDO1FBQ3hGLGlCQUE0QjtRQUNsRCxnR0FFZTtRQUNmLGdHQUVlO1FBQ2pCLGlCQUFNO1FBQ04sOEJBQWtDLGdCQUFBO1FBQ0MseUNBQXdCO1FBQUEsaUJBQVE7UUFDakUsc0JBQUk7UUFDSix1REFDc0I7UUFEK0IsNEpBQW9CLDRDQUF3QyxJQUFDO1FBQzVGLGlCQUE4QjtRQUNwRCxrR0FFZTtRQUNmLGtHQUVlO1FBQ2pCLGlCQUFNLEVBQUE7UUFHUixpSUFRYztRQUNkLGlJQVFjOzs7O1FBeENpQixlQUF1QjtRQUF2Qix5Q0FBdUI7UUFHL0MsZUFBdUY7UUFBdkYsZ0hBQXVGLGlCQUFBO1FBR3ZGLGVBQTJLO1FBQTNLLGtOQUEySyxpQkFBQTtRQU1qSixlQUF1QjtRQUF2Qix5Q0FBdUI7UUFHakQsZUFBeUY7UUFBekYsa0hBQXlGLGlCQUFBO1FBR3pGLGVBQStLO1FBQS9LLHNOQUErSyxpQkFBQTs7dUZEVnpLLDZCQUE2QjtjQUx6QyxTQUFTOzJCQUNFLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFic3RyYWN0QXBwQ29uZmlnIH0gZnJvbSAnLi4vLi4vLi4vLi4vYXBwLmNvbmZpZyc7XG5pbXBvcnQgeyBDYXNlRmllbGQsIENhc2VUYWIgfSBmcm9tICcuLi8uLi8uLi9kb21haW4nO1xuaW1wb3J0IHsgQ29tbW9uRGF0YVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9jb21tb24tZGF0YS1zZXJ2aWNlL2NvbW1vbi1kYXRhLXNlcnZpY2UnO1xuaW1wb3J0IHsgTGlua2VkQ2FzZXNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1yZWFkLWxpbmtlZC1jYXNlcy1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9yZWFkLWxpbmtlZC1jYXNlcy1maWVsZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3JlYWQtbGlua2VkLWNhc2VzLWZpZWxkLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUmVhZExpbmtlZENhc2VzRmllbGRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICBwdWJsaWMgY2FzZUZpZWxkOiBDYXNlRmllbGQ7XG4gIHB1YmxpYyByZWFzb25MaXN0TG9hZGVkID0gZmFsc2U7XG4gIHB1YmxpYyByZWxvYWQgPSBmYWxzZTtcbiAgcHVibGljIHNlcnZlckVycm9yOiB7IGlkOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyB9ID0gbnVsbDtcbiAgcHVibGljIHNlcnZlckxpbmtlZEFwaUVycm9yOiB7IGlkOiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZyB9ID0gbnVsbDtcbiAgcHVibGljIGlzU2VydmVyUmVhc29uQ29kZUVycm9yID0gZmFsc2U7XG4gIHB1YmxpYyBpc1NlcnZlckp1cmlzZGljdGlvbkVycm9yID0gZmFsc2U7XG4gIHB1YmxpYyBpc1NlcnZlckxpbmtlZEZyb21FcnJvciA9IGZhbHNlO1xuICBwdWJsaWMgaXNTZXJ2ZXJMaW5rZWRUb0Vycm9yID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IGxpbmtlZENhc2VzU2VydmljZTogTGlua2VkQ2FzZXNTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgYXBwQ29uZmlnOiBBYnN0cmFjdEFwcENvbmZpZyxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbW1vbkRhdGFTZXJ2aWNlOiBDb21tb25EYXRhU2VydmljZSxcbiAgKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucm91dGUuc25hcHNob3QuZGF0YS5jYXNlICYmIHRoaXMucm91dGUuc25hcHNob3QuZGF0YS5jYXNlLnRhYnMpIHtcbiAgICAgIGNvbnN0IHRhYnMgPSB0aGlzLnJvdXRlLnNuYXBzaG90LmRhdGEuY2FzZS50YWJzIGFzIENhc2VUYWJbXTtcbiAgICAgIGNvbnN0IHRhYiA9IHRhYnM/LmZpbHRlcih0YWJJdGVtID0+IHRhYkl0ZW0uZmllbGRzPy5zb21lKGZpZWxkID0+IGZpZWxkLmlkID09PSAnY2FzZUxpbmtzJykpWzBdO1xuICAgICAgdGhpcy5jYXNlRmllbGQgPSB0YWI/LmZpZWxkcz8uZmluZChmaWVsZCA9PiBmaWVsZC5pZCA9PT0gJ2Nhc2VMaW5rcycpO1xuICAgIH1cbiAgICB0aGlzLmlzU2VydmVySnVyaXNkaWN0aW9uRXJyb3IgPSB0aGlzLmxpbmtlZENhc2VzU2VydmljZS5zZXJ2ZXJKdXJpc2RpY3Rpb25FcnJvciB8fCBmYWxzZTtcbiAgICBjb25zdCByZWFzb25Db2RlQVBJdXJsID0gYCR7dGhpcy5hcHBDb25maWcuZ2V0UkRDb21tb25EYXRhQXBpVXJsKCl9L2xvdi9jYXRlZ29yaWVzL0Nhc2VMaW5raW5nUmVhc29uQ29kZWA7XG4gICAgdGhpcy5jb21tb25EYXRhU2VydmljZS5nZXRSZWZEYXRhKHJlYXNvbkNvZGVBUEl1cmwpLnN1YnNjcmliZSh7XG4gICAgICBuZXh0OiByZWFzb25zID0+IHtcbiAgICAgICAgdGhpcy5yZWFzb25MaXN0TG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UubGlua0Nhc2VSZWFzb25zID0gcmVhc29ucy5saXN0X29mX3ZhbHVlcy5zb3J0KChhLCBiKSA9PiAoYS52YWx1ZV9lbiA+IGIudmFsdWVfZW4pID8gMSA6IC0xKTtcbiAgICAgIH0sXG4gICAgICBlcnJvcjogKCkgPT4ge1xuICAgICAgICB0aGlzLmlzU2VydmVyUmVhc29uQ29kZUVycm9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UuaXNTZXJ2ZXJSZWFzb25Db2RlRXJyb3IgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc2VydmVyTGlua2VkQXBpRXJyb3IgPSB7XG4gICAgICBpZDogJ2JhY2tlbmRFcnJvcicsIG1lc3NhZ2U6ICdTb21lIGNhc2UgaW5mb3JtYXRpb24gaXMgbm90IGF2YWlsYWJsZSBhdCB0aGUgbW9tZW50J1xuICAgIH07XG4gICAgdGhpcy5zZXJ2ZXJFcnJvciA9IHtcbiAgICAgIGlkOiAnYmFja2VuZEVycm9yJywgbWVzc2FnZTogJ1RoZXJlIGhhcyBiZWVuIGEgc3lzdGVtIGVycm9yIGFuZCB5b3VyIHJlcXVlc3QgY291bGQgbm90IGJlIHByb2Nlc3NlZC4nXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5saW5rZWRDYXNlc1NlcnZpY2UuY2FzZUZpZWxkVmFsdWUgPSB0aGlzLmNhc2VGaWVsZD8udmFsdWUgfHwgW107XG4gICAgbGV0IGxhYmVsRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdnb3Z1ay1oZWFkaW5nLWwnKTtcbiAgICBpZiAobGFiZWxGaWVsZCAmJiBsYWJlbEZpZWxkLmxlbmd0aCkge1xuICAgICAgbGFiZWxGaWVsZFswXS5yZXBsYWNlV2l0aCgnJyk7XG4gICAgfVxuICAgIGxhYmVsRmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdoZWFkaW5nLWgyJyk7XG4gICAgaWYgKGxhYmVsRmllbGQgJiYgbGFiZWxGaWVsZC5sZW5ndGgpIHtcbiAgICAgIGxhYmVsRmllbGRbMF0ucmVwbGFjZVdpdGgoJycpO1xuICAgIH1cbiAgICBsYWJlbEZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY2FzZS12aWV3ZXItbGFiZWwnKTtcbiAgICBpZiAobGFiZWxGaWVsZCAmJiBsYWJlbEZpZWxkLmxlbmd0aCkge1xuICAgICAgbGFiZWxGaWVsZFswXS5yZXBsYWNlV2l0aCgnJyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlbG9hZEN1cnJlbnRSb3V0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJ2Nhc2VzJywgJ2Nhc2UtZGV0YWlscycsIHRoaXMubGlua2VkQ2FzZXNTZXJ2aWNlLmNhc2VEZXRhaWxzLmNhc2VfaWRdLCB7IGZyYWdtZW50OiAnTGlua2VkIGNhc2VzJyB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRGYWlsdXJlTGlua2VkVG9Ob3RpZmljYXRpb24oZXZ0KTogdm9pZCB7XG4gICAgdGhpcy5pc1NlcnZlckxpbmtlZFRvRXJyb3IgPSB0cnVlO1xuICB9XG5cbiAgcHVibGljIGdldEZhaWx1cmVMaW5rZWRGcm9tTm90aWZpY2F0aW9uKGV2dCk6IHZvaWQge1xuICAgIHRoaXMuaXNTZXJ2ZXJMaW5rZWRGcm9tRXJyb3IgPSB0cnVlO1xuICB9XG59XG4iLCI8ZGl2PlxuICA8ZGl2IGNsYXNzPVwiZ292dWstIS1tYXJnaW4tYm90dG9tLTJcIj5cbiAgICA8aDEgY2xhc3M9XCJoZWFkaW5nLWgxXCI+TGlua2VkIGNhc2VzPC9oMT5cbiAgICA8bGFiZWwgY2xhc3M9XCJ0YWJsZS1zdWItaGVhZGluZ1wiPlRoaXMgY2FzZSBpcyBsaW5rZWQgdG88L2xhYmVsPlxuICAgIDxjY2QtbGlua2VkLWNhc2VzLXRvLXRhYmxlIFtjYXNlRmllbGRdPVwiY2FzZUZpZWxkXCIgKG5vdGlmeUFQSUZhaWx1cmUpPVwiZ2V0RmFpbHVyZUxpbmtlZFRvTm90aWZpY2F0aW9uKCRldmVudClcIlxuICAgICAgcmVsb2FkUGFnZT1cInJlbG9hZFwiPjwvY2NkLWxpbmtlZC1jYXNlcy10by10YWJsZT5cbiAgICA8bmctY29udGFpbmVyXG4gICAgICAqbmdJZj1cIihpc1NlcnZlckxpbmtlZFRvRXJyb3IgJiYgaXNTZXJ2ZXJKdXJpc2RpY3Rpb25FcnJvciAmJiBpc1NlcnZlclJlYXNvbkNvZGVFcnJvcik7IHRoZW4gbXVsdGlBcGlzRXJyb3I7XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgKm5nSWY9XCIhKGlzU2VydmVyTGlua2VkVG9FcnJvciAmJiBpc1NlcnZlckp1cmlzZGljdGlvbkVycm9yICYmIGlzU2VydmVyUmVhc29uQ29kZUVycm9yKSAmJiAoaXNTZXJ2ZXJMaW5rZWRUb0Vycm9yIHx8IGlzU2VydmVySnVyaXNkaWN0aW9uRXJyb3IgfHwgaXNTZXJ2ZXJSZWFzb25Db2RlRXJyb3IpOyB0aGVuIHNpbmdsZUFwaUVycm9yO1wiPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLSEtbWFyZ2luLXRvcC04XCI+XG4gICAgPGxhYmVsIGNsYXNzPVwidGFibGUtc3ViLWhlYWRpbmdcIj5UaGlzIGNhc2UgaXMgbGlua2VkIGZyb208L2xhYmVsPlxuICAgIDxicj5cbiAgICA8Y2NkLWxpbmtlZC1jYXNlcy1mcm9tLXRhYmxlIFtjYXNlRmllbGRdPVwiY2FzZUZpZWxkXCIgKG5vdGlmeUFQSUZhaWx1cmUpPVwiZ2V0RmFpbHVyZUxpbmtlZEZyb21Ob3RpZmljYXRpb24oJGV2ZW50KVwiXG4gICAgICByZWxvYWRQYWdlPVwicmVsb2FkXCI+PC9jY2QtbGlua2VkLWNhc2VzLWZyb20tdGFibGU+XG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgKm5nSWY9XCIoaXNTZXJ2ZXJMaW5rZWRGcm9tRXJyb3IgJiYgaXNTZXJ2ZXJKdXJpc2RpY3Rpb25FcnJvciAmJiBpc1NlcnZlclJlYXNvbkNvZGVFcnJvcik7IHRoZW4gbXVsdGlBcGlzRXJyb3I7XCI+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLWNvbnRhaW5lclxuICAgICAgKm5nSWY9XCIhKGlzU2VydmVyTGlua2VkRnJvbUVycm9yICYmIGlzU2VydmVySnVyaXNkaWN0aW9uRXJyb3IgJiYgaXNTZXJ2ZXJSZWFzb25Db2RlRXJyb3IpICYmIChpc1NlcnZlckxpbmtlZEZyb21FcnJvciB8fCBpc1NlcnZlckp1cmlzZGljdGlvbkVycm9yIHx8IGlzU2VydmVyUmVhc29uQ29kZUVycm9yKTsgdGhlbiBzaW5nbGVBcGlFcnJvcjtcIj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9kaXY+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNzaW5nbGVBcGlFcnJvcj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLW1haW4td3JhcHBlclwiPlxuICAgIDxwIGNsYXNzPVwiZ292dWstYm9keVwiPnt7c2VydmVyTGlua2VkQXBpRXJyb3IubWVzc2FnZX19PC9wPlxuICAgIDxzcGFuIGNsYXNzPVwiZ292dWstYm9keSBhbGlnbi1sZWZ0XCI+XG4gICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgKGNsaWNrKT1cInJlbG9hZEN1cnJlbnRSb3V0ZSgpXCIgaWQ9XCJyZWxvYWQtbGlua2VkLWNhc2VzLXRhYlwiIGNsYXNzPVwiZ292dWstbGlua1wiPlJlbG9hZFxuICAgICAgICB0aGUgTGlua2VkIGNhc2VzIHRhYjwvYT5cbiAgICA8L3NwYW4+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbjxuZy10ZW1wbGF0ZSAjbXVsdGlBcGlzRXJyb3I+XG4gIDxkaXYgY2xhc3M9XCJnb3Z1ay1tYWluLXdyYXBwZXJcIj5cbiAgICA8cCBjbGFzcz1cImdvdnVrLWJvZHlcIj57e3NlcnZlckVycm9yLm1lc3NhZ2V9fTwvcD5cbiAgICA8c3BhbiBjbGFzcz1cImdvdnVrLWJvZHkgYWxpZ24tbGVmdFwiPlxuICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJyZWxvYWRDdXJyZW50Um91dGUoKVwiIGlkPVwicmVsb2FkLWxpbmtlZC1jYXNlcy10YWJcIiBjbGFzcz1cImdvdnVrLWxpbmtcIj5SZWxvYWRcbiAgICAgICAgdGhlIExpbmtlZCBjYXNlcyB0YWI8L2E+XG4gICAgPC9zcGFuPlxuICA8L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG4iXX0=