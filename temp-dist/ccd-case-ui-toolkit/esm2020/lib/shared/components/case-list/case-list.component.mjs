import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BrowserService } from '../../services/browser/browser.service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/browser/browser.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
import * as i4 from "../pagination/pagination.component";
import * as i5 from "ngx-pagination";
import * as i6 from "rpx-xui-translation";
function CaseListComponent_th_6_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "th", 8)(1, "div", 9)(2, "input", 10);
    i0.ɵɵlistener("change", function CaseListComponent_th_6_Template_input_change_2_listener() { i0.ɵɵrestoreView(_r5); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.selectAll()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "label", 11);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("checked", ctx_r0.allOnPageSelected())("disabled", !ctx_r0.canAnyBeShared());
} }
function CaseListComponent_th_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const h_r6 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, h_r6.header));
} }
function CaseListComponent_ng_container_9_th_2_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "th", 14)(1, "div", 9)(2, "input", 15);
    i0.ɵɵlistener("change", function CaseListComponent_ng_container_9_th_2_Template_input_change_2_listener() { i0.ɵɵrestoreView(_r12); const c_r7 = i0.ɵɵnextContext().$implicit; const ctx_r10 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r10.changeSelection(c_r7)); })("keyup", function CaseListComponent_ng_container_9_th_2_Template_input_keyup_2_listener($event) { i0.ɵɵrestoreView(_r12); const c_r7 = i0.ɵɵnextContext().$implicit; const ctx_r13 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r13.onKeyUp($event, c_r7)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "label", 16);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const c_r7 = i0.ɵɵnextContext().$implicit;
    const ctx_r8 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵpropertyInterpolate1("id", "select-", c_r7[ctx_r8.tableConfig.idField], "")("name", "select-", c_r7[ctx_r8.tableConfig.idField], "");
    i0.ɵɵproperty("checked", ctx_r8.isSelected(c_r7))("disabled", !ctx_r8.canBeShared(c_r7));
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("for", "select-", c_r7[ctx_r8.tableConfig.idField], "");
} }
function CaseListComponent_ng_container_9_ng_container_3_th_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const col_r16 = i0.ɵɵnextContext(2).$implicit;
    const c_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, c_r7[col_r16.key]));
} }
function CaseListComponent_ng_container_9_ng_container_3_th_1_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "a", 19);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const col_r16 = i0.ɵɵnextContext(2).$implicit;
    const c_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("routerLink", c_r7.routerLink);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, c_r7[col_r16.key]));
} }
function CaseListComponent_ng_container_9_ng_container_3_th_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 14);
    i0.ɵɵtemplate(1, CaseListComponent_ng_container_9_ng_container_3_th_1_ng_container_1_Template, 3, 3, "ng-container", 18);
    i0.ɵɵtemplate(2, CaseListComponent_ng_container_9_ng_container_3_th_1_ng_container_2_Template, 4, 4, "ng-container", 18);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const col_r16 = i0.ɵɵnextContext().$implicit;
    const c_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !col_r16.type || col_r16.type === "text");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", col_r16.type === "link" && c_r7.routerLink);
} }
function CaseListComponent_ng_container_9_ng_container_3_td_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "a", 19);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const col_r16 = i0.ɵɵnextContext(2).$implicit;
    const c_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("routerLink", c_r7.routerLink);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, c_r7[col_r16.key]));
} }
function CaseListComponent_ng_container_9_ng_container_3_td_2_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "currency");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const col_r16 = i0.ɵɵnextContext(2).$implicit;
    const c_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("-", i0.ɵɵpipeBind2(2, 1, c_r7[col_r16.key], "GBP"), "");
} }
function CaseListComponent_ng_container_9_ng_container_3_td_2_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const col_r16 = i0.ɵɵnextContext(2).$implicit;
    const c_r7 = i0.ɵɵnextContext().$implicit;
    const ctx_r30 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r30.formatDate(c_r7[col_r16.key]));
} }
function CaseListComponent_ng_container_9_ng_container_3_td_2_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const col_r16 = i0.ɵɵnextContext(2).$implicit;
    const c_r7 = i0.ɵɵnextContext().$implicit;
    const ctx_r31 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r31.formatDateAtTime(c_r7[col_r16.key]));
} }
function CaseListComponent_ng_container_9_ng_container_3_td_2_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const col_r16 = i0.ɵɵnextContext(2).$implicit;
    const c_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, c_r7[col_r16.key]));
} }
function CaseListComponent_ng_container_9_ng_container_3_td_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 20);
    i0.ɵɵtemplate(1, CaseListComponent_ng_container_9_ng_container_3_td_2_ng_container_1_Template, 4, 4, "ng-container", 18);
    i0.ɵɵtemplate(2, CaseListComponent_ng_container_9_ng_container_3_td_2_ng_container_2_Template, 3, 4, "ng-container", 21);
    i0.ɵɵtemplate(3, CaseListComponent_ng_container_9_ng_container_3_td_2_ng_container_3_Template, 2, 1, "ng-container", 21);
    i0.ɵɵtemplate(4, CaseListComponent_ng_container_9_ng_container_3_td_2_ng_container_4_Template, 2, 1, "ng-container", 21);
    i0.ɵɵtemplate(5, CaseListComponent_ng_container_9_ng_container_3_td_2_ng_container_5_Template, 3, 3, "ng-container", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const col_r16 = i0.ɵɵnextContext().$implicit;
    const c_r7 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("ngSwitch", col_r16 == null ? null : col_r16.type);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", col_r16.type === "link" && c_r7.routerLink);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "money");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "date");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", "dateAtTime");
} }
function CaseListComponent_ng_container_9_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CaseListComponent_ng_container_9_ng_container_3_th_1_Template, 3, 2, "th", 13);
    i0.ɵɵtemplate(2, CaseListComponent_ng_container_9_ng_container_3_td_2_Template, 6, 5, "td", 17);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const isFirst_r17 = ctx.first;
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", isFirst_r17 && ctx_r9.firstCellIsHeader);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !(isFirst_r17 && ctx_r9.firstCellIsHeader));
} }
function CaseListComponent_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "tr", 12);
    i0.ɵɵtemplate(2, CaseListComponent_ng_container_9_th_2_Template, 4, 5, "th", 13);
    i0.ɵɵtemplate(3, CaseListComponent_ng_container_9_ng_container_3_Template, 3, 2, "ng-container", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r2.selectionEnabled);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.tableConfig.columnConfigs);
} }
function CaseListComponent_ccd_pagination_11_Template(rf, ctx) { if (rf & 1) {
    const _r46 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ccd-pagination", 23);
    i0.ɵɵlistener("pageChange", function CaseListComponent_ccd_pagination_11_Template_ccd_pagination_pageChange_0_listener($event) { i0.ɵɵrestoreView(_r46); const ctx_r45 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r45.goToPage($event)); });
    i0.ɵɵelementEnd();
} }
const _c0 = function (a0, a1, a2) { return { itemsPerPage: a0, currentPage: a1, totalItems: a2 }; };
export class DateTimeFormatUtils {
    static formatDateAtTime(date, is24Hour) {
        return `${formatDate(date, 'dd MMM yyyy', 'en-GB')} at ${DateTimeFormatUtils.formatTime(date, is24Hour)}`;
    }
    static formatTime(date, is24Hour) {
        return is24Hour ? formatDate(date, 'HH:mm', 'en-GB') : formatDate(date, 'h:mm a', 'en-GB').toLowerCase();
    }
}
export class CaseListComponent {
    constructor(browserService) {
        this.browserService = browserService;
        this.classes = '';
        this.firstCellIsHeader = false;
        this.tableConfig = {
            idField: 'id',
            columnConfigs: [
                { header: 'Date', key: 'date', type: 'text' },
                { header: 'Amount', key: 'amount' }
            ]
        };
        this.selectionEnabled = false;
        this.selection = new EventEmitter();
        this.selectedCases = [];
        this.pageChange = new EventEmitter();
    }
    formatDate(date) {
        return date ? formatDate(date, 'dd MMM yyyy', 'en-GB') : '-';
    }
    formatDateAtTime(date) {
        return date ? DateTimeFormatUtils.formatDateAtTime(date, false) : '-';
    }
    canBeShared(c) {
        return true;
    }
    canAnyBeShared() {
        return this.cases.some(c => this.canBeShared(c));
    }
    selectAll() {
        if (this.allOnPageSelected()) {
            // All cases already selected, so unselect all on this page
            this.selectedCases = [];
        }
        else {
            this.cases.forEach(aCase => {
                if (!this.isSelected(aCase) && this.canBeShared(aCase)) {
                    this.selectedCases = [...this.selectedCases, aCase];
                }
            });
        }
        this.selection.emit(this.selectedCases);
    }
    changeSelection(aCase) {
        if (this.isSelected(aCase)) {
            this.selectedCases.forEach((aSelectedCase, i) => {
                if (aCase.case_id === aSelectedCase.case_id) {
                    this.selectedCases = this.selectedCases.slice(0, i).concat(this.selectedCases.slice(i + 1));
                }
            });
        }
        else {
            if (this.canBeShared(aCase)) {
                this.selectedCases = [...this.selectedCases, aCase];
            }
        }
        this.selection.emit(this.selectedCases);
    }
    isSelected(aCase) {
        if (this.selectedCases) {
            for (let index = 0, length = this.selectedCases.length; index < length; index++) {
                if (aCase.case_id === this.selectedCases[index].case_id) {
                    return true;
                }
            }
        }
        return false;
    }
    allOnPageSelected() {
        return !this.cases.some(aCase => !this.isSelected(aCase));
    }
    onKeyUp($event, aCase) {
        if ($event.key === 'Space') {
            if (this.browserService.isFirefox || this.browserService.isSafari || this.browserService.isIEOrEdge) {
                this.changeSelection(aCase);
            }
        }
    }
    goToPage(pageNumber) {
        this.currentPageNo = pageNumber;
        this.pageChange.emit(pageNumber);
    }
}
CaseListComponent.ɵfac = function CaseListComponent_Factory(t) { return new (t || CaseListComponent)(i0.ɵɵdirectiveInject(i1.BrowserService)); };
CaseListComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseListComponent, selectors: [["ccd-case-list"]], inputs: { classes: "classes", caption: "caption", firstCellIsHeader: "firstCellIsHeader", cases: "cases", tableConfig: "tableConfig", selectionEnabled: "selectionEnabled", selectedCases: "selectedCases", currentPageNo: "currentPageNo", totalResultsCount: "totalResultsCount", pageSize: "pageSize" }, outputs: { selection: "selection", pageChange: "pageChange" }, decls: 12, vars: 17, consts: [[1, "govuk-table__caption"], [1, "govuk-table__head"], [1, "govuk-table__row"], ["class", "govuk-table__header", "scope", "col", 4, "ngIf"], ["class", "govuk-table__header", "scope", "col", 4, "ngFor", "ngForOf"], [1, "govuk-table__body"], [4, "ngFor", "ngForOf"], [3, "pageChange", 4, "ngIf"], ["scope", "col", 1, "govuk-table__header"], [1, "govuk-checkboxes__item"], ["id", "select-all", "name", "select-all", "type", "checkbox", 1, "govuk-checkboxes__input", 3, "checked", "disabled", "change"], ["for", "select-all", 1, "govuk-label", "govuk-checkboxes__label"], ["data-selector", "table-row", 1, "govuk-table__row"], ["data-selector", "table-header", "class", "govuk-table__header", "scope", "row", 4, "ngIf"], ["data-selector", "table-header", "scope", "row", 1, "govuk-table__header"], ["type", "checkbox", 1, "govuk-checkboxes__input", 3, "id", "name", "checked", "disabled", "change", "keyup"], [1, "govuk-label", "govuk-checkboxes__label", 3, "for"], ["data-selector", "table-cell", "class", "govuk-table__cell", 3, "ngSwitch", 4, "ngIf"], [4, "ngIf"], [1, "govuk-link", 3, "routerLink"], ["data-selector", "table-cell", 1, "govuk-table__cell", 3, "ngSwitch"], [4, "ngSwitchCase"], [4, "ngSwitchDefault"], [3, "pageChange"]], template: function CaseListComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "table")(1, "caption", 0);
        i0.ɵɵtext(2);
        i0.ɵɵpipe(3, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(4, "thead", 1)(5, "tr", 2);
        i0.ɵɵtemplate(6, CaseListComponent_th_6_Template, 4, 2, "th", 3);
        i0.ɵɵtemplate(7, CaseListComponent_th_7_Template, 3, 3, "th", 4);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(8, "tbody", 5);
        i0.ɵɵtemplate(9, CaseListComponent_ng_container_9_Template, 4, 2, "ng-container", 6);
        i0.ɵɵpipe(10, "paginate");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(11, CaseListComponent_ccd_pagination_11_Template, 1, 0, "ccd-pagination", 7);
    } if (rf & 2) {
        i0.ɵɵclassMap("govuk-table " + ctx.classes);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 8, ctx.caption));
        i0.ɵɵadvance(4);
        i0.ɵɵproperty("ngIf", ctx.selectionEnabled);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.tableConfig.columnConfigs);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind2(10, 10, ctx.cases, i0.ɵɵpureFunction3(13, _c0, ctx.pageSize, ctx.currentPageNo, ctx.totalResultsCount)));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.totalResultsCount > ctx.pageSize);
    } }, dependencies: [i2.NgForOf, i2.NgIf, i2.NgSwitch, i2.NgSwitchCase, i2.NgSwitchDefault, i3.RouterLink, i4.PaginationComponent, i2.CurrencyPipe, i5.PaginatePipe, i6.RpxTranslatePipe] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseListComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-list', template: "<table class=\"{{'govuk-table ' + classes}}\">\n  <caption class=\"govuk-table__caption\">{{caption | rpxTranslate}}</caption>\n  <thead class=\"govuk-table__head\">\n    <tr class=\"govuk-table__row\">\n      <th class=\"govuk-table__header\" scope=\"col\" *ngIf=\"selectionEnabled\">\n        <div class=\"govuk-checkboxes__item\">\n          <input class=\"govuk-checkboxes__input\" id=\"select-all\" name=\"select-all\" type=\"checkbox\" (change)=\"selectAll()\"\n                 [checked]=\"allOnPageSelected()\" [disabled]=\"!canAnyBeShared()\" />\n          <!-- This label element is used to hide the standard checkbox with a govuk-styled one -->\n          <label class=\"govuk-label govuk-checkboxes__label\" for=\"select-all\">\n          </label>\n        </div>\n      </th>\n      <th class=\"govuk-table__header\" scope=\"col\" *ngFor=\"let h of tableConfig.columnConfigs\">{{h.header | rpxTranslate}}</th>\n    </tr>\n  </thead>\n  <tbody class=\"govuk-table__body\">\n    <ng-container *ngFor=\"let c of cases | paginate: { itemsPerPage: pageSize, currentPage: currentPageNo, totalItems: totalResultsCount }\">\n      <tr data-selector=\"table-row\" class=\"govuk-table__row\">\n        <th data-selector=\"table-header\" class=\"govuk-table__header\" scope=\"row\" *ngIf=\"selectionEnabled\">\n          <div class=\"govuk-checkboxes__item\">\n            <input class=\"govuk-checkboxes__input\" id=\"select-{{ c[tableConfig.idField] }}\" name=\"select-{{ c[tableConfig.idField] }}\"\n                  type=\"checkbox\" (change)=\"changeSelection(c)\" [checked]=\"isSelected(c)\" [disabled]=\"!canBeShared(c)\" (keyup)=\"onKeyUp($event, c)\" />\n            <!-- This label element is used to hide the standard checkbox with a govuk-styled one -->\n            <label class=\"govuk-label govuk-checkboxes__label\" for=\"select-{{ c[tableConfig.idField] }}\">\n            </label>\n          </div>\n        </th>\n        <ng-container *ngFor=\"let col of tableConfig.columnConfigs; first as isFirst\">\n          <th data-selector=\"table-header\" class=\"govuk-table__header\" scope=\"row\" *ngIf=\"isFirst && firstCellIsHeader\">\n            <ng-container *ngIf=\"!col.type || col.type === 'text'\">{{c[col.key] | rpxTranslate}}</ng-container>\n            <ng-container *ngIf=\"col.type === 'link' && c.routerLink\">\n              <a class=\"govuk-link\" [routerLink]=\"c.routerLink\">{{c[col.key] | rpxTranslate}}</a>\n            </ng-container>\n          </th>\n          <td data-selector=\"table-cell\" class=\"govuk-table__cell\" *ngIf=\"!(isFirst && firstCellIsHeader)\" [ngSwitch]=\"col?.type\">\n            <ng-container *ngIf=\"col.type === 'link' && c.routerLink\">\n              <a class=\"govuk-link\" [routerLink]=\"c.routerLink\">{{c[col.key] | rpxTranslate}}</a>\n            </ng-container>\n            <ng-container *ngSwitchCase=\"'money'\">-{{ c[col.key] | currency:'GBP' }}</ng-container>\n            <ng-container *ngSwitchCase=\"'date'\">{{formatDate(c[col.key])}}</ng-container>\n            <ng-container *ngSwitchCase=\"'dateAtTime'\">{{formatDateAtTime(c[col.key])}}</ng-container>\n            <ng-container *ngSwitchDefault>{{c[col.key] | rpxTranslate}}</ng-container>\n          </td>\n        </ng-container>\n      </tr>\n    </ng-container>\n  </tbody>\n</table>\n<ccd-pagination *ngIf=\"totalResultsCount > pageSize\"\n  (pageChange)=\"goToPage($event)\"\n></ccd-pagination>\n" }]
    }], function () { return [{ type: i1.BrowserService }]; }, { classes: [{
            type: Input
        }], caption: [{
            type: Input
        }], firstCellIsHeader: [{
            type: Input
        }], cases: [{
            type: Input
        }], tableConfig: [{
            type: Input
        }], selectionEnabled: [{
            type: Input
        }], selection: [{
            type: Output
        }], selectedCases: [{
            type: Input
        }], currentPageNo: [{
            type: Input
        }], totalResultsCount: [{
            type: Input
        }], pageSize: [{
            type: Input
        }], pageChange: [{
            type: Output
        }] }); })();
