import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../markdown/markdown.component";
import * as i3 from "../fixed-list/fixed-list.pipe";
function ReadDynamicMultiSelectListFieldComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "ccd-markdown", 1);
    i0.ɵɵpipe(2, "ccdFixedList");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const value_r1 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("content", i0.ɵɵpipeBind2(2, 1, value_r1.code, ctx_r0.caseField.list_items));
} }
export class ReadDynamicMultiSelectListFieldComponent extends AbstractFieldReadComponent {
    ngOnInit() {
        /**
         *
         * Reassigning list_items from formatted_list when list_items is empty
         */
        if (!this.caseField.list_items && this.caseField.formatted_value && this.caseField.formatted_value.list_items) {
            this.caseField.list_items = this.caseField.formatted_value.list_items;
        }
        if (!this.caseField.value && this.caseField.formatted_value && this.caseField.formatted_value.value) {
            this.caseField.value = this.caseField.formatted_value.value;
        }
        super.ngOnInit();
    }
}
ReadDynamicMultiSelectListFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadDynamicMultiSelectListFieldComponent_BaseFactory; return function ReadDynamicMultiSelectListFieldComponent_Factory(t) { return (ɵReadDynamicMultiSelectListFieldComponent_BaseFactory || (ɵReadDynamicMultiSelectListFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadDynamicMultiSelectListFieldComponent)))(t || ReadDynamicMultiSelectListFieldComponent); }; }();
ReadDynamicMultiSelectListFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadDynamicMultiSelectListFieldComponent, selectors: [["ccd-read-dynamic-multi-select-list-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[4, "ngFor", "ngForOf"], [3, "content"]], template: function ReadDynamicMultiSelectListFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, ReadDynamicMultiSelectListFieldComponent_div_0_Template, 3, 4, "div", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngForOf", ctx.caseField.value);
    } }, dependencies: [i1.NgForOf, i2.MarkdownComponent, i3.FixedListPipe], styles: [".multi-select-list-field-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] > td[_ngcontent-%COMP%]{padding:5px 0}.multi-select-list-field-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child > td[_ngcontent-%COMP%]{border-bottom:none}.multi-select-list-field-table[_ngcontent-%COMP%]   td.collection-actions[_ngcontent-%COMP%]{width:1px;white-space:nowrap}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadDynamicMultiSelectListFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-read-dynamic-multi-select-list-field', template: "<div *ngFor=\"let value of caseField.value\">\n  <ccd-markdown [content]=\"value.code | ccdFixedList:caseField.list_items\"></ccd-markdown>\n</div>\n", styles: [".multi-select-list-field-table tr>td{padding:5px 0}.multi-select-list-field-table tr:last-child>td{border-bottom:none}.multi-select-list-field-table td.collection-actions{width:1px;white-space:nowrap}\n"] }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1keW5hbWljLW11bHRpLXNlbGVjdC1saXN0LWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2R5bmFtaWMtbXVsdGktc2VsZWN0LWxpc3QvcmVhZC1keW5hbWljLW11bHRpLXNlbGVjdC1saXN0LWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2R5bmFtaWMtbXVsdGktc2VsZWN0LWxpc3QvcmVhZC1keW5hbWljLW11bHRpLXNlbGVjdC1saXN0LWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7Ozs7O0lDRHpGLDJCQUEyQztJQUN6QyxrQ0FBd0Y7O0lBQzFGLGlCQUFNOzs7O0lBRFUsZUFBMEQ7SUFBMUQsMEZBQTBEOztBRE8xRSxNQUFNLE9BQU8sd0NBQXlDLFNBQVEsMEJBQTBCO0lBQy9FLFFBQVE7UUFDYjs7O1dBR0c7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFO1lBQzdHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQztTQUN2RTtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUU7WUFDbkcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO1NBQzdEO1FBRUQsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25CLENBQUM7O2dXQWZVLHdDQUF3QyxTQUF4Qyx3Q0FBd0M7MkZBQXhDLHdDQUF3QztRQ1JyRCx5RkFFTTs7UUFGaUIsNkNBQWtCOzt1RkRRNUIsd0NBQXdDO2NBTHBELFNBQVM7MkJBQ0UsMENBQTBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC1yZWFkLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1yZWFkLWR5bmFtaWMtbXVsdGktc2VsZWN0LWxpc3QtZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJy4vcmVhZC1keW5hbWljLW11bHRpLXNlbGVjdC1saXN0LWZpZWxkLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9yZWFkLWR5bmFtaWMtbXVsdGktc2VsZWN0LWxpc3QtZmllbGQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBSZWFkRHluYW1pY011bHRpU2VsZWN0TGlzdEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGaWVsZFJlYWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBSZWFzc2lnbmluZyBsaXN0X2l0ZW1zIGZyb20gZm9ybWF0dGVkX2xpc3Qgd2hlbiBsaXN0X2l0ZW1zIGlzIGVtcHR5XG4gICAgICovXG4gICAgaWYgKCF0aGlzLmNhc2VGaWVsZC5saXN0X2l0ZW1zICYmIHRoaXMuY2FzZUZpZWxkLmZvcm1hdHRlZF92YWx1ZSAmJiB0aGlzLmNhc2VGaWVsZC5mb3JtYXR0ZWRfdmFsdWUubGlzdF9pdGVtcykge1xuICAgICAgdGhpcy5jYXNlRmllbGQubGlzdF9pdGVtcyA9IHRoaXMuY2FzZUZpZWxkLmZvcm1hdHRlZF92YWx1ZS5saXN0X2l0ZW1zO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5jYXNlRmllbGQudmFsdWUgJiYgdGhpcy5jYXNlRmllbGQuZm9ybWF0dGVkX3ZhbHVlICYmIHRoaXMuY2FzZUZpZWxkLmZvcm1hdHRlZF92YWx1ZS52YWx1ZSkge1xuICAgICAgdGhpcy5jYXNlRmllbGQudmFsdWUgPSB0aGlzLmNhc2VGaWVsZC5mb3JtYXR0ZWRfdmFsdWUudmFsdWU7XG4gICAgfVxuXG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgfVxufVxuIiwiPGRpdiAqbmdGb3I9XCJsZXQgdmFsdWUgb2YgY2FzZUZpZWxkLnZhbHVlXCI+XG4gIDxjY2QtbWFya2Rvd24gW2NvbnRlbnRdPVwidmFsdWUuY29kZSB8IGNjZEZpeGVkTGlzdDpjYXNlRmllbGQubGlzdF9pdGVtc1wiPjwvY2NkLW1hcmtkb3duPlxuPC9kaXY+XG4iXX0=