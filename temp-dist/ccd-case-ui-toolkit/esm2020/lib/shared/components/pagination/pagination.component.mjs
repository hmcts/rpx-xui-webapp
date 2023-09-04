import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "ngx-pagination";
import * as i3 from "rpx-xui-translation";
function PaginationComponent_ul_4_li_2_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 12);
    i0.ɵɵlistener("keyup.enter", function PaginationComponent_ul_4_li_2_a_1_Template_a_keyup_enter_0_listener() { i0.ɵɵrestoreView(_r8); i0.ɵɵnextContext(3); const _r0 = i0.ɵɵreference(1); return i0.ɵɵresetView(_r0.previous()); })("click", function PaginationComponent_ul_4_li_2_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r8); i0.ɵɵnextContext(3); const _r0 = i0.ɵɵreference(1); return i0.ɵɵresetView(_r0.previous()); });
    i0.ɵɵpipe(1, "rpxTranslate");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementStart(4, "span", 13);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext(3);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 3, ctx_r5.previousLabel + " " + ctx_r5.screenReaderPageLabel));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 5, ctx_r5.previousLabel), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 7, ctx_r5.screenReaderPageLabel));
} }
function PaginationComponent_ul_4_li_2_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementStart(3, "span", 13);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r6 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 2, ctx_r6.previousLabel), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 4, ctx_r6.screenReaderPageLabel));
} }
function PaginationComponent_ul_4_li_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 9);
    i0.ɵɵtemplate(1, PaginationComponent_ul_4_li_2_a_1_Template, 7, 9, "a", 10);
    i0.ɵɵtemplate(2, PaginationComponent_ul_4_li_2_span_2_Template, 6, 6, "span", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext(2);
    const _r0 = i0.ɵɵreference(1);
    i0.ɵɵclassProp("disabled", _r0.isFirstPage());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", 1 < _r0.getCurrent());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", _r0.isFirstPage());
} }
function PaginationComponent_ul_4_li_5_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r15 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 12);
    i0.ɵɵlistener("keyup.enter", function PaginationComponent_ul_4_li_5_a_1_Template_a_keyup_enter_0_listener() { i0.ɵɵrestoreView(_r15); const page_r10 = i0.ɵɵnextContext().$implicit; i0.ɵɵnextContext(2); const _r0 = i0.ɵɵreference(1); return i0.ɵɵresetView(_r0.setCurrent(page_r10.value)); })("click", function PaginationComponent_ul_4_li_5_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r15); const page_r10 = i0.ɵɵnextContext().$implicit; i0.ɵɵnextContext(2); const _r0 = i0.ɵɵreference(1); return i0.ɵɵresetView(_r0.setCurrent(page_r10.value)); });
    i0.ɵɵelementStart(1, "span", 13);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "number");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const page_r10 = i0.ɵɵnextContext().$implicit;
    const ctx_r11 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(3, 2, ctx_r11.screenReaderPageLabel), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(page_r10.label === "..." ? page_r10.label : i0.ɵɵpipeBind2(6, 4, page_r10.label, ""));
} }
function PaginationComponent_ul_4_li_5_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "span", 13);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const page_r10 = i0.ɵɵnextContext().$implicit;
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", i0.ɵɵpipeBind1(3, 2, ctx_r12.screenReaderCurrentLabel), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(page_r10.label === "..." ? page_r10.label : i0.ɵɵpipeBind2(6, 4, page_r10.label, ""));
} }
function PaginationComponent_ul_4_li_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtemplate(1, PaginationComponent_ul_4_li_5_a_1_Template, 7, 7, "a", 10);
    i0.ɵɵtemplate(2, PaginationComponent_ul_4_li_5_ng_container_2_Template, 7, 7, "ng-container", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const page_r10 = ctx.$implicit;
    i0.ɵɵnextContext(2);
    const _r0 = i0.ɵɵreference(1);
    i0.ɵɵclassProp("current", _r0.getCurrent() === page_r10.value)("ellipsis", page_r10.label === "...");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", _r0.getCurrent() !== page_r10.value);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", _r0.getCurrent() === page_r10.value);
} }
function PaginationComponent_ul_4_li_6_a_1_Template(rf, ctx) { if (rf & 1) {
    const _r23 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 12);
    i0.ɵɵlistener("keyup.enter", function PaginationComponent_ul_4_li_6_a_1_Template_a_keyup_enter_0_listener() { i0.ɵɵrestoreView(_r23); i0.ɵɵnextContext(3); const _r0 = i0.ɵɵreference(1); return i0.ɵɵresetView(_r0.next()); })("click", function PaginationComponent_ul_4_li_6_a_1_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r23); i0.ɵɵnextContext(3); const _r0 = i0.ɵɵreference(1); return i0.ɵɵresetView(_r0.next()); });
    i0.ɵɵpipe(1, "rpxTranslate");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementStart(4, "span", 13);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r20 = i0.ɵɵnextContext(3);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 3, ctx_r20.nextLabel + " " + ctx_r20.screenReaderPageLabel));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 5, ctx_r20.nextLabel), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(6, 7, ctx_r20.screenReaderPageLabel));
} }
function PaginationComponent_ul_4_li_6_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementStart(3, "span", 13);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "rpxTranslate");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r21 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 2, ctx_r21.nextLabel), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 4, ctx_r21.screenReaderPageLabel));
} }
function PaginationComponent_ul_4_li_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li", 14);
    i0.ɵɵtemplate(1, PaginationComponent_ul_4_li_6_a_1_Template, 7, 9, "a", 10);
    i0.ɵɵtemplate(2, PaginationComponent_ul_4_li_6_span_2_Template, 6, 6, "span", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext(2);
    const _r0 = i0.ɵɵreference(1);
    i0.ɵɵclassProp("disabled", _r0.isLastPage());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !_r0.isLastPage());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", _r0.isLastPage());
} }
function PaginationComponent_ul_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ul", 4);
    i0.ɵɵpipe(1, "rpxTranslate");
    i0.ɵɵtemplate(2, PaginationComponent_ul_4_li_2_Template, 3, 4, "li", 5);
    i0.ɵɵelementStart(3, "li", 6);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, PaginationComponent_ul_4_li_5_Template, 3, 6, "li", 7);
    i0.ɵɵtemplate(6, PaginationComponent_ul_4_li_6_Template, 3, 4, "li", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    const _r0 = i0.ɵɵreference(1);
    i0.ɵɵclassProp("responsive", ctx_r1.responsive);
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 8, ctx_r1.screenReaderPaginationLabel));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.directionLinks);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2(" ", _r0.getCurrent(), " / ", _r0.getLastPage(), " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", _r0.pages);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r1.directionLinks);
} }
function coerceToBoolean(input) {
    return !!input && input !== 'false';
}
export class PaginationComponent {
    constructor() {
        this.maxSize = 7;
        this.previousLabel = 'Previous';
        this.nextLabel = 'Next';
        this.screenReaderPaginationLabel = 'Pagination';
        this.screenReaderPageLabel = 'page';
        this.screenReaderCurrentLabel = `You're on page`;
        this.pageChange = new EventEmitter();
        this.pageBoundsCorrection = new EventEmitter();
        this.pDirectionLinks = true;
        this.pAutoHide = false;
        this.pResponsive = false;
    }
    get directionLinks() {
        return this.pDirectionLinks;
    }
    set directionLinks(value) {
        this.pDirectionLinks = coerceToBoolean(value);
    }
    get autoHide() {
        return this.pAutoHide;
    }
    set autoHide(value) {
        this.pAutoHide = coerceToBoolean(value);
    }
    get responsive() {
        return this.pResponsive;
    }
    set responsive(value) {
        this.pResponsive = coerceToBoolean(value);
    }
}
PaginationComponent.ɵfac = function PaginationComponent_Factory(t) { return new (t || PaginationComponent)(); };
PaginationComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: PaginationComponent, selectors: [["ccd-pagination"]], inputs: { visibilityLabel: "visibilityLabel", id: "id", maxSize: "maxSize", previousLabel: "previousLabel", nextLabel: "nextLabel", screenReaderPaginationLabel: "screenReaderPaginationLabel", screenReaderPageLabel: "screenReaderPageLabel", screenReaderCurrentLabel: "screenReaderCurrentLabel", directionLinks: "directionLinks", autoHide: "autoHide", responsive: "responsive" }, outputs: { pageChange: "pageChange", pageBoundsCorrection: "pageBoundsCorrection" }, decls: 5, vars: 6, consts: [[3, "id", "maxSize", "pageChange", "pageBoundsCorrection"], ["p", "paginationApi"], ["role", "navigation"], ["class", "ngx-pagination", "role", "navigation", 3, "responsive", 4, "ngIf"], ["role", "navigation", 1, "ngx-pagination"], ["class", "pagination-previous", 3, "disabled", 4, "ngIf"], [1, "small-screen"], [3, "current", "ellipsis", 4, "ngFor", "ngForOf"], ["class", "pagination-next", 3, "disabled", 4, "ngIf"], [1, "pagination-previous"], ["tabindex", "0", 3, "keyup.enter", "click", 4, "ngIf"], [4, "ngIf"], ["tabindex", "0", 3, "keyup.enter", "click"], [1, "show-for-sr"], [1, "pagination-next"]], template: function PaginationComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "pagination-template", 0, 1);
        i0.ɵɵlistener("pageChange", function PaginationComponent_Template_pagination_template_pageChange_0_listener($event) { return ctx.pageChange.emit($event); })("pageBoundsCorrection", function PaginationComponent_Template_pagination_template_pageBoundsCorrection_0_listener($event) { return ctx.pageBoundsCorrection.emit($event); });
        i0.ɵɵelementStart(2, "nav", 2);
        i0.ɵɵpipe(3, "rpxTranslate");
        i0.ɵɵtemplate(4, PaginationComponent_ul_4_Template, 7, 10, "ul", 3);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        const _r0 = i0.ɵɵreference(1);
        i0.ɵɵproperty("id", ctx.id)("maxSize", ctx.maxSize);
        i0.ɵɵadvance(2);
        i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(3, 4, "Pagination"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", !(ctx.autoHide && _r0.pages.length <= 1));
    } }, dependencies: [i1.NgForOf, i1.NgIf, i2.PaginationControlsDirective, i1.DecimalPipe, i3.RpxTranslatePipe], styles: [".ngx-pagination[_ngcontent-%COMP%]{margin-left:0;margin-bottom:1rem;padding-top:25px;text-decoration:none;text-align:left;font-size:16px}.ngx-pagination[_ngcontent-%COMP%]:before, .ngx-pagination[_ngcontent-%COMP%]:after{content:\" \";display:table}.ngx-pagination[_ngcontent-%COMP%]:after{clear:both}.ngx-pagination[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;margin-right:.0625rem;border-radius:0}.ngx-pagination[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{display:inline-block}.ngx-pagination[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .ngx-pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{display:block;padding:.1875rem .625rem;border-radius:0;color:#005da6}.ngx-pagination[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, .ngx-pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover{background:#e6e6e6}.ngx-pagination[_ngcontent-%COMP%]   .current[_ngcontent-%COMP%]{padding:.1875rem .625rem;background:#fff;color:#4c2c92;cursor:default;font-weight:900}.ngx-pagination[_ngcontent-%COMP%]   .disabled[_ngcontent-%COMP%]{display:none}.ngx-pagination[_ngcontent-%COMP%]   .disabled[_ngcontent-%COMP%]:hover{background:transparent}.ngx-pagination[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .ngx-pagination[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{cursor:pointer}.ngx-pagination[_ngcontent-%COMP%]   .pagination-previous[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:before, .ngx-pagination[_ngcontent-%COMP%]   .pagination-previous.disabled[_ngcontent-%COMP%]:before{margin-right:.5rem;display:inline-block;height:10px;width:10px;border-style:solid;color:#0a0a0a;background:transparent;transform:rotate(-45deg);content:\"\";border-width:3px 0 0 3px}.ngx-pagination[_ngcontent-%COMP%]   .pagination-next[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:after, .ngx-pagination[_ngcontent-%COMP%]   .pagination-next.disabled[_ngcontent-%COMP%]:after{margin-left:.5rem;display:inline-block;height:10px;width:10px;border-style:solid;color:#0a0a0a;background:transparent;transform:rotate(-45deg);content:\"\";border-width:0 3px 3px 0}.ngx-pagination[_ngcontent-%COMP%]   .show-for-sr[_ngcontent-%COMP%]{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}.ngx-pagination[_ngcontent-%COMP%]   .small-screen[_ngcontent-%COMP%]{display:none}@media screen and (max-width: 601px){.ngx-pagination.responsive[_ngcontent-%COMP%]   .small-screen[_ngcontent-%COMP%]{display:inline-block}.ngx-pagination.responsive[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:not(.small-screen):not(.pagination-previous):not(.pagination-next){display:none}}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PaginationComponent, [{
        type: Component,
        args: [{ selector: 'ccd-pagination', template: "<pagination-template #p=\"paginationApi\" [id]=\"id\" [maxSize]=\"maxSize\" (pageChange)=\"pageChange.emit($event)\"\n  (pageBoundsCorrection)=\"pageBoundsCorrection.emit($event)\">\n  <nav role=\"navigation\" [attr.aria-label]=\"'Pagination' | rpxTranslate\">\n    <ul class=\"ngx-pagination\" role=\"navigation\" [attr.aria-label]=\"screenReaderPaginationLabel | rpxTranslate\"\n      [class.responsive]=\"responsive\" *ngIf=\"!(autoHide && p.pages.length <= 1)\">\n      <li class=\"pagination-previous\" [class.disabled]=\"p.isFirstPage()\" *ngIf=\"directionLinks\">\n        <a tabindex=\"0\" *ngIf=\"1 < p.getCurrent()\" (keyup.enter)=\"p.previous()\" (click)=\"p.previous()\"\n          [attr.aria-label]=\"previousLabel + ' ' + screenReaderPageLabel | rpxTranslate\">\n          {{ previousLabel | rpxTranslate }} <span class=\"show-for-sr\">{{ screenReaderPageLabel | rpxTranslate }}</span>\n        </a>\n        <span *ngIf=\"p.isFirstPage()\">\n          {{ previousLabel | rpxTranslate }} <span class=\"show-for-sr\">{{ screenReaderPageLabel | rpxTranslate }}</span>\n        </span>\n      </li>\n      <li class=\"small-screen\">\n        {{ p.getCurrent() }} / {{ p.getLastPage() }}\n      </li>\n      <li [class.current]=\"p.getCurrent() === page.value\" [class.ellipsis]=\"page.label === '...'\"\n        *ngFor=\"let page of p.pages\">\n        <a tabindex=\"0\" (keyup.enter)=\"p.setCurrent(page.value)\" (click)=\"p.setCurrent(page.value)\"\n          *ngIf=\"p.getCurrent() !== page.value\">\n          <span class=\"show-for-sr\">{{ screenReaderPageLabel | rpxTranslate }} </span>\n          <span>{{ (page.label === '...') ? page.label : (page.label | number:'') }}</span>\n        </a>\n        <ng-container *ngIf=\"p.getCurrent() === page.value\">\n          <span class=\"show-for-sr\">{{ screenReaderCurrentLabel | rpxTranslate }} </span>\n          <span>{{ (page.label === '...') ? page.label : (page.label | number:'') }}</span>\n        </ng-container>\n      </li>\n      <li class=\"pagination-next\" [class.disabled]=\"p.isLastPage()\" *ngIf=\"directionLinks\">\n        <a tabindex=\"0\" *ngIf=\"!p.isLastPage()\" (keyup.enter)=\"p.next()\" (click)=\"p.next()\"\n          [attr.aria-label]=\"nextLabel + ' ' + screenReaderPageLabel | rpxTranslate\">\n          {{ nextLabel | rpxTranslate }} <span class=\"show-for-sr\">{{ screenReaderPageLabel | rpxTranslate }}</span>\n        </a>\n        <span *ngIf=\"p.isLastPage()\">\n          {{ nextLabel | rpxTranslate }} <span class=\"show-for-sr\">{{ screenReaderPageLabel | rpxTranslate }}</span>\n        </span>\n      </li>\n    </ul>\n  </nav>\n</pagination-template>\n", styles: [".ngx-pagination{margin-left:0;margin-bottom:1rem;padding-top:25px;text-decoration:none;text-align:left;font-size:16px}.ngx-pagination:before,.ngx-pagination:after{content:\" \";display:table}.ngx-pagination:after{clear:both}.ngx-pagination li{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;margin-right:.0625rem;border-radius:0}.ngx-pagination li{display:inline-block}.ngx-pagination a,.ngx-pagination button{display:block;padding:.1875rem .625rem;border-radius:0;color:#005da6}.ngx-pagination a:hover,.ngx-pagination button:hover{background:#e6e6e6}.ngx-pagination .current{padding:.1875rem .625rem;background:#fff;color:#4c2c92;cursor:default;font-weight:900}.ngx-pagination .disabled{display:none}.ngx-pagination .disabled:hover{background:transparent}.ngx-pagination a,.ngx-pagination button{cursor:pointer}.ngx-pagination .pagination-previous a:before,.ngx-pagination .pagination-previous.disabled:before{margin-right:.5rem;display:inline-block;height:10px;width:10px;border-style:solid;color:#0a0a0a;background:transparent;transform:rotate(-45deg);content:\"\";border-width:3px 0 0 3px}.ngx-pagination .pagination-next a:after,.ngx-pagination .pagination-next.disabled:after{margin-left:.5rem;display:inline-block;height:10px;width:10px;border-style:solid;color:#0a0a0a;background:transparent;transform:rotate(-45deg);content:\"\";border-width:0 3px 3px 0}.ngx-pagination .show-for-sr{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}.ngx-pagination .small-screen{display:none}@media screen and (max-width: 601px){.ngx-pagination.responsive .small-screen{display:inline-block}.ngx-pagination.responsive li:not(.small-screen):not(.pagination-previous):not(.pagination-next){display:none}}\n"] }]
    }], null, { visibilityLabel: [{
            type: Input
        }], id: [{
            type: Input
        }], maxSize: [{
            type: Input
        }], previousLabel: [{
            type: Input
        }], nextLabel: [{
            type: Input
        }], screenReaderPaginationLabel: [{
            type: Input
        }], screenReaderPageLabel: [{
            type: Input
        }], screenReaderCurrentLabel: [{
            type: Input
        }], pageChange: [{
            type: Output
        }], pageBoundsCorrection: [{
            type: Output
        }], directionLinks: [{
            type: Input
        }], autoHide: [{
            type: Input
        }], responsive: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWdpbmF0aW9uL3BhZ2luYXRpb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7OztJQ00vRCw2QkFDaUY7SUFEdEMsZ01BQWUsZUFBQSxjQUFZLENBQUEsSUFBQyx1S0FBVSxlQUFBLGNBQVksQ0FBQSxJQUF0Qjs7SUFFckUsWUFBbUM7O0lBQUEsZ0NBQTBCO0lBQUEsWUFBMEM7O0lBQUEsaUJBQU8sRUFBQTs7O0lBRDlHLDZHQUE4RTtJQUM5RSxlQUFtQztJQUFuQywyRUFBbUM7SUFBMEIsZUFBMEM7SUFBMUMsd0VBQTBDOzs7SUFFekcsNEJBQThCO0lBQzVCLFlBQW1DOztJQUFBLGdDQUEwQjtJQUFBLFlBQTBDOztJQUFBLGlCQUFPLEVBQUE7OztJQUE5RyxlQUFtQztJQUFuQywyRUFBbUM7SUFBMEIsZUFBMEM7SUFBMUMsd0VBQTBDOzs7SUFOM0csNkJBQTBGO0lBQ3hGLDJFQUdJO0lBQ0osaUZBRU87SUFDVCxpQkFBSzs7OztJQVIyQiw2Q0FBa0M7SUFDL0MsZUFBd0I7SUFBeEIsMkNBQXdCO0lBSWxDLGVBQXFCO0lBQXJCLHdDQUFxQjs7OztJQVM1Qiw2QkFDd0M7SUFEeEIsZ1BBQWUsZUFBQSw4QkFBd0IsQ0FBQSxJQUFDLHVOQUFVLGVBQUEsOEJBQXdCLENBQUEs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QUFVO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBVyxVQUFVLENBQUMsS0FBYztRQUNsQyxJQUFJLENBQUMsV0FBVyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDOztzRkExQ1UsbUJBQW1CO3NFQUFuQixtQkFBbUI7UUNYaEMsaURBQzZEO1FBRFMsNkhBQWMsMkJBQXVCLElBQUMsb0lBQ2xGLHFDQUFpQyxJQURpRDtRQUUxRyw4QkFBdUU7O1FBQ3JFLG1FQW1DSztRQUNQLGlCQUFNLEVBQUE7OztRQXZDZ0MsMkJBQVMsd0JBQUE7UUFFeEIsZUFBK0M7UUFBL0MsZ0VBQStDO1FBRWpDLGVBQXdDO1FBQXhDLCtEQUF3Qzs7dUZET2xFLG1CQUFtQjtjQUwvQixTQUFTOzJCQUNFLGdCQUFnQjtnQkFNbkIsZUFBZTtrQkFEckIsS0FBSztZQUVVLEVBQUU7a0JBQWpCLEtBQUs7WUFDVSxPQUFPO2tCQUF0QixLQUFLO1lBQ1UsYUFBYTtrQkFBNUIsS0FBSztZQUNVLFNBQVM7a0JBQXhCLEtBQUs7WUFDVSwyQkFBMkI7a0JBQTFDLEtBQUs7WUFDVSxxQkFBcUI7a0JBQXBDLEtBQUs7WUFDVSx3QkFBd0I7a0JBQXZDLEtBQUs7WUFDVyxVQUFVO2tCQUExQixNQUFNO1lBQ1Usb0JBQW9CO2tCQUFwQyxNQUFNO1lBT0ksY0FBYztrQkFEeEIsS0FBSztZQVVLLFFBQVE7a0JBRGxCLEtBQUs7WUFVSyxVQUFVO2tCQURwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZnVuY3Rpb24gY29lcmNlVG9Cb29sZWFuKGlucHV0OiBzdHJpbmcgfCBib29sZWFuKTogYm9vbGVhbiB7XG4gIHJldHVybiAhIWlucHV0ICYmIGlucHV0ICE9PSAnZmFsc2UnO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtcGFnaW5hdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9wYWdpbmF0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcGFnaW5hdGlvbi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2luYXRpb25Db21wb25lbnQge1xuICBASW5wdXQoKVxuICBwdWJsaWMgdmlzaWJpbGl0eUxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHB1YmxpYyBpZDogc3RyaW5nO1xuICBASW5wdXQoKSBwdWJsaWMgbWF4U2l6ZSA9IDc7XG4gIEBJbnB1dCgpIHB1YmxpYyBwcmV2aW91c0xhYmVsID0gJ1ByZXZpb3VzJztcbiAgQElucHV0KCkgcHVibGljIG5leHRMYWJlbCA9ICdOZXh0JztcbiAgQElucHV0KCkgcHVibGljIHNjcmVlblJlYWRlclBhZ2luYXRpb25MYWJlbCA9ICdQYWdpbmF0aW9uJztcbiAgQElucHV0KCkgcHVibGljIHNjcmVlblJlYWRlclBhZ2VMYWJlbCA9ICdwYWdlJztcbiAgQElucHV0KCkgcHVibGljIHNjcmVlblJlYWRlckN1cnJlbnRMYWJlbCA9IGBZb3UncmUgb24gcGFnZWA7XG4gIEBPdXRwdXQoKSBwdWJsaWMgcGFnZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgQE91dHB1dCgpIHB1YmxpYyBwYWdlQm91bmRzQ29ycmVjdGlvbjogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBwcml2YXRlIHBEaXJlY3Rpb25MaW5rcyA9IHRydWU7XG4gIHByaXZhdGUgcEF1dG9IaWRlID0gZmFsc2U7XG4gIHByaXZhdGUgcFJlc3BvbnNpdmUgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IGRpcmVjdGlvbkxpbmtzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBEaXJlY3Rpb25MaW5rcztcbiAgfVxuXG4gIHB1YmxpYyBzZXQgZGlyZWN0aW9uTGlua3ModmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnBEaXJlY3Rpb25MaW5rcyA9IGNvZXJjZVRvQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IGF1dG9IaWRlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBBdXRvSGlkZTtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgYXV0b0hpZGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnBBdXRvSGlkZSA9IGNvZXJjZVRvQm9vbGVhbih2YWx1ZSk7XG4gIH1cblxuICBASW5wdXQoKVxuICBwdWJsaWMgZ2V0IHJlc3BvbnNpdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucFJlc3BvbnNpdmU7XG4gIH1cblxuICBwdWJsaWMgc2V0IHJlc3BvbnNpdmUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnBSZXNwb25zaXZlID0gY29lcmNlVG9Cb29sZWFuKHZhbHVlKTtcbiAgfVxufVxuIiwiPHBhZ2luYXRpb24tdGVtcGxhdGUgI3A9XCJwYWdpbmF0aW9uQXBpXCIgW2lkXT1cImlkXCIgW21heFNpemVdPVwibWF4U2l6ZVwiIChwYWdlQ2hhbmdlKT1cInBhZ2VDaGFuZ2UuZW1pdCgkZXZlbnQpXCJcbiAgKHBhZ2VCb3VuZHNDb3JyZWN0aW9uKT1cInBhZ2VCb3VuZHNDb3JyZWN0aW9uLmVtaXQoJGV2ZW50KVwiPlxuICA8bmF2IHJvbGU9XCJuYXZpZ2F0aW9uXCIgW2F0dHIuYXJpYS1sYWJlbF09XCInUGFnaW5hdGlvbicgfCBycHhUcmFuc2xhdGVcIj5cbiAgICA8dWwgY2xhc3M9XCJuZ3gtcGFnaW5hdGlvblwiIHJvbGU9XCJuYXZpZ2F0aW9uXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJzY3JlZW5SZWFkZXJQYWdpbmF0aW9uTGFiZWwgfCBycHhUcmFuc2xhdGVcIlxuICAgICAgW2NsYXNzLnJlc3BvbnNpdmVdPVwicmVzcG9uc2l2ZVwiICpuZ0lmPVwiIShhdXRvSGlkZSAmJiBwLnBhZ2VzLmxlbmd0aCA8PSAxKVwiPlxuICAgICAgPGxpIGNsYXNzPVwicGFnaW5hdGlvbi1wcmV2aW91c1wiIFtjbGFzcy5kaXNhYmxlZF09XCJwLmlzRmlyc3RQYWdlKClcIiAqbmdJZj1cImRpcmVjdGlvbkxpbmtzXCI+XG4gICAgICAgIDxhIHRhYmluZGV4PVwiMFwiICpuZ0lmPVwiMSA8IHAuZ2V0Q3VycmVudCgpXCIgKGtleXVwLmVudGVyKT1cInAucHJldmlvdXMoKVwiIChjbGljayk9XCJwLnByZXZpb3VzKClcIlxuICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwicHJldmlvdXNMYWJlbCArICcgJyArIHNjcmVlblJlYWRlclBhZ2VMYWJlbCB8IHJweFRyYW5zbGF0ZVwiPlxuICAgICAgICAgIHt7IHByZXZpb3VzTGFiZWwgfCBycHhUcmFuc2xhdGUgfX0gPHNwYW4gY2xhc3M9XCJzaG93LWZvci1zclwiPnt7IHNjcmVlblJlYWRlclBhZ2VMYWJlbCB8IHJweFRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgPC9hPlxuICAgICAgICA8c3BhbiAqbmdJZj1cInAuaXNGaXJzdFBhZ2UoKVwiPlxuICAgICAgICAgIHt7IHByZXZpb3VzTGFiZWwgfCBycHhUcmFuc2xhdGUgfX0gPHNwYW4gY2xhc3M9XCJzaG93LWZvci1zclwiPnt7IHNjcmVlblJlYWRlclBhZ2VMYWJlbCB8IHJweFRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9saT5cbiAgICAgIDxsaSBjbGFzcz1cInNtYWxsLXNjcmVlblwiPlxuICAgICAgICB7eyBwLmdldEN1cnJlbnQoKSB9fSAvIHt7IHAuZ2V0TGFzdFBhZ2UoKSB9fVxuICAgICAgPC9saT5cbiAgICAgIDxsaSBbY2xhc3MuY3VycmVudF09XCJwLmdldEN1cnJlbnQoKSA9PT0gcGFnZS52YWx1ZVwiIFtjbGFzcy5lbGxpcHNpc109XCJwYWdlLmxhYmVsID09PSAnLi4uJ1wiXG4gICAgICAgICpuZ0Zvcj1cImxldCBwYWdlIG9mIHAucGFnZXNcIj5cbiAgICAgICAgPGEgdGFiaW5kZXg9XCIwXCIgKGtleXVwLmVudGVyKT1cInAuc2V0Q3VycmVudChwYWdlLnZhbHVlKVwiIChjbGljayk9XCJwLnNldEN1cnJlbnQocGFnZS52YWx1ZSlcIlxuICAgICAgICAgICpuZ0lmPVwicC5nZXRDdXJyZW50KCkgIT09IHBhZ2UudmFsdWVcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInNob3ctZm9yLXNyXCI+e3sgc2NyZWVuUmVhZGVyUGFnZUxhYmVsIHwgcnB4VHJhbnNsYXRlIH19IDwvc3Bhbj5cbiAgICAgICAgICA8c3Bhbj57eyAocGFnZS5sYWJlbCA9PT0gJy4uLicpID8gcGFnZS5sYWJlbCA6IChwYWdlLmxhYmVsIHwgbnVtYmVyOicnKSB9fTwvc3Bhbj5cbiAgICAgICAgPC9hPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwicC5nZXRDdXJyZW50KCkgPT09IHBhZ2UudmFsdWVcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInNob3ctZm9yLXNyXCI+e3sgc2NyZWVuUmVhZGVyQ3VycmVudExhYmVsIHwgcnB4VHJhbnNsYXRlIH19IDwvc3Bhbj5cbiAgICAgICAgICA8c3Bhbj57eyAocGFnZS5sYWJlbCA9PT0gJy4uLicpID8gcGFnZS5sYWJlbCA6IChwYWdlLmxhYmVsIHwgbnVtYmVyOicnKSB9fTwvc3Bhbj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8L2xpPlxuICAgICAgPGxpIGNsYXNzPVwicGFnaW5hdGlvbi1uZXh0XCIgW2NsYXNzLmRpc2FibGVkXT1cInAuaXNMYXN0UGFnZSgpXCIgKm5nSWY9XCJkaXJlY3Rpb25MaW5rc1wiPlxuICAgICAgICA8YSB0YWJpbmRleD1cIjBcIiAqbmdJZj1cIiFwLmlzTGFzdFBhZ2UoKVwiIChrZXl1cC5lbnRlcik9XCJwLm5leHQoKVwiIChjbGljayk9XCJwLm5leHQoKVwiXG4gICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJuZXh0TGFiZWwgKyAnICcgKyBzY3JlZW5SZWFkZXJQYWdlTGFiZWwgfCBycHhUcmFuc2xhdGVcIj5cbiAgICAgICAgICB7eyBuZXh0TGFiZWwgfCBycHhUcmFuc2xhdGUgfX0gPHNwYW4gY2xhc3M9XCJzaG93LWZvci1zclwiPnt7IHNjcmVlblJlYWRlclBhZ2VMYWJlbCB8IHJweFRyYW5zbGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgPC9hPlxuICAgICAgICA8c3BhbiAqbmdJZj1cInAuaXNMYXN0UGFnZSgpXCI+XG4gICAgICAgICAge3sgbmV4dExhYmVsIHwgcnB4VHJhbnNsYXRlIH19IDxzcGFuIGNsYXNzPVwic2hvdy1mb3Itc3JcIj57eyBzY3JlZW5SZWFkZXJQYWdlTGFiZWwgfCBycHhUcmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvbGk+XG4gICAgPC91bD5cbiAgPC9uYXY+XG48L3BhZ2luYXRpb24tdGVtcGxhdGU+XG4iXX0=