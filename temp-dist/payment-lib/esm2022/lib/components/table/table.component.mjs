import { Component, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { PaymentLibComponent } from '../../payment-lib.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { OrderslistService } from '../../services/orderslist.service';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute, Router } from '@angular/router';
import * as i0 from "@angular/core";
import * as i1 from "../../payment-lib.component";
import * as i2 from "../../services/orderslist.service";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
import * as i6 from "@angular/material/table";
import * as i7 from "@angular/material/paginator";
import * as i8 from "@angular/material/sort";
import * as i9 from "../../pipes/ccd-hyphens.pipe";
function TableComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div")(1, "div", 6)(2, "h2", 7);
    i0.ɵɵtext(3, " Error in processing the request ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 8);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", ctx_r0.errorMessage, " ");
} }
function TableComponent_div_2_option_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const name_r6 = ctx.$implicit;
    i0.ɵɵpropertyInterpolate("value", name_r6);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(name_r6);
} }
function TableComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 9)(1, "label", 10);
    i0.ɵɵtext(2, " Filter by caseworker: ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 11);
    i0.ɵɵlistener("change", function TableComponent_div_2_Template_select_change_3_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.selectchange($event)); });
    i0.ɵɵelementStart(4, "option", 12);
    i0.ɵɵtext(5, "All caseworkers");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, TableComponent_div_2_option_6_Template, 2, 2, "option", 13);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r1.userLst);
} }
function TableComponent_div_3_option_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "option", 14);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const name_r10 = ctx.$implicit;
    i0.ɵɵpropertyInterpolate("value", name_r10);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(name_r10);
} }
function TableComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15)(1, "label", 10);
    i0.ɵɵtext(2, " Filter by service: ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "select", 11);
    i0.ɵɵlistener("change", function TableComponent_div_3_Template_select_change_3_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.selectchange($event)); });
    i0.ɵɵelementStart(4, "option", 12);
    i0.ɵɵtext(5, "All services");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, TableComponent_div_3_option_6_Template, 2, 2, "option", 13);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngForOf", ctx_r2.serviceLst);
} }
function TableComponent_div_4_mat_header_cell_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-header-cell");
    i0.ɵɵtext(1, "Case reference ");
    i0.ɵɵelementEnd();
} }
function TableComponent_div_4_mat_cell_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-cell", 31);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ccdHyphens");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r27 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, row_r27.ccd_case_number), " ");
} }
function TableComponent_div_4_mat_header_cell_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-header-cell");
    i0.ɵɵtext(1, " Refund reference ");
    i0.ɵɵelementEnd();
} }
function TableComponent_div_4_mat_cell_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-cell", 31);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r28 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", row_r28.refund_reference, " ");
} }
function TableComponent_div_4_mat_header_cell_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-header-cell");
    i0.ɵɵtext(1, " Submitted by ");
    i0.ɵɵelementEnd();
} }
function TableComponent_div_4_mat_cell_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-cell", 31);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r29 = ctx.$implicit;
    i0.ɵɵstyleProp("color", row_r29.color);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", row_r29.user_full_name, " ");
} }
function TableComponent_div_4_mat_header_cell_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-header-cell", 32);
    i0.ɵɵtext(1, " Date created ");
    i0.ɵɵelementEnd();
} }
function TableComponent_div_4_mat_cell_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-cell", 31);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r30 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(2, 1, row_r30.date_created, "d MMMM yyyy"), " ");
} }
function TableComponent_div_4_mat_header_cell_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-header-cell", 32);
    i0.ɵɵtext(1, " Last updated");
    i0.ɵɵelementEnd();
} }
function TableComponent_div_4_mat_cell_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-cell", 31);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "date");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r31 = ctx.$implicit;
    i0.ɵɵstyleProp("color", row_r31.color);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(2, 3, row_r31.date_updated, "d MMMM yyyy"), " ");
} }
function TableComponent_div_4_ng_container_17_mat_header_cell_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-header-cell");
    i0.ɵɵtext(1, " Action ");
    i0.ɵɵelementEnd();
} }
function TableComponent_div_4_ng_container_17_mat_cell_2_Template(rf, ctx) { if (rf & 1) {
    const _r36 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-cell")(1, "a", 35);
    i0.ɵɵlistener("click", function TableComponent_div_4_ng_container_17_mat_cell_2_Template_a_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r36); const row_r34 = restoredCtx.$implicit; const ctx_r35 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r35.goToCaseReview(row_r34.ccd_case_number, row_r34)); });
    i0.ɵɵtext(2, "Review case");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(3, "\u00A0");
    i0.ɵɵelementStart(4, "a", 35);
    i0.ɵɵlistener("click", function TableComponent_div_4_ng_container_17_mat_cell_2_Template_a_click_4_listener() { const restoredCtx = i0.ɵɵrestoreView(_r36); const row_r34 = restoredCtx.$implicit; const ctx_r37 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r37.goToRefundProcessComponent(row_r34.refund_reference, row_r34)); });
    i0.ɵɵtext(5, "Process refund");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r34 = ctx.$implicit;
    i0.ɵɵstyleProp("color", row_r34.color);
} }
function TableComponent_div_4_ng_container_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0, 33);
    i0.ɵɵtemplate(1, TableComponent_div_4_ng_container_17_mat_header_cell_1_Template, 2, 0, "mat-header-cell", 19);
    i0.ɵɵtemplate(2, TableComponent_div_4_ng_container_17_mat_cell_2_Template, 6, 2, "mat-cell", 34);
    i0.ɵɵelementContainerEnd();
} }
function TableComponent_div_4_ng_container_18_mat_header_cell_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-header-cell");
    i0.ɵɵtext(1, " Action ");
    i0.ɵɵelementEnd();
} }
function TableComponent_div_4_ng_container_18_mat_cell_2_Template(rf, ctx) { if (rf & 1) {
    const _r42 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-cell")(1, "a", 35);
    i0.ɵɵlistener("click", function TableComponent_div_4_ng_container_18_mat_cell_2_Template_a_click_1_listener() { const restoredCtx = i0.ɵɵrestoreView(_r42); const row_r40 = restoredCtx.$implicit; const ctx_r41 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r41.goToRefundViewComponent(row_r40.refund_reference, row_r40)); });
    i0.ɵɵtext(2, "Review refund");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const row_r40 = ctx.$implicit;
    i0.ɵɵstyleProp("color", row_r40.color);
} }
function TableComponent_div_4_ng_container_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0, 33);
    i0.ɵɵtemplate(1, TableComponent_div_4_ng_container_18_mat_header_cell_1_Template, 2, 0, "mat-header-cell", 19);
    i0.ɵɵtemplate(2, TableComponent_div_4_ng_container_18_mat_cell_2_Template, 3, 2, "mat-cell", 34);
    i0.ɵɵelementContainerEnd();
} }
function TableComponent_div_4_mat_header_row_19_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-header-row");
} }
function TableComponent_div_4_mat_row_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-row");
} }
const _c0 = function () { return [5, 10, 25, 100]; };
function TableComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16)(1, "mat-table", 17);
    i0.ɵɵelementContainerStart(2, 18);
    i0.ɵɵtemplate(3, TableComponent_div_4_mat_header_cell_3_Template, 2, 0, "mat-header-cell", 19);
    i0.ɵɵtemplate(4, TableComponent_div_4_mat_cell_4_Template, 3, 3, "mat-cell", 20);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementContainerStart(5, 21);
    i0.ɵɵtemplate(6, TableComponent_div_4_mat_header_cell_6_Template, 2, 0, "mat-header-cell", 19);
    i0.ɵɵtemplate(7, TableComponent_div_4_mat_cell_7_Template, 2, 1, "mat-cell", 20);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementContainerStart(8, 22);
    i0.ɵɵtemplate(9, TableComponent_div_4_mat_header_cell_9_Template, 2, 0, "mat-header-cell", 19);
    i0.ɵɵtemplate(10, TableComponent_div_4_mat_cell_10_Template, 2, 3, "mat-cell", 23);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementContainerStart(11, 24);
    i0.ɵɵtemplate(12, TableComponent_div_4_mat_header_cell_12_Template, 2, 0, "mat-header-cell", 25);
    i0.ɵɵtemplate(13, TableComponent_div_4_mat_cell_13_Template, 3, 4, "mat-cell", 20);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementContainerStart(14, 26);
    i0.ɵɵtemplate(15, TableComponent_div_4_mat_header_cell_15_Template, 2, 0, "mat-header-cell", 25);
    i0.ɵɵtemplate(16, TableComponent_div_4_mat_cell_16_Template, 3, 6, "mat-cell", 23);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵtemplate(17, TableComponent_div_4_ng_container_17_Template, 3, 0, "ng-container", 27);
    i0.ɵɵtemplate(18, TableComponent_div_4_ng_container_18_Template, 3, 0, "ng-container", 27);
    i0.ɵɵtemplate(19, TableComponent_div_4_mat_header_row_19_Template, 1, 0, "mat-header-row", 28);
    i0.ɵɵtemplate(20, TableComponent_div_4_mat_row_20_Template, 1, 0, "mat-row", 29);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(21, "mat-paginator", 30);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("dataSource", ctx_r3.dataSource);
    i0.ɵɵadvance(16);
    i0.ɵɵproperty("ngIf", ctx_r3.isApprovalFlow);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r3.isApprovalFlow);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("matHeaderRowDef", ctx_r3.displayedColumns);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("matRowDefColumns", ctx_r3.displayedColumns);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("pageSizeOptions", i0.ɵɵpureFunction0(6, _c0));
} }
function TableComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 36);
    i0.ɵɵtext(1, "No records to display");
    i0.ɵɵelementEnd();
} }
export class TableComponent {
    paymentLibComponent;
    cdRef;
    OrderslistService;
    router;
    activeRoute;
    DATASOURCE;
    STATUS;
    errorMessage;
    isApprovalFlow;
    // displayedColumns = ['ccdCaseNumber', 'refundReference', 'reason', 'createBy', 'updateDate', 'Action'];
    displayedColumns = ['ccd_case_number', 'refund_reference', 'user_full_name', 'date_created', 'date_updated', 'Action'];
    dataSource;
    userLst;
    serviceLst;
    actualcount;
    count;
    refundList;
    paginator;
    sort;
    constructor(paymentLibComponent, cdRef, OrderslistService, router, activeRoute) {
        this.paymentLibComponent = paymentLibComponent;
        this.cdRef = cdRef;
        this.OrderslistService = OrderslistService;
        this.router = router;
        this.activeRoute = activeRoute;
    }
    ngOnInit() {
        this.errorMessage = this.errorMessage;
        if (this.STATUS.toLowerCase() === 'sent for approval') {
            this.isApprovalFlow = true;
        }
        else {
            this.isApprovalFlow = false;
        }
        this.refundList = this.DATASOURCE;
        this.dataSource = new MatTableDataSource(this.refundList);
        this.actualcount = this.dataSource.data.length;
        if (this.refundList !== undefined) {
            this.userLst = this.refundList.reduce((r, { user_full_name }) => (r[user_full_name] = '', r), {});
            this.userLst = Object.keys(this.userLst);
            this.userLst.sort((a, b) => a.toString().localeCompare(b));
            this.serviceLst = this.refundList.reduce((r, { service_type }) => (r[service_type] = '', r), {});
            this.serviceLst = Object.keys(this.serviceLst);
            this.serviceLst.sort((a, b) => a.toString().localeCompare(b));
        }
    }
    /**
     * Set the paginator and sort after the view init since this component will
     * be able to query its view for the initialized paginator and sort.
     */
    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
        //const sortState: Sort = {active: 'date_updated', direction: 'desc'};
        // this.sort.active = sortState.active;
        // this.sort.direction = sortState.direction;
        // this.sort.sortChange.emit(sortState);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdRef.detectChanges();
    }
    applyFilter(filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
    selectchange(args) {
        this.dataSource.filter = args.target.value;
        this.actualcount = this.dataSource.data.length;
        this.dataSource.paginator = this.paginator;
    }
    goToRefundProcessComponent(refundReference, refundData) {
        this.paymentLibComponent.refundlistsource = refundData;
        this.paymentLibComponent.refundReference = refundReference;
        this.paymentLibComponent.viewName = 'process-refund';
    }
    goToRefundViewComponent(refundReference, refundData) {
        this.OrderslistService.setRefundView(refundData);
        this.paymentLibComponent.viewName = 'refundstatuslist';
        this.paymentLibComponent.CCD_CASE_NUMBER = refundData.ccd_case_number;
        this.paymentLibComponent.isRefundStatusView = true;
        this.paymentLibComponent.isCallFromRefundList = true;
    }
    goToCaseReview(ccdCaseNumber, refundData) {
        this.router.navigate([`/cases/case-details/${ccdCaseNumber}`], { relativeTo: this.activeRoute });
    }
    static ɵfac = function TableComponent_Factory(t) { return new (t || TableComponent)(i0.ɵɵdirectiveInject(i1.PaymentLibComponent), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i2.OrderslistService), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i3.ActivatedRoute)); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TableComponent, selectors: [["ccpay-table"]], viewQuery: function TableComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(MatPaginator, 5);
            i0.ɵɵviewQuery(MatSort, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.paginator = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.sort = _t.first);
        } }, inputs: { DATASOURCE: "DATASOURCE", STATUS: "STATUS", errorMessage: "errorMessage" }, decls: 6, vars: 5, consts: [[1, "add-remission"], [4, "ngIf"], ["class", "govuk-form-group float-right", 4, "ngIf"], ["class", "govuk-form-group float-right-padding", 4, "ngIf"], ["class", "example-container", 4, "ngIf"], ["class", "govuk-label dropdpwn", 4, "ngIf"], ["role", "group", "aria-labelledby", "failure-error-summary-heading", "tabindex", "-1", 1, "error-summary"], ["id", "failure-error-summary-heading", 1, "heading-medium", "error-summary-heading"], [1, "govuk-error-summary__body"], [1, "govuk-form-group", "float-right"], ["for", "sort", 1, "govuk-label", "dropdpwn"], ["id", "sort", "name", "sort", 1, "govuk-select", 3, "change"], ["value", "", "selected", "selected"], [3, "value", 4, "ngFor", "ngForOf"], [3, "value"], [1, "govuk-form-group", "float-right-padding"], [1, "example-container"], ["matSort", "", 3, "dataSource"], ["matColumnDef", "ccd_case_number"], [4, "matHeaderCellDef"], ["class", "whitespace-inherit", 4, "matCellDef"], ["matColumnDef", "refund_reference"], ["matColumnDef", "user_full_name"], ["class", "whitespace-inherit", 3, "color", 4, "matCellDef"], ["matColumnDef", "date_created"], ["mat-sort-header", "", 4, "matHeaderCellDef"], ["matColumnDef", "date_updated"], ["matColumnDef", "Action", 4, "ngIf"], [4, "matHeaderRowDef"], [4, "matRowDef", "matRowDefColumns"], [3, "pageSizeOptions"], [1, "whitespace-inherit"], ["mat-sort-header", ""], ["matColumnDef", "Action"], [3, "color", 4, "matCellDef"], ["href", "javascript:void(0)", 3, "click"], [1, "govuk-label", "dropdpwn"]], template: function TableComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, TableComponent_div_1_Template, 6, 1, "div", 1);
            i0.ɵɵtemplate(2, TableComponent_div_2_Template, 7, 1, "div", 2);
            i0.ɵɵtemplate(3, TableComponent_div_3_Template, 7, 1, "div", 3);
            i0.ɵɵtemplate(4, TableComponent_div_4_Template, 22, 7, "div", 4);
            i0.ɵɵtemplate(5, TableComponent_div_5_Template, 2, 0, "div", 5);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.errorMessage);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.dataSource.data.length > 0);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.dataSource.data.length > 0);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.dataSource.data.length > 0);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.dataSource.data.length === 0);
        } }, dependencies: [i4.NgForOf, i4.NgIf, i5.NgSelectOption, i5.ɵNgSelectMultipleOption, i6.MatTable, i6.MatHeaderCellDef, i6.MatHeaderRowDef, i6.MatColumnDef, i6.MatCellDef, i6.MatRowDef, i6.MatHeaderCell, i6.MatCell, i6.MatHeaderRow, i6.MatRow, i7.MatPaginator, i8.MatSort, i8.MatSortHeader, i4.DatePipe, i9.CcdHyphensPipe], styles: [".mat-header-row[_ngcontent-%COMP%]{min-height:27px}.mat-cell[_ngcontent-%COMP%]{padding:0 10px 0 0;text-align:left;word-wrap:break-word;white-space:inherit!important;font-size:19px;line-height:25px;font-family:nta,Arial,sans-serif;font-weight:400}.mat-table[_ngcontent-%COMP%]{color:#0b0c0c;display:table;font-family:nta,Arial,sans-serif;-webkit-font-smoothing:antialiased;margin-bottom:1px;box-sizing:border-box;text-indent:initial;border-spacing:0;border-collapse:collapse;font-size:1.1875rem;line-height:1.31578947;table-layout:fixed;width:102%}.mat-header-cell[_ngcontent-%COMP%]{text-align:left;font-weight:700;padding:10px 10px 10px 0;word-wrap:break-word;font-size:19px;line-height:25px;color:#0b0c0c;cursor:pointer;font-family:inherit}.dropdpwn[_ngcontent-%COMP%]{display:inline-block;margin-right:10px;font-size:19px}.mat-column-ccdCaseNumber[_ngcontent-%COMP%]{flex:3em}.mat-column-refundReference[_ngcontent-%COMP%]{flex:6em}.mat-column-reason[_ngcontent-%COMP%]{flex:2em}.govuk-select[_ngcontent-%COMP%]{font-size:19px;font-weight:400}.govuk-error-summary__title[_ngcontent-%COMP%]{font-size:24px!important}.float-right[_ngcontent-%COMP%]{float:right}.float-right-padding[_ngcontent-%COMP%]{float:right;padding-right:2em}.float-left-padding[_ngcontent-%COMP%]{padding-left:12em}"] });
}
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TableComponent, [{
        type: Component,
        args: [{ selector: 'ccpay-table', template: "<div class=\"add-remission\">\n  <div *ngIf=\"errorMessage\">\n    <div class=\"error-summary\" role=\"group\" aria-labelledby=\"failure-error-summary-heading\" tabindex=\"-1\">\n      <h2 class=\"heading-medium error-summary-heading\" id=\"failure-error-summary-heading\">\n        Error in processing the request\n      </h2>\n      <div class=\"govuk-error-summary__body\">\n        {{ errorMessage }}\n      </div>\n    </div>\n  </div>\n\n  \n\n<div *ngIf=\"dataSource.data.length > 0\"  class=\"govuk-form-group float-right\">\n    <label class=\"govuk-label dropdpwn\" for=\"sort\" >\n      Filter by caseworker:\n    </label>\n    <select class=\"govuk-select\" id=\"sort\" name=\"sort\" (change)=\"selectchange($event)\">\n      <option value=\"\" selected='selected'>All caseworkers</option>\n      <option  *ngFor=\"let name of userLst;\" value=\"{{name}}\">{{name}}</option>\n    </select>\n</div>\n\n  <div *ngIf=\"dataSource.data.length > 0\"  class=\"govuk-form-group float-right-padding\">\n    <label class=\"govuk-label dropdpwn\" for=\"sort\" >\n      Filter by service:\n    </label>\n    <select class=\"govuk-select\" id=\"sort\" name=\"sort\" (change)=\"selectchange($event)\">\n      <option value=\"\" selected='selected'>All services</option>\n      <option  *ngFor=\"let name of serviceLst;\" value=\"{{name}}\">{{name}}</option>\n    </select>\n  </div>\n \n<div *ngIf=\"dataSource.data.length > 0\" class=\"example-container\">\n\n  <mat-table [dataSource]=\"dataSource\" matSort>\n\n    <ng-container matColumnDef=\"ccd_case_number\">\n      <mat-header-cell  *matHeaderCellDef >Case reference </mat-header-cell>\n      <mat-cell  *matCellDef=\"let row\" class=\"whitespace-inherit\"> {{row.ccd_case_number | ccdHyphens }} </mat-cell>\n    </ng-container>\n\n    <ng-container matColumnDef=\"refund_reference\">\n      <mat-header-cell  *matHeaderCellDef > Refund reference </mat-header-cell>\n      <mat-cell  *matCellDef=\"let row\" class=\"whitespace-inherit\"> {{row.refund_reference}} </mat-cell>\n    </ng-container>\n\n    <ng-container matColumnDef=\"user_full_name\">\n      <mat-header-cell *matHeaderCellDef > Submitted by </mat-header-cell>\n      <mat-cell *matCellDef=\"let row\" [style.color]=\"row.color\" class=\"whitespace-inherit\"> {{row.user_full_name }} </mat-cell>\n    </ng-container>\n\n    <ng-container matColumnDef=\"date_created\">\n      <mat-header-cell *matHeaderCellDef mat-sort-header> Date created </mat-header-cell>\n      <mat-cell *matCellDef=\"let row\" class=\"whitespace-inherit\"> {{row.date_created | date:'d MMMM yyyy'}} </mat-cell>\n    </ng-container>\n\n    <ng-container matColumnDef=\"date_updated\">\n        <mat-header-cell *matHeaderCellDef mat-sort-header> Last updated</mat-header-cell>\n        <mat-cell *matCellDef=\"let row\" [style.color]=\"row.color\" class=\"whitespace-inherit\"> {{row.date_updated | date:'d MMMM yyyy'}} </mat-cell>\n      </ng-container>\n\n      <ng-container *ngIf=\"isApprovalFlow\" matColumnDef=\"Action\">\n          <mat-header-cell *matHeaderCellDef> Action </mat-header-cell>\n          <mat-cell *matCellDef=\"let row\" [style.color]=\"row.color\" > <a href=\"javascript:void(0)\" (click)=\"goToCaseReview(row.ccd_case_number, row)\">Review case</a>&nbsp;<a href=\"javascript:void(0)\" (click)=\"goToRefundProcessComponent(row.refund_reference, row)\">Process refund</a></mat-cell>\n        </ng-container>\n      \n        <ng-container *ngIf=\"!isApprovalFlow\" matColumnDef=\"Action\">\n          <mat-header-cell *matHeaderCellDef > Action </mat-header-cell>\n          <mat-cell *matCellDef=\"let row\" [style.color]=\"row.color\"> <a href=\"javascript:void(0)\" (click)=\"goToRefundViewComponent(row.refund_reference, row)\">Review refund</a></mat-cell>\n        </ng-container>\n\n    <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n    <mat-row *matRowDef=\"let row; columns: displayedColumns;\">\n    </mat-row>\n  </mat-table>\n  <mat-paginator [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>\n</div>\n\n<div class=\"govuk-label dropdpwn\" *ngIf=\"dataSource.data.length === 0\">No records to display</div>\n", styles: [".mat-header-row{min-height:27px}.mat-cell{padding:0 10px 0 0;text-align:left;word-wrap:break-word;white-space:inherit!important;font-size:19px;line-height:25px;font-family:nta,Arial,sans-serif;font-weight:400}.mat-table{color:#0b0c0c;display:table;font-family:nta,Arial,sans-serif;-webkit-font-smoothing:antialiased;margin-bottom:1px;box-sizing:border-box;text-indent:initial;border-spacing:0;border-collapse:collapse;font-size:1.1875rem;line-height:1.31578947;table-layout:fixed;width:102%}.mat-header-cell{text-align:left;font-weight:700;padding:10px 10px 10px 0;word-wrap:break-word;font-size:19px;line-height:25px;color:#0b0c0c;cursor:pointer;font-family:inherit}.dropdpwn{display:inline-block;margin-right:10px;font-size:19px}.mat-column-ccdCaseNumber{flex:3em}.mat-column-refundReference{flex:6em}.mat-column-reason{flex:2em}.govuk-select{font-size:19px;font-weight:400}.govuk-error-summary__title{font-size:24px!important}.float-right{float:right}.float-right-padding{float:right;padding-right:2em}.float-left-padding{padding-left:12em}\n"] }]
    }], function () { return [{ type: i1.PaymentLibComponent }, { type: i0.ChangeDetectorRef }, { type: i2.OrderslistService }, { type: i3.Router }, { type: i3.ActivatedRoute }]; }, { DATASOURCE: [{
            type: Input,
            args: ['DATASOURCE']
        }], STATUS: [{
            type: Input,
            args: ['STATUS']
        }], errorMessage: [{
            type: Input,
            args: ['errorMessage']
        }], paginator: [{
            type: ViewChild,
            args: [MatPaginator]
        }], sort: [{
            type: ViewChild,
            args: [MatSort]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcGF5bWVudC1saWIvc3JjL2xpYi9jb21wb25lbnRzL3RhYmxlL3RhYmxlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3BheW1lbnQtbGliL3NyYy9saWIvY29tcG9uZW50cy90YWJsZS90YWJsZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0UsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRWhELE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUUxRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN0RSx1RUFBdUU7QUFDdkUsT0FBTyxFQUFFLGNBQWMsRUFBQyxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Ozs7Ozs7O0lDUnRELDJCQUEwQixhQUFBLFlBQUE7SUFHcEIsaURBQ0Y7SUFBQSxpQkFBSztJQUNMLDhCQUF1QztJQUNyQyxZQUNGO0lBQUEsaUJBQU0sRUFBQSxFQUFBOzs7SUFESixlQUNGO0lBREUsb0RBQ0Y7OztJQVlBLGtDQUF3RDtJQUFBLFlBQVE7SUFBQSxpQkFBUzs7O0lBQWxDLDBDQUFnQjtJQUFDLGVBQVE7SUFBUiw2QkFBUTs7OztJQU50RSw4QkFBOEUsZ0JBQUE7SUFFeEUsdUNBQ0Y7SUFBQSxpQkFBUTtJQUNSLGtDQUFtRjtJQUFoQyxtS0FBVSxlQUFBLDJCQUFvQixD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QUMsY0FBYztZQVdJLFNBQVM7a0JBQWpDLFNBQVM7bUJBQUMsWUFBWTtZQUNILElBQUk7a0JBQXZCLFNBQVM7bUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBWaWV3Q2hpbGQsIElucHV0LCBDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1BheW1lbnRMaWJDb21wb25lbnR9IGZyb20gJy4uLy4uL3BheW1lbnQtbGliLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXRUYWJsZURhdGFTb3VyY2V9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcbmltcG9ydCB7TWF0U29ydCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NvcnQnO1xuaW1wb3J0IHtTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5pbXBvcnQge01hdFBhZ2luYXRvciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBJUmVmdW5kTGlzdCB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvSVJlZnVuZExpc3QnO1xuaW1wb3J0IHsgT3JkZXJzbGlzdFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9vcmRlcnNsaXN0LnNlcnZpY2UnO1xuLy8gaW1wb3J0IHsgVEhJU19FWFBSIH0gZnJvbSAnQGFuZ3VsYXIvY29tcGlsZXIvc3JjL291dHB1dC9vdXRwdXRfYXN0JztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY3BheS10YWJsZScsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RhYmxlLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZUNvbXBvbmVudCB7XG4gIEBJbnB1dCgnREFUQVNPVVJDRScpIERBVEFTT1VSQ0U6IGFueVtdO1xuICBASW5wdXQoJ1NUQVRVUycpIFNUQVRVUzogc3RyaW5nO1xuICBASW5wdXQoJ2Vycm9yTWVzc2FnZScpIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuICBpc0FwcHJvdmFsRmxvdzogYm9vbGVhbjtcbiAgLy8gZGlzcGxheWVkQ29sdW1ucyA9IFsnY2NkQ2FzZU51bWJlcicsICdyZWZ1bmRSZWZlcmVuY2UnLCAncmVhc29uJywgJ2NyZWF0ZUJ5JywgJ3VwZGF0ZURhdGUnLCAnQWN0aW9uJ107XG4gIGRpc3BsYXllZENvbHVtbnMgPSBbJ2NjZF9jYXNlX251bWJlcicsICdyZWZ1bmRfcmVmZXJlbmNlJywgJ3VzZXJfZnVsbF9uYW1lJywnZGF0ZV9jcmVhdGVkJywgJ2RhdGVfdXBkYXRlZCcsICdBY3Rpb24nXTtcblxuICBkYXRhU291cmNlOiBNYXRUYWJsZURhdGFTb3VyY2U8YW55PjtcbiAgdXNlckxzdDtcbiAgc2VydmljZUxzdDtcbiAgYWN0dWFsY291bnQ6IG51bWJlcjtcbiAgY291bnQ6IG51bWJlcjtcbiAgcmVmdW5kTGlzdDogSVJlZnVuZExpc3RbXTtcbiAgQFZpZXdDaGlsZChNYXRQYWdpbmF0b3IpIHBhZ2luYXRvcjogTWF0UGFnaW5hdG9yO1xuICBAVmlld0NoaWxkKE1hdFNvcnQpIHNvcnQ6IE1hdFNvcnQ7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcGF5bWVudExpYkNvbXBvbmVudDogUGF5bWVudExpYkNvbXBvbmVudCxcbiAgICBwcml2YXRlIGNkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIE9yZGVyc2xpc3RTZXJ2aWNlOiBPcmRlcnNsaXN0U2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgYWN0aXZlUm91dGU6IEFjdGl2YXRlZFJvdXRlXG4gICkge31cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5lcnJvck1lc3NhZ2UgPSB0aGlzLmVycm9yTWVzc2FnZTtcbiAgICBpZih0aGlzLlNUQVRVUy50b0xvd2VyQ2FzZSgpID09PSAnc2VudCBmb3IgYXBwcm92YWwnKSB7XG4gICAgICB0aGlzLmlzQXBwcm92YWxGbG93ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgIHRoaXMuaXNBcHByb3ZhbEZsb3cgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5yZWZ1bmRMaXN0ID0gdGhpcy5EQVRBU09VUkNFO1xuICAgIHRoaXMuZGF0YVNvdXJjZSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2UodGhpcy5yZWZ1bmRMaXN0KTtcbiAgICB0aGlzLmFjdHVhbGNvdW50ID0gdGhpcy5kYXRhU291cmNlLmRhdGEubGVuZ3RoO1xuICAgIGlmKCB0aGlzLnJlZnVuZExpc3QgIT09IHVuZGVmaW5lZCkge1xuICAgICB0aGlzLnVzZXJMc3QgPSB0aGlzLnJlZnVuZExpc3QucmVkdWNlKChyLHt1c2VyX2Z1bGxfbmFtZX0pID0+IChyW3VzZXJfZnVsbF9uYW1lXT0nJywgcikgLCB7fSk7XG4gICAgIHRoaXMudXNlckxzdCA9IE9iamVjdC5rZXlzKHRoaXMudXNlckxzdCk7XG4gICAgIHRoaXMudXNlckxzdC5zb3J0KChhLCBiKSA9PiBhLnRvU3RyaW5nKCkubG9jYWxlQ29tcGFyZShiKSk7XG4gICAgIHRoaXMuc2VydmljZUxzdCA9IHRoaXMucmVmdW5kTGlzdC5yZWR1Y2UoKHIse3NlcnZpY2VfdHlwZX0pID0+IChyW3NlcnZpY2VfdHlwZV09JycsIHIpICwge30pO1xuICAgICB0aGlzLnNlcnZpY2VMc3QgPSBPYmplY3Qua2V5cyh0aGlzLnNlcnZpY2VMc3QpO1xuICAgICB0aGlzLnNlcnZpY2VMc3Quc29ydCgoYSwgYikgPT4gYS50b1N0cmluZygpLmxvY2FsZUNvbXBhcmUoYikpO1xuICAgIH1cblxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgcGFnaW5hdG9yIGFuZCBzb3J0IGFmdGVyIHRoZSB2aWV3IGluaXQgc2luY2UgdGhpcyBjb21wb25lbnQgd2lsbFxuICAgKiBiZSBhYmxlIHRvIHF1ZXJ5IGl0cyB2aWV3IGZvciB0aGUgaW5pdGlhbGl6ZWQgcGFnaW5hdG9yIGFuZCBzb3J0LlxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuXG4gICAgdGhpcy5kYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG5cbiAgICAvL2NvbnN0IHNvcnRTdGF0ZTogU29ydCA9IHthY3RpdmU6ICdkYXRlX3VwZGF0ZWQnLCBkaXJlY3Rpb246ICdkZXNjJ307XG4gICAgLy8gdGhpcy5zb3J0LmFjdGl2ZSA9IHNvcnRTdGF0ZS5hY3RpdmU7XG4gICAgLy8gdGhpcy5zb3J0LmRpcmVjdGlvbiA9IHNvcnRTdGF0ZS5kaXJlY3Rpb247XG4gICAgLy8gdGhpcy5zb3J0LnNvcnRDaGFuZ2UuZW1pdChzb3J0U3RhdGUpO1xuICAgIHRoaXMuZGF0YVNvdXJjZS5wYWdpbmF0b3IgPSB0aGlzLnBhZ2luYXRvcjtcbiAgICB0aGlzLmRhdGFTb3VyY2Uuc29ydCA9IHRoaXMuc29ydDtcbiAgICB0aGlzLmNkUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuICBhcHBseUZpbHRlcihmaWx0ZXJWYWx1ZTogc3RyaW5nKSB7XG4gICAgZmlsdGVyVmFsdWUgPSBmaWx0ZXJWYWx1ZS50cmltKCk7IC8vIFJlbW92ZSB3aGl0ZXNwYWNlXG4gICAgZmlsdGVyVmFsdWUgPSBmaWx0ZXJWYWx1ZS50b0xvd2VyQ2FzZSgpOyAvLyBEYXRhc291cmNlIGRlZmF1bHRzIHRvIGxvd2VyY2FzZSBtYXRjaGVzXG4gICAgdGhpcy5kYXRhU291cmNlLmZpbHRlciA9IGZpbHRlclZhbHVlO1xuICB9XG4gIHNlbGVjdGNoYW5nZShhcmdzKXtcbiAgICB0aGlzLmRhdGFTb3VyY2UuZmlsdGVyID0gYXJncy50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5hY3R1YWxjb3VudCA9IHRoaXMuZGF0YVNvdXJjZS5kYXRhLmxlbmd0aDtcbiAgICB0aGlzLmRhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gIH1cbiAgZ29Ub1JlZnVuZFByb2Nlc3NDb21wb25lbnQocmVmdW5kUmVmZXJlbmNlOiBzdHJpbmcsIHJlZnVuZERhdGE6IElSZWZ1bmRMaXN0ICkge1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5yZWZ1bmRsaXN0c291cmNlID0gcmVmdW5kRGF0YTtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQucmVmdW5kUmVmZXJlbmNlID0gcmVmdW5kUmVmZXJlbmNlO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC52aWV3TmFtZSA9ICdwcm9jZXNzLXJlZnVuZCc7XG4gIH1cbiAgZ29Ub1JlZnVuZFZpZXdDb21wb25lbnQocmVmdW5kUmVmZXJlbmNlOiBzdHJpbmcsIHJlZnVuZERhdGE6IElSZWZ1bmRMaXN0ICkge1xuICAgIHRoaXMuT3JkZXJzbGlzdFNlcnZpY2Uuc2V0UmVmdW5kVmlldyhyZWZ1bmREYXRhKTtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQudmlld05hbWU9J3JlZnVuZHN0YXR1c2xpc3QnO1xuICAgIHRoaXMucGF5bWVudExpYkNvbXBvbmVudC5DQ0RfQ0FTRV9OVU1CRVIgPSByZWZ1bmREYXRhLmNjZF9jYXNlX251bWJlcjtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNSZWZ1bmRTdGF0dXNWaWV3ID0gdHJ1ZTtcbiAgICB0aGlzLnBheW1lbnRMaWJDb21wb25lbnQuaXNDYWxsRnJvbVJlZnVuZExpc3QgPSB0cnVlO1xuICB9XG4gIGdvVG9DYXNlUmV2aWV3KGNjZENhc2VOdW1iZXI6IHN0cmluZywgcmVmdW5kRGF0YTogSVJlZnVuZExpc3QgKSB7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW2AvY2FzZXMvY2FzZS1kZXRhaWxzLyR7Y2NkQ2FzZU51bWJlcn1gXSwge3JlbGF0aXZlVG86IHRoaXMuYWN0aXZlUm91dGV9KTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImFkZC1yZW1pc3Npb25cIj5cbiAgPGRpdiAqbmdJZj1cImVycm9yTWVzc2FnZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJlcnJvci1zdW1tYXJ5XCIgcm9sZT1cImdyb3VwXCIgYXJpYS1sYWJlbGxlZGJ5PVwiZmFpbHVyZS1lcnJvci1zdW1tYXJ5LWhlYWRpbmdcIiB0YWJpbmRleD1cIi0xXCI+XG4gICAgICA8aDIgY2xhc3M9XCJoZWFkaW5nLW1lZGl1bSBlcnJvci1zdW1tYXJ5LWhlYWRpbmdcIiBpZD1cImZhaWx1cmUtZXJyb3Itc3VtbWFyeS1oZWFkaW5nXCI+XG4gICAgICAgIEVycm9yIGluIHByb2Nlc3NpbmcgdGhlIHJlcXVlc3RcbiAgICAgIDwvaDI+XG4gICAgICA8ZGl2IGNsYXNzPVwiZ292dWstZXJyb3Itc3VtbWFyeV9fYm9keVwiPlxuICAgICAgICB7eyBlcnJvck1lc3NhZ2UgfX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cblxuICBcblxuPGRpdiAqbmdJZj1cImRhdGFTb3VyY2UuZGF0YS5sZW5ndGggPiAwXCIgIGNsYXNzPVwiZ292dWstZm9ybS1ncm91cCBmbG9hdC1yaWdodFwiPlxuICAgIDxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsIGRyb3BkcHduXCIgZm9yPVwic29ydFwiID5cbiAgICAgIEZpbHRlciBieSBjYXNld29ya2VyOlxuICAgIDwvbGFiZWw+XG4gICAgPHNlbGVjdCBjbGFzcz1cImdvdnVrLXNlbGVjdFwiIGlkPVwic29ydFwiIG5hbWU9XCJzb3J0XCIgKGNoYW5nZSk9XCJzZWxlY3RjaGFuZ2UoJGV2ZW50KVwiPlxuICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiIHNlbGVjdGVkPSdzZWxlY3RlZCc+QWxsIGNhc2V3b3JrZXJzPC9vcHRpb24+XG4gICAgICA8b3B0aW9uICAqbmdGb3I9XCJsZXQgbmFtZSBvZiB1c2VyTHN0O1wiIHZhbHVlPVwie3tuYW1lfX1cIj57e25hbWV9fTwvb3B0aW9uPlxuICAgIDwvc2VsZWN0PlxuPC9kaXY+XG5cbiAgPGRpdiAqbmdJZj1cImRhdGFTb3VyY2UuZGF0YS5sZW5ndGggPiAwXCIgIGNsYXNzPVwiZ292dWstZm9ybS1ncm91cCBmbG9hdC1yaWdodC1wYWRkaW5nXCI+XG4gICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgZHJvcGRwd25cIiBmb3I9XCJzb3J0XCIgPlxuICAgICAgRmlsdGVyIGJ5IHNlcnZpY2U6XG4gICAgPC9sYWJlbD5cbiAgICA8c2VsZWN0IGNsYXNzPVwiZ292dWstc2VsZWN0XCIgaWQ9XCJzb3J0XCIgbmFtZT1cInNvcnRcIiAoY2hhbmdlKT1cInNlbGVjdGNoYW5nZSgkZXZlbnQpXCI+XG4gICAgICA8b3B0aW9uIHZhbHVlPVwiXCIgc2VsZWN0ZWQ9J3NlbGVjdGVkJz5BbGwgc2VydmljZXM8L29wdGlvbj5cbiAgICAgIDxvcHRpb24gICpuZ0Zvcj1cImxldCBuYW1lIG9mIHNlcnZpY2VMc3Q7XCIgdmFsdWU9XCJ7e25hbWV9fVwiPnt7bmFtZX19PC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+XG4gIDwvZGl2PlxuIFxuPGRpdiAqbmdJZj1cImRhdGFTb3VyY2UuZGF0YS5sZW5ndGggPiAwXCIgY2xhc3M9XCJleGFtcGxlLWNvbnRhaW5lclwiPlxuXG4gIDxtYXQtdGFibGUgW2RhdGFTb3VyY2VdPVwiZGF0YVNvdXJjZVwiIG1hdFNvcnQ+XG5cbiAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cImNjZF9jYXNlX251bWJlclwiPlxuICAgICAgPG1hdC1oZWFkZXItY2VsbCAgKm1hdEhlYWRlckNlbGxEZWYgPkNhc2UgcmVmZXJlbmNlIDwvbWF0LWhlYWRlci1jZWxsPlxuICAgICAgPG1hdC1jZWxsICAqbWF0Q2VsbERlZj1cImxldCByb3dcIiBjbGFzcz1cIndoaXRlc3BhY2UtaW5oZXJpdFwiPiB7e3Jvdy5jY2RfY2FzZV9udW1iZXIgfCBjY2RIeXBoZW5zIH19IDwvbWF0LWNlbGw+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cInJlZnVuZF9yZWZlcmVuY2VcIj5cbiAgICAgIDxtYXQtaGVhZGVyLWNlbGwgICptYXRIZWFkZXJDZWxsRGVmID4gUmVmdW5kIHJlZmVyZW5jZSA8L21hdC1oZWFkZXItY2VsbD5cbiAgICAgIDxtYXQtY2VsbCAgKm1hdENlbGxEZWY9XCJsZXQgcm93XCIgY2xhc3M9XCJ3aGl0ZXNwYWNlLWluaGVyaXRcIj4ge3tyb3cucmVmdW5kX3JlZmVyZW5jZX19IDwvbWF0LWNlbGw+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgICA8bmctY29udGFpbmVyIG1hdENvbHVtbkRlZj1cInVzZXJfZnVsbF9uYW1lXCI+XG4gICAgICA8bWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmID4gU3VibWl0dGVkIGJ5IDwvbWF0LWhlYWRlci1jZWxsPlxuICAgICAgPG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiIFtzdHlsZS5jb2xvcl09XCJyb3cuY29sb3JcIiBjbGFzcz1cIndoaXRlc3BhY2UtaW5oZXJpdFwiPiB7e3Jvdy51c2VyX2Z1bGxfbmFtZSB9fSA8L21hdC1jZWxsPlxuICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPG5nLWNvbnRhaW5lciBtYXRDb2x1bW5EZWY9XCJkYXRlX2NyZWF0ZWRcIj5cbiAgICAgIDxtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWYgbWF0LXNvcnQtaGVhZGVyPiBEYXRlIGNyZWF0ZWQgPC9tYXQtaGVhZGVyLWNlbGw+XG4gICAgICA8bWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCIgY2xhc3M9XCJ3aGl0ZXNwYWNlLWluaGVyaXRcIj4ge3tyb3cuZGF0ZV9jcmVhdGVkIHwgZGF0ZTonZCBNTU1NIHl5eXknfX0gPC9tYXQtY2VsbD5cbiAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDxuZy1jb250YWluZXIgbWF0Q29sdW1uRGVmPVwiZGF0ZV91cGRhdGVkXCI+XG4gICAgICAgIDxtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWYgbWF0LXNvcnQtaGVhZGVyPiBMYXN0IHVwZGF0ZWQ8L21hdC1oZWFkZXItY2VsbD5cbiAgICAgICAgPG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd1wiIFtzdHlsZS5jb2xvcl09XCJyb3cuY29sb3JcIiBjbGFzcz1cIndoaXRlc3BhY2UtaW5oZXJpdFwiPiB7e3Jvdy5kYXRlX3VwZGF0ZWQgfCBkYXRlOidkIE1NTU0geXl5eSd9fSA8L21hdC1jZWxsPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc0FwcHJvdmFsRmxvd1wiIG1hdENvbHVtbkRlZj1cIkFjdGlvblwiPlxuICAgICAgICAgIDxtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWY+IEFjdGlvbiA8L21hdC1oZWFkZXItY2VsbD5cbiAgICAgICAgICA8bWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93XCIgW3N0eWxlLmNvbG9yXT1cInJvdy5jb2xvclwiID4gPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJnb1RvQ2FzZVJldmlldyhyb3cuY2NkX2Nhc2VfbnVtYmVyLCByb3cpXCI+UmV2aWV3IGNhc2U8L2E+Jm5ic3A7PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIChjbGljayk9XCJnb1RvUmVmdW5kUHJvY2Vzc0NvbXBvbmVudChyb3cucmVmdW5kX3JlZmVyZW5jZSwgcm93KVwiPlByb2Nlc3MgcmVmdW5kPC9hPjwvbWF0LWNlbGw+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNBcHByb3ZhbEZsb3dcIiBtYXRDb2x1bW5EZWY9XCJBY3Rpb25cIj5cbiAgICAgICAgICA8bWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmID4gQWN0aW9uIDwvbWF0LWhlYWRlci1jZWxsPlxuICAgICAgICAgIDxtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dcIiBbc3R5bGUuY29sb3JdPVwicm93LmNvbG9yXCI+IDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiAoY2xpY2spPVwiZ29Ub1JlZnVuZFZpZXdDb21wb25lbnQocm93LnJlZnVuZF9yZWZlcmVuY2UsIHJvdylcIj5SZXZpZXcgcmVmdW5kPC9hPjwvbWF0LWNlbGw+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPG1hdC1oZWFkZXItcm93ICptYXRIZWFkZXJSb3dEZWY9XCJkaXNwbGF5ZWRDb2x1bW5zXCI+PC9tYXQtaGVhZGVyLXJvdz5cbiAgICA8bWF0LXJvdyAqbWF0Um93RGVmPVwibGV0IHJvdzsgY29sdW1uczogZGlzcGxheWVkQ29sdW1ucztcIj5cbiAgICA8L21hdC1yb3c+XG4gIDwvbWF0LXRhYmxlPlxuICA8bWF0LXBhZ2luYXRvciBbcGFnZVNpemVPcHRpb25zXT1cIls1LCAxMCwgMjUsIDEwMF1cIj48L21hdC1wYWdpbmF0b3I+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cImdvdnVrLWxhYmVsIGRyb3BkcHduXCIgKm5nSWY9XCJkYXRhU291cmNlLmRhdGEubGVuZ3RoID09PSAwXCI+Tm8gcmVjb3JkcyB0byBkaXNwbGF5PC9kaXY+XG4iXX0=