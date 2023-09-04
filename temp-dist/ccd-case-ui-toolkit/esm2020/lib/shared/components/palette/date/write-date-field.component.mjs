import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "../../../../components/form/date-input/date-input.component";
import * as i4 from "../utils/field-label.pipe";
import * as i5 from "../utils/first-error.pipe";
import * as i6 from "../utils/is-mandatory.pipe";
import * as i7 from "rpx-xui-translation";
function WriteDateFieldComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 5);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFieldLabel");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind1(3, 3, ctx_r0.caseField)));
} }
function WriteDateFieldComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 6);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.caseField.hint_text));
} }
function WriteDateFieldComponent_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFirstError");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind2(3, 3, ctx_r2.dateControl.errors, ctx_r2.caseField.label)), " ");
} }
const _c0 = function (a0) { return { "form-group-error": a0 }; };
export class WriteDateFieldComponent extends AbstractFieldWriteComponent {
    ngOnInit() {
        this.dateControl = this.registerControl(new FormControl(this.caseField.value));
    }
    isDateTime() {
        return this.caseField.field_type.id === 'DateTime';
    }
}
WriteDateFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵWriteDateFieldComponent_BaseFactory; return function WriteDateFieldComponent_Factory(t) { return (ɵWriteDateFieldComponent_BaseFactory || (ɵWriteDateFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(WriteDateFieldComponent)))(t || WriteDateFieldComponent); }; }();
WriteDateFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteDateFieldComponent, selectors: [["ccd-write-date-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 8, vars: 14, consts: [[1, "form-group", "bottom-30", 3, "id", "ngClass"], ["class", "form-label", 4, "ngIf"], ["class", "form-hint", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], [3, "id", "isDateTime", "mandatory", "isInvalid", "formControl"], [1, "form-label"], [1, "form-hint"], [1, "error-message"]], template: function WriteDateFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "fieldset")(2, "legend");
        i0.ɵɵtemplate(3, WriteDateFieldComponent_span_3_Template, 4, 5, "span", 1);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(4, WriteDateFieldComponent_span_4_Template, 3, 3, "span", 2);
        i0.ɵɵtemplate(5, WriteDateFieldComponent_span_5_Template, 4, 6, "span", 3);
        i0.ɵɵelement(6, "cut-date-input", 4);
        i0.ɵɵpipe(7, "ccdIsMandatory");
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵproperty("id", ctx.id())("ngClass", i0.ɵɵpureFunction1(12, _c0, ctx.dateControl && !ctx.dateControl.valid && (ctx.dateControl.dirty || ctx.dateControl.touched)));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.caseField.label);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.hint_text);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.dateControl && ctx.dateControl.errors && (ctx.dateControl.dirty || ctx.dateControl.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("id", ctx.id())("isDateTime", ctx.isDateTime())("mandatory", i0.ɵɵpipeBind1(7, 10, ctx.caseField))("isInvalid", ctx.dateControl.errors && (ctx.dateControl.dirty || ctx.dateControl.touched))("formControl", ctx.dateControl);
    } }, dependencies: [i1.NgClass, i1.NgIf, i2.NgControlStatus, i2.FormControlDirective, i3.DateInputComponent, i4.FieldLabelPipe, i5.FirstErrorPipe, i6.IsMandatoryPipe, i7.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteDateFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-date-field', template: "<div class=\"form-group bottom-30\" [id]=\"id()\" [ngClass]=\"{'form-group-error': dateControl && !dateControl.valid && (dateControl.dirty || dateControl.touched)}\">\n\n  <fieldset>\n    <legend>\n      <span class=\"form-label\" *ngIf=\"caseField.label\">{{(caseField | ccdFieldLabel) | rpxTranslate }}</span>\n    </legend>\n    <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text | rpxTranslate}}</span>\n    <span class=\"error-message\" *ngIf=\"dateControl && dateControl.errors && (dateControl.dirty || dateControl.touched)\">\n      {{ (dateControl.errors | ccdFirstError:caseField.label ) | rpxTranslate}}\n    </span>\n    <cut-date-input [id]=\"id()\"\n                    [isDateTime]=\"isDateTime()\"\n                    [mandatory]=\"caseField | ccdIsMandatory\"\n                    [isInvalid]=\"dateControl.errors && (dateControl.dirty || dateControl.touched)\"\n                    [formControl]=\"dateControl\"></cut-date-input>\n\n  </fieldset>\n</div>\n" }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtZGF0ZS1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9kYXRlL3dyaXRlLWRhdGUtZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvZGF0ZS93cml0ZS1kYXRlLWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sOENBQThDLENBQUM7Ozs7Ozs7Ozs7SUNFckYsK0JBQWlEO0lBQUEsWUFBK0M7OztJQUFBLGlCQUFPOzs7SUFBdEQsZUFBK0M7SUFBL0Msa0ZBQStDOzs7SUFFbEcsK0JBQW9EO0lBQUEsWUFBc0M7O0lBQUEsaUJBQU87OztJQUE3QyxlQUFzQztJQUF0QyxzRUFBc0M7OztJQUMxRiwrQkFBb0g7SUFDbEgsWUFDRjs7O0lBQUEsaUJBQU87OztJQURMLGVBQ0Y7SUFERSw4SEFDRjs7O0FEREosTUFBTSxPQUFPLHVCQUF3QixTQUFRLDJCQUEyQjtJQUcvRCxRQUFRO1FBQ2IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQWdCLENBQUM7SUFDaEcsQ0FBQztJQUVNLFVBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxVQUFVLENBQUM7SUFDckQsQ0FBQzs7MlFBVFUsdUJBQXVCLFNBQXZCLHVCQUF1QjswRUFBdkIsdUJBQXVCO1FDUnBDLDhCQUFnSyxlQUFBLGFBQUE7UUFJMUosMEVBQXVHO1FBQ3pHLGlCQUFTO1FBQ1QsMEVBQWlHO1FBQ2pHLDBFQUVPO1FBQ1Asb0NBSTZEOztRQUUvRCxpQkFBVyxFQUFBOztRQWhCcUIsNkJBQVcseUlBQUE7UUFJYixlQUFxQjtRQUFyQiwwQ0FBcUI7UUFFeEIsZUFBeUI7UUFBekIsOENBQXlCO1FBQ3JCLGVBQXFGO1FBQXJGLHNIQUFxRjtRQUdsRyxlQUFXO1FBQVgsNkJBQVcsZ0NBQUEsbURBQUEsMkZBQUEsZ0NBQUE7O3VGREZsQix1QkFBdUI7Y0FKbkMsU0FBUzsyQkFDRSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBYnN0cmFjdEZpZWxkV3JpdGVDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlLWZpZWxkL2Fic3RyYWN0LWZpZWxkLXdyaXRlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC13cml0ZS1kYXRlLWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dyaXRlLWRhdGUtZmllbGQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgV3JpdGVEYXRlRmllbGRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZpZWxkV3JpdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgZGF0ZUNvbnRyb2w6IEZvcm1Db250cm9sO1xuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmRhdGVDb250cm9sID0gdGhpcy5yZWdpc3RlckNvbnRyb2wobmV3IEZvcm1Db250cm9sKHRoaXMuY2FzZUZpZWxkLnZhbHVlKSkgYXMgRm9ybUNvbnRyb2w7XG4gIH1cblxuICBwdWJsaWMgaXNEYXRlVGltZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jYXNlRmllbGQuZmllbGRfdHlwZS5pZCA9PT0gJ0RhdGVUaW1lJztcbiAgfVxuXG59XG4iLCI8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBib3R0b20tMzBcIiBbaWRdPVwiaWQoKVwiIFtuZ0NsYXNzXT1cInsnZm9ybS1ncm91cC1lcnJvcic6IGRhdGVDb250cm9sICYmICFkYXRlQ29udHJvbC52YWxpZCAmJiAoZGF0ZUNvbnRyb2wuZGlydHkgfHwgZGF0ZUNvbnRyb2wudG91Y2hlZCl9XCI+XG5cbiAgPGZpZWxkc2V0PlxuICAgIDxsZWdlbmQ+XG4gICAgICA8c3BhbiBjbGFzcz1cImZvcm0tbGFiZWxcIiAqbmdJZj1cImNhc2VGaWVsZC5sYWJlbFwiPnt7KGNhc2VGaWVsZCB8IGNjZEZpZWxkTGFiZWwpIHwgcnB4VHJhbnNsYXRlIH19PC9zcGFuPlxuICAgIDwvbGVnZW5kPlxuICAgIDxzcGFuIGNsYXNzPVwiZm9ybS1oaW50XCIgKm5nSWY9XCJjYXNlRmllbGQuaGludF90ZXh0XCI+e3tjYXNlRmllbGQuaGludF90ZXh0IHwgcnB4VHJhbnNsYXRlfX08L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJlcnJvci1tZXNzYWdlXCIgKm5nSWY9XCJkYXRlQ29udHJvbCAmJiBkYXRlQ29udHJvbC5lcnJvcnMgJiYgKGRhdGVDb250cm9sLmRpcnR5IHx8IGRhdGVDb250cm9sLnRvdWNoZWQpXCI+XG4gICAgICB7eyAoZGF0ZUNvbnRyb2wuZXJyb3JzIHwgY2NkRmlyc3RFcnJvcjpjYXNlRmllbGQubGFiZWwgKSB8IHJweFRyYW5zbGF0ZX19XG4gICAgPC9zcGFuPlxuICAgIDxjdXQtZGF0ZS1pbnB1dCBbaWRdPVwiaWQoKVwiXG4gICAgICAgICAgICAgICAgICAgIFtpc0RhdGVUaW1lXT1cImlzRGF0ZVRpbWUoKVwiXG4gICAgICAgICAgICAgICAgICAgIFttYW5kYXRvcnldPVwiY2FzZUZpZWxkIHwgY2NkSXNNYW5kYXRvcnlcIlxuICAgICAgICAgICAgICAgICAgICBbaXNJbnZhbGlkXT1cImRhdGVDb250cm9sLmVycm9ycyAmJiAoZGF0ZUNvbnRyb2wuZGlydHkgfHwgZGF0ZUNvbnRyb2wudG91Y2hlZClcIlxuICAgICAgICAgICAgICAgICAgICBbZm9ybUNvbnRyb2xdPVwiZGF0ZUNvbnRyb2xcIj48L2N1dC1kYXRlLWlucHV0PlxuXG4gIDwvZmllbGRzZXQ+XG48L2Rpdj5cbiJdfQ==