export class TableColumnConfig {
    constructor() {
        this.header = '';
        this.key = '';
        this.type = 'text';
    }
}
export class TableConfig {
    constructor() {
        this.idField = '';
        this.columnConfigs = [];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWxpc3QvY2FzZS1saXN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWxpc3QvY2FzZS1saXN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7Ozs7Ozs7OztJQ0VsRSw2QkFBcUUsYUFBQSxnQkFBQTtJQUV3Qiw4SkFBVSxlQUFBLGtCQUFXLENBQUEsSUFBQztJQUEvRyxpQkFDd0U7SUFFeEUsNEJBQ1E7SUFDVixpQkFBTSxFQUFBOzs7SUFKRyxlQUErQjtJQUEvQixvREFBK0Isc0NBQUE7OztJQU0xQyw2QkFBd0Y7SUFBQSxZQUEyQjs7SUFBQSxpQkFBSzs7O0lBQWhDLGVBQTJCO0lBQTNCLHVEQUEyQjs7OztJQU1qSCw4QkFBa0csYUFBQSxnQkFBQTtJQUd4RSwwTkFBVSxlQUFBLDZCQUFrQixDQUFBLElBQUMsaU5BQWlFLGVBQUEsNkJBQWtCLENBQUEsSUFBbkY7SUFEbkQsaUJBQzBJO0lBRTFJLDRCQUNRO0lBQ1YsaUJBQU0sRUFBQTs7OztJQUxtQyxlQUF3QztJQUF4QyxnRkFBd0MseURBQUE7SUFDM0IsaURBQXlCLHVDQUFBO0lBRTFCLGVBQXlDO0lBQXpDLGlGQUF5Qzs7O0lBTTVGLDZC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QUEwRztRQUExRyxnSkFBMEc7UUFnQ3pILGVBQWtDO1FBQWxDLDJEQUFrQzs7dUZEOUJ0QyxpQkFBaUI7Y0FMN0IsU0FBUzsyQkFDRSxlQUFlO2lFQU1ULE9BQU87a0JBQXRCLEtBQUs7WUFFVSxPQUFPO2tCQUF0QixLQUFLO1lBQ1UsaUJBQWlCO2tCQUFoQyxLQUFLO1lBRVUsS0FBSztrQkFBcEIsS0FBSztZQUVVLFdBQVc7a0JBQTFCLEtBQUs7WUFRVSxnQkFBZ0I7a0JBQS9CLEtBQUs7WUFFVyxTQUFTO2tCQUF6QixNQUFNO1lBRVMsYUFBYTtrQkFBNUIsS0FBSztZQUVVLGFBQWE7a0JBQTVCLEtBQUs7WUFFVSxpQkFBaUI7a0JBQWhDLEtBQUs7WUFFVSxRQUFRO2tCQUF2QixLQUFLO1lBRVcsVUFBVTtrQkFBMUIsTUFBTTs7QUE4RVQsTUFBTSxPQUFPLGlCQUFpQjtJQUk1QjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7SUFDckIsQ0FBQztDQUNGO0FBRUQsTUFBTSxPQUFPLFdBQVc7SUFNdEI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUMxQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmb3JtYXREYXRlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCcm93c2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2Jyb3dzZXIvYnJvd3Nlci5zZXJ2aWNlJztcblxuZXhwb3J0IGNsYXNzIERhdGVUaW1lRm9ybWF0VXRpbHMge1xuICBwdWJsaWMgc3RhdGljIGZvcm1hdERhdGVBdFRpbWUoZGF0ZTogRGF0ZSwgaXMyNEhvdXI6IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHtmb3JtYXREYXRlKGRhdGUsICdkZCBNTU0geXl5eScsICdlbi1HQicpfSBhdCAke0RhdGVUaW1lRm9ybWF0VXRpbHMuZm9ybWF0VGltZShkYXRlLCBpczI0SG91cil9YDtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgZm9ybWF0VGltZShkYXRlOiBEYXRlLCBpczI0SG91cjogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGlzMjRIb3VyID8gZm9ybWF0RGF0ZShkYXRlLCAnSEg6bW0nLCAnZW4tR0InKSA6IGZvcm1hdERhdGUoZGF0ZSwgJ2g6bW0gYScsICdlbi1HQicpLnRvTG93ZXJDYXNlKCk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWNhc2UtbGlzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXNlLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYXNlLWxpc3QuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYXNlTGlzdENvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgcHVibGljIGNsYXNzZXMgPSAnJztcblxuICBASW5wdXQoKSBwdWJsaWMgY2FwdGlvbjogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgZmlyc3RDZWxsSXNIZWFkZXIgPSBmYWxzZTtcblxuICBASW5wdXQoKSBwdWJsaWMgY2FzZXM6IG9iamVjdFtdO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyB0YWJsZUNvbmZpZzogVGFibGVDb25maWcgPSB7XG4gICAgaWRGaWVsZDogJ2lkJyxcbiAgICBjb2x1bW5Db25maWdzOiBbXG4gICAgICB7IGhlYWRlcjogJ0RhdGUnLCBrZXk6ICdkYXRlJywgdHlwZTogJ3RleHQnIH0sXG4gICAgICB7IGhlYWRlcjogJ0Ftb3VudCcsIGtleTogJ2Ftb3VudCcgfVxuICAgIF1cbiAgfTtcblxuICBASW5wdXQoKSBwdWJsaWMgc2VsZWN0aW9uRW5hYmxlZCA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBwdWJsaWMgc2VsZWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcblxuICBASW5wdXQoKSBwdWJsaWMgc2VsZWN0ZWRDYXNlczogYW55W10gPSBbXTtcblxuICBASW5wdXQoKSBwdWJsaWMgY3VycmVudFBhZ2VObzogbnVtYmVyO1xuXG4gIEBJbnB1dCgpIHB1YmxpYyB0b3RhbFJlc3VsdHNDb3VudD86IG51bWJlcjtcblxuICBASW5wdXQoKSBwdWJsaWMgcGFnZVNpemU/OiBudW1iZXI7XG5cbiAgQE91dHB1dCgpIHB1YmxpYyBwYWdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgYnJvd3NlclNlcnZpY2U6IEJyb3dzZXJTZXJ2aWNlKSB7IH1cblxuICBwdWJsaWMgZm9ybWF0RGF0ZShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZGF0ZSA/IGZvcm1hdERhdGUoZGF0ZSwgJ2RkIE1NTSB5eXl5JywgJ2VuLUdCJykgOiAnLSc7XG4gIH1cblxuICBwdWJsaWMgZm9ybWF0RGF0ZUF0VGltZShkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZGF0ZSA/IERhdGVUaW1lRm9ybWF0VXRpbHMuZm9ybWF0RGF0ZUF0VGltZShkYXRlLCBmYWxzZSkgOiAnLSc7XG4gIH1cblxuICBwdWJsaWMgY2FuQmVTaGFyZWQoYzogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgY2FuQW55QmVTaGFyZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2FzZXMuc29tZShjID0+IHRoaXMuY2FuQmVTaGFyZWQoYykpO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdEFsbCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hbGxPblBhZ2VTZWxlY3RlZCgpKSB7XG4gICAgICAvLyBBbGwgY2FzZXMgYWxyZWFkeSBzZWxlY3RlZCwgc28gdW5zZWxlY3QgYWxsIG9uIHRoaXMgcGFnZVxuICAgICAgdGhpcy5zZWxlY3RlZENhc2VzID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2FzZXMuZm9yRWFjaChhQ2FzZSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pc1NlbGVjdGVkKGFDYXNlKSAmJiB0aGlzLmNhbkJlU2hhcmVkKGFDYXNlKSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDYXNlcyA9IFsuLi4gdGhpcy5zZWxlY3RlZENhc2VzLCBhQ2FzZV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGlvbi5lbWl0KHRoaXMuc2VsZWN0ZWRDYXNlcyk7XG4gIH1cblxuICBwdWJsaWMgY2hhbmdlU2VsZWN0aW9uKGFDYXNlOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkKGFDYXNlKSkge1xuICAgICAgdGhpcy5zZWxlY3RlZENhc2VzLmZvckVhY2goKGFTZWxlY3RlZENhc2UsIGkpID0+IHtcbiAgICAgICAgaWYgKGFDYXNlLmNhc2VfaWQgPT09IGFTZWxlY3RlZENhc2UuY2FzZV9pZCkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDYXNlcyA9IHRoaXMuc2VsZWN0ZWRDYXNlcy5zbGljZSgwLCBpKS5jb25jYXQodGhpcy5zZWxlY3RlZENhc2VzLnNsaWNlKGkgKyAxKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5jYW5CZVNoYXJlZChhQ2FzZSkpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhc2VzID0gWy4uLnRoaXMuc2VsZWN0ZWRDYXNlcywgYUNhc2VdO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNlbGVjdGlvbi5lbWl0KHRoaXMuc2VsZWN0ZWRDYXNlcyk7XG4gIH1cblxuICBwdWJsaWMgaXNTZWxlY3RlZChhQ2FzZTogYW55KTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRDYXNlcykge1xuICAgICAgZm9yIChsZXQgaW5kZXggPSAwLCBsZW5ndGggPSB0aGlzLnNlbGVjdGVkQ2FzZXMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBpZiAoYUNhc2UuY2FzZV9pZCA9PT0gdGhpcy5zZWxlY3RlZENhc2VzW2luZGV4XS5jYXNlX2lkKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGFsbE9uUGFnZVNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5jYXNlcy5zb21lKGFDYXNlID0+ICF0aGlzLmlzU2VsZWN0ZWQoYUNhc2UpKTtcbiAgfVxuXG4gIHB1YmxpYyBvbktleVVwKCRldmVudDogS2V5Ym9hcmRFdmVudCwgYUNhc2U6IGFueSk6IHZvaWQge1xuICAgIGlmICgkZXZlbnQua2V5ID09PSAnU3BhY2UnKSB7XG4gICAgICBpZiAodGhpcy5icm93c2VyU2VydmljZS5pc0ZpcmVmb3ggfHwgdGhpcy5icm93c2VyU2VydmljZS5pc1NhZmFyaSB8fCB0aGlzLmJyb3dzZXJTZXJ2aWNlLmlzSUVPckVkZ2UpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VTZWxlY3Rpb24oYUNhc2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnb1RvUGFnZShwYWdlTnVtYmVyOiBudW1iZXIpIHtcbiAgICB0aGlzLmN1cnJlbnRQYWdlTm8gPSBwYWdlTnVtYmVyO1xuICAgIHRoaXMucGFnZUNoYW5nZS5lbWl0KHBhZ2VOdW1iZXIpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZUNvbHVtbkNvbmZpZyB7XG4gIHB1YmxpYyBoZWFkZXI6IHN0cmluZztcbiAgcHVibGljIGtleTogc3RyaW5nO1xuICBwdWJsaWMgdHlwZT86IHN0cmluZztcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5oZWFkZXIgPSAnJztcbiAgICB0aGlzLmtleSA9ICcnO1xuICAgIHRoaXMudHlwZSA9ICd0ZXh0JztcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFibGVDb25maWcge1xuICAvLyBTcGVjaWZpZXMgd2hpY2ggZmllbGQgb2YgYW4gaXRlbSB1bmlxdWVseSBpZGVudGlmaWVzIGl0IGFtb25nIG90aGVycyBvZiB0aGUgc2FtZSB0eXBlXG4gIHB1YmxpYyBpZEZpZWxkOiBzdHJpbmc7XG5cbiAgcHVibGljIGNvbHVtbkNvbmZpZ3M6IFRhYmxlQ29sdW1uQ29uZmlnW107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pZEZpZWxkID0gJyc7XG4gICAgdGhpcy5jb2x1bW5Db25maWdzID0gW107XG4gIH1cbn1cbiIsIjx0YWJsZSBjbGFzcz1cInt7J2dvdnVrLXRhYmxlICcgKyBjbGFzc2VzfX1cIj5cbiAgPGNhcHRpb24gY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2FwdGlvblwiPnt7Y2FwdGlvbiB8IHJweFRyYW5zbGF0ZX19PC9jYXB0aW9uPlxuICA8dGhlYWQgY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZFwiPlxuICAgIDx0ciBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgIDx0aCBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cImNvbFwiICpuZ0lmPVwic2VsZWN0aW9uRW5hYmxlZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ292dWstY2hlY2tib3hlc19faXRlbVwiPlxuICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImdvdnVrLWNoZWNrYm94ZXNfX2lucHV0XCIgaWQ9XCJzZWxlY3QtYWxsXCIgbmFtZT1cInNlbGVjdC1hbGxcIiB0eXBlPVwiY2hlY2tib3hcIiAoY2hhbmdlKT1cInNlbGVjdEFsbCgpXCJcbiAgICAgICAgICAgICAgICAgW2NoZWNrZWRdPVwiYWxsT25QYWdlU2VsZWN0ZWQoKVwiIFtkaXNhYmxlZF09XCIhY2FuQW55QmVTaGFyZWQoKVwiIC8+XG4gICAgICAgICAgPCEtLSBUaGlzIGxhYmVsIGVsZW1lbnQgaXMgdXNlZCB0byBoaWRlIHRoZSBzdGFuZGFyZCBjaGVja2JveCB3aXRoIGEgZ292dWstc3R5bGVkIG9uZSAtLT5cbiAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBnb3Z1ay1jaGVja2JveGVzX19sYWJlbFwiIGZvcj1cInNlbGVjdC1hbGxcIj5cbiAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvdGg+XG4gICAgICA8dGggY2xhc3M9XCJnb3Z1ay10YWJsZV9faGVhZGVyXCIgc2NvcGU9XCJjb2xcIiAqbmdGb3I9XCJsZXQgaCBvZiB0YWJsZUNvbmZpZy5jb2x1bW5Db25maWdzXCI+e3toLmhlYWRlciB8IHJweFRyYW5zbGF0ZX19PC90aD5cbiAgICA8L3RyPlxuICA8L3RoZWFkPlxuICA8dGJvZHkgY2xhc3M9XCJnb3Z1ay10YWJsZV9fYm9keVwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGMgb2YgY2FzZXMgfCBwYWdpbmF0ZTogeyBpdGVtc1BlclBhZ2U6IHBhZ2VTaXplLCBjdXJyZW50UGFnZTogY3VycmVudFBhZ2VObywgdG90YWxJdGVtczogdG90YWxSZXN1bHRzQ291bnQgfVwiPlxuICAgICAgPHRyIGRhdGEtc2VsZWN0b3I9XCJ0YWJsZS1yb3dcIiBjbGFzcz1cImdvdnVrLXRhYmxlX19yb3dcIj5cbiAgICAgICAgPHRoIGRhdGEtc2VsZWN0b3I9XCJ0YWJsZS1oZWFkZXJcIiBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cInJvd1wiICpuZ0lmPVwic2VsZWN0aW9uRW5hYmxlZFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1jaGVja2JveGVzX19pdGVtXCI+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJnb3Z1ay1jaGVja2JveGVzX19pbnB1dFwiIGlkPVwic2VsZWN0LXt7IGNbdGFibGVDb25maWcuaWRGaWVsZF0gfX1cIiBuYW1lPVwic2VsZWN0LXt7IGNbdGFibGVDb25maWcuaWRGaWVsZF0gfX1cIlxuICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCIgKGNoYW5nZSk9XCJjaGFuZ2VTZWxlY3Rpb24oYylcIiBbY2hlY2tlZF09XCJpc1NlbGVjdGVkKGMpXCIgW2Rpc2FibGVkXT1cIiFjYW5CZVNoYXJlZChjKVwiIChrZXl1cCk9XCJvbktleVVwKCRldmVudCwgYylcIiAvPlxuICAgICAgICAgICAgPCEtLSBUaGlzIGxhYmVsIGVsZW1lbnQgaXMgdXNlZCB0byBoaWRlIHRoZSBzdGFuZGFyZCBjaGVja2JveCB3aXRoIGEgZ292dWstc3R5bGVkIG9uZSAtLT5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsIGdvdnVrLWNoZWNrYm94ZXNfX2xhYmVsXCIgZm9yPVwic2VsZWN0LXt7IGNbdGFibGVDb25maWcuaWRGaWVsZF0gfX1cIj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvdGg+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNvbCBvZiB0YWJsZUNvbmZpZy5jb2x1bW5Db25maWdzOyBmaXJzdCBhcyBpc0ZpcnN0XCI+XG4gICAgICAgICAgPHRoIGRhdGEtc2VsZWN0b3I9XCJ0YWJsZS1oZWFkZXJcIiBjbGFzcz1cImdvdnVrLXRhYmxlX19oZWFkZXJcIiBzY29wZT1cInJvd1wiICpuZ0lmPVwiaXNGaXJzdCAmJiBmaXJzdENlbGxJc0hlYWRlclwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjb2wudHlwZSB8fCBjb2wudHlwZSA9PT0gJ3RleHQnXCI+e3tjW2NvbC5rZXldIHwgcnB4VHJhbnNsYXRlfX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2wudHlwZSA9PT0gJ2xpbmsnICYmIGMucm91dGVyTGlua1wiPlxuICAgICAgICAgICAgICA8YSBjbGFzcz1cImdvdnVrLWxpbmtcIiBbcm91dGVyTGlua109XCJjLnJvdXRlckxpbmtcIj57e2NbY29sLmtleV0gfCBycHhUcmFuc2xhdGV9fTwvYT5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgPHRkIGRhdGEtc2VsZWN0b3I9XCJ0YWJsZS1jZWxsXCIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2VsbFwiICpuZ0lmPVwiIShpc0ZpcnN0ICYmIGZpcnN0Q2VsbElzSGVhZGVyKVwiIFtuZ1N3aXRjaF09XCJjb2w/LnR5cGVcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2wudHlwZSA9PT0gJ2xpbmsnICYmIGMucm91dGVyTGlua1wiPlxuICAgICAgICAgICAgICA8YSBjbGFzcz1cImdvdnVrLWxpbmtcIiBbcm91dGVyTGlua109XCJjLnJvdXRlckxpbmtcIj57e2NbY29sLmtleV0gfCBycHhUcmFuc2xhdGV9fTwvYT5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ21vbmV5J1wiPi17eyBjW2NvbC5rZXldIHwgY3VycmVuY3k6J0dCUCcgfX08L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nU3dpdGNoQ2FzZT1cIidkYXRlJ1wiPnt7Zm9ybWF0RGF0ZShjW2NvbC5rZXldKX19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1N3aXRjaENhc2U9XCInZGF0ZUF0VGltZSdcIj57e2Zvcm1hdERhdGVBdFRpbWUoY1tjb2wua2V5XSl9fTwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hEZWZhdWx0Pnt7Y1tjb2wua2V5XSB8IHJweFRyYW5zbGF0ZX19PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L3RyPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L3Rib2R5PlxuPC90YWJsZT5cbjxjY2QtcGFnaW5hdGlvbiAqbmdJZj1cInRvdGFsUmVzdWx0c0NvdW50ID4gcGFnZVNpemVcIlxuICAocGFnZUNoYW5nZSk9XCJnb1RvUGFnZSgkZXZlbnQpXCJcbj48L2NjZC1wYWdpbmF0aW9uPlxuIl19