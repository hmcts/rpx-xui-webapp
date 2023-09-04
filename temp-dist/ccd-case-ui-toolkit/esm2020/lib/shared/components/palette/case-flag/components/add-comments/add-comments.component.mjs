import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { AddCommentsErrorMessage, AddCommentsStep, CaseFlagFieldState, CaseFlagWizardStepTitle } from '../../enums';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "rpx-xui-translation";
function AddCommentsComponent_span_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" (", i0.ɵɵpipeBind1(2, 1, "optional"), ")");
} }
function AddCommentsComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13)(1, "span", 14);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, "Error:"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(5, 4, ctx_r1.flagCommentsNotEnteredErrorMessage), " ");
} }
function AddCommentsComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 15)(1, "span", 14);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 2, "Error:"));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(5, 4, ctx_r2.flagCommentsCharLimitErrorMessage), " ");
} }
const _c0 = function (a0) { return { "form-group-error": a0 }; };
export class AddCommentsComponent {
    constructor() {
        this.optional = false;
        this.caseFlagStateEmitter = new EventEmitter();
        this.errorMessages = [];
        this.flagCommentsNotEnteredErrorMessage = null;
        this.flagCommentsCharLimitErrorMessage = null;
        this.flagCommentsControlName = 'flagComments';
        this.commentsMaxCharLimit = 200;
    }
    ngOnInit() {
        this.addCommentsTitle = CaseFlagWizardStepTitle.ADD_FLAG_COMMENTS;
        this.addCommentsHint = AddCommentsStep.HINT_TEXT;
        this.addCommentsCharLimitInfo = AddCommentsStep.CHARACTER_LIMIT_INFO;
        this.formGroup.addControl(this.flagCommentsControlName, new FormControl(''));
    }
    onNext() {
        // Validate flag comments entry
        this.validateTextEntry();
        // Return case flag field state and error messages to the parent
        this.caseFlagStateEmitter.emit({ currentCaseFlagFieldState: CaseFlagFieldState.FLAG_COMMENTS, errorMessages: this.errorMessages });
    }
    validateTextEntry() {
        this.flagCommentsNotEnteredErrorMessage = null;
        this.flagCommentsCharLimitErrorMessage = null;
        this.errorMessages = [];
        if (!this.optional && !this.formGroup.get(this.flagCommentsControlName).value) {
            this.flagCommentsNotEnteredErrorMessage = AddCommentsErrorMessage.FLAG_COMMENTS_NOT_ENTERED;
            this.errorMessages.push({
                title: '',
                description: AddCommentsErrorMessage.FLAG_COMMENTS_NOT_ENTERED,
                fieldId: this.flagCommentsControlName
            });
        }
        if (this.formGroup.get(this.flagCommentsControlName).value &&
            this.formGroup.get(this.flagCommentsControlName).value.length > this.commentsMaxCharLimit) {
            this.flagCommentsCharLimitErrorMessage = AddCommentsErrorMessage.FLAG_COMMENTS_CHAR_LIMIT_EXCEEDED;
            this.errorMessages.push({
                title: '',
                description: AddCommentsErrorMessage.FLAG_COMMENTS_CHAR_LIMIT_EXCEEDED,
                fieldId: this.flagCommentsControlName
            });
        }
    }
}
AddCommentsComponent.ɵfac = function AddCommentsComponent_Factory(t) { return new (t || AddCommentsComponent)(); };
AddCommentsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AddCommentsComponent, selectors: [["ccd-add-comments"]], inputs: { formGroup: "formGroup", optional: "optional" }, outputs: { caseFlagStateEmitter: "caseFlagStateEmitter" }, decls: 21, vars: 23, consts: [[3, "formGroup"], ["data-module", "govuk-character-count", "data-maxlength", "200", 1, "govuk-character-count"], [1, "govuk-form-group", 3, "ngClass"], [1, "govuk-label-wrapper"], [1, "govuk-label", "govuk-label--l", 3, "for"], [4, "ngIf"], ["id", "add-comments-hint", 1, "govuk-hint"], ["id", "flag-comments-not-entered-error-message", "class", "govuk-error-message", 4, "ngIf"], ["id", "add-comments-char-limit-error", "class", "govuk-error-message", 4, "ngIf"], ["rows", "5", "aria-describedby", "add-comments-hint add-comments-char-limit-info add-comments-char-limit-error", 1, "govuk-textarea", 3, "id", "name", "formControlName"], ["id", "add-comments-char-limit-info", "aria-live", "polite", 1, "govuk-hint", "govuk-character-count__message"], [1, "govuk-button-group"], ["type", "button", 1, "button", "button-primary", 3, "click"], ["id", "flag-comments-not-entered-error-message", 1, "govuk-error-message"], [1, "govuk-visually-hidden"], ["id", "add-comments-char-limit-error", 1, "govuk-error-message"]], template: function AddCommentsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementContainerStart(0, 0);
        i0.ɵɵelementStart(1, "div", 1)(2, "div", 2)(3, "h1", 3)(4, "label", 4);
        i0.ɵɵtext(5);
        i0.ɵɵpipe(6, "rpxTranslate");
        i0.ɵɵtemplate(7, AddCommentsComponent_span_7_Template, 3, 3, "span", 5);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(8, "div", 6);
        i0.ɵɵtext(9);
        i0.ɵɵpipe(10, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(11, AddCommentsComponent_div_11_Template, 6, 6, "div", 7);
        i0.ɵɵtemplate(12, AddCommentsComponent_div_12_Template, 6, 6, "div", 8);
        i0.ɵɵelement(13, "textarea", 9);
        i0.ɵɵelementStart(14, "div", 10);
        i0.ɵɵtext(15);
        i0.ɵɵpipe(16, "rpxTranslate");
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementContainerEnd();
        i0.ɵɵelementStart(17, "div", 11)(18, "button", 12);
        i0.ɵɵlistener("click", function AddCommentsComponent_Template_button_click_18_listener() { return ctx.onNext(); });
        i0.ɵɵtext(19);
        i0.ɵɵpipe(20, "rpxTranslate");
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵproperty("formGroup", ctx.formGroup);
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(21, _c0, ctx.errorMessages.length > 0));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("for", ctx.flagCommentsControlName);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(6, 13, ctx.addCommentsTitle), "");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.optional);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(10, 15, ctx.addCommentsHint), " ");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.flagCommentsNotEnteredErrorMessage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.flagCommentsCharLimitErrorMessage);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("id", ctx.flagCommentsControlName)("name", ctx.flagCommentsControlName)("formControlName", ctx.flagCommentsControlName);
        i0.ɵɵadvance(2);
        i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(16, 17, ctx.addCommentsCharLimitInfo), " ");
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(20, 19, "Next"));
    } }, dependencies: [i1.NgClass, i1.NgIf, i2.DefaultValueAccessor, i2.NgControlStatus, i2.NgControlStatusGroup, i2.FormGroupDirective, i2.FormControlName, i3.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AddCommentsComponent, [{
        type: Component,
        args: [{ selector: 'ccd-add-comments', template: "<ng-container [formGroup]=\"formGroup\">\n  <div class=\"govuk-character-count\" data-module=\"govuk-character-count\" data-maxlength=\"200\">\n    <div class=\"govuk-form-group\" [ngClass]=\"{'form-group-error': errorMessages.length > 0}\">\n      <h1 class=\"govuk-label-wrapper\"><label class=\"govuk-label govuk-label--l\" [for]=\"flagCommentsControlName\">\n          {{addCommentsTitle | rpxTranslate}}<span *ngIf=\"optional\"> ({{'optional' | rpxTranslate}})</span>\n        </label>\n      </h1>\n      <div id=\"add-comments-hint\" class=\"govuk-hint\">\n        {{addCommentsHint | rpxTranslate}}\n      </div>\n      <div id=\"flag-comments-not-entered-error-message\" class=\"govuk-error-message\"\n        *ngIf=\"flagCommentsNotEnteredErrorMessage\">\n        <span class=\"govuk-visually-hidden\">{{'Error:' | rpxTranslate}}</span> {{flagCommentsNotEnteredErrorMessage | rpxTranslate}}\n      </div>\n      <div id=\"add-comments-char-limit-error\" class=\"govuk-error-message\"\n        *ngIf=\"flagCommentsCharLimitErrorMessage\">\n        <span class=\"govuk-visually-hidden\">{{'Error:' | rpxTranslate}}</span> {{flagCommentsCharLimitErrorMessage | rpxTranslate}}\n      </div>\n      <textarea class=\"govuk-textarea\" [id]=\"flagCommentsControlName\"\n        [name]=\"flagCommentsControlName\" [formControlName]=\"flagCommentsControlName\" rows=\"5\"\n        aria-describedby=\"add-comments-hint add-comments-char-limit-info add-comments-char-limit-error\"></textarea>\n      <div id=\"add-comments-char-limit-info\" class=\"govuk-hint govuk-character-count__message\" aria-live=\"polite\">\n        {{addCommentsCharLimitInfo | rpxTranslate}}\n      </div>\n    </div>\n  </div>\n</ng-container>\n\n<div class=\"govuk-button-group\">\n  <button class=\"button button-primary\" type=\"button\" (click)=\"onNext()\">{{'Next' | rpxTranslate}}</button>\n</div>\n" }]
    }], null, { formGroup: [{
            type: Input
        }], optional: [{
            type: Input
        }], caseFlagStateEmitter: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWNvbW1lbnRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2Nhc2UtZmxhZy9jb21wb25lbnRzL2FkZC1jb21tZW50cy9hZGQtY29tbWVudHMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1mbGFnL2NvbXBvbmVudHMvYWRkLWNvbW1lbnRzL2FkZC1jb21tZW50cy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9FLE9BQU8sRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUcvRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLHVCQUF1QixFQUFFLE1BQU0sYUFBYSxDQUFDOzs7Ozs7SUNBdkUsNEJBQXVCO0lBQUMsWUFBK0I7O0lBQUEsaUJBQU87O0lBQXRDLGVBQStCO0lBQS9CLGtFQUErQjs7O0lBTTlGLCtCQUM2QyxlQUFBO0lBQ1AsWUFBMkI7O0lBQUEsaUJBQU87SUFBQyxZQUN6RTs7SUFBQSxpQkFBTTs7O0lBRGdDLGVBQTJCO0lBQTNCLG9EQUEyQjtJQUFRLGVBQ3pFO0lBRHlFLGdHQUN6RTs7O0lBQ0EsK0JBQzRDLGVBQUE7SUFDTixZQUEyQjs7SUFBQSxpQkFBTztJQUFDLFlBQ3pFOztJQUFBLGlCQUFNOzs7SUFEZ0MsZUFBMkI7SUFBM0Isb0RBQTJCO0lBQVEsZUFDekU7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QVMsWUFBUSxJQUFDO1FBQUMsYUFBeUI7O1FBQUEsaUJBQVMsRUFBQTs7UUE3QjdGLHlDQUF1QjtRQUVILGVBQTBEO1FBQTFELG1GQUEwRDtRQUNaLGVBQStCO1FBQS9CLGlEQUErQjtRQUNyRyxlQUFtQztRQUFuQywyRUFBbUM7UUFBTyxlQUFjO1FBQWQsbUNBQWM7UUFJMUQsZUFDRjtRQURFLDRFQUNGO1FBRUcsZUFBd0M7UUFBeEMsNkRBQXdDO1FBSXhDLGVBQXVDO1FBQXZDLDREQUF1QztRQUdULGVBQThCO1FBQTlCLGdEQUE4QixxQ0FBQSxnREFBQTtRQUk3RCxlQUNGO1FBREUscUZBQ0Y7UUFNbUUsZUFBeUI7UUFBekIsb0RBQXlCOzt1RkRuQnJGLG9CQUFvQjtjQUpoQyxTQUFTOzJCQUNFLGtCQUFrQjtnQkFLWixTQUFTO2tCQUF4QixLQUFLO1lBQ1UsUUFBUTtrQkFBdkIsS0FBSztZQUVXLG9CQUFvQjtrQkFBcEMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Db250cm9sLCBVbnR5cGVkRm9ybUdyb3VwIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRXJyb3JNZXNzYWdlIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vZG9tYWluJztcbmltcG9ydCB7IENhc2VGbGFnU3RhdGUgfSBmcm9tICcuLi8uLi9kb21haW4nO1xuaW1wb3J0IHsgQWRkQ29tbWVudHNFcnJvck1lc3NhZ2UsIEFkZENvbW1lbnRzU3RlcCwgQ2FzZUZsYWdGaWVsZFN0YXRlLCBDYXNlRmxhZ1dpemFyZFN0ZXBUaXRsZSB9IGZyb20gJy4uLy4uL2VudW1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWFkZC1jb21tZW50cycsXG4gIHRlbXBsYXRlVXJsOiAnLi9hZGQtY29tbWVudHMuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIEFkZENvbW1lbnRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSBwdWJsaWMgZm9ybUdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwO1xuICBASW5wdXQoKSBwdWJsaWMgb3B0aW9uYWwgPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgcHVibGljIGNhc2VGbGFnU3RhdGVFbWl0dGVyOiBFdmVudEVtaXR0ZXI8Q2FzZUZsYWdTdGF0ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPENhc2VGbGFnU3RhdGU+KCk7XG5cbiAgcHVibGljIGFkZENvbW1lbnRzVGl0bGU6IENhc2VGbGFnV2l6YXJkU3RlcFRpdGxlO1xuICBwdWJsaWMgZXJyb3JNZXNzYWdlczogRXJyb3JNZXNzYWdlW10gPSBbXTtcbiAgcHVibGljIGZsYWdDb21tZW50c05vdEVudGVyZWRFcnJvck1lc3NhZ2U6IEFkZENvbW1lbnRzRXJyb3JNZXNzYWdlID0gbnVsbDtcbiAgcHVibGljIGZsYWdDb21tZW50c0NoYXJMaW1pdEVycm9yTWVzc2FnZTogQWRkQ29tbWVudHNFcnJvck1lc3NhZ2UgPSBudWxsO1xuICBwdWJsaWMgYWRkQ29tbWVudHNIaW50OiBBZGRDb21tZW50c1N0ZXA7XG4gIHB1YmxpYyBhZGRDb21tZW50c0NoYXJMaW1pdEluZm86IEFkZENvbW1lbnRzU3RlcDtcbiAgcHVibGljIHJlYWRvbmx5IGZsYWdDb21tZW50c0NvbnRyb2xOYW1lID0gJ2ZsYWdDb21tZW50cyc7XG4gIHByaXZhdGUgcmVhZG9ubHkgY29tbWVudHNNYXhDaGFyTGltaXQgPSAyMDA7XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuYWRkQ29tbWVudHNUaXRsZSA9IENhc2VGbGFnV2l6YXJkU3RlcFRpdGxlLkFERF9GTEFHX0NPTU1FTlRTO1xuICAgIHRoaXMuYWRkQ29tbWVudHNIaW50ID0gQWRkQ29tbWVudHNTdGVwLkhJTlRfVEVYVDtcbiAgICB0aGlzLmFkZENvbW1lbnRzQ2hhckxpbWl0SW5mbyA9IEFkZENvbW1lbnRzU3RlcC5DSEFSQUNURVJfTElNSVRfSU5GTztcbiAgICB0aGlzLmZvcm1Hcm91cC5hZGRDb250cm9sKHRoaXMuZmxhZ0NvbW1lbnRzQ29udHJvbE5hbWUsIG5ldyBGb3JtQ29udHJvbCgnJykpO1xuICB9XG5cbiAgcHVibGljIG9uTmV4dCgpOiB2b2lkIHtcbiAgICAvLyBWYWxpZGF0ZSBmbGFnIGNvbW1lbnRzIGVudHJ5XG4gICAgdGhpcy52YWxpZGF0ZVRleHRFbnRyeSgpO1xuICAgIC8vIFJldHVybiBjYXNlIGZsYWcgZmllbGQgc3RhdGUgYW5kIGVycm9yIG1lc3NhZ2VzIHRvIHRoZSBwYXJlbnRcbiAgICB0aGlzLmNhc2VGbGFnU3RhdGVFbWl0dGVyLmVtaXQoeyBjdXJyZW50Q2FzZUZsYWdGaWVsZFN0YXRlOiBDYXNlRmxhZ0ZpZWxkU3RhdGUuRkxBR19DT01NRU5UUywgZXJyb3JNZXNzYWdlczogdGhpcy5lcnJvck1lc3NhZ2VzIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZVRleHRFbnRyeSgpOiB2b2lkIHtcbiAgICB0aGlzLmZsYWdDb21tZW50c05vdEVudGVyZWRFcnJvck1lc3NhZ2UgPSBudWxsO1xuICAgIHRoaXMuZmxhZ0NvbW1lbnRzQ2hhckxpbWl0RXJyb3JNZXNzYWdlID0gbnVsbDtcbiAgICB0aGlzLmVycm9yTWVzc2FnZXMgPSBbXTtcbiAgICBpZiAoIXRoaXMub3B0aW9uYWwgJiYgIXRoaXMuZm9ybUdyb3VwLmdldCh0aGlzLmZsYWdDb21tZW50c0NvbnRyb2xOYW1lKS52YWx1ZSkge1xuICAgICAgdGhpcy5mbGFnQ29tbWVudHNOb3RFbnRlcmVkRXJyb3JNZXNzYWdlID0gQWRkQ29tbWVudHNFcnJvck1lc3NhZ2UuRkxBR19DT01NRU5UU19OT1RfRU5URVJFRDtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogQWRkQ29tbWVudHNFcnJvck1lc3NhZ2UuRkxBR19DT01NRU5UU19OT1RfRU5URVJFRCxcbiAgICAgICAgZmllbGRJZDogdGhpcy5mbGFnQ29tbWVudHNDb250cm9sTmFtZVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmZvcm1Hcm91cC5nZXQodGhpcy5mbGFnQ29tbWVudHNDb250cm9sTmFtZSkudmFsdWUgJiZcbiAgICAgIHRoaXMuZm9ybUdyb3VwLmdldCh0aGlzLmZsYWdDb21tZW50c0NvbnRyb2xOYW1lKS52YWx1ZS5sZW5ndGggPiB0aGlzLmNvbW1lbnRzTWF4Q2hhckxpbWl0KSB7XG4gICAgICB0aGlzLmZsYWdDb21tZW50c0NoYXJMaW1pdEVycm9yTWVzc2FnZSA9IEFkZENvbW1lbnRzRXJyb3JNZXNzYWdlLkZMQUdfQ09NTUVOVFNfQ0hBUl9MSU1JVF9FWENFRURFRDtcbiAgICAgIHRoaXMuZXJyb3JNZXNzYWdlcy5wdXNoKHtcbiAgICAgICAgdGl0bGU6ICcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogQWRkQ29tbWVudHNFcnJvck1lc3NhZ2UuRkxBR19DT01NRU5UU19DSEFSX0xJTUlUX0VYQ0VFREVELFxuICAgICAgICBmaWVsZElkOiB0aGlzLmZsYWdDb21tZW50c0NvbnRyb2xOYW1lXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIj5cbiAgPGRpdiBjbGFzcz1cImdvdnVrLWNoYXJhY3Rlci1jb3VudFwiIGRhdGEtbW9kdWxlPVwiZ292dWstY2hhcmFjdGVyLWNvdW50XCIgZGF0YS1tYXhsZW5ndGg9XCIyMDBcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZ292dWstZm9ybS1ncm91cFwiIFtuZ0NsYXNzXT1cInsnZm9ybS1ncm91cC1lcnJvcic6IGVycm9yTWVzc2FnZXMubGVuZ3RoID4gMH1cIj5cbiAgICAgIDxoMSBjbGFzcz1cImdvdnVrLWxhYmVsLXdyYXBwZXJcIj48bGFiZWwgY2xhc3M9XCJnb3Z1ay1sYWJlbCBnb3Z1ay1sYWJlbC0tbFwiIFtmb3JdPVwiZmxhZ0NvbW1lbnRzQ29udHJvbE5hbWVcIj5cbiAgICAgICAgICB7e2FkZENvbW1lbnRzVGl0bGUgfCBycHhUcmFuc2xhdGV9fTxzcGFuICpuZ0lmPVwib3B0aW9uYWxcIj4gKHt7J29wdGlvbmFsJyB8IHJweFRyYW5zbGF0ZX19KTwvc3Bhbj5cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgIDwvaDE+XG4gICAgICA8ZGl2IGlkPVwiYWRkLWNvbW1lbnRzLWhpbnRcIiBjbGFzcz1cImdvdnVrLWhpbnRcIj5cbiAgICAgICAge3thZGRDb21tZW50c0hpbnQgfCBycHhUcmFuc2xhdGV9fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGlkPVwiZmxhZy1jb21tZW50cy1ub3QtZW50ZXJlZC1lcnJvci1tZXNzYWdlXCIgY2xhc3M9XCJnb3Z1ay1lcnJvci1tZXNzYWdlXCJcbiAgICAgICAgKm5nSWY9XCJmbGFnQ29tbWVudHNOb3RFbnRlcmVkRXJyb3JNZXNzYWdlXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZ292dWstdmlzdWFsbHktaGlkZGVuXCI+e3snRXJyb3I6JyB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPiB7e2ZsYWdDb21tZW50c05vdEVudGVyZWRFcnJvck1lc3NhZ2UgfCBycHhUcmFuc2xhdGV9fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGlkPVwiYWRkLWNvbW1lbnRzLWNoYXItbGltaXQtZXJyb3JcIiBjbGFzcz1cImdvdnVrLWVycm9yLW1lc3NhZ2VcIlxuICAgICAgICAqbmdJZj1cImZsYWdDb21tZW50c0NoYXJMaW1pdEVycm9yTWVzc2FnZVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImdvdnVrLXZpc3VhbGx5LWhpZGRlblwiPnt7J0Vycm9yOicgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj4ge3tmbGFnQ29tbWVudHNDaGFyTGltaXRFcnJvck1lc3NhZ2UgfCBycHhUcmFuc2xhdGV9fVxuICAgICAgPC9kaXY+XG4gICAgICA8dGV4dGFyZWEgY2xhc3M9XCJnb3Z1ay10ZXh0YXJlYVwiIFtpZF09XCJmbGFnQ29tbWVudHNDb250cm9sTmFtZVwiXG4gICAgICAgIFtuYW1lXT1cImZsYWdDb21tZW50c0NvbnRyb2xOYW1lXCIgW2Zvcm1Db250cm9sTmFtZV09XCJmbGFnQ29tbWVudHNDb250cm9sTmFtZVwiIHJvd3M9XCI1XCJcbiAgICAgICAgYXJpYS1kZXNjcmliZWRieT1cImFkZC1jb21tZW50cy1oaW50IGFkZC1jb21tZW50cy1jaGFyLWxpbWl0LWluZm8gYWRkLWNvbW1lbnRzLWNoYXItbGltaXQtZXJyb3JcIj48L3RleHRhcmVhPlxuICAgICAgPGRpdiBpZD1cImFkZC1jb21tZW50cy1jaGFyLWxpbWl0LWluZm9cIiBjbGFzcz1cImdvdnVrLWhpbnQgZ292dWstY2hhcmFjdGVyLWNvdW50X19tZXNzYWdlXCIgYXJpYS1saXZlPVwicG9saXRlXCI+XG4gICAgICAgIHt7YWRkQ29tbWVudHNDaGFyTGltaXRJbmZvIHwgcnB4VHJhbnNsYXRlfX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvbmctY29udGFpbmVyPlxuXG48ZGl2IGNsYXNzPVwiZ292dWstYnV0dG9uLWdyb3VwXCI+XG4gIDxidXR0b24gY2xhc3M9XCJidXR0b24gYnV0dG9uLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cIm9uTmV4dCgpXCI+e3snTmV4dCcgfCBycHhUcmFuc2xhdGV9fTwvYnV0dG9uPlxuPC9kaXY+XG4iXX0=