import { Component, Input } from '@angular/core';
import { CaseFlagStatus } from '../../enums';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function CaseFlagTableComponent_table_0_tr_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 13);
    i0.ɵɵtext(2, "None");
    i0.ɵɵelementEnd()();
} }
function CaseFlagTableComponent_table_0_tbody_17_tr_1_strong_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong", 19);
    i0.ɵɵtext(1, "Active");
    i0.ɵɵelementEnd();
} }
function CaseFlagTableComponent_table_0_tbody_17_tr_1_strong_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong", 20);
    i0.ɵɵtext(1, "Inactive");
    i0.ɵɵelementEnd();
} }
function CaseFlagTableComponent_table_0_tbody_17_tr_1_strong_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "strong", 20);
    i0.ɵɵtext(1, "Requested");
    i0.ɵɵelementEnd();
} }
function CaseFlagTableComponent_table_0_tbody_17_tr_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr", 15)(1, "td", 16)(2, "div");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(8, "td", 16);
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td", 16);
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "td", 16);
    i0.ɵɵtext(14);
    i0.ɵɵpipe(15, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(16, "td", 16);
    i0.ɵɵtemplate(17, CaseFlagTableComponent_table_0_tbody_17_tr_1_strong_17_Template, 2, 0, "strong", 17);
    i0.ɵɵtemplate(18, CaseFlagTableComponent_table_0_tbody_17_tr_1_strong_18_Template, 2, 0, "strong", 18);
    i0.ɵɵtemplate(19, CaseFlagTableComponent_table_0_tbody_17_tr_1_strong_19_Template, 2, 0, "strong", 18);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const flagDetail_r4 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(flagDetail_r4.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(flagDetail_r4.otherDescription);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(flagDetail_r4.subTypeValue);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(flagDetail_r4.flagComment);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(12, 9, flagDetail_r4.dateTimeCreated, "dd LLL yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(15, 12, flagDetail_r4.dateTimeModified, "dd LLL yyyy"));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", flagDetail_r4.status === ctx_r3.caseFlagStatus.ACTIVE);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", flagDetail_r4.status === ctx_r3.caseFlagStatus.INACTIVE);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", flagDetail_r4.status === ctx_r3.caseFlagStatus.REQUESTED);
} }
function CaseFlagTableComponent_table_0_tbody_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody", 10);
    i0.ɵɵtemplate(1, CaseFlagTableComponent_table_0_tbody_17_tr_1_Template, 20, 15, "tr", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.flagData.flags.details);
} }
function CaseFlagTableComponent_table_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 1)(1, "caption", 2);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "thead", 3)(4, "tr", 4)(5, "th", 5);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th", 6);
    i0.ɵɵtext(8, "Comments");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th", 7);
    i0.ɵɵtext(10, "Creation date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th", 8);
    i0.ɵɵtext(12, "Last modified");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th", 9);
    i0.ɵɵtext(14, "Flag status");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(15, "tbody", 10);
    i0.ɵɵtemplate(16, CaseFlagTableComponent_table_0_tr_16_Template, 3, 0, "tr", 11);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(17, CaseFlagTableComponent_table_0_tbody_17_Template, 2, 1, "tbody", 12);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.tableCaption);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.firstColumnHeader);
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngIf", !ctx_r0.flagData.flags.details || ctx_r0.flagData.flags.details && ctx_r0.flagData.flags.details.length === 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.flagData.flags.details && ctx_r0.flagData.flags.details.length > 0);
} }
export class CaseFlagTableComponent {
    get caseFlagStatus() {
        return CaseFlagStatus;
    }
}
CaseFlagTableComponent.ɵfac = function CaseFlagTableComponent_Factory(t) { return new (t || CaseFlagTableComponent)(); };
CaseFlagTableComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseFlagTableComponent, selectors: [["ccd-case-flag-table"]], inputs: { tableCaption: "tableCaption", flagData: "flagData", firstColumnHeader: "firstColumnHeader" }, decls: 1, vars: 1, consts: [["class", "govuk-table", 4, "ngIf"], [1, "govuk-table"], [1, "govuk-table__caption", "govuk-table__caption--l"], [1, "govuk-table__head"], [1, "govuk-table__row"], ["scope", "col", 1, "govuk-table__header", "col-party-name"], ["scope", "col", 1, "govuk-table__header", "col-comments"], ["scope", "col", 1, "govuk-table__header", "col-creation-date"], ["scope", "col", 1, "govuk-table__header", "col-last-modified"], ["scope", "col", 1, "govuk-table__header", "col-flag-status"], [1, "govuk-table__body"], [4, "ngIf"], ["class", "govuk-table__body", 4, "ngIf"], ["colspan", "5"], ["scope", "row", "class", "govuk-table__row", 4, "ngFor", "ngForOf"], ["scope", "row", 1, "govuk-table__row"], [1, "govuk-table__cell"], ["class", "govuk-tag", 4, "ngIf"], ["class", "govuk-tag govuk-tag--grey", 4, "ngIf"], [1, "govuk-tag"], [1, "govuk-tag", "govuk-tag--grey"]], template: function CaseFlagTableComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CaseFlagTableComponent_table_0_Template, 18, 4, "table", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.flagData);
    } }, dependencies: [i1.NgForOf, i1.NgIf, i1.DatePipe], styles: [".govuk-table[_ngcontent-%COMP%]   .govuk-table__caption[_ngcontent-%COMP%]{margin-top:10px}.govuk-table[_ngcontent-%COMP%]   .govuk-table__head[_ngcontent-%COMP%]   .govuk-table__row[_ngcontent-%COMP%]   .col-party-name[_ngcontent-%COMP%]{width:24%}.govuk-table[_ngcontent-%COMP%]   .govuk-table__head[_ngcontent-%COMP%]   .govuk-table__row[_ngcontent-%COMP%]   .col-comments[_ngcontent-%COMP%]{width:42%}.govuk-table[_ngcontent-%COMP%]   .govuk-table__head[_ngcontent-%COMP%]   .govuk-table__row[_ngcontent-%COMP%]   .col-creation-date[_ngcontent-%COMP%], .govuk-table[_ngcontent-%COMP%]   .govuk-table__head[_ngcontent-%COMP%]   .govuk-table__row[_ngcontent-%COMP%]   .col-last-modified[_ngcontent-%COMP%]{width:12%}.govuk-table[_ngcontent-%COMP%]   .govuk-table__head[_ngcontent-%COMP%]   .govuk-table__row[_ngcontent-%COMP%]   .col-flag-status[_ngcontent-%COMP%]{width:10%}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseFlagTableComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-flag-table', template: "<table class=\"govuk-table\" *ngIf=\"flagData\">\n  <caption class=\"govuk-table__caption govuk-table__caption--l\">{{tableCaption}}</caption>\n  <thead class=\"govuk-table__head\">\n    <tr class=\"govuk-table__row\">\n      <th scope=\"col\" class=\"govuk-table__header col-party-name\">{{firstColumnHeader}}</th>\n      <th scope=\"col\" class=\"govuk-table__header col-comments\">Comments</th>\n      <th scope=\"col\" class=\"govuk-table__header col-creation-date\">Creation date</th>\n      <th scope=\"col\" class=\"govuk-table__header col-last-modified\">Last modified</th>\n      <th scope=\"col\" class=\"govuk-table__header col-flag-status\">Flag status</th>\n    </tr>\n  </thead>\n  <tbody class=\"govuk-table__body\">\n    <tr *ngIf=\"!flagData.flags.details || (flagData.flags.details && flagData.flags.details.length === 0)\">\n      <td colspan=\"5\">None</td>\n    </tr>\n  </tbody>\n  <tbody class=\"govuk-table__body\" *ngIf=\"flagData.flags.details && flagData.flags.details.length > 0\">\n    <tr scope=\"row\" class=\"govuk-table__row\" *ngFor=\"let flagDetail of flagData.flags.details\">\n      <td class=\"govuk-table__cell\">\n        <div>{{flagDetail.name}}</div>\n        <div>{{flagDetail.otherDescription}}</div>\n        <div>{{flagDetail.subTypeValue}}</div>\n      </td>\n      <td class=\"govuk-table__cell\">{{flagDetail.flagComment}}</td>\n      <td class=\"govuk-table__cell\">{{flagDetail.dateTimeCreated | date: 'dd LLL yyyy'}}</td>\n      <td class=\"govuk-table__cell\">{{flagDetail.dateTimeModified | date: 'dd LLL yyyy'}}</td>\n      <td class=\"govuk-table__cell\">\n        <strong *ngIf=\"flagDetail.status === caseFlagStatus.ACTIVE\" class=\"govuk-tag\">Active</strong>\n        <strong *ngIf=\"flagDetail.status === caseFlagStatus.INACTIVE\" class=\"govuk-tag govuk-tag--grey\">Inactive</strong>\n        <strong *ngIf=\"flagDetail.status === caseFlagStatus.REQUESTED\" class=\"govuk-tag govuk-tag--grey\">Requested</strong>\n      </td>\n    </tr>\n  </tbody>\n</table>\n", styles: [".govuk-table .govuk-table__caption{margin-top:10px}.govuk-table .govuk-table__head .govuk-table__row .col-party-name{width:24%}.govuk-table .govuk-table__head .govuk-table__row .col-comments{width:42%}.govuk-table .govuk-table__head .govuk-table__row .col-creation-date,.govuk-table .govuk-table__head .govuk-table__row .col-last-modified{width:12%}.govuk-table .govuk-table__head .govuk-table__row .col-flag-status{width:10%}\n"] }]
    }], null, { tableCaption: [{
            type: Input
        }], flagData: [{
            type: Input
        }], firstColumnHeader: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1mbGFnLXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2Nhc2UtZmxhZy9jb21wb25lbnRzL2Nhc2UtZmxhZy10YWJsZS9jYXNlLWZsYWctdGFibGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1mbGFnL2NvbXBvbmVudHMvY2FzZS1mbGFnLXRhYmxlL2Nhc2UtZmxhZy10YWJsZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFDOzs7O0lDVXpDLDBCQUF1RyxhQUFBO0lBQ3JGLG9CQUFJO0lBQUEsaUJBQUssRUFBQTs7O0lBY3ZCLGtDQUE4RTtJQUFBLHNCQUFNO0lBQUEsaUJBQVM7OztJQUM3RixrQ0FBZ0c7SUFBQSx3QkFBUTtJQUFBLGlCQUFTOzs7SUFDakgsa0NBQWlHO0lBQUEseUJBQVM7SUFBQSxpQkFBUzs7O0lBWnZILDhCQUEyRixhQUFBLFVBQUE7SUFFbEYsWUFBbUI7SUFBQSxpQkFBTTtJQUM5QiwyQkFBSztJQUFBLFlBQStCO0lBQUEsaUJBQU07SUFDMUMsMkJBQUs7SUFBQSxZQUEyQjtJQUFBLGlCQUFNLEVBQUE7SUFFeEMsOEJBQThCO0lBQUEsWUFBMEI7SUFBQSxpQkFBSztJQUM3RCwrQkFBOEI7SUFBQSxhQUFvRDs7SUFBQSxpQkFBSztJQUN2RiwrQkFBOEI7SUFBQSxhQUFxRDs7SUFBQSxpQkFBSztJQUN4RiwrQkFBOEI7SUFDNUIsc0dBQTZGO0lBQzdGLHNHQUFpSDtJQUNqSCxzR0FBbUg7SUFDckgsaUJBQUssRUFBQTs7OztJQVhFLGVBQW1CO0lBQW5CLHdDQUFtQjtJQUNuQixlQUErQjtJQUEvQixvREFBK0I7SUFDL0IsZUFBMkI7SUFBM0IsZ0RBQTJCO0lBRUosZUFBMEI7SUFBMUIsK0NBQTBCO0lBQzFCLGVBQW9EO0lBQXBELHlGQUFvRDtJQUNwRCxlQUFxRDtJQUFyRCwyRkFBcUQ7SUFFeEUsZUFBaUQ7SUFBakQsNEVBQWlEO0lBQ2pELGVBQW1EO0lBQW5ELDhFQUFtRDtJQUNuRCxlQUFvRDtJQUFwRCwrRUFBb0Q7OztJQWJuRSxpQ0FBcUc7SUFDbkcseUZBY0s7SUFDUCxpQkFBUTs7O0lBZjBELGVBQXlCO0lBQXpCLHVEQUF5Qjs7O0lBakI3RixnQ0FBNEMsaUJBQUE7SUFDb0IsWUFBZ0I7SUFBQSxpQkFBVTtJQUN4RixnQ0FBaUMsWUFBQSxZQUFBO0lBRThCLFlBQXFCO0lBQUEsaUJBQUs7SUFDckYsNkJBQXlEO0lBQUEsd0JBQVE7SUFBQSxpQkFBSztJQUN0RSw2QkFBOEQ7SUFBQSw4QkFBYTtJQUFBLGlCQUFLO0lBQ2hGLDhCQUE4RDtJQUFBLDhCQUFhO0lBQUEsaUJBQUs7SUFDaEYsOEJBQTREO0lBQUEsNEJBQVc7SUFBQSxpQkFBSyxFQUFBLEVBQUE7SUFHaEYsa0NBQWlDO0lBQy9CLGdGQUVLO0lBQ1AsaUJBQVE7SUFDUixzRkFnQlE7SUFDVixpQkFBUTs7O0lBaEN3RCxlQUFnQjtJQUFoQix5Q0FBZ0I7SUFHZixlQUFxQjtJQUFyQiw4Q0FBcUI7SUFRN0UsZ0JBQWdHO0lBQWhHLG9JQUFnRztJQUlyRSxlQUFpRTtJQUFqRSxnR0FBaUU7O0FEUHJHLE1BQU0sT0FBTyxzQkFBc0I7SUFNakMsSUFBVyxjQUFjO1FBQ3ZCLE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7OzRGQVJVLHNCQUFzQjt5RUFBdEIsc0JBQXNCO1FDVG5DLDRFQWlDUTs7UUFqQ29CLG1DQUFjOzt1RkRTN0Isc0JBQXNCO2NBTGxDLFNBQVM7MkJBQ0UscUJBQXFCO2dCQU1mLFlBQVk7a0JBQTNCLEtBQUs7WUFDVSxRQUFRO2tCQUF2QixLQUFLO1lBQ1UsaUJBQWlCO2tCQUFoQyxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmxhZ3NXaXRoRm9ybUdyb3VwUGF0aCB9IGZyb20gJy4uLy4uL2RvbWFpbic7XG5pbXBvcnQgeyBDYXNlRmxhZ1N0YXR1cyB9IGZyb20gJy4uLy4uL2VudW1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWNhc2UtZmxhZy10YWJsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXNlLWZsYWctdGFibGUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYXNlLWZsYWctdGFibGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYXNlRmxhZ1RhYmxlQ29tcG9uZW50IHtcblxuICBASW5wdXQoKSBwdWJsaWMgdGFibGVDYXB0aW9uOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBmbGFnRGF0YTogRmxhZ3NXaXRoRm9ybUdyb3VwUGF0aDtcbiAgQElucHV0KCkgcHVibGljIGZpcnN0Q29sdW1uSGVhZGVyOiBzdHJpbmc7XG5cbiAgcHVibGljIGdldCBjYXNlRmxhZ1N0YXR1cygpOiB0eXBlb2YgQ2FzZUZsYWdTdGF0dXMge1xuICAgIHJldHVybiBDYXNlRmxhZ1N0YXR1cztcbiAgfVxufVxuIiwiPHRhYmxlIGNsYXNzPVwiZ292dWstdGFibGVcIiAqbmdJZj1cImZsYWdEYXRhXCI+XG4gIDxjYXB0aW9uIGNsYXNzPVwiZ292dWstdGFibGVfX2NhcHRpb24gZ292dWstdGFibGVfX2NhcHRpb24tLWxcIj57e3RhYmxlQ2FwdGlvbn19PC9jYXB0aW9uPlxuICA8dGhlYWQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZFwiPlxuICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgIDx0aCBzY29wZT1cImNvbFwiIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciBjb2wtcGFydHktbmFtZVwiPnt7Zmlyc3RDb2x1bW5IZWFkZXJ9fTwvdGg+XG4gICAgICA8dGggc2NvcGU9XCJjb2xcIiBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgY29sLWNvbW1lbnRzXCI+Q29tbWVudHM8L3RoPlxuICAgICAgPHRoIHNjb3BlPVwiY29sXCIgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyIGNvbC1jcmVhdGlvbi1kYXRlXCI+Q3JlYXRpb24gZGF0ZTwvdGg+XG4gICAgICA8dGggc2NvcGU9XCJjb2xcIiBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXIgY29sLWxhc3QtbW9kaWZpZWRcIj5MYXN0IG1vZGlmaWVkPC90aD5cbiAgICAgIDx0aCBzY29wZT1cImNvbFwiIGNsYXNzPVwiZ292dWstdGFibGVfX2hlYWRlciBjb2wtZmxhZy1zdGF0dXNcIj5GbGFnIHN0YXR1czwvdGg+XG4gICAgPC90cj5cbiAgPC90aGVhZD5cbiAgPHRib2R5IGNsYXNzPVwiZ292dWstdGFibGVfX2JvZHlcIj5cbiAgICA8dHIgKm5nSWY9XCIhZmxhZ0RhdGEuZmxhZ3MuZGV0YWlscyB8fCAoZmxhZ0RhdGEuZmxhZ3MuZGV0YWlscyAmJiBmbGFnRGF0YS5mbGFncy5kZXRhaWxzLmxlbmd0aCA9PT0gMClcIj5cbiAgICAgIDx0ZCBjb2xzcGFuPVwiNVwiPk5vbmU8L3RkPlxuICAgIDwvdHI+XG4gIDwvdGJvZHk+XG4gIDx0Ym9keSBjbGFzcz1cImdvdnVrLXRhYmxlX19ib2R5XCIgKm5nSWY9XCJmbGFnRGF0YS5mbGFncy5kZXRhaWxzICYmIGZsYWdEYXRhLmZsYWdzLmRldGFpbHMubGVuZ3RoID4gMFwiPlxuICAgIDx0ciBzY29wZT1cInJvd1wiIGNsYXNzPVwiZ292dWstdGFibGVfX3Jvd1wiICpuZ0Zvcj1cImxldCBmbGFnRGV0YWlsIG9mIGZsYWdEYXRhLmZsYWdzLmRldGFpbHNcIj5cbiAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+XG4gICAgICAgIDxkaXY+e3tmbGFnRGV0YWlsLm5hbWV9fTwvZGl2PlxuICAgICAgICA8ZGl2Pnt7ZmxhZ0RldGFpbC5vdGhlckRlc2NyaXB0aW9ufX08L2Rpdj5cbiAgICAgICAgPGRpdj57e2ZsYWdEZXRhaWwuc3ViVHlwZVZhbHVlfX08L2Rpdj5cbiAgICAgIDwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7ZmxhZ0RldGFpbC5mbGFnQ29tbWVudH19PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+e3tmbGFnRGV0YWlsLmRhdGVUaW1lQ3JlYXRlZCB8IGRhdGU6ICdkZCBMTEwgeXl5eSd9fTwvdGQ+XG4gICAgICA8dGQgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiPnt7ZmxhZ0RldGFpbC5kYXRlVGltZU1vZGlmaWVkIHwgZGF0ZTogJ2RkIExMTCB5eXl5J319PC90ZD5cbiAgICAgIDx0ZCBjbGFzcz1cImdvdnVrLXRhYmxlX19jZWxsXCI+XG4gICAgICAgIDxzdHJvbmcgKm5nSWY9XCJmbGFnRGV0YWlsLnN0YXR1cyA9PT0gY2FzZUZsYWdTdGF0dXMuQUNUSVZFXCIgY2xhc3M9XCJnb3Z1ay10YWdcIj5BY3RpdmU8L3N0cm9uZz5cbiAgICAgICAgPHN0cm9uZyAqbmdJZj1cImZsYWdEZXRhaWwuc3RhdHVzID09PSBjYXNlRmxhZ1N0YXR1cy5JTkFDVElWRVwiIGNsYXNzPVwiZ292dWstdGFnIGdvdnVrLXRhZy0tZ3JleVwiPkluYWN0aXZlPC9zdHJvbmc+XG4gICAgICAgIDxzdHJvbmcgKm5nSWY9XCJmbGFnRGV0YWlsLnN0YXR1cyA9PT0gY2FzZUZsYWdTdGF0dXMuUkVRVUVTVEVEXCIgY2xhc3M9XCJnb3Z1ay10YWcgZ292dWstdGFnLS1ncmV5XCI+UmVxdWVzdGVkPC9zdHJvbmc+XG4gICAgICA8L3RkPlxuICAgIDwvdHI+XG4gIDwvdGJvZHk+XG48L3RhYmxlPlxuIl19