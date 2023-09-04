import { Component, Input } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { PaletteContext } from '../base-field/palette-context.enum';
import * as i0 from "@angular/core";
function ReadComplexFieldComponent_ccd_read_complex_field_raw_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-read-complex-field-raw", 4);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("caseField", ctx_r0.caseField)("caseFields", ctx_r0.caseFields)("context", ctx_r0.context)("topLevelFormGroup", ctx_r0.topLevelFormGroup)("idPrefix", ctx_r0.idPrefix);
} }
function ReadComplexFieldComponent_ccd_read_complex_field_collection_table_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-read-complex-field-collection-table", 5);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("caseField", ctx_r1.caseField)("context", ctx_r1.context)("topLevelFormGroup", ctx_r1.topLevelFormGroup)("idPrefix", ctx_r1.idPrefix);
} }
function ReadComplexFieldComponent_ccd_read_complex_field_table_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-read-complex-field-table", 4);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("caseField", ctx_r2.caseField)("caseFields", ctx_r2.caseFields)("context", ctx_r2.context)("topLevelFormGroup", ctx_r2.topLevelFormGroup)("idPrefix", ctx_r2.idPrefix);
} }
export class ReadComplexFieldComponent extends AbstractFieldReadComponent {
    constructor() {
        super(...arguments);
        this.caseFields = [];
        this.paletteContext = PaletteContext;
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.caseField.display_context_parameter) {
            this.context = PaletteContext.TABLE_VIEW;
        }
        else {
            // default to default views
            if (!this.caseField.display_context_parameter && this.context) {
                this.context = PaletteContext.DEFAULT;
            }
        }
        if (this.caseField.field_type) {
            this.caseField.field_type.complex_fields.forEach(field => {
                if (field.isDynamic()) {
                    field.list_items = this.caseField.value[field.id].list_items;
                    field.value = {
                        list_items: field.list_items,
                        value: this.caseField.value[field.id].value && this.caseField.value[field.id].value.code ?
                            this.caseField.value[field.id].value.code :
                            this.caseField.value[field.id].value
                    };
                }
            });
        }
    }
}
ReadComplexFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadComplexFieldComponent_BaseFactory; return function ReadComplexFieldComponent_Factory(t) { return (ɵReadComplexFieldComponent_BaseFactory || (ɵReadComplexFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadComplexFieldComponent)))(t || ReadComplexFieldComponent); }; }();
ReadComplexFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadComplexFieldComponent, selectors: [["ccd-read-complex-field"]], inputs: { caseFields: "caseFields" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 4, vars: 3, consts: [[3, "ngSwitch"], [3, "caseField", "caseFields", "context", "topLevelFormGroup", "idPrefix", 4, "ngSwitchCase"], [3, "caseField", "context", "topLevelFormGroup", "idPrefix", 4, "ngSwitchCase"], [3, "caseField", "caseFields", "context", "topLevelFormGroup", "idPrefix", 4, "ngSwitchDefault"], [3, "caseField", "caseFields", "context", "topLevelFormGroup", "idPrefix"], [3, "caseField", "context", "topLevelFormGroup", "idPrefix"]], template: function ReadComplexFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementContainerStart(0, 0);
        i0.ɵɵtemplate(1, ReadComplexFieldComponent_ccd_read_complex_field_raw_1_Template, 1, 5, "ccd-read-complex-field-raw", 1);
        i0.ɵɵtemplate(2, ReadComplexFieldComponent_ccd_read_complex_field_collection_table_2_Template, 1, 4, "ccd-read-complex-field-collection-table", 2);
        i0.ɵɵtemplate(3, ReadComplexFieldComponent_ccd_read_complex_field_table_3_Template, 1, 5, "ccd-read-complex-field-table", 3);
        i0.ɵɵelementContainerEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngSwitch", ctx.context);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.paletteContext.CHECK_YOUR_ANSWER);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.paletteContext.TABLE_VIEW);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadComplexFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-read-complex-field', template: "<ng-container [ngSwitch]=\"context\">\n  <ccd-read-complex-field-raw\n    *ngSwitchCase=\"paletteContext.CHECK_YOUR_ANSWER\"\n    [caseField]=\"caseField\"\n    [caseFields]=\"caseFields\"\n    [context]=\"context\"\n    [topLevelFormGroup]=\"topLevelFormGroup\"\n    [idPrefix]=\"idPrefix\"\n  ></ccd-read-complex-field-raw>\n  <ccd-read-complex-field-collection-table\n    *ngSwitchCase=\"paletteContext.TABLE_VIEW\"\n    [caseField]=\"caseField\"\n    [context]=\"context\"\n    [topLevelFormGroup]=\"topLevelFormGroup\"\n    [idPrefix]=\"idPrefix\"\n  ></ccd-read-complex-field-collection-table>\n  <ccd-read-complex-field-table\n    *ngSwitchDefault\n    [caseField]=\"caseField\"\n    [caseFields]=\"caseFields\"\n    [context]=\"context\"\n    [topLevelFormGroup]=\"topLevelFormGroup\"\n    [idPrefix]=\"idPrefix\"\n  ></ccd-read-complex-field-table>\n</ng-container>\n" }]
    }], null, { caseFields: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1jb21wbGV4LWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2NvbXBsZXgvcmVhZC1jb21wbGV4LWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2NvbXBsZXgvcmVhZC1jb21wbGV4LWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFekQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDekYsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9DQUFvQyxDQUFDOzs7SUNGbEUsZ0RBTzhCOzs7SUFMNUIsNENBQXVCLGlDQUFBLDJCQUFBLCtDQUFBLDZCQUFBOzs7SUFNekIsNkRBTTJDOzs7SUFKekMsNENBQXVCLDJCQUFBLCtDQUFBLDZCQUFBOzs7SUFLekIsa0RBT2dDOzs7SUFMOUIsNENBQXVCLGlDQUFBLDJCQUFBLCtDQUFBLDZCQUFBOztBRFQzQixNQUFNLE9BQU8seUJBQTBCLFNBQVEsMEJBQTBCO0lBSnpFOztRQU9TLGVBQVUsR0FBZ0IsRUFBRSxDQUFDO1FBRTdCLG1CQUFjLEdBQUcsY0FBYyxDQUFDO0tBMkJ4QztJQXpCUSxRQUFRO1FBQ2IsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2pCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsRUFBRTtZQUM1QyxJQUFJLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUM7U0FDMUM7YUFBTTtZQUNMLDJCQUEyQjtZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUM3RCxJQUFJLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxPQUFPLENBQUM7YUFDdkM7U0FDRjtRQUNELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUU7WUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDdkQsSUFBSSxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUU7b0JBQ3JCLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQztvQkFDN0QsS0FBSyxDQUFDLEtBQUssR0FBRzt3QkFDWixVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVU7d0JBQzVCLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ2xGLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzNDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLO3FCQUM3QyxDQUFDO2lCQUNIO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7O3FSQTlCVSx5QkFBeUIsU0FBekIseUJBQXlCOzRFQUF6Qix5QkFBeUI7UUNUdEMsZ0NBQW1DO1FBQ2pDLHdIQU84QjtRQUM5QixrSkFNMkM7UUFDM0MsNEhBT2dDO1FBQ2xDLDBCQUFlOztRQXhCRCxzQ0FBb0I7UUFFN0IsZUFBOEM7UUFBOUMsbUVBQThDO1FBUTlDLGVBQXVDO1FBQXZDLDREQUF1Qzs7dUZERC9CLHlCQUF5QjtjQUpyQyxTQUFTOzJCQUNFLHdCQUF3QjtnQkFNM0IsVUFBVTtrQkFEaEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FzZUZpZWxkIH0gZnJvbSAnLi4vLi4vLi4vZG9tYWluL2RlZmluaXRpb24nO1xuaW1wb3J0IHsgQWJzdHJhY3RGaWVsZFJlYWRDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlLWZpZWxkL2Fic3RyYWN0LWZpZWxkLXJlYWQuY29tcG9uZW50JztcbmltcG9ydCB7IFBhbGV0dGVDb250ZXh0IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9wYWxldHRlLWNvbnRleHQuZW51bSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1yZWFkLWNvbXBsZXgtZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJy4vcmVhZC1jb21wbGV4LWZpZWxkLmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBSZWFkQ29tcGxleEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGaWVsZFJlYWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBjYXNlRmllbGRzOiBDYXNlRmllbGRbXSA9IFtdO1xuXG4gIHB1YmxpYyBwYWxldHRlQ29udGV4dCA9IFBhbGV0dGVDb250ZXh0O1xuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIGlmICh0aGlzLmNhc2VGaWVsZC5kaXNwbGF5X2NvbnRleHRfcGFyYW1ldGVyKSB7XG4gICAgICB0aGlzLmNvbnRleHQgPSBQYWxldHRlQ29udGV4dC5UQUJMRV9WSUVXO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBkZWZhdWx0IHRvIGRlZmF1bHQgdmlld3NcbiAgICAgIGlmICghdGhpcy5jYXNlRmllbGQuZGlzcGxheV9jb250ZXh0X3BhcmFtZXRlciAmJiB0aGlzLmNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gUGFsZXR0ZUNvbnRleHQuREVGQVVMVDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuY2FzZUZpZWxkLmZpZWxkX3R5cGUpIHtcbiAgICAgIHRoaXMuY2FzZUZpZWxkLmZpZWxkX3R5cGUuY29tcGxleF9maWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICAgIGlmIChmaWVsZC5pc0R5bmFtaWMoKSkge1xuICAgICAgICAgIGZpZWxkLmxpc3RfaXRlbXMgPSB0aGlzLmNhc2VGaWVsZC52YWx1ZVtmaWVsZC5pZF0ubGlzdF9pdGVtcztcbiAgICAgICAgICBmaWVsZC52YWx1ZSA9IHtcbiAgICAgICAgICAgIGxpc3RfaXRlbXM6IGZpZWxkLmxpc3RfaXRlbXMsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5jYXNlRmllbGQudmFsdWVbZmllbGQuaWRdLnZhbHVlICYmIHRoaXMuY2FzZUZpZWxkLnZhbHVlW2ZpZWxkLmlkXS52YWx1ZS5jb2RlID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXNlRmllbGQudmFsdWVbZmllbGQuaWRdLnZhbHVlLmNvZGUgOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhc2VGaWVsZC52YWx1ZVtmaWVsZC5pZF0udmFsdWVcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxufVxuIiwiPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiY29udGV4dFwiPlxuICA8Y2NkLXJlYWQtY29tcGxleC1maWVsZC1yYXdcbiAgICAqbmdTd2l0Y2hDYXNlPVwicGFsZXR0ZUNvbnRleHQuQ0hFQ0tfWU9VUl9BTlNXRVJcIlxuICAgIFtjYXNlRmllbGRdPVwiY2FzZUZpZWxkXCJcbiAgICBbY2FzZUZpZWxkc109XCJjYXNlRmllbGRzXCJcbiAgICBbY29udGV4dF09XCJjb250ZXh0XCJcbiAgICBbdG9wTGV2ZWxGb3JtR3JvdXBdPVwidG9wTGV2ZWxGb3JtR3JvdXBcIlxuICAgIFtpZFByZWZpeF09XCJpZFByZWZpeFwiXG4gID48L2NjZC1yZWFkLWNvbXBsZXgtZmllbGQtcmF3PlxuICA8Y2NkLXJlYWQtY29tcGxleC1maWVsZC1jb2xsZWN0aW9uLXRhYmxlXG4gICAgKm5nU3dpdGNoQ2FzZT1cInBhbGV0dGVDb250ZXh0LlRBQkxFX1ZJRVdcIlxuICAgIFtjYXNlRmllbGRdPVwiY2FzZUZpZWxkXCJcbiAgICBbY29udGV4dF09XCJjb250ZXh0XCJcbiAgICBbdG9wTGV2ZWxGb3JtR3JvdXBdPVwidG9wTGV2ZWxGb3JtR3JvdXBcIlxuICAgIFtpZFByZWZpeF09XCJpZFByZWZpeFwiXG4gID48L2NjZC1yZWFkLWNvbXBsZXgtZmllbGQtY29sbGVjdGlvbi10YWJsZT5cbiAgPGNjZC1yZWFkLWNvbXBsZXgtZmllbGQtdGFibGVcbiAgICAqbmdTd2l0Y2hEZWZhdWx0XG4gICAgW2Nhc2VGaWVsZF09XCJjYXNlRmllbGRcIlxuICAgIFtjYXNlRmllbGRzXT1cImNhc2VGaWVsZHNcIlxuICAgIFtjb250ZXh0XT1cImNvbnRleHRcIlxuICAgIFt0b3BMZXZlbEZvcm1Hcm91cF09XCJ0b3BMZXZlbEZvcm1Hcm91cFwiXG4gICAgW2lkUHJlZml4XT1cImlkUHJlZml4XCJcbiAgPjwvY2NkLXJlYWQtY29tcGxleC1maWVsZC10YWJsZT5cbjwvbmctY29udGFpbmVyPlxuIl19