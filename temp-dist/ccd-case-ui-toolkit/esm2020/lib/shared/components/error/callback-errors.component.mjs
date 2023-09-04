import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { CallbackErrorsContext } from './domain/error-context';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "rpx-xui-translation";
function CallbackErrorsComponent_div_0_ng_container_2_li_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const errorMsg_r5 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, errorMsg_r5), " ");
} }
function CallbackErrorsComponent_div_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "h3", 3);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "ul", 4);
    i0.ɵɵtemplate(5, CallbackErrorsComponent_div_0_ng_container_2_li_5_Template, 3, 3, "li", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 2, "Errors"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r1.error.callbackErrors);
} }
function CallbackErrorsComponent_div_0_br_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "br");
} }
function CallbackErrorsComponent_div_0_ng_container_4_li_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "li");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const warningMsg_r7 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, warningMsg_r7), " ");
} }
function CallbackErrorsComponent_div_0_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "h3", 3);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "ul", 6);
    i0.ɵɵtemplate(5, CallbackErrorsComponent_div_0_ng_container_4_li_5_Template, 3, 3, "li", 5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(3, 2, "Warnings"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngForOf", ctx_r3.error.callbackWarnings);
} }
function CallbackErrorsComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵpipe(1, "rpxTranslate");
    i0.ɵɵtemplate(2, CallbackErrorsComponent_div_0_ng_container_2_Template, 6, 4, "ng-container", 2);
    i0.ɵɵtemplate(3, CallbackErrorsComponent_div_0_br_3_Template, 1, 0, "br", 2);
    i0.ɵɵtemplate(4, CallbackErrorsComponent_div_0_ng_container_4_Template, 6, 4, "ng-container", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵattribute("aria-label", i0.ɵɵpipeBind1(1, 4, "Cannot continue because the service reported one or more errors or warnings"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.hasErrors());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.hasErrors() && ctx_r0.hasWarnings());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r0.hasWarnings());
} }
export class CallbackErrorsComponent {
    constructor() {
        this.triggerTextIgnore = CallbackErrorsComponent.TRIGGER_TEXT_IGNORE;
        this.triggerTextContinue = CallbackErrorsComponent.TRIGGER_TEXT_SUBMIT;
        this.callbackErrorsSubject = new Subject();
        this.callbackErrorsContext = new EventEmitter();
    }
    ngOnInit() {
        this.callbackErrorsSubject.subscribe(errorEvent => {
            this.error = errorEvent;
            if (this.hasWarnings() || this.hasErrors() || this.hasInvalidData()) {
                const callbackErrorsContext = this.buildCallbackErrorsContext();
                this.callbackErrorsContext.emit(callbackErrorsContext);
            }
        });
    }
    hasErrors() {
        return this.error
            && this.error.callbackErrors
            && this.error.callbackErrors.length;
    }
    hasWarnings() {
        return this.error
            && this.error.callbackWarnings
            && this.error.callbackWarnings.length;
    }
    buildCallbackErrorsContext() {
        const errorContext = new CallbackErrorsContext();
        if (this.hasWarnings() && !this.hasErrors() && !this.hasInvalidData()) {
            errorContext.ignoreWarning = true;
            errorContext.triggerText = this.triggerTextIgnore;
        }
        else {
            errorContext.ignoreWarning = false;
            errorContext.triggerText = this.triggerTextContinue;
        }
        return errorContext;
    }
    hasInvalidData() {
        return this.error
            && this.error.details
            && this.error.details.field_errors
            && this.error.details.field_errors.length;
    }
}
CallbackErrorsComponent.TRIGGER_TEXT_SUBMIT = 'Submit';
CallbackErrorsComponent.TRIGGER_TEXT_START = 'Start';
CallbackErrorsComponent.TRIGGER_TEXT_GO = 'Go';
CallbackErrorsComponent.TRIGGER_TEXT_IGNORE = 'Ignore Warning and Go';
CallbackErrorsComponent.ɵfac = function CallbackErrorsComponent_Factory(t) { return new (t || CallbackErrorsComponent)(); };
CallbackErrorsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CallbackErrorsComponent, selectors: [["ccd-callback-errors"]], inputs: { triggerTextIgnore: "triggerTextIgnore", triggerTextContinue: "triggerTextContinue", callbackErrorsSubject: "callbackErrorsSubject" }, outputs: { callbackErrorsContext: "callbackErrorsContext" }, decls: 1, vars: 1, consts: [["class", "error-summary", "role", "group", "tabindex", "-1", 4, "ngIf"], ["role", "group", "tabindex", "-1", 1, "error-summary"], [4, "ngIf"], [1, "heading-h3", "error-summary-heading"], ["id", "errors", 1, "error-summary-list"], [4, "ngFor", "ngForOf"], ["id", "warnings", 1, "error-summary-list"]], template: function CallbackErrorsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, CallbackErrorsComponent_div_0_Template, 5, 6, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.hasErrors() || ctx.hasWarnings());
    } }, dependencies: [i1.NgForOf, i1.NgIf, i2.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CallbackErrorsComponent, [{
        type: Component,
        args: [{ selector: 'ccd-callback-errors', template: "<div *ngIf=\"hasErrors() || hasWarnings()\" class=\"error-summary\" role=\"group\"\n     [attr.aria-label]=\"'Cannot continue because the service reported one or more errors or warnings' | rpxTranslate\"\n     tabindex=\"-1\">\n  <ng-container *ngIf=\"hasErrors()\">\n    <h3 class=\"heading-h3 error-summary-heading\">\n      {{'Errors' | rpxTranslate}}\n    </h3>\n    <ul id=\"errors\" class=\"error-summary-list\">\n      <li *ngFor=\"let errorMsg of error.callbackErrors\">\n        {{errorMsg | rpxTranslate}}\n      </li>\n    </ul>\n  </ng-container>\n  <!-- Add a break for spacing if there are both errors and warnings -->\n  <br *ngIf=\"hasErrors() && hasWarnings()\">\n  <ng-container *ngIf=\"hasWarnings()\">\n    <h3 class=\"heading-h3 error-summary-heading\">\n      {{'Warnings' | rpxTranslate}}\n    </h3>\n    <ul id=\"warnings\" class=\"error-summary-list\">\n      <li *ngFor=\"let warningMsg of error.callbackWarnings\">\n        {{warningMsg | rpxTranslate}}\n      </li>\n    </ul>\n  </ng-container>\n</div>\n" }]
    }], null, { triggerTextIgnore: [{
            type: Input
        }], triggerTextContinue: [{
            type: Input
        }], callbackErrorsSubject: [{
            type: Input
        }], callbackErrorsContext: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbGJhY2stZXJyb3JzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9lcnJvci9jYWxsYmFjay1lcnJvcnMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2Vycm9yL2NhbGxiYWNrLWVycm9ycy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBVSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7SUNLekQsMEJBQWtEO0lBQ2hELFlBQ0Y7O0lBQUEsaUJBQUs7OztJQURILGVBQ0Y7SUFERSxrRUFDRjs7O0lBUEosNkJBQWtDO0lBQ2hDLDZCQUE2QztJQUMzQyxZQUNGOztJQUFBLGlCQUFLO0lBQ0wsNkJBQTJDO0lBQ3pDLDJGQUVLO0lBQ1AsaUJBQUs7SUFDUCwwQkFBZTs7O0lBUFgsZUFDRjtJQURFLCtEQUNGO0lBRTJCLGVBQXVCO0lBQXZCLHFEQUF1Qjs7O0lBTXBELHFCQUF5Qzs7O0lBTXJDLDBCQUFzRDtJQUNwRCxZQUNGOztJQUFBLGlCQUFLOzs7SUFESCxlQUNGO0lBREUsb0VBQ0Y7OztJQVBKLDZCQUFvQztJQUNsQyw2QkFBNkM7SUFDM0MsWUFDRjs7SUFBQSxpQkFBSztJQUNMLDZCQUE2QztJQUMzQywyRkFFSztJQUNQLGlCQUFLO0lBQ1AsMEJBQWU7OztJQVBYLGVBQ0Y7SUFERSxpRUFDRjtJQUU2QixlQUF5QjtJQUF6Qix1REFB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WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBIdHRwRXJyb3IgfSBmcm9tICcuLi8uLi9kb21haW4vaHR0cCc7XG5pbXBvcnQgeyBDYWxsYmFja0Vycm9yc0NvbnRleHQgfSBmcm9tICcuL2RvbWFpbi9lcnJvci1jb250ZXh0JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWNhbGxiYWNrLWVycm9ycycsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYWxsYmFjay1lcnJvcnMuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQ2FsbGJhY2tFcnJvcnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVFJJR0dFUl9URVhUX1NVQk1JVCA9ICdTdWJtaXQnO1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFRSSUdHRVJfVEVYVF9TVEFSVCA9ICdTdGFydCc7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVFJJR0dFUl9URVhUX0dPID0gJ0dvJztcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUUklHR0VSX1RFWFRfSUdOT1JFID0gJ0lnbm9yZSBXYXJuaW5nIGFuZCBHbyc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIHRyaWdnZXJUZXh0SWdub3JlOiBzdHJpbmcgPSBDYWxsYmFja0Vycm9yc0NvbXBvbmVudC5UUklHR0VSX1RFWFRfSUdOT1JFO1xuICBASW5wdXQoKVxuICBwdWJsaWMgdHJpZ2dlclRleHRDb250aW51ZTogc3RyaW5nID0gQ2FsbGJhY2tFcnJvcnNDb21wb25lbnQuVFJJR0dFUl9URVhUX1NVQk1JVDtcbiAgQElucHV0KClcbiAgcHVibGljIGNhbGxiYWNrRXJyb3JzU3ViamVjdDogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblxuICBAT3V0cHV0KClcbiAgcHVibGljIGNhbGxiYWNrRXJyb3JzQ29udGV4dDogRXZlbnRFbWl0dGVyPENhbGxiYWNrRXJyb3JzQ29udGV4dD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHVibGljIGVycm9yOiBIdHRwRXJyb3I7XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY2FsbGJhY2tFcnJvcnNTdWJqZWN0LnN1YnNjcmliZShlcnJvckV2ZW50ID0+IHtcbiAgICAgIHRoaXMuZXJyb3IgPSBlcnJvckV2ZW50O1xuICAgICAgaWYgKHRoaXMuaGFzV2FybmluZ3MoKSB8fCB0aGlzLmhhc0Vycm9ycygpIHx8IHRoaXMuaGFzSW52YWxpZERhdGEoKSkge1xuICAgICAgICBjb25zdCBjYWxsYmFja0Vycm9yc0NvbnRleHQ6IENhbGxiYWNrRXJyb3JzQ29udGV4dCA9IHRoaXMuYnVpbGRDYWxsYmFja0Vycm9yc0NvbnRleHQoKTtcbiAgICAgICAgdGhpcy5jYWxsYmFja0Vycm9yc0NvbnRleHQuZW1pdChjYWxsYmFja0Vycm9yc0NvbnRleHQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGhhc0Vycm9ycygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5lcnJvclxuICAgICAgJiYgdGhpcy5lcnJvci5jYWxsYmFja0Vycm9yc1xuICAgICAgJiYgdGhpcy5lcnJvci5jYWxsYmFja0Vycm9ycy5sZW5ndGg7XG4gIH1cblxuICBwdWJsaWMgaGFzV2FybmluZ3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZXJyb3JcbiAgICAgICYmIHRoaXMuZXJyb3IuY2FsbGJhY2tXYXJuaW5nc1xuICAgICAgJiYgdGhpcy5lcnJvci5jYWxsYmFja1dhcm5pbmdzLmxlbmd0aDtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRDYWxsYmFja0Vycm9yc0NvbnRleHQoKTogQ2FsbGJhY2tFcnJvcnNDb250ZXh0IHtcbiAgICBjb25zdCBlcnJvckNvbnRleHQ6IENhbGxiYWNrRXJyb3JzQ29udGV4dCA9IG5ldyBDYWxsYmFja0Vycm9yc0NvbnRleHQoKTtcbiAgICBpZiAodGhpcy5oYXNXYXJuaW5ncygpICYmICF0aGlzLmhhc0Vycm9ycygpICYmICF0aGlzLmhhc0ludmFsaWREYXRhKCkpIHtcbiAgICAgIGVycm9yQ29udGV4dC5pZ25vcmVXYXJuaW5nID0gdHJ1ZTtcbiAgICAgIGVycm9yQ29udGV4dC50cmlnZ2VyVGV4dCA9IHRoaXMudHJpZ2dlclRleHRJZ25vcmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yQ29udGV4dC5pZ25vcmVXYXJuaW5nID0gZmFsc2U7XG4gICAgICBlcnJvckNvbnRleHQudHJpZ2dlclRleHQgPSB0aGlzLnRyaWdnZXJUZXh0Q29udGludWU7XG4gICAgfVxuICAgIHJldHVybiBlcnJvckNvbnRleHQ7XG4gIH1cblxuICBwcml2YXRlIGhhc0ludmFsaWREYXRhKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmVycm9yXG4gICAgICAmJiB0aGlzLmVycm9yLmRldGFpbHNcbiAgICAgICYmIHRoaXMuZXJyb3IuZGV0YWlscy5maWVsZF9lcnJvcnNcbiAgICAgICYmIHRoaXMuZXJyb3IuZGV0YWlscy5maWVsZF9lcnJvcnMubGVuZ3RoO1xuICB9XG59XG4iLCI8ZGl2ICpuZ0lmPVwiaGFzRXJyb3JzKCkgfHwgaGFzV2FybmluZ3MoKVwiIGNsYXNzPVwiZXJyb3Itc3VtbWFyeVwiIHJvbGU9XCJncm91cFwiXG4gICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiJ0Nhbm5vdCBjb250aW51ZSBiZWNhdXNlIHRoZSBzZXJ2aWNlIHJlcG9ydGVkIG9uZSBvciBtb3JlIGVycm9ycyBvciB3YXJuaW5ncycgfCBycHhUcmFuc2xhdGVcIlxuICAgICB0YWJpbmRleD1cIi0xXCI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJoYXNFcnJvcnMoKVwiPlxuICAgIDxoMyBjbGFzcz1cImhlYWRpbmctaDMgZXJyb3Itc3VtbWFyeS1oZWFkaW5nXCI+XG4gICAgICB7eydFcnJvcnMnIHwgcnB4VHJhbnNsYXRlfX1cbiAgICA8L2gzPlxuICAgIDx1bCBpZD1cImVycm9yc1wiIGNsYXNzPVwiZXJyb3Itc3VtbWFyeS1saXN0XCI+XG4gICAgICA8bGkgKm5nRm9yPVwibGV0IGVycm9yTXNnIG9mIGVycm9yLmNhbGxiYWNrRXJyb3JzXCI+XG4gICAgICAgIHt7ZXJyb3JNc2cgfCBycHhUcmFuc2xhdGV9fVxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICA8L25nLWNvbnRhaW5lcj5cbiAgPCEtLSBBZGQgYSBicmVhayBmb3Igc3BhY2luZyBpZiB0aGVyZSBhcmUgYm90aCBlcnJvcnMgYW5kIHdhcm5pbmdzIC0tPlxuICA8YnIgKm5nSWY9XCJoYXNFcnJvcnMoKSAmJiBoYXNXYXJuaW5ncygpXCI+XG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJoYXNXYXJuaW5ncygpXCI+XG4gICAgPGgzIGNsYXNzPVwiaGVhZGluZy1oMyBlcnJvci1zdW1tYXJ5LWhlYWRpbmdcIj5cbiAgICAgIHt7J1dhcm5pbmdzJyB8IHJweFRyYW5zbGF0ZX19XG4gICAgPC9oMz5cbiAgICA8dWwgaWQ9XCJ3YXJuaW5nc1wiIGNsYXNzPVwiZXJyb3Itc3VtbWFyeS1saXN0XCI+XG4gICAgICA8bGkgKm5nRm9yPVwibGV0IHdhcm5pbmdNc2cgb2YgZXJyb3IuY2FsbGJhY2tXYXJuaW5nc1wiPlxuICAgICAgICB7e3dhcm5pbmdNc2cgfCBycHhUcmFuc2xhdGV9fVxuICAgICAgPC9saT5cbiAgICA8L3VsPlxuICA8L25nLWNvbnRhaW5lcj5cbjwvZGl2PlxuIl19