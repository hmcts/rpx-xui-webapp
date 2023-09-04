import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ShowCondition } from '../../directives/conditional-show/domain/conditional-show.model';
import { HttpError } from '../../domain/http/http-error.model';
import { AlertService } from '../../services/alert/alert.service';
import { OrderService } from '../../services/order/order.service';
import { CaseNotifier } from '../case-editor/services/case.notifier';
import { CaseHistoryService } from './services/case-history.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "../../services/alert/alert.service";
import * as i3 from "../../services/order/order.service";
import * as i4 from "../case-editor/services/case.notifier";
import * as i5 from "./services/case-history.service";
function CaseHistoryComponent_div_0_ng_container_57_ng_container_6_tr_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "th", 14)(2, "div", 15);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵelement(5, "ccd-field-read", 16);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const field_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r5 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(field_r4.label);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("caseField", field_r4)("caseReference", ctx_r5.caseHistory.case_id);
} }
function CaseHistoryComponent_div_0_ng_container_57_ng_container_6_tr_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 17)(1, "td", 18);
    i0.ɵɵelement(2, "ccd-field-read", 16);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const field_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r6 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("caseField", field_r4)("caseReference", ctx_r6.caseHistory.case_id);
} }
function CaseHistoryComponent_div_0_ng_container_57_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 10);
    i0.ɵɵelementContainerStart(2, 11);
    i0.ɵɵpipe(3, "ccdIsCompound");
    i0.ɵɵtemplate(4, CaseHistoryComponent_div_0_ng_container_57_ng_container_6_tr_4_Template, 6, 3, "tr", 12);
    i0.ɵɵtemplate(5, CaseHistoryComponent_div_0_ng_container_57_ng_container_6_tr_5_Template, 3, 2, "tr", 13);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const field_r4 = ctx.$implicit;
    const tab_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("caseField", field_r4)("contextFields", tab_r2.fields)("hidden", field_r4.hidden);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitch", !i0.ɵɵpipeBind1(3, 6, field_r4));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngSwitchCase", true);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", false);
} }
function CaseHistoryComponent_div_0_ng_container_57_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 7)(2, "h3", 8);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "table", 9);
    i0.ɵɵpipe(5, "rpxTranslate");
    i0.ɵɵtemplate(6, CaseHistoryComponent_div_0_ng_container_57_ng_container_6_Template, 6, 8, "ng-container", 6);
    i0.ɵɵpipe(7, "ccdReadFieldsFilter");
    i0.ɵɵpipe(8, "ccdTabFields");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const tab_r2 = ctx.$implicit;
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(tab_r2.label);
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("id", tab_r2.id);
    i0.ɵɵattribute("aria-describedby", i0.ɵɵpipeBind1(5, 4, "case history table"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind4(7, 6, i0.ɵɵpipeBind1(8, 11, tab_r2), false, undefined, true));
} }
function CaseHistoryComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 1)(2, "div", 2);
    i0.ɵɵelement(3, "ccd-case-header", 3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 1)(5, "div", 2)(6, "div")(7, "h2", 4);
    i0.ɵɵtext(8);
    i0.ɵɵpipe(9, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "table", 5)(11, "tbody")(12, "tr")(13, "th");
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td");
    i0.ɵɵtext(17);
    i0.ɵɵpipe(18, "ccdDate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(19, "tr")(20, "th");
    i0.ɵɵtext(21);
    i0.ɵɵpipe(22, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "td");
    i0.ɵɵtext(24);
    i0.ɵɵpipe(25, "titlecase");
    i0.ɵɵpipe(26, "uppercase");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(27, "tr")(28, "th");
    i0.ɵɵtext(29);
    i0.ɵɵpipe(30, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(31, "td");
    i0.ɵɵtext(32);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(33, "tr")(34, "th");
    i0.ɵɵtext(35);
    i0.ɵɵpipe(36, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "td");
    i0.ɵɵtext(38);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(39, "tr")(40, "th");
    i0.ɵɵtext(41);
    i0.ɵɵpipe(42, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "td");
    i0.ɵɵtext(44);
    i0.ɵɵpipe(45, "ccdDash");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(46, "tr")(47, "th");
    i0.ɵɵtext(48);
    i0.ɵɵpipe(49, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(50, "td");
    i0.ɵɵtext(51);
    i0.ɵɵpipe(52, "ccdDash");
    i0.ɵɵelementEnd()()()()();
    i0.ɵɵelementStart(53, "div")(54, "h2", 4);
    i0.ɵɵtext(55);
    i0.ɵɵpipe(56, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(57, CaseHistoryComponent_div_0_ng_container_57_Template, 9, 13, "ng-container", 6);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("caseDetails", ctx_r0.caseDetails);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(9, 17, "Event Details"));
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(15, 19, "Date"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(18, 21, ctx_r0.caseHistory.event.timestamp));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(22, 23, "Author"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", i0.ɵɵpipeBind1(25, 25, ctx_r0.caseHistory.event.user_first_name), " ", i0.ɵɵpipeBind1(26, 27, ctx_r0.caseHistory.event.user_last_name), "");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(30, 29, "End state"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.caseHistory.event.state_name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(36, 31, "Event"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.caseHistory.event.event_name);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(42, 33, "Summary"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(45, 35, ctx_r0.caseHistory.event.summary));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(49, 37, "Comment"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(52, 39, ctx_r0.caseHistory.event.comment));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(56, 41, "Case Details"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r0.tabs);
} }
export class CaseHistoryComponent {
    constructor(route, alertService, orderService, caseNotifier, caseHistoryService) {
        this.route = route;
        this.alertService = alertService;
        this.orderService = orderService;
        this.caseNotifier = caseNotifier;
        this.caseHistoryService = caseHistoryService;
    }
    ngOnInit() {
        this.caseSubscription = this.caseNotifier.caseView.subscribe(caseDetails => {
            this.caseDetails = caseDetails;
            const eventId = this.route.snapshot.paramMap.get(CaseHistoryComponent.PARAM_EVENT_ID) || this.event;
            this.caseHistoryService
                .get(this.caseDetails.case_id, eventId)
                .pipe(map(caseHistory => {
                if (!caseHistory) {
                    const error = new HttpError();
                    error.message = CaseHistoryComponent.ERROR_MESSAGE;
                    throw error;
                }
                this.caseHistory = caseHistory;
                this.tabs = this.orderService.sort(this.caseHistory.tabs);
                this.tabs = this.sortTabFieldsAndFilterTabs(this.tabs);
            }), catchError(error => {
                console.error(error);
                if (error.status !== 401 && error.status !== 403) {
                    this.alertService.error(error.message);
                }
                return throwError(error);
            })).toPromise();
        });
    }
    ngOnDestroy() {
        if (this.caseSubscription) {
            this.caseSubscription.unsubscribe();
        }
    }
    isDataLoaded() {
        return !!(this.caseDetails && this.caseHistory);
    }
    sortTabFieldsAndFilterTabs(tabs) {
        return tabs
            .map(tab => Object.assign({}, tab, { fields: this.orderService.sort(tab.fields) }))
            .filter(tab => ShowCondition.getInstance(tab.show_condition).matchByContextFields(tab.fields));
    }
}
CaseHistoryComponent.PARAM_EVENT_ID = 'eid';
CaseHistoryComponent.ERROR_MESSAGE = 'No case history to show';
CaseHistoryComponent.ɵfac = function CaseHistoryComponent_Factory(t) { return new (t || CaseHistoryComponent)(i0.ɵɵdirectiveInject(i1.ActivatedRoute), i0.ɵɵdirectiveInject(i2.AlertService), i0.ɵɵdirectiveInject(i3.OrderService), i0.ɵɵdirectiveInject(i4.CaseNotifier), i0.ɵɵdirectiveInject(i5.CaseHistoryService)); };
CaseHistoryComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseHistoryComponent, selectors: [["ccd-case-history"]], inputs: { event: "event" }, decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "grid-row"], [1, "column-full"], [3, "caseDetails"], [1, "heading-h2"], ["aria-describedby", "event details table", 1, "EventDetails"], [4, "ngFor", "ngForOf"], [1, "caseHistorySection"], [1, "heading-h3"], [1, "CaseHistory", 3, "id"], ["ccdLabelSubstitutor", "", 3, "caseField", "contextFields", "hidden"], [3, "ngSwitch"], [4, "ngSwitchCase"], ["class", "compound-field", 4, "ngSwitchCase"], ["id", "case-viewer-label-header"], [1, "case-viewer-label"], [3, "caseField", "caseReference"], [1, "compound-field"], ["colspan", "2"]], template: function CaseHistoryComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseHistoryComponent_div_0_Template, 58, 43, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.isDataLoaded());
    } }, styles: [".CaseHistory[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .CaseHistory[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border-bottom:none}.caseHistorySection[_ngcontent-%COMP%]{margin-top:40px}.EventDetails[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .EventDetails[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{border-bottom:none}th[_ngcontent-%COMP%]{width:1%;white-space:nowrap;vertical-align:top}.compound-field[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:0}.case-viewer-controls[_ngcontent-%COMP%]{margin-top:47px;margin-bottom:20px}ccd-case-header[_ngcontent-%COMP%]{float:left;margin-right:10px}ccd-event-trigger[_ngcontent-%COMP%]{float:right}.case-viewer-label[_ngcontent-%COMP%]{min-width:300px;white-space:normal}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseHistoryComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-history', template: "<div *ngIf=\"isDataLoaded()\">\n  <div class=\"grid-row\">\n    <div class=\"column-full\">\n      <ccd-case-header [caseDetails]=\"caseDetails\"></ccd-case-header>\n    </div>\n  </div>\n  <div class=\"grid-row\">\n    <div class=\"column-full\">\n      <div>\n        <h2 class=\"heading-h2\">{{'Event Details' | rpxTranslate}}</h2>\n        <table class=\"EventDetails\" aria-describedby=\"event details table\">\n          <tbody>\n          <tr>\n            <th>{{'Date' | rpxTranslate}}</th>\n            <td>{{caseHistory.event.timestamp | ccdDate}}</td>\n          </tr>\n          <tr>\n            <th>{{'Author' | rpxTranslate}}</th>\n            <td>{{caseHistory.event.user_first_name | titlecase}} {{caseHistory.event.user_last_name | uppercase}}</td>\n          </tr>\n          <tr>\n            <th>{{'End state' | rpxTranslate}}</th>\n            <td>{{caseHistory.event.state_name}}</td>\n          </tr>\n          <tr>\n            <th>{{'Event' | rpxTranslate}}</th>\n            <td>{{caseHistory.event.event_name}}</td>\n          </tr>\n          <tr>\n            <th>{{'Summary' | rpxTranslate}}</th>\n            <td>{{caseHistory.event.summary | ccdDash}}</td>\n          </tr>\n          <tr>\n            <th>{{'Comment' | rpxTranslate}}</th>\n            <td>{{caseHistory.event.comment | ccdDash}}</td>\n          </tr>\n          </tbody>\n        </table>\n      </div>\n      <div>\n        <h2 class=\"heading-h2\">{{'Case Details' | rpxTranslate}}</h2>\n        <ng-container *ngFor=\"let tab of tabs\">\n          <div class=\"caseHistorySection\">\n            <h3 class=\"heading-h3\">{{tab.label}}</h3>\n            <table class=\"CaseHistory\" id=\"{{tab.id}}\" [attr.aria-describedby]=\"'case history table' | rpxTranslate\">\n              <ng-container *ngFor=\"let field of tab | ccdTabFields | ccdReadFieldsFilter:false :undefined :true\">\n                <div ccdLabelSubstitutor [caseField]=\"field\" [contextFields]=\"tab.fields\" [hidden]=\"field.hidden\">\n                  <ng-container [ngSwitch]=\"!(field | ccdIsCompound)\">\n                    <tr *ngSwitchCase=\"true\">\n                      <th id=\"case-viewer-label-header\">\n                        <div class=\"case-viewer-label\">{{field.label}}</div>\n                      </th>\n                      <td>\n                        <ccd-field-read [caseField]=\"field\" [caseReference]=\"caseHistory.case_id\"></ccd-field-read>\n                      </td>\n                    </tr>\n                    <tr *ngSwitchCase=\"false\" class=\"compound-field\">\n                      <td colspan=\"2\">\n                        <ccd-field-read [caseField]=\"field\" [caseReference]=\"caseHistory.case_id\"></ccd-field-read>\n                      </td>\n                    </tr>\n                  </ng-container>\n                </div>\n              </ng-container>\n            </table>\n          </div>\n        </ng-container>\n      </div>\n    </div>\n  </div>\n</div>\n", styles: [".CaseHistory th,.CaseHistory td{border-bottom:none}.caseHistorySection{margin-top:40px}.EventDetails th,.EventDetails td{border-bottom:none}th{width:1%;white-space:nowrap;vertical-align:top}.compound-field td{padding:0}.case-viewer-controls{margin-top:47px;margin-bottom:20px}ccd-case-header{float:left;margin-right:10px}ccd-event-trigger{float:right}.case-viewer-label{min-width:300px;white-space:normal}\n"] }]
    }], function () { return [{ type: i1.ActivatedRoute }, { type: i2.AlertService }, { type: i3.OrderService }, { type: i4.CaseNotifier }, { type: i5.CaseHistoryService }]; }, { event: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1oaXN0b3J5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWhpc3RvcnkvY2FzZS1oaXN0b3J5LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWhpc3RvcnkvY2FzZS1oaXN0b3J5LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFnQixVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUVBQWlFLENBQUM7QUFHaEcsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRXJFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7OztJQ29DakQsMEJBQXlCLGFBQUEsY0FBQTtJQUVVLFlBQWU7SUFBQSxpQkFBTSxFQUFBO0lBRXRELDBCQUFJO0lBQ0YscUNBQTJGO0lBQzdGLGlCQUFLLEVBQUE7Ozs7SUFKNEIsZUFBZTtJQUFm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SztrQkFEWCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU2hvd0NvbmRpdGlvbiB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvY29uZGl0aW9uYWwtc2hvdy9kb21haW4vY29uZGl0aW9uYWwtc2hvdy5tb2RlbCc7XG5pbXBvcnQgeyBDYXNlVGFiIH0gZnJvbSAnLi4vLi4vZG9tYWluL2Nhc2Utdmlldy9jYXNlLXRhYi5tb2RlbCc7XG5pbXBvcnQgeyBDYXNlVmlldyB9IGZyb20gJy4uLy4uL2RvbWFpbi9jYXNlLXZpZXcvY2FzZS12aWV3Lm1vZGVsJztcbmltcG9ydCB7IEh0dHBFcnJvciB9IGZyb20gJy4uLy4uL2RvbWFpbi9odHRwL2h0dHAtZXJyb3IubW9kZWwnO1xuaW1wb3J0IHsgQWxlcnRTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvYWxlcnQvYWxlcnQuc2VydmljZSc7XG5pbXBvcnQgeyBPcmRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9vcmRlci9vcmRlci5zZXJ2aWNlJztcbmltcG9ydCB7IENhc2VOb3RpZmllciB9IGZyb20gJy4uL2Nhc2UtZWRpdG9yL3NlcnZpY2VzL2Nhc2Uubm90aWZpZXInO1xuaW1wb3J0IHsgQ2FzZUhpc3RvcnkgfSBmcm9tICcuL2RvbWFpbi9jYXNlLWhpc3RvcnkubW9kZWwnO1xuaW1wb3J0IHsgQ2FzZUhpc3RvcnlTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jYXNlLWhpc3Rvcnkuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1jYXNlLWhpc3RvcnknLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FzZS1oaXN0b3J5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FzZS1oaXN0b3J5LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2FzZUhpc3RvcnlDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUEFSQU1fRVZFTlRfSUQgPSAnZWlkJztcblxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBFUlJPUl9NRVNTQUdFID0gJ05vIGNhc2UgaGlzdG9yeSB0byBzaG93JztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgZXZlbnQ6IHN0cmluZztcblxuICBwdWJsaWMgY2FzZUhpc3Rvcnk6IENhc2VIaXN0b3J5O1xuICBwdWJsaWMgY2FzZURldGFpbHM6IENhc2VWaWV3O1xuICBwdWJsaWMgdGFiczogQ2FzZVRhYltdO1xuICBwdWJsaWMgY2FzZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgYWxlcnRTZXJ2aWNlOiBBbGVydFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWFkb25seSBvcmRlclNlcnZpY2U6IE9yZGVyU2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhc2VOb3RpZmllcjogQ2FzZU5vdGlmaWVyLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY2FzZUhpc3RvcnlTZXJ2aWNlOiBDYXNlSGlzdG9yeVNlcnZpY2UpIHsgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNhc2VTdWJzY3JpcHRpb24gPSB0aGlzLmNhc2VOb3RpZmllci5jYXNlVmlldy5zdWJzY3JpYmUoY2FzZURldGFpbHMgPT4ge1xuICAgICAgdGhpcy5jYXNlRGV0YWlscyA9IGNhc2VEZXRhaWxzO1xuICAgICAgY29uc3QgZXZlbnRJZCA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1NYXAuZ2V0KENhc2VIaXN0b3J5Q29tcG9uZW50LlBBUkFNX0VWRU5UX0lEKSB8fCB0aGlzLmV2ZW50O1xuICAgICAgdGhpcy5jYXNlSGlzdG9yeVNlcnZpY2VcbiAgICAgICAgLmdldCh0aGlzLmNhc2VEZXRhaWxzLmNhc2VfaWQsIGV2ZW50SWQpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIG1hcChjYXNlSGlzdG9yeSA9PiB7XG4gICAgICAgICAgICBpZiAoIWNhc2VIaXN0b3J5KSB7XG4gICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEh0dHBFcnJvcigpO1xuICAgICAgICAgICAgICBlcnJvci5tZXNzYWdlID0gQ2FzZUhpc3RvcnlDb21wb25lbnQuRVJST1JfTUVTU0FHRTtcbiAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY2FzZUhpc3RvcnkgPSBjYXNlSGlzdG9yeTtcbiAgICAgICAgICAgIHRoaXMudGFicyA9IHRoaXMub3JkZXJTZXJ2aWNlLnNvcnQodGhpcy5jYXNlSGlzdG9yeS50YWJzKTtcbiAgICAgICAgICAgIHRoaXMudGFicyA9IHRoaXMuc29ydFRhYkZpZWxkc0FuZEZpbHRlclRhYnModGhpcy50YWJzKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBjYXRjaEVycm9yKGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyAhPT0gNDAxICYmIGVycm9yLnN0YXR1cyAhPT0gNDAzKSB7XG4gICAgICAgICAgICAgIHRoaXMuYWxlcnRTZXJ2aWNlLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKS50b1Byb21pc2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jYXNlU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLmNhc2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNEYXRhTG9hZGVkKCkge1xuICAgIHJldHVybiAhISh0aGlzLmNhc2VEZXRhaWxzICYmIHRoaXMuY2FzZUhpc3RvcnkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzb3J0VGFiRmllbGRzQW5kRmlsdGVyVGFicyh0YWJzOiBDYXNlVGFiW10pOiBDYXNlVGFiW10ge1xuICAgIHJldHVybiB0YWJzXG4gICAgICAubWFwKHRhYiA9PiBPYmplY3QuYXNzaWduKHt9LCB0YWIsIHsgZmllbGRzOiB0aGlzLm9yZGVyU2VydmljZS5zb3J0KHRhYi5maWVsZHMpIH0pKVxuICAgICAgLmZpbHRlcih0YWIgPT4gU2hvd0NvbmRpdGlvbi5nZXRJbnN0YW5jZSh0YWIuc2hvd19jb25kaXRpb24pLm1hdGNoQnlDb250ZXh0RmllbGRzKHRhYi5maWVsZHMpKTtcbiAgfVxufVxuIiwiPGRpdiAqbmdJZj1cImlzRGF0YUxvYWRlZCgpXCI+XG4gIDxkaXYgY2xhc3M9XCJncmlkLXJvd1wiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2x1bW4tZnVsbFwiPlxuICAgICAgPGNjZC1jYXNlLWhlYWRlciBbY2FzZURldGFpbHNdPVwiY2FzZURldGFpbHNcIj48L2NjZC1jYXNlLWhlYWRlcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJncmlkLXJvd1wiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2x1bW4tZnVsbFwiPlxuICAgICAgPGRpdj5cbiAgICAgICAgPGgyIGNsYXNzPVwiaGVhZGluZy1oMlwiPnt7J0V2ZW50IERldGFpbHMnIHwgcnB4VHJhbnNsYXRlfX08L2gyPlxuICAgICAgICA8dGFibGUgY2xhc3M9XCJFdmVudERldGFpbHNcIiBhcmlhLWRlc2NyaWJlZGJ5PVwiZXZlbnQgZGV0YWlscyB0YWJsZVwiPlxuICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGg+e3snRGF0ZScgfCBycHhUcmFuc2xhdGV9fTwvdGg+XG4gICAgICAgICAgICA8dGQ+e3tjYXNlSGlzdG9yeS5ldmVudC50aW1lc3RhbXAgfCBjY2REYXRlfX08L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRoPnt7J0F1dGhvcicgfCBycHhUcmFuc2xhdGV9fTwvdGg+XG4gICAgICAgICAgICA8dGQ+e3tjYXNlSGlzdG9yeS5ldmVudC51c2VyX2ZpcnN0X25hbWUgfCB0aXRsZWNhc2V9fSB7e2Nhc2VIaXN0b3J5LmV2ZW50LnVzZXJfbGFzdF9uYW1lIHwgdXBwZXJjYXNlfX08L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRoPnt7J0VuZCBzdGF0ZScgfCBycHhUcmFuc2xhdGV9fTwvdGg+XG4gICAgICAgICAgICA8dGQ+e3tjYXNlSGlzdG9yeS5ldmVudC5zdGF0ZV9uYW1lfX08L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRoPnt7J0V2ZW50JyB8IHJweFRyYW5zbGF0ZX19PC90aD5cbiAgICAgICAgICAgIDx0ZD57e2Nhc2VIaXN0b3J5LmV2ZW50LmV2ZW50X25hbWV9fTwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGg+e3snU3VtbWFyeScgfCBycHhUcmFuc2xhdGV9fTwvdGg+XG4gICAgICAgICAgICA8dGQ+e3tjYXNlSGlzdG9yeS5ldmVudC5zdW1tYXJ5IHwgY2NkRGFzaH19PC90ZD5cbiAgICAgICAgICA8L3RyPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0aD57eydDb21tZW50JyB8IHJweFRyYW5zbGF0ZX19PC90aD5cbiAgICAgICAgICAgIDx0ZD57e2Nhc2VIaXN0b3J5LmV2ZW50LmNvbW1lbnQgfCBjY2REYXNofX08L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgPGgyIGNsYXNzPVwiaGVhZGluZy1oMlwiPnt7J0Nhc2UgRGV0YWlscycgfCBycHhUcmFuc2xhdGV9fTwvaDI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHRhYiBvZiB0YWJzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNhc2VIaXN0b3J5U2VjdGlvblwiPlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwiaGVhZGluZy1oM1wiPnt7dGFiLmxhYmVsfX08L2gzPlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwiQ2FzZUhpc3RvcnlcIiBpZD1cInt7dGFiLmlkfX1cIiBbYXR0ci5hcmlhLWRlc2NyaWJlZGJ5XT1cIidjYXNlIGhpc3RvcnkgdGFibGUnIHwgcnB4VHJhbnNsYXRlXCI+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGZpZWxkIG9mIHRhYiB8IGNjZFRhYkZpZWxkcyB8IGNjZFJlYWRGaWVsZHNGaWx0ZXI6ZmFsc2UgOnVuZGVmaW5lZCA6dHJ1ZVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2NkTGFiZWxTdWJzdGl0dXRvciBbY2FzZUZpZWxkXT1cImZpZWxkXCIgW2NvbnRleHRGaWVsZHNdPVwidGFiLmZpZWxkc1wiIFtoaWRkZW5dPVwiZmllbGQuaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCIhKGZpZWxkIHwgY2NkSXNDb21wb3VuZClcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRyICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRoIGlkPVwiY2FzZS12aWV3ZXItbGFiZWwtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FzZS12aWV3ZXItbGFiZWxcIj57e2ZpZWxkLmxhYmVsfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxjY2QtZmllbGQtcmVhZCBbY2FzZUZpZWxkXT1cImZpZWxkXCIgW2Nhc2VSZWZlcmVuY2VdPVwiY2FzZUhpc3RvcnkuY2FzZV9pZFwiPjwvY2NkLWZpZWxkLXJlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgPHRyICpuZ1N3aXRjaENhc2U9XCJmYWxzZVwiIGNsYXNzPVwiY29tcG91bmQtZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxjY2QtZmllbGQtcmVhZCBbY2FzZUZpZWxkXT1cImZpZWxkXCIgW2Nhc2VSZWZlcmVuY2VdPVwiY2FzZUhpc3RvcnkuY2FzZV9pZFwiPjwvY2NkLWZpZWxkLXJlYWQ+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=