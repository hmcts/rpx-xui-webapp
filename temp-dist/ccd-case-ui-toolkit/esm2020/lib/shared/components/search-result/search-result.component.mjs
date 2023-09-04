import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { AbstractAppConfig } from '../../../app.config';
import { PlaceholderService } from '../../directives';
import { CaseField, CaseState, CaseType, DisplayMode, DRAFT_PREFIX, Jurisdiction, PaginationMetadata, SearchResultView, SortOrder, SortParameters } from '../../domain';
import { CaseReferencePipe } from '../../pipes';
import { ActivityService, BrowserService, SearchResultViewItemComparatorFactory, SessionStorageService } from '../../services';
import * as i0 from "@angular/core";
import * as i1 from "../../services";
import * as i2 from "../../../app.config";
import * as i3 from "../../pipes";
import * as i4 from "../../directives";
function SearchResultComponent_table_0_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 11)(1, "span", 12);
    i0.ɵɵtext(2, "!");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "strong", 13)(4, "span", 14);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "rpxTranslate");
    i0.ɵɵpipe(9, "number");
    i0.ɵɵpipe(10, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 4, "Warning"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate3(" ", i0.ɵɵpipeBind1(8, 6, "The total size of the result set is"), " ", i0.ɵɵpipeBind1(9, 8, ctx_r3.paginationMetadata.totalResultsCount), ". ", i0.ɵɵpipeBind1(10, 10, "Only the first 10,000 records are available for display."), " ");
} }
function SearchResultComponent_table_0_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15);
    i0.ɵɵpipe(1, "rpxTranslate");
    i0.ɵɵelementStart(2, "span", 16);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementStart(5, "span", 17);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(7);
    i0.ɵɵpipe(8, "rpxTranslate");
    i0.ɵɵelementStart(9, "span", 17);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(11);
    i0.ɵɵpipe(12, "rpxTranslate");
    i0.ɵɵelementStart(13, "span", 17);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext(2);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 8, ctx_r4.getTotalResults() + " results have been found"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(4, 10, "Showing"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r4.getFirstResult());
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(8, 12, "to"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r4.getLastResult());
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(12, 14, "of"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r4.getTotalResults());
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(16, 16, "results"), "");
} }
function SearchResultComponent_table_0_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵpipe(1, "rpxTranslate");
    i0.ɵɵelementStart(2, "span")(3, "a", 19);
    i0.ɵɵlistener("click", function SearchResultComponent_table_0_div_7_Template_a_click_3_listener() { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r11.clearSelection()); });
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "rpxTranslate");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 2, "Reset selection"));
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 4, "Reset case selection"));
} }
function SearchResultComponent_table_0_th_10_Template(rf, ctx) { if (rf & 1) {
    const _r14 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "th", 20)(1, "div", 21)(2, "input", 22);
    i0.ɵɵlistener("change", function SearchResultComponent_table_0_th_10_Template_input_change_2_listener() { i0.ɵɵrestoreView(_r14); const ctx_r13 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r13.selectAll()); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "label", 23);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("checked", ctx_r6.allOnPageSelected())("disabled", !ctx_r6.canAnyBeShared());
} }
function SearchResultComponent_table_0_th_11_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r19 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 27)(1, "a", 28);
    i0.ɵɵlistener("click", function SearchResultComponent_table_0_th_11_div_8_Template_a_click_1_listener() { i0.ɵɵrestoreView(_r19); const col_r15 = i0.ɵɵnextContext().$implicit; const ctx_r17 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r17.sort(col_r15)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const col_r15 = i0.ɵɵnextContext().$implicit;
    const ctx_r16 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("innerHTML", ctx_r16.sortWidget(col_r15), i0.ɵɵsanitizeHtml);
} }
function SearchResultComponent_table_0_th_11_Template(rf, ctx) { if (rf & 1) {
    const _r22 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "th")(1, "table", 24);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementStart(3, "tr")(4, "th")(5, "div", 25);
    i0.ɵɵlistener("click", function SearchResultComponent_table_0_th_11_Template_div_click_5_listener() { const restoredCtx = i0.ɵɵrestoreView(_r22); const col_r15 = restoredCtx.$implicit; const ctx_r21 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r21.sort(col_r15)); });
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(8, SearchResultComponent_table_0_th_11_div_8_Template, 2, 1, "div", 26);
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const col_r15 = ctx.$implicit;
    const ctx_r7 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(2, 3, "Sort by " + col_r15.label + " " + ctx_r7.isSortAscending(col_r15) ? "ascending" : "descending"));
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(7, 5, col_r15.label), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r7.comparator(col_r15));
} }
function SearchResultComponent_table_0_th_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "th", 29);
} }
function SearchResultComponent_table_0_ng_container_14_tr_1_td_1_Template(rf, ctx) { if (rf & 1) {
    const _r30 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 20)(1, "div", 21)(2, "input", 31);
    i0.ɵɵlistener("change", function SearchResultComponent_table_0_ng_container_14_tr_1_td_1_Template_input_change_2_listener() { i0.ɵɵrestoreView(_r30); const result_r24 = i0.ɵɵnextContext().$implicit; const ctx_r28 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r28.changeSelection(result_r24)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "label", 32);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const result_r24 = i0.ɵɵnextContext().$implicit;
    const ctx_r25 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵpropertyInterpolate1("id", "select-", result_r24.case_id, "")("name", "select-", result_r24.case_id, "");
    i0.ɵɵproperty("checked", ctx_r25.isSelected(result_r24))("disabled", !ctx_r25.canBeShared(result_r24));
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("for", "select-", result_r24.case_id, "");
} }
const _c0 = function () { return ["value"]; };
function SearchResultComponent_table_0_ng_container_14_tr_1_td_2_a_1_ng_container_2_ccd_field_read_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-field-read", 41);
} if (rf & 2) {
    const col_r32 = i0.ɵɵnextContext(3).$implicit;
    const result_r24 = i0.ɵɵnextContext().$implicit;
    const ctx_r37 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("caseField", ctx_r37.getColumnsWithPrefix(result_r24.columns[col_r32.case_field_id], result_r24))("contextFields", result_r24.hydrated_case_fields)("elementsToSubstitute", i0.ɵɵpureFunction0(3, _c0));
} }
function SearchResultComponent_table_0_ng_container_14_tr_1_td_2_a_1_ng_container_2_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "ccdCaseReference");
} if (rf & 2) {
    const result_r24 = i0.ɵɵnextContext(4).$implicit;
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(1, 1, result_r24.case_id));
} }
function SearchResultComponent_table_0_ng_container_14_tr_1_td_2_a_1_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0, 38);
    i0.ɵɵtemplate(1, SearchResultComponent_table_0_ng_container_14_tr_1_td_2_a_1_ng_container_2_ccd_field_read_1_Template, 1, 4, "ccd-field-read", 39);
    i0.ɵɵtemplate(2, SearchResultComponent_table_0_ng_container_14_tr_1_td_2_a_1_ng_container_2_ng_template_2_Template, 2, 3, "ng-template", null, 40, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const _r38 = i0.ɵɵreference(3);
    const col_r32 = i0.ɵɵnextContext(2).$implicit;
    const result_r24 = i0.ɵɵnextContext().$implicit;
    const ctx_r36 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r36.draftPrefixOrGet(col_r32, result_r24))("ngIfElse", _r38);
} }
function SearchResultComponent_table_0_ng_container_14_tr_1_td_2_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 36);
    i0.ɵɵpipe(1, "ccdCaseReference");
    i0.ɵɵtemplate(2, SearchResultComponent_table_0_ng_container_14_tr_1_td_2_a_1_ng_container_2_Template, 4, 2, "ng-container", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const result_r24 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r34 = i0.ɵɵnextContext(3);
    i0.ɵɵattributeInterpolate1("aria-label", "go to case with Case reference:", i0.ɵɵpipeBind1(1, 3, result_r24.case_id), "");
    i0.ɵɵproperty("routerLink", ctx_r34.prepareCaseLinkUrl(result_r24.case_id));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r34.hideRows);
} }
function SearchResultComponent_table_0_ng_container_14_tr_1_td_2_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵelement(1, "ccd-field-read", 41);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const col_r32 = i0.ɵɵnextContext().$implicit;
    const result_r24 = i0.ɵɵnextContext().$implicit;
    const ctx_r35 = i0.ɵɵnextContext(3);
    i0.ɵɵstyleProp("visibility", ctx_r35.hideRows ? "hidden" : "visible");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("caseField", result_r24.columns[col_r32.case_field_id])("contextFields", result_r24.hydrated_case_fields)("elementsToSubstitute", i0.ɵɵpureFunction0(5, _c0));
} }
function SearchResultComponent_table_0_ng_container_14_tr_1_td_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 33);
    i0.ɵɵtemplate(1, SearchResultComponent_table_0_ng_container_14_tr_1_td_2_a_1_Template, 3, 5, "a", 34);
    i0.ɵɵtemplate(2, SearchResultComponent_table_0_ng_container_14_tr_1_td_2_div_2_Template, 2, 6, "div", 35);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const colIndex_r33 = ctx.index;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", colIndex_r33 == 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", colIndex_r33 != 0);
} }
function SearchResultComponent_table_0_ng_container_14_tr_1_td_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td")(1, "div");
    i0.ɵɵelement(2, "ccd-activity", 42);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const result_r24 = i0.ɵɵnextContext().$implicit;
    const ctx_r27 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("visibility", ctx_r27.hideRows ? "hidden" : "visible");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("caseId", result_r24.case_id)("displayMode", ctx_r27.ICON);
} }
function SearchResultComponent_table_0_ng_container_14_tr_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵtemplate(1, SearchResultComponent_table_0_ng_container_14_tr_1_td_1_Template, 4, 5, "td", 8);
    i0.ɵɵtemplate(2, SearchResultComponent_table_0_ng_container_14_tr_1_td_2_Template, 3, 2, "td", 30);
    i0.ɵɵtemplate(3, SearchResultComponent_table_0_ng_container_14_tr_1_td_3_Template, 3, 4, "td", 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r23 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r23.selectionEnabled);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r23.resultView.columns);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r23.activityEnabled());
} }
const _c1 = function (a0, a1, a2) { return { itemsPerPage: a0, currentPage: a1, totalItems: a2 }; };
function SearchResultComponent_table_0_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, SearchResultComponent_table_0_ng_container_14_tr_1_Template, 4, 3, "tr", 9);
    i0.ɵɵpipe(2, "paginate");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r9 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind2(2, 1, ctx_r9.resultView.results, i0.ɵɵpureFunction3(4, _c1, ctx_r9.paginationPageSize, ctx_r9.selected.page, ctx_r9.resultTotal)));
} }
function SearchResultComponent_table_0_ng_container_15_tr_1_td_1_Template(rf, ctx) { if (rf & 1) {
    const _r56 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 20)(1, "div", 21)(2, "input", 43);
    i0.ɵɵlistener("change", function SearchResultComponent_table_0_ng_container_15_tr_1_td_1_Template_input_change_2_listener() { i0.ɵɵrestoreView(_r56); const result_r50 = i0.ɵɵnextContext().$implicit; const ctx_r54 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r54.changeSelection(result_r50)); })("keyup", function SearchResultComponent_table_0_ng_container_15_tr_1_td_1_Template_input_keyup_2_listener($event) { i0.ɵɵrestoreView(_r56); const result_r50 = i0.ɵɵnextContext().$implicit; const ctx_r57 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r57.onKeyUp($event, result_r50)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelement(3, "label", 32);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const result_r50 = i0.ɵɵnextContext().$implicit;
    const ctx_r51 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵpropertyInterpolate1("id", "select-", result_r50.case_id, "")("name", "select-", result_r50.case_id, "");
    i0.ɵɵproperty("checked", ctx_r51.isSelected(result_r50))("disabled", !ctx_r51.canBeShared(result_r50));
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("for", "select-", result_r50.case_id, "");
} }
function SearchResultComponent_table_0_ng_container_15_tr_1_td_2_a_1_ng_container_2_ccd_field_read_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-field-read", 41);
} if (rf & 2) {
    const col_r60 = i0.ɵɵnextContext(3).$implicit;
    const result_r50 = i0.ɵɵnextContext().$implicit;
    const ctx_r65 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("caseField", ctx_r65.getColumnsWithPrefix(result_r50.columns[col_r60.case_field_id], result_r50))("contextFields", result_r50.hydrated_case_fields)("elementsToSubstitute", i0.ɵɵpureFunction0(3, _c0));
} }
function SearchResultComponent_table_0_ng_container_15_tr_1_td_2_a_1_ng_container_2_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "ccdCaseReference");
} if (rf & 2) {
    const result_r50 = i0.ɵɵnextContext(4).$implicit;
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(1, 1, result_r50.case_id));
} }
function SearchResultComponent_table_0_ng_container_15_tr_1_td_2_a_1_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0, 38);
    i0.ɵɵtemplate(1, SearchResultComponent_table_0_ng_container_15_tr_1_td_2_a_1_ng_container_2_ccd_field_read_1_Template, 1, 4, "ccd-field-read", 39);
    i0.ɵɵtemplate(2, SearchResultComponent_table_0_ng_container_15_tr_1_td_2_a_1_ng_container_2_ng_template_2_Template, 2, 3, "ng-template", null, 40, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const _r66 = i0.ɵɵreference(3);
    const col_r60 = i0.ɵɵnextContext(2).$implicit;
    const result_r50 = i0.ɵɵnextContext().$implicit;
    const ctx_r64 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r64.draftPrefixOrGet(col_r60, result_r50))("ngIfElse", _r66);
} }
function SearchResultComponent_table_0_ng_container_15_tr_1_td_2_a_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "a", 36);
    i0.ɵɵpipe(1, "ccdCaseReference");
    i0.ɵɵtemplate(2, SearchResultComponent_table_0_ng_container_15_tr_1_td_2_a_1_ng_container_2_Template, 4, 2, "ng-container", 37);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const result_r50 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r62 = i0.ɵɵnextContext(3);
    i0.ɵɵattributeInterpolate1("aria-label", "go to case with Case reference:", i0.ɵɵpipeBind1(1, 3, result_r50.case_id), "");
    i0.ɵɵproperty("routerLink", ctx_r62.prepareCaseLinkUrl(result_r50.case_id));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r62.hideRows);
} }
function SearchResultComponent_table_0_ng_container_15_tr_1_td_2_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵelement(1, "ccd-field-read", 41);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const col_r60 = i0.ɵɵnextContext().$implicit;
    const result_r50 = i0.ɵɵnextContext().$implicit;
    const ctx_r63 = i0.ɵɵnextContext(3);
    i0.ɵɵstyleProp("visibility", ctx_r63.hideRows ? "hidden" : "visible");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("caseField", result_r50.columns[col_r60.case_field_id])("contextFields", result_r50.hydrated_case_fields)("elementsToSubstitute", i0.ɵɵpureFunction0(5, _c0));
} }
function SearchResultComponent_table_0_ng_container_15_tr_1_td_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td", 33);
    i0.ɵɵtemplate(1, SearchResultComponent_table_0_ng_container_15_tr_1_td_2_a_1_Template, 3, 5, "a", 34);
    i0.ɵɵtemplate(2, SearchResultComponent_table_0_ng_container_15_tr_1_td_2_div_2_Template, 2, 6, "div", 35);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const colIndex_r61 = ctx.index;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", colIndex_r61 == 0);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", colIndex_r61 != 0);
} }
function SearchResultComponent_table_0_ng_container_15_tr_1_td_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "td")(1, "div");
    i0.ɵɵelement(2, "ccd-activity", 42);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const result_r50 = i0.ɵɵnextContext().$implicit;
    const ctx_r53 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("visibility", ctx_r53.hideRows ? "hidden" : "visible");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("caseId", result_r50.case_id)("displayMode", ctx_r53.ICON);
} }
function SearchResultComponent_table_0_ng_container_15_tr_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵtemplate(1, SearchResultComponent_table_0_ng_container_15_tr_1_td_1_Template, 4, 5, "td", 8);
    i0.ɵɵtemplate(2, SearchResultComponent_table_0_ng_container_15_tr_1_td_2_Template, 3, 2, "td", 30);
    i0.ɵɵtemplate(3, SearchResultComponent_table_0_ng_container_15_tr_1_td_3_Template, 3, 4, "td", 0);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r49 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r49.selectionEnabled);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r49.resultView.columns);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r49.activityEnabled());
} }
function SearchResultComponent_table_0_ng_container_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, SearchResultComponent_table_0_ng_container_15_tr_1_Template, 4, 3, "tr", 9);
    i0.ɵɵpipe(2, "paginate");
    i0.ɵɵpipe(3, "ccdSortSearchResult");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind2(2, 1, i0.ɵɵpipeBind2(3, 4, ctx_r10.resultView.results, ctx_r10.sortParameters), i0.ɵɵpureFunction3(7, _c1, ctx_r10.paginationPageSize, ctx_r10.selected.page, ctx_r10.resultTotal)));
} }
function SearchResultComponent_table_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table")(1, "caption")(2, "h2", 3);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, SearchResultComponent_table_0_div_5_Template, 11, 12, "div", 4);
    i0.ɵɵtemplate(6, SearchResultComponent_table_0_div_6_Template, 17, 18, "div", 5);
    i0.ɵɵtemplate(7, SearchResultComponent_table_0_div_7_Template, 6, 6, "div", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "thead")(9, "tr", 7);
    i0.ɵɵtemplate(10, SearchResultComponent_table_0_th_10_Template, 4, 2, "th", 8);
    i0.ɵɵtemplate(11, SearchResultComponent_table_0_th_11_Template, 9, 7, "th", 9);
    i0.ɵɵtemplate(12, SearchResultComponent_table_0_th_12_Template, 1, 0, "th", 10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(13, "tbody");
    i0.ɵɵtemplate(14, SearchResultComponent_table_0_ng_container_14_Template, 3, 8, "ng-container", 0);
    i0.ɵɵtemplate(15, SearchResultComponent_table_0_ng_container_15_Template, 4, 11, "ng-container", 0);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 9, ctx_r0.caseState ? "Your cases" : "Search result"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.paginationLimitEnforced);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.hasResults() || ctx_r0.hasDrafts());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", (ctx_r0.hasResults() || ctx_r0.hasDrafts()) && ctx_r0.selectionEnabled);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r0.selectionEnabled);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r0.resultView.columns);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.activityEnabled());
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.consumerSortingEnabled);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !ctx_r0.consumerSortingEnabled);
} }
function SearchResultComponent_ccd_pagination_1_Template(rf, ctx) { if (rf & 1) {
    const _r78 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ccd-pagination", 44);
    i0.ɵɵlistener("pageChange", function SearchResultComponent_ccd_pagination_1_Template_ccd_pagination_pageChange_0_listener($event) { i0.ɵɵrestoreView(_r78); const ctx_r77 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r77.goToPage($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("visibilityLabel", ctx_r1.hideRows ? "hidden" : "visible")("autoHide", true)("maxSize", 8)("screenReaderPaginationLabel", "Pagination")("screenReaderPageLabel", ctx_r1.page)("screenReaderCurrentLabel", "You're on page");
} }
function SearchResultComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 45);
    i0.ɵɵpipe(1, "rpxTranslate");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵattribute("aria-describedby", i0.ɵɵpipeBind1(1, 2, "No cases found. Try using different filters."));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("\n", i0.ɵɵpipeBind1(3, 4, "No cases found. Try using different filters."), "\n");
} }
export class SearchResultComponent {
    constructor(searchResultViewItemComparatorFactory, appConfig, activityService, caseReferencePipe, placeholderService, browserService, sessionStorageService) {
        this.activityService = activityService;
        this.caseReferencePipe = caseReferencePipe;
        this.placeholderService = placeholderService;
        this.browserService = browserService;
        this.sessionStorageService = sessionStorageService;
        this.PAGINATION_MAX_ITEM_RESULT = 10000;
        this.ICON = DisplayMode.ICON;
        this.selectionEnabled = false;
        this.showOnlySelected = false;
        this.preSelectedCases = [];
        this.consumerSortingEnabled = false;
        this.selection = new EventEmitter();
        this.changePage = new EventEmitter();
        this.clickCase = new EventEmitter();
        this.sortHandler = new EventEmitter();
        this.paginationLimitEnforced = false;
        this.selected = {};
        this.consumerSortParameters = { column: null, order: null, type: null };
        this.selectedCases = [];
        this.searchResultViewItemComparatorFactory = searchResultViewItemComparatorFactory;
        this.paginationPageSize = appConfig.getPaginationPageSize();
        this.hideRows = false;
    }
    ngOnInit() {
        if (this.preSelectedCases) {
            for (const preSelectedCase of this.preSelectedCases) {
                if (this.selectedCases && !this.selectedCases.some(aCase => aCase.case_id === preSelectedCase.case_id)) {
                    this.selectedCases.push(preSelectedCase);
                }
            }
        }
        this.sessionStorageService.removeItem('eventUrl');
        this.selection.emit(this.selectedCases);
    }
    ngOnChanges(changes) {
        if (changes['resultView']) {
            this.hideRows = false;
            this.sortParameters = undefined;
            // Clone `resultView` to prevent sorting the external variable
            this.resultView = {
                columns: this.resultView.columns.slice(0),
                results: this.resultView.results.slice(0),
                hasDrafts: this.resultView.hasDrafts
            };
            this.resultView.columns = this.resultView.columns.sort((a, b) => {
                return a.order - b.order;
            });
            this.hydrateResultView();
            this.draftsCount = this.draftsCount ? this.draftsCount : this.numberOfDrafts();
        }
        if (changes['page']) {
            this.selected.page = (changes['page']).currentValue;
        }
    }
    get resultTotal() {
        const total = this.paginationMetadata.totalResultsCount;
        const maximumResultReached = total >= this.PAGINATION_MAX_ITEM_RESULT;
        this.paginationLimitEnforced = maximumResultReached;
        return maximumResultReached ? this.PAGINATION_MAX_ITEM_RESULT : total;
    }
    clearSelection() {
        this.selectedCases = [];
        this.selection.emit(this.selectedCases);
    }
    canBeShared(caseView) {
        return caseView.supplementary_data && caseView.supplementary_data.hasOwnProperty('orgs_assigned_users');
    }
    canAnyBeShared() {
        for (let i = 0, l = this.resultView.results.length; i < l; i++) {
            if (this.canBeShared(this.resultView.results[i])) {
                return true;
            }
        }
        return false;
    }
    selectAll() {
        if (this.allOnPageSelected()) {
            // all cases already selected, so unselect all on this page
            this.resultView.results.forEach(c => {
                this.selectedCases.forEach((s, i) => {
                    if (c.case_id === s.case_id) {
                        this.selectedCases.splice(i, 1);
                    }
                });
            });
        }
        else {
            this.resultView.results.forEach(c => {
                if (!this.isSelected(c) && this.canBeShared(c)) {
                    this.selectedCases.push(c);
                }
            });
        }
        this.selection.emit(this.selectedCases);
    }
    changeSelection(c) {
        if (this.isSelected(c)) {
            this.selectedCases.forEach((s, i) => {
                if (c.case_id === s.case_id) {
                    this.selectedCases.splice(i, 1);
                }
            });
        }
        else {
            if (this.canBeShared(c)) {
                this.selectedCases.push(c);
            }
        }
        this.selection.emit(this.selectedCases);
    }
    isSelected(c) {
        for (let i = 0, l = this.selectedCases.length; i < l; i++) {
            if (c.case_id === this.selectedCases[i].case_id) {
                return true;
            }
        }
        return false;
    }
    allOnPageSelected() {
        let canBeSharedCount = 0;
        for (let i = 0, l = this.resultView.results.length; i < l; i++) {
            const r = this.resultView.results[i];
            if (this.canBeShared(r)) {
                canBeSharedCount++;
            }
            if (!this.isSelected(r) && this.canBeShared(r)) {
                return false;
            }
        }
        if (canBeSharedCount === 0) {
            return false;
        }
        return true;
    }
    /**
     * Hydrates result view with case field definitions.
     */
    // A longer term resolution is to move this piece of logic to the backend
    hydrateResultView() {
        this.resultView.results.forEach(result => {
            const caseFields = [];
            Object.keys(result.case_fields).forEach(fieldId => {
                const field = result.case_fields[fieldId];
                caseFields.push(Object.assign(new CaseField(), {
                    id: fieldId,
                    label: null,
                    field_type: {},
                    value: field,
                    display_context: null,
                }));
            });
            result.hydrated_case_fields = caseFields;
            result.columns = {};
            this.resultView.columns.forEach(col => {
                result.columns[col.case_field_id] = this.buildCaseField(col, result);
            });
        });
    }
    goToPage(page) {
        this.hideRows = true;
        this.selected.init = false;
        this.selected.jurisdiction = this.jurisdiction;
        this.selected.caseType = this.caseType;
        this.selected.caseState = this.caseState;
        this.selected.formGroup = this.caseFilterFG;
        this.selected.metadataFields = this.metadataFields;
        this.selected.page = page;
        // Apply filters
        const queryParams = {};
        queryParams[SearchResultComponent.PARAM_JURISDICTION] = this.selected.jurisdiction ? this.selected.jurisdiction.id : null;
        queryParams[SearchResultComponent.PARAM_CASE_TYPE] = this.selected.caseType ? this.selected.caseType.id : null;
        queryParams[SearchResultComponent.PARAM_CASE_STATE] = this.selected.caseState ? this.selected.caseState.id : null;
        this.changePage.emit({
            selected: this.selected,
            queryParams
        });
        const topContainer = document.getElementById('top');
        if (topContainer) {
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
            topContainer.focus();
        }
    }
    buildCaseField(col, result) {
        return Object.assign(new CaseField(), {
            id: col.case_field_id,
            label: col.label,
            field_type: col.case_field_type,
            value: result.case_fields[col.case_field_id],
            display_context_parameter: col.display_context_parameter,
            display_context: col.display_context,
        });
    }
    getColumnsWithPrefix(col, result) {
        col.value = this.draftPrefixOrGet(col, result);
        col.value = this.placeholderService.resolvePlaceholders(result.case_fields, col.value);
        return col;
    }
    hasResults() {
        return this.resultView.results.length && this.paginationMetadata.totalPagesCount;
    }
    hasDrafts() {
        return this.resultView.hasDrafts();
    }
    comparator(column) {
        return this.searchResultViewItemComparatorFactory.createSearchResultViewItemComparator(column);
    }
    sort(column) {
        if (this.consumerSortingEnabled) {
            if (column.case_field_id !== this.consumerSortParameters.column) {
                this.consumerSortParameters.order = SortOrder.DESCENDING;
            }
            else {
                this.consumerSortParameters.order = this.consumerSortParameters.order === SortOrder.DESCENDING ?
                    SortOrder.ASCENDING :
                    SortOrder.DESCENDING;
            }
            this.consumerSortParameters.column = column.case_field_id;
            this.consumerSortParameters.type = column.case_field_type.type;
            this.sortHandler.emit(this.consumerSortParameters);
        }
        else {
            if (this.comparator(column) === undefined) {
                return;
            }
            else if (this.isSortAscending(column)) {
                this.sortParameters = new SortParameters(this.comparator(column), SortOrder.ASCENDING);
            }
            else {
                this.sortParameters = new SortParameters(this.comparator(column), SortOrder.DESCENDING);
            }
        }
    }
    sortWidget(column) {
        let condition = false;
        if (this.consumerSortingEnabled) {
            const isColumn = column.case_field_id === this.consumerSortParameters.column;
            const isAscending = this.consumerSortParameters.order === SortOrder.ASCENDING;
            condition = !isColumn || (isColumn && isAscending);
        }
        else {
            condition = this.isSortAscending(column);
        }
        return condition ? '&#9660;' : '&#9650;';
    }
    activityEnabled() {
        return this.activityService.isEnabled;
    }
    hyphenateIfCaseReferenceOrGet(col, result) {
        if (col.case_field_id === '[CASE_REFERENCE]') {
            return this.caseReferencePipe.transform(result.case_fields[col.case_field_id]);
        }
        else {
            if (col.id) {
                if (col.id === '[CASE_REFERENCE]') {
                    return this.caseReferencePipe.transform(result.case_fields[col.id]);
                }
                else {
                    return result.case_fields[col.id];
                }
            }
            else {
                return result.case_fields[col.case_field_id];
            }
        }
    }
    draftPrefixOrGet(col, result) {
        return result.case_id.startsWith(DRAFT_PREFIX) ? DRAFT_PREFIX : this.hyphenateIfCaseReferenceOrGet(col, result);
    }
    isSortAscending(column) {
        const currentSortOrder = this.currentSortOrder(column);
        return currentSortOrder === SortOrder.UNSORTED || currentSortOrder === SortOrder.DESCENDING;
    }
    currentSortOrder(column) {
        let isAscending = true;
        let isDescending = true;
        if (this.comparator(column) === undefined) {
            return SortOrder.UNSORTED;
        }
        for (let i = 0; i < this.resultView.results.length - 1; i++) {
            const comparison = this.comparator(column).compare(this.resultView.results[i], this.resultView.results[i + 1]);
            isDescending = isDescending && comparison <= 0;
            isAscending = isAscending && comparison >= 0;
            if (!isAscending && !isDescending) {
                break;
            }
        }
        return isAscending ? SortOrder.ASCENDING : isDescending ? SortOrder.DESCENDING : SortOrder.UNSORTED;
    }
    getFirstResult() {
        const currentPage = (this.selected.page ? this.selected.page : 1);
        return ((currentPage - 1) * this.paginationPageSize) + 1 + this.getDraftsCountIfNotPageOne(currentPage);
    }
    getLastResult() {
        const currentPage = (this.selected.page ? this.selected.page : 1);
        return ((currentPage - 1) * this.paginationPageSize) + this.resultView.results.length + this.getDraftsCountIfNotPageOne(currentPage);
    }
    getTotalResults() {
        const total = this.paginationMetadata.totalResultsCount + this.draftsCount;
        return total >= this.PAGINATION_MAX_ITEM_RESULT ? this.PAGINATION_MAX_ITEM_RESULT : total;
    }
    prepareCaseLinkUrl(caseId) {
        let url = this.caseLinkUrlTemplate;
        url = url.replace('jurisdiction_id', this.jurisdiction.id);
        url = url.replace('caseType_id', this.caseType.id);
        url = url.replace('case_id', caseId);
        return url;
    }
    getDraftsCountIfNotPageOne(currentPage) {
        return currentPage > 1 ? this.draftsCount : 0;
    }
    numberOfDrafts() {
        return this.resultView.results.filter(_ => _.case_id.startsWith(DRAFT_PREFIX)).length;
    }
    goToCase(caseId) {
        this.clickCase.emit({
            caseId
        });
    }
    onKeyUp($event, c) {
        if ($event.key === 'Space') {
            if (this.browserService.isFirefox || this.browserService.isSafari || this.browserService.isIEOrEdge) {
                this.changeSelection(c);
            }
        }
    }
}
SearchResultComponent.PARAM_JURISDICTION = 'jurisdiction';
SearchResultComponent.PARAM_CASE_TYPE = 'case-type';
SearchResultComponent.PARAM_CASE_STATE = 'case-state';
SearchResultComponent.ɵfac = function SearchResultComponent_Factory(t) { return new (t || SearchResultComponent)(i0.ɵɵdirectiveInject(i1.SearchResultViewItemComparatorFactory), i0.ɵɵdirectiveInject(i2.AbstractAppConfig), i0.ɵɵdirectiveInject(i1.ActivityService), i0.ɵɵdirectiveInject(i3.CaseReferencePipe), i0.ɵɵdirectiveInject(i4.PlaceholderService), i0.ɵɵdirectiveInject(i1.BrowserService), i0.ɵɵdirectiveInject(i1.SessionStorageService)); };
SearchResultComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: SearchResultComponent, selectors: [["ccd-search-result"]], inputs: { caseLinkUrlTemplate: "caseLinkUrlTemplate", jurisdiction: "jurisdiction", caseType: "caseType", caseState: "caseState", caseFilterFG: "caseFilterFG", resultView: "resultView", page: "page", paginationMetadata: "paginationMetadata", metadataFields: "metadataFields", selectionEnabled: "selectionEnabled", showOnlySelected: "showOnlySelected", preSelectedCases: "preSelectedCases", consumerSortingEnabled: "consumerSortingEnabled" }, outputs: { selection: "selection", changePage: "changePage", clickCase: "clickCase", sortHandler: "sortHandler" }, features: [i0.ɵɵNgOnChangesFeature], decls: 3, vars: 3, consts: [[4, "ngIf"], [3, "visibilityLabel", "autoHide", "maxSize", "screenReaderPaginationLabel", "screenReaderPageLabel", "screenReaderCurrentLabel", "pageChange", 4, "ngIf"], ["class", "notification", 4, "ngIf"], ["id", "search-result-heading__text", "tabindex", "-1", 1, "heading-h2"], ["class", "govuk-warning-text pagination-limit-warning", 4, "ngIf"], ["class", "pagination-top", "role", "status", 4, "ngIf"], ["class", "reset-selection", 4, "ngIf"], ["scope", "row"], ["class", "govuk-table__checkbox", "scope", "col", 4, "ngIf"], [4, "ngFor", "ngForOf"], ["style", "width: 110px;", 4, "ngIf"], [1, "govuk-warning-text", "pagination-limit-warning"], ["aria-hidden", "true", 1, "govuk-warning-text__icon"], [1, "govuk-warning-text__text"], [1, "govuk-warning-text__assistive"], ["role", "status", 1, "pagination-top"], ["id", "search-result-summary__text", 1, "text-16"], [1, "govuk-!-font-weight-bold"], [1, "reset-selection"], ["href", "javascript:void(0)", 1, "search-result-reset-link", 3, "click"], ["scope", "col", 1, "govuk-table__checkbox"], [1, "govuk-checkboxes__item"], ["id", "select-all", "name", "select-all", "type", "checkbox", 1, "govuk-checkboxes__input", 3, "checked", "disabled", "change"], ["for", "select-all", 1, "govuk-label", "govuk-checkboxes__label"], [1, "search-result-column-header"], [1, "search-result-column-label", 3, "click"], ["class", "search-result-column-sort", 4, "ngIf"], [1, "search-result-column-sort"], ["href", "javascript:void(0)", 1, "sort-widget", 3, "innerHTML", "click"], [2, "width", "110px"], ["class", "search-result-column-cell", "scope", "row", 4, "ngFor", "ngForOf"], ["type", "checkbox", 1, "govuk-checkboxes__input", 3, "id", "name", "checked", "disabled", "change"], [1, "govuk-label", "govuk-checkboxes__label", 3, "for"], ["scope", "row", 1, "search-result-column-cell"], ["class", "govuk-link", 3, "routerLink", 4, "ngIf"], ["class", "text-16", 3, "visibility", 4, "ngIf"], [1, "govuk-link", 3, "routerLink"], ["class", "text-16", 4, "ngIf"], [1, "text-16"], ["ccdLabelSubstitutor", "", 3, "caseField", "contextFields", "elementsToSubstitute", 4, "ngIf", "ngIfElse"], ["case_reference", ""], ["ccdLabelSubstitutor", "", 3, "caseField", "contextFields", "elementsToSubstitute"], [3, "caseId", "displayMode"], ["type", "checkbox", 1, "govuk-checkboxes__input", 3, "id", "name", "checked", "disabled", "change", "keyup"], [3, "visibilityLabel", "autoHide", "maxSize", "screenReaderPaginationLabel", "screenReaderPageLabel", "screenReaderCurrentLabel", "pageChange"], [1, "notification"]], template: function SearchResultComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, SearchResultComponent_table_0_Template, 16, 11, "table", 0);
        i0.ɵɵtemplate(1, SearchResultComponent_ccd_pagination_1_Template, 1, 6, "ccd-pagination", 1);
        i0.ɵɵtemplate(2, SearchResultComponent_div_2_Template, 4, 6, "div", 2);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.hasResults() || ctx.hasDrafts());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.hasResults());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", !(ctx.hasResults() || ctx.hasDrafts()));
    } }, styles: ["table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{vertical-align:top}table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-size:16px;word-wrap:break-word}table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{float:left}table[_ngcontent-%COMP%]   .caseid-col[_ngcontent-%COMP%]{white-space:nowrap}.notification[_ngcontent-%COMP%]{text-align:center;padding:30px 0;margin-top:75px}a[_ngcontent-%COMP%]:hover{color:#005ea5}.search-result-reset-link[_ngcontent-%COMP%]{padding-right:15px;padding-left:15px}.search-result-column-header[_ngcontent-%COMP%]{width:auto;width:initial;table-layout:normal}.search-result-column-header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:table-cell;width:auto}@media screen and (max-width: 379px){.search-result-column-header[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:block;float:right}}.search-result-column-label[_ngcontent-%COMP%]{font-size:16px;font-weight:700;word-wrap:break-word;cursor:pointer;padding-right:15px}.search-result-column-sort[_ngcontent-%COMP%]{font-size:16px}.sort-widget[_ngcontent-%COMP%]{cursor:pointer;text-decoration:none;color:#231f20}span.heading-medium[_ngcontent-%COMP%]{margin-top:-20px}.govuk-table__checkbox[_ngcontent-%COMP%]{vertical-align:middle;padding-left:3px}#search-result-heading__text[_ngcontent-%COMP%]:focus{outline:none}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SearchResultComponent, [{
        type: Component,
        args: [{ selector: 'ccd-search-result', template: "<table *ngIf=\"hasResults() || hasDrafts()\">\n  <caption>\n    <h2 class=\"heading-h2\" id=\"search-result-heading__text\" tabindex=\"-1\">{{ (caseState ? 'Your cases' : 'Search result') | rpxTranslate}}</h2>\n\n    <div class=\"govuk-warning-text pagination-limit-warning\" *ngIf=\"paginationLimitEnforced\">\n      <span class=\"govuk-warning-text__icon\" aria-hidden=\"true\">!</span>\n      <strong class=\"govuk-warning-text__text\">\n        <span class=\"govuk-warning-text__assistive\">{{'Warning' | rpxTranslate}}</span>\n        {{'The total size of the result set is' | rpxTranslate}} {{paginationMetadata.totalResultsCount | number}}. {{'Only the first 10,000 records are available for display.' | rpxTranslate}}\n      </strong>\n    </div>\n\n    <div *ngIf=\"(hasResults() || hasDrafts())\" class=\"pagination-top\"\n        [attr.aria-label]=\"getTotalResults() + ' results have been found' | rpxTranslate\" role=\"status\">\n      <span class=\"text-16\" id=\"search-result-summary__text\">{{'Showing' | rpxTranslate}}\n        <span class=\"govuk-!-font-weight-bold\">{{ getFirstResult() }}</span>\n        {{'to' | rpxTranslate}}\n        <span class=\"govuk-!-font-weight-bold\">{{ getLastResult() }}</span>\n        {{'of' | rpxTranslate}}\n        <span class=\"govuk-!-font-weight-bold\">{{ getTotalResults() }}</span> {{'results' | rpxTranslate}}</span>\n    </div>\n    <div *ngIf=\"(hasResults() || hasDrafts()) && selectionEnabled\" class=\"reset-selection\"\n    [attr.aria-label]=\"'Reset selection' | rpxTranslate\">\n      <span><a class=\"search-result-reset-link\" href=\"javascript:void(0)\" (click)=\"clearSelection()\">{{'Reset case selection' | rpxTranslate}}</a></span>\n    </div>\n  </caption>\n  <thead>\n    <tr scope=\"row\">\n      <th *ngIf=\"selectionEnabled\" class=\"govuk-table__checkbox\" scope=\"col\">\n        <div class=\"govuk-checkboxes__item\">\n          <input class=\"govuk-checkboxes__input\" id=\"select-all\" name=\"select-all\" type=\"checkbox\" (change)=\"selectAll()\" [checked]=\"allOnPageSelected()\" [disabled]=\"!canAnyBeShared()\" />\n          <label class=\"govuk-label govuk-checkboxes__label\" for=\"select-all\">\n          </label>\n        </div>\n      </th>\n      <th *ngFor=\"let col of resultView.columns\">\n        <table class=\"search-result-column-header\"\n          [attr.aria-label]=\"('Sort by ' + col.label + ' ' + isSortAscending(col)? 'ascending' : 'descending') | rpxTranslate\">\n          <tr>\n            <th>\n              <div class=\"search-result-column-label\" (click)=\"sort(col)\">\n                {{col.label | rpxTranslate}}\n              </div>\n              <div *ngIf=\"comparator(col)\" class=\"search-result-column-sort\">\n                <a (click)=\"sort(col)\" class=\"sort-widget\" [innerHTML]=\"sortWidget(col)\" href=\"javascript:void(0)\"></a>\n              </div>\n            </th>\n          </tr>\n        </table>\n      </th>\n      <th *ngIf=\"activityEnabled()\" style=\"width: 110px;\"></th>\n    </tr>\n  </thead>\n\n  <tbody>\n    <!-- sorted by consumer -->\n    <ng-container *ngIf=\"consumerSortingEnabled\">\n      <tr *ngFor=\"let result of resultView.results | paginate: { itemsPerPage: paginationPageSize, currentPage: selected.page, totalItems: resultTotal }\">\n        <td *ngIf=\"selectionEnabled\" class=\"govuk-table__checkbox\" scope=\"col\">\n          <div class=\"govuk-checkboxes__item\">\n            <input class=\"govuk-checkboxes__input\" id=\"select-{{ result.case_id }}\" name=\"select-{{ result.case_id }}\"\n              type=\"checkbox\" (change)=\"changeSelection(result)\" [checked]=\"isSelected(result)\" [disabled]=\"!canBeShared(result)\" />\n            <label class=\"govuk-label govuk-checkboxes__label\" for=\"select-{{ result.case_id }}\">\n            </label>\n          </div>\n        </td>\n        <td class=\"search-result-column-cell\" *ngFor=\"let col of resultView.columns; let colIndex = index\" scope=\"row\">\n          <a *ngIf=\"colIndex == 0\" [routerLink]=\"prepareCaseLinkUrl(result.case_id)\"\n            attr.aria-label=\"go to case with Case reference:{{ result.case_id | ccdCaseReference }}\" class=\"govuk-link\">\n            <ng-container class=\"text-16\" *ngIf=\"!hideRows\">\n              <ccd-field-read *ngIf=\"draftPrefixOrGet(col, result); else case_reference\"\n                              ccdLabelSubstitutor [caseField]=\"getColumnsWithPrefix(result.columns[col.case_field_id], result)\"\n                              [contextFields]=\"result.hydrated_case_fields\"\n                              [elementsToSubstitute]=\"['value']\"></ccd-field-read>\n              <ng-template #case_reference>{{result.case_id | ccdCaseReference}}</ng-template>\n            </ng-container>\n          </a>\n          <div *ngIf=\"colIndex != 0\" class=\"text-16\" [style.visibility]=\"hideRows ? 'hidden' : 'visible'\">\n            <ccd-field-read ccdLabelSubstitutor\n                            [caseField]=\"result.columns[col.case_field_id]\"\n                            [contextFields]=\"result.hydrated_case_fields\"\n                            [elementsToSubstitute]=\"['value']\"></ccd-field-read>\n          </div>\n        </td>\n        <td *ngIf=\"activityEnabled()\">\n          <div [style.visibility]=\"hideRows ? 'hidden' : 'visible'\">\n            <ccd-activity [caseId]=\"result.case_id\" [displayMode]=\"ICON\"></ccd-activity>\n          </div>\n        </td>\n      </tr>\n    </ng-container>\n    <!-- sorted by toolkit -->\n    <ng-container *ngIf=\"!consumerSortingEnabled\">\n      <tr *ngFor=\"let result of resultView.results | ccdSortSearchResult : sortParameters | paginate: { itemsPerPage: paginationPageSize, currentPage: selected.page, totalItems: resultTotal }\">\n        <td *ngIf=\"selectionEnabled\" class=\"govuk-table__checkbox\" scope=\"col\">\n          <div class=\"govuk-checkboxes__item\">\n            <input class=\"govuk-checkboxes__input\" id=\"select-{{ result.case_id }}\" name=\"select-{{ result.case_id }}\"\n              type=\"checkbox\" (change)=\"changeSelection(result)\" [checked]=\"isSelected(result)\" [disabled]=\"!canBeShared(result)\" (keyup)=\"onKeyUp($event, result)\" />\n            <label class=\"govuk-label govuk-checkboxes__label\" for=\"select-{{ result.case_id }}\">\n            </label>\n          </div>\n        </td>\n        <td class=\"search-result-column-cell\" *ngFor=\"let col of resultView.columns; let colIndex = index\" scope=\"row\">\n\n          <a *ngIf=\"colIndex == 0\" [routerLink]=\"prepareCaseLinkUrl(result.case_id)\"\n            attr.aria-label=\"go to case with Case reference:{{ result.case_id | ccdCaseReference }}\" class=\"govuk-link\">\n            <ng-container class=\"text-16\" *ngIf=\"!hideRows\">\n              <ccd-field-read *ngIf=\"draftPrefixOrGet(col, result); else case_reference\"\n                              ccdLabelSubstitutor [caseField]=\"getColumnsWithPrefix(result.columns[col.case_field_id], result)\"\n                              [contextFields]=\"result.hydrated_case_fields\"\n                              [elementsToSubstitute]=\"['value']\"></ccd-field-read>\n              <ng-template #case_reference>{{result.case_id | ccdCaseReference}}</ng-template>\n            </ng-container>\n          </a>\n          <div *ngIf=\"colIndex != 0\" class=\"text-16\" [style.visibility]=\"hideRows ? 'hidden' : 'visible'\">\n            <ccd-field-read ccdLabelSubstitutor\n                            [caseField]=\"result.columns[col.case_field_id]\"\n                            [contextFields]=\"result.hydrated_case_fields\"\n                            [elementsToSubstitute]=\"['value']\"></ccd-field-read>\n          </div>\n        </td>\n        <td *ngIf=\"activityEnabled()\">\n          <div [style.visibility]=\"hideRows ? 'hidden' : 'visible'\">\n            <ccd-activity [caseId]=\"result.case_id\" [displayMode]=\"ICON\"></ccd-activity>\n          </div>\n        </td>\n      </tr>\n    </ng-container>\n\n  </tbody>\n</table>\n\n<ccd-pagination\n  *ngIf=\"hasResults()\"\n  (pageChange)=\"goToPage($event)\"\n  [visibilityLabel]=\"hideRows ? 'hidden' : 'visible'\"\n  [autoHide]=\"true\"\n  [maxSize]=\"8\"\n  [screenReaderPaginationLabel]=\"'Pagination'\"\n  [screenReaderPageLabel]=\"page\"\n  [screenReaderCurrentLabel]=\"'You\\'re on page'\"></ccd-pagination>\n\n<div *ngIf=\"!(hasResults() || hasDrafts())\" class=\"notification\"\n[attr.aria-describedby]=\"'No cases found. Try using different filters.' | rpxTranslate\">\n{{'No cases found. Try using different filters.' | rpxTranslate}}\n</div>\n", styles: ["table thead tr th{vertical-align:top}table tbody tr td{font-size:16px;word-wrap:break-word}table tbody tr td a{float:left}table .caseid-col{white-space:nowrap}.notification{text-align:center;padding:30px 0;margin-top:75px}a:hover{color:#005ea5}.search-result-reset-link{padding-right:15px;padding-left:15px}.search-result-column-header{width:auto;width:initial;table-layout:normal}.search-result-column-header div{display:table-cell;width:auto}@media screen and (max-width: 379px){.search-result-column-header div{display:block;float:right}}.search-result-column-label{font-size:16px;font-weight:700;word-wrap:break-word;cursor:pointer;padding-right:15px}.search-result-column-sort{font-size:16px}.sort-widget{cursor:pointer;text-decoration:none;color:#231f20}span.heading-medium{margin-top:-20px}.govuk-table__checkbox{vertical-align:middle;padding-left:3px}#search-result-heading__text:focus{outline:none}\n"] }]
    }], function () { return [{ type: i1.SearchResultViewItemComparatorFactory }, { type: i2.AbstractAppConfig }, { type: i1.ActivityService }, { type: i3.CaseReferencePipe }, { type: i4.PlaceholderService }, { type: i1.BrowserService }, { type: i1.SessionStorageService }]; }, { caseLinkUrlTemplate: [{
            type: Input
        }], jurisdiction: [{
            type: Input
        }], caseType: [{
            type: Input
        }], caseState: [{
            type: Input
        }], caseFilterFG: [{
            type: Input
        }], resultView: [{
            type: Input
        }], page: [{
            type: Input
        }], paginationMetadata: [{
            type: Input
        }], metadataFields: [{
            type: Input
        }], selectionEnabled: [{
            type: Input
        }], showOnlySelected: [{
            type: Input
        }], preSelectedCases: [{
            type: Input
        }], consumerSortingEnabled: [{
            type: Input
        }], selection: [{
            type: Output
        }], changePage: [{
            type: Output
        }], clickCase: [{
            type: Output
        }], sortHandler: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvc2VhcmNoLXJlc3VsdC9zZWFyY2gtcmVzdWx0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9zZWFyY2gtcmVzdWx0L3NlYXJjaC1yZXN1bHQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ3RELE9BQU8sRUFDTCxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQzNDLFlBQVksRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQ1YsU0FBUyxFQUFFLGNBQWMsRUFDaEYsTUFBTSxjQUFjLENBQUM7QUFDdEIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLHFDQUFxQyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7SUNOM0gsK0JBQXlGLGVBQUE7SUFDN0IsaUJBQUM7SUFBQSxpQkFBTztJQUNsRSxrQ0FBeUMsZUFBQTtJQUNLLFlBQTRCOztJQUFBLGlCQUFPO0lBQy9FLFlB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LFlBQVk7a0JBRGxCLEtBQUs7WUFJQyxVQUFVO2tCQURoQixLQUFLO1lBSUMsSUFBSTtrQkFEVixLQUFLO1lBSUMsa0JBQWtCO2tCQUR4QixLQUFLO1lBSUMsY0FBYztrQkFEcEIsS0FBSztZQUlDLGdCQUFnQjtrQkFEdEIsS0FBSztZQUlDLGdCQUFnQjtrQkFEdEIsS0FBSztZQUlDLGdCQUFnQjtrQkFEdEIsS0FBSztZQUlDLHNCQUFzQjtrQkFENUIsS0FBSztZQUlDLFNBQVM7a0JBRGYsTUFBTTtZQUlBLFVBQVU7a0JBRGhCLE1BQU07WUFJQSxTQUFTO2tCQURmLE1BQU07WUFJQSxXQUFXO2tCQURqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVbnR5cGVkRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWJzdHJhY3RBcHBDb25maWcgfSBmcm9tICcuLi8uLi8uLi9hcHAuY29uZmlnJztcbmltcG9ydCB7IFBsYWNlaG9sZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMnO1xuaW1wb3J0IHtcbiAgQ2FzZUZpZWxkLCBDYXNlU3RhdGUsIENhc2VUeXBlLCBEaXNwbGF5TW9kZSxcbiAgRFJBRlRfUFJFRklYLCBKdXJpc2RpY3Rpb24sIFBhZ2luYXRpb25NZXRhZGF0YSwgU2VhcmNoUmVzdWx0VmlldywgU2VhcmNoUmVzdWx0Vmlld0NvbHVtbixcbiAgU2VhcmNoUmVzdWx0Vmlld0l0ZW0sIFNlYXJjaFJlc3VsdFZpZXdJdGVtQ29tcGFyYXRvciwgU29ydE9yZGVyLCBTb3J0UGFyYW1ldGVyc1xufSBmcm9tICcuLi8uLi9kb21haW4nO1xuaW1wb3J0IHsgQ2FzZVJlZmVyZW5jZVBpcGUgfSBmcm9tICcuLi8uLi9waXBlcyc7XG5pbXBvcnQgeyBBY3Rpdml0eVNlcnZpY2UsIEJyb3dzZXJTZXJ2aWNlLCBTZWFyY2hSZXN1bHRWaWV3SXRlbUNvbXBhcmF0b3JGYWN0b3J5LCBTZXNzaW9uU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1zZWFyY2gtcmVzdWx0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1yZXN1bHQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zZWFyY2gtcmVzdWx0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoUmVzdWx0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xuXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUEFSQU1fSlVSSVNESUNUSU9OID0gJ2p1cmlzZGljdGlvbic7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUEFSQU1fQ0FTRV9UWVBFID0gJ2Nhc2UtdHlwZSc7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgUEFSQU1fQ0FTRV9TVEFURSA9ICdjYXNlLXN0YXRlJztcblxuICBwcml2YXRlIHJlYWRvbmx5IFBBR0lOQVRJT05fTUFYX0lURU1fUkVTVUxUID0gMTAwMDA7XG5cbiAgcHVibGljIElDT04gPSBEaXNwbGF5TW9kZS5JQ09OO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjYXNlTGlua1VybFRlbXBsYXRlOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGp1cmlzZGljdGlvbjogSnVyaXNkaWN0aW9uO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjYXNlVHlwZTogQ2FzZVR5cGU7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGNhc2VTdGF0ZTogQ2FzZVN0YXRlO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjYXNlRmlsdGVyRkc6IFVudHlwZWRGb3JtR3JvdXA7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHJlc3VsdFZpZXc6IFNlYXJjaFJlc3VsdFZpZXc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHBhZ2U6IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgcGFnaW5hdGlvbk1ldGFkYXRhOiBQYWdpbmF0aW9uTWV0YWRhdGE7XG5cbiAgQElucHV0KClcbiAgcHVibGljIG1ldGFkYXRhRmllbGRzOiBzdHJpbmdbXTtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2VsZWN0aW9uRW5hYmxlZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzaG93T25seVNlbGVjdGVkID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHByZVNlbGVjdGVkQ2FzZXM6IFNlYXJjaFJlc3VsdFZpZXdJdGVtW10gPSBbXTtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgY29uc3VtZXJTb3J0aW5nRW5hYmxlZCA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgc2VsZWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjxTZWFyY2hSZXN1bHRWaWV3SXRlbVtdPigpO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgY2hhbmdlUGFnZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBjbGlja0Nhc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgc29ydEhhbmRsZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHB1YmxpYyBwYWdpbmF0aW9uTGltaXRFbmZvcmNlZCA9IGZhbHNlO1xuXG4gIHB1YmxpYyBwYWdpbmF0aW9uUGFnZVNpemU6IG51bWJlcjtcblxuICBwdWJsaWMgaGlkZVJvd3M6IGJvb2xlYW47XG5cbiAgcHVibGljIHNlbGVjdGVkOiB7XG4gICAgaW5pdD86IGJvb2xlYW4sXG4gICAganVyaXNkaWN0aW9uPzogSnVyaXNkaWN0aW9uLFxuICAgIGNhc2VUeXBlPzogQ2FzZVR5cGUsXG4gICAgY2FzZVN0YXRlPzogQ2FzZVN0YXRlLFxuICAgIGZvcm1Hcm91cD86IFVudHlwZWRGb3JtR3JvdXAsXG4gICAgbWV0YWRhdGFGaWVsZHM/OiBzdHJpbmdbXSxcbiAgICBwYWdlPzogbnVtYmVyXG4gIH0gPSB7fTtcblxuICBwdWJsaWMgc29ydFBhcmFtZXRlcnM6IFNvcnRQYXJhbWV0ZXJzO1xuICBwdWJsaWMgc2VhcmNoUmVzdWx0Vmlld0l0ZW1Db21wYXJhdG9yRmFjdG9yeTogU2VhcmNoUmVzdWx0Vmlld0l0ZW1Db21wYXJhdG9yRmFjdG9yeTtcbiAgcHVibGljIGRyYWZ0c0NvdW50OiBudW1iZXI7XG5cbiAgcHVibGljIGNvbnN1bWVyU29ydFBhcmFtZXRlcnM6IHsgY29sdW1uOiBzdHJpbmcsIG9yZGVyOiBTb3J0T3JkZXIsIHR5cGU6IHN0cmluZyB9ID0geyBjb2x1bW46IG51bGwsIG9yZGVyOiBudWxsLCB0eXBlOiBudWxsIH07XG5cbiAgcHVibGljIHNlbGVjdGVkQ2FzZXM6IFNlYXJjaFJlc3VsdFZpZXdJdGVtW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBzZWFyY2hSZXN1bHRWaWV3SXRlbUNvbXBhcmF0b3JGYWN0b3J5OiBTZWFyY2hSZXN1bHRWaWV3SXRlbUNvbXBhcmF0b3JGYWN0b3J5LFxuICAgIGFwcENvbmZpZzogQWJzdHJhY3RBcHBDb25maWcsXG4gICAgcHJpdmF0ZSByZWFkb25seSBhY3Rpdml0eVNlcnZpY2U6IEFjdGl2aXR5U2VydmljZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNhc2VSZWZlcmVuY2VQaXBlOiBDYXNlUmVmZXJlbmNlUGlwZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHBsYWNlaG9sZGVyU2VydmljZTogUGxhY2Vob2xkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgYnJvd3NlclNlcnZpY2U6IEJyb3dzZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2Vzc2lvblN0b3JhZ2VTZXJ2aWNlOiBTZXNzaW9uU3RvcmFnZVNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5zZWFyY2hSZXN1bHRWaWV3SXRlbUNvbXBhcmF0b3JGYWN0b3J5ID0gc2VhcmNoUmVzdWx0Vmlld0l0ZW1Db21wYXJhdG9yRmFjdG9yeTtcbiAgICB0aGlzLnBhZ2luYXRpb25QYWdlU2l6ZSA9IGFwcENvbmZpZy5nZXRQYWdpbmF0aW9uUGFnZVNpemUoKTtcbiAgICB0aGlzLmhpZGVSb3dzID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucHJlU2VsZWN0ZWRDYXNlcykge1xuICAgICAgZm9yIChjb25zdCBwcmVTZWxlY3RlZENhc2Ugb2YgdGhpcy5wcmVTZWxlY3RlZENhc2VzKSB7XG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ2FzZXMgJiYgIXRoaXMuc2VsZWN0ZWRDYXNlcy5zb21lKGFDYXNlID0+IGFDYXNlLmNhc2VfaWQgPT09IHByZVNlbGVjdGVkQ2FzZS5jYXNlX2lkKSkge1xuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDYXNlcy5wdXNoKHByZVNlbGVjdGVkQ2FzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXNzaW9uU3RvcmFnZVNlcnZpY2UucmVtb3ZlSXRlbSgnZXZlbnRVcmwnKTtcbiAgICB0aGlzLnNlbGVjdGlvbi5lbWl0KHRoaXMuc2VsZWN0ZWRDYXNlcyk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuXG4gICAgaWYgKGNoYW5nZXNbJ3Jlc3VsdFZpZXcnXSkge1xuICAgICAgdGhpcy5oaWRlUm93cyA9IGZhbHNlO1xuXG4gICAgICB0aGlzLnNvcnRQYXJhbWV0ZXJzID0gdW5kZWZpbmVkO1xuICAgICAgLy8gQ2xvbmUgYHJlc3VsdFZpZXdgIHRvIHByZXZlbnQgc29ydGluZyB0aGUgZXh0ZXJuYWwgdmFyaWFibGVcbiAgICAgIHRoaXMucmVzdWx0VmlldyA9IHtcbiAgICAgICAgY29sdW1uczogdGhpcy5yZXN1bHRWaWV3LmNvbHVtbnMuc2xpY2UoMCksXG4gICAgICAgIHJlc3VsdHM6IHRoaXMucmVzdWx0Vmlldy5yZXN1bHRzLnNsaWNlKDApLFxuICAgICAgICBoYXNEcmFmdHM6IHRoaXMucmVzdWx0Vmlldy5oYXNEcmFmdHNcbiAgICAgIH07XG5cbiAgICAgIHRoaXMucmVzdWx0Vmlldy5jb2x1bW5zID0gdGhpcy5yZXN1bHRWaWV3LmNvbHVtbnMuc29ydCgoYTogU2VhcmNoUmVzdWx0Vmlld0NvbHVtbiwgYjogU2VhcmNoUmVzdWx0Vmlld0NvbHVtbikgPT4ge1xuICAgICAgICByZXR1cm4gYS5vcmRlciAtIGIub3JkZXI7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5oeWRyYXRlUmVzdWx0VmlldygpO1xuICAgICAgdGhpcy5kcmFmdHNDb3VudCA9IHRoaXMuZHJhZnRzQ291bnQgPyB0aGlzLmRyYWZ0c0NvdW50IDogdGhpcy5udW1iZXJPZkRyYWZ0cygpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1sncGFnZSddKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkLnBhZ2UgPSAoY2hhbmdlc1sncGFnZSddKS5jdXJyZW50VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCByZXN1bHRUb3RhbCgpOiBudW1iZXIge1xuICAgIGNvbnN0IHRvdGFsID0gdGhpcy5wYWdpbmF0aW9uTWV0YWRhdGEudG90YWxSZXN1bHRzQ291bnQ7XG4gICAgY29uc3QgbWF4aW11bVJlc3VsdFJlYWNoZWQgPSB0b3RhbCA+PSB0aGlzLlBBR0lOQVRJT05fTUFYX0lURU1fUkVTVUxUO1xuICAgIHRoaXMucGFnaW5hdGlvbkxpbWl0RW5mb3JjZWQgPSBtYXhpbXVtUmVzdWx0UmVhY2hlZDtcblxuICAgIHJldHVybiBtYXhpbXVtUmVzdWx0UmVhY2hlZCA/IHRoaXMuUEFHSU5BVElPTl9NQVhfSVRFTV9SRVNVTFQgOiB0b3RhbDtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhclNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLnNlbGVjdGVkQ2FzZXMgPSBbXTtcbiAgICB0aGlzLnNlbGVjdGlvbi5lbWl0KHRoaXMuc2VsZWN0ZWRDYXNlcyk7XG4gIH1cblxuICBwdWJsaWMgY2FuQmVTaGFyZWQoY2FzZVZpZXc6IFNlYXJjaFJlc3VsdFZpZXdJdGVtKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGNhc2VWaWV3LnN1cHBsZW1lbnRhcnlfZGF0YSAmJiBjYXNlVmlldy5zdXBwbGVtZW50YXJ5X2RhdGEuaGFzT3duUHJvcGVydHkoJ29yZ3NfYXNzaWduZWRfdXNlcnMnKTtcbiAgfVxuXG4gIHB1YmxpYyBjYW5BbnlCZVNoYXJlZCgpOiBib29sZWFuIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMucmVzdWx0Vmlldy5yZXN1bHRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKHRoaXMuY2FuQmVTaGFyZWQodGhpcy5yZXN1bHRWaWV3LnJlc3VsdHNbaV0pKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0QWxsKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFsbE9uUGFnZVNlbGVjdGVkKCkpIHtcbiAgICAgIC8vIGFsbCBjYXNlcyBhbHJlYWR5IHNlbGVjdGVkLCBzbyB1bnNlbGVjdCBhbGwgb24gdGhpcyBwYWdlXG4gICAgICB0aGlzLnJlc3VsdFZpZXcucmVzdWx0cy5mb3JFYWNoKGMgPT4ge1xuICAgICAgICB0aGlzLnNlbGVjdGVkQ2FzZXMuZm9yRWFjaCgocywgaSkgPT4ge1xuICAgICAgICAgIGlmIChjLmNhc2VfaWQgPT09IHMuY2FzZV9pZCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZENhc2VzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVzdWx0Vmlldy5yZXN1bHRzLmZvckVhY2goYyA9PiB7XG4gICAgICAgIGlmICghdGhpcy5pc1NlbGVjdGVkKGMpICYmIHRoaXMuY2FuQmVTaGFyZWQoYykpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FzZXMucHVzaChjKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0aW9uLmVtaXQodGhpcy5zZWxlY3RlZENhc2VzKTtcbiAgfVxuXG4gIHB1YmxpYyBjaGFuZ2VTZWxlY3Rpb24oYzogU2VhcmNoUmVzdWx0Vmlld0l0ZW0pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc1NlbGVjdGVkKGMpKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkQ2FzZXMuZm9yRWFjaCgocywgaSkgPT4ge1xuICAgICAgICBpZiAoYy5jYXNlX2lkID09PSBzLmNhc2VfaWQpIHtcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2FzZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY2FuQmVTaGFyZWQoYykpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhc2VzLnB1c2goYyk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0aW9uLmVtaXQodGhpcy5zZWxlY3RlZENhc2VzKTtcbiAgfVxuXG4gIHB1YmxpYyBpc1NlbGVjdGVkKGM6IFNlYXJjaFJlc3VsdFZpZXdJdGVtKTogYm9vbGVhbiB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLnNlbGVjdGVkQ2FzZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoYy5jYXNlX2lkID09PSB0aGlzLnNlbGVjdGVkQ2FzZXNbaV0uY2FzZV9pZCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGFsbE9uUGFnZVNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgIGxldCBjYW5CZVNoYXJlZENvdW50ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMucmVzdWx0Vmlldy5yZXN1bHRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgY29uc3QgciA9IHRoaXMucmVzdWx0Vmlldy5yZXN1bHRzW2ldO1xuICAgICAgaWYgKHRoaXMuY2FuQmVTaGFyZWQocikpIHtcbiAgICAgICAgY2FuQmVTaGFyZWRDb3VudCsrO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmlzU2VsZWN0ZWQocikgJiYgdGhpcy5jYW5CZVNoYXJlZChyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjYW5CZVNoYXJlZENvdW50ID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEh5ZHJhdGVzIHJlc3VsdCB2aWV3IHdpdGggY2FzZSBmaWVsZCBkZWZpbml0aW9ucy5cbiAgICovXG4gIC8vIEEgbG9uZ2VyIHRlcm0gcmVzb2x1dGlvbiBpcyB0byBtb3ZlIHRoaXMgcGllY2Ugb2YgbG9naWMgdG8gdGhlIGJhY2tlbmRcbiAgcHVibGljIGh5ZHJhdGVSZXN1bHRWaWV3KCk6IHZvaWQge1xuICAgIHRoaXMucmVzdWx0Vmlldy5yZXN1bHRzLmZvckVhY2gocmVzdWx0ID0+IHtcbiAgICAgIGNvbnN0IGNhc2VGaWVsZHMgPSBbXTtcblxuICAgICAgT2JqZWN0LmtleXMocmVzdWx0LmNhc2VfZmllbGRzKS5mb3JFYWNoKGZpZWxkSWQgPT4ge1xuXG4gICAgICAgIGNvbnN0IGZpZWxkID0gcmVzdWx0LmNhc2VfZmllbGRzW2ZpZWxkSWRdO1xuXG4gICAgICAgIGNhc2VGaWVsZHMucHVzaChPYmplY3QuYXNzaWduKG5ldyBDYXNlRmllbGQoKSwge1xuICAgICAgICAgIGlkOiBmaWVsZElkLFxuICAgICAgICAgIGxhYmVsOiBudWxsLFxuICAgICAgICAgIGZpZWxkX3R5cGU6IHt9LFxuICAgICAgICAgIHZhbHVlOiBmaWVsZCxcbiAgICAgICAgICBkaXNwbGF5X2NvbnRleHQ6IG51bGwsXG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXN1bHQuaHlkcmF0ZWRfY2FzZV9maWVsZHMgPSBjYXNlRmllbGRzO1xuICAgICAgcmVzdWx0LmNvbHVtbnMgPSB7fTtcblxuICAgICAgdGhpcy5yZXN1bHRWaWV3LmNvbHVtbnMuZm9yRWFjaChjb2wgPT4ge1xuICAgICAgICByZXN1bHQuY29sdW1uc1tjb2wuY2FzZV9maWVsZF9pZF0gPSB0aGlzLmJ1aWxkQ2FzZUZpZWxkKGNvbCwgcmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gIH1cblxuICBwdWJsaWMgZ29Ub1BhZ2UocGFnZSk6IHZvaWQge1xuICAgIHRoaXMuaGlkZVJvd3MgPSB0cnVlO1xuICAgIHRoaXMuc2VsZWN0ZWQuaW5pdCA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZWN0ZWQuanVyaXNkaWN0aW9uID0gdGhpcy5qdXJpc2RpY3Rpb247XG4gICAgdGhpcy5zZWxlY3RlZC5jYXNlVHlwZSA9IHRoaXMuY2FzZVR5cGU7XG4gICAgdGhpcy5zZWxlY3RlZC5jYXNlU3RhdGUgPSB0aGlzLmNhc2VTdGF0ZTtcbiAgICB0aGlzLnNlbGVjdGVkLmZvcm1Hcm91cCA9IHRoaXMuY2FzZUZpbHRlckZHO1xuICAgIHRoaXMuc2VsZWN0ZWQubWV0YWRhdGFGaWVsZHMgPSB0aGlzLm1ldGFkYXRhRmllbGRzO1xuICAgIHRoaXMuc2VsZWN0ZWQucGFnZSA9IHBhZ2U7XG4gICAgLy8gQXBwbHkgZmlsdGVyc1xuICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0ge307XG4gICAgcXVlcnlQYXJhbXNbU2VhcmNoUmVzdWx0Q29tcG9uZW50LlBBUkFNX0pVUklTRElDVElPTl0gPSB0aGlzLnNlbGVjdGVkLmp1cmlzZGljdGlvbiA/IHRoaXMuc2VsZWN0ZWQuanVyaXNkaWN0aW9uLmlkIDogbnVsbDtcbiAgICBxdWVyeVBhcmFtc1tTZWFyY2hSZXN1bHRDb21wb25lbnQuUEFSQU1fQ0FTRV9UWVBFXSA9IHRoaXMuc2VsZWN0ZWQuY2FzZVR5cGUgPyB0aGlzLnNlbGVjdGVkLmNhc2VUeXBlLmlkIDogbnVsbDtcbiAgICBxdWVyeVBhcmFtc1tTZWFyY2hSZXN1bHRDb21wb25lbnQuUEFSQU1fQ0FTRV9TVEFURV0gPSB0aGlzLnNlbGVjdGVkLmNhc2VTdGF0ZSA/IHRoaXMuc2VsZWN0ZWQuY2FzZVN0YXRlLmlkIDogbnVsbDtcbiAgICB0aGlzLmNoYW5nZVBhZ2UuZW1pdCh7XG4gICAgICBzZWxlY3RlZDogdGhpcy5zZWxlY3RlZCxcbiAgICAgIHF1ZXJ5UGFyYW1zXG4gICAgfSk7XG5cbiAgICBjb25zdCB0b3BDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wJyk7XG4gICAgaWYgKHRvcENvbnRhaW5lcikge1xuICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcbiAgICAgIH1cbiAgICAgIHRvcENvbnRhaW5lci5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBidWlsZENhc2VGaWVsZChjb2w6IFNlYXJjaFJlc3VsdFZpZXdDb2x1bW4sIHJlc3VsdDogU2VhcmNoUmVzdWx0Vmlld0l0ZW0pOiBDYXNlRmllbGQge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBDYXNlRmllbGQoKSwge1xuICAgICAgaWQ6IGNvbC5jYXNlX2ZpZWxkX2lkLFxuICAgICAgbGFiZWw6IGNvbC5sYWJlbCxcbiAgICAgIGZpZWxkX3R5cGU6IGNvbC5jYXNlX2ZpZWxkX3R5cGUsXG4gICAgICB2YWx1ZTogcmVzdWx0LmNhc2VfZmllbGRzW2NvbC5jYXNlX2ZpZWxkX2lkXSxcbiAgICAgIGRpc3BsYXlfY29udGV4dF9wYXJhbWV0ZXI6IGNvbC5kaXNwbGF5X2NvbnRleHRfcGFyYW1ldGVyLFxuICAgICAgZGlzcGxheV9jb250ZXh0OiBjb2wuZGlzcGxheV9jb250ZXh0LFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldENvbHVtbnNXaXRoUHJlZml4KGNvbDogQ2FzZUZpZWxkLCByZXN1bHQ6IFNlYXJjaFJlc3VsdFZpZXdJdGVtKTogQ2FzZUZpZWxkIHtcbiAgICBjb2wudmFsdWUgPSB0aGlzLmRyYWZ0UHJlZml4T3JHZXQoY29sLCByZXN1bHQpO1xuICAgIGNvbC52YWx1ZSA9IHRoaXMucGxhY2Vob2xkZXJTZXJ2aWNlLnJlc29sdmVQbGFjZWhvbGRlcnMocmVzdWx0LmNhc2VfZmllbGRzLCBjb2wudmFsdWUpO1xuICAgIHJldHVybiBjb2w7XG4gIH1cblxuICBwdWJsaWMgaGFzUmVzdWx0cygpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdFZpZXcucmVzdWx0cy5sZW5ndGggJiYgdGhpcy5wYWdpbmF0aW9uTWV0YWRhdGEudG90YWxQYWdlc0NvdW50O1xuICB9XG5cbiAgcHVibGljIGhhc0RyYWZ0cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHRWaWV3Lmhhc0RyYWZ0cygpO1xuICB9XG5cbiAgcHVibGljIGNvbXBhcmF0b3IoY29sdW1uOiBTZWFyY2hSZXN1bHRWaWV3Q29sdW1uKTogU2VhcmNoUmVzdWx0Vmlld0l0ZW1Db21wYXJhdG9yIHtcbiAgICByZXR1cm4gdGhpcy5zZWFyY2hSZXN1bHRWaWV3SXRlbUNvbXBhcmF0b3JGYWN0b3J5LmNyZWF0ZVNlYXJjaFJlc3VsdFZpZXdJdGVtQ29tcGFyYXRvcihjb2x1bW4pO1xuICB9XG5cbiAgcHVibGljIHNvcnQoY29sdW1uOiBTZWFyY2hSZXN1bHRWaWV3Q29sdW1uKSB7XG4gICAgaWYgKHRoaXMuY29uc3VtZXJTb3J0aW5nRW5hYmxlZCkge1xuICAgICAgaWYgKGNvbHVtbi5jYXNlX2ZpZWxkX2lkICE9PSB0aGlzLmNvbnN1bWVyU29ydFBhcmFtZXRlcnMuY29sdW1uKSB7XG4gICAgICAgIHRoaXMuY29uc3VtZXJTb3J0UGFyYW1ldGVycy5vcmRlciA9IFNvcnRPcmRlci5ERVNDRU5ESU5HO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jb25zdW1lclNvcnRQYXJhbWV0ZXJzLm9yZGVyID0gdGhpcy5jb25zdW1lclNvcnRQYXJhbWV0ZXJzLm9yZGVyID09PSBTb3J0T3JkZXIuREVTQ0VORElORyA/XG4gICAgICAgICAgU29ydE9yZGVyLkFTQ0VORElORyA6XG4gICAgICAgICAgU29ydE9yZGVyLkRFU0NFTkRJTkc7XG4gICAgICB9XG4gICAgICB0aGlzLmNvbnN1bWVyU29ydFBhcmFtZXRlcnMuY29sdW1uID0gY29sdW1uLmNhc2VfZmllbGRfaWQ7XG4gICAgICB0aGlzLmNvbnN1bWVyU29ydFBhcmFtZXRlcnMudHlwZSA9IGNvbHVtbi5jYXNlX2ZpZWxkX3R5cGUudHlwZTtcbiAgICAgIHRoaXMuc29ydEhhbmRsZXIuZW1pdCh0aGlzLmNvbnN1bWVyU29ydFBhcmFtZXRlcnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5jb21wYXJhdG9yKGNvbHVtbikgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuaXNTb3J0QXNjZW5kaW5nKGNvbHVtbikpIHtcbiAgICAgICAgdGhpcy5zb3J0UGFyYW1ldGVycyA9IG5ldyBTb3J0UGFyYW1ldGVycyh0aGlzLmNvbXBhcmF0b3IoY29sdW1uKSwgU29ydE9yZGVyLkFTQ0VORElORyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNvcnRQYXJhbWV0ZXJzID0gbmV3IFNvcnRQYXJhbWV0ZXJzKHRoaXMuY29tcGFyYXRvcihjb2x1bW4pLCBTb3J0T3JkZXIuREVTQ0VORElORyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNvcnRXaWRnZXQoY29sdW1uOiBTZWFyY2hSZXN1bHRWaWV3Q29sdW1uKSB7XG4gICAgbGV0IGNvbmRpdGlvbiA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmNvbnN1bWVyU29ydGluZ0VuYWJsZWQpIHtcbiAgICAgIGNvbnN0IGlzQ29sdW1uID0gY29sdW1uLmNhc2VfZmllbGRfaWQgPT09IHRoaXMuY29uc3VtZXJTb3J0UGFyYW1ldGVycy5jb2x1bW47XG4gICAgICBjb25zdCBpc0FzY2VuZGluZyA9IHRoaXMuY29uc3VtZXJTb3J0UGFyYW1ldGVycy5vcmRlciA9PT0gU29ydE9yZGVyLkFTQ0VORElORztcbiAgICAgIGNvbmRpdGlvbiA9ICFpc0NvbHVtbiB8fCAoaXNDb2x1bW4gJiYgaXNBc2NlbmRpbmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25kaXRpb24gPSB0aGlzLmlzU29ydEFzY2VuZGluZyhjb2x1bW4pO1xuICAgIH1cblxuICAgIHJldHVybiBjb25kaXRpb24gPyAnJiM5NjYwOycgOiAnJiM5NjUwOyc7XG4gIH1cblxuICBwdWJsaWMgYWN0aXZpdHlFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmFjdGl2aXR5U2VydmljZS5pc0VuYWJsZWQ7XG4gIH1cblxuICBwdWJsaWMgaHlwaGVuYXRlSWZDYXNlUmVmZXJlbmNlT3JHZXQoY29sLCByZXN1bHQpOiBhbnkge1xuICAgIGlmIChjb2wuY2FzZV9maWVsZF9pZCA9PT0gJ1tDQVNFX1JFRkVSRU5DRV0nKSB7XG4gICAgICByZXR1cm4gdGhpcy5jYXNlUmVmZXJlbmNlUGlwZS50cmFuc2Zvcm0ocmVzdWx0LmNhc2VfZmllbGRzW2NvbC5jYXNlX2ZpZWxkX2lkXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjb2wuaWQpIHtcbiAgICAgICAgaWYgKGNvbC5pZCA9PT0gJ1tDQVNFX1JFRkVSRU5DRV0nKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY2FzZVJlZmVyZW5jZVBpcGUudHJhbnNmb3JtKHJlc3VsdC5jYXNlX2ZpZWxkc1tjb2wuaWRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmNhc2VfZmllbGRzW2NvbC5pZF07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXN1bHQuY2FzZV9maWVsZHNbY29sLmNhc2VfZmllbGRfaWRdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcmFmdFByZWZpeE9yR2V0KGNvbCwgcmVzdWx0KTogYW55IHtcbiAgICByZXR1cm4gcmVzdWx0LmNhc2VfaWQuc3RhcnRzV2l0aChEUkFGVF9QUkVGSVgpID8gRFJBRlRfUFJFRklYIDogdGhpcy5oeXBoZW5hdGVJZkNhc2VSZWZlcmVuY2VPckdldChjb2wsIHJlc3VsdCk7XG4gIH1cblxuICBwdWJsaWMgaXNTb3J0QXNjZW5kaW5nKGNvbHVtbjogU2VhcmNoUmVzdWx0Vmlld0NvbHVtbik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGN1cnJlbnRTb3J0T3JkZXIgPSB0aGlzLmN1cnJlbnRTb3J0T3JkZXIoY29sdW1uKTtcblxuICAgIHJldHVybiBjdXJyZW50U29ydE9yZGVyID09PSBTb3J0T3JkZXIuVU5TT1JURUQgfHwgY3VycmVudFNvcnRPcmRlciA9PT0gU29ydE9yZGVyLkRFU0NFTkRJTkc7XG4gIH1cblxuICBwcml2YXRlIGN1cnJlbnRTb3J0T3JkZXIoY29sdW1uOiBTZWFyY2hSZXN1bHRWaWV3Q29sdW1uKTogU29ydE9yZGVyIHtcblxuICAgIGxldCBpc0FzY2VuZGluZyA9IHRydWU7XG4gICAgbGV0IGlzRGVzY2VuZGluZyA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5jb21wYXJhdG9yKGNvbHVtbikgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIFNvcnRPcmRlci5VTlNPUlRFRDtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnJlc3VsdFZpZXcucmVzdWx0cy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvbXBhcmlzb24gPSB0aGlzLmNvbXBhcmF0b3IoY29sdW1uKS5jb21wYXJlKHRoaXMucmVzdWx0Vmlldy5yZXN1bHRzW2ldLCB0aGlzLnJlc3VsdFZpZXcucmVzdWx0c1tpICsgMV0pO1xuICAgICAgaXNEZXNjZW5kaW5nID0gaXNEZXNjZW5kaW5nICYmIGNvbXBhcmlzb24gPD0gMDtcbiAgICAgIGlzQXNjZW5kaW5nID0gaXNBc2NlbmRpbmcgJiYgY29tcGFyaXNvbiA+PSAwO1xuICAgICAgaWYgKCFpc0FzY2VuZGluZyAmJiAhaXNEZXNjZW5kaW5nKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaXNBc2NlbmRpbmcgPyBTb3J0T3JkZXIuQVNDRU5ESU5HIDogaXNEZXNjZW5kaW5nID8gU29ydE9yZGVyLkRFU0NFTkRJTkcgOiBTb3J0T3JkZXIuVU5TT1JURUQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0Rmlyc3RSZXN1bHQoKTogbnVtYmVyIHtcbiAgICBjb25zdCBjdXJyZW50UGFnZSA9ICh0aGlzLnNlbGVjdGVkLnBhZ2UgPyB0aGlzLnNlbGVjdGVkLnBhZ2UgOiAxKTtcbiAgICByZXR1cm4gKChjdXJyZW50UGFnZSAtIDEpICogdGhpcy5wYWdpbmF0aW9uUGFnZVNpemUpICsgMSArIHRoaXMuZ2V0RHJhZnRzQ291bnRJZk5vdFBhZ2VPbmUoY3VycmVudFBhZ2UpO1xuICB9XG5cbiAgcHVibGljIGdldExhc3RSZXN1bHQoKTogbnVtYmVyIHtcbiAgICBjb25zdCBjdXJyZW50UGFnZSA9ICh0aGlzLnNlbGVjdGVkLnBhZ2UgPyB0aGlzLnNlbGVjdGVkLnBhZ2UgOiAxKTtcbiAgICByZXR1cm4gKChjdXJyZW50UGFnZSAtIDEpICogdGhpcy5wYWdpbmF0aW9uUGFnZVNpemUpICsgdGhpcy5yZXN1bHRWaWV3LnJlc3VsdHMubGVuZ3RoICsgdGhpcy5nZXREcmFmdHNDb3VudElmTm90UGFnZU9uZShjdXJyZW50UGFnZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0VG90YWxSZXN1bHRzKCk6IG51bWJlciB7XG4gICAgY29uc3QgdG90YWwgPSB0aGlzLnBhZ2luYXRpb25NZXRhZGF0YS50b3RhbFJlc3VsdHNDb3VudCArIHRoaXMuZHJhZnRzQ291bnQ7XG5cbiAgICByZXR1cm4gdG90YWwgPj0gdGhpcy5QQUdJTkFUSU9OX01BWF9JVEVNX1JFU1VMVCA/IHRoaXMuUEFHSU5BVElPTl9NQVhfSVRFTV9SRVNVTFQgOiB0b3RhbDtcbiAgfVxuXG4gIHB1YmxpYyBwcmVwYXJlQ2FzZUxpbmtVcmwoY2FzZUlkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCB1cmwgPSB0aGlzLmNhc2VMaW5rVXJsVGVtcGxhdGU7XG4gICAgdXJsID0gdXJsLnJlcGxhY2UoJ2p1cmlzZGljdGlvbl9pZCcsIHRoaXMuanVyaXNkaWN0aW9uLmlkKTtcbiAgICB1cmwgPSB1cmwucmVwbGFjZSgnY2FzZVR5cGVfaWQnLCB0aGlzLmNhc2VUeXBlLmlkKTtcbiAgICB1cmwgPSB1cmwucmVwbGFjZSgnY2FzZV9pZCcsIGNhc2VJZCk7XG5cbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREcmFmdHNDb3VudElmTm90UGFnZU9uZShjdXJyZW50UGFnZSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGN1cnJlbnRQYWdlID4gMSA/IHRoaXMuZHJhZnRzQ291bnQgOiAwO1xuICB9XG5cbiAgcHJpdmF0ZSBudW1iZXJPZkRyYWZ0cygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnJlc3VsdFZpZXcucmVzdWx0cy5maWx0ZXIoXyA9PiBfLmNhc2VfaWQuc3RhcnRzV2l0aChEUkFGVF9QUkVGSVgpKS5sZW5ndGg7XG4gIH1cblxuICBwdWJsaWMgZ29Ub0Nhc2UoY2FzZUlkOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNsaWNrQ2FzZS5lbWl0KHtcbiAgICAgIGNhc2VJZFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG9uS2V5VXAoJGV2ZW50OiBLZXlib2FyZEV2ZW50LCBjOiBTZWFyY2hSZXN1bHRWaWV3SXRlbSk6IHZvaWQge1xuICAgIGlmICgkZXZlbnQua2V5ID09PSAnU3BhY2UnKSB7XG4gICAgICBpZiAodGhpcy5icm93c2VyU2VydmljZS5pc0ZpcmVmb3ggfHwgdGhpcy5icm93c2VyU2VydmljZS5pc1NhZmFyaSB8fCB0aGlzLmJyb3dzZXJTZXJ2aWNlLmlzSUVPckVkZ2UpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VTZWxlY3Rpb24oYyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCI8dGFibGUgKm5nSWY9XCJoYXNSZXN1bHRzKCkgfHwgaGFzRHJhZnRzKClcIj5cbiAgPGNhcHRpb24+XG4gICAgPGgyIGNsYXNzPVwiaGVhZGluZy1oMlwiIGlkPVwic2VhcmNoLXJlc3VsdC1oZWFkaW5nX190ZXh0XCIgdGFiaW5kZXg9XCItMVwiPnt7IChjYXNlU3RhdGUgPyAnWW91ciBjYXNlcycgOiAnU2VhcmNoIHJlc3VsdCcpIHwgcnB4VHJhbnNsYXRlfX08L2gyPlxuXG4gICAgPGRpdiBjbGFzcz1cImdvdnVrLXdhcm5pbmctdGV4dCBwYWdpbmF0aW9uLWxpbWl0LXdhcm5pbmdcIiAqbmdJZj1cInBhZ2luYXRpb25MaW1pdEVuZm9yY2VkXCI+XG4gICAgICA8c3BhbiBjbGFzcz1cImdvdnVrLXdhcm5pbmctdGV4dF9faWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiE8L3NwYW4+XG4gICAgICA8c3Ryb25nIGNsYXNzPVwiZ292dWstd2FybmluZy10ZXh0X190ZXh0XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZ292dWstd2FybmluZy10ZXh0X19hc3Npc3RpdmVcIj57eydXYXJuaW5nJyB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICAgICAgICB7eydUaGUgdG90YWwgc2l6ZSBvZiB0aGUgcmVzdWx0IHNldCBpcycgfCBycHhUcmFuc2xhdGV9fSB7e3BhZ2luYXRpb25NZXRhZGF0YS50b3RhbFJlc3VsdHNDb3VudCB8IG51bWJlcn19LiB7eydPbmx5IHRoZSBmaXJzdCAxMCwwMDAgcmVjb3JkcyBhcmUgYXZhaWxhYmxlIGZvciBkaXNwbGF5LicgfCBycHhUcmFuc2xhdGV9fVxuICAgICAgPC9zdHJvbmc+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2ICpuZ0lmPVwiKGhhc1Jlc3VsdHMoKSB8fCBoYXNEcmFmdHMoKSlcIiBjbGFzcz1cInBhZ2luYXRpb24tdG9wXCJcbiAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJnZXRUb3RhbFJlc3VsdHMoKSArICcgcmVzdWx0cyBoYXZlIGJlZW4gZm91bmQnIHwgcnB4VHJhbnNsYXRlXCIgcm9sZT1cInN0YXR1c1wiPlxuICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LTE2XCIgaWQ9XCJzZWFyY2gtcmVzdWx0LXN1bW1hcnlfX3RleHRcIj57eydTaG93aW5nJyB8IHJweFRyYW5zbGF0ZX19XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+e3sgZ2V0Rmlyc3RSZXN1bHQoKSB9fTwvc3Bhbj5cbiAgICAgICAge3sndG8nIHwgcnB4VHJhbnNsYXRlfX1cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJnb3Z1ay0hLWZvbnQtd2VpZ2h0LWJvbGRcIj57eyBnZXRMYXN0UmVzdWx0KCkgfX08L3NwYW4+XG4gICAgICAgIHt7J29mJyB8IHJweFRyYW5zbGF0ZX19XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZ292dWstIS1mb250LXdlaWdodC1ib2xkXCI+e3sgZ2V0VG90YWxSZXN1bHRzKCkgfX08L3NwYW4+IHt7J3Jlc3VsdHMnIHwgcnB4VHJhbnNsYXRlfX08L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiAqbmdJZj1cIihoYXNSZXN1bHRzKCkgfHwgaGFzRHJhZnRzKCkpICYmIHNlbGVjdGlvbkVuYWJsZWRcIiBjbGFzcz1cInJlc2V0LXNlbGVjdGlvblwiXG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCInUmVzZXQgc2VsZWN0aW9uJyB8IHJweFRyYW5zbGF0ZVwiPlxuICAgICAgPHNwYW4+PGEgY2xhc3M9XCJzZWFyY2gtcmVzdWx0LXJlc2V0LWxpbmtcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgKGNsaWNrKT1cImNsZWFyU2VsZWN0aW9uKClcIj57eydSZXNldCBjYXNlIHNlbGVjdGlvbicgfCBycHhUcmFuc2xhdGV9fTwvYT48L3NwYW4+XG4gICAgPC9kaXY+XG4gIDwvY2FwdGlvbj5cbiAgPHRoZWFkPlxuICAgIDx0ciBzY29wZT1cInJvd1wiPlxuICAgICAgPHRoICpuZ0lmPVwic2VsZWN0aW9uRW5hYmxlZFwiIGNsYXNzPVwiZ292dWstdGFibGVfX2NoZWNrYm94XCIgc2NvcGU9XCJjb2xcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWNoZWNrYm94ZXNfX2l0ZW1cIj5cbiAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJnb3Z1ay1jaGVja2JveGVzX19pbnB1dFwiIGlkPVwic2VsZWN0LWFsbFwiIG5hbWU9XCJzZWxlY3QtYWxsXCIgdHlwZT1cImNoZWNrYm94XCIgKGNoYW5nZSk9XCJzZWxlY3RBbGwoKVwiIFtjaGVja2VkXT1cImFsbE9uUGFnZVNlbGVjdGVkKClcIiBbZGlzYWJsZWRdPVwiIWNhbkFueUJlU2hhcmVkKClcIiAvPlxuICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImdvdnVrLWxhYmVsIGdvdnVrLWNoZWNrYm94ZXNfX2xhYmVsXCIgZm9yPVwic2VsZWN0LWFsbFwiPlxuICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC90aD5cbiAgICAgIDx0aCAqbmdGb3I9XCJsZXQgY29sIG9mIHJlc3VsdFZpZXcuY29sdW1uc1wiPlxuICAgICAgICA8dGFibGUgY2xhc3M9XCJzZWFyY2gtcmVzdWx0LWNvbHVtbi1oZWFkZXJcIlxuICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiKCdTb3J0IGJ5ICcgKyBjb2wubGFiZWwgKyAnICcgKyBpc1NvcnRBc2NlbmRpbmcoY29sKT8gJ2FzY2VuZGluZycgOiAnZGVzY2VuZGluZycpIHwgcnB4VHJhbnNsYXRlXCI+XG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRoPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoLXJlc3VsdC1jb2x1bW4tbGFiZWxcIiAoY2xpY2spPVwic29ydChjb2wpXCI+XG4gICAgICAgICAgICAgICAge3tjb2wubGFiZWwgfCBycHhUcmFuc2xhdGV9fVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImNvbXBhcmF0b3IoY29sKVwiIGNsYXNzPVwic2VhcmNoLXJlc3VsdC1jb2x1bW4tc29ydFwiPlxuICAgICAgICAgICAgICAgIDxhIChjbGljayk9XCJzb3J0KGNvbClcIiBjbGFzcz1cInNvcnQtd2lkZ2V0XCIgW2lubmVySFRNTF09XCJzb3J0V2lkZ2V0KGNvbClcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PC9hPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvdGg+XG4gICAgICA8dGggKm5nSWY9XCJhY3Rpdml0eUVuYWJsZWQoKVwiIHN0eWxlPVwid2lkdGg6IDExMHB4O1wiPjwvdGg+XG4gICAgPC90cj5cbiAgPC90aGVhZD5cblxuICA8dGJvZHk+XG4gICAgPCEtLSBzb3J0ZWQgYnkgY29uc3VtZXIgLS0+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbnN1bWVyU29ydGluZ0VuYWJsZWRcIj5cbiAgICAgIDx0ciAqbmdGb3I9XCJsZXQgcmVzdWx0IG9mIHJlc3VsdFZpZXcucmVzdWx0cyB8IHBhZ2luYXRlOiB7IGl0ZW1zUGVyUGFnZTogcGFnaW5hdGlvblBhZ2VTaXplLCBjdXJyZW50UGFnZTogc2VsZWN0ZWQucGFnZSwgdG90YWxJdGVtczogcmVzdWx0VG90YWwgfVwiPlxuICAgICAgICA8dGQgKm5nSWY9XCJzZWxlY3Rpb25FbmFibGVkXCIgY2xhc3M9XCJnb3Z1ay10YWJsZV9fY2hlY2tib3hcIiBzY29wZT1cImNvbFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJnb3Z1ay1jaGVja2JveGVzX19pdGVtXCI+XG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJnb3Z1ay1jaGVja2JveGVzX19pbnB1dFwiIGlkPVwic2VsZWN0LXt7IHJlc3VsdC5jYXNlX2lkIH19XCIgbmFtZT1cInNlbGVjdC17eyByZXN1bHQuY2FzZV9pZCB9fVwiXG4gICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiIChjaGFuZ2UpPVwiY2hhbmdlU2VsZWN0aW9uKHJlc3VsdClcIiBbY2hlY2tlZF09XCJpc1NlbGVjdGVkKHJlc3VsdClcIiBbZGlzYWJsZWRdPVwiIWNhbkJlU2hhcmVkKHJlc3VsdClcIiAvPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgZ292dWstY2hlY2tib3hlc19fbGFiZWxcIiBmb3I9XCJzZWxlY3Qte3sgcmVzdWx0LmNhc2VfaWQgfX1cIj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvdGQ+XG4gICAgICAgIDx0ZCBjbGFzcz1cInNlYXJjaC1yZXN1bHQtY29sdW1uLWNlbGxcIiAqbmdGb3I9XCJsZXQgY29sIG9mIHJlc3VsdFZpZXcuY29sdW1uczsgbGV0IGNvbEluZGV4ID0gaW5kZXhcIiBzY29wZT1cInJvd1wiPlxuICAgICAgICAgIDxhICpuZ0lmPVwiY29sSW5kZXggPT0gMFwiIFtyb3V0ZXJMaW5rXT1cInByZXBhcmVDYXNlTGlua1VybChyZXN1bHQuY2FzZV9pZClcIlxuICAgICAgICAgICAgYXR0ci5hcmlhLWxhYmVsPVwiZ28gdG8gY2FzZSB3aXRoIENhc2UgcmVmZXJlbmNlOnt7IHJlc3VsdC5jYXNlX2lkIHwgY2NkQ2FzZVJlZmVyZW5jZSB9fVwiIGNsYXNzPVwiZ292dWstbGlua1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciBjbGFzcz1cInRleHQtMTZcIiAqbmdJZj1cIiFoaWRlUm93c1wiPlxuICAgICAgICAgICAgICA8Y2NkLWZpZWxkLXJlYWQgKm5nSWY9XCJkcmFmdFByZWZpeE9yR2V0KGNvbCwgcmVzdWx0KTsgZWxzZSBjYXNlX3JlZmVyZW5jZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjY2RMYWJlbFN1YnN0aXR1dG9yIFtjYXNlRmllbGRdPVwiZ2V0Q29sdW1uc1dpdGhQcmVmaXgocmVzdWx0LmNvbHVtbnNbY29sLmNhc2VfZmllbGRfaWRdLCByZXN1bHQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjb250ZXh0RmllbGRzXT1cInJlc3VsdC5oeWRyYXRlZF9jYXNlX2ZpZWxkc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZWxlbWVudHNUb1N1YnN0aXR1dGVdPVwiWyd2YWx1ZSddXCI+PC9jY2QtZmllbGQtcmVhZD5cbiAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNjYXNlX3JlZmVyZW5jZT57e3Jlc3VsdC5jYXNlX2lkIHwgY2NkQ2FzZVJlZmVyZW5jZX19PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwiY29sSW5kZXggIT0gMFwiIGNsYXNzPVwidGV4dC0xNlwiIFtzdHlsZS52aXNpYmlsaXR5XT1cImhpZGVSb3dzID8gJ2hpZGRlbicgOiAndmlzaWJsZSdcIj5cbiAgICAgICAgICAgIDxjY2QtZmllbGQtcmVhZCBjY2RMYWJlbFN1YnN0aXR1dG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Nhc2VGaWVsZF09XCJyZXN1bHQuY29sdW1uc1tjb2wuY2FzZV9maWVsZF9pZF1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjb250ZXh0RmllbGRzXT1cInJlc3VsdC5oeWRyYXRlZF9jYXNlX2ZpZWxkc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VsZW1lbnRzVG9TdWJzdGl0dXRlXT1cIlsndmFsdWUnXVwiPjwvY2NkLWZpZWxkLXJlYWQ+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvdGQ+XG4gICAgICAgIDx0ZCAqbmdJZj1cImFjdGl2aXR5RW5hYmxlZCgpXCI+XG4gICAgICAgICAgPGRpdiBbc3R5bGUudmlzaWJpbGl0eV09XCJoaWRlUm93cyA/ICdoaWRkZW4nIDogJ3Zpc2libGUnXCI+XG4gICAgICAgICAgICA8Y2NkLWFjdGl2aXR5IFtjYXNlSWRdPVwicmVzdWx0LmNhc2VfaWRcIiBbZGlzcGxheU1vZGVdPVwiSUNPTlwiPjwvY2NkLWFjdGl2aXR5PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3RkPlxuICAgICAgPC90cj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8IS0tIHNvcnRlZCBieSB0b29sa2l0IC0tPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhY29uc3VtZXJTb3J0aW5nRW5hYmxlZFwiPlxuICAgICAgPHRyICpuZ0Zvcj1cImxldCByZXN1bHQgb2YgcmVzdWx0Vmlldy5yZXN1bHRzIHwgY2NkU29ydFNlYXJjaFJlc3VsdCA6IHNvcnRQYXJhbWV0ZXJzIHwgcGFnaW5hdGU6IHsgaXRlbXNQZXJQYWdlOiBwYWdpbmF0aW9uUGFnZVNpemUsIGN1cnJlbnRQYWdlOiBzZWxlY3RlZC5wYWdlLCB0b3RhbEl0ZW1zOiByZXN1bHRUb3RhbCB9XCI+XG4gICAgICAgIDx0ZCAqbmdJZj1cInNlbGVjdGlvbkVuYWJsZWRcIiBjbGFzcz1cImdvdnVrLXRhYmxlX19jaGVja2JveFwiIHNjb3BlPVwiY29sXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImdvdnVrLWNoZWNrYm94ZXNfX2l0ZW1cIj5cbiAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImdvdnVrLWNoZWNrYm94ZXNfX2lucHV0XCIgaWQ9XCJzZWxlY3Qte3sgcmVzdWx0LmNhc2VfaWQgfX1cIiBuYW1lPVwic2VsZWN0LXt7IHJlc3VsdC5jYXNlX2lkIH19XCJcbiAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCIgKGNoYW5nZSk9XCJjaGFuZ2VTZWxlY3Rpb24ocmVzdWx0KVwiIFtjaGVja2VkXT1cImlzU2VsZWN0ZWQocmVzdWx0KVwiIFtkaXNhYmxlZF09XCIhY2FuQmVTaGFyZWQocmVzdWx0KVwiIChrZXl1cCk9XCJvbktleVVwKCRldmVudCwgcmVzdWx0KVwiIC8+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBnb3Z1ay1jaGVja2JveGVzX19sYWJlbFwiIGZvcj1cInNlbGVjdC17eyByZXN1bHQuY2FzZV9pZCB9fVwiPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC90ZD5cbiAgICAgICAgPHRkIGNsYXNzPVwic2VhcmNoLXJlc3VsdC1jb2x1bW4tY2VsbFwiICpuZ0Zvcj1cImxldCBjb2wgb2YgcmVzdWx0Vmlldy5jb2x1bW5zOyBsZXQgY29sSW5kZXggPSBpbmRleFwiIHNjb3BlPVwicm93XCI+XG5cbiAgICAgICAgICA8YSAqbmdJZj1cImNvbEluZGV4ID09IDBcIiBbcm91dGVyTGlua109XCJwcmVwYXJlQ2FzZUxpbmtVcmwocmVzdWx0LmNhc2VfaWQpXCJcbiAgICAgICAgICAgIGF0dHIuYXJpYS1sYWJlbD1cImdvIHRvIGNhc2Ugd2l0aCBDYXNlIHJlZmVyZW5jZTp7eyByZXN1bHQuY2FzZV9pZCB8IGNjZENhc2VSZWZlcmVuY2UgfX1cIiBjbGFzcz1cImdvdnVrLWxpbmtcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgY2xhc3M9XCJ0ZXh0LTE2XCIgKm5nSWY9XCIhaGlkZVJvd3NcIj5cbiAgICAgICAgICAgICAgPGNjZC1maWVsZC1yZWFkICpuZ0lmPVwiZHJhZnRQcmVmaXhPckdldChjb2wsIHJlc3VsdCk7IGVsc2UgY2FzZV9yZWZlcmVuY2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2NkTGFiZWxTdWJzdGl0dXRvciBbY2FzZUZpZWxkXT1cImdldENvbHVtbnNXaXRoUHJlZml4KHJlc3VsdC5jb2x1bW5zW2NvbC5jYXNlX2ZpZWxkX2lkXSwgcmVzdWx0KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY29udGV4dEZpZWxkc109XCJyZXN1bHQuaHlkcmF0ZWRfY2FzZV9maWVsZHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2VsZW1lbnRzVG9TdWJzdGl0dXRlXT1cIlsndmFsdWUnXVwiPjwvY2NkLWZpZWxkLXJlYWQ+XG4gICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjY2FzZV9yZWZlcmVuY2U+e3tyZXN1bHQuY2FzZV9pZCB8IGNjZENhc2VSZWZlcmVuY2V9fTwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L2E+XG4gICAgICAgICAgPGRpdiAqbmdJZj1cImNvbEluZGV4ICE9IDBcIiBjbGFzcz1cInRleHQtMTZcIiBbc3R5bGUudmlzaWJpbGl0eV09XCJoaWRlUm93cyA/ICdoaWRkZW4nIDogJ3Zpc2libGUnXCI+XG4gICAgICAgICAgICA8Y2NkLWZpZWxkLXJlYWQgY2NkTGFiZWxTdWJzdGl0dXRvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjYXNlRmllbGRdPVwicmVzdWx0LmNvbHVtbnNbY29sLmNhc2VfZmllbGRfaWRdXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY29udGV4dEZpZWxkc109XCJyZXN1bHQuaHlkcmF0ZWRfY2FzZV9maWVsZHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtlbGVtZW50c1RvU3Vic3RpdHV0ZV09XCJbJ3ZhbHVlJ11cIj48L2NjZC1maWVsZC1yZWFkPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3RkPlxuICAgICAgICA8dGQgKm5nSWY9XCJhY3Rpdml0eUVuYWJsZWQoKVwiPlxuICAgICAgICAgIDxkaXYgW3N0eWxlLnZpc2liaWxpdHldPVwiaGlkZVJvd3MgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJ1wiPlxuICAgICAgICAgICAgPGNjZC1hY3Rpdml0eSBbY2FzZUlkXT1cInJlc3VsdC5jYXNlX2lkXCIgW2Rpc3BsYXlNb2RlXT1cIklDT05cIj48L2NjZC1hY3Rpdml0eT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvdHI+XG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgPC90Ym9keT5cbjwvdGFibGU+XG5cbjxjY2QtcGFnaW5hdGlvblxuICAqbmdJZj1cImhhc1Jlc3VsdHMoKVwiXG4gIChwYWdlQ2hhbmdlKT1cImdvVG9QYWdlKCRldmVudClcIlxuICBbdmlzaWJpbGl0eUxhYmVsXT1cImhpZGVSb3dzID8gJ2hpZGRlbicgOiAndmlzaWJsZSdcIlxuICBbYXV0b0hpZGVdPVwidHJ1ZVwiXG4gIFttYXhTaXplXT1cIjhcIlxuICBbc2NyZWVuUmVhZGVyUGFnaW5hdGlvbkxhYmVsXT1cIidQYWdpbmF0aW9uJ1wiXG4gIFtzY3JlZW5SZWFkZXJQYWdlTGFiZWxdPVwicGFnZVwiXG4gIFtzY3JlZW5SZWFkZXJDdXJyZW50TGFiZWxdPVwiJ1lvdVxcJ3JlIG9uIHBhZ2UnXCI+PC9jY2QtcGFnaW5hdGlvbj5cblxuPGRpdiAqbmdJZj1cIiEoaGFzUmVzdWx0cygpIHx8IGhhc0RyYWZ0cygpKVwiIGNsYXNzPVwibm90aWZpY2F0aW9uXCJcblthdHRyLmFyaWEtZGVzY3JpYmVkYnldPVwiJ05vIGNhc2VzIGZvdW5kLiBUcnkgdXNpbmcgZGlmZmVyZW50IGZpbHRlcnMuJyB8IHJweFRyYW5zbGF0ZVwiPlxue3snTm8gY2FzZXMgZm91bmQuIFRyeSB1c2luZyBkaWZmZXJlbnQgZmlsdGVycy4nIHwgcnB4VHJhbnNsYXRlfX1cbjwvZGl2PlxuIl19