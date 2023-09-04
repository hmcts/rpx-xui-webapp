import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BrowserService } from '../../../services/browser/browser.service';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/browser/browser.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "../utils/field-label.pipe";
import * as i5 from "../utils/first-error.pipe";
import * as i6 from "rpx-xui-translation";
function WriteTextAreaFieldComponent_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 6);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFieldLabel");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind1(3, 3, ctx_r0.caseField)));
} }
function WriteTextAreaFieldComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.caseField.hint_text));
} }
function WriteTextAreaFieldComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFirstError");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind2(3, 3, ctx_r2.textareaControl.errors, ctx_r2.caseField.label)), " ");
} }
const _c0 = function (a0) { return { "form-group-error": a0 }; };
const _c1 = function (a0) { return { "govuk-textarea--error": a0 }; };
export class WriteTextAreaFieldComponent extends AbstractFieldWriteComponent {
    constructor(browserService) {
        super();
        this.browserService = browserService;
    }
    ngOnInit() {
        this.textareaControl = this.registerControl(new FormControl(this.caseField.value));
    }
    autoGrow(event) {
        if (this.browserService.isIEOrEdge()) {
            event.target.style.height = 'auto';
            event.target.style.height = `${event.target.scrollHeight}px`;
            event.target.scrollTop = event.target.scrollHeight;
        }
    }
}
WriteTextAreaFieldComponent.ɵfac = function WriteTextAreaFieldComponent_Factory(t) { return new (t || WriteTextAreaFieldComponent)(i0.ɵɵdirectiveInject(i1.BrowserService)); };
WriteTextAreaFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteTextAreaFieldComponent, selectors: [["ccd-write-text-area-field"]], features: [i0.ɵɵProvidersFeature([BrowserService]), i0.ɵɵInheritDefinitionFeature], decls: 6, vars: 12, consts: [[1, "form-group", 3, "ngClass"], [3, "for"], ["class", "form-label", 4, "ngIf"], ["class", "form-hint", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], ["rows", "3", 1, "form-control", "bottom-30", 3, "ngClass", "id", "formControl", "input"], [1, "form-label"], [1, "form-hint"], [1, "error-message"]], template: function WriteTextAreaFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "label", 1);
        i0.ɵɵtemplate(2, WriteTextAreaFieldComponent_span_2_Template, 4, 5, "span", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(3, WriteTextAreaFieldComponent_span_3_Template, 3, 3, "span", 3);
        i0.ɵɵtemplate(4, WriteTextAreaFieldComponent_span_4_Template, 4, 6, "span", 4);
        i0.ɵɵelementStart(5, "textarea", 5);
        i0.ɵɵlistener("input", function WriteTextAreaFieldComponent_Template_textarea_input_5_listener($event) { return ctx.autoGrow($event); });
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c0, !ctx.textareaControl.valid && ctx.textareaControl.dirty));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("for", ctx.id());
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.label);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.hint_text);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.textareaControl.errors && (ctx.textareaControl.dirty || ctx.textareaControl.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(10, _c1, ctx.textareaControl.errors && (ctx.textareaControl.dirty || ctx.textareaControl.touched)))("id", ctx.id())("formControl", ctx.textareaControl);
    } }, dependencies: [i2.NgClass, i2.NgIf, i3.DefaultValueAccessor, i3.NgControlStatus, i3.FormControlDirective, i4.FieldLabelPipe, i5.FirstErrorPipe, i6.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteTextAreaFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-text-area-field', providers: [BrowserService], template: "<div class=\"form-group\" [ngClass]=\"{'form-group-error': !textareaControl.valid && textareaControl.dirty}\">\n\n  <label [for]=\"id()\">\n    <span class=\"form-label\" *ngIf=\"caseField.label\">{{caseField | ccdFieldLabel | rpxTranslate}}</span>\n  </label>\n  <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text | rpxTranslate}}</span>\n  <span class=\"error-message\" *ngIf=\"textareaControl.errors && (textareaControl.dirty || textareaControl.touched)\">\n    {{textareaControl.errors | ccdFirstError:caseField.label | rpxTranslate}}\n  </span>\n\n  <textarea (input)=\"autoGrow($event)\" class=\"form-control bottom-30\" [ngClass]=\"{'govuk-textarea--error': textareaControl.errors && (textareaControl.dirty || textareaControl.touched)}\"\n   [id]=\"id()\" rows=\"3\" [formControl]=\"textareaControl\"></textarea>\n</div>\n" }]
    }], function () { return [{ type: i1.BrowserService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtdGV4dC1hcmVhLWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL3RleHQtYXJlYS93cml0ZS10ZXh0LWFyZWEtZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvdGV4dC1hcmVhL3dyaXRlLXRleHQtYXJlYS1maWVsZC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQzs7Ozs7Ozs7O0lDQXZGLCtCQUFpRDtJQUFBLFlBQTRDOzs7SUFBQSxpQkFBTzs7O0lBQW5ELGVBQTRDO0lBQTVDLGtGQUE0Qzs7O0lBRS9GLCtCQUFvRDtJQUFBLFlBQXNDOztJQUFBLGlCQUFPOzs7SUFBN0MsZUFBc0M7SUFBdEMsc0VBQXNDOzs7SUFDMUYsK0JBQWlIO0lBQy9HLFlBQ0Y7OztJQUFBLGlCQUFPOzs7SUFETCxlQUNGO0lBREUsa0lBQ0Y7Ozs7QURFRixNQUFNLE9BQU8sMkJBQTRCLFNBQVEsMkJBQTJCO0lBRzFFLFlBQTZCLGNBQThCO1FBQ3pELEtBQUssRUFBRSxDQUFDO1FBRG1CLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtJQUUzRCxDQUFDO0lBRU0sUUFBUTtRQUNiLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFnQixDQUFDO0lBQ3BHLENBQUM7SUFFTSxRQUFRLENBQUMsS0FBSztRQUNuQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDcEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNuQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksSUFBSSxDQUFDO1lBQzdELEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQzs7c0dBakJVLDJCQUEyQjs4RUFBM0IsMkJBQTJCLCtFQUYzQixDQUFDLGNBQWMsQ0FBQztRQ1I3Qiw4QkFBMEcsZUFBQTtRQUd0Ryw4RUFBb0c7UUFDdEcsaUJBQVE7UUFDUiw4RUFBaUc7UUFDakcsOEVBRU87UUFFUCxtQ0FDc0Q7UUFENUMsZ0hBQVMsb0JBQWdCLElBQUM7UUFDa0IsaUJBQVcsRUFBQTs7UUFYM0MsNkdBQWlGO1FBRWhHLGVBQVk7UUFBWiw4QkFBWTtRQUNTLGVBQXFCO1FBQXJCLDBDQUFxQjtRQUV4QixlQUF5QjtRQUF6Qiw4Q0FBeUI7UUFDckIsZUFBa0Y7UUFBbEYsK0dBQWtGO1FBSTNDLGVBQW1IO1FBQW5ILCtJQUFtSCxnQkFBQSxvQ0FBQTs7dUZEQTVLLDJCQUEyQjtjQUx2QyxTQUFTOzJCQUNFLDJCQUEyQixhQUUxQixDQUFDLGNBQWMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEJyb3dzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvYnJvd3Nlci9icm93c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWJzdHJhY3RGaWVsZFdyaXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC13cml0ZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2Qtd3JpdGUtdGV4dC1hcmVhLWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dyaXRlLXRleHQtYXJlYS1maWVsZC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbQnJvd3NlclNlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIFdyaXRlVGV4dEFyZWFGaWVsZENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmllbGRXcml0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyB0ZXh0YXJlYUNvbnRyb2w6IEZvcm1Db250cm9sO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgYnJvd3NlclNlcnZpY2U6IEJyb3dzZXJTZXJ2aWNlKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnRleHRhcmVhQ29udHJvbCA9IHRoaXMucmVnaXN0ZXJDb250cm9sKG5ldyBGb3JtQ29udHJvbCh0aGlzLmNhc2VGaWVsZC52YWx1ZSkpIGFzIEZvcm1Db250cm9sO1xuICB9XG5cbiAgcHVibGljIGF1dG9Hcm93KGV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYnJvd3NlclNlcnZpY2UuaXNJRU9yRWRnZSgpKSB7XG4gICAgICBldmVudC50YXJnZXQuc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nO1xuICAgICAgZXZlbnQudGFyZ2V0LnN0eWxlLmhlaWdodCA9IGAke2V2ZW50LnRhcmdldC5zY3JvbGxIZWlnaHR9cHhgO1xuICAgICAgZXZlbnQudGFyZ2V0LnNjcm9sbFRvcCA9IGV2ZW50LnRhcmdldC5zY3JvbGxIZWlnaHQ7XG4gICAgfVxuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIFtuZ0NsYXNzXT1cInsnZm9ybS1ncm91cC1lcnJvcic6ICF0ZXh0YXJlYUNvbnRyb2wudmFsaWQgJiYgdGV4dGFyZWFDb250cm9sLmRpcnR5fVwiPlxuXG4gIDxsYWJlbCBbZm9yXT1cImlkKClcIj5cbiAgICA8c3BhbiBjbGFzcz1cImZvcm0tbGFiZWxcIiAqbmdJZj1cImNhc2VGaWVsZC5sYWJlbFwiPnt7Y2FzZUZpZWxkIHwgY2NkRmllbGRMYWJlbCB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICA8L2xhYmVsPlxuICA8c3BhbiBjbGFzcz1cImZvcm0taGludFwiICpuZ0lmPVwiY2FzZUZpZWxkLmhpbnRfdGV4dFwiPnt7Y2FzZUZpZWxkLmhpbnRfdGV4dCB8IHJweFRyYW5zbGF0ZX19PC9zcGFuPlxuICA8c3BhbiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIiAqbmdJZj1cInRleHRhcmVhQ29udHJvbC5lcnJvcnMgJiYgKHRleHRhcmVhQ29udHJvbC5kaXJ0eSB8fCB0ZXh0YXJlYUNvbnRyb2wudG91Y2hlZClcIj5cbiAgICB7e3RleHRhcmVhQ29udHJvbC5lcnJvcnMgfCBjY2RGaXJzdEVycm9yOmNhc2VGaWVsZC5sYWJlbCB8IHJweFRyYW5zbGF0ZX19XG4gIDwvc3Bhbj5cblxuICA8dGV4dGFyZWEgKGlucHV0KT1cImF1dG9Hcm93KCRldmVudClcIiBjbGFzcz1cImZvcm0tY29udHJvbCBib3R0b20tMzBcIiBbbmdDbGFzc109XCJ7J2dvdnVrLXRleHRhcmVhLS1lcnJvcic6IHRleHRhcmVhQ29udHJvbC5lcnJvcnMgJiYgKHRleHRhcmVhQ29udHJvbC5kaXJ0eSB8fCB0ZXh0YXJlYUNvbnRyb2wudG91Y2hlZCl9XCJcbiAgIFtpZF09XCJpZCgpXCIgcm93cz1cIjNcIiBbZm9ybUNvbnRyb2xdPVwidGV4dGFyZWFDb250cm9sXCI+PC90ZXh0YXJlYT5cbjwvZGl2PlxuIl19