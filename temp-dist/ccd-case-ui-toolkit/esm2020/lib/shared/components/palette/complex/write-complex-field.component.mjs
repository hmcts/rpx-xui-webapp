import { Component, Input } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { plainToClassFromExist } from 'class-transformer';
import { Constants } from '../../../commons/constants';
import { CaseField } from '../../../domain/definition/case-field.model';
import { FieldsFilterPipe } from '../../../pipes/complex/fields-filter.pipe';
import { FieldsUtils } from '../../../services/fields/fields.utils';
import { FormValidatorsService } from '../../../services/form/form-validators.service';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { IsCompoundPipe } from '../utils/is-compound.pipe';
import * as i0 from "@angular/core";
import * as i1 from "../utils/is-compound.pipe";
import * as i2 from "../../../services/form/form-validators.service";
function WriteComplexFieldComponent_h2_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "h2", 3);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "rpxTranslate");
    i0.ɵɵpipe(3, "ccdFieldLabel");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind1(3, 3, ctx_r0.caseField)));
} }
function WriteComplexFieldComponent_ng_container_4_ccd_field_read_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-field-read", 7);
} if (rf & 2) {
    const field_r2 = i0.ɵɵnextContext().$implicit;
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("caseField", ctx_r3.buildField(field_r2))("caseFields", ctx_r3.caseFields)("formGroup", ctx_r3.formGroup)("withLabel", true);
} }
function WriteComplexFieldComponent_ng_container_4_ccd_field_write_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ccd-field-write", 8);
} if (rf & 2) {
    const field_r2 = i0.ɵɵnextContext().$implicit;
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("caseField", field_r2)("caseFields", ctx_r4.caseFields)("formGroup", ctx_r4.formGroup)("parent", ctx_r4.complexGroup)("idPrefix", ctx_r4.buildIdPrefix(field_r2))("hidden", field_r2.hidden)("isExpanded", ctx_r4.isExpanded)("isInSearchBlock", ctx_r4.isInSearchBlock);
} }
function WriteComplexFieldComponent_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0, 4);
    i0.ɵɵpipe(1, "ccdIsReadOnly");
    i0.ɵɵtemplate(2, WriteComplexFieldComponent_ng_container_4_ccd_field_read_2_Template, 1, 4, "ccd-field-read", 5);
    i0.ɵɵtemplate(3, WriteComplexFieldComponent_ng_container_4_ccd_field_write_3_Template, 1, 8, "ccd-field-write", 6);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const field_r2 = ctx.$implicit;
    i0.ɵɵproperty("ngSwitch", i0.ɵɵpipeBind1(1, 3, field_r2));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngSwitchCase", true);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", false);
} }
const ADDRESS_FIELD_TYPES = ['AddressUK', 'AddressGlobalUK', 'AddressGlobal'];
export class WriteComplexFieldComponent extends AbstractFieldWriteComponent {
    constructor(isCompoundPipe, formValidatorsService) {
        super();
        this.isCompoundPipe = isCompoundPipe;
        this.formValidatorsService = formValidatorsService;
        this.caseFields = [];
        this.renderLabel = true;
        this.ignoreMandatory = false;
        this.complexGroup = new UntypedFormGroup({});
    }
    ngOnInit() {
        // Are we inside of a collection? If so, the parent is the complexGroup we want.
        if (this.isTopLevelWithinCollection()) {
            this.complexGroup = this.parent;
            FieldsUtils.addCaseFieldAndComponentReferences(this.complexGroup, this.caseField, this);
        }
        else {
            this.complexGroup = this.registerControl(this.complexGroup, true);
        }
        // Add validators for the complex field.
        this.formValidatorsService.addValidators(this.caseField, this.complexGroup);
        this.setupFields();
        this.complexGroup.updateValueAndValidity({ emitEvent: true });
    }
    buildField(caseField) {
        let control = this.complexGroup.get(caseField.id);
        if (!control) {
            control = new FormControl(caseField.value);
            this.complexGroup.addControl(caseField.id, control);
        }
        // Add validators for addresses, if appropriate.
        if (this.isAddressUK()) {
            if (this.addressValidatorsRequired(caseField)) {
                this.formValidatorsService.addValidators(caseField, control);
            }
        }
        else {
            // It's not an address so set it up according to its own display_context.
            this.formValidatorsService.addValidators(caseField, control);
        }
        // For Address-type fields, ensure that all sub-fields inherit the same value for retain_hidden_value as this
        // parent; although address fields use the Complex type, each of them is meant to be treated as one field
        if (this.isAddressUK() && this.caseField) {
            for (const addressSubField of this.caseField.field_type.complex_fields) {
                addressSubField.retain_hidden_value = this.caseField.retain_hidden_value;
            }
        }
        FieldsUtils.addCaseFieldAndComponentReferences(control, caseField, this);
        return caseField;
    }
    buildIdPrefix(field) {
        return this.isCompoundPipe.transform(field) ? `${this.idPrefix}${field.id}_` : `${this.idPrefix}`;
    }
    addressValidatorsRequired(caseField) {
        return this.isSmallAddressLine1(caseField) && this.isMandatory(caseField);
    }
    isSmallAddressLine1(caseField) {
        return caseField.id === 'AddressLine1' && caseField.field_type.id === 'TextMax150';
    }
    isMandatory(caseField) {
        return (Constants.MANDATORY === caseField.display_context || !this.ignoreMandatory);
    }
    isAddressUK() {
        return ADDRESS_FIELD_TYPES.indexOf(this.caseField.field_type.id) > -1;
    }
    isTopLevelWithinCollection() {
        if (this.parent) {
            const parentCaseField = this.parent['caseField'];
            if (parentCaseField && parentCaseField.id === this.caseField.id) {
                const parentComponent = this.parent['component'];
                if (parentComponent) {
                    const parentComponentCaseField = parentComponent.caseField;
                    if (parentComponentCaseField.field_type) {
                        return parentComponentCaseField.field_type.type === 'Collection';
                    }
                }
            }
        }
        return false;
    }
    setupFields() {
        const fieldsFilterPipe = new FieldsFilterPipe();
        this.complexFields = fieldsFilterPipe.transform(this.caseField, true).map(field => {
            if (field && field.id) {
                if (!(field instanceof CaseField)) {
                    return this.buildField(plainToClassFromExist(new CaseField(), field));
                }
            }
            return this.buildField(field);
        });
    }
}
WriteComplexFieldComponent.ɵfac = function WriteComplexFieldComponent_Factory(t) { return new (t || WriteComplexFieldComponent)(i0.ɵɵdirectiveInject(i1.IsCompoundPipe), i0.ɵɵdirectiveInject(i2.FormValidatorsService)); };
WriteComplexFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteComplexFieldComponent, selectors: [["ccd-write-complex-type-field"]], inputs: { caseFields: "caseFields", formGroup: "formGroup", renderLabel: "renderLabel", ignoreMandatory: "ignoreMandatory" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 5, vars: 3, consts: [[1, "form-group", 3, "id"], ["class", "heading-h2", 4, "ngIf"], [3, "ngSwitch", 4, "ngFor", "ngForOf"], [1, "heading-h2"], [3, "ngSwitch"], ["ccdLabelSubstitutor", "", 3, "caseField", "caseFields", "formGroup", "withLabel", 4, "ngSwitchCase"], ["ccdLabelSubstitutor", "", 3, "caseField", "caseFields", "formGroup", "parent", "idPrefix", "hidden", "isExpanded", "isInSearchBlock", 4, "ngSwitchCase"], ["ccdLabelSubstitutor", "", 3, "caseField", "caseFields", "formGroup", "withLabel"], ["ccdLabelSubstitutor", "", 3, "caseField", "caseFields", "formGroup", "parent", "idPrefix", "hidden", "isExpanded", "isInSearchBlock"]], template: function WriteComplexFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "fieldset")(2, "legend");
        i0.ɵɵtemplate(3, WriteComplexFieldComponent_h2_3_Template, 4, 5, "h2", 1);
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(4, WriteComplexFieldComponent_ng_container_4_Template, 4, 5, "ng-container", 2);
        i0.ɵɵelementEnd()();
    } if (rf & 2) {
        i0.ɵɵproperty("id", ctx.id());
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("ngIf", ctx.renderLabel);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.complexFields);
    } }, styles: [".complex-panel[_ngcontent-%COMP%]{margin:13px 0;border:1px solid #bfc1c3}.complex-panel[_ngcontent-%COMP%]   .complex-panel-title[_ngcontent-%COMP%]{background-color:#dee0e2;padding:5px 5px 2px;border-bottom:1px solid #bfc1c3;display:block;color:#0b0c0c;font-family:nta,Arial,sans-serif;font-weight:700;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.complex-panel[_ngcontent-%COMP%]   .complex-panel-title[_ngcontent-%COMP%]{font-size:19px;line-height:1.3157894737}}.complex-panel[_ngcontent-%COMP%]   .complex-panel-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%] > th[_ngcontent-%COMP%]{vertical-align:top}.complex-panel[_ngcontent-%COMP%]   .complex-panel-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:last-child > th[_ngcontent-%COMP%], .complex-panel[_ngcontent-%COMP%]   .complex-panel-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:last-child > td[_ngcontent-%COMP%]{border-bottom:none}.complex-panel[_ngcontent-%COMP%]   .complex-panel-simple-field[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding-left:5px;width:295px}.complex-panel[_ngcontent-%COMP%]   .complex-panel-compound-field[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:5px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteComplexFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-complex-type-field', template: "<div class=\"form-group\" [id]=\"id()\">\n  <fieldset>\n    <legend><h2 *ngIf=\"renderLabel\" class=\"heading-h2\">{{(caseField | ccdFieldLabel) | rpxTranslate}}</h2></legend>\n    <ng-container [ngSwitch]=\"field | ccdIsReadOnly\" *ngFor=\"let field of complexFields\">\n      <ccd-field-read *ngSwitchCase=\"true\"\n                      ccdLabelSubstitutor\n                      [caseField]=\"buildField(field)\"\n                      [caseFields]=\"caseFields\"\n                      [formGroup]=\"formGroup\"\n                      [withLabel]=\"true\">\n      </ccd-field-read>\n      <ccd-field-write *ngSwitchCase=\"false\"\n                       ccdLabelSubstitutor\n                       [caseField]=\"field\"\n                       [caseFields]=\"caseFields\"\n                       [formGroup]=\"formGroup\"\n                       [parent]=\"complexGroup\"\n                       [idPrefix]=\"buildIdPrefix(field)\"\n                       [hidden]=\"field.hidden\"\n                       [isExpanded]=\"isExpanded\"\n                       [isInSearchBlock]=\"isInSearchBlock\">\n      </ccd-field-write>\n    </ng-container>\n  </fieldset>\n</div>\n", styles: [".complex-panel{margin:13px 0;border:1px solid #bfc1c3}.complex-panel .complex-panel-title{background-color:#dee0e2;padding:5px 5px 2px;border-bottom:1px solid #bfc1c3;display:block;color:#0b0c0c;font-family:nta,Arial,sans-serif;font-weight:700;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.complex-panel .complex-panel-title{font-size:19px;line-height:1.3157894737}}.complex-panel .complex-panel-table>tbody>tr>th{vertical-align:top}.complex-panel .complex-panel-table>tbody>tr:last-child>th,.complex-panel .complex-panel-table>tbody>tr:last-child>td{border-bottom:none}.complex-panel .complex-panel-simple-field th{padding-left:5px;width:295px}.complex-panel .complex-panel-compound-field td{padding:5px}\n"] }]
    }], function () { return [{ type: i1.IsCompoundPipe }, { type: i2.FormValidatorsService }]; }, { caseFields: [{
            type: Input
        }], formGroup: [{
            type: Input
        }], renderLabel: [{
            type: Input
        }], ignoreMandatory: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtY29tcGxleC1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9jb21wbGV4L3dyaXRlLWNvbXBsZXgtZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY29tcGxleC93cml0ZS1jb21wbGV4LWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFtQixXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUV2RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUUzRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7O0lDVC9DLDZCQUEyQztJQUFBLFlBQThDOzs7SUFBQSxpQkFBSzs7O0lBQW5ELGVBQThDO0lBQTlDLGtGQUE4Qzs7O0lBRS9GLG9DQU1pQjs7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MEJBQTBCO2NBTHRDLFNBQVM7MkJBQ0UsOEJBQThCO3FHQU1qQyxVQUFVO2tCQURoQixLQUFLO1lBSUMsU0FBUztrQkFEZixLQUFLO1lBTUMsV0FBVztrQkFEakIsS0FBSztZQUlDLGVBQWU7a0JBRHJCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBwbGFpblRvQ2xhc3NGcm9tRXhpc3QgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XG5pbXBvcnQgeyBDb25zdGFudHMgfSBmcm9tICcuLi8uLi8uLi9jb21tb25zL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBDYXNlRmllbGQgfSBmcm9tICcuLi8uLi8uLi9kb21haW4vZGVmaW5pdGlvbi9jYXNlLWZpZWxkLm1vZGVsJztcbmltcG9ydCB7IEZpZWxkc0ZpbHRlclBpcGUgfSBmcm9tICcuLi8uLi8uLi9waXBlcy9jb21wbGV4L2ZpZWxkcy1maWx0ZXIucGlwZSc7XG5pbXBvcnQgeyBGaWVsZHNVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2ZpZWxkcy9maWVsZHMudXRpbHMnO1xuaW1wb3J0IHsgRm9ybVZhbGlkYXRvcnNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2VydmljZXMvZm9ybS9mb3JtLXZhbGlkYXRvcnMuc2VydmljZSc7XG5cbmltcG9ydCB7IEFic3RyYWN0RmllbGRXcml0ZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UtZmllbGQvYWJzdHJhY3QtZmllbGQtd3JpdGUuY29tcG9uZW50JztcbmltcG9ydCB7IEFic3RyYWN0Rm9ybUZpZWxkQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1mb3JtLWZpZWxkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJc0NvbXBvdW5kUGlwZSB9IGZyb20gJy4uL3V0aWxzL2lzLWNvbXBvdW5kLnBpcGUnO1xuXG5jb25zdCBBRERSRVNTX0ZJRUxEX1RZUEVTID0gWydBZGRyZXNzVUsnLCAnQWRkcmVzc0dsb2JhbFVLJywgJ0FkZHJlc3NHbG9iYWwnXTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLXdyaXRlLWNvbXBsZXgtdHlwZS1maWVsZCcsXG4gIHRlbXBsYXRlVXJsOiAnLi93cml0ZS1jb21wbGV4LWZpZWxkLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9yZWFkLWNvbXBsZXgtZmllbGQtdGFibGUuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFdyaXRlQ29tcGxleEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGaWVsZFdyaXRlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgcHVibGljIGNhc2VGaWVsZHM6IENhc2VGaWVsZFtdID0gW107XG5cbiAgQElucHV0KClcbiAgcHVibGljIGZvcm1Hcm91cDogVW50eXBlZEZvcm1Hcm91cDtcblxuICBwdWJsaWMgY29tcGxleEdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyByZW5kZXJMYWJlbCA9IHRydWU7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGlnbm9yZU1hbmRhdG9yeSA9IGZhbHNlO1xuXG4gIHB1YmxpYyBjb21wbGV4RmllbGRzOiBDYXNlRmllbGRbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGlzQ29tcG91bmRQaXBlOiBJc0NvbXBvdW5kUGlwZSwgcHJpdmF0ZSByZWFkb25seSBmb3JtVmFsaWRhdG9yc1NlcnZpY2U6IEZvcm1WYWxpZGF0b3JzU2VydmljZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jb21wbGV4R3JvdXAgPSBuZXcgVW50eXBlZEZvcm1Hcm91cCh7fSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLy8gQXJlIHdlIGluc2lkZSBvZiBhIGNvbGxlY3Rpb24/IElmIHNvLCB0aGUgcGFyZW50IGlzIHRoZSBjb21wbGV4R3JvdXAgd2Ugd2FudC5cbiAgICBpZiAodGhpcy5pc1RvcExldmVsV2l0aGluQ29sbGVjdGlvbigpKSB7XG4gICAgICB0aGlzLmNvbXBsZXhHcm91cCA9IHRoaXMucGFyZW50IGFzIFVudHlwZWRGb3JtR3JvdXA7XG4gICAgICBGaWVsZHNVdGlscy5hZGRDYXNlRmllbGRBbmRDb21wb25lbnRSZWZlcmVuY2VzKHRoaXMuY29tcGxleEdyb3VwLCB0aGlzLmNhc2VGaWVsZCwgdGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY29tcGxleEdyb3VwID0gdGhpcy5yZWdpc3RlckNvbnRyb2wodGhpcy5jb21wbGV4R3JvdXAsIHRydWUpIGFzIFVudHlwZWRGb3JtR3JvdXA7XG4gICAgfVxuICAgIC8vIEFkZCB2YWxpZGF0b3JzIGZvciB0aGUgY29tcGxleCBmaWVsZC5cbiAgICB0aGlzLmZvcm1WYWxpZGF0b3JzU2VydmljZS5hZGRWYWxpZGF0b3JzKHRoaXMuY2FzZUZpZWxkLCB0aGlzLmNvbXBsZXhHcm91cCk7XG4gICAgdGhpcy5zZXR1cEZpZWxkcygpO1xuICAgIHRoaXMuY29tcGxleEdyb3VwLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoeyBlbWl0RXZlbnQ6IHRydWUgfSk7XG4gIH1cblxuICBwdWJsaWMgYnVpbGRGaWVsZChjYXNlRmllbGQ6IENhc2VGaWVsZCk6IENhc2VGaWVsZCB7XG4gICAgbGV0IGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCA9IHRoaXMuY29tcGxleEdyb3VwLmdldChjYXNlRmllbGQuaWQpO1xuICAgIGlmICghY29udHJvbCkge1xuICAgICAgY29udHJvbCA9IG5ldyBGb3JtQ29udHJvbChjYXNlRmllbGQudmFsdWUpO1xuICAgICAgdGhpcy5jb21wbGV4R3JvdXAuYWRkQ29udHJvbChjYXNlRmllbGQuaWQsIGNvbnRyb2wpO1xuICAgIH1cblxuICAgIC8vIEFkZCB2YWxpZGF0b3JzIGZvciBhZGRyZXNzZXMsIGlmIGFwcHJvcHJpYXRlLlxuICAgIGlmICh0aGlzLmlzQWRkcmVzc1VLKCkpIHtcbiAgICAgIGlmICh0aGlzLmFkZHJlc3NWYWxpZGF0b3JzUmVxdWlyZWQoY2FzZUZpZWxkKSkge1xuICAgICAgICB0aGlzLmZvcm1WYWxpZGF0b3JzU2VydmljZS5hZGRWYWxpZGF0b3JzKGNhc2VGaWVsZCwgY29udHJvbCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEl0J3Mgbm90IGFuIGFkZHJlc3Mgc28gc2V0IGl0IHVwIGFjY29yZGluZyB0byBpdHMgb3duIGRpc3BsYXlfY29udGV4dC5cbiAgICAgIHRoaXMuZm9ybVZhbGlkYXRvcnNTZXJ2aWNlLmFkZFZhbGlkYXRvcnMoY2FzZUZpZWxkLCBjb250cm9sKTtcbiAgICB9XG5cbiAgICAvLyBGb3IgQWRkcmVzcy10eXBlIGZpZWxkcywgZW5zdXJlIHRoYXQgYWxsIHN1Yi1maWVsZHMgaW5oZXJpdCB0aGUgc2FtZSB2YWx1ZSBmb3IgcmV0YWluX2hpZGRlbl92YWx1ZSBhcyB0aGlzXG4gICAgLy8gcGFyZW50OyBhbHRob3VnaCBhZGRyZXNzIGZpZWxkcyB1c2UgdGhlIENvbXBsZXggdHlwZSwgZWFjaCBvZiB0aGVtIGlzIG1lYW50IHRvIGJlIHRyZWF0ZWQgYXMgb25lIGZpZWxkXG4gICAgaWYgKHRoaXMuaXNBZGRyZXNzVUsoKSAmJiB0aGlzLmNhc2VGaWVsZCkge1xuICAgICAgZm9yIChjb25zdCBhZGRyZXNzU3ViRmllbGQgb2YgdGhpcy5jYXNlRmllbGQuZmllbGRfdHlwZS5jb21wbGV4X2ZpZWxkcykge1xuICAgICAgICBhZGRyZXNzU3ViRmllbGQucmV0YWluX2hpZGRlbl92YWx1ZSA9IHRoaXMuY2FzZUZpZWxkLnJldGFpbl9oaWRkZW5fdmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgRmllbGRzVXRpbHMuYWRkQ2FzZUZpZWxkQW5kQ29tcG9uZW50UmVmZXJlbmNlcyhjb250cm9sLCBjYXNlRmllbGQsIHRoaXMpO1xuICAgIHJldHVybiBjYXNlRmllbGQ7XG4gIH1cblxuICBwdWJsaWMgYnVpbGRJZFByZWZpeChmaWVsZDogQ2FzZUZpZWxkKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pc0NvbXBvdW5kUGlwZS50cmFuc2Zvcm0oZmllbGQpID8gYCR7dGhpcy5pZFByZWZpeH0ke2ZpZWxkLmlkfV9gIDogYCR7dGhpcy5pZFByZWZpeH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRyZXNzVmFsaWRhdG9yc1JlcXVpcmVkKGNhc2VGaWVsZDogQ2FzZUZpZWxkKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNTbWFsbEFkZHJlc3NMaW5lMShjYXNlRmllbGQpICYmIHRoaXMuaXNNYW5kYXRvcnkoY2FzZUZpZWxkKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNTbWFsbEFkZHJlc3NMaW5lMShjYXNlRmllbGQ6IENhc2VGaWVsZCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBjYXNlRmllbGQuaWQgPT09ICdBZGRyZXNzTGluZTEnICYmIGNhc2VGaWVsZC5maWVsZF90eXBlLmlkID09PSAnVGV4dE1heDE1MCc7XG4gIH1cblxuICBwcml2YXRlIGlzTWFuZGF0b3J5KGNhc2VGaWVsZDogQ2FzZUZpZWxkKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChDb25zdGFudHMuTUFOREFUT1JZID09PSBjYXNlRmllbGQuZGlzcGxheV9jb250ZXh0IHx8ICF0aGlzLmlnbm9yZU1hbmRhdG9yeSk7XG4gIH1cblxuICBwcml2YXRlIGlzQWRkcmVzc1VLKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBBRERSRVNTX0ZJRUxEX1RZUEVTLmluZGV4T2YodGhpcy5jYXNlRmllbGQuZmllbGRfdHlwZS5pZCkgPiAtMTtcbiAgfVxuXG4gIHByaXZhdGUgaXNUb3BMZXZlbFdpdGhpbkNvbGxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICBjb25zdCBwYXJlbnRDYXNlRmllbGQ6IENhc2VGaWVsZCA9IHRoaXMucGFyZW50WydjYXNlRmllbGQnXTtcbiAgICAgIGlmIChwYXJlbnRDYXNlRmllbGQgJiYgcGFyZW50Q2FzZUZpZWxkLmlkID09PSB0aGlzLmNhc2VGaWVsZC5pZCkge1xuICAgICAgICBjb25zdCBwYXJlbnRDb21wb25lbnQgPSB0aGlzLnBhcmVudFsnY29tcG9uZW50J10gYXMgQWJzdHJhY3RGb3JtRmllbGRDb21wb25lbnQ7XG4gICAgICAgIGlmIChwYXJlbnRDb21wb25lbnQpIHtcbiAgICAgICAgICBjb25zdCBwYXJlbnRDb21wb25lbnRDYXNlRmllbGQgPSBwYXJlbnRDb21wb25lbnQuY2FzZUZpZWxkO1xuICAgICAgICAgIGlmIChwYXJlbnRDb21wb25lbnRDYXNlRmllbGQuZmllbGRfdHlwZSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudENvbXBvbmVudENhc2VGaWVsZC5maWVsZF90eXBlLnR5cGUgPT09ICdDb2xsZWN0aW9uJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cEZpZWxkcygpOiB2b2lkIHtcbiAgICBjb25zdCBmaWVsZHNGaWx0ZXJQaXBlOiBGaWVsZHNGaWx0ZXJQaXBlID0gbmV3IEZpZWxkc0ZpbHRlclBpcGUoKTtcbiAgICB0aGlzLmNvbXBsZXhGaWVsZHMgPSBmaWVsZHNGaWx0ZXJQaXBlLnRyYW5zZm9ybSh0aGlzLmNhc2VGaWVsZCwgdHJ1ZSkubWFwKGZpZWxkID0+IHtcbiAgICAgIGlmIChmaWVsZCAmJiBmaWVsZC5pZCkge1xuICAgICAgICBpZiAoIShmaWVsZCBpbnN0YW5jZW9mIENhc2VGaWVsZCkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZEZpZWxkKHBsYWluVG9DbGFzc0Zyb21FeGlzdChuZXcgQ2FzZUZpZWxkKCksIGZpZWxkKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmJ1aWxkRmllbGQoZmllbGQpO1xuICAgIH0pO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiIFtpZF09XCJpZCgpXCI+XG4gIDxmaWVsZHNldD5cbiAgICA8bGVnZW5kPjxoMiAqbmdJZj1cInJlbmRlckxhYmVsXCIgY2xhc3M9XCJoZWFkaW5nLWgyXCI+e3soY2FzZUZpZWxkIHwgY2NkRmllbGRMYWJlbCkgfCBycHhUcmFuc2xhdGV9fTwvaDI+PC9sZWdlbmQ+XG4gICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiZmllbGQgfCBjY2RJc1JlYWRPbmx5XCIgKm5nRm9yPVwibGV0IGZpZWxkIG9mIGNvbXBsZXhGaWVsZHNcIj5cbiAgICAgIDxjY2QtZmllbGQtcmVhZCAqbmdTd2l0Y2hDYXNlPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgY2NkTGFiZWxTdWJzdGl0dXRvclxuICAgICAgICAgICAgICAgICAgICAgIFtjYXNlRmllbGRdPVwiYnVpbGRGaWVsZChmaWVsZClcIlxuICAgICAgICAgICAgICAgICAgICAgIFtjYXNlRmllbGRzXT1cImNhc2VGaWVsZHNcIlxuICAgICAgICAgICAgICAgICAgICAgIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCJcbiAgICAgICAgICAgICAgICAgICAgICBbd2l0aExhYmVsXT1cInRydWVcIj5cbiAgICAgIDwvY2NkLWZpZWxkLXJlYWQ+XG4gICAgICA8Y2NkLWZpZWxkLXdyaXRlICpuZ1N3aXRjaENhc2U9XCJmYWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgIGNjZExhYmVsU3Vic3RpdHV0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgW2Nhc2VGaWVsZF09XCJmaWVsZFwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtjYXNlRmllbGRzXT1cImNhc2VGaWVsZHNcIlxuICAgICAgICAgICAgICAgICAgICAgICBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiXG4gICAgICAgICAgICAgICAgICAgICAgIFtwYXJlbnRdPVwiY29tcGxleEdyb3VwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2lkUHJlZml4XT1cImJ1aWxkSWRQcmVmaXgoZmllbGQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2hpZGRlbl09XCJmaWVsZC5oaWRkZW5cIlxuICAgICAgICAgICAgICAgICAgICAgICBbaXNFeHBhbmRlZF09XCJpc0V4cGFuZGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2lzSW5TZWFyY2hCbG9ja109XCJpc0luU2VhcmNoQmxvY2tcIj5cbiAgICAgIDwvY2NkLWZpZWxkLXdyaXRlPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L2ZpZWxkc2V0PlxuPC9kaXY+XG4iXX0=