import { Component } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../markdown/markdown.component";
import * as i3 from "../utils/field-label.pipe";
import * as i4 from "../utils/first-error.pipe";
function WriteDynamicMultiSelectListFieldComponent_span_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 5);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ccdFieldLabel");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r0.caseField));
} }
function WriteDynamicMultiSelectListFieldComponent_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 6);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r1.caseField.hint_text);
} }
function WriteDynamicMultiSelectListFieldComponent_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 7);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "ccdFirstError");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, ctx_r2.checkboxes.errors));
} }
function WriteDynamicMultiSelectListFieldComponent_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 8)(2, "input", 9);
    i0.ɵɵlistener("change", function WriteDynamicMultiSelectListFieldComponent_ng_container_6_Template_input_change_2_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r5 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r5.onCheckChange($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "label", 10);
    i0.ɵɵelement(4, "ccd-markdown", 11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const checkbox_r4 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵpropertyInterpolate("id", ctx_r3.createElementId(checkbox_r4.code));
    i0.ɵɵpropertyInterpolate("name", ctx_r3.id());
    i0.ɵɵproperty("value", checkbox_r4.code)("checked", ctx_r3.isSelected(checkbox_r4.code));
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate("for", ctx_r3.createElementId(checkbox_r4.code));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("content", checkbox_r4.label);
} }
const _c0 = function (a0) { return { "error": a0 }; };
export class WriteDynamicMultiSelectListFieldComponent extends AbstractFieldWriteComponent {
    ngOnInit() {
        this.checkboxes = new FormArray([]);
        this.setInitialCaseList();
        this.setInitialCaseFieldValue();
        // Initialise array with existing values
        if (this.caseField.value && Array.isArray(this.caseField.value)) {
            const values = this.caseField.value;
            values.forEach(value => {
                this.checkboxes.push(new FormControl(value));
            });
        }
        this.dynamicListFormControl = this.registerControl(new FormControl(this.checkboxes.value));
        this.dynamicListFormControl.setValue(this.checkboxes.value);
    }
    onCheckChange(event) {
        const target = event.target;
        if (!target || !target.value) {
            return;
        }
        const selectedListItem = this.getValueListItem(target.value);
        if (!this.isSelected(target.value)) {
            // Add a new control in the FormArray
            this.checkboxes.push(new FormControl(selectedListItem));
        }
        else {
            // Remove the control from the FormArray
            this.checkboxes.controls.forEach((ctrl, i) => {
                if (ctrl.value.code === target.value) {
                    this.checkboxes.removeAt(i);
                }
            });
        }
        this.dynamicListFormControl.setValue(this.checkboxes.value);
    }
    isSelected(code) {
        if (this.checkboxes && this.checkboxes.controls) {
            return this.checkboxes.controls.find(control => control.value.code === code);
        }
    }
    getValueListItem(value) {
        return this.caseField.list_items.find(i => i.code === value);
    }
    setInitialCaseList() {
        const hasListItems = this.caseField.list_items && this.caseField.list_items.length > 0;
        const hasFormattedListItems = this.caseField.formatted_value && this.caseField.formatted_value.list_items.length > 0;
        if (!hasListItems && hasFormattedListItems) {
            this.caseField.list_items = this.caseField.formatted_value.list_items;
        }
    }
    setInitialCaseFieldValue() {
        if (!this.caseField.value && this.caseField.formatted_value && this.caseField.formatted_value.value) {
            this.caseField.value = this.caseField.formatted_value.value;
        }
        const isNull = this.caseField.value === undefined || this.caseField.value === '';
        if (isNull || !Array.isArray(this.caseField.value)) {
            this.caseField.value = [];
        }
    }
}
WriteDynamicMultiSelectListFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵWriteDynamicMultiSelectListFieldComponent_BaseFactory; return function WriteDynamicMultiSelectListFieldComponent_Factory(t) { return (ɵWriteDynamicMultiSelectListFieldComponent_BaseFactory || (ɵWriteDynamicMultiSelectListFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(WriteDynamicMultiSelectListFieldComponent)))(t || WriteDynamicMultiSelectListFieldComponent); }; }();
WriteDynamicMultiSelectListFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteDynamicMultiSelectListFieldComponent, selectors: [["ccd-write-dynamic-multi-select-list-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 7, vars: 8, consts: [[1, "form-group", "bottom-30", 3, "ngClass", "id"], ["class", "form-label", 4, "ngIf"], ["class", "form-hint", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], [4, "ngFor", "ngForOf"], [1, "form-label"], [1, "form-hint"], [1, "error-message"], [1, "multiple-choice"], ["type", "checkbox", 1, "form-control", 3, "id", "name", "value", "checked", "change"], [1, "form-label", 3, "for"], [3, "content"]], template: function WriteDynamicMultiSelectListFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "fieldset")(2, "legend");
        i0.ɵɵtemplate(3, WriteDynamicMultiSelectListFieldComponent_span_3_Template, 3, 3, "span", 1);
        i0.ɵɵtemplate(4, WriteDynamicMultiSelectListFieldComponent_span_4_Template, 2, 1, "span", 2);
        i0.ɵɵtemplate(5, WriteDynamicMultiSelectListFieldComponent_span_5_Template, 3, 3, "span", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(6, WriteDynamicMultiSelectListFieldComponent_ng_container_6_Template, 5, 6, "ng-container", 4);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(6, _c0, !ctx.checkboxes.valid && ctx.checkboxes.touched))("id", ctx.id());
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.caseField.label);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.caseField.hint_text);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.checkboxes.errors && ctx.checkboxes.touched);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.caseField.list_items);
    } }, dependencies: [i1.NgClass, i1.NgForOf, i1.NgIf, i2.MarkdownComponent, i3.FieldLabelPipe, i4.FirstErrorPipe], styles: ["ccd-markdown[_ngcontent-%COMP%]{display:inline-block}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteDynamicMultiSelectListFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-dynamic-multi-select-list-field', template: "<div class=\"form-group bottom-30\" [ngClass]=\"{'error': !checkboxes.valid && checkboxes.touched}\" [id]=\"id()\">\n\n  <fieldset>\n\n    <legend>\n      <span *ngIf=\"caseField.label\" class=\"form-label\">{{caseField | ccdFieldLabel}}</span>\n      <span *ngIf=\"caseField.hint_text\" class=\"form-hint\">{{caseField.hint_text}}</span>\n      <span *ngIf=\"checkboxes.errors && checkboxes.touched\" class=\"error-message\">{{checkboxes.errors |\n        ccdFirstError}}</span>\n    </legend>\n\n    <ng-container *ngFor=\"let checkbox of caseField.list_items\">\n\n      <div class=\"multiple-choice\">\n        <input class=\"form-control\" id=\"{{ createElementId(checkbox.code) }}\" name=\"{{ id() }}\" type=\"checkbox\"\n          [value]=\"checkbox.code\" [checked]=\"isSelected(checkbox.code)\" (change)=\"onCheckChange($event)\">\n        <label class=\"form-label\" for=\"{{ createElementId(checkbox.code) }}\">\n          <ccd-markdown [content]=\"checkbox.label\"></ccd-markdown>\n        </label>\n      </div>\n\n    </ng-container>\n\n  </fieldset>\n\n</div>\n", styles: ["ccd-markdown{display:inline-block}\n"] }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtZHluYW1pYy1tdWx0aS1zZWxlY3QtbGlzdC1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9keW5hbWljLW11bHRpLXNlbGVjdC1saXN0L3dyaXRlLWR5bmFtaWMtbXVsdGktc2VsZWN0LWxpc3QtZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvZHluYW1pYy1tdWx0aS1zZWxlY3QtbGlzdC93cml0ZS1keW5hbWljLW11bHRpLXNlbGVjdC1saXN0LWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQW1CLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQzs7Ozs7OztJQ0dyRiwrQkFBaUQ7SUFBQSxZQUE2Qjs7SUFBQSxpQkFBTzs7O0lBQXBDLGVBQTZCO0lBQTdCLDREQUE2Qjs7O0lBQzlFLCtCQUFvRDtJQUFBLFlBQXVCO0lBQUEsaUJBQU87OztJQUE5QixlQUF1QjtJQUF2QixnREFBdUI7OztJQUMzRSwrQkFBNEU7SUFBQSxZQUMzRDs7SUFBQSxpQkFBTzs7O0lBRG9ELGVBQzNEO0lBRDJELG9FQUMzRDs7OztJQUduQiw2QkFBNEQ7SUFFMUQsOEJBQTZCLGVBQUE7SUFFcUMsc01BQVUsZUFBQSw0QkFBcUIsQ0FBQSxJQUFDO0lBRGhHLGlCQUNpRztJQUNqRyxpQ0FBcUU7SUFDbkUsbUNBQXdEO0lBQzFELGlC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Riw0RkFBa0Y7UUFDbEYsNEZBQ3dCO1FBQzFCLGlCQUFTO1FBRVQsNEdBVWU7UUFFakIsaUJBQVcsRUFBQTs7UUF2QnFCLHFHQUE4RCxnQkFBQTtRQUtuRixlQUFxQjtRQUFyQiwwQ0FBcUI7UUFDckIsZUFBeUI7UUFBekIsOENBQXlCO1FBQ3pCLGVBQTZDO1FBQTdDLHNFQUE2QztRQUluQixlQUF1QjtRQUF2QixrREFBdUI7O3VGREZqRCx5Q0FBeUM7Y0FMckQsU0FBUzsyQkFDRSwyQ0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sLCBGb3JtQXJyYXksIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQWJzdHJhY3RGaWVsZFdyaXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC13cml0ZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2Qtd3JpdGUtZHluYW1pYy1tdWx0aS1zZWxlY3QtbGlzdC1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi93cml0ZS1keW5hbWljLW11bHRpLXNlbGVjdC1saXN0LWZpZWxkLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi93cml0ZS1keW5hbWljLW11bHRpLXNlbGVjdC1saXN0LWZpZWxkLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgV3JpdGVEeW5hbWljTXVsdGlTZWxlY3RMaXN0RmllbGRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZpZWxkV3JpdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgY2hlY2tib3hlczogRm9ybUFycmF5O1xuICBwdWJsaWMgZHluYW1pY0xpc3RGb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tib3hlcyA9IG5ldyBGb3JtQXJyYXkoW10pO1xuXG4gICAgdGhpcy5zZXRJbml0aWFsQ2FzZUxpc3QoKTtcbiAgICB0aGlzLnNldEluaXRpYWxDYXNlRmllbGRWYWx1ZSgpO1xuXG4gICAgLy8gSW5pdGlhbGlzZSBhcnJheSB3aXRoIGV4aXN0aW5nIHZhbHVlc1xuICAgIGlmICh0aGlzLmNhc2VGaWVsZC52YWx1ZSAmJiBBcnJheS5pc0FycmF5KHRoaXMuY2FzZUZpZWxkLnZhbHVlKSkge1xuICAgICAgY29uc3QgdmFsdWVzID0gdGhpcy5jYXNlRmllbGQudmFsdWU7XG5cbiAgICAgIHZhbHVlcy5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgICAgdGhpcy5jaGVja2JveGVzLnB1c2gobmV3IEZvcm1Db250cm9sKHZhbHVlKSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLmR5bmFtaWNMaXN0Rm9ybUNvbnRyb2wgPSB0aGlzLnJlZ2lzdGVyQ29udHJvbChuZXcgRm9ybUNvbnRyb2wodGhpcy5jaGVja2JveGVzLnZhbHVlKSkgYXMgRm9ybUNvbnRyb2w7XG4gICAgdGhpcy5keW5hbWljTGlzdEZvcm1Db250cm9sLnNldFZhbHVlKHRoaXMuY2hlY2tib3hlcy52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgb25DaGVja0NoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcblxuICAgIGlmICghdGFyZ2V0IHx8ICF0YXJnZXQudmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RlZExpc3RJdGVtOiBvYmplY3QgPSB0aGlzLmdldFZhbHVlTGlzdEl0ZW0odGFyZ2V0LnZhbHVlKTtcblxuICAgIGlmICghdGhpcy5pc1NlbGVjdGVkKHRhcmdldC52YWx1ZSkpIHtcbiAgICAgIC8vIEFkZCBhIG5ldyBjb250cm9sIGluIHRoZSBGb3JtQXJyYXlcbiAgICAgIHRoaXMuY2hlY2tib3hlcy5wdXNoKG5ldyBGb3JtQ29udHJvbChzZWxlY3RlZExpc3RJdGVtKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlbW92ZSB0aGUgY29udHJvbCBmcm9tIHRoZSBGb3JtQXJyYXlcbiAgICAgIHRoaXMuY2hlY2tib3hlcy5jb250cm9scy5mb3JFYWNoKChjdHJsOiBGb3JtQ29udHJvbCwgaSkgPT4ge1xuICAgICAgICBpZiAoY3RybC52YWx1ZS5jb2RlID09PSB0YXJnZXQudmFsdWUpIHtcbiAgICAgICAgICB0aGlzLmNoZWNrYm94ZXMucmVtb3ZlQXQoaSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuZHluYW1pY0xpc3RGb3JtQ29udHJvbC5zZXRWYWx1ZSh0aGlzLmNoZWNrYm94ZXMudmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGlzU2VsZWN0ZWQoY29kZTogc3RyaW5nKTogQWJzdHJhY3RDb250cm9sIHtcbiAgICBpZiAodGhpcy5jaGVja2JveGVzICYmIHRoaXMuY2hlY2tib3hlcy5jb250cm9scykge1xuICAgICAgcmV0dXJuIHRoaXMuY2hlY2tib3hlcy5jb250cm9scy5maW5kKGNvbnRyb2wgPT4gY29udHJvbC52YWx1ZS5jb2RlID09PSBjb2RlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldFZhbHVlTGlzdEl0ZW0odmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmNhc2VGaWVsZC5saXN0X2l0ZW1zLmZpbmQoaSA9PiBpLmNvZGUgPT09IHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0SW5pdGlhbENhc2VMaXN0KCk6IHZvaWQge1xuICAgIGNvbnN0IGhhc0xpc3RJdGVtcyA9IHRoaXMuY2FzZUZpZWxkLmxpc3RfaXRlbXMgJiYgdGhpcy5jYXNlRmllbGQubGlzdF9pdGVtcy5sZW5ndGggPiAwO1xuICAgIGNvbnN0IGhhc0Zvcm1hdHRlZExpc3RJdGVtcyA9IHRoaXMuY2FzZUZpZWxkLmZvcm1hdHRlZF92YWx1ZSAmJiB0aGlzLmNhc2VGaWVsZC5mb3JtYXR0ZWRfdmFsdWUubGlzdF9pdGVtcy5sZW5ndGggPiAwO1xuXG4gICAgaWYgKCFoYXNMaXN0SXRlbXMgJiYgaGFzRm9ybWF0dGVkTGlzdEl0ZW1zKSB7XG4gICAgICB0aGlzLmNhc2VGaWVsZC5saXN0X2l0ZW1zID0gdGhpcy5jYXNlRmllbGQuZm9ybWF0dGVkX3ZhbHVlLmxpc3RfaXRlbXM7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRJbml0aWFsQ2FzZUZpZWxkVmFsdWUoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmNhc2VGaWVsZC52YWx1ZSAmJiB0aGlzLmNhc2VGaWVsZC5mb3JtYXR0ZWRfdmFsdWUgJiYgdGhpcy5jYXNlRmllbGQuZm9ybWF0dGVkX3ZhbHVlLnZhbHVlKSB7XG4gICAgICB0aGlzLmNhc2VGaWVsZC52YWx1ZSA9IHRoaXMuY2FzZUZpZWxkLmZvcm1hdHRlZF92YWx1ZS52YWx1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBpc051bGwgPSB0aGlzLmNhc2VGaWVsZC52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuY2FzZUZpZWxkLnZhbHVlID09PSAnJztcblxuICAgIGlmIChpc051bGwgfHwgIUFycmF5LmlzQXJyYXkodGhpcy5jYXNlRmllbGQudmFsdWUpKSB7XG4gICAgICB0aGlzLmNhc2VGaWVsZC52YWx1ZSA9IFtdO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgYm90dG9tLTMwXCIgW25nQ2xhc3NdPVwieydlcnJvcic6ICFjaGVja2JveGVzLnZhbGlkICYmIGNoZWNrYm94ZXMudG91Y2hlZH1cIiBbaWRdPVwiaWQoKVwiPlxuXG4gIDxmaWVsZHNldD5cblxuICAgIDxsZWdlbmQ+XG4gICAgICA8c3BhbiAqbmdJZj1cImNhc2VGaWVsZC5sYWJlbFwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPnt7Y2FzZUZpZWxkIHwgY2NkRmllbGRMYWJlbH19PC9zcGFuPlxuICAgICAgPHNwYW4gKm5nSWY9XCJjYXNlRmllbGQuaGludF90ZXh0XCIgY2xhc3M9XCJmb3JtLWhpbnRcIj57e2Nhc2VGaWVsZC5oaW50X3RleHR9fTwvc3Bhbj5cbiAgICAgIDxzcGFuICpuZ0lmPVwiY2hlY2tib3hlcy5lcnJvcnMgJiYgY2hlY2tib3hlcy50b3VjaGVkXCIgY2xhc3M9XCJlcnJvci1tZXNzYWdlXCI+e3tjaGVja2JveGVzLmVycm9ycyB8XG4gICAgICAgIGNjZEZpcnN0RXJyb3J9fTwvc3Bhbj5cbiAgICA8L2xlZ2VuZD5cblxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoZWNrYm94IG9mIGNhc2VGaWVsZC5saXN0X2l0ZW1zXCI+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJtdWx0aXBsZS1jaG9pY2VcIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJ7eyBjcmVhdGVFbGVtZW50SWQoY2hlY2tib3guY29kZSkgfX1cIiBuYW1lPVwie3sgaWQoKSB9fVwiIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgW3ZhbHVlXT1cImNoZWNrYm94LmNvZGVcIiBbY2hlY2tlZF09XCJpc1NlbGVjdGVkKGNoZWNrYm94LmNvZGUpXCIgKGNoYW5nZSk9XCJvbkNoZWNrQ2hhbmdlKCRldmVudClcIj5cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1sYWJlbFwiIGZvcj1cInt7IGNyZWF0ZUVsZW1lbnRJZChjaGVja2JveC5jb2RlKSB9fVwiPlxuICAgICAgICAgIDxjY2QtbWFya2Rvd24gW2NvbnRlbnRdPVwiY2hlY2tib3gubGFiZWxcIj48L2NjZC1tYXJrZG93bj5cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9uZy1jb250YWluZXI+XG5cbiAgPC9maWVsZHNldD5cblxuPC9kaXY+XG4iXX0=