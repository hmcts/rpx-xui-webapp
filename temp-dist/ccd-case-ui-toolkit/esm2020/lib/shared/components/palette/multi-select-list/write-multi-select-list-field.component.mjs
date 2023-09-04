import { Component } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../utils/field-label.pipe";
import * as i3 from "../utils/first-error.pipe";
import * as i4 from "rpx-xui-translation";
function WriteMultiSelectListFieldComponent_span_3_Template(rf, ctx) { if (rf & 1) {
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
function WriteMultiSelectListFieldComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 6);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r1.caseField.hint_text));
} }
function WriteMultiSelectListFieldComponent_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFirstError");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind2(3, 3, ctx_r2.checkboxes.errors, ctx_r2.caseField.label)));
} }
function WriteMultiSelectListFieldComponent_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 8)(2, "input", 9);
    i0.ɵɵlistener("change", function WriteMultiSelectListFieldComponent_ng_container_6_Template_input_change_2_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r5.onCheckChange($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "label", 10);
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "rpxTranslate");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const checkbox_r4 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", ctx_r3.id() + "-" + checkbox_r4.code)("name", ctx_r3.id())("value", checkbox_r4.code)("checked", ctx_r3.isSelected(checkbox_r4.code));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("for", ctx_r3.id() + "-" + checkbox_r4.code);
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(5, 6, checkbox_r4.label));
} }
const _c0 = function (a0) { return { "error": a0 }; };
export class WriteMultiSelectListFieldComponent extends AbstractFieldWriteComponent {
    ngOnInit() {
        this.checkboxes = new FormArray([]);
        // Initialise array with existing values
        if (this.caseField.value && Array.isArray(this.caseField.value)) {
            const values = this.caseField.value;
            values.forEach(value => {
                this.checkboxes.push(new FormControl(value));
            });
        }
        this.registerControl(this.checkboxes, true);
        if (this.caseField.display_context && this.caseField.display_context === 'MANDATORY' && this.caseField.field_type
            && this.caseField.field_type.type === 'MultiSelectList' && this.caseField.field_type.fixed_list_items.length > 0
            && this.checkboxes.controls.length === 0) {
            if (this.caseField.field_type.fixed_list_items[0].code) {
                this.checkboxes.push(new FormControl(this.caseField.field_type.fixed_list_items[0].code));
                this.checkboxes.removeAt(0);
            }
        }
    }
    onCheckChange(event) {
        if (!this.isSelected(event.target.value)) {
            // Add a new control in the FormArray
            this.checkboxes.push(new FormControl(event.target.value));
        }
        else {
            // Remove the control form the FormArray
            this.checkboxes.controls.forEach((ctrl, i) => {
                if (ctrl.value === event.target.value) {
                    this.checkboxes.removeAt(i);
                    return;
                }
            });
        }
    }
    isSelected(code) {
        if (this.checkboxes && this.checkboxes.controls) {
            return this.checkboxes.controls.find(control => control.value === code);
        }
    }
}
WriteMultiSelectListFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵWriteMultiSelectListFieldComponent_BaseFactory; return function WriteMultiSelectListFieldComponent_Factory(t) { return (ɵWriteMultiSelectListFieldComponent_BaseFactory || (ɵWriteMultiSelectListFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(WriteMultiSelectListFieldComponent)))(t || WriteMultiSelectListFieldComponent); }; }();
WriteMultiSelectListFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteMultiSelectListFieldComponent, selectors: [["ccd-write-multi-select-list-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 7, vars: 8, consts: [[1, "form-group", "bottom-30", 3, "ngClass", "id"], ["class", "form-label", 4, "ngIf"], ["class", "form-hint", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "form-label"], [1, "form-hint"], [1, "error-message"], [1, "multiple-choice"], ["type", "checkbox", 1, "form-control", 3, "id", "name", "value", "checked", "change"], [1, "form-label", 3, "for"]], template: function WriteMultiSelectListFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "fieldset")(2, "legend");
        i0.ɵɵtemplate(3, WriteMultiSelectListFieldComponent_span_3_Template, 4, 5, "span", 1);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(4, WriteMultiSelectListFieldComponent_span_4_Template, 3, 3, "span", 2);
        i0.ɵɵtemplate(5, WriteMultiSelectListFieldComponent_span_5_Template, 4, 6, "span", 3);
        i0.ɵɵtemplate(6, WriteMultiSelectListFieldComponent_ng_container_6_Template, 6, 8, "ng-container", 4);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(6, _c0, !ctx.checkboxes.valid && (ctx.checkboxes.dirty || ctx.checkboxes.touched)))("id", ctx.id());
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.caseField.label);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.hint_text);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.checkboxes.errors && (ctx.checkboxes.dirty || ctx.checkboxes.touched));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.caseField.field_type.fixed_list_items);
    } }, dependencies: [i1.NgClass, i1.NgForOf, i1.NgIf, i2.FieldLabelPipe, i3.FirstErrorPipe, i4.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteMultiSelectListFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-multi-select-list-field', template: "<div class=\"form-group bottom-30\" [ngClass]=\"{'error': !checkboxes.valid && (checkboxes.dirty || checkboxes.touched)}\" [id]=\"id()\">\n\n  <fieldset>\n\n    <legend>\n      <span class=\"form-label\" *ngIf=\"caseField.label\">{{caseField | ccdFieldLabel | rpxTranslate}}</span>\n    </legend>\n    <span *ngIf=\"caseField.hint_text\" class=\"form-hint\">{{caseField.hint_text | rpxTranslate}}</span>\n    <span *ngIf=\"checkboxes.errors && (checkboxes.dirty || checkboxes.touched)\" class=\"error-message\">{{checkboxes.errors | ccdFirstError:caseField.label | rpxTranslate}}</span>\n\n    <ng-container *ngFor=\"let checkbox of caseField.field_type.fixed_list_items\">\n\n      <div class=\"multiple-choice\">\n        <input class=\"form-control\" [id]=\"id()+'-'+checkbox.code\" [name]=\"id()\" type=\"checkbox\" [value]=\"checkbox.code\" [checked]=\"isSelected(checkbox.code)\" (change)=\"onCheckChange($event)\">\n        <label class=\"form-label\" [for]=\"id()+'-'+checkbox.code\">{{checkbox.label | rpxTranslate}}</label>\n      </div>\n\n    </ng-container>\n\n  </fieldset>\n\n</div>\n" }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtbXVsdGktc2VsZWN0LWxpc3QtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvbXVsdGktc2VsZWN0LWxpc3Qvd3JpdGUtbXVsdGktc2VsZWN0LWxpc3QtZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvbXVsdGktc2VsZWN0LWxpc3Qvd3JpdGUtbXVsdGktc2VsZWN0LWxpc3QtZmllbGQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBbUIsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXpFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDOzs7Ozs7O0lDRXJGLCtCQUFpRDtJQUFBLFlBQTRDOzs7SUFBQSxpQkFBTzs7O0lBQW5ELGVBQTRDO0lBQTVDLGtGQUE0Qzs7O0lBRS9GLCtCQUFvRDtJQUFBLFlBQXNDOztJQUFBLGlCQUFPOzs7SUFBN0MsZUFBc0M7SUFBdEMsc0VBQXNDOzs7SUFDMUYsK0JBQWtHO0lBQUEsWUFBb0U7OztJQUFBLGlCQUFPOzs7SUFBM0UsZUFBb0U7SUFBcEUsa0hBQW9FOzs7O0lBRXRLLDZCQUE2RTtJQUUzRSw4QkFBNkIsZUFBQTtJQUMySCwrTEFBVSxlQUFBLDRCQUFxQixDQUFBLElBQUM7SUFBdEwsaUJBQXVMO0lBQ3ZMLGlDQUF5RDtJQUFBLFlBQWlDOztJQUFBLGlCQUFRLEVBQUE7SUFHdEcsMEJBQWU7Ozs7SUFKaUIsZUFBNkI7SUFB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a0M7UUNUL0MsOEJBQW1JLGVBQUEsYUFBQTtRQUs3SCxxRkFBb0c7UUFDdEcsaUJBQVM7UUFDVCxxRkFBaUc7UUFDakcscUZBQTZLO1FBRTdLLHFHQU9lO1FBRWpCLGlCQUFXLEVBQUE7O1FBbkJxQiwrSEFBb0YsZ0JBQUE7UUFLdEYsZUFBcUI7UUFBckIsMENBQXFCO1FBRTFDLGVBQXlCO1FBQXpCLDhDQUF5QjtRQUN6QixlQUFtRTtRQUFuRSxnR0FBbUU7UUFFdkMsZUFBd0M7UUFBeEMsbUVBQXdDOzt1RkREbEUsa0NBQWtDO2NBSjlDLFNBQVM7MkJBQ0UsbUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUFycmF5LCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgQWJzdHJhY3RGaWVsZFdyaXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC13cml0ZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2Qtd3JpdGUtbXVsdGktc2VsZWN0LWxpc3QtZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJy4vd3JpdGUtbXVsdGktc2VsZWN0LWxpc3QtZmllbGQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgV3JpdGVNdWx0aVNlbGVjdExpc3RGaWVsZENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmllbGRXcml0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHVibGljIGNoZWNrYm94ZXM6IEZvcm1BcnJheTtcblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja2JveGVzID0gbmV3IEZvcm1BcnJheShbXSk7XG5cbiAgICAvLyBJbml0aWFsaXNlIGFycmF5IHdpdGggZXhpc3RpbmcgdmFsdWVzXG4gICAgaWYgKHRoaXMuY2FzZUZpZWxkLnZhbHVlICYmIEFycmF5LmlzQXJyYXkodGhpcy5jYXNlRmllbGQudmFsdWUpKSB7XG4gICAgICBjb25zdCB2YWx1ZXM6IHN0cmluZ1tdID0gdGhpcy5jYXNlRmllbGQudmFsdWU7XG4gICAgICB2YWx1ZXMuZm9yRWFjaCh2YWx1ZSA9PiB7XG4gICAgICAgIHRoaXMuY2hlY2tib3hlcy5wdXNoKG5ldyBGb3JtQ29udHJvbCh2YWx1ZSkpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMucmVnaXN0ZXJDb250cm9sKHRoaXMuY2hlY2tib3hlcywgdHJ1ZSk7XG4gICAgaWYgKHRoaXMuY2FzZUZpZWxkLmRpc3BsYXlfY29udGV4dCAmJiB0aGlzLmNhc2VGaWVsZC5kaXNwbGF5X2NvbnRleHQgPT09ICdNQU5EQVRPUlknICYmIHRoaXMuY2FzZUZpZWxkLmZpZWxkX3R5cGVcbiAgICAgICAgICAmJiB0aGlzLmNhc2VGaWVsZC5maWVsZF90eXBlLnR5cGUgPT09ICdNdWx0aVNlbGVjdExpc3QnICYmIHRoaXMuY2FzZUZpZWxkLmZpZWxkX3R5cGUuZml4ZWRfbGlzdF9pdGVtcy5sZW5ndGggPiAwXG4gICAgICAgICAgICAmJiB0aGlzLmNoZWNrYm94ZXMuY29udHJvbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmNhc2VGaWVsZC5maWVsZF90eXBlLmZpeGVkX2xpc3RfaXRlbXNbMF0uY29kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tib3hlcy5wdXNoKG5ldyBGb3JtQ29udHJvbCh0aGlzLmNhc2VGaWVsZC5maWVsZF90eXBlLmZpeGVkX2xpc3RfaXRlbXNbMF0uY29kZSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tib3hlcy5yZW1vdmVBdCgwKTtcbiAgICAgICAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbkNoZWNrQ2hhbmdlKGV2ZW50KSB7XG4gICAgaWYgKCF0aGlzLmlzU2VsZWN0ZWQoZXZlbnQudGFyZ2V0LnZhbHVlKSkge1xuICAgICAgLy8gQWRkIGEgbmV3IGNvbnRyb2wgaW4gdGhlIEZvcm1BcnJheVxuICAgICAgdGhpcy5jaGVja2JveGVzLnB1c2gobmV3IEZvcm1Db250cm9sKGV2ZW50LnRhcmdldC52YWx1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZW1vdmUgdGhlIGNvbnRyb2wgZm9ybSB0aGUgRm9ybUFycmF5XG4gICAgICB0aGlzLmNoZWNrYm94ZXMuY29udHJvbHMuZm9yRWFjaCgoY3RybDogRm9ybUNvbnRyb2wsIGkpID0+IHtcbiAgICAgICAgaWYgKGN0cmwudmFsdWUgPT09IGV2ZW50LnRhcmdldC52YWx1ZSkge1xuICAgICAgICAgIHRoaXMuY2hlY2tib3hlcy5yZW1vdmVBdChpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc1NlbGVjdGVkKGNvZGUpOiBBYnN0cmFjdENvbnRyb2wge1xuICAgIGlmICh0aGlzLmNoZWNrYm94ZXMgJiYgdGhpcy5jaGVja2JveGVzLmNvbnRyb2xzKSB7XG4gICAgICByZXR1cm4gdGhpcy5jaGVja2JveGVzLmNvbnRyb2xzLmZpbmQoY29udHJvbCA9PiBjb250cm9sLnZhbHVlID09PSBjb2RlKTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGJvdHRvbS0zMFwiIFtuZ0NsYXNzXT1cInsnZXJyb3InOiAhY2hlY2tib3hlcy52YWxpZCAmJiAoY2hlY2tib3hlcy5kaXJ0eSB8fCBjaGVja2JveGVzLnRvdWNoZWQpfVwiIFtpZF09XCJpZCgpXCI+XG5cbiAgPGZpZWxkc2V0PlxuXG4gICAgPGxlZ2VuZD5cbiAgICAgIDxzcGFuIGNsYXNzPVwiZm9ybS1sYWJlbFwiICpuZ0lmPVwiY2FzZUZpZWxkLmxhYmVsXCI+e3tjYXNlRmllbGQgfCBjY2RGaWVsZExhYmVsIHwgcnB4VHJhbnNsYXRlfX08L3NwYW4+XG4gICAgPC9sZWdlbmQ+XG4gICAgPHNwYW4gKm5nSWY9XCJjYXNlRmllbGQuaGludF90ZXh0XCIgY2xhc3M9XCJmb3JtLWhpbnRcIj57e2Nhc2VGaWVsZC5oaW50X3RleHQgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cbiAgICA8c3BhbiAqbmdJZj1cImNoZWNrYm94ZXMuZXJyb3JzICYmIChjaGVja2JveGVzLmRpcnR5IHx8IGNoZWNrYm94ZXMudG91Y2hlZClcIiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIj57e2NoZWNrYm94ZXMuZXJyb3JzIHwgY2NkRmlyc3RFcnJvcjpjYXNlRmllbGQubGFiZWwgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj5cblxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoZWNrYm94IG9mIGNhc2VGaWVsZC5maWVsZF90eXBlLmZpeGVkX2xpc3RfaXRlbXNcIj5cblxuICAgICAgPGRpdiBjbGFzcz1cIm11bHRpcGxlLWNob2ljZVwiPlxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbaWRdPVwiaWQoKSsnLScrY2hlY2tib3guY29kZVwiIFtuYW1lXT1cImlkKClcIiB0eXBlPVwiY2hlY2tib3hcIiBbdmFsdWVdPVwiY2hlY2tib3guY29kZVwiIFtjaGVja2VkXT1cImlzU2VsZWN0ZWQoY2hlY2tib3guY29kZSlcIiAoY2hhbmdlKT1cIm9uQ2hlY2tDaGFuZ2UoJGV2ZW50KVwiPlxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWxhYmVsXCIgW2Zvcl09XCJpZCgpKyctJytjaGVja2JveC5jb2RlXCI+e3tjaGVja2JveC5sYWJlbCB8IHJweFRyYW5zbGF0ZX19PC9sYWJlbD5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgPC9maWVsZHNldD5cblxuPC9kaXY+XG4iXX0=