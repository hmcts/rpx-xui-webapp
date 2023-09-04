import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { YesNoService } from './yes-no.service';
import * as i0 from "@angular/core";
import * as i1 from "./yes-no.service";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "../utils/field-label.pipe";
import * as i5 from "../utils/first-error.pipe";
import * as i6 from "rpx-xui-translation";
function WriteYesNoFieldComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFieldLabel");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind1(3, 3, ctx_r0.caseField)));
} }
function WriteYesNoFieldComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.caseField.hint_text));
} }
function WriteYesNoFieldComponent_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 9);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFirstError");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind2(3, 3, ctx_r2.yesNoControl.errors, ctx_r2.caseField.label)), " ");
} }
const _c0 = function (a0) { return { selected: a0 }; };
function WriteYesNoFieldComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 10);
    i0.ɵɵelement(1, "input", 11);
    i0.ɵɵelementStart(2, "label", 12);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const value_r4 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c0, ctx_r3.yesNoControl.value === value_r4));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("id", ctx_r3.createElementId(value_r4))("name", ctx_r3.id())("formControl", ctx_r3.yesNoControl)("value", value_r4);
    i0.ɵɵattribute("name", ctx_r3.id());
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("for", ctx_r3.createElementId(value_r4));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(value_r4);
} }
const _c1 = function (a0) { return { "form-group-error": a0 }; };
export class WriteYesNoFieldComponent extends AbstractFieldWriteComponent {
    constructor(yesNoService) {
        super();
        this.yesNoService = yesNoService;
        this.yesNoValues = ['Yes', 'No'];
    }
    ngOnInit() {
        this.yesNoControl = this.registerControl(new FormControl(this.yesNoService.format(this.caseField.value)));
    }
}
WriteYesNoFieldComponent.ɵfac = function WriteYesNoFieldComponent_Factory(t) { return new (t || WriteYesNoFieldComponent)(i0.ɵɵdirectiveInject(i1.YesNoService)); };
WriteYesNoFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteYesNoFieldComponent, selectors: [["ccd-write-yes-no-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 8, vars: 9, consts: [[1, "form-group", "bottom-30", 3, "id", "ngClass"], [1, "inline"], ["class", "form-label", 4, "ngIf"], ["class", "form-hint", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], [3, "id"], ["class", "multiple-choice", 3, "ngClass", 4, "ngFor", "ngForOf"], [1, "form-label"], [1, "form-hint"], [1, "error-message"], [1, "multiple-choice", 3, "ngClass"], ["type", "radio", 1, "form-control", 3, "id", "name", "formControl", "value"], [1, "form-label", 3, "for"]], template: function WriteYesNoFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "fieldset", 1)(2, "legend");
        i0.ɵɵtemplate(3, WriteYesNoFieldComponent_span_3_Template, 4, 5, "span", 2);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(4, WriteYesNoFieldComponent_span_4_Template, 3, 3, "span", 3);
        i0.ɵɵtemplate(5, WriteYesNoFieldComponent_span_5_Template, 4, 6, "span", 4);
        i0.ɵɵelementStart(6, "div", 5);
        i0.ɵɵtemplate(7, WriteYesNoFieldComponent_div_7_Template, 4, 10, "div", 6);
        i0.ɵɵelementEnd()()();
    } if (rf & 2) {
        i0.ɵɵproperty("id", ctx.id())("ngClass", i0.ɵɵpureFunction1(7, _c1, !ctx.yesNoControl.valid && (ctx.yesNoControl.dirty || ctx.yesNoControl.touched)));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.caseField.label);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.hint_text);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.yesNoControl.errors && (ctx.yesNoControl.dirty || ctx.yesNoControl.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("id", ctx.createElementId("radio"));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.yesNoValues);
    } }, dependencies: [i2.NgClass, i2.NgForOf, i2.NgIf, i3.DefaultValueAccessor, i3.RadioControlValueAccessor, i3.NgControlStatus, i3.FormControlDirective, i4.FieldLabelPipe, i5.FirstErrorPipe, i6.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteYesNoFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-yes-no-field', template: "<div [id]=\"id()\" class=\"form-group bottom-30\" [ngClass]=\"{'form-group-error': !yesNoControl.valid && (yesNoControl.dirty || yesNoControl.touched)}\">\n\t<fieldset class=\"inline\">\n    <legend>\n      <span class=\"form-label\" *ngIf=\"caseField.label\">{{caseField | ccdFieldLabel | rpxTranslate}}</span>\n    </legend>\n    <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text | rpxTranslate}}</span>\n    <span class=\"error-message\" *ngIf=\"yesNoControl.errors && (yesNoControl.dirty || yesNoControl.touched)\">\n      {{yesNoControl.errors | ccdFirstError:caseField.label | rpxTranslate}}\n    </span>\n\n    <div [id]=\"createElementId('radio')\">\n  \t  <div class=\"multiple-choice\" *ngFor=\"let value of yesNoValues\" [ngClass]=\"{selected: yesNoControl.value === value}\">\n  \t    <input class=\"form-control\" [id]=\"createElementId(value)\" [attr.name]=\"id()\" [name]=\"id()\" type=\"radio\" [formControl]=\"yesNoControl\" [value]=\"value\">\n  \t    <label class=\"form-label\" [for]=\"createElementId(value)\">{{value}}</label>\n  \t  </div>\n    </div>\n\t</fieldset>\n</div>\n" }]
    }], function () { return [{ type: i1.YesNoService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUteWVzLW5vLWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL3llcy1uby93cml0ZS15ZXMtbm8tZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUveWVzLW5vL3dyaXRlLXllcy1uby1maWVsZC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQzNGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7Ozs7O0lDQTFDLCtCQUFpRDtJQUFBLFlBQTRDOzs7SUFBQSxpQkFBTzs7O0lBQW5ELGVBQTRDO0lBQTVDLGtGQUE0Qzs7O0lBRS9GLCtCQUFvRDtJQUFBLFlBQXNDOztJQUFBLGlCQUFPOzs7SUFBN0MsZUFBc0M7SUFBdEMsc0VBQXNDOzs7SUFDMUYsK0JBQXdHO0lBQ3RHLFlBQ0Y7OztJQUFBLGlCQUFPOzs7SUFETCxlQUNGO0lBREUsK0hBQ0Y7Ozs7SUFHQywrQkFBb0g7SUFDbEgsNEJBQXFKO0lBQ3JKLGlDQUF5RDtJQUFBLFlBQVM7SUFBQSxpQkFBUSxFQUFBOzs7O0lBRmIsNEZBQW9EO0lBQ3JGLGVBQTZCO0lBQTdCLHFEQUE2QixxQkFBQSxvQ0FBQSxtQkFBQTtJQUFDLG1DQUFrQjtJQUNsRCxlQUE4QjtJQUE5QixzREFBOEI7SUFBQyxlQUFTO0lBQVQsOEJBQVM7OztBREp6RSxNQUFNLE9BQU8sd0JBQXlCLFNBQVEsMkJBQTJCO0lBSXZFLFlBQTZCLFlBQTBCO1FBQ3JELEtBQUssRUFBRSxDQUFDO1FBRG1CLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBSGhELGdCQUFXLEdBQUcsQ0FBRSxLQUFLLEVBQUUsSUFBSSxDQUFFLENBQUM7SUFLckMsQ0FBQztJQUVNLFFBQVE7UUFDYixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFnQixDQUFDO0lBQzNILENBQUM7O2dHQVZVLHdCQUF3QjsyRUFBeEIsd0JBQXdCO1FDVHJDLDhCQUFvSixrQkFBQSxhQUFBO1FBRzlJLDJFQUFvRztRQUN0RyxpQkFBUztRQUNULDJFQUFpRztRQUNqRywyRUFFTztRQUVQLDhCQUFxQztRQUNwQywwRUFHTTtRQUNQLGlCQUFNLEVBQUEsRUFBQTs7UUFmTCw2QkFBVyx3SEFBQTtRQUdnQixlQUFxQjtRQUFyQiwwQ0FBcUI7UUFFeEIsZUFBeUI7UUFBekIsOENBQXlCO1FBQ3JCLGVBQXlFO1FBQXpFLHNHQUF5RTtRQUlqRyxlQUErQjtRQUEvQixpREFBK0I7UUFDWSxlQUFjO1FBQWQseUNBQWM7O3VGREZyRCx3QkFBd0I7Y0FKcEMsU0FBUzsyQkFDRSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBYnN0cmFjdEZpZWxkV3JpdGVDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlLWZpZWxkL2Fic3RyYWN0LWZpZWxkLXdyaXRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBZZXNOb1NlcnZpY2UgfSBmcm9tICcuL3llcy1uby5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLXdyaXRlLXllcy1uby1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi93cml0ZS15ZXMtbm8tZmllbGQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgV3JpdGVZZXNOb0ZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGaWVsZFdyaXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIHllc05vVmFsdWVzID0gWyAnWWVzJywgJ05vJyBdO1xuICBwdWJsaWMgeWVzTm9Db250cm9sOiBGb3JtQ29udHJvbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHllc05vU2VydmljZTogWWVzTm9TZXJ2aWNlKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnllc05vQ29udHJvbCA9IHRoaXMucmVnaXN0ZXJDb250cm9sKG5ldyBGb3JtQ29udHJvbCh0aGlzLnllc05vU2VydmljZS5mb3JtYXQodGhpcy5jYXNlRmllbGQudmFsdWUpKSkgYXMgRm9ybUNvbnRyb2w7XG4gIH1cbn1cbiIsIjxkaXYgW2lkXT1cImlkKClcIiBjbGFzcz1cImZvcm0tZ3JvdXAgYm90dG9tLTMwXCIgW25nQ2xhc3NdPVwieydmb3JtLWdyb3VwLWVycm9yJzogIXllc05vQ29udHJvbC52YWxpZCAmJiAoeWVzTm9Db250cm9sLmRpcnR5IHx8IHllc05vQ29udHJvbC50b3VjaGVkKX1cIj5cblx0PGZpZWxkc2V0IGNsYXNzPVwiaW5saW5lXCI+XG4gICAgPGxlZ2VuZD5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZm9ybS1sYWJlbFwiICpuZ0lmPVwiY2FzZUZpZWxkLmxhYmVsXCI+e3tjYXNlRmllbGQgfCBjY2RGaWVsZExhYmVsIHwgcnB4VHJhbnNsYXRlfX08L3NwYW4+XG4gICAgPC9sZWdlbmQ+XG4gICAgPHNwYW4gY2xhc3M9XCJmb3JtLWhpbnRcIiAqbmdJZj1cImNhc2VGaWVsZC5oaW50X3RleHRcIj57e2Nhc2VGaWVsZC5oaW50X3RleHQgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIiAqbmdJZj1cInllc05vQ29udHJvbC5lcnJvcnMgJiYgKHllc05vQ29udHJvbC5kaXJ0eSB8fCB5ZXNOb0NvbnRyb2wudG91Y2hlZClcIj5cbiAgICAgIHt7eWVzTm9Db250cm9sLmVycm9ycyB8IGNjZEZpcnN0RXJyb3I6Y2FzZUZpZWxkLmxhYmVsIHwgcnB4VHJhbnNsYXRlfX1cbiAgICA8L3NwYW4+XG5cbiAgICA8ZGl2IFtpZF09XCJjcmVhdGVFbGVtZW50SWQoJ3JhZGlvJylcIj5cbiAgXHQgIDxkaXYgY2xhc3M9XCJtdWx0aXBsZS1jaG9pY2VcIiAqbmdGb3I9XCJsZXQgdmFsdWUgb2YgeWVzTm9WYWx1ZXNcIiBbbmdDbGFzc109XCJ7c2VsZWN0ZWQ6IHllc05vQ29udHJvbC52YWx1ZSA9PT0gdmFsdWV9XCI+XG4gIFx0ICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbFwiIFtpZF09XCJjcmVhdGVFbGVtZW50SWQodmFsdWUpXCIgW2F0dHIubmFtZV09XCJpZCgpXCIgW25hbWVdPVwiaWQoKVwiIHR5cGU9XCJyYWRpb1wiIFtmb3JtQ29udHJvbF09XCJ5ZXNOb0NvbnRyb2xcIiBbdmFsdWVdPVwidmFsdWVcIj5cbiAgXHQgICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1sYWJlbFwiIFtmb3JdPVwiY3JlYXRlRWxlbWVudElkKHZhbHVlKVwiPnt7dmFsdWV9fTwvbGFiZWw+XG4gIFx0ICA8L2Rpdj5cbiAgICA8L2Rpdj5cblx0PC9maWVsZHNldD5cbjwvZGl2PlxuIl